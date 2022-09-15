module.exports = (sequelize, Sequelize) => {
  const Teams = sequelize.define("team", {
    teamName: {
      type: Sequelize.STRING
    },
    teamGroup: {
      type: Sequelize.STRING
    },
  });

  return Teams;
};
