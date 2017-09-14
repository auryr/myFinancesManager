# Okurio
![](https://github.com/Cityslick/Occurio/blob/master/client/occurio/images/project3vanity.png?raw=true)

### Okurio is a project management tool optimized for small teams.
##### Okurio helps solve the problem of small team project management by aiming to keeping track of tasks among small groups of people. A project manager or administrator can create a profile that allows the creation of tasks/projects, the delegation of tasks, and the ability to keep track and tabs on collaborator activity. By empowering project managers and their subordinates (or collaborators, as we call them), Okurio hopes to boost project productivity and limit the stressfulness of project preparation and delegation, leaving room for teams and managers to focus on the truly difficult tasks.


### Our Story
##### As a team, we decided to build Okurio after having some initial trouble in the project selection process. One could describe this as slightly "Meta" in a way. The "Project Management Process" we all complained, was a constant pain point we've all experienced whilst discussing/bonding as a team. The project prompt positioned us to think creatively on a solution for how we would approach problem solving -- what kinds of people manage projects? What is the focal point for team delegation? How do you set goals and manage expectations? In asking these questions, we concieved the idea of Okurio. 

### Okurio: The Idea 
##### Tasked with deciding on a name for our light project management application, the team brainstormed on the name Okurio by combining our interest in using a memorable, symmetrical latin-based word with simple vowels. We decided on a variation of the Spanish word Occurrir, cut out the double letters, and replaced the remaining "C" with a "K", going for a more adamant look.

-----

# Design and Technology
### While building Okurio, we optimized our project workflow through a series of top-level thinking exercises.

#### Visual Design/Styleguide
We began with a design phase that examined various popular/modern wireframe layouts and experimented accordingly. The result was a relatively conservative approach to landing and web page layout and dashboard design built to mirror slices of popular project management apps, Apple's constant move for simplicity/efforts away from skeumorphic design, Microsoft's experimentations on "tiled" informational elements in past years' OS', and modern UI-color schemes (gradients included). Our visual style guide (included below) discusses some elements of our design choices. We primarily use the font Quicksand, as well as a combination of bright purple and green motifs on our application.

#### User Stories
Okurio's focus is to empower project managers and small teams. 
We focused on the pain points of project managers and collaborators.
![](https://github.com/Cityslick/Occurio/blob/master/client/occurio/images/userstories.png?raw=true)

#### Initial User Flow/Database
The team discussed and sketched relational diagrams based on a database pattern that supported various connecting databases that constantly needed to draw from each other. The task of discussing how a project manager would approach daily task delegation at a small cafe allowed for the team to think about this in a more dynamic way. A "head honcho" figure of some sort (manager, owner, head barista) would take a look at their/her/his subordinates, delegate their tasks for the day, sort them in teams, and assign tasks accordingly. Our answer to this? Tables with dynamic relationships. Recognizing that we would need a database heirarchy of multiple tables/relations, the team built a simple relational database migration file consisting of the following: **USERS**, **PROJECTS**, **COLLABORATORS**, and **TASKS**. USERS stores info about our software's registrants. PROJECTS contain data about the project such as category/description, start/end dates, and status. COLLABORATORS define a relationship between PROJECTS and USERS. TASKS describes general details about the activites to be done. The key element of this database allows our app to scale internally, as we expect increasingly larger user teams and project-collaborator relationships.

#### Entity Relationship Diagram
###### Please see below for an overview of Okurio's ERD.
### ![](https://github.com/Cityslick/Occurio/blob/master/client/occurio/images/project3_erd-24.png?raw=true)

#### Front-End/Back-End
Okurio is built on Javascript, specifically composed of a React front end and an MVC structured back end with Express.

Okurio's front end is composed of 20+ components. We created a dynamically rendering application that follows several conventions, such as a static Header/Footer/Home.jsx, and multiple CRUD components for Users, Collaborators, Projects, and Tasks views. Almost every component contains the ability to manipulate the data that was initially submitted upon registration; this was an important feature to have as, for example, names and dates may change, as do project scope and status. 

###### For more information on how we structured our application, please see view the Components, controllers, models, routes, and services folders.

#### Project Management
The project management style we used for Okurio was a hybrid combination of Agile/Crystal. With ownership of specific tasks interspersed with sharing brainstorming/verbal communication, design, and even small things like team lunches/breaks and deciding which room to assemble in every morning, our team was able to break down the challenge given with little more than a week's time. One of the key aspects of the team consisted of daily morning, afternoon, and evening check-ins, and relatively consistent activity on __Slack__. While building the app, we primarily worked in a closed-loop environment where we offered each other feedback and helped each other build out code, namely being rooms at General Assembly and in Tom's co-working space in SoHo. Avoiding a spontaneous, reactive style of management, the team stuck to brainstorming and building out purposeful code that was laid out in generous terms at the start.

#### NPM Packages
While building our app, our team installed a multitude of NPM packages. All of our dependencies in the front and back end are listed here with links to their relevant pages in the NPM site. Please follow the links for more information about these NPM packages.

app-notify: https://www.npmjs.com/package/app-notify

axios: https://www.npmjs.com/package/axios

bcryptjs: https://www.npmjs.com/package/bcrypt

body-parser: https://www.npmjs.com/package/body-parser

classnames: https://www.npmjs.com/package/classnames

cookie-parser: https://www.npmjs.com/package/cookie-parser

dotenv: https://www.npmjs.com/package/dotenv

express: https://www.npmjs.com/package/express

express-session: https://www.npmjs.com/package/express-session

morgan: https://www.npmjs.com/search?q=morgan

multer: https://www.npmjs.com/package/multer

nodemon: https://www.npmjs.com/package/nodemon

passport: https://www.npmjs.com/package/passport

passport-local: https://www.npmjs.com/package/passport-local

pg-promise: https://www.npmjs.com/search?q=pg-promise

react-confirm-alert: https://www.npmjs.com/package/react-confirm-alert

react-dom: https://www.npmjs.com/package/react-dom

react-router-dom: https://www.npmjs.com/package/react-router-dom

react-scripts: https://www.npmjs.com/package/react-scripts

react-transition-group: https://www.npmjs.com/package/react-transition-group

yarn: https://www.npmjs.com/package/yarn

### Notes on the Learning Experience
While building Okurio, our efforts lead to greater understanding of ourselves and our skills as developers and designers. However, these did not come without initial challenges. For some, it was our first time, so that came with a host of it's own little challenges. Perhaps the most challenging aspect of building our app was owning and adhering to our Git workflow. However, upon realization that this was the safest and most responsible way of implenting and adding each others' code, the team found it relatively easy to manage. We reached our climax of difficulty managing Git workflow during the middle of the week, where we had help from Ramsey in navigating our almost unavoidable conflicts, particularly in App.js. In hindsight, this was one of the most exciting and rewarding aspects of the project. 

##### Overcoming our conflicts and learning to give each other leeway in writing code (that doesn't conflict) was extremely beneficial to our development as developers -- and a team.

### Thank you for reading -- we hope you enjoyed reading about Okurio!
#### (LINK TO HEROKU APP)
#### -The Okurio Team
