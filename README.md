# StudentConnect

## Introduction  
StudentConnect is a web-based platform designed to connect students for marketplace and listings. It provides features like chat functionality.

## Features  
- **Listings & Marketplace**: Users can create, browse, and manage marketplace items, apartment listings.  
- **Chat System**: A built-in chat feature for direct communication between users, especially for listing inquiries.  
- **Profile Management**: Users can create and manage their profiles, enabling better interaction and personalized content.

## Frontend  
- **Frontend Framework**: React.js  
- **UI Library**: Material-UI for styling  
- **Client Routing**: React Router  
- **State Management**: React Context API  
- **Components**: Functional components and hooks for a responsive, dynamic user experience.

## Backend  
- **Framework**: Node.js, Express  
- **Database**: Supabase  
- **Authentication**: JWT (JSON Web Tokens)  

## Prerequisites  
- Node.js and npm must be installed on your local machine.  
- A GitHub account to clone and manage the repository.  

---

## **Backend Setup & Run**  
1. **Clone the Repository**  
   ```bash  
   git clone https://github.com/your-username/studentconnect.git  
   cd studentconnect  
   ```  
2. **Navigate to the backend folder**  
   ```bash  
   cd api  
   ```  
3. **Install Backend Dependencies**  
   ```bash  
   npm install  
   ```  
4. **Setup Environment Variables**  
   - Create a `.env` file in the backend directory.  
   - Add your environment variables (e.g., database URL, JWT secret).  
   ```env  
   JWT_SECRET=your-jwt-secret  
   SUPABASE_URL=your-supabase-url  
   SUPABASE_ANON_KEY=your-supabase-anon-key  
   ```  
5. **Run the Backend Server**  
   ```bash  
   node server.js  
   ```  

---

## **Frontend Setup & Run**  
1. **Navigate to the frontend folder**  
   ```bash  
   cd client  
   ```  
2. **Install Frontend Dependencies**  
   ```bash  
   npm install  
   ```  
3. **Run the Frontend**  
   ```bash  
   npm start  
   ```  
   - The frontend will be available at `http://localhost:3000`.

---

## Usage  
- **Profile Setup**: Users can create/edit their profiles for a personalized experience.  
- **Marketplace**: Post and browse listings like textbooks, study resources.  
- **Chat System**: Connect with sellers or other users via chat for inquiries.

## Acknowledgments  
Thank you to my professor, Ray Toal, for guidance and support throughout the development of this project.

---

## Project Details  
**Project Name**: StudentConnect  
**Developer**: Jaini Shah   
**Version**: 1.0  
