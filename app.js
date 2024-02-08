const express = require('express');
const app = express();

// Middleware to restrict access to working hours
app.use((req, res, next) => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday
    const hourOfDay = now.getHours();
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hourOfDay >= 9 && hourOfDay < 17) {
        // If it's a weekday and within working hours, continue to the next middleware
        next();
    } else {
        // If it's not a weekday or not within working hours, respond with a message
        res.send('Sorry, the website is only available during working hours (Monday to Friday, 9:00 to 17:00).');
    }
});

// Routes
app.get('/', (req, res) => {
    res.send('<h1>Home Page</h1>');
});

app.get('/services', (req, res) => {
    res.send('<h1>Our Services</h1>');
});

app.get('/contact', (req, res) => {
    res.send('<h1>Contact Us</h1>');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
