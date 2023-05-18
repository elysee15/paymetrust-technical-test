const express = require("express");
const cors = require("cors");
const { getVolume, getVolumes } = require("./utils");

const app = express();
const port = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.post("/volume", createVolume);
app.post("/volumes", createVolumes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

async function createVolume(req, res) {
  const radius = req.body?.radius;

  if (!radius) {
    return res.status(400).send({
      error: "Please provide a radius",
    });
  }

  if (typeof radius !== "number") {
    return res.status(400).send({
      error: "Please provide a number",
    });
  }

  if (radius >= 100) {
    return res.status(400).send({
      error: "Please provide a radius greater than 100",
    });
  }

  res.send({
    volume: await getVolume(radius),
    radius: radius,
  });
}

async function createVolumes(req, res) {
  const radii = req.body?.radii;

  if (!radii || !radii.length) {
    return res.status(400).send({
      error: "Please provide radii",
    });
  }

  if (!Array.isArray(radii)) {
    return res.status(400).send({
      error: "Please provide an array of radii",
    });
  }

  res.send(await getVolumes(radii));
}

module.exports = app;
