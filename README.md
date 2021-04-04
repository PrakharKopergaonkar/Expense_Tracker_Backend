# Backend logic for Expense Tracker

* Clone this repository.
* type "npm i" to install all the dependencies.
* Make sure nodemon is installed in your system globally.
* Make sure you have installed mongodb in you system
* type "npm run dev" and server will start running on PORT 5000.

## API's

### Necessary API's.
* POST /auth/signup : Registers user
* POST /auth/signin : Lets user logged in. Returns a jwt token that expires in 24hr.

### Not necessary but helpful in development API's
* GET /users/getAllUsers : Returns all Users
* DELETE /users/deleteAllUsers : Delete All Users.
