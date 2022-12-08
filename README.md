# teebo
### By Devi Raju, Muhammad Usama, Kasey Valdez
A community where users can discuss their favourite TV shows. This app caters to passionate fans who want active discussions on their favourite shows.

## Final Product
User's profile page
![User's profile page.](https://github.com/muhammad-usama12/teebo/blob/main/frontend-react/docs/teebo-user-profile.png?raw=true)

Post marked as spoiler is blurred
![Blurred user post and comments.](https://github.com/muhammad-usama12/teebo/blob/main/frontend-react/docs/teebo-spoiler-with-comments.png?raw=true)

Users can edit their profile
![Edit profile page.](https://github.com/muhammad-usama12/teebo/blob/main/frontend-react/docs/teebo-edit-profile.png?raw=true)

## Getting Started
1. Create the .env by using .env.example as a reference and update the .env file with your correct local information
  - username: labber
  - password: labber
  - database: finals
  - secret cookie: finals
2. Install dependencies: `npm i`
3. Reset database from express-api directory: `npm run db:reset`
4. Run the server from express-api directory: `npm run local`
5. Run client development server from frontend-react directory: `npm start`
6. Visit: `http://localhost:3000/`