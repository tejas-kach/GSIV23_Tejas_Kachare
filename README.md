# GSIV23_Tejas_Kachare

Live Demo: https://gsiv-23-tejas-kachare-9k4q.vercel.app/

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

I have implemented the infinite scroll on the list page with some performance-tuning techniques which improve the user experience and used redux toolkit for global state management.

If given additional time, I would have used Image Loading Optimization and Scroll Rendering Performance Techniques to increase the performance, I would have implemented SSR using react, written some react test cases and I would have improved the CSS and error handling mechanisms.


