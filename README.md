# Overview

This project is a MERN stack forum with a real-time chat room, allowing users post threads, comment, and chat with other users

# Click here to see [Demo](http://ec2-52-195-177-191.ap-northeast-1.compute.amazonaws.com)

Deployed on [AWS EC2](https://aws.amazon.com/tw/ec2/)

![image](https://github.com/user-attachments/assets/46a53a17-a580-43c8-b0cd-6c6627c0ec66)
![462424549_1791354808338940_6437250330774830373_n](https://github.com/user-attachments/assets/2baf304f-7a9d-469f-a371-0af6bfd09235)

# Built with
### [frontend](https://github.com/zxc22164017)
* [Vite](https://vite.dev/)-Build tool for frontend
* [React](https://react.dev/)- Frontend framework
* [React Router](https://reactrouter.com/en/main)- React library for route and navigation
* [Redux](https://redux.js.org/)- JS library for predictable and maintainable global state management
* [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)- tool for data fetching and state management
* [Tailwind CSS](https://tailwindcss.com/)-CSS framework
* [Socket.io](https://socket.io/)-websocket for streaming data
  
### [Backend](https://github.com/zxc22164017/chatRoom-backend)
* [Node.js](https://nodejs.org/zh-tw)-Runtime environment for JS
* [Express.js](https://expressjs.com/zh-tw/)-framework for RESTful APIs
* [Socket.io](https://socket.io/)-websocket for streaming data
* [Passportjs](https://www.passportjs.org/)-Middleware for authentication
* [Bcrypt](https://www.npmjs.com/package/bcrypt)-Library for hashing data
* [JSON web token](https://jwt.io/)-a standard method for representing claims securely between two parties
* [AWS S3](https://aws.amazon.com/tw/s3/)-cloud platform to store images
* [MongoDB](https://www.mongodb.com/community/forums/t/advice-for-chat-schema-design/114166)-Document database to store data
* [Mongoose](https://mongoosejs.com/)-nodejs ODM

### Deployment
* [Docker](https://www.docker.com/)-image container
* [CICD](https://github.com/resources/articles/devops/ci-cd)-automatic deployment
* [nginx](https://nginx.org/)-proxy reverse

# Key features
Create posts to share with other users

https://github.com/user-attachments/assets/ec46a700-a5e9-41b7-963f-a0670f85331d

Like & leave comments


https://github.com/user-attachments/assets/4cf25c99-a098-4a5d-99ee-b39d547e9eca

Real-time chatroom & notification

https://github.com/user-attachments/assets/982ab454-800b-43ba-af74-770e731a66cc

### other features

##### User System
* Authentication login, signup
* Customized user profile, allowing users to upload thumbnail, cover photo, edit username, personal info ...
* Friended with other users
* Search for users
##### Post system
* Edit, post, delete posts
* Like and comment
* Search for posts
##### Custom chat room
* Add multiple users into one chat room
* Edit chat room thumbnails and name
* Leave unwanted chat room

### Future
* Fix bugs happen on EC2 environment
* WebRTC for real-time video chat
* Redis implementation for backend caching
* And More....






















