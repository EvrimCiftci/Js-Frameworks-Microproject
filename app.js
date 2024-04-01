// Import necessary modules
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';
import fetch from 'node-fetch'; // Import fetch for making HTTP requests
import fs from 'fs'; // Import the fs module for file operations

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Read JSON data synchronously
const jsonData = JSON.parse(fs.readFileSync(path.join(__dirname, 'public', 'data', 'data.json')));

// Endpoint to serve HTML files



app.get('/apicall', async (req, res) => {
   
    res.json(fetchData());
});
app.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data/Data.json'));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', `${page}.html`));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    res.sendFile(path.join(__dirname, 'public', `${page}.html`), function(err) {
        if (err) {
            if (err.code === 'ENOENT') {
                res.status(404).json({"error": "404 file not found"});
            } else {e
                res.status(500).json({"error": "Internal server error"});
            }
        }
    });
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});