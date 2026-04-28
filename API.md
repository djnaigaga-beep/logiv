# Ugazo API Documentation

**Base URL**: `http://localhost:5000/api` (development) or `https://your-api.com/api` (production)

**Authentication**: Use JWT token in header: `Authorization: Bearer YOUR_TOKEN`

---

## 🔐 Authentication Endpoints

### POST `/auth/signup`
Create a new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "country": "France",
  "countryCode": "+33",
  "phoneNumber": "123456789",
  "dateOfBirth": "1990-01-15"
}
```

**Success Response (201)**:
```json
{
  "message": "Signup successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

**Error Responses**:
- 400: User already exists / Invalid input
- 400: Only females from Uganda are allowed
- 400: Only males from European countries are allowed
- 400: You must be 18 years or older

---

### POST `/auth/login`
Login with email and password

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**Success Response (200)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "country": "France"
  }
}
```

**Error Responses**:
- 400: Email and password are required
- 401: Invalid credentials

---

### GET `/auth/verify`
Verify JWT token and get user info

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "gender": "male",
    "country": "France",
    "age": 34,
    "bio": "Software developer from France",
    "profilePhoto": "/uploads/photo.jpg",
    "photos": ["/uploads/photo1.jpg", "/uploads/photo2.jpg"],
    "videos": ["/uploads/video1.mp4"],
    "createdAt": "2026-04-22T10:00:00Z"
  }
}
```

**Error Responses**:
- 401: No token provided
- 401: Invalid token

---

## 👥 User Endpoints

### GET `/users/profile`
Get current user's profile

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "country": "France",
  "age": 34,
  "bio": "Software developer",
  "profilePhoto": "/uploads/photo.jpg",
  "photos": [],
  "videos": [],
  "interests": ["travel", "coding"],
  "createdAt": "2026-04-22T10:00:00Z"
}
```

---

### GET `/users/profile/:userId`
Get any user's public profile

**Parameters**:
- `userId` (string): User ID

**Success Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "firstName": "John",
  "lastName": "Doe",
  "gender": "male",
  "country": "France",
  "age": 34,
  "bio": "Software developer",
  "profilePhoto": "/uploads/photo.jpg",
  "photos": ["/uploads/photo1.jpg"],
  "videos": ["/uploads/video1.mp4"],
  "interests": ["travel", "coding"]
}
```

**Note**: Email address is NOT included in public profile

---

### PUT `/users/profile`
Update current user's profile

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body**:
```json
{
  "bio": "Updated bio",
  "interests": ["travel", "movies", "sports"]
}
```

**Success Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "bio": "Updated bio",
  "interests": ["travel", "movies", "sports"],
  "updatedAt": "2026-04-22T11:00:00Z"
}
```

---

### GET `/users/search`
Search for compatible profiles

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Query Parameters** (optional):
- `limit`: Number of results (default: 50)
- `skip`: Skip first N results (for pagination)

**Success Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "firstName": "Jane",
    "lastName": "Smith",
    "gender": "female",
    "country": "Uganda",
    "age": 28,
    "bio": "Looking for someone special",
    "profilePhoto": "/uploads/photo.jpg",
    "photos": ["/uploads/photo1.jpg"],
    "videos": []
  },
  {
    "_id": "507f1f77bcf86cd799439013",
    "firstName": "Mary",
    "lastName": "Johnson",
    "gender": "female",
    "country": "Uganda",
    "age": 25,
    "bio": "Fun and adventurous",
    "profilePhoto": "/uploads/photo.jpg",
    "photos": [],
    "videos": ["/uploads/video1.mp4"]
  }
]
```

**Matching Logic**:
- Males see Ugandan females
- Females see European males
- Blocked users are excluded
- Users with active matches are excluded

---

## 📸 Media Endpoints

### GET `/media`
Get all media (feed)

**Success Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "userId": {
      "_id": "507f1f77bcf86cd799439012",
      "firstName": "Jane",
      "lastName": "Smith"
    },
    "mediaType": "image",
    "filePath": "/uploads/media1.jpg",
    "likes": ["507f1f77bcf86cd799439011"],
    "comments": [],
    "createdAt": "2026-04-22T10:00:00Z"
  },
  {
    "_id": "507f1f77bcf86cd799439015",
    "userId": {
      "_id": "507f1f77bcf86cd799439013",
      "firstName": "Mary",
      "lastName": "Johnson"
    },
    "mediaType": "video",
    "filePath": "/uploads/video1.mp4",
    "likes": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
    "comments": [],
    "createdAt": "2026-04-22T09:00:00Z"
  }
]
```

---

### GET `/media/user/:userId`
Get specific user's media

**Parameters**:
- `userId` (string): User ID

**Success Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439014",
    "mediaType": "image",
    "filePath": "/uploads/media1.jpg",
    "likes": ["507f1f77bcf86cd799439011"],
    "createdAt": "2026-04-22T10:00:00Z"
  }
]
```

---

