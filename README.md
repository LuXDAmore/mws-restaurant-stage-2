# Mobile Web Specialist Certification Course

## Project Overview: Stage 2

For the **Restaurant Reviews** projects, you will incrementally convert a static webpage to a mobile-ready web application. In **Stage One**, you will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

### _Three Stage Course Material Project - Restaurant Reviews_

---

### Install

1. Clone this repo `git clone https://github.com/LuXDAmore/mws-restaurant-stage-1/`
2. Go to the folder
3. Run `npm install`

_[ In my computer i have installed [ImageMagick](http://www.imagemagick.org/script/download.php "Go to Download page"), so if you are experiencing issues in `images-tasks` probably you'll need to install it. ]_

### Run && Watch

1. Development, with livereload: `npm run dev` or `npm run serve`
2. Staging, with livereload: `npm run staging` or `npm run serve:staging`
3. Production, no livereload: `npm run production` or `npm run serve:production`

_It watch files under the `dist/` folder, on port `4000`, to changing it check `var options` in the `gulpfile.js`*_

### Build

1. Production in the `dist/` folder: `npm run build`
2. Staging in the `dist/` folder: `npm run build:staging`
3. [Github Pages](https://pages.github.com/ "Github Pages") in the `docs/` folder: `npm run build:github:pages`

---

### Demos

[Live Netlify](https://mws-restaurant.netlify.com "Demo Netlify")
[Live Github Pages](https://luxdamore.github.io/mws-restaurant-stage-1/ "Demo Github Pages")

### Info

**Main configurations are in the `gulpfile.js` in a variable called `options`;**
**For Github Pages, you should read the documentation setting branch `master` with `docs/` folder and you should check `var options.github` in the `gulpfile.js`**
**This building tool is compatible with [Netlify](https://www.netlify.com/ "Netlify").**

--

## Local Development API Server

### Usage

#### Get Restaurants

`curl "http://localhost:1337/restaurants"`

#### Get Restaurants by id

`curl "http://localhost:1337/restaurants/{3}"`

### Architecture

Local server:

- Node.js
- Sails.js

--

#### Start the server

`npm run start`

Environment : development
Port        : 1337
