import { db } from "./server.js";

db.query(`SELECT * FROM recipes; `);

// -- CREATE TABLE IF NOT EXISTS recipes (
//   --   id SERIAL PRIMARY KEY,
//   --   recipe_name VARCHAR(255) NOT NULL,
//   --   src TEXT,
//   --   ingredients TEXT,
//   --   instructions TEXT,
//   --   cooking_time INTEGER,
//   --   region VARCHAR(255)
//   -- )

//   CREATE TABLE IF NOT EXISTS comments (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     comment TEXT NOT NULL,
//     recipe_id INTEGER REFERENCES recipes(id)
//   )

//   -- INSERT INTO recipes (recipe_name, src, ingredients, instructions, cooking_time, region)
// -- VALUES ('dal', 'https://images.unsplash.com/photo-1668337624325-e49fd5bf1446?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'lentils,spices', 'stir well',25,'India'),
// -- ('Chesseburger', 'https://images.unsplash.com/photo-1603508102983-99b101395d1a?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'beef mince,onions,potato bun', 'griddle',15,'USA')

// -- INSERT INTO comments(username, comment, recipe_id) VALUES('Bob', 'These instructions are far too complicated and impractical', 2),
// -- ('Jim', 'So easy to make, and a pleasure to eat', 16);

// INSERT INTO comments(username, comment, recipe_id) VALUES('Tim', 'I like it, ive certainly had worse', 2)

// -- SELECT recipes.id, recipes.recipe_name, comments.username, comments.comment
// -- FROM recipes
// -- JOIN comments ON recipes.id = comments.recipe_id

// SELECT recipes.id,  ARRAY_AGG(comments.comment) AS comments
// FROM recipes
// JOIN comments ON recipes.id = comments.recipe_id
// GROUP BY (recipes.id);

// DELETE FROM comments WHERE id=9
