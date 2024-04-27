var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
const port = "8081";
const host = "localhost";

const { MongoClient } = require("mongodb");
// MongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "assignment3";
const client = new MongoClient(url);
const db = client.db(dbName);

app.listen(port, () => {
  console.log("App listening at http://%s:%s", host, port);
});

//get all products
app.get("/listProducts", async (req, res) => {
  await client.connect();
  console.log("Node connected successfully to GET MongoDB");
  const query = {};
  const results = await db
    .collection("products")
    .find(query)
    .limit(100)
    .toArray();
  console.log(results);
  res.status(200);
  res.send(results);
});

//get a product by its id
app.get("/product/:id", async (req, res) => {
  const productid = Number(req.params.id);
  console.log("product to find :", productid);
  await client.connect();
  console.log("Node connected successfully to GET-id MongoDB");
  const query = { id: productid };
  const results = await db.collection("products").findOne(query);
  console.log("Results :", results);
  if (!results) res.send("Not Found").status(404);
  else res.send(results).status(200);
});

//adding a product
app.post("/addProduct", async (req, res) => {
  try {
    await client.connect();

    const keys = Object.keys(req.body);
    const values = Object.values(req.body);

    const newDocument = {
      id: values[0], // also "id": req.body.id,
      name: values[1], // also "name": req.body.name,
      price: values[2], // also "price": req.body.price,
      category: values[4],
      description: values[3], // also "description": req.body.description,
      imageUrl: values[5], // also "imageUrl": req.body.imageUrl
    };
    console.log(newDocument);

    const results = await db.collection("products").insertOne(newDocument);

    res.status(200);
    res.send(results);
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).send({ error: "An internal server error occurred" });
  }
});

app.delete("/deleteProduct/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await client.connect();
    console.log("Product to delete :", id);

    const query = { id: id };

    // read data from products to delete to send it to frontend
    const productDeleted = await db.collection("products").findOne(query);

    // delete
    const deletionResult = await db.collection("products").deleteOne(query);

    // Send combined response
    res.status(200).send({
      deletedProduct: productDeleted,
      deletionResult: deletionResult,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.put("/updateProduct/:id", async (req, res) => {
  try {
    const updateData = {
      $set: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
      },
    };
    const id = Number(req.params.id);
    const query = { id: id };

    // Add options if needed, for example { upsert: true } to create a document if it doesn't exist
    const options = {};

    // Update the document
    const updateResult = await db
      .collection("robot")
      .updateOne(query, updateData, options);

    // If no document was found to update, you can choose to handle it by sending a 404 response
    if (updateResult.matchedCount === 0) {
      return res.status(404).send({ message: "Robot not found" });
    }

    // Read updated data from robot to send to frontend
    const robotUpdated = await db.collection("robot").findOne(query);

    // Send updated robot data as a response
    res.status(200).send(robotUpdated);
  } catch (error) {
    console.error("Error updating robot:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});
