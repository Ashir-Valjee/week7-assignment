import { useState } from "react";
import "./Form.css";

export default function CommentForm() {
  // we need State to save form values
  const [formValues, setFormValues] = useState({
    recipe_name: "",
    src: "",
    ingredients: "",
    instructions: "",
    cooking_time: "",
    region: "",
  });
  // we need to track the changes in the inputs of our form
  function handleFormValuesChange(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }
  // ! we do not need useeffect in here
  // submit handler

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formValues);
    // something to fetch POST data
    // fetch(url,{
    // method:"POST",
    // body:formValues,
    // headers: {"content-type":application/json}
    // })
    fetch("http://localhost:8080/add-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formValues }),
    });

    console.log(JSON.stringify({ formValues }));
  }

  // we also need to hendaleChange
  return (
    <>
      <h1>lovely form</h1>
      <h2>yey</h2>
      <section id="recipe-form-container">
        <form
          onSubmit={handleSubmit}
          id="recipe-form"
          onChange={handleFormValuesChange}
        >
          <label htmlFor="recipe_name">Recipe name</label>
          <input
            type="text"
            id="recipe-name"
            name="recipe_name"
            placeholder="write the name of your recipe"
            required
            value={formValues.recipe_name}
            onChange={handleFormValuesChange}
          ></input>
          <label htmlFor="ingredients">Ingredients</label>
          <textarea
            type="text"
            id="ingredients"
            name="ingredients"
            required
            value={formValues.ingredients}
            onChange={handleFormValuesChange}
          ></textarea>
          <label htmlFor="instructions">Instructions</label>
          <textarea
            type="text"
            id="instructions"
            name="instructions"
            required
            value={formValues.instructions}
            onChange={handleFormValuesChange}
          ></textarea>
          <label htmlFor="cooking_time">Cooking time &#40;mins&#41;</label>
          <input
            type="number"
            id="cooking-time"
            name="cooking_time"
            required
            value={formValues.cooking_time}
            onChange={handleFormValuesChange}
          ></input>
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={formValues.region}
            onChange={handleFormValuesChange}
          >
            <option value=""></option>
            <option value="Italy">Italy</option>
            <option value="USA">USA</option>
            <option value="India">India</option>
            <option value="UK">UK</option>
            <option value="France">France</option>
            <option value="Other">Other</option>
          </select>
          <label htmlFor="src">Image link</label>
          <input
            type="text"
            id="src"
            name="src"
            value={formValues.src}
            onChange={handleFormValuesChange}
          ></input>
          <button type="submit">Submit</button>
        </form>
      </section>
      <h3>{formValues.recipe_name}</h3>
      <h3>{formValues.ingredients}</h3>
      <h3>{formValues.instructions}</h3>
      <h3>{formValues.cooking_time}</h3>
      <h3>{formValues.region}</h3>
      <h3>{formValues.src}</h3>

      <p>{JSON.stringify(formValues)}</p>
    </>
  );
}
