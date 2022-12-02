# schedule-app-REST

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

REST API server for simple schedule app.
The app helps user to manage event members in a month by auto generating schedules of events in a designated month, 
so that user might assign and remove members from each events in the month.
The app also allows users to manage members and events record, such as add, update and delete events and members record.

### Built With

The app is built using ExpressJS framework with Typescript,
with JWT for user authentication and simple access control,
MySQL for database

* [![NodeJS][Node.js]][Node-url]
* [![Express.js][Express.js]][Express-url]
* [![MySQL][MySQL]][MySQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Make sure MySQL, Node & NPM is installed in local environment.

* <a href="[Node-url]">NodeJS & NPM</a>
* <a href="[MySQL-url]">MySQL</a>

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Gimindika/schedule-app-REST.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. create an environment file in root folder
   ```sh
   touch .env
   ```
4. Add the following variables to the created env file
   ```sh
   PORT=8000
   MY_SQL_DB_HOST=127.0.0.1
   MY_SQL_DB_USER='{mysql user here}'
   MY_SQL_DB_PASSWORD='{mysql user password here}'
   MY_SQL_DB_PORT=3306
   MY_SQL_DB_DATABASE='schedule_app'
   MY_SQL_DB_CONNECTION_LIMIT=4
   JWT_SECRET_KEY='{secret key here}
   BCRYPT_SALTROUNDS = 10
   ```
5. Run MySQL server in local environment
6. Create a database named "schedule_app"
7. Migrate Dummy Database
   ```sh
   npm run migrate
   ```
6. Build the app
   ```sh
   npm run build
   ```
7. Run the app
   ```sh
   npm run start
   ```
8. Or to run in development mode, skip step 6 & 7, instead run 
   ```sh
   npm run dev
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

For Endpoints example, kindly check Schedule App Postman Collection [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8457404-8d48180a-4d49-4457-b310-b765dafa9f02?action=collection%2Ffork&collection-url=entityId%3D8457404-8d48180a-4d49-4457-b310-b765dafa9f02%26entityType%3Dcollection%26workspaceId%3D86149d04-4b40-4068-b4e7-46b177326a3b#?env%5BLocal%5D=W3sia2V5IjoiYmFzZV91cmwiLCJ2YWx1ZSI6ImxvY2FsaG9zdDo4MDAwL2FwaSIsImVuYWJsZWQiOnRydWUsInR5cGUiOiJkZWZhdWx0Iiwic2Vzc2lvblZhbHVlIjoibG9jYWxob3N0OjgwMDAvYXBpIiwic2Vzc2lvbkluZGV4IjowfSx7ImtleSI6InRva2VuIiwidmFsdWUiOiIiLCJlbmFibGVkIjp0cnVlLCJ0eXBlIjoiYW55Iiwic2Vzc2lvblZhbHVlIjoiZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDJsa0lqb3pMQ0oxYzJWeVgyVnRZV2xzSWpvaVlXUnRhVzVBWVdSdGFXNHVZMjl0SWl3aWRYTmxjbDl1WVcxbElqb2lZV1J0YVc0aUxDSjFjMlZ5WDJGalkyVnouLi4iLCJzZXNzaW9uSW5kZXgiOjF9XQ==)
Make sure to check 
```sh
base_url
``` 
is set to 
```sh
localhost:8000/api
``` 
in environment variable

Please start with login route within auth module to generate token before accessing other routes.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Gerrit Indika Mulya - gimindika@gmail.com

Project Link: [https://github.com/Gimindika/schedule-app-REST](https://github.com/Gimindika/schedule-app-REST)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[Node.js]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/en/
[MySQL]: https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://www.mysql.com/


