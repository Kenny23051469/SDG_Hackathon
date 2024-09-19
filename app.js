const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Store posts in memory (this is a simple approach, not suitable for production)
let posts = [];

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route to render the forum page
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to handle new post submissions
app.post('/add-post', (req, res) => {
    const { username, message } = req.body;

    // Create a new post and add it to the posts array
    const newPost = {
        username,
        message,
        timestamp: new Date().toLocaleString()
    };
    posts.push(newPost);

    // Redirect back to the forum page
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
