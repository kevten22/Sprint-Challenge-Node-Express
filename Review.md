# Review Questions

## What is Node.js?
    NodeJS is a runtime enviroment written in Javascipt used to write code for a server that web apps or programs can communicate with. 

## What is Express?
    Express is a web app framework that is used on top of NodeJS. It provides boilerplate functions to make it easier to build a web application.

## Mention two parts of Express that you learned about this week.
    We learned how to create middleware and implement routes.

## What is Middleware?
    Middleware is functions that are placed in server code that are to be performed in a certain order. They interact with the response-request cycle.

## What is a Resource?
    Any source of data from the server. The list of hobbits we had was a resource. The posts we retrieved was also a resource.


## What can the API return to help clients know if a request was successful?
    Return a response with the status code of 200 which indicates everything went okay.

## How can we partition our application into sub-applications?
    Using routes you can break up the application into more organized sub-applications.

## What is express.json() and why do we need it?
    Built in middleware that comes with express that allows us to parse JSON content out of a request body.