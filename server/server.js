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

// STRETCH goals. Endpoint for deleting data. --> we need PARAMS

// super mega stretch goal. UPDATE
