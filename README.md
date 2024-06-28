Real Estate Dashboard
This project is a real estate dashboard that allows users to view, add, update, and delete rental properties. The application supports two types of users: sellers and buyers. Sellers can manage their property listings, while buyers can view available properties and express interest in them by viewing the seller's contact details.

Features
Seller Flow
Add Property: Sellers can add new rental properties to the database by providing details such as place, area, number of bedrooms, number of bathrooms, and nearby facilities.
Update Property: Sellers can edit the details of their existing properties.
Delete Property: Sellers can remove their properties from the listing.
Manage Listings: Sellers can view and manage all their listed properties.
Buyer Flow
View Properties: Buyers can view all the posted rental properties.
Express Interest: Buyers can click on the "I'm Interested" button on any property to view the seller's contact details and name.
Filter Properties: Buyers can apply filters based on various property details to narrow down their search.
Technologies Used
React: Front-end framework for building user interfaces.
Firebase Firestore: NoSQL database for storing property data.
Firebase Authentication: For user authentication and role management.
React Router: For navigation and routing within the application.
CSS: For styling the application.
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/yourusername/real-estate-dashboard.git
Navigate to the project directory:

sh
Copy code
cd real-estate-dashboard
Install the dependencies:

sh
Copy code
npm install
Create a Firebase project and configure Firestore and Authentication.

Add your Firebase configuration to the project. Create a file named firebase.js in the src directory and add the following code:

js
Copy code
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
Start the development server:

sh
Copy code
npm start
Usage
Sign Up / Login: Users can sign up or log in using their email and password. Upon successful authentication, users will be assigned a role (seller or buyer).
Dashboard:
Sellers: Can access a form to add new properties and view, update, or delete their existing properties.
Buyers: Can view all available properties and use filters to find properties matching their criteria. Clicking the "I'm Interested" button on a property will display the seller's contact details and name.
Code Structure
src/components: Contains all the React components for the application.
Dashboard.js: Main component for displaying and managing properties.
Login.js: Component for user login.
SignUp.js: Component for user registration.
Navbar.js: Component for navigation.
src/firebase.js: Firebase configuration and initialization.
src/styles: Contains CSS files for styling the application.
Contributing
Contributions are welcome! Please create a pull request with your changes or open an issue to discuss what you would like to improve.

License
This project is licensed under the MIT License. See the LICENSE file for details."# MjRentify" 
