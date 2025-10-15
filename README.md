# Sweet Paradise 🍭

A full-stack sweet shop management system built with React.js frontend and Node.js backend.

## Features

- **User Authentication**: Login and registration system
- **Product Catalog**: Browse available sweets and confectioneries
- **Shopping Cart**: Add items to cart and manage orders
- **Admin Panel**: Manage inventory and view transactions
- **Inventory Management**: Track stock levels and product details

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios for API calls
- CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Project Structure

```
Sweet_Paradise/
├── frontend/          # React.js frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── apis/         # API integration
│   │   └── ...
│   └── package.json
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   └── config/      # Database configuration
│   └── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

4. Seed the database (optional):
   ```bash
   npm run seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The frontend will run on `http://localhost:3000` and backend on `http://localhost:5000`.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Sweets
- `GET /api/sweets` - Get all sweets
- `POST /api/sweets` - Add new sweet (Admin only)
- `PUT /api/sweets/:id` - Update sweet (Admin only)
- `DELETE /api/sweets/:id` - Delete sweet (Admin only)

### Inventory
- `GET /api/inventory` - Get inventory status
- `PUT /api/inventory/:id` - Update inventory

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Author

Sarvesh Shelgaonkar