# Deployment — Azure Static Web Apps (client-poc2)

The app is built and deployed by [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
on every push to `main` (i.e. once a PR is merged to `main`) and manually via
**Run workflow**.

- **Hosting:** Azure Static Web Apps
- **Resource group:** `optimum-ai-studio-rg-eval`
- **Auth:** OIDC federated credentials (no long-lived secret stored)
- **Build output uploaded:** `dist/`

> Until September 2026 this app deployed to `optiengr-ai-team-rg-poc`. That
> resource group has been retired; since 2026-11-13 the target is
> `optimum-ai-studio-rg-eval`.

> Setup mirrors the sibling `abeam-poc1` project exactly; only the target
> deployment resource group and Static Web App resource differ.

---

## Target configuration

| Item | Value |
|------|-------|
| Static Web App | `optimum-ai-studio-swa-poc2-eval` (Free plan) |
| Resource group | `optimum-ai-studio-rg-eval` |
| Region | East Asia (`eastasia`) — Static Web Apps are not offered in the resource group's own region (Central India) |
| Live URL | `https://jolly-dune-0ead8a400.5.azurestaticapps.net` |
| App registration | `client-poc2-deploy` — client ID set as the `AZURE_CLIENT_ID` secret |
| RBAC | `Contributor` scoped to **only** the SWA resource (least privilege) |
| Federated credential | subject `repo:optimum-ai-lab/client-poc2:environment:abeam-poc` |
| GitHub Environment | `abeam-poc` with secrets `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_SUBSCRIPTION_ID` |

> The GitHub Environment name `abeam-poc` is kept identical to `abeam-poc1`
> (environments are repo-scoped, so reusing the name across POC repos does not
> collide). The federated-credential **subject**, however, must reference this
> repo — `optimum-ai-lab/client-poc2` — for OIDC to authenticate.

The instructions below document how to provision the above (one-time). You don't
need to repeat them for normal deploys.

---

## The Static Web App resource name

`.github/workflows/deploy.yml` already points at the Static Web App resource
that lives in `optimum-ai-studio-rg-eval`:

```yaml
env:
  AZURE_RESOURCE_GROUP: optimum-ai-studio-rg-eval
  AZURE_STATIC_WEB_APP_NAME: optimum-ai-studio-swa-poc2-eval
```

Confirm it exists with:

```bash
az staticwebapp list --resource-group optimum-ai-studio-rg-eval \
  --query "[].name" -o tsv
```

If no Static Web App exists yet, create one (no GitHub integration — this
workflow deploys it):

```bash
az staticwebapp create \
  --name optimum-ai-studio-swa-poc2-eval \
  --resource-group optimum-ai-studio-rg-eval \
  --location eastasia \
  --sku Free
```

---

## Required GitHub secrets

Set these in **Settings → Secrets and variables → Actions** (repo level, or on
the `abeam-poc` environment):

| Secret | Where to get it |
|--------|-----------------|
| `AZURE_CLIENT_ID` | App registration (service principal) client/app ID |
| `AZURE_TENANT_ID` | Azure AD tenant ID |
| `AZURE_SUBSCRIPTION_ID` | Subscription containing `optimum-ai-studio-rg-eval` |

No client secret / deployment token is stored — the workflow logs in with OIDC
and resolves the Static Web Apps deployment token at runtime.

---

## One-time Azure setup (OIDC federated credential)

1. **Create an app registration** (service principal) for this deployment:

   ```bash
   az ad app create --display-name "client-poc2-deploy"
   # note the appId -> AZURE_CLIENT_ID
   az ad sp create --id <appId>
   ```

2. **Grant it rights on the Static Web App only** (least privilege — the
   resource group holds other workloads) so it can read the SWA token and
   deploy:

   ```bash
   az role assignment create \
     --assignee <appId> \
     --role "Contributor" \
     --scope /subscriptions/<sub-id>/resourceGroups/optimum-ai-studio-rg-eval/providers/Microsoft.Web/staticSites/optimum-ai-studio-swa-poc2-eval
   ```

3. **Add a federated credential** matching this repo. This repo deploys through
   the GitHub Environment `abeam-poc`, so the subject is environment-scoped:

   ```bash
   az ad app federated-credential create --id <appId> --parameters '{
     "name": "client-poc2-main",
     "issuer": "https://token.actions.githubusercontent.com",
     "subject": "repo:optimum-ai-lab/client-poc2:environment:abeam-poc",
     "audiences": ["api://AzureADTokenExchange"]
   }'
   ```

   > If you remove `environment: abeam-poc` from the workflow, use a
   > branch-scoped subject instead:
   > `repo:optimum-ai-lab/client-poc2:ref:refs/heads/main`

4. **Create the GitHub Environment** named `abeam-poc`
   (**Settings → Environments**) and, optionally, add protection rules
   (required reviewers, etc.). The three `AZURE_*` secrets can live here.

---

## SPA routing

`public/staticwebapp.config.json` sets a navigation fallback to `/index.html`
so client-side deep links don't 404. Vite copies it into `dist/` at build time.

---

## How a deploy proceeds

1. Push to `main` (e.g. a merged PR) → workflow triggers.
2. `npm ci` + `npm run build` → produces `dist/`.
3. `azure/login@v2` authenticates via OIDC.
4. `az staticwebapp secrets list` resolves the deployment token (fails loudly if
   the resource name is wrong / missing — no silent fallback).
5. `npx swa deploy ./dist` uploads `dist/` to the Static Web App.

The deployed URL is the Static Web App's default hostname (e.g.
`https://<swa-name>.azurestaticapps.net`) or a configured custom domain.
