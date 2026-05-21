# api-gateway

Single entry point for all client traffic in the indoor-fish platform. Routes requests to downstream services via HTTP proxy, handles JWT validation centrally, and enforces rate limiting.

## Port: 3000

## Routing Table

| Path | Downstream Service | Auth Required |
|------|-------------------|---------------|
| `/api/users/register` | user-service:3001 | No |
| `/api/users/login` | user-service:3001 | No |
| `/api/users/*` | user-service:3001 | Yes |
| `/api/orders/*` | order-service:3004 | Yes |
| `/api/products/*` | product-catalog:3003 | No |
| `/api/payments/*` | payment-service:3002 | Yes |

## Environment Variables

See `.env.example` for all required variables.

## Dependencies
- `@indoor-fish/shared-libs` — shared types and service URL constants
- `http-proxy-middleware` — reverse proxy
- `jsonwebtoken` — JWT validation
# accuracy test trigger
# reindex
# reindex
# reindex3
# reindex4
# final
# v
