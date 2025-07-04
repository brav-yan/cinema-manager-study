const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      Genre.hasMany(models.Movie, {
        foreignKey: 'genreUuid',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }
  Genre.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          len: [1, 100],
        },
      },
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          isUrl: true,
          len: [0, 3000],
        },
      },
    },
    {
      sequelize,
      modelName: 'Genre',
      tableName: 'genres',
      timestamps: true,
      underscored: true,
    }
  );
  return Genre;
};
