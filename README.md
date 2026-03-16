🛡 ScamGuard – JWT Authentication Project

A full-stack ScamGuard application demonstrating secure user authentication using JWT (JSON Web Tokens).
This project features a backend API for authentication and a frontend for user interaction, designed for learning, testing, or hackathon purposes.
🔑 Features
User Authentication
Secure login & registration
Password hashing with bcrypt
JWT-based token authentication
Frontend
User-friendly interface with login and dashboard
Screenshots included in screenshots/ folder
Backend
REST API built with Python/Flask (or Node.js if applicable)
JWT token validation for secure endpoints
Security
Tokens expire after a configurable time
Sensitive data never stored in plaintext
Clean Git History
.gitignore configured for venv and node_modules
BFG used to remove large files from history
📂 Project Structure
scamguard/
├─ backend/                 # API & server logic
├─ frontend/                # React frontend
├─ screenshots/             # App screenshots
├─ venv/                    # Python virtual environment (ignored)
├─ .gitignore               # Ignores node_modules, venv, .DS_Store
└─ README.md                # Project documentation
⚙️ Installation
1. Clone the repository
git clone https://github.com/SaloniGupta6/experiment6-jwt-authentication.git
cd experiment6-jwt-authentication
2. Setup Backend (Python/Flask example)
cd backend
python3 -m venv venv
source venv/bin/activate   # macOS/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
3. Setup Frontend (React)
cd ../frontend
npm install
npm start
The frontend runs on http://localhost:3000 and backend on http://localhost:5000 (default).
🚀 Usage
Register a new user on the frontend.
Login to receive a JWT token.
Access protected routes using your JWT.
Explore backend API via Postman or your browser.
🧰 Technologies Used
Backend: Python, Flask, JWT, bcrypt
Frontend: React.js, CSS, AOS animations
Database: SQLite / MySQL / PostgreSQL (update if used)
Version Control: Git, GitHub
Other Tools: BFG Repo-Cleaner (for large file removal), Node.js, npm
📸 Screenshots
DETECTSCAM.png – Dashboard / Detection page
LOGIN.png – Login page
API.png – Example API request
H2_CONSOLE.png – Backend database console view
✅ Clean Git Practices
.gitignore includes:
venv/
frontend/node_modules/
.DS_Store
Large files removed using BFG: node_modules and venv
Reduced repo size for faster cloning
