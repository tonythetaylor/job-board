module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
      req_id: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      location: {
        type: Sequelize.STRING
      },
      applied_on: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      comments: {
        type: Sequelize.STRING
      },
      hiring_manager: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Job;
  };