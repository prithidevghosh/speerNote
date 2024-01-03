# Speer Note API

### The Speer Note API is a powerful tool for managing your notes. It provides various endpoints for user authentication, note management, and keyword-based note searching. Below, you'll find a detailed guide on how to interact with the API, along with key features and example requests.

|Deployed Link|
| --- |
|`https://speer-note.vercel.app/api`|

<h3><i>Prerequisites</i></h3>
<ul>
<li>Node.js v14.15.0 or higher</li>
<li>NPM v6.14.8 or higher</li>
<li>MongoDB v4.4 or higher</li>
</ul>

### Authentication
The API uses JSON Web Tokens (JWT) for authentication. To access authenticated routes, include a valid JWT in the Authorization header of your requests.
The endpoints with a :lock: at end, signifies a protected route

*steps to locally configure and run this app*


## Clone the repo
```bash

git clone https://github.com/prithidevghosh/speerNote.git


```
## Install the required packages
```bash

npm install

```

## Start the server locally
```bash

nodemon

```


<h3><i>Configuration</i></h3>

<p>The application requires a MongoDB instance to be set up. You can configure the database connection by setting the following environment variables:</p>

```bash

MONGOURI = "your mongo cluster URI"
PORT=8008
TOKEN_SECRET = "your own token secret"

```
<p>You can set these environment variables in a .env file in the root directory of the application.</p>

<h3><i>API Endpoints</i></h3>


| Endpoint Name | Method | Purpose |
| --- | --- | --- |
| `/auth/signup` | POST | User Registration (Sign-Up) |
| `/auth/login` | POST | User Authentication (Sign-In) |
| `/notes` :lock:| GET | Retrieve Notes |
| `/notes` :lock:| POST | Create Note |
| `/notes/delete/:noteid` :lock:| DELETE | Delete Note |
| `/notes/update/:noteid` :lock:| PUT | Update Note |
| `/notes/share/:shareduserid/:noteid` :lock:| POST | Share Note |
| `/search?q=your_query` :lock:| GET | Search Notes |


<h3><i>Example prod curl</i></h3>

```bash

curl --location 'https://speer-note.vercel.app/api/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"ghosh1@email.com",
    "password":"ghosh1"
}'

```
