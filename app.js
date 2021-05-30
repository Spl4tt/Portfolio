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

// app.use('/favicon.ico', (req, res, next) => {
//     next();
// });

// Error handlers
// 404 TODO Why does it ALWAYS get here, even if a route catches? tries ./favicon.ico??
app.use((req, res, next) => {
    const err = new Error('This page does not exist, sry');
    err.status = 404;
    next(err);
});

// General Error Handler
app.use((err, req, res, next) => {
    if (err) {
        console.log('Global error handler called', err);
    }

    // check if Error is filled correctly
    err.message = err.message || 'Oops, something went wrong!'
    res.status = err.status || 500;
    res.render('error', { err });
});


app.listen(3000, () => {
    console.log('The app is running on localhost:3000');
});