# 🚀 Ugazo - Complete Setup Guide (Web Version)

## Prerequisites
- **Node.js** 14+ and npm (https://nodejs.org/)
- **MongoDB** running locally or MongoDB Atlas (https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for cloning)

---

## ✅ Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

Expected output:
```
added XXX packages in X.XXs
```

---

## ✅ Step 2: Configure Backend Environment

Create a `.env` file in the `backend` folder (already created, but you can edit it):

**File: `backend/.env`**
```
MONGODB_URI=mongodb://localhost:27017/ugazo
JWT_SECRET=ugazo_super_secret_jwt_key_change_in_production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### For MongoDB:
- **Local MongoDB**: `mongodb://localhost:27017/ugazo`
- **MongoDB Atlas** (Cloud):
  1. Go to https://www.mongodb.com/cloud/atlas
  2. Create free cluster
  3. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ugazo`
  4. Paste in `.env` MONGODB_URI

---

## ✅ Step 3: Start Backend Server

```bash
# In terminal, inside /backend folder
npm start
```

Expected output:
```
Server running on port 5000
MongoDB connected
```

**Backend is now running at: http://localhost:5000**

---

## ✅ Step 4: Install Frontend Dependencies

```bash
# In NEW terminal window, go to frontend folder
cd frontend
npm install
```

Expected output:
```
added XXX packages in X.XXs
```

---

## ✅ Step 5: Configure Frontend Environment

The `.env.local` file is already created. You can check/edit it:

**File: `frontend/.env.local`**
```
REACT_APP_API_URL=http://localhost:5000
REACT_APP_NODE_ENV=development
```

---

## ✅ Step 6: Start Frontend Application

```bash
# In terminal, inside /frontend folder
npm start
```

Expected output:
```
Compiled successfully!
You can now view ugazo in the browser.
Local: http://localhost:3000
```

**Frontend will automatically open at: http://localhost:3000**

---

## 🎯 Testing the Application

### Test 1: Create a Male Account (European)
1. Go to http://localhost:3000
2. Click "Get Started" / "Sign Up"
3. Fill in:
   - Email: `test.male@example.com`
   - Password: `Test1234`
   - First Name: `John`
   - Last Name: `Doe`
   - Gender: **Male**
   - Country: **France** (or any European country)
   - Date of Birth: `01/01/1990` (18+ years old)
   - Phone: Any number
4. Click "Sign Up"

### Test 2: Create a Female Account (Ugandan)
1. Go back to http://localhost:3000
2. Click "Sign Up"
3. Fill in:
   - Email: `test.female@example.com`
   - Password: `Test1234`
   - First Name: `Jane`
   - Last Name: `Smith`
   - Gender: **Female**
   - Country: **Uganda**
   - Date of Birth: `01/01/1995`
   - Phone: Any number
4. Click "Sign Up"

### Test 3: Test Search Feature
1. Login with male account
2. Click "Find Love" in navigation
3. Search for female profiles (should show Jane if created)
4. Click "View Profile"
5. Click "Send Love Request"
6. Enter exemption code: `23234` (for free test)
7. Click "Proceed to Payment"

### Test 4: Test Media
1. Login with any account
2. Click "Media" in navigation
3. View media gallery (will be empty initially - you can add media through the backend API)

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:**
- Make sure MongoDB is running
- Check MONGODB_URI in `.env`
- For local: `mongod` command should be running
- For Atlas: Verify connection string and whitelist your IP

### Issue: "Frontend can't connect to backend"
**Solution:**
- Check `REACT_APP_API_URL` in `frontend/.env.local`
- Make sure backend is running on port 5000
- Check CORS settings in `backend/server.js`

### Issue: "Port 3000 already in use"
**Solution:**
```bash
# Kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "Port 5000 already in use"
**Solution:**
```bash
# Change PORT in backend/.env to 5000, then update frontend accordingly
```

---

## 📁 Project Structure

```
Ugazo/
├── backend/
│   ├── .env                 # Backend configuration (created)
│   ├── .env.example         # Example config
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   ├── controllers/        # API logic
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication, validation
│   └── uploads/            # User uploads folder
│
└── frontend/
    ├── .env.local          # Frontend config (created)
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   │   ├── SignupPage.js
    │   │   ├── LoginPage.js
    │   │   ├── Dashboard.js
    │   │   ├── SearchPage.js
    │   │   ├── MediaPage.js
    │   │   └── ProfilePage.js
    │   ├── context/        # Auth context
    │   ├── styles/         # CSS files
    │   └── utils/          # Utility functions
    └── package.json        # Frontend dependencies
```

---

## 🔑 Environment Variables Explained

### Backend (.env)
- `MONGODB_URI`: Database connection string
- `JWT_SECRET`: Secret key for authentication tokens
- `PORT`: Server port (default 5000)
- `FRONTEND_URL`: Frontend URL for CORS
- `STRIPE_*`: Payment processing keys
- `NODE_ENV`: Environment (development/production)

### Frontend (.env.local)
- `REACT_APP_API_URL`: Backend API base URL
- `REACT_APP_NODE_ENV`: Environment

---

## 🚀 Running Both Simultaneously

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Both will run and communicate with each other automatically! 🎉

---

## 📱 API Endpoints

All API calls go to: `http://localhost:5000/api`

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify token

### Users
- `GET /api/users/search` - Search profiles
- `GET /api/users/profile/:userId` - Get user profile

### Media
- `GET /api/media` - Get all media
- `POST /api/media` - Upload media

### Match Requests
- `POST /api/match/send` - Send love request

### Payments
- `POST /api/payment` - Process payment

---

## ✨ Next Steps

1. ✅ Run backend and frontend together
2. ✅ Create test accounts
3. ✅ Test all features
4. Add real MongoDB Atlas database
5. Set up Stripe payment keys
6. Deploy to production

---

## 💡 Tips

- **Development**: Use `npm start` (includes hot reload)
- **Frontend**: Auto-opens browser, or visit http://localhost:3000
- **Backend**: Manual refresh needed if you modify code (use `npm run dev` with nodemon)
- **Database**: Check MongoDB Compass to view data

---

## 🆘 Need Help?

Check these files for more info:
- `QUICKSTART.md` - Quick 5-minute setup
- `API.md` - API documentation
- `DOCUMENTATION_INDEX.md` - Full documentation
