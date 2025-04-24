### Practice REST-API
This is a personal practice creating an eCommerce app using the followings
technologies:

- Node.js (Express.js)
- React.js
- Typescript
- MongoDB (Mongoose)
- JWT

### Why?
This app will help to get the knowledge about how the technologies works together using APIs.

Still in development...

### How to use
Clone the repository `git clone` then split the terminal or open another, the
repository have two folder server that is the backend and client that is the
frontend, `cd client` and install the dependencies `npm install` and `cd server`
in the other terminal and do the same.

To run the server in development mode use `npm run dev` then use `npm run build`
to build the production mode, finaly use `npm run start` to start the server
ready to use.

> [!IMPORTANT]
> You need to create a .env file for the database and others enviroments
> variable in both server and client, an example for the server:
> DATABASE_URI=mongodb://localhost:27017/rest-practice
> PORT=3001
> PRIVATE_KEY=secret

The server backup You can backup your database data using the comand:
`npm run backup:ts` this run the collection.ts script that save the documents in each collections for the complete database.

Run `npm run backup` in dev mode to make a backup for the database, or
`npm run backup:json` in production mode, otherwise you can restore the database using `npm run restore`

To run the client can use `npm start` in dev mode or `npm run build` to
transpile the code from Typescript to Javascript and start the project.

### Backend
The entire application uses Typescript and JSON and the controllers endpoints are validated.

The backend have the followings endpoints and user authentication
using JWT and middleware validator 

User endponints
- post - /sign-up
- post - /log-in
- post - /log-out
- get - /users
- put - /update-user/:id
- delete - /delete-user/:id

Products endpoint
- post - /create-products
- get - /get-products
- get - /get-products/:id
- get - /get-products/by-category:id
- put - /update-products/:id
- delete - /delete-products/:id

Category endpoints
- post - /create-category
- get - /get-categories
- get - /get-categories/:id
- put - /update-category/:id
- delete - /delete-category/:id

### Frontend
The Client app was made using Typescript applying best practices like:

- Type safety
- Null safety
- Enviroment variables
- React hook useEffect
- Error validator

And all the components was created from scratch using:

- CSS modules
- CSS nesting
- CSS variables
- Web toolkit
- Media querys

The client app is intended to be responsive...

