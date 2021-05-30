const express = require('express');
const { projects } = require('./data.json');

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

// Root / index route
app.get('/', (req, res) => {
    res.locals.projects = projects;
    res.render('index');
});

//About page
app.get('/about', (req, res) => {
    res.render('about');
});

//About page
app.get('/projects/:id', (req, res) => {

});


app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});