# Hyperwrike — Deploy Notes / Handoff

## Status (2026-06-04)
- Site container `hyperwrike-site` is LIVE on the VPS (proxy-net, port 8080), built from this folder.
- Serves the new design + Hyperwrike Agent (/api/chat), lead capture (/api/lead -> Twenty CRM + Brevo + local data/).
- Verified internally: /api/health all green; lead -> Twenty creates a Person (crm:true).
- OpenCode Zen key + model `deepseek-v4-flash` are configured, BUT the Zen workspace has
  "No payment method" -> model calls 402; the agent transparently falls back to the strong
  built-in responder. Add a payment method at the OpenCode workspace billing page to enable the LLM.

## OUTSTANDING: apex TLS cert for https://hyperwrike.com
Root cause: the `caddy` container (host network, created outside /home/dummy/agency compose)
bind-mounts /etc/caddy/Caddyfile by an ORPHANED INODE. Edits to the host file
(/home/dummy/agency/caddy/Caddyfile) + `docker restart caddy` are NOT picked up.
The host Caddyfile is already correct (apex-only block at ~line 110):

    hyperwrike.com {
        encode gzip
        reverse_proxy hyperwrike-site:8080
    }

A valid LE cert for hyperwrike.com ALREADY EXISTS in the caddy_data volume
(CN=hyperwrike.com, valid Jun 4 -> Sep 2 2026). So once caddy actually re-reads the
current Caddyfile, it will serve the apex INSTANTLY (no new ACME needed).

### To finish (recreate caddy so it re-reads the file):
Recreate the caddy container with its CURRENT settings (it uses --network host).
Example (verify against `docker inspect caddy` first):

    docker rm -f caddy
    docker run -d --name caddy --restart unless-stopped --network host \
      --env-file /home/dummy/agency/.env \
      -v /home/dummy/agency/caddy/Caddyfile:/etc/caddy/Caddyfile:ro \
      -v /home/dummy/leadgen-dashboard:/var/www/leadgen:ro \
      -v agency_caddy_data:/data -v agency_caddy_config:/config \
      caddy:2.8

(Confirm exact mounts/networks via `docker inspect caddy` before removing.)

### Also: www.hyperwrike.com
`www` currently points to parking IPs (64.29.17.65 / 216.198.79.65), NOT the VPS.
It's intentionally excluded from the Caddy block. To use www, point its A record to
79.143.180.217 and add `www.hyperwrike.com` back to the block.

## Redeploy the site after code edits
    tar czf /tmp/hw.tgz --exclude=node_modules --exclude=.git --exclude=data --exclude=.env .
    scp /tmp/hw.tgz dummy@79.143.180.217:~/hw.tgz
    ssh dummy@79.143.180.217 'cd ~/hyperwrike-site && tar xzf ~/hw.tgz && sudo docker compose up -d --build'
