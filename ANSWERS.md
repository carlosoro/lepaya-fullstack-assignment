# Answers

## How long did you spend on the coding test?
I spent 12 hours spread over a period of 7 days.

## What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

I would add the locations and fruits GET routes to provide the FE with the locations and fruits options. Now those options are server in the FE from json files.

I would also add more input validation in the server side, not every case is covered, also more tests, there are some use cases that can have more test cover.

In the client I would create a more component based design, there are some components created, but more progress can be done there.

I would also add a global state management (redux), so the state can be easily shared between components in the application and help scalability.

And maybe improve ui design in the frontend 😁, my priority was to deliver functionality, so the ui is quite simple.

## Describe your solution in plain english. Point out your design decisions and the reasoning behind them.

The solution is a Dashboard build with Reactjs in the frontend and with NestJs in the backend.

### Frontend

In the frontend, the project structure design was ket simple and priorityzing separation of concerns, we have:
- ****clients****: contains the external apis implementations
- **components**: contains the reusable components that are available to use in the screens
- **config**: contains the app configuration files
- **data**: this contains two json files that are used to populate the fruits and locations components, this is a temporal solution given that this information should be served from the BE, but those endpoints were not developed.
- **routes**: contains all the app routes
- **screens**: In here the app screens are kept as components that are later injected into the Router.
- **services**: contains the business logic of our app, in here through the ledgersService.ts file, the json files from data folder are server to the ui to populate the locations and fruits selects components. The idea is that when the BE provide the locations and fruits GET endpoint, the JSON implementation can be easily change.
- **types**: contains all the types used in the FE
- **utils**: contains the utility functions the FE uses, in here we can put error handlers, parsers and formatters. Basically all the functions that doesn't contain business logic.

The frontend shows a simple layout with one menu at the top with two links, reports showing the form to retrieve the fruit consumption report an the purchases with the form to register purchases.

### Backend

In the backend, Nestjs was used to speed up development. The advantage is that we can start with a domain based structure out of the box where we isolate similar functionality into modules having a mantainable and sclalable codebase.

Every module has a NestJS basic structure:
- **entity**: this guards the schema definition
- **module**: this class glues toguether all the module dependencies and exposes any dependency used by other modules.
- **repository**: this has the abstraction to interact with the database
- **service**: contains the business logic of the module
- **types**: contains the types definitions

We have 3 modules in the modules folder:
- **ledgers module**: this is the most important module, having the controller that exposes the endpoints for deliver data to the FE. This is why this module is the only that has controller class, the locations and fruits modules are support modules basically.
- **fruits module**: here we isolate the fruits entity related logic. Containing, for example, the external fruityvice api implementation.
- **locations module**: locations entity related module

In the BE there are also some migrations available. The database schema was improved given that some primary columns were missing, also some primary key constraints were missing, and some column types were not correct.

## Have you learned something new doing this test? If yes, describe it here.

I learned how to do e2e tests with nestjs, something that didn't do in the past, so it was a fun thing to implement.

## Describe yourself using JSON.

```JSON
{
    "firstName": "Carlos Luis",
    "lastName": "Oronoz Cabello",
    "age": 33,
    "nationality": "Venezuelan",
    "residence": "Amsterdam, The Netherlands",
    "hobbies": [
        "Video games",
        "Magic: the gathering",
        "Movies and Series"
    ],
    "values": [
        "Collaboration",
        "Honesty",
        "Ownership"
    ],
    "likesTo": [
        "Cook",
        "Travel",
        "Play with my two dogs Sookie and Mila"
    ]
}
```