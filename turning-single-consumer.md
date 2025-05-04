# Multi-Tenant SaaS Setup

## 1. Host-Header Routing
- Load-balancer reads the `Host` header (e.g. `cool-games.com`)
- Maps it to a tenant ID and loads that tenant’s settings

## 2. `tenant_id` in Users
- Add a `tenant_id` column to the `users` table
- Enforce `UNIQUE(tenant_id, email)` so emails stay unique per tenant

## 3. Scoped Authentication
- Issue tokens or cookies containing both `user_id` and `tenant_id`
- On each request, verify the token’s `tenant_id` matches the `Host`’s tenant
- Reject mismatches with **401 Unauthorized** and scope cookies to each domain  
