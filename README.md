Speer Note API

The Speer Note API is a powerful tool for managing your notes. It provides various endpoints for user authentication, note management, and keyword-based note searching. Below, you'll find a detailed guide on how to interact with the API, along with key features and example requests.

Table of Contents
Base URL
Authentication
Endpoints
Authentication Routes
1. User Registration (Sign-Up)
2. User Authentication (Sign-In)
Note Routes
1. Get Notes
2. Create Note
3. Delete Note
4. Update Note
5. Share Note
6. Search Notes
Example Usage
Retrieve Notes
Create Note
Delete Note
Update Note
Share Note
Search Notes
Contributing
License
Base URL
The base URL for the production environment is https://speer-note.vercel.app/api.

Authentication
The API uses JSON Web Tokens (JWT) for authentication. To access authenticated routes, include a valid JWT in the Authorization header of your requests.

Endpoints
Authentication Routes
1. User Registration (Sign-Up)
Endpoint: /auth/signup
Method: POST
Request Body:
json
Copy code
{
  "name": "Your Name",
  "email": "your.email@example.com",
  "password": "your_password"
}
Response:
Success:
json
Copy code
{
  "message": "User registered successfully."
}
Failure:
json
Copy code
{
  "message": "Email address is already in use."
}
2. User Authentication (Sign-In)
Endpoint: /auth/login
Method: POST
Request Body:
json
Copy code
{
  "email": "your.email@example.com",
  "password": "your_password"
}
Response:
Success:
json
Copy code
{
  "message": "JWT_ACCESS_TOKEN"
}
Failure:
json
Copy code
{
  "message": "Unregistered user"
}
Note Routes
1. Get Notes
Endpoint: /notes
Method: GET
Authorization Header: Bearer JWT_ACCESS_TOKEN
Response:
Success:
json
Copy code
{
  "success": true,
  "message": "Notes retrieved successfully.",
  "data": [/* Array of notes */]
}
No Notes Found:
json
Copy code
{
  "success": true,
  "message": "No notes available for your account.",
  "data": []
}
2. Create Note
Endpoint: /notes
Method: POST
Authorization Header: Bearer JWT_ACCESS_TOKEN
Request Body:
json
Copy code
{
  "text": "Your note text"
}
Response:
json
Copy code
{
  "success": true,
  "message": "Note created successfully.",
  "data": /* Created note object */
}
3. Delete Note
Endpoint: /notes/delete/:noteid
Method: DELETE
Authorization Header: Bearer JWT_ACCESS_TOKEN
Response:
json
Copy code
{
  "success": true,
  "message": "Note deleted successfully."
}
4. Update Note
Endpoint: /notes/update/:noteid
Method: PUT
Authorization Header: Bearer JWT_ACCESS_TOKEN
Request Body:
json
Copy code
{
  "text": "Updated note text"
}
Response:
json
Copy code
{
  "success": true,
  "message": "Note updated successfully.",
  "data": /* Updated note object */
}
5. Share Note
Endpoint: /notes/share/:shareduserid/:noteid
Method: POST
Authorization Header: Bearer JWT_ACCESS_TOKEN
Response:
json
Copy code
{
  "success": true,
  "message": "Note shared successfully."
}
6. Search Notes
Endpoint: /search?q=your_query
Method: GET
Authorization Header: Bearer JWT_ACCESS_TOKEN
Response:
json
Copy code
{
  "success": true,
  "message": "Search results retrieved successfully.",
  "data": [/* Array of search results */]
}
Example Usage
Retrieve Notes
bash
Copy code
curl -X GET https://speer-note.vercel.app/api/notes -H "Authorization: Bearer JWT_ACCESS_TOKEN"
Create Note
bash
Copy code
curl -X POST https://speer-note.vercel.app/api/notes -H "Authorization: Bearer JWT_ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"text":"Your note text"}'
Delete Note
bash
Copy code
curl -X DELETE https://speer-note.vercel.app/api/notes/delete/:noteid -H "Authorization: Bearer JWT_ACCESS_TOKEN"
Update Note
bash
Copy code
curl -X PUT https://speer-note.vercel.app/api/notes/update/:noteid -H "Authorization: Bearer JWT_ACCESS_TOKEN" -H "Content-Type: application/json" -d '{"text":"Updated note text"}'
Share Note
bash
Copy code
curl -X POST https://speer-note.vercel.app/api/notes/share/:shareduserid/:noteid -H "Authorization: Bearer JWT_ACCESS_TOKEN"
Search Notes
bash
Copy code
curl -X GET https://speer-note.vercel.app/api/search?q=your_query -H "Authorization: Bearer JWT_ACCESS_TOKEN"
Feel free to explore more functionalities and tailor them to your needs! If you have any questions or issues, please reach out to us. Happy noting!

Contributing
To contribute to the Speer Note API, please follow our contribution guidelines.

License
This project is licensed under the MIT License - see the LICENSE file for details.
