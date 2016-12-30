## Overview
This is an sample node.js backend that sends an email using mailgun

Important! The to email MUST be added to the whitelist for the account.

This is started from a boilerplate by KunalKapadia: KunalKapadia/express-mongoose-es6-rest-api.git

Original document from mail exercise from Brightwheel linked here for reference:
https://drive.google.com/file/d/0B2PWNPISLaXdbVJHalgxWGVET2c/view



## Getting Started

Clone the repo:
```sh
git clone git@github.com:kenzanboo/mail.git
cd mail
```

Install yarn:
```js
npm install -g yarn
```

Install dependencies:
```sh
yarn
```

# Start server
```sh
yarn start
```

# Send email
Example send email:
```sh
curl --data "to=kenzanboo@gmail.com&to_name=Mr.Fake&from=noreply@mybrightwheel.com&from_name=Brightwheel&subject=TestSubject&body=<h1>Your Bill</h1><p>$10</p>" http://localhost:4040/api/mail/
```


Tests:
```sh
# Run tests written in ES6 along with code coverage
yarn test

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

##Frameworks used:
NodeJS and Express seemed ideal for a simple web backend to send out process and relay data like this. 

I added in request-promise to keep all the code promisified. 

Code linting using ESLint

ES6 Babel because it makes code much cleaner and more understandable.

