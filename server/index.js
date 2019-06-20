const fs = require("fs");
const Joi = require("joi");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());

const bohaci = require("./bohaci.json");

/* Request: použití metody GET, URL adresy /:
   Response: HTML stránka  */
app.get("/", (req, res) => {
  res.send("<h1>Úvodní stránka - REST API</h1>");
});

/* Request: použití metody GET, URL adresy /api/bohaci:
   Response: výpis všech filmů ve formátu JSON  */
app.get("/api/bohaci", (req, res) => {
  res.send(bohaci);
});

/* Request: použití metody GET, URL adresy /api/bohaci, parametr id
   Response: výpis konkrétního filmu podle zadaného id ve formátu JSON  */
app.get("/api/bohaci/:id", (req, res) => {
  const id = Number(req.params.id);
  const bohac = bohaci.find(bohac => bohac.id === id);
  if (bohac) {
    res.send(bohac);
  } else {
    res.status(404).send("Člověk nebyl nalezen.");
  }
});

/* Request: použití metody POST, URL adresy /api/bohaci
   Response: výpis nového filmu   */
app.post("/api/bohaci", (req, res) => {
  const { error } = validatebohac(req.body);
  if (error) {
    res.status(400).send(error);
  } else {
    const bohac = {
      id: bohaci.length !== 0 ? bohaci[bohaci.length - 1].id + 1 : 1,
      name: req.body.name,
      majetek: req.body.majetek,
      kontinent: req.body.kontinent,
    };
    bohaci.push(bohac);
    res.send(bohac);
    writeJSON(bohaci, "bohaci.json");
  }
});

app.put("/api/bohaci/:id", (req, res) => {
  const id = Number(req.params.id);
  const bohac = bohaci.find(bohac => bohac.id === id);
  if (!bohac) {
    res.status(404).send("Člověk nebyl nalezen.");
    return;
  }
  const { error } = validatebohac(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    bohac.name = req.body.name;
    bohac.majetek = req.body.majetek;
    bohac.kontinent = req.body.kontinent;
    bohac.content = req.body.content;
    res.send(bohac);
    writeJSON(bohaci, "bohaci.json");
  }
});

app.delete("/api/bohaci/:id", (req, res) => {
  const id = Number(req.params.id);
  const bohac = bohaci.find(bohac => bohac.id === id);
  if (!bohac) {
    res.status(404).send("Film nebyl nalezen.");
  } else {
    const index = bohaci.indexOf(bohac);
    bohaci.splice(index, 1);
    res.send(bohac);
    writeJSON(bohaci, "bohaci.json");
  }
});

app.listen(3000, () => console.log("Listening on port 3000..."));

function validatebohac(bohac) {
  const schema = {
    name: Joi.string()
      .min(2)
      .required(),
    majetek: Joi.number(),
    kontinent: Joi.string(),
  };
  return Joi.validate(bohac, schema);
}

function writeJSON(jsonData, pathToFile) {
  let data = JSON.stringify(jsonData, null, 2);
  fs.writeFile(pathToFile, data, err => {
    if (err) {
      throw err;
    } else {
      console.log("Data written to file");
    }
  });
}
