# JobConnect ( Basic Job Portal )

## Tech Stack Used
- **Frontend:** React.js
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Others:** Axios for API calls, Mongoose for MongoDB ODM

## Instructions to Run the Project

1. **Clone the repository**
   ```bash
   git clone https://github.com/jerilalbi/JobConnect
   cd <project_folder>
   ```

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   cd frontend
   npm install
   cd ..
   ```

3. **Restore the MongoDB Database**
   - Make sure MongoDB is installed and running locally.
   - Restore the collections from the `database/` folder:
     ```bash
     mongorestore --db <your_database_name> ./database
     ```

4. **Run the backend server**
   ```bash
   cd backend
   npm run dev
   ```

5. **Run the frontend**
   ```bash
   cd frontend
   npm start
   ```

7. Access the application at `http://localhost:3000`.

## Features
- User authentication and authorization using JWT
- Apply for jobs
- View and download resumes

## Screenshots
### Login Page
![image](screenshots/login.jpeg)
### Sign Up Page
![image](screenshots/signup.jpeg)
### Admin Dashboard Page
![image](screenshots/admin_dashboard.jpeg)
### Job Seeker Dashboard Page
![image](screenshots/job-seeker-dashboard.jpeg)
### Employer Dashboard Page
![image](screenshots/employer_dashboard.jpeg)
### Post New Job Sec
![image](screenshots/post_new_job.jpeg)
### View Applicants Sec
![image](screenshots/view_applicants.jpeg)
### Job Search Page
![image](screenshots/job_search.jpeg)
