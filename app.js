const express = require('express');
const db = require('./db/db');

// Set up the express app
const app = express();

// Get all ingredients
app.get('/api/ingredients', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'ingredients retrived successfully',
		ingredients: db
	});
});

const PORT= 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));