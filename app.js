const express = require("express");
const app = express();
const path = require("path");
const PORT = 5000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




app.get("/result", async (req, res) => {
  try {
    const movieTitle = req.query.movieTitle;
    const apiKey = "e5cab674";
    const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    const movieData = await response.json();

    if (movieData.Response === "True") {
      res.render("detail", { movieData });
    } else {
      res.send("Movie not found.");
    }
  } catch (error) {
    console.error("Error fetching movie details:", error);
    res.status(500).send("Internal Server Error");
  }
});

