# HCS Challenge

The main purpose of this repository is to show a working demo in Node.js for Human Care Systems.

# Pre-reqs
To run this app locally you will need first:
- Install [Node.js](https://nodejs.org/en/)
- Install [MongoDB](https://docs.mongodb.com/manual/installation/)

# Getting started
- Clone the repository
```
git clone https://github.com/Ellebkey/HCS-Challenge.git <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Copy the .env.example and configure your mongoDB credentials 
```bash
# copy .env.example
cp .env.example .env
```
- Start your mongoDB server 
```bash
mongod
```
- Run the project (development)
```
npm run dev
```
# Running Test
Just follow the instructions above to save the information on the database, after run:
```
npm run test
```
