# Product Catalogue REST API — TDD & BDD

Educational starter project using JavaScript, Express, Sequelize/SQLite, Jest, Supertest, Cucumber and Selenium WebDriver.

## Run

```bash
npm install
npm test
npm start
```

Open http://localhost:8080 for the admin UI. For browser scenarios, keep the server running in one terminal and run `npm run test:bdd` in another. Chrome and an appropriate Selenium browser driver are required. Do not run API tests and BDD tests simultaneously against the same SQLite database.

## REST endpoints

`POST /api/products`, `GET /api/products`, `GET /api/products/:id`, `PUT /api/products/:id`, `DELETE /api/products/:id`.

Filters: `?name=`, `?category=`, `?available=true|false`.

## Grading file mapping

- Task 1: `tests/factories.js`
- Task 2: `tests/models/product.test.js`
- Task 3: `tests/routes/products.test.js`
- Task 4: `src/routes/products.js`
- Task 5: `features/step_definitions/load_steps.js`
- Task 6: `features/products.feature`
- Task 7: `features/step_definitions/web_steps.js`

Review, understand, test, and modify all generated materials to align with your actual course lab and academic-integrity rules before submitting.
