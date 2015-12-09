A coding assignment as part of a job application.

directions on how to download and install dependencies, run localhost, query etc.

explanation of technologies


browserify -t [ babelify --prets [ react ] ]  src/*.js -o bundle.js

helpful tips/thanks to:
https://github.com/pedronauck/react-simpletabs
http://tylermcginnis.com/reactjs-tutorial-pt-2-building-react-applications-with-gulp-and-browserify/

clone
npm install
run gulp


TODO:
CACHING instead of making get requests
deployed with postgreSQL db
exported helper functions: ajax calls
prmoised togetehr the nested ajax calls
more gulp tasks, use gulp-notify to notify of the jsx errors
use either display:inline vs hidden for toggle show related details
use iMDB (or similar) API for photos of the people and movies
tests: jest, mocha, jasmine
