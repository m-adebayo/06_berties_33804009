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