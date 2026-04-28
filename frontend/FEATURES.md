<!-- Ugazo Features Documentation -->

# Ugazo - Complete Feature Overview

## 🏠 Home Page (Dashboard)
- **Welcome Message**: Personal greeting with user's name
- **Account Status**: Shows logged-in user's email and country
- **Quick Links**: Easy navigation to main features
- **Terms & Conditions Modal**: Must accept on first visit
- **Navigation Bar**: Access to all major sections

### Features on Home Page:
- View your profile information
- See your country and gender
- Access to Media, Search, and Terms sections
- Logout option
- Beautiful gradient background

---

## 📸 Media Page
- **Video Feed**: Auto-playing videos (muted by default)
- **Auto-play**: Videos play automatically on hover
- **Sound Control**: No sound unless video is clicked
- **No Controls**: Videos have no visible control buttons initially
- **Responsive Grid**: Works on mobile, tablet, and desktop
- **User Info**: See who posted each media item
- **Like Counter**: Shows number of likes per item

### Media Types Supported:
- Images (JPG, PNG, WebP)
- Videos (MP4, WebM, OGV)

---

## 🔐 Authentication Pages

### Signup Page
- **Step 1**: Email, Password, First Name, Last Name
- **Step 2**: Gender, Country, Date of Birth, Phone Number
- **Validation**:
  - Must be 18+ years old
  - Males must be from Europe
  - Females must be from Uganda
  - Valid phone number required
- **Auto-login**: After signup, user is logged in immediately
- **Link to Login**: For existing users

### Login Page
- **Email & Password**: Simple credential entry
- **Persistent Sessions**: Token stored locally
- **Remember Me**: Automatic login on return
- **Reset Option**: Link to signup for new accounts
- **Error Messages**: Clear feedback on failed attempts

---

## 💗 Search & Love Page
- **Profile Cards**: Attractive grid layout of available profiles
- **Profile Info Displayed**:
  - Profile photo
  - First name and last name
  - Age
  - Country/Location
  - Bio/Description
- **View Profile Button**: See full profile details
- **Responsive**: Adapts to all screen sizes
- **Filtering**: Automatic gender/location matching

### Matching Rules:
- Males see Ugandan females
- Females see European males
- Blocked users are excluded
- Users with active matches are excluded

---

## 👤 Individual Profile Page
- **Header Section**:
  - Large profile photo
  - Full name
  - Age
  - Country
  - Bio
  - "Send Love Request" button (for males only)

- **Media Gallery**:
  - All user's photos and videos
  - Thumbnail view
  - Clickable for full view

- **Information**:
  - **Visible**: Name, Age, Country, Bio, Photos, Videos
  - **Hidden**: Email address (privacy protection)

### Actions Available:
- **Males**: Send love request (€50 or use exemption code)
- **Females**: View profile and media
- **Back Button**: Return to search

---

## 💳 Payment & Love Request System

### For Males (European):
1. Browse female profiles
2. Click "Send Love Request" on profile
3. Choose: Pay €50 or enter exemption code
4. Process payment via Stripe (if needed)
5. Request sent to female user

### For Females (Ugandan):
1. Receive love request notifications
2. View requester's profile
3. **Accept**: Become matched, can chat
4. **Reject**: Request is declined
5. After acceptance: Can only view each other's media

### Payment Details:
- **Amount**: €50 per request
- **Currency**: EUR (Euros)
- **Exemption Code**: `23234` (free access)
- **Processor**: Stripe (secure payment)
- **Transaction History**: Stored for records

---

## 📝 Terms & Conditions
- **When**: Modal appears on first visit to dashboard
- **Content**:
  1. Eligibility requirements (18+, country restrictions)
  2. Account responsibility
  3. User conduct rules (no harassment, appropriate content)
  4. Match request and payment terms
  5. Privacy policy (email protection)
  6. Liability limitations
  7. Termination conditions
  8. Amendment policies

- **Acceptance**: Must be checked to access features
- **Accessible**: Always available in navigation

---

## 📱 Responsive Design

### Mobile (320px - 767px)
- Single column layouts
- Touch-optimized buttons
- Full-width cards
- Simplified navigation
- Video height: 150px

### Tablet (768px - 1199px)
- 2-3 column grids
- Balanced spacing
- Medium-sized cards
- Video height: 200px

### Desktop (1200px+)
- Full-width layouts
- Multiple column grids
- Large profile cards
- Extended navigation
- Video height: 250px+

---

## 🔒 Security Features

### Authentication
- JWT tokens (30-day expiration)
- Password hashing (bcryptjs)
- Token stored in localStorage
- Auto-logout on token expiration

### Data Protection
- Email addresses hidden in profiles
- CORS protection enabled
- Input validation on all forms
- Country/gender verification required

### Payment Security
- Stripe PCI compliance
- Secure payment processing
- Transaction ID tracking
- No card details stored locally

---

## 🎨 Design Elements

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: White backgrounds
- **Accent**: Lighter purples for hover states
- **Text**: Dark gray (#333) on light backgrounds

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana
- **Headings**: Bold, larger sizes
- **Body Text**: Regular weight, readable size
- **Links**: Purple with hover effects

### Interactive Elements
- Hover animations on cards
- Smooth transitions (0.3s ease)
- Button scale effects
- Loading spinners
- Error/success messages

---

## 📊 Database Storage

### Users Collection
- Profile information
- Authentication credentials
- Contact details
- Media preferences
- Match history
- Blocking list

### Media Collection
- File paths (local or cloud)
- User references
- Upload timestamps
- Like counts
- Comments

### Match Requests Collection
- Requester and recipient
- Status (pending/accepted/rejected)
- Payment information
- Timestamps

---

## 🌐 Supported European Countries
Albania, Andorra, Austria, Belarus, Belgium, Bosnia and Herzegovina, Bulgaria, Croatia, Cyprus, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Ireland, Italy, Kosovo, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Moldova, Monaco, Montenegro, Netherlands, North Macedonia, Norway, Poland, Portugal, Romania, Russia, San Marino, Serbia, Slovakia, Slovenia, Spain, Sweden, Switzerland, Turkey, Ukraine, United Kingdom

---

## ✨ Key Features Summary

✅ Beautiful UI/UX with gradient backgrounds
✅ Responsive design (mobile, tablet, desktop)
✅ Secure authentication system
✅ Video auto-play without sound
✅ Gender and country restrictions
✅ Payment integration (Stripe)
✅ Profile privacy (email hidden)
✅ Media gallery
✅ Love request system
✅ Terms & Conditions
✅ User blocking system
✅ Match acceptance/rejection
✅ Offline support (service worker)
✅ Progressive Web App (PWA) ready

---

**Last Updated**: April 22, 2026
**Version**: 1.0.0
