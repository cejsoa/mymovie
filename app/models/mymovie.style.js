module.exports = (sequelize, Sequelize) => {
    const Style = sequelize.define("Style", {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Style_Name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
    
    return Style;
  };