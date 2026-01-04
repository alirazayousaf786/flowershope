#!/bin/bash
set -euo pipefail

PROJECT_DIR="/home/flower/public_html/flowershope"
APP_USER="flower"
APP_GROUP="flower"
PM2_ID=6
LOG_FILE="$PROJECT_DIR/build.log"

echo "===============================" | tee -a $LOG_FILE
echo "🚀 Build started: $(date)" | tee -a $LOG_FILE
echo "===============================" | tee -a $LOG_FILE

cd "$PROJECT_DIR" 2>&1 | tee -a $LOG_FILE

echo "📥 Git pull..." | tee -a $LOG_FILE
git pull origin main 2>&1 | tee -a $LOG_FILE

echo "📦 npm install..." | tee -a $LOG_FILE
npm install 2>&1 | tee -a $LOG_FILE

echo "🏗️ npm run build..." | tee -a $LOG_FILE
npm run build 2>&1 | tee -a $LOG_FILE

echo "🔐 Fixing .next permissions..." | tee -a $LOG_FILE
chown -R $APP_USER:$APP_GROUP .next 2>&1 | tee -a $LOG_FILE
chmod -R 755 .next 2>&1 | tee -a $LOG_FILE

UPLOAD_DIR="$PROJECT_DIR/public/uploads"

if [ -d "$UPLOAD_DIR" ]; then
  echo "🖼️ Fixing upload permissions..." | tee -a $LOG_FILE
  chown -R $APP_USER:$APP_GROUP "$UPLOAD_DIR" 2>&1 | tee -a $LOG_FILE
  find "$UPLOAD_DIR" -type d -exec chmod 755 {} \; 2>&1 | tee -a $LOG_FILE
  find "$UPLOAD_DIR" -type f -exec chmod 644 {} \; 2>&1 | tee -a $LOG_FILE
fi

echo "🔁 Restarting PM2 (ID: $PM2_ID)..." | tee -a $LOG_FILE
pm2 restart $PM2_ID 2>&1 | tee -a $LOG_FILE
pm2 save 2>&1 | tee -a $LOG_FILE

echo "✅ Build finished successfully!" | tee -a $LOG_FILE
