#!/bin/bash
cd /home/flower/public_html/flowershope
git pull origin main 
npm run build
pm2 restart 6
pm2 save
pm2 startup
