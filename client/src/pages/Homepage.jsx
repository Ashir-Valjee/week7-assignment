import "./HomePage.css";
import homepage from "../../public/homepage.avif";
export default function Homepage() {
  return (
    <>
      <div id="meta-container">
        <div id="homepage-container">
          <p id="homepage-text">
            Welcome to the recipe directory. You will find recipes from all over
            the world here and are very welcome to add your own
          </p>
        </div>
        <div id="cover-image-container">
          <img id="cover-image" src={homepage} />
        </div>
      </div>
    </>
  );
}
