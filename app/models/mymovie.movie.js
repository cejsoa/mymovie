module.exports = (sequelize, Sequelize) => {
    const Movies = sequelize.define("Movies", {
        Id: { 
            type: Sequelize.INTEGER, 
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NameMovie: {
            type: Sequelize.STRING,
            allowNull: false
        },
        NameDirector: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Year_M: {
            type: Sequelize.STRING,
            allowNull: false
        },
        IdGenre: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdLanguage: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        Favorite: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },
        CommunityGrade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdImage: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IMDBGrade: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        IdStyle: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        MetaScoreGrade: {
            type: Sequelize.INTEGER,
            allowNull: true
        },
        Popularity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps: false
    });

    return Movies;
  };

  