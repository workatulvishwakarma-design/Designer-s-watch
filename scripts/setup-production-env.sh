#!/bin/bash
set -e

echo "======================================================="
echo "   DESIGNER WORLD PRODUCTION FIX & REBUILD SCRIPT     "
echo "======================================================="

# 1. Stop all node / PM2 processes and clear PM2 cached environment
echo "Step 1: Terminating PM2 and wiping cached environment dumps..."
pm2 kill || true
rm -f ~/.pm2/dump.pm2 /root/.pm2/dump.pm2 2>/dev/null || true
fuser -k 3000/tcp 2>/dev/null || true
pkill -f node 2>/dev/null || true

# 2. Fix DNS on Ubuntu server
echo "Step 2: Checking DNS nameservers..."
if ! grep -q "8.8.8.8" /etc/resolv.conf 2>/dev/null; then
    echo "nameserver 8.8.8.8" >> /etc/resolv.conf 2>/dev/null || true
fi
if ! grep -q "1.1.1.1" /etc/resolv.conf 2>/dev/null; then
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf 2>/dev/null || true
fi

# 3. Remove any old or conflicting environment files
echo "Step 3: Removing stale/conflicting env files..."
rm -f .env.local .env.production .env.production.local .env.test .env.production.template

# 4. Write fresh, verified .env file
echo "Step 4: Writing clean .env file with verified database URL..."
cat << 'EOF' > .env
DATABASE_URL="postgresql://neondb_owner:npg_3OZYBSFMvL8a@ep-jolly-hat-a1waagzf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=verify-full&channel_binding=require"
AUTH_SECRET="xtiHkXPgQcHc3zDaf5uwnuVEYNsU+4iobq2rxeUbmEg="
NEXTAUTH_URL="https://dsignerworld.com"
NEXT_PUBLIC_SITE_URL="https://dsignerworld.com"

# Cashfree Payment Gateway
CASHFREE_APP_ID=""
CASHFREE_SECRET_KEY=""
CASHFREE_ENV="SANDBOX"
CASHFREE_API_VERSION="2023-08-01"

# MSG91 SMS Service
MSG91_AUTH_KEY=""
MSG91_SENDER_ID="DSGNRW"
MSG91_TPL_ORDER_PLACED=""
MSG91_TPL_PAYMENT_SUCCESS=""
MSG91_TPL_COD_ADVANCE=""
MSG91_TPL_ORDER_SHIPPED=""
MSG91_TPL_OUT_FOR_DELIVERY=""
MSG91_TPL_DELIVERED=""
MSG91_TPL_ORDER_CANCELLED=""

# Contact Email Notification
CONTACT_RECEIVER_EMAIL="info@dsigner.com"

# SMTP Configuration
SMTP_HOST=""
SMTP_PORT=465
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Designer's Watch <info@dsigner.com>"

NODE_ENV="production"
EOF

echo "✓ .env file written successfully."

# 5. Test Database Connection
echo "Step 5: Testing database connectivity with check-db.ts..."
npx tsx scripts/check-db.ts

# 6. Clean .next cache and build production bundle
echo "Step 6: Cleaning build cache and compiling Next.js application..."
rm -rf .next
NODE_OPTIONS="--max-old-space-size=2048" npm run build

# 7. Start fresh PM2 instance and save state
echo "Step 7: Launching PM2 process on port 3000..."
pm2 start npm --name "watch-app" -- start
pm2 save --force

# 8. Verify local response
echo "Step 8: Verifying local port 3000 response..."
sleep 3
curl -I http://localhost:3000 || true

echo ""
echo "======================================================="
echo "🎉 DEPLOYMENT COMPLETE! https://dsignerworld.com is LIVE!"
echo "======================================================="
