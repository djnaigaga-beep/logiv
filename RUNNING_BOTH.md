# 🚀 Running Ugazo Backend + Frontend Together

## Quick Start (5 Minutes)

### Prerequisites ✅
- **Node.js 14+** and npm installed
- **MongoDB** (local or MongoDB Atlas)
- **2 Terminal Windows**

---

## 🔴 Terminal 1: Start Backend Server

```bash
# Navigate to backend folder
cd backend

# Install dependencies (first time only)
npm install

# Start server
npm start
```

**Expected output:**
```
Server running on port 5000
MongoDB connected
```

**✅ Backend ready at: http://localhost:5000**

---

## 🔵 Terminal 2: Start Frontend Application

```bash
# In NEW terminal window, navigate to frontend
cd frontend

# Install dependencies (first time only)
npm install

# Start application
npm start
```

**Expected output:**
```
Compiled successfully!
You can now view ugazo in the browser at http://localhost:3000
```

**✅ Frontend ready at: http://localhost:3000** (auto-opens in browser)

---

## ✨ Both Running Together!

Now you have:
- ✅ **Backend API** running on `http://localhost:5000`
- ✅ **Frontend Web App** running on `http://localhost:3000`
- ✅ **Automatic communication** between them

---

## 🎯 Test It Out

### Create Test Accounts:
1. **Male (European):**
   - Email: `male@test.com`
   - Password: `Test1234`
   - Country: France (or any European)
   - Gender: Male

2. **Female (Ugandan):**
   - Email: `female@test.com`
   - Password: `Test1234`
   - Country: Uganda
   - Gender: Female

### Try These Features:
- ✅ Sign Up / Login
- ✅ Browse Profiles (Find Love)
- ✅ View Media
- ✅ Send Love Requests
- ✅ View User Profiles

---

## 🔧 Configuration Files

### Backend (.env) 📝
Located at: `backend/.env`
```
MONGODB_URI=mongodb://localhost:27017/ugazo
JWT_SECRET=ugazo_super_secret_jwt_key_change_in_production
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local) 📝
Located at: `frontend/.env.local`
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Make sure MongoDB is running (`mongod` command) or check Atlas connection string |
| Port 3000 in use | Kill process: `netstat -ano \| findstr :3000` then `taskkill /PID <PID> /F` |
| Port 5000 in use | Change PORT in `backend/.env` to 5001 and update frontend `.env.local` |
| Frontend can't connect to backend | Check `REACT_APP_API_URL` in `frontend/.env.local` matches backend URL |
| npm install fails | Delete `node_modules` folder and `package-lock.json`, then run `npm install` again |

---

## 📚 For Full Setup Guide

See: **`SETUP.md`** for detailed instructions

---

## 🎉 You're All Set!

Your full-stack Ugazo application is now running! 

**Continue developing, testing, or deploy to production! 🚀**
