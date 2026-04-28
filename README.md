# Ugazo - Dating Website

A full-stack dating platform connecting Ugandan females with European males. Built with Node.js/Express backend, React frontend, and MongoDB database.

## Features

✅ **User Authentication**
- Signup with validation (18+ age requirement)
- Email/Password login with JWT tokens
- Country and gender-based access control

✅ **Gender & Location Restrictions**
- Only females from Uganda allowed
- Only males from European countries allowed
- Automatic validation on signup/login

✅ **Media Page**
- Browse images and videos
- Auto-play videos on hover (no sound)
- Videos have no control buttons until clicked

✅ **Search & Profiles**
- Browse available profiles
- View detailed user information
- See user photos and videos

✅ **Love Requests**
- Males can send €50 match requests to females
- Exemption code: `23234` for free requests
- Females accept/reject requests
- Automatic blocking after acceptance

✅ **Payment System**
- Stripe integration for €50 charges
- Secure payment processing
- Transaction history

✅ **Responsive Design**
- Mobile-optimized
- Tablet-friendly
- Desktop-ready

## Project Structure

```
Ugazo/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── controllers/      # Business logic
│   ├── middleware/       # Authentication & validation
│   ├── utils/            # Helper functions
│   ├── uploads/          # Media storage
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── pages/       # React pages
│   │   ├── components/  # React components
│   │   ├── context/     # Auth context
│   │   ├── styles/      # CSS files
│   │   └── utils/       # Helper functions
│   ├── public/
│   └── package.json
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js 14+ 
- MongoDB 
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
MONGODB_URI=mongodb://localhost:27017/ugazo
JWT_SECRET=your_secure_secret_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable
PORT=5000
FRONTEND_URL=http://localhost:3000
```

5. Start MongoDB:
```bash
mongod
```

6. Run the server:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users/profile` - Get current user profile
- `GET /api/users/profile/:userId` - Get user profile
- `PUT /api/users/profile` - Update profile
- `GET /api/users/search` - Search profiles

### Media
- `GET /api/media` - Get all media feed
- `GET /api/media/user/:userId` - Get user media
- `POST /api/media/upload` - Upload image/video
- `POST /api/media/:mediaId/like` - Like media
- `DELETE /api/media/:mediaId` - Delete media

### Match Requests
- `POST /api/match/send` - Send match request
- `GET /api/match/pending` - Get pending requests
- `POST /api/match/:requestId/accept` - Accept request
- `POST /api/match/:requestId/reject` - Reject request

### Payment
- `POST /api/payment/create-payment-intent` - Create Stripe payment
- `POST /api/payment/confirm-payment` - Confirm payment

## Database Models

### User
- Email (unique)
- Password (hashed)
- Personal info (name, age, gender, country)
- Contact info (phone, country code)
- Profile data (bio, photos, videos)
- Relationships (blocked users, match status)

### Media
- User reference
- File path (image/video)
- Likes and comments
- Timestamps

### MatchRequest
- From/To user references
- Status (pending/accepted/rejected)
- Payment status
- Transaction ID
- Amount and timestamps

## Security Features

✅ Password hashing with bcryptjs
✅ JWT authentication
✅ CORS protection
✅ Input validation
✅ Country/gender verification
✅ Stripe PCI compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env

### Port Already in Use
- Backend: Change PORT in .env
- Frontend: `PORT=3001 npm start`

### CORS Errors
- Check FRONTEND_URL in backend .env
- Ensure frontend and backend URLs match

## Development

### Adding New Features
1. Create backend route/controller
2. Create frontend page/component
3. Add styling
4. Test end-to-end

### Database Cleanup
```bash
# Connect to MongoDB
mongo ugazo

# Remove all data
db.users.deleteMany({})
db.matches.deleteMany({})
db.media.deleteMany({})
```

## Terms and Conditions

Users must:
- Be 18+ years old
- Follow gender/location restrictions
- Not post inappropriate content
- Comply with payment requirements
- Respect user privacy

See Dashboard for full terms.

## License

ISC

## Support

For issues or questions, contact support@ugazo.com

---

**Built with ❤️ - Ugazo Dating Platform**
