// import packages
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

//initialise express
const app = express();

//tell express to use json
app.use(express.json());

//tell express to use cors
app.use(cors());

//configure dotenv file
dotenv.config();

//set up our db using the connection string from supabase and the pg package
const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({ connectionString: dbConnectionString });

//set up a PORT for our server to listen to
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

// endpoint for root route, how rude!
app.get("/", (req, res) => {
  res.json({
    message: "You are looking at my root route. How roude!",
  });
});

// my endpoints
// minimum 2 - READ and CREATE --> we are going to use SQL query to add the data. The data here is stored in the bidy
// so will add body data to the db

app.get("/recipes", async (req, res) => {
  try {
    //write a sql query to get the recipe name and descriptions from the db
    const recipesData = await db.query(`SELECT * FROM recipes; `);
    //we parse the response into json
    console.log(recipesData);
    //this is the res without a status code
    // res.json(biscuitsData.rows);
    //you can also add a status code in the try
    res.status(200).json(recipesData.rows);
  } catch (error) {
    //our server will give us this error, if there is a problem with the code in try
    console.error("This is a fatal error! How dramatic!", error);
    res.status(500).json({ success: false });
  }
});

//write a CREATE endpoint
app.post("/add-recipe", async (req, res) => {
  try {
    //the body --> this is the new data I am adding to the db
    //I have destructured the body object to get the properties inside directly
    //the body properties need to match the input name in your client form
    const {
      recipe_name,
      src,
      ingredients,
      instructions,
      cooking_time,
      region,
    } = req.body;
    // const biscuit = req.body;
    // body {
    //     biscuit_name: "",
    //     src: "",
    //     description: "",
    //     crunchiness: 0
    // }
    const newRecipe = await db.query(
      `
        INSERT INTO recipes (recipe_name, src, ingredients, instructions, cooking_time, region)
        VALUES ($1, $2, $3, $4, $5, $6);
        `,
      [recipe_name, src, ingredients, instructions, cooking_time, region]
      //   [biscuit.biscuit_name, biscuit.src, biscuit.description, biscuit.crunchiness]
    );
    res.status(200).json(newRecipe.rows);
  } catch (error) {
    console.error(
      "This is a fatal error! How dramatic! You cannot add new recipes",
      error
    );
    res.status(500).json({ success: false });
  }
});

// STRETCH goals. Endpoint for deleting data. --> we need PARAMS

// super mega stretch goal. UPDATE

// a READ endpoint utilising a join betweeen recipes and comments

//write a READ endpoint with a JOIN SQL query
//As a user, I want to see a list of biscuits and flavours
app.get("/comments", async (req, res) => {
  try {
    const commentsData = await db.query(
      `SELECT recipes.id, ARRAY_AGG(comments.comment) AS comments
      FROM recipes
      JOIN comments ON recipes.id = comments.recipe_id
      GROUP BY (recipes.id);
      `
    );
    res.status(200).json(commentsData.rows);
  } catch (error) {
    console.error("This is a fatal error! How dramatic!", error);
    res.status(500).json({ success: false });
  }
});

app.post("/add-comment", async (req, res) => {
  try {
    const { username, comment, recipe_id } = req.body;

    const newComment = await db.query(
      `
        INSERT INTO comments(username, comment, recipe_id)
        VALUES ($1, $2, $3);
        `,
      [username, comment, recipe_id]
    );
    res.status(200).json(newComment.rows);
  } catch (error) {
    console.error(
      "This is a fatal error! How dramatic! You cannot add new recipes",
      error
    );
    res.status(500).json({ success: false });
  }
});

app.delete("/delete-comment/", async (req, res) => {
  //we need to make sure we target the specific row of data we want to delete
  // in the db, we have the id column
  //in the server, I can use params
  //the params will match the id value in the db
  //to represent dynamic params, we use : in the endpoint

  try {
    const { recipe_id } = req.body;
    // const biscuitId = req.params.id;

    // params {
    //     id: 1
    // }

    const deleteComment = await db.query(
      `DELETE FROM comments WHERE recipe_id = $1 RETURNING *`,
      [recipe_id]
    );
    res.status(200).json(deleteComment.rows);
  } catch (error) {
    console.error(
      "This is a fatal error! How dramatic! You cannot delete this biscuit",
      error
    );
    res.status(500).json({ success: false });
  }
});
