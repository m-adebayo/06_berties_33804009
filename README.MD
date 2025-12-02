# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

To protect mySQL database password, I implemented an environment variable manangement using dotenv.

How I implemented it:
- Install dotennv
  - Ran npm install dotenv

- Create a .env file
  - Stored all database credentials

- Updated index.js
  - Made it load the environment variables

- Added .env to .gitignore
  - Ensures senssetive information is stored outside the codebase

I also added an audit log to enhance security

How I implemented it:
- Database setup
  - Created a table called audit_log in mySQL
    - Captured username, login status and the timestamp

- Log
- Inserts the successful logins with success
- Inserts the failed logins with fail

Week 8 saw an update of ensuring that a user has logged in before accessing specific pages. These pages include:
- Audit Log
- User List
- Adding a book

I also added validation on the following pages:
- Login
  - Ensure that the entered password is 8 characters
  - Ensure that the first and last name arent empty
  - Ensure that the email is in email format
  - Ensure that the username is 5 letters
  - If any of these fails, the registration form shall re-render.

  Finally, I added sanitization to the forms for adding a book, and for registration/login.This blocks potiential XSS attacks.

Week 9 I added the weather forecast, using an API.
I did this by:
- Generating an API key
- Initialising the API key
- Pulling out each relevant property of the weather object

I then used this to accept user inputs on different cities and produce an output based on the users search result. 
Finally I provided my page as an API, which allows other people to utilise data from my page. The data is stored in a JSON format, allowing for users to see each book as an object with the properties id, name, price and author. 
The API can also be searched through, by using link ../api/books?search=(userSearch), where (userSearch) is a term the user is searching for.
Another method of search I have added is throught the minimum price and maximum price. If the user searches http://localhost:8000/api/books?minprice=10&maxprice=30, it will show books between 10 and 30 pounds.