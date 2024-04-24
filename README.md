# Lepaya Full Stack Assignment

### Intro
Welcome, this is the fullstack assignment for engineering positions at Lepaya.

---
Please, read the task carefully and using **Javascript**/**ECMAscript** or **Typescript** proceed to craft a solution by building the following deliverables:

 1. A frontend (React) application
 2. An API server to support the frontend
 3. Clear instructions or running your solution
 4. Answers to some techincal questions 

 Each deliverable will be explained further in this document.
 
 ---
 Feel free to use any publicly available libraries that you are comfortable with, both for the frontend and backend part, and try to use software development best practices as you would in any sort of professional project.

 Also, don't stress, the assignment is tested by humans so it won't fail automatically due to a minor issue and will be a starting point for a conversation where you can explain your decisions and get feedback on your solution.
 
 Good luck, and have fun!


 # The Task

Let's imagine a scaleup in the candy-space called Chocolate Inc.

Due to providing what the people want most, quality chocolate, it has grown from a small kitchen to having offices in several locations across Europe and the UK.

Like any other thriving organization, it tries to keep it's personnel happy and healthy, and away from the tasty chocolate, by providing fresh fruit in all of its offices.

Your task will be to build an application that will help the office managers at Chocolate Inc. track the fruit purchasing and consumption.


# The Resources
You will require some resources to complete your task. They are a database provided with this task and Fruityvice, a free API about fruit. 

### 1. Fruityvice 
Fruityvice is a free public API where you can get information on certain fruits, including their botanical and nutritional information.
More information on https://www.fruityvice.com/

### 2. Provided Database
The database that they use to keep track of fruit is provided to you as a PostreSQL db defined in the docker-compose.yml

To run it just, 
```docker-compose up -d```
It should start on port 5432 by default, but feel free to modify the docker-compose.yml as it suits you.

The default connection data would be (pls check docker-compose.yml):
```
POSTGRES_DB: fruity
POSTGRES_USER: candidate
POSTGRES_PASSWORD: candidate
```


It holds 3 tables
 - **location** - Which holds all the locations where there are offices, along with the count of people in that office
 - **fruit** - Fruits available for purchase, along with their name and Fruityvice ID 
 - **ledger** - This table holds records of all the fruits that were purchased for an office or were eaten at the office. 
 
 Records with a negative integer in the **amount** column would represent the number of certain fruits that were eaten at an office, while the ones with the positive amounts would represent the purchase of those fruits at the office.

---
Example: 
|fruit_id|location_id|amount|time|
|--------|-----------|------|----|
|3|2|4|2018-06-09 20:00:03.629 +0200|
|3|1|-2|2017-05-09 23:33:15.233 +0200|

Where the first row represents the replenishing of apples (fruit #3), at the Berlin office by purchasing 4 pieces.

And the second row would represent an eating of 2 pieces of apples at the Amsterdam office.

---
---

# The Deliverables
## 1. Frontend
The frontend must consist of 2 parts.

### 1.1. A report page with an ability to:
   - **Select one of the offices**
   - **Select a year (from 2016 - 2024 inclusive)** 
   
   and for the given combination see:

 1. **What was the most fruit with most pieces eaten in that office that year?**
 2. **How much fruit was consumed per person on average in that office that year?**

### 1.2. A page or modal with a form where you can make a fruit purchase by:
  - **Selecting an office**
  - **Selecting which fruits and in which quantity to purchase**
  - **Submitting the form should persist the purchase into the database**
  - **The purchase should not be allowed if the sum of all the calories in the fruit is above a 1000kcal.**
  - **If you cannot get information about the calories of a certain fruit feel free to treat it as if it has zero calories**


Once more, feel free to use whatever libraries (UI or otherwise) you want, you will not be judged by the size of your node_modules directory nor your artistic abilities.


We would however prefer you use React as a basis for the frontend, if that is an option for you.

## 2. API
We envision you will probably need two endpoints to satisfy the Frontend requirements ( maybe ```/purchase``` and  ```/report``` ).

Having said that, you do have the full freedom to organize how much endpoints you need and however you want to organize them, as long as the frontend requirements are satisfied.

You are free to use any out of the box server or any libraries you want, we'd suggest probably express or koa.

You DO NOT need to provide endpoints to  get a list of office locations or available fruits. If you don't have the time or energy feel free to hardcode these lists, this will not be taken into consideration. The way you do hardcode them, probably will.

## 3. A nice way to run your solution
Please provide a concise one or two line command to start your project.
If any explanation is necessary please create a HOWTO.md and explain how to run your solution.

## 4. Answers to technical questions
Please answer the following questions in a markdown file called **"ANSWERS.md"**.

1. How long did you spend on the coding test? 

1. What would you add to your solution if you had more time? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

1. Describe your solution in plain english. Point out your design decisions and the reasoning behind them.

1. Have you learned something new doing this test? If yes, describe it here.

1. Describe yourself using JSON.
---
---
# Final tips
- Feel free to ask for clarification if something is unclear in the task
- Parts of the database records are generated randomly, don't expect consistancy if you recreate the container volumes.
- Try not to over-engineer. "Everything should be made as simple as possible, but not simpler."