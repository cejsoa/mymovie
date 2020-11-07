module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("Genre", {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Genre_Name: {
            type: Sequelize.STRING,
            allowNull: false
        }
    },
    {
        timestamps: false
    });
    
    return Genre;
  };