## Project Title
Udacity Blockchain Nanodegree - Project3

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

## Prerequisites
* node-js
* npm
* crypto-js
* level-db
* hapi-js

## Installing
A step by step series of examples that tell you how to get a development env running:
- Use NPM to initialize your project and create package.json to store project dependencies.
```
npm init
```
- Install crypto-js with --save flag to save dependency to our package.json file
```
npm install crypto-js --save
```
- Install level with --save flag
```
npm install level --save
```
- Install hapi with --save flag
```
npm install hapi --save
```

## Testing

To test code:
1: Open a command prompt or shell terminal after install node.js.
2: Enter a node session, also known as REPL (Read-Evaluate-Print-Loop).
3: Run app.js
```
node app.js
```

Running the tests
10 Test Blocks are added by default - can be observer by GET API (localhost:8000/block/[:Block_index])
Blocks can be added by POST localhost:8000/block and JSON in body, holding a single key - "data", 
with a string value for block's data.

## GET Endpoints
# Get an existing block by index 
http://localhost:8000/block/<Block_Index>

## POST Endpoints
# Post a new block to the chain
http://localhost:8000/block

#Parameters
{
    "body": <New Block's Data>
}

## Authors
Yevgeni Mumblat.