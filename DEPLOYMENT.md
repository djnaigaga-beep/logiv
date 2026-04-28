# Ugazo - Deployment Guide

## 🚀 Production Deployment

### Prerequisites
- Git repository (GitHub, GitLab, Bitbucket)
- Hosting account (Heroku, AWS, DigitalOcean, etc.)
- MongoDB Atlas account (cloud database)
- Stripe production keys

---

## 📦 Backend Deployment (Heroku)

### Step 1: Prepare Backend

```bash
# Create .gitignore for backend
echo "node_modules/" > backend/.gitignore
echo ".env" >> backend/.gitignore
```

### Step 2: Update package.json
```json
{
  "engines": {
    "node": "14.x",
    "npm": "6.x"
  },
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### Step 3: Create Procfile
```bash
# In backend directory
echo "web: npm start" > Procfile
```

### Step 4: Deploy to Heroku

```bash
# Install Heroku CLI
# Visit: https://devcenter.heroku.com/articles/heroku-cli

# Login
heroku login

# Create app
cd backend
heroku create ugazo-api

# Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ugazo
heroku config:set JWT_SECRET=your_production_secret_key_minimum_32_chars
heroku config:set STRIPE_SECRET_KEY=sk_live_your_production_key
heroku config:set STRIPE_PUBLISHABLE_KEY=pk_live_your_production_key
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://yourdomain.com

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Alternative: AWS EC2

```bash
# SSH into instance
ssh -i key.pem ec2-user@your-instance-ip

# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 14

# Clone and setup
git clone your-repo.git
cd ugazo/backend
npm install

# Install PM2 for process management
npm install -g pm2
pm2 start server.js --name "ugazo-api"
pm2 save
pm2 startup

# Setup nginx as reverse proxy
sudo yum install nginx
sudo systemctl start nginx
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Prepare Frontend

```bash
# Create .env.production file
echo "REACT_APP_API_URL=https://ugazo-api.herokuapp.com" > frontend/.env.production
```

### Step 2: Build

```bash
cd frontend
npm run build
```

### Step 3: Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Setup environment variable
vercel env add REACT_APP_API_URL
# Enter: https://ugazo-api.herokuapp.com
```

### Alternative: Netlify

```bash
# Connect GitHub repo to Netlify
# Build command: npm run build
# Publish directory: build/
# Environment: REACT_APP_API_URL=https://ugazo-api.herokuapp.com
```

### Alternative: AWS S3 + CloudFront

```bash
# Build app
npm run build

# Create S3 bucket
aws s3 mb s3://ugazo-frontend

# Upload build files
aws s3 sync build/ s3://ugazo-frontend --delete

# Create CloudFront distribution
# Point to S3 bucket
# Add SSL certificate
```

---

## 🗄️ Database Setup (MongoDB Atlas)

### Step 1: Create Cluster

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up or login
3. Create a new project
4. Create a cluster (M0 Free tier)
5. Choose region closest to your users

### Step 2: Configure Security

```bash
# Add IP Whitelist
# Click: Network Access
# Add: 0.0.0.0/0 (allow all, or specific IPs)

# Create Database User
# Username: ugazo_admin
# Password: your_strong_password
```

### Step 3: Get Connection String

```bash
# Click: Connect
# Choose: Connect to your application
# Copy connection string format:
# mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true
```

### Step 4: Update Backend

```bash
# In .env (production)
MONGODB_URI=mongodb+srv://ugazo_admin:your_password@cluster-name.mongodb.net/ugazo?retryWrites=true&w=majority
```

---

## 💳 Stripe Configuration

### Step 1: Production Account

1. Go to https://dashboard.stripe.com
2. Switch to Live mode
3. Go to API keys
4. Copy Live Secret and Publishable keys

### Step 2: Webhooks (Optional)

```bash
# For payment notifications
# In Stripe Dashboard:
# Settings > Webhooks
# Add endpoint: https://your-api.com/api/payment/webhook
# Listen to: payment_intent.succeeded
```

### Step 3: Update Environment

```bash
# Production .env
STRIPE_SECRET_KEY=sk_live_your_production_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_production_key
```

---

## 🔒 Security Checklist

- [ ] Change JWT_SECRET to 32+ character random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS only
- [ ] Use environment variables for all secrets
- [ ] Set CORS_ORIGIN to specific domains only
- [ ] Enable rate limiting
- [ ] Set secure cookie flags
- [ ] Use strong database passwords
- [ ] Enable MongoDB IP whitelist
- [ ] Setup SSL/TLS certificate
- [ ] Enable firewall rules
- [ ] Setup regular backups

---

## 📊 Performance Optimization

### Backend
```bash
# Add compression middleware
npm install compression

# Add helmet for security headers
npm install helmet

# Add rate limiting
npm install express-rate-limit
```

### Frontend
```bash
# Build optimization
npm run build

# Code splitting
# Update webpack config or use react-lazy-load

# Image optimization
# Use tools like ImageOptim
```

### Database
```bash
# Add indexes to frequently queried fields
db.users.createIndex({ email: 1 })
db.users.createIndex({ country: 1 })
db.matchrequests.createIndex({ to: 1, status: 1 })
```

---

## 📈 Monitoring & Logging

### Heroku
```bash
# View logs
heroku logs --tail

# Add monitoring
heroku addons:create papertrail
```

### Application Insights (Azure)
```bash
# Setup in server.js
const appInsights = require("applicationinsights");
appInsights.setup();
appInsights.start();
```

### ELK Stack (Self-hosted)
```bash
# Setup Elasticsearch, Logstash, Kibana
# Forward logs for analysis and monitoring
```

---

## 🔄 Continuous Integration (CI/CD)

### GitHub Actions

```yaml
# Create .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          cd backend
          git push heroku main
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
      
      - name: Deploy Frontend
        run: |
          cd frontend
          vercel --prod
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

---

## 🧪 Production Testing

```bash
# Test API
curl https://your-api.com/api/health

# Test signup
curl -X POST https://your-api.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com",...}'

# Test frontend
# Visit https://your-domain.com
# Test all pages and functionality
```

---

## 📞 Troubleshooting Deployment

### Blank Page on Frontend
```bash
# Check console for errors
# Verify API_URL in .env.production
# Check CORS settings in backend
```

### Database Connection Error
```bash
# Verify MONGODB_URI syntax
# Check IP whitelist in MongoDB Atlas
# Ensure user password doesn't have special chars
```

### Build Fails
```bash
# Check Node version compatibility
# Run npm install and npm run build locally first
# Check for console errors in build output
```

---

## 💰 Cost Estimates (Monthly)

| Service | Free Tier | Paid |
|---------|-----------|------|
| Heroku | ❌ | $7-$50+ |
| Vercel | ✅ | $20+ |
| MongoDB | ✅ (512MB) | $10-$100+ |
| Stripe | ✅ (2.9% + $0.30) | Same |
| Domain | ❌ | $10-15 |
| **Total** | N/A | **$40-180+** |

---

## 📋 Post-Deployment

1. Setup monitoring and alerts
2. Configure backups
3. Setup error tracking (Sentry)
4. Create support documentation
5. Setup email notifications
6. Add analytics
7. Monitor performance
8. Plan scaling strategy

---

**Deployed successfully? 🎉**

Next: Setup monitoring, add features, and scale!
