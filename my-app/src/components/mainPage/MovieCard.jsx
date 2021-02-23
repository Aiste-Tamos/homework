import React from "react";
import PropTypes from "prop-types";

import "./movieCard.scss";

export const MovieCard = ({ movie }) => {
    const mainClass = "movie-card";
    const posterWrapperClass = `${mainClass}__poster-wrapper`;
    const movieReleaseDate = new Date(movie.release_date);
    const roundedVote = parseFloat(movie.vote_average).toFixed(1)
    const titleClass = `${mainClass}__title`;
    const ratingClass = `${mainClass}__rating`;
    const imageClass = `${mainClass}__image`;
    const overviewClass = `${mainClass}__overview`;

    return (
        <div className={mainClass}>
            <h2 className={titleClass}>{movie.title} {movie.release_date ? `(${movieReleaseDate.getFullYear()})` : null}</h2>
            <h3 className={ratingClass}> {movie.vote_average ? roundedVote : "No"} Rating</h3>
            <div className={posterWrapperClass}>
                {movie.poster_path ? (
                    <img
                    className={imageClass}
                    src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    />
                ) : null}
                {movie.overview ? (
                <p className={overviewClass}>{movie.overview}</p>
              ) : "No overview for this movie"
              }
            </div>
        </div>
    )
};

MovieCard.propTypes = {
    movie: PropTypes.object,
  };
  
  MovieCard.defaultProps = {
    movies: {},
  };