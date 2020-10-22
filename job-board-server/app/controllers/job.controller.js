const db = require("../models");
const Job = db.jobs;
const Op = db.Sequelize.Op;

// pagination 
const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: jobs } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, jobs, totalPages, currentPage };
};

// Create and Save a new Job
exports.create = (req, res) => {
    // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Job
  const job = {
    req_id: req.body.req_id,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    applied_on: req.body.applied_on,
    status: req.body.status,
    comments: req.body.comments,
    hiring_manager: req.body.hiring_manager,
    published: req.body.published ? req.body.published : false
  };

  // Save Job in the database
  Job.create(job)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Job."
      });
    });
  
};

// Retrieve all Jobs from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  Job.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving jobs."
      });
    });
};

// Find a single Job with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

  Job.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Job with id=" + id
      });
    });
  
};

// Update a Job by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

  Job.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Job with id=${id}. Maybe Job was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Job with id=" + id
      });
    });
  
};

// Delete a Job with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

  Job.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Job was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Job with id=" + id
      });
    });
  
};

// Delete all Jobs from the database.
exports.deleteAll = (req, res) => {
    Job.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Jobs were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing all jobs."
          });
        });
  
};

// Find all published Jobs
exports.findAllPublished = (req, res) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);

  Job.findAndCountAll({ where: { published: true }, limit, offset })
  .then(data => {
    const response = getPagingData(data, page, limit);
    res.send(response);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving jobs."
    });
  });

  
};
