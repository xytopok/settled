## Assumptions



## Questions

### An example stack of technologies which could be used for this system and the pros and cons of these technologies

My default preference would be NOT to build messaging platform but to integrate with some of the existing SaaS (e.g. https://layer.com/). I may be persuaded otherwise if there are compelling arguments on why custom messaging solution should be considered core to the business.


### An overview of the data structure and schemas for the complete application

The diagram shows conceptual data model. There are going to be multiple persistance schemes - separate Write and Read schemas. 

![conceptual data model](http://yuml.me/934eaefe.svg)

Booking status history rather than Updating status of the booking in the same transaction

### A plan for building and executing the project and iterating beyond the initial prototype

## Prototype App

### Instructions

1. git clone https://github.com/xytopok/settled
2. ./setup.sh
3. npm install
4. npm start
5. (visit localhost:3000 to view frontend and interact)


