# cs465-fullstack
CS-465 Full Stack Development with MEAN
CS 465 Final Project

This project is a full stack web application developed using the MEAN stack (MongoDB, Express, Angular, Node.js). The application serves both a customer-facing website and an administrative single-page application (SPA) used to manage trip data. In the final iteration, secure login authentication was implemented using JSON Web Tokens (JWT) to protect administrative routes and ensure only authorized users can create or update trips.

Architecture
Frontend Comparison: Express HTML vs. Angular SPA

In this project, I worked with two different types of frontend development. The customer-facing side of the application uses Express with server-side rendering and Handlebars templates. When a user visits a page, the server processes the request and renders a complete HTML page before sending it to the browser. This approach is straightforward and effective for static or lightly interactive content.

The administrative side of the application uses Angular to build a single-page application (SPA). Unlike Express-rendered HTML, Angular runs entirely in the browser after the initial load. Instead of reloading the entire page for each interaction, Angular dynamically updates components and views using client-side routing and reusable UI components. This creates a faster and more responsive user experience.

The SPA provides richer functionality compared to a traditional web application interaction. For example, when adding or editing a trip, the page does not reload; the data is sent to the API and the UI updates accordingly. Angular’s component-based architecture also allowed me to reuse UI logic (such as trip cards and forms), which made the application more maintainable and scalable.

Why MongoDB (NoSQL) Was Used

The backend uses MongoDB, a NoSQL database, because it stores data in flexible JSON-like documents. This structure works well with JavaScript-based technologies and aligns naturally with how data is structured in Angular and Express.

Using MongoDB simplified development because:

Data is stored in document form, similar to JSON objects.

There is no need for rigid schemas like in relational databases.

It integrates seamlessly with Mongoose for model validation and data management.

It scales well for applications that may expand over time.

MongoDB complements the MEAN stack by keeping everything JavaScript-based from frontend to database.

Functionality
JSON vs. JavaScript

JSON (JavaScript Object Notation) is a data format used for transmitting structured data between systems. While it looks similar to JavaScript objects, JSON is purely a text format and does not support functions, comments, or complex types.

In this project, JSON serves as the communication bridge between the frontend and backend:

Angular sends JSON in POST and PUT requests.

Express receives JSON through API endpoints.

MongoDB stores documents in a format similar to JSON.

The API returns JSON responses to the Angular SPA.

Without JSON, the frontend and backend would not be able to communicate in a standardized and efficient way.

Refactoring and Reusable UI Components

Throughout the development process, I refactored several parts of the application to improve efficiency and maintainability. Examples include:

Separating trip logic into a TripDataService to centralize API calls instead of duplicating HTTP logic across components.

Creating reusable components such as TripCardComponent instead of hardcoding layout markup multiple times.

Implementing a JWT interceptor to automatically attach authentication headers rather than manually adding tokens to each request.

Cleaning up controller logic on the backend by wrapping database calls in try/catch blocks to prevent server crashes.

The benefits of reusable UI components include:

Reduced duplicated code

Easier debugging

Cleaner separation of concerns

Improved scalability for future feature additions

Testing

Testing in a full stack application involves validating multiple layers of communication between frontend, backend, and database.

API Endpoint Testing

I tested API endpoints using:

Postman to manually verify GET, POST, and PUT requests.

Browser DevTools Network tab to inspect requests and responses.

Console logging on both frontend and backend to track request flow.

Each endpoint required verification of:

Correct HTTP method (GET, POST, PUT)

Correct URL and route configuration

Proper status codes (200, 401, 404, etc.)

Correct JSON request and response format

Security Testing

Adding JWT authentication introduced additional testing complexity. I had to confirm that:

Login returned a valid JWT token.

The token was stored in browser storage.

The Angular interceptor correctly attached the Authorization: Bearer <token> header.

Protected routes rejected requests without valid tokens.

Unauthorized access returned proper 401 responses.

Testing secure endpoints required verifying both functionality and correct error handling when authentication failed.

Reflection

This course significantly strengthened my understanding of full stack development. Before this class, frontend and backend felt like separate areas of study. This project helped me understand how they connect through APIs, data models, authentication, and structured communication.

Skills I developed or strengthened include:

Designing and implementing RESTful APIs

Working with MongoDB and Mongoose schemas

Implementing JWT-based authentication

Debugging across frontend and backend systems

Building reusable Angular components

Using interceptors and services to manage application logic

Diagnosing and fixing routing and middleware errors in Express

More importantly, I gained confidence in troubleshooting complex, multi-layered problems. Debugging authentication issues, resolving middleware errors, and fixing controller exports required a deeper understanding of how each layer interacts.

Completing this project has made me more comfortable working in a full stack environment and more confident in discussing architecture, security, and API design. These skills directly support my goal of becoming a well-rounded software developer and a stronger candidate in the technology field.
