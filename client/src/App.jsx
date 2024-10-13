import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import PostsPage from "./pages/PostsPage";
import FormPage from "./pages/FormPage";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [comments, setComments] = useState([]);
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/posts"
          element={
            <PostsPage
              recipes={recipes}
              setRecipes={setRecipes}
              comments={comments}
              setComments={setComments}
            />
          }
        />
        <Route path="/add-recipe" element={<FormPage />} />
      </Routes>
    </>
  );
}
