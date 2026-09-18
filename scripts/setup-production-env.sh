#!/bin/bash
set -e

echo "=== FIXING PRODUCTION ENVIRONMENT & DATABASE ==="

# 1. Ensure DNS works on Ubuntu
echo "1. Checking DNS..."
if ! grep -q "8.8.8.8" /etc/resolv.conf 2>/dev/null; then
    echo "nameserver 8.8.8.8" >> /etc/resolv.conf || true
fi
if ! grep -q "1.1.1.1" /etc/resolv.conf 2>/dev/null; then
    echo "nameserver 1.1.1.1" >> /etc/resolv.conf || true
fi

# 2. Write exact .env file
echo "2. Writing correct .env configuration..."
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

echo "✓ .env file created successfully."

# 3. Test Database Connection
echo "3. Testing Database Connection..."
npx tsx scripts/check-db.ts

# 4. Build Next.js
echo "4. Building application..."
NODE_OPTIONS="--max-old-space-size=2048" npm run build

# 5. Clean restart PM2
echo "5. Restarting PM2 process..."
pm2 delete all || true
pm2 start npm --name "watch-app" -- start
pm2 save

echo ""
echo "=========================================="
echo "🎉 ALL DONE! Your app is now live and connected!"
echo "=========================================="
