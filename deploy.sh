#!/bin/bash
# ============================================
# RITUAL ORACLE — Full Deploy (Web + Images)
# ============================================
set -e
echo "🔮 Ritual Oracle — Starting deployment..."

# 1. Install Nginx
echo "📦 Installing Nginx..."
apt update -y
apt install -y nginx

# 2. Buat folder web root & images
echo "📁 Creating web directory..."
mkdir -p /var/www/ritual-oracle/images

# 3. Copy files (HTML + Images)
echo "📄 Copying files..."
cp index.html /var/www/ritual-oracle/index.html
# Ini bagian yang bikin logo muncul:
cp -r images/* /var/www/ritual-oracle/images/

# 4. Set permissions
chown -R www-data:www-data /var/www/ritual-oracle
chmod -R 755 /var/www/ritual-oracle

# 5. Setup Nginx config
echo "⚙️  Configuring Nginx..."
cp nginx.conf /etc/nginx/sites-available/ritual-oracle
ln -sf /etc/nginx/sites-available/ritual-oracle /etc/nginx/sites-enabled/ritual-oracle
rm -f /etc/nginx/sites-enabled/default

# 6. Test & restart Nginx
echo " Testing Nginx config..."
nginx -t
echo "🔄 Restarting Nginx..."
systemctl restart nginx
systemctl enable nginx

echo ""
echo "✅ DONE! Ritual Oracle deployed successfully."
echo "🌐 LINK KAMU: http://$(curl -s ifconfig.me)"
echo "   Copy link di atas buat Twitter/X!"
