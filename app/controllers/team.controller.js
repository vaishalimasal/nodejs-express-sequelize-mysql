const db = require("../models");
const Teams = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Teams
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Team name can not be empty!"
    });
    return;
  }

  // Create a Teams
  const team = {
    teamName: req.body.title,
    teamGroup: req.body.description
    
  };

  // Save Teams in the database
  Teams.create(team)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Team."
      });
    });
};

// Retrieve all Teams from the database.
exports.findAll = (req, res) => {
  const teamName = req.query.teamName;
  var condition = teamName ? { teamName: { [Op.like]: `%${teamName}%` } } : null;

  Teams.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Teams."
      });
    });
};

// Find a single Teams with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Teams.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Teams with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving teams with id=" + id
      });
    });
};

// Update a Teams by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Teams.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teams was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Teams with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Teams with id=" + id
      });
    });
};

// Delete a Teams with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Teams.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Teamsl was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Teams with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Teams with id=" + id
      });
    });
};

// Delete all Teamss from the database.
exports.deleteAll = (req, res) => {
  Teams.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Teams were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all teamss."
      });
    });
};

// find all published Teams
exports.findAllPublished = (req, res) => {
  Teams.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving teams."
      });
    });
};
