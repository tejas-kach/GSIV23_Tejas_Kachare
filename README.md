# GSIV23_Tejas_Kachare

Prerequisites
Before you begin, ensure that you have the following software installed on your machine:

Node.js (version 14 or later)
npm (Node Package Manager, comes with Node.js)
Installation
Clone the Repository: Start by cloning the repository of your Vite React app from your version control system (e.g., Git).

git clone <repository-url>
cd <repository-directory>
Install Dependencies: Use yarn to install the project dependencies.

   npm install

Get an API Key:
1. Create a personal account at: https://www.themoviedb.org/account/signup
2. Once you have created an account, go to: https://www.themoviedb.org/settings/api to create an API key
a. Usage: Personal
b. Application Name: Interview
c. Application URL: None
d. Application Summary: For a developer interview project

Add the API key to .env file to the variable REACT_APP_API_KEY
Start Dev server: npm run start

This command will compile and bundle your app and start a local development server.

Implemented Elements
1. Infinite Scroll- I have implemented the infinite scroll on the list page with some performance-tuning techniques which       improve the user experience.
2. API Integration
3. Global State Management using Redux Toolkit.
4. Routing and Navigation--The app implements routing and navigation using React Router. It ensures smooth navigation           between different views and maintains consistent URLs.

If given additional time,
1. I would have used Image Loading Optimization and Scroll Rendering Performance Techniques to increase the performance for     rendering images optimally.
2. I would have implemented SSR using React or learned Remix and written some unit test cases.
3. I would have improved the CSS and error-handling mechanisms.
4. I would have added some more features to the app.


