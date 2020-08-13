const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());


server.get("/", (req, res) => {
    db.select("*")
        .from("accounts")
        .then((accounts) => res.status(200).json({data: accounts}));
});

server.get("/:id", (req, res) => {
    const { id } = req.params;
    db("accounts")
      .where("id", "=", id)
      .first()
      .then((account) => res.status(200).json({ data: account }))
      .catch((err) => console.log(err, ": No id found"));
  });

  server.post("/", (req, res) => {
    const accountData = req.body;
    db("accounts")
      .insert(accountData)
      .then((id) => res.status(201).json({ data: id }))
      .catch((err) => console.log(err));
  });

  server.put("/:id", (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    db("accounts")
        .where("id", "=", id)
        .update(changes)
        .then(count => {
            if(count > 0) {
                res.status(200).json({data: count})
            } else {
                res.status(404).json({message: "There was no record to update"});
            }
        })
        .catch(err => console.log(err));
});

server.delete("/:id", (req, res) => {
    const {id} = req.params;

    db("accounts")
    .where("id", "=", id)
    .delete()
    .then(count => {
        if(count > 0) {
            res.status(200).json({data: count})
        } else {
            res.status(404).json({message: "There was no record to delete"});
        }
    })
    .catch(err => console.log(err));
});

module.exports = server;
