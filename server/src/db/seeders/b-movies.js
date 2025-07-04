/* eslint-disable camelcase */
const { Genre } = require('../models');

const { POSTGRES_DATA } = require('../../constants');

module.exports = {
  async up(queryInterface) {
    const { movies } = await POSTGRES_DATA();
    const genres = await Genre.findAll({
      attributes: ['uuid', 'title'],
    });
    const genreMap = genres.reduce((acc, genre) => {
      acc[genre.title] = genre.uuid;
      return acc;
    }, {});
    const updatedMovies = movies.map((movie) => {
      const genreUuid = genreMap[movie.genre];
      if (genreUuid) {
        movie.genre_uuid = genreUuid;
      }
      delete movie.genre;
      return movie;
    });
    await queryInterface.bulkInsert('movies', updatedMovies, {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('movies', null, {});
  },
};
