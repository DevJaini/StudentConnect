# StudentConnect

## Introduction  
StudentConnect is a web-based platform designed to connect students for collaborative activities, marketplace listings, and communication. It provides features like event listings, chat functionality, and resource sharing to enhance student engagement and accessibility.

## Features  
- **Listings & Marketplace**: Users can create, browse, and manage marketplace items, apartment listings.  
- **Chat System**: A built-in chat feature for direct communication between users, especially for listing inquiries.  
- **Profile Management**: Users can create and manage their profiles, enabling better interaction and personalized content.  

## Technologies Used  
- **Frontend**: React.js  
- **Backend**: Node.js, Express  
- **Database**: Supabase  
- **Authentication**: JSON Web Tokens (JWT)  

## Prerequisites  
- Node.js and npm must be installed on your local machine.  
- A GitHub account to clone and manage the repository.  

## Getting Started  
### 1. Clone the Repository  
```bash
git clone https://github.com/your-username/studentconnect.git
cd studentconnect
```

### 2. Install Dependencies  
```bash
npm install
```

### 3. Setup Environment Variables  
- Create a `.env` file in the root directory.  
- Add your environment variables (e.g., database URL, JWT secret, etc.).  
- Example `.env` file:  
```dotenv
JWT_SECRET=your-jwt-secret
```

### 4. Run the Backend Server  
```bash
npm run dev
```

## Usage  
- **Profile Setup**: Users can create/edit their profiles for a personalized experience.  
- **Marketplace**: Post and browse listings like textbooks, study resources, etc.  
- **Chat System**: Connect with sellers or other users via chat for inquiries.  

---

### Acknowledgments  
Thank you to my professor, Ray Toal, for guidance and support throughout the development of this project.
