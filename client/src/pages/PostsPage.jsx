// here i will fetch the posts from the server (get endpoint). which is getting the posts from the database
import { useState, useEffect } from "react";
import "./PostsPage.css";

export default function PostsPage({
  recipes,
  setRecipes,
  comments,
  setComments,
}) {
  useEffect(() => {
    async function fetchRecipes() {
      const response = await fetch(
        "https://week7-assignment-server.onrender.com/recipes"
      );
      const data = await response.json();
      setRecipes(data);
    }
    fetchRecipes();
  }, []);
  console.log(recipes);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(
        "https://week7-assignment-server.onrender.com/comments"
      );
      const data = await response.json();
      setComments(data);
    }
    fetchComments();
  }, []);
  console.log(comments);

  // =========================================================================================================================================
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  // ============================================================================================================================================
  const [formValues, setFormValues] = useState({
    username: "",
    comment: "",
    recipe_id: "",
  });

  function handleFormValuesChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);

    fetch("https://week7-assignment-server.onrender.com/add-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    console.log(JSON.stringify({ formValues }));
    setFormValues({
      username: "",
      comment: "",
      recipe_id: "",
    });
  }

  // ============================================================================================================================================
  // Delete
  const [deleteValue, setDeleteValue] = useState({
    recipe_id: "",
  });

  const updateDeleteValue = () => {
    setDeleteValue({ recipe_id: formValues.recipe_id });
  };

  function handleDelete(event) {
    event.preventDefault();
    console.log(formValues);

    fetch("http://localhost:8080/delete-comment", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deleteValue),
    });

    console.log(JSON.stringify({ deleteValue }));
  }

  // ============================================================================================================================================
  // ! once you are finished, replace local host urls with render server url
  return (
    <>
      <section id="post-page-container">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipeMasterContainer">
            <div className="recipeContainer">
              <div className="titleContainer">
                <h2 className="title-font">{recipe.recipe_name}</h2>

                <h3 className="title-font">region&#58; {recipe.region}</h3>
              </div>
              <div className="contentContainer">
                <div className="imageContainer">
                  <img
                    src={recipe.src}
                    alt={recipe.recipe_name}
                    className="recipeImage"
                  />
                </div>
                <div className="contentBox">
                  <div className="descContainer">
                    <p>ingrediants&#58; {recipe.ingredients} </p>
                  </div>
                  <div className="descContainer">
                    <p>instructions&#58; {recipe.instructions} </p>
                  </div>
                  <div className="descContainer">
                    <p>cooking time&#58; {recipe.cooking_time} mins</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="addCommentFormContainer">
              <button onClick={toggleForm}>
                {showForm ? "Hide Form" : "add comment"}
              </button>
              {showForm && (
                <form id="commentForm" onSubmit={handleSubmit}>
                  <label htmlFor="username">Name</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="write your name"
                    required
                    value={formValues.username}
                    onChange={handleFormValuesChange}
                  ></input>
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    type="text"
                    id="comment"
                    name="comment"
                    required
                    value={formValues.comment}
                    onChange={handleFormValuesChange}
                  ></textarea>
                  <label htmlFor="recipe_id">recipe_id {recipe.id}</label>
                  <input
                    type="number"
                    id="recipe_id"
                    name="recipe_id"
                    required
                    value={formValues.recipe_id}
                    onChange={handleFormValuesChange}
                  ></input>
                  <button type="submit">Submit {formValues.recipe_id}</button>
                </form>
              )}
            </div>
            <div className="commentsContainer">
              <h2>comments</h2>

              <button>delete {deleteValue.recipe_id}</button>
              {comments.map((comment) =>
                recipe.id === comment.id ? (
                  <div key={comment.id}>
                    {comment.comments.map((item, index) => (
                      <div key={index}>
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                ) : null
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
