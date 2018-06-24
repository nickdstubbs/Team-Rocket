# Team-Rocket
Write notes at the top so that the most recent note is at the top of the list and we can still view past notes.

----------------------------------------------------------------------------

##Christian's notes [23 June 2018 pt.2]

Okay, so I'm not sure if I'm using Spring or the Rest API correctly, so right now the best way to view the app is to build the Angular app, and then build the Spring app, and run the Spring app on port 8080
Here's what to do:
>1. cd into the team-rocket-frontend directory
>2. Run ng build --prod --aot
>3. cd into the TeamRocket directory, the one with the pom.xml in it
>4. Run mvn clean install
>5. Run mvn spring-boot:run
The app should be running on localhost:8080 with the Angual homepage loaded, you don't need it running on port 4200 ctrl+c to close the server.

I don't know if I've got it working the other way since I'm not sure how to use Spring and the Rest API yet.

##Christian's notes [23 June 2018]

**I'm not sure if I used gitignore correctly, but node_modules should not be tracked. If it shows up in STS, make sure you remove it. [Use this link to see how to do that and see how this skeleton works.](http://javasampleapproach.com/java-integration/integrate-angular-4-springboot-web-app-springtoolsuite)**

The pipeline will need to build the Angular app and build the Spring project for us to see changes on both. This might have to be our workflow until I figure out a way to build both; but really as individuals we'll only be working on one or the either and not both at once so that shouldn't be a problem. Just make sure that both are built for them to interact.

From what I understand, you can view the app from either ports 8080 or 4200 depending on which one you run. I added a proxy to the Angular app that will grab API calls from Spring, and a Spring plugin that copies the most recent build in the Angular app's dist folder to spring's web-app folder.

Also, it looks like Spring added some of our dependencies by default. We'll need to see after we learn how to use it, but it looks like hibernate, jackson, and log4j are already added. I'm not sure if we'll be using javax servlets because from what I've read, the restful API will replace them.

Until we know more about Spring, all we can work on now is the front end.