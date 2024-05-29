# Project Title

Flight Roulette

## Overview

A game to help people decide which vacation destination to travel to.

### Problem

One of the most fun part of a vacation is the planning stage. However there are so many wonderful places to visit on Earth that sometimes all those options can be daunting. Flight Roulette aims to help decision process by turning the decision process into a fun game.

### User Profile

World Travellers:
-Friends/Family Travelers
-Couples/Honeymoon Travelers
-Solo Explorers

### Features

-   As a user I want to populate a list with dozens of vacation destinations I want to visit.
-   As a user i want to decide how many locations i want to visit.
-   As a user i want to be able to take the full list of vacation destinations and narrow the list down to the number of locations i want to visit. I want to do this over the course of multiple rounds using a single elimination tournament-style bracket. Each round, I want to be shown two random locations. I want to be able to vote on which location i would prefer to visit. the winning location stays on the list of locations to visit while the losing location is eliminated. repeat this until either only 1 (or however many locations I want to visit), remains.
    -As a user i want the winning locations to have convinient links

(stretch goal)

-   As a user, I want to be able to be able to play the game with multiplayer using websockets.
-   I want to be able to either host a room where my friends and i can vote on the winning.

## Implementation

### Tech Stack

-   React
-   HTML
-   SASS
-   Express
-   Client libraries:
    -   react
    -   react-router
    -   axios
-   Server libraries:
    -   express
    -   bcrypt for password hashing

### APIs

I will be creating my own API populated by royalty free images and videos from pexels

### Sitemap

-   Welcome/start page
-   How to play page.
-   (Stretch goal) Invite players page join to players page
-   Game Setup - Select the number of destinations to visit + populate list of vacation destinations
-   Game play - Round based, tournament single elimination. Each round, display 2 vacation destinations. players vote one which place they want to visit,
-   Game over page - show winning players

### Mockups

#### Welcome Page

![](./Mockups/Welcome%20Page.jpg)

#### How to Play Page

![](./Mockups/How%20to%20Play%20page.jpg)

#### Game Setup Page

![](./Mockups/Game%20Setup%20page.jpg)

#### Game Play Page

![](./Mockups/Game%20Play%20Page.jpg)

#### Final Scores Page

![](./Mockups/Final%20Scores%20page.jpg)

### Data

a series of vacation objects will be stored on the API. An object will include the destination name, an array of links to landscape images, and an array of activities/food images

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

**GET /destination/**
gets a list of all destinations

```
[
    {
        "id": 1
        "points": 897
        "eliminations": 200
        "name": Hawaii,
        "landscape-images": [
            "1": "./images/hawaii-lang1.jpg"
            "2": "./images/hawaii-lang2.jpg"
            "3": "./images/hawaii-lang3.jpg"
            "4": "./images/hawaii-lang4.jpg"
            "5": "./images/hawaii-lang5.jpg"
            "6": "./images/hawaii-lang6.jpg"
        ]
        "activites-images": [
            "1": "./images/hawaii-activity1.jpg"
            "2": "./images/hawaii-activity2.jpg"
            "3": "./images/hawaii-activity3.jpg"
        ]
    },
     {
        "id": 2
        "points": 2346
        "eliminations": 2000
        "name": greece,
        "landscape-images": [
            "1": "./images/greece-lang1.jpg"
            "2": "./images/greece-lang2.jpg"
            "3": "./images/greece-lang3.jpg"
            "4": "./images/greece-lang4.jpg"
            "5": "./images/greece-lang5.jpg"
            "6": "./images/greece-lang6.jpg"
        ]
        "activites-images": [
            "1": "./images/greece-activity1.jpg"
            "2": "./images/greece-activity2.jpg"
            "3": "./images/greece-activity3.jpg"
        ]
    },
    ...
]
```

no parameters

**GET /destination/:id**
gets one specific destination

```
[
    {
        "id": 1
        "points": 2346
        "eliminations": 2000
        "name": Hawaii,
        "landscape-images": [
            "1": "./images/hawaii-lang1.jpg"
            "2": "./images/hawaii-lang2.jpg"
            "3": "./images/hawaii-lang3.jpg"
            "4": "./images/hawaii-lang4.jpg"
            "5": "./images/hawaii-lang5.jpg"
            "6": "./images/hawaii-lang6.jpg"
        ]
        "activites-images": [
            "1": "./images/hawaii-activity1.jpg"
            "2": "./images/hawaii-activity2.jpg"
            "3": "./images/hawaii-activity3.jpg"
        ]
    },
]
```

Parameters:

-   id: destination id

**POST /cafes/:id/add-point**
adds one point to the destination
Parameters:

-   id: destination id

**POST /cafes/:id/add-elimination**
adds one point to the destination
Parameters:

-   id: destination id

**POST /cafes/:id/add-win**
adds one point to the destination
Parameters:

-   id: destination id

### Auth

No authentication or user profiles will be made. I don't expect users to return more than a few times so signing up for an account would be a chore.

## Roadmap

-create scss breakpoint, colours and common variables

-create welcome page

-create how to play page

-create backend API

-populate the endpoint with image and name data from Pexels (royalty free)

-create front end functions that call all the corresponding API endpints

-create the setup page that populates the list of vacations

-create the game play page

-create the winner page

-scss stylings

-deploy to netlify for frontend and herokup for backend

-bug fixes

Nice to haves:

-destination leader board

-multiplayer

-Demo day

## Nice-to-haves

Destination Leader board:
A list of the popularity of each destination (from most to least popular) based on their performance across all games played. Each vote that a destination gets, across all users, will add 1 point to the destination. popularity will be calculated as points \* wins / eliminations.

Multiplayer:
using websocket, allow multiple players to connect to the game remotely using a room code. all players can vote on the winning location.

Travel Api:
The winnning locations reveal some basic travel information (starting travel and accomodation costs etc.) built into the the web app.
