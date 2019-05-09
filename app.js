const express = require('express');
const db = require('./db/db');

// Set up the express app
const app = express();

app.use(express.json());

// Get all ingredients
app.get('/api/ingredients', (req, res) => {
	res.status(200).send({
		success: 'true',
		message: 'ingredients retrived successfully',
		ingredients: db
	});
});

app.get('/api/ingredients/:id', (req, res) => {
	const id = parseInt(req.params.id, 10);

	db.ingredients.find((ingredient) => {
		if(ingredient.id == id) {
			res.status(200).send({
				success: 'true',
				message: `${ingredient.name} retrieved successfully`
			})
		}
	});

	res.status(404).send({
		success: 'false',
		message: 'ingredient does not exist'
	});
});

app.post('/api/ingredients', (req, res) => {
	console.log(req.body);
	if(!req.body.name) {
    return res.status(400).send({
      success: 'false',
      message: 'name is required'
    });
  };
	const ingredient = {
		id: db.ingredients.length + 1,
		name: req.body.name
	};
	db.ingredients.push(ingredient);
	return res.status(201).send({
		success: 'true',
		message: 'ingredient added successfully',
		ingredient
	});
});

const PORT= 5000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));