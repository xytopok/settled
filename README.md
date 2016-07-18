## Assumptions



## Questions

### An example stack of technologies which could be used for this system and the pros and cons of these technologies

My default preference would be NOT to build messaging platform but to integrate with some of the existing SaaS (e.g. https://layer.com/). I may be persuaded otherwise if there are compelling arguments on why custom messaging solution should be considered core to the business.

If I have to implement the messaging "back end" I would consider building system using:

* nodejs or (Play)[https://www.playframework.com/]) for implementing public API layer. Both of those support WebSockets and I would try to implement interface based on sockets (rather than e.g. REST) as the messaging system is naturally closed to event based system rather than resource based system.
  * Both advantage and disadvantage of nodejs are related to JS
    * Advantage: There are a lot of developers with JS skills and it may be easier for smaller team to have JS skills rather than having Scala and JS
    * Disadvantage: JS is not strongly typed. IMO to create sustainable systems in untyped languages one needs to invest hugely in automated testing, which is difficult to do consistently, so on the long run it is harder to support the system
* Apache Kafka as message broker
  * Advantage: Kafka is extremely fast and guarantees order of messages. Kafka can be used as a backbone of microservice based architecture, especially for implementing CQRS, plus it can be used for analytics.  
  * Disadvantages: 
    * may be somewhat difficult to install originally (runs on ZooKeeper)
    * requires careful planning of space
    * may be overhead if used just for User messaging
  * If it is not practical to invest in setting up Kafka cluster for messaging I would consider using temporary solution e.g. Mongodb, which can also be used to implement Pub-Sub (with Tailable Cursors)
    * Disadvantages of MongoDB for this use case is that mongodb is not message broker and requires discipline to use it as such (rather than fall-back to using it as general-purpose document storage), plus Mongo is not very efficient with writes
* nodejs or Play for data aggregators (i.e. services which listen to events/commands and update materialised views)
* Cassandra for materialised views 
  * Advantages: no-single-point-of-failure architecture, effective partitioning and replication, fast writes and reads
  * Disadvantages: relatively difficlut setup
  * Again, I would consider using MongoDB for materialised views as a temporary solution

### An overview of the data structure and schemas for the complete application

The diagram shows conceptual data model. 

![conceptual data model](http://yuml.me/934eaefe.svg)

There are going to be multiple persistance schemes - separate Write (event log) and Read schemas (materialised views). 
E.g. booking invitations, booking confirmations and rejections are to be written to a "Booking" log as they occure. The materialised views are to be created from those events to represent the "current state" of booking calendar for each user (definitely separate db documents for seller and buyer). 
Similarly the messages between users and delivery notifications for those messages are to be written to the message log and then aggregated to "message box" view for buyer and "message box" view for seller. The materialised views DB are to be partitioned by userId (or similar concept).

### A plan for building and executing the project and iterating beyond the initial prototype

The requirements on architecture evolution will be dictated by what we learn about users using the messaging feature. Otherwise as I mentioned above I would be looking to:

1. investigate existing SaaS solutions for messaging
2. build system with MongoDB as both message broker and materialised views (two separate clusters)
3. consider moving to Kafka as message broker
4. consider using Cassandra as DB for materialised views

## Prototype App

The app is ugly (sorry) and does not implement many of the ideas I'm talking about above (e.g. CQRS). Definitely not ready to production neither for illustrating the design approach.

### Instructions

1. git clone https://github.com/xytopok/settled
2. cd settled
3. ./setup.sh
4. npm install
5. npm start
6. (visit localhost:3000 to view frontend and interact)


