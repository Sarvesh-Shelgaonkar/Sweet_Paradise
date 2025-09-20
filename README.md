# tdd-sweet_shop_management
A full-stack Sweet Shop Management System built with the MERN stack, following TDD practices. Includes user authentication, sweet catalog, search, purchasing, inventory management, and admin CRUD operations with tested, reliable workflows.


# Features:

* **Authentication & Authorization**

  * User registration and login with JWT.
  * Role-based access: `admin` vs `user`.

* **Sweet Management**

  * Add, update, and delete sweets (admin only).
  * Search sweets by name.
  * View available sweets.

* **Security**

  * Passwords hashed with bcrypt.
  * JWT-based session management.
  * Admin-only routes protected with middleware.

* **Testing**

  * Unit and integration tests with Jest & Supertest.


## Tech Stack:

**Frontend**: React.js, Axios, Bootstrap
**Backend**: Node.js, Express.js, MongoDB (Atlas)
**Database**: MongoDB Atlas
**Auth**: JWT + bcrypt
**Testing**: Jest, Supertest

## Installation & Setup:

### Clone the Repository

git clone [https://github.com/<your-username>/sweet-shop-management.git](https://github.com/vidhikoul/tdd-sweet_shop_management.git)

cd tdd-sweet_shop_management


### Backend Setup

cd backend

npm install

Create a `.env` file inside `backend/`:

.env should contain

PORT=5000

MONGODB_URI=your_mongodb_atlas_uri

JWT_SECRET=your_jwt_secret

Run backend:

npm run dev


### Frontend Setup

cd frontend

npm install

npm start

The app will be available at:

Frontend → `http://localhost:3000`

Backend → `http://localhost:5000`

## Screenshots:

1. **Login Page**
   
<img width="1439" height="842" alt="Screenshot 2025-09-20 at 9 17 01 PM" src="https://github.com/user-attachments/assets/b6609247-516d-405d-86b0-b1dd8a6610b8" />

2. **Register Page**

  <img width="1439" height="842" alt="Screenshot 2025-09-20 at 9 17 13 PM" src="https://github.com/user-attachments/assets/a90767b8-84f5-43a0-bd1a-35b2c03ee45d" />

3. **Sweet List (User View)**
   
   <img width="1439" height="842" alt="Screenshot 2025-09-20 at 9 17 22 PM" src="https://github.com/user-attachments/assets/6327cfb4-612d-446d-a734-a1df0c77bb9a" />

4. **Dashboard - Add Sweet**
   
<img width="1439" height="842" alt="Screenshot 2025-09-20 at 9 17 32 PM" src="https://github.com/user-attachments/assets/d6abe2e2-dc69-41c4-bb89-9fb36a5154eb" />

  
5. **Cart Update/Delete Sweet**
    
![WhatsApp Image 2025-09-20 at 21 33 45](https://github.com/user-attachments/assets/e63d0e87-cad3-49c6-90bf-d903baf5439e)


## Testing:

Run tests from the backend:

cd backend

npm test

1. **Mongo DB connection screenshot** 

<img width="1440" height="900" alt="Screenshot 2025-09-20 at 8 56 58 PM" src="https://github.com/user-attachments/assets/e710e1c9-afc3-4d03-8007-94f147c14f9b" />

2. **test results screenshot** 

<img width="1440" height="900" alt="Screenshot 2025-09-20 at 8 12 39 PM" src="https://github.com/user-attachments/assets/05b60082-ea38-4db7-ad4c-f60c69202b81" />


## My AI Usage:

As part of this project, I used **AI tools responsibly** to accelerate development and improve quality.

* **AI Tools Used**

  * ChatGPT

  * GitHub Copilot (for in-editor suggestions)

* **How I Used Them**

  * ChatGPT helped me:
    * Debug CORS, MongoDB Atlas, and authentication issues.
    * Generate boilerplate code for React forms and Express routes.
    * Create test cases with Jest and Supertest.


  * GitHub Copilot assisted me in:
    * Writing repetitive frontend code (React form handlers, Axios requests).
    * Suggesting quick test snippets.

## Author:

**Vidhi Koul**
  mailto:koulvidhi2@gmail.com
  
🔗 [[LinkedIn Profile](https://www.linkedin.com/in/vidhi-koul/)](#)

🔗 [[GitHub Profile](https://github.com/vidhikoul)](#)
