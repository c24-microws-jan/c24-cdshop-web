# c24-cdshop-web

[![Build Status](https://travis-ci.org/c24-microws-jan/c24-cdshop-web.svg)](https://travis-ci.org/c24-microws-jan/c24-cdshop-web)
[![Dependencies](https://david-dm.org/c24-microws-jan/c24-cdshop-web.svg)](https://david-dm.org/badges/shields)

This is the website!

## Run it on your local node.js installation

* Run `npm install` inside the root folder to restore all packages
* Run the service with `node index.js` (or `npm start`)
* Browse to [http://localhost:3000/](http://localhost:3000/) to see the output

## Build the Docker container

~~~ sh
docker build -t c24-cdshop-web .
~~~

## Run the Docker container locally

~~~ sh
docker run -it -p 3000:3000 c24-cdshop-web
~~~

## Push the Docker container into the private registry

~~~ sh
docker tag c24-cdshop-web 46.101.193.82:5000/c24-cdshop-web:1.0.0
docker push 46.101.193.82:5000/c24-cdshop-web:1.0.0
~~~
