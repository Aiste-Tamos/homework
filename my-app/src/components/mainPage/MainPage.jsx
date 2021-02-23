import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "./Dropdown";
import { MovieCard } from "./MovieCard";
import { initialState, reducer } from "./reducer";
import classNames from "classnames";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"
import { ReactComponent as MovieIcon } from "../../assets/icons/movie.svg";

import "./mainPage.scss";

export const MainPage = ({ className }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [inputValue, setInputValue] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [inputFieldValue, setInputFieldValue] = useState("");
    const [results, setResults] = useState([]);
    const [movieId, setMovieId] = useState();
    const [showMovieCard, setShowMovieCard] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const mainClass = "main-page";
    const headerClass = `${mainClass}__header`;
    const searchButtonClass = `${mainClass}__search-button`;
    const searchButtonIconClass = `${mainClass}__search-button-icon`;
    const inputFieldClass = `${mainClass}__input-field`;
    const inputFieldTextClass = `${mainClass}__input-field-text`;
    const inputIconClass = `${mainClass}__icon`;
    const dropDownClassName = `${mainClass}__dropdown`;
    const dropDownClass = classNames(
      dropDownClassName,
      {
        [`${dropDownClassName}--show`]: showDropdown,
      },
      className
    );
    const resultsClass = `${mainClass}__results`;
    const itemClass = `${mainClass}__item`;
    const movieTitleClass = `${mainClass}__movie-title`;
    const movieInfoClass = `${mainClass}__movie-info`;
    const movieSectionClass = `${mainClass}__movie-section`;
    const errorMessageClass = `${mainClass}__error-message`;

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        console.log(results)
      }, 1500)
  
      return () => clearTimeout(delayDebounce)
    }, [results]);

    const handleChange = (e) => {
      setLoading(true);
      e.preventDefault();
      setInputValue(e.target.value);

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
      )
      .then(res => res.json())
      .then(data => {
        if(inputValue.length > 2 && !data.errors) {
          setResults(data.results);
          setLoading(false);
        } else {
          setResults([]);
          setErrorMessage(data.errors);
          setLoading(false);
        }
      });
  };

    const toggleClass = () => {
      setShowDropdown(!showDropdown);
    };

    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        toggleClass();
      }
    };

    useEffect(() => {
    
      fetch(`https://api.themoviedb.org/3/movie/550?api_key=${process.env.REACT_APP_TMDB_KEY}`)
          .then(res => res.json())
          .then(data => {
      
          dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: data.Search
        });
      });
  }, []);

    const handleSearchClick = (e) => {
      e.preventDefault();

      dispatch({
        type: "SEARCH_MOVIES_REQUEST"
      });

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${inputFieldValue}`)
      	.then(res => res.json())
      	.then(data => {
          if(!data.errors){
            dispatch({
              type: "SEARCH_MOVIES_SUCCESS",
              payload: data.results
            });
            setResults(data.results);
            setShowMovieCard(true);
          } else {
            dispatch({
              type: "SEARCH_MOVIES_FAILURE",
              error: data.errors
          });
          setErrorMessage(data.errors);
          }
      	});
      };

  return (
      <section className={mainClass}>
        <header className={headerClass}>
          <div role="button" tabIndex="0" className={inputFieldClass} onClick={toggleClass} onKeyPress={handleKeyPress}>
            <MovieIcon className={inputIconClass}/>
            <h3 className={inputFieldTextClass}>{inputFieldValue ? inputFieldValue : "Enter a movie name"}</h3>
          </div>
          <button className={searchButtonClass} onClick={handleSearchClick}>
            <SearchIcon 
              className={searchButtonIconClass}
            />
          </button>
            <Dropdown 
              className={dropDownClass}
              handleChange={handleChange}
              inputValue={inputValue}
            />
              {showDropdown && results.length > 0 && (
                <ul className={resultsClass}>
                {results.slice(0, 8).map(movie => {
                  const movieReleaseDate = new Date(movie.release_date);
                  const roundedVote = parseFloat(movie.vote_average).toFixed(1);
                  const handleMovieClick = () => {
                    toggleClass();
                    setResults([]);
                    setInputFieldValue(movie.title);
                    setInputValue(movie.title);
                    setMovieId(movie.id);
                  }
                  const handleMoviePress = (e) => {
                    if (e.key === "Enter") {
                      handleMovieClick();
                    }
                  }
                    return (
                      <li
                        className={itemClass}
                        key={movie.id}
                        onClick={handleMovieClick}
                        onKeyPress={handleMoviePress}
                        role="button"
                        tabIndex="0"
                      >
                        <h3 className={movieTitleClass}>{movie.title}</h3>
                        <h4 className={movieInfoClass}>
                          {movie.vote_average ? roundedVote : "No"} Rating,&nbsp;
                          {movie.release_date ? movieReleaseDate.getFullYear() : "-"}
                        </h4>
                      </li>
                )})}
                  </ul>
                )}
        </header>
        <section className={movieSectionClass}>
          {loading && !errorMessage ? (
            <span>&nbsp;loading...</span>
          ) : errorMessage ? (
            <span className={errorMessageClass}>&nbsp;{errorMessage}</span>
          ) : (
            showMovieCard && inputValue === inputFieldValue &&
              results.map((movie, index) => {
                if (movie.id === movieId) {
                  return <MovieCard key={`${index}--${movie.title}`} movie={movie}></MovieCard>
                } else return null;
              })
            )}
        </section>
      </section>
  )
};

MainPage.propTypes = {
  className: PropTypes.string,
}

MainPage.defaultProps = {
  className: "",
}
