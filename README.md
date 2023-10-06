<h1 align="center"></h1>

<div align="center">
  <a href="http://nestjs.com/" target="_blank">
    <img src="https://nestjs.com/img/logo_text.svg" width="150" alt="Nest Logo" />
  </a>
</div>

<h3 align="center">A <a href="http://nestjs.com/" target="_blank">NEST JS</a> BOOK STORE MINI PROJECT</h3>

<div align="center">
  <a href="https://nestjs.com" target="_blank">
    <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="License" />  
    <img src="https://img.shields.io/badge/built%20with-NestJs-red.svg" alt="Built with NestJS">
  </a>
</div>

### Installation

```bash
git clone https://github.com/indra-yana/book-store.git

cp .env.example .env

setup .env

create database using postgre

npm install

npm run migration:up

npm run seed:up
 
npm run start:dev

visit localhost:3000

done!      
```

### Command

```bash
npm run entity:create entity-name             // Create typeorm entity

npm run seed:create seeder-name               // Create seeder file. ex: npm run seed:create Users_Table_Seeder [Title case format]
npm run seed:up                               // Run seeder file
npm run seed:down                             // Revert seeder file
npm run seed:show                             // Show seeder file

npm run migration:create migration-name       // Create migration file. ex: npm run seed:create Create_Users_Table [Title case format]
npm run migration:up                          // Run migration file
npm run migration:down                        // Revert migration file

npm run build                                 // build the project
npm run start:dev                             // start development server
npm run start:prod                            // start production server
```

### API SPEC

#### Base URL :

```bash
http://localhost:3000
```

#### General Header :

```json
{
    "Content-Type": "application/json",     // Optional for some route
    "Accept": "application/json",           // Accept response as json
    "Accept-Language": "id",                // id|en
}
```

#### General Params :
```bash
  # Query params for pagination
  # ex: /api/v1/user/list?page=1&limit=10

  page: numeric
  limit: numeric
```

#### Response :

Success Response :

```json
{
    "code": 200,
    "message": "Success Message",
    "data": {
        "success_data"
    }
}
```

Error Response :

```json
{
    "code": 500,
    "message": "Error Message",
    "error": {
        "error_data"
    }
}
```

#### Available REST API

- [Postman Collection](https://github.com/indra-yana/book-store/tree/master/postman)
- [Swagger](http://127.0.0.1:3000/api/v1/doc)

| Name | Method | Path |
| --- | --- | --- | 
| Get Member | GET | `/api/v1/user/members` |
| Get Book | GET | `/api/v1/book/list` |
| Borrow Book | POST | `/api/v1/book/borrow` |
| Returned Book | POST | `/api/v1/book/returned` |

### Author

- [Indra Muliana](https://github.com/indra-yana) - <a href="mailto:indra.ndra26@gmail.com" target="_blank">indra.ndra26@gmail.com</a>

### Testing

- TODO

### License

Licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
