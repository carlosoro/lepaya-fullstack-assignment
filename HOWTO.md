# HOW TO

## Prerequisites
- Docker Compose
- Node (This was build with version 21.1.0)

### Note: To run this application, you need to have both ports 3000 and 5137 available.

## Running the project
- First we spin up the postgres docker service, in the project's root run: `docker-compose up -d`
- Once the docker service is up, in the project root, run: `npm start`
- After the command finish executing, the frontend will be available through url: `http://localhost:5173` and the backend api will be available through: `http://localhost:3000`

## Assumptions for assigment solution
- No user login autentication was develop, there is no session implementation nor authentication process
- Locations and fruits in the FE are "hardcoded" using JSON files to serve the options. This needs to be changed when endpoints in the BE are created for this

## Frontend
There are two routes:
Route | Description
-- | -- 
/ledgers/reports | Shows a form to retrieve the consumption reports
/ledgers/purchases | Allows the user to register fruit purchases

## Backend
We have two endpoints available:
Endpoint | Description | parameters
-- | -- | --
GET /ledgers/reports | Returns the consumption reports | `locationId: required` `year: required`
POST /ledgers/purchases | Allows the user to register fruit purchases | `body: required`

For the POST /ledgers/purchases endpoint, the request format will be:

```console
curl --location 'http://localhost:3000/ledgers/purchases' \
--header 'Content-Type: application/json' \
--data '{
    "locationId": 1,
    "fruits": [
        {
            "fruitId": 1,
            "amount": 1
        },
                {
            "fruitId": 2,
            "amount": 10
        }
    ]
}'
```

## Tests

This project has test coverage. To run the test, in the project's root just do the following:
- Frontent: run `npm run test:client`
- Backend
    - Unit tests: run `npm run test:server`
    - E2E tests: run `npm run test:server-e2e`