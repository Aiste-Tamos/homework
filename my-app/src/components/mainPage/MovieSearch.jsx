import React, { useState, useEffect } from "react";
import { SearchInput } from "./SearchInput";
import { ReactComponent as SearchIcon } from "../../assets/icons/search.svg"

import "./movieSearch.scss";

export const MovieSearch = ({ ...other}) => {
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([]);

    const mainClass = "movie-search";
    const searchButtonClass = `${mainClass}__search-button`;
    const searchButtonIconClass = `${mainClass}__search-button-icon`;
    const inputClass = `${mainClass}__input`;
    const resultsClass = `${mainClass}__results`;
    const itemClass = `${mainClass}__item`;
    const itemButtonClass = `${mainClass}__item-button`;
    const movieTitleClass = `${mainClass}__movie-title`;
    const movieInfoClass = `${mainClass}__movie-info`;

    useEffect(() => {
      const delayDebounce = setTimeout(() => {
        console.log(results)
      }, 1500)
  
      return () => clearTimeout(delayDebounce)
    }, [results]);

    const handleChange = (e) => {
      e.preventDefault();

      setInputValue(e.target.value);

      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
      )
      .then(res => res.json())
      .then(data => {
        if(inputValue.length > 2 && !data.errors) {
          setResults(data.results);
        } else {
          setResults([]);
        }
      });
  };

  return (
    <div className={mainClass} {...other}>
        <SearchInput
          id="input-search"
          placeholder="Enter movie name" 
          inputValue={inputValue}
          onChange={handleChange} 
          className={inputClass}
        />
        <button className={searchButtonClass}>
          <SearchIcon className={searchButtonIconClass}/>
        </button>
          {results.length > 0 && (
          <ul className={resultsClass}>
            {results.slice(0, 8).map(movie => {
              const movieReleaseDate = new Date(movie.release_date);
              const roundedVote = parseFloat(movie.vote_average).toFixed(1);

              return (
              <React.Fragment>
                <li className={itemClass} key={movie.id}>
                  <button className={itemButtonClass} onClick={() => {
                  setInputValue(movie.title);
                  setResults([]);
                }}>
                  <h3 className={movieTitleClass}>{movie.title}</h3>
                  <h4 className={movieInfoClass}>
                    {roundedVote ? roundedVote : "No"} Rating,&nbsp;
                    {movie.release_date ? movieReleaseDate.getFullYear() : "-"}
                  </h4>
                  </button>
                </li>
                </React.Fragment>
            )})}
          </ul>
        )}
        </div>
  )
};