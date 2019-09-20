'use strict';
module.exports = (sequelize, DataTypes) => {
  const businesses = sequelize.define('businesses', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    link: DataTypes.STRING
  }, {});
  
  businesses.associate = function(models) {
    // associations can be defined here
  };
  return businesses;
};
