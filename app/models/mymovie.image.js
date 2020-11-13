module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("Images", {
        Id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        Image_Link: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false
    });
    
    return Images;
  };