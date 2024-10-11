# Art Curator

[Live Version](https://art-curator.netlify.app)

## Summary

**Art Curator** is a web application that allows users to explore, search, and curate artworks from two APIs, The MET and Rijksmuseum collections. Built with React and Vite, it provides a seamless, interactive user experience for art enthusiasts, collectors, and researchers alike. The app fetches data from the public APIs to display a diverse range of artworks and their details, empowering users to discover and organise their favourite pieces.

## Features
-**Artwork Search:** Easily search for artworks by title, artist, or collection.

-**Artwork Details:** View detailed information about each artwork.

-**Curated Collection:** Save and manage your own curated collections of artwork.

-**Responsive Design:** Fully responsive design fordesktop and mobile.

-**Fast Performance:** Built with Vite and optimized for fast loading times and smooth navigation.

## Local Use

### Node.js is a prerequisite for running this repo

To run this repo locally, clone the repository and follow the below steps:

1. Open your terminal and navigate to directory where you want to store the project

Run the following command in the command line:

`git clone https://github.com/ndanner22/art-curator.git`

2. Move into the project directory by running
  
`cd art-curator`
  
3. Install the dependices by running
  
`npm install`
  
4. Start the development server
  
`npm run dev`
  
5. For a production build run the below
  
`npm run build`

## Dependencies
The project uses the following dependencies:

[Node.js](https://nodejs.org/en) - version 20.9.0

[Axios](https://axios-http.com) for API requests

[React-Router-Dom](https://reactrouter.com/en/main) for navigation

[React-Toastify](https://www.npmjs.com/package/react-toastify) for in-page notifications

## API Integrations
This web application uses the following public APIs:

1. [The MET API](https://metmuseum.github.io)
2. [The Rijksmuseum API](https://data.rijksmuseum.nl/user-generated-content/api/)
