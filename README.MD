# PROBLEM
It is not trivial to start/stop service in such a complex infrastructure topology as Telerik Platform. As a result of this the execution of Resilience test scenarios is also complex task.

# GOAL
Make execution of Resilience testing easy.

# LOCAL SETUP
Requirements
- NodeJS

Setup
- Clone this repo
- Navigate to its folder
- Execute `npm install` to install all dependencies
- Execute `node app.js [web_port(optional)]` to start web and app server

By default web server runs on port `88` and app server runs on port `8888`.


# DIRECTORY STRUCTURE
## server
- webserver.js - start web server on port 88 (by default)
- appserver.js - start app server on port 8888 (by default)
- services.js - provide implementation of services defined in appserver.js
- data.js - data provider that retrieve data from json files defined in `data` folder based on their name

## client
- config/routes.js - ui router. Each robot should have its own route
- controllers/* - each robot should have a corresponding controller that provide a functionalities that is used from robot's view
- views/* - each robot should have a corresponding view that provide all UI needed for configuration and use of particular robot
- app.js - module definition plus constants

## data
JSON formatted data needed for operation of robots.
