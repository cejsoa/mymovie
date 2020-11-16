module.exports = (sequelize, Sequelize) => {
    const Languages = sequelize.define("Languages", {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Language_Name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
    
    return Languages;
  };