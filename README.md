# Drishti Baadhit Karimik Sangh — Static website

Static site on **GitHub Pages** with custom domain.

## Live URL

https://drishtibaadhitkarimiksangh.in/

(Also: https://rishabhdhenkawat.github.io/drishti-sangh/ — redirects after DNS is set)

## GoDaddy DNS (required once)

In GoDaddy → your domain → **DNS** → manage records:

### 1. Apex domain `drishtibaadhitkarimiksangh.in`

Delete any conflicting **A** / **CNAME** / **Forwarding** for `@`, then add these **A** records:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `185.199.108.153` | 600 |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |

### 2. `www` subdomain

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `rishabhdhenkawat.github.io` | 600 |

Turn **off** GoDaddy domain forwarding / “forwarding to parking” if it is on.

DNS can take 15 minutes to a few hours. Then GitHub will issue HTTPS.

## Local development

```bash
npm install
npm run dev
```

## Documents Portal

https://dbks-rajasthan-c07d526a70ce.herokuapp.com/documents

## Membership form

Opens email to `185519@nith.ac.in`.
