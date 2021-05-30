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

// About page
app.get('/about', (req, res) => {
    res.render('about');
});

// Project Page by ID
app.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    res.render('project', { project: projects[id]});
});

// Error handlers

// My Express seemed to always look for this, so it threw a 404 error.
app.use('/favicon.ico', (req, res, next) => {
    res.status(204);
});

app.use((req, res, next) => {
    const err = new Error('This page does not exist, sry: ' + req.url);
    err.status = 404;
    next(err);
});

// General Error Handler
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }

    if(err.status === 404) {
        res.render('not-found', { err });
    }
    else {
        // check if Error is filled correctly
        err.message = err.message || 'Oops, something went wrong!'
        res.status = err.status || 500;
        res.render('error', {err});
    }
});


app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});