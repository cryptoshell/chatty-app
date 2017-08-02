# Chatty App Project

Many of the web applications that are used today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

## Expected Usage

Chatty allows users to communicate with each other without having to register accounts. It uses React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

## Description

- A client-side SPA (single-page app) built with ReactJS
- Contains a chat log displaying messages and notifications
- Contains an input field to change your name and an input field to send a message
- The client-side app communicates with a server via WebSockets for multi-user real-time updates
- No persistent database is involved; the focus is on the client-side experience

## Stack

- Webpack with Babel, JSX, ES6, webpack dev server
- WebSockets using Node package ws on the server-side, and native WebSocket on client side
- ReactJS

## Final Product
!["Main Page"](/docs/chattyApp-main.png "Main Page Showing Messages")

## Dependencies

- react
- express
- babel-loader
- css-loader
- sass-loader
- sockjs-client
- webpack
- webpack-dev-server
- ws
- node-uuid

## Setup Instructions

1. Clone this repo
2. cd into your cloned directory
3. npm start (it should print 'Running at http://0.0.0.0:3000')
4. In a new tab in your terminal, cd into your [cloned directory]/chatty_server/
5. npm start (it should print 'Listening on 3001')
6. Type http://0.0.0.0:3000 into your browser to use the app