### POST `/media/upload`
Upload image or video

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
Content-Type: multipart/form-data
```

**Form Data**:
- `media` (file): The image or video file
- `mediaType` (string, optional): "image" or "video"

**Success Response (201)**:
```json
{
  "_id": "507f1f77bcf86cd799439016",
  "userId": "507f1f77bcf86cd799439011",
  "mediaType": "image",
  "filePath": "/uploads/1650641400000-photo.jpg",
  "likes": [],
  "comments": [],
  "createdAt": "2026-04-22T10:30:00Z"
}
```

**Error Responses**:
- 400: No file provided

---

### POST `/media/:mediaId/like`
Like a media item

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "mediaType": "image",
  "filePath": "/uploads/media1.jpg",
  "likes": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"],
  "createdAt": "2026-04-22T10:00:00Z"
}
```

---

### DELETE `/media/:mediaId`
Delete a media item

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "message": "Media deleted"
}
```

**Error Responses**:
- 404: Media not found
- 403: Unauthorized (not the owner)

---

## 💝 Match Request Endpoints

### POST `/match/send`
Send a match request

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body**:
```json
{
  "toUserId": "507f1f77bcf86cd799439012",
  "exemptionCode": "23234"
}
```

**Success Response (201)**:
```json
{
  "matchRequest": {
    "_id": "507f1f77bcf86cd799439017",
    "from": "507f1f77bcf86cd799439011",
    "to": "507f1f77bcf86cd799439012",
    "status": "pending",
    "paymentStatus": "exempted",
    "amount": 50,
    "createdAt": "2026-04-22T10:35:00Z"
  },
  "requiresPayment": false
}
```

**Error Responses**:
- 403: Only males can send match requests
- 400: Match request already sent
- 404: User not found

---

### GET `/match/pending`
Get pending match requests for current user

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
[
  {
    "_id": "507f1f77bcf86cd799439017",
    "from": {
      "_id": "507f1f77bcf86cd799439011",
      "firstName": "John",
      "lastName": "Doe",
      "profilePhoto": "/uploads/photo.jpg"
    },
    "status": "pending",
    "paymentStatus": "paid",
    "createdAt": "2026-04-22T10:35:00Z"
  }
]
```

---

### POST `/match/:requestId/accept`
Accept a match request

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "message": "Match request accepted",
  "matchRequest": {
    "_id": "507f1f77bcf86cd799439017",
    "from": "507f1f77bcf86cd799439011",
    "to": "507f1f77bcf86cd799439012",
    "status": "accepted",
    "acceptedAt": "2026-04-22T10:40:00Z"
  }
}
```

**Error Responses**:
- 404: Request not found
- 403: Unauthorized
- 400: Payment not completed

---

### POST `/match/:requestId/reject`
Reject a match request

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Success Response (200)**:
```json
{
  "message": "Match request rejected"
}
```

---

## 💳 Payment Endpoints

### POST `/payment/create-payment-intent`
Create Stripe payment intent

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body**:
```json
{
  "matchRequestId": "507f1f77bcf86cd799439017"
}
```

**Success Response (200)**:
```json
{
  "clientSecret": "pi_1234567890_secret_key",
  "publishableKey": "pk_test_1234567890"
}
```

---

### POST `/payment/confirm-payment`
Confirm payment completion

**Headers**:
```
Authorization: Bearer YOUR_TOKEN
```

**Request Body**:
```json
{
  "matchRequestId": "507f1f77bcf86cd799439017",
  "paymentIntentId": "pi_1234567890"
}
```

**Success Response (200)**:
```json
{
  "message": "Payment successful",
  "matchRequest": {
    "_id": "507f1f77bcf86cd799439017",
    "status": "pending",
    "paymentStatus": "paid",
    "transactionId": "pi_1234567890"
  }
}
```

---

## 🏥 Health Check

### GET `/health`
Check if server is running

**Success Response (200)**:
```json
{
  "status": "Server is running"
}
```

---

## 📊 Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid or missing token |
| 403 | Forbidden - Not allowed to perform action |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal server error |

---

## 🔒 Security Notes

- All passwords are hashed with bcryptjs
- Tokens expire after 30 days
- Email addresses are never exposed in profile endpoints
- CORS is restricted to configured frontend URL
- All inputs are validated
- Rate limiting recommended for production

---

## 🧪 Example Workflow

```bash
# 1. Signup
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com",...}'

# 2. Get token from response, then search
curl http://localhost:5000/api/users/search \
  -H "Authorization: Bearer TOKEN_HERE"

# 3. Send match request
curl -X POST http://localhost:5000/api/match/send \
  -H "Authorization: Bearer TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"toUserId":"USER_ID","exemptionCode":"23234"}'

# 4. Accept request (different user)
curl -X POST http://localhost:5000/api/match/REQUEST_ID/accept \
  -H "Authorization: Bearer DIFFERENT_TOKEN"
```

---

**Last Updated**: April 22, 2026
**API Version**: 1.0.0
