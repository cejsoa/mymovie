module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define("Comment", {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        IdMovie: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        Grade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Comment: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
    
    return Comment;
  };