const Note = require("../models/note.model.js");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Note
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    created: req.body.created,
    modified: req.body.modified || false,
  });

  // Save Note in the database
  Note.create(note, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Note.",
      });
    else res.send(data);
  });
};

// Retrieve all Notes from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Note.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Notes.",
      });
    else res.send(data);
  });
};

// Find a single Note with a id
exports.findOne = (req, res) => {
  Note.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Note with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Update a Note identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  console.log(req.body);

  Note.updateById(req.params.id, new Note(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating Note with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

// Delete a Note with the specified id in the request
exports.delete = (req, res) => {
  Note.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Note with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Note with id " + req.params.id,
        });
      }
    } else res.send({ message: `Note was deleted successfully!` });
  });
};
