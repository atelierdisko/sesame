![Sesame](https://cdn.disko.io/atelierdisko/sesame/banner.gif)

# Sesame – Securely Share Sensitive Data

## Description
Welcome to the Sesame client!

We share private information in our team and with clients everyday — logins, passwords, ssh-keys. We are all aware that this data is important — and most of the time not meant for everyone’s eyes. Nevertheless people are getting lazy during work. In a rush we share confidential logins via email our super secret passwords are getting stuck in Slack chats forever and after a while we forget about it.

That’s why we developed Sesame: A tool to securely share your sensitive data. 
  
Since we take it seriously, Sesame will not be available online. It is meant to be self hosted. We aimed for a
 minimalistic api and an easy setup so you can dare to own your secrets.
  
Your data is important. Take care of it. Go get Sesame!

## Prerequisites
- [npm](https://www.npmjs.com/)

## Usage
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). <br>
Run Sesame in development mode:
1. Download repository
2. In project root, run `npm start`
    - Starts npm development server
    - Sesame is now available at `http://localhost:3000` in the browser

The page will reload if you make edits.<br>
You will also see any lint errors in the console.<br>
To stop dev server, type `crtl C`

## Sesame API
All /api requests are proxied to `http://localhost:9001` as defined in package.json.

To run the API locally, see [Sesame API](https://github.com/atelierdisko/sesame-api)