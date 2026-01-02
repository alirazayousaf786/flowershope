#!/bin/bash

# ===============================
# CONFIG
# ===============================
PROJECT_DIR="/home/flower/public_html/flowershope"
APP_USER="flower"        # ⚠️ change if different
APP_GROUP="flower"      # ⚠️ change if different
PM2_ID=6

echo "🚀 Starting build process..."

cd $PROJECT_DIR || exit 1

echo "📥 Pulling latest code..."
git pull origin main

echo "📦 Installing dependencies..."
npm install --production=false

echo "🏗️ Building Next.js..."
npm run build

echo "🔐 Fixing .next permissions..."
chown -R $APP_USER:$APP_GROUP .next
chmod -R 755 .next

# ===============================
# FIX UPLOADED IMAGES PERMISSIONS
# ===============================
# Change this path if uploads folder is different
UPLOAD_DIR="$PROJECT_DIR/public/uploads"

if [ -d "$UPLOAD_DIR" ]; then
  echo "🖼️ Fixing uploaded images permissions..."
  chown -R $APP_USER:$APP_GROUP $UPLOAD_DIR
  find $UPLOAD_DIR -type d -exec chmod 755 {} \;
  find $UPLOAD_DIR -type f -exec chmod 644 {} \;
fi

echo "🔁 Restarting PM2..."
pm2 restart $PM2_ID
pm2 save

echo "✅ Build & permissions fixed successfully!"
