[![pl](https://img.shields.io/badge/lang-pl-blue.svg)](https://github.com/ukashu/goodteacher-api/blob/main/readme/README.pl.md)
<div align="center">
  <img src="./readme/banner_api_round.svg" width="60%" height="auto"/>
  <p>:warning: This is a repository for the backend side of this project - you can find client side in the <a href="https://github.com/ukashu/goodteacher">goodteacher</a> repository.</p>
</div>

>## Description
Mobile app goodteacher is an online replacement of a student notebook. It's made for teachers and students, primarily with music schools in mind, but it can be used in any field. Teachers can create classes, add students to them and send out tasks for students. The students can join classes and manage their task - complete or add more of them. It is a mobile application written in React Native with a Node.js server and a database.

>## Tech stack
<ul>
  <p>Server:</p>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
    </ul>
  <p>Database:</p>
    <ul>
      <li>PostgreSQL</li>
      <li>Redis</li>
      <li>Prisma</li>
    </ul>
  <p>Authentication:</p>
    <ul>
      <li>JSON Web Token</li>
    </ul>
  <p>Testing:</p>
    <ul>
      <li>Jest</li>
    </ul>
  <p>Other:</p>
    <ul>
      <li>Zod</li>
      <li>i18next</li>
      <li>Nodemailer</li>
      <li>express-rate-limit</li>
    </ul>
</ul>

>## Prerequisites

<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://www.npmjs.com/">npm</a></li>
  <li><a href="https://redis.io/">Redis</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
</ul>

>## Installation

1. Clone the project repository.
2. Go to the project directory.
3. Create an ```.env``` file in the main directory of the following structure:
```
PORT = <server port number>
JWT_SECRET = <key used for creating sesion tokens>
NODE_ENV = <"development" or "production" - in production error responses don't include stack traces>
EMAIL_USER = <outlook email for sending confirmation emails>
EMAIL_PASS = <password to the email>
EMAIL_SECRET = <key used for creating email confirmation tokens>
REDIS_URL = <url of Your Redis server>
DATABASE_URL = <for postgresql database hosted on local machine - postgres://[USERNAME]:[PASSWORD]@localhost:5432/[DATABASE_NAME]>
```
4. Run ```npm install``` <- this will install needed dependencies
5. Run ```npx prisma migrate dev``` <- this will initialize the Postgres database
6. Run ```npm run dev``` <- this will start the server
