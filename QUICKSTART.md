# Ugazo - Quick Start Guide

## ⚡ 5-Minute Setup

### Prerequisites
- Node.js 14+ installed
- MongoDB running locally or cloud connection
- npm or yarn package manager

### Step 1: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 2: Configure Environment
```bash
# In backend folder, create .env file
MONGODB_URI=mongodb://localhost:27017/ugazo
JWT_SECRET=your_super_secret_key_here
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_key
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Step 3: Start Backend
```bash
npm start
# Server runs on http://localhost:5000
```

### Step 4: Install Frontend Dependencies
```bash
cd frontend
npm install
```

### Step 5: Start Frontend
```bash
npm start
# App opens on http://localhost:3000
```

## 🎯 What You Can Do Now

### Test Signup
1. Click "Get Started Now" on signup page
2. Fill in basic info (any email)
3. Select:
   - **Male** + Any European country
   - **Female** + **Uganda**
4. Set birthdate to 18+ years ago
5. Click "Sign Up"

### Test Media
1. Click "Media" in navigation
2. Browse auto-playing videos
3. Hover over videos to see auto-play

### Test Search
1. Click "Find Love"
2. Browse profiles from opposite gender
3. Click "View Profile" on any card

### Test Love Request
1. On profile page, click "Send Love Request"
2. Enter exemption code: `23234` (for free test)
3. See confirmation message

## 📝 Example Test Accounts

### Create Male Account
- Email: `john@example.com`
- Password: `Test1234`
- Country: France
- Gender: Male
- DOB: 01/01/1990

### Create Female Account
- Email: `jane@example.com`
- Password: `Test1234`
- Country: Uganda
- Gender: Female
- DOB: 01/01/1995

## 🎨 Customize

### Change Colors
Edit `frontend/src/styles/index.css`:
```css
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Change hex colors above */
}
```

### Add Company Logo
Place your logo at `frontend/public/logo192.png`

### Update Terms & Conditions
Edit `frontend/src/pages/Dashboard.js` - Find the Terms Modal section

## 🚀 Deployment

### Backend (Heroku)
```bash
# Install Heroku CLI
# Login
heroku login

# Create app
heroku create ugazo-api

# Set environment variables
heroku config:set MONGODB_URI=your_url
heroku config:set JWT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_key

# Deploy
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Build production version
npm run build

# Deploy folder: build/
# Set REACT_APP_API_URL to backend URL
```

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### MongoDB Connection Error
```bash
# Start MongoDB
mongod

# Or use cloud MongoDB:
# Update MONGODB_URI in .env
```

### CORS Errors
- Check FRONTEND_URL in backend .env
- Ensure http://localhost:3000 matches your frontend URL

### Clear Cache
```bash
# Frontend
rm -rf node_modules package-lock.json
npm install

# Backend
rm -rf node_modules package-lock.json
npm install
```

## 📋 Important Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Main API server |
| `backend/models/User.js` | User database schema |
| `backend/.env` | Environment variables |
| `frontend/src/App.js` | Main React app |
| `frontend/src/context/AuthContext.js` | Auth state management |
| `frontend/public/index.html` | HTML template |

## 🧪 Testing API Endpoints

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test1234",
    "firstName":"John",
    "lastName":"Doe",
    "gender":"male",
    "country":"France",
    "countryCode":"+33",
    "phoneNumber":"123456789",
    "dateOfBirth":"1990-01-01"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test1234"
  }'
```

### Search Profiles
```bash
curl -X GET http://localhost:5000/api/users/search \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📞 Support

- **Docs**: See FEATURES.md and README.md
- **Issues**: Check terminal error messages
- **Database**: Use MongoDB Compass to inspect data
- **API**: Test endpoints with Postman or curl

## ✅ Checklist Before Launch

- [ ] MongoDB is running and accessible
- [ ] Environment variables are set in .env
- [ ] Stripe keys are configured
- [ ] Frontend can communicate with backend
- [ ] Signup/Login works
- [ ] Profile search works
- [ ] Payment flow works (with code 23234)
- [ ] Terms & Conditions display correctly
- [ ] Responsive design works on mobile
- [ ] All pages are accessible

## 🎓 Next Steps

1. Add your own logo and branding
2. Upload test media (photos/videos)
3. Configure real Stripe keys
4. Set up MongoDB Atlas for production
5. Deploy to Heroku or similar
6. Add email verification
7. Add user profiles pictures upload
8. Add chat functionality
9. Add notifications
10. Set up analytics

---

**Happy coding! 💝**

Need help? Check the README.md or FEATURES.md files!
