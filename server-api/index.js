const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const port = 5000;

// middleware
app.use(cors());
app.use(express.json()); //req.body

app.get("/", (_, res) => {
  res.send("Contact Manager");
});

// Routes //

// create a contact
app.post("/contacts", async (req, res) => {
  try {
    console.log(req.body);
    const { id, name, email } = req.body.data;
    const newContact = await pool.query(
      "INSERT INTO contacts (c_uuid, c_name, c_email) VALUES ($1, $2, $3) RETURNING *",
      [id, name, email]
    );
    res.json(newContact);
  } catch (error) {
    console.error(err.message);
  }
});

// get all contacts
app.get("/contacts", async (req, res) => {
  try {
    const allContacts = await pool.query("SELECT * FROM contacts");
    res.json(allContacts.rows);
  } catch (error) {
    console.error(err.message);
  }
});

// get a contact
app.get("/contacts/:id", async (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    const contact = await pool.query("SELECT * FROM contacts WHERE c_uuid = $1", [id]);
    res.json(contact.rows);
    console.log(`Grab the`, id, `nice`);
  } catch (error) {
    console.error(err.message);
  }
});

// update a contact
app.put("/contacts/:id", async (req, res) => {
  try {
    console.log(req.params);
    console.log(req.body.data);
    const { id } = req.params;
    const { c_name, c_email } = req.body.data;
    const updateContact = await pool.query(
      "UPDATE contacts SET c_name = $2, c_email = $3 WHERE c_uuid = $1 RETURNING *",
      [id, c_name, c_email]
    );

    res.json(updateContact);
    // res.json("Contact has been updated");
  } catch (error) {
    console.error(err.message);
  }
});

// delete a contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteContact = await pool.query("DELETE FROM contacts WHERE c_uuid = $1", [
      id,
    ]);
    // res.json(deleteContact);
    res.json("Contact has been deleted");
  } catch (error) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
