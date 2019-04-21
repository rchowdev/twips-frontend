# Twips
Website that helps users manage their playlists of Twitch clips.

## Features
* Ability to sign up as a new user or login as a current user
* Get weekly top clips from Twitch
* Create playlists of Twitch clips and add/remove clips to/from playlists
* Search for weekly top clips by game or by channel

## Setup
Clone both of these repos: [backend repo](https://github.com/rchowdev/twips-backend) and [frontend repo](https://github.com/rchowdev/twips-frontend).
Go to the root directory of twips-backend and run ```bundle install``` to install backend dependencies.
Go to the root directory of twips-frontend and run ```npm install``` to install frontend dependencies.

## Usage
After installing dependencies, go to root directory of twips-backend and run ```rails db:migrate```. Before starting the application, you will need to change a few things:
* Create your own ```.env``` file in the root directory of twips-backend and add ```JWT_SECRET=your_secret_here``` to the file.
* Go to the root directory of twips-frontend. Navigate to ```src/constants/index.js```. Change the value of ```API_URL``` to ```"https://localhost:3001/api/v1"```.
* Create your own ```.env``` file in the root directory of twips-frontend and add ```REACT_APP_TWITCH_CLIENT_ID=your_twitch_client_id``` to the file. To get a Twitch Client Id, go to [Twitch Developers](https://dev.twitch.tv/). 

To start the backend API, run ```rails s -p 3001```. Then go to root directory of bbb-frontend and run ```npm start``` to start using the application.

## Demo
A demo of this project has been deployed on Heroku. Check it out! [Demo](https://twips-frontend.herokuapp.com/)
