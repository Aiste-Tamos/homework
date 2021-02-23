import React from "react";
import PropTypes from "prop-types";
import { SearchInput } from "./SearchInput";
import { ReactComponent as MovieIcon } from "../../assets/icons/movie.svg";

import "./dropdown.scss";

export const Dropdown = ({ handleChange, inputValue, ...other}) => {
    const mainClass = "dropdown";
    const wrapperClass = `${mainClass}__wrapper`;
    const inputTitleClass = `${mainClass}__input-title`;
    const iconClass = `${mainClass}__icon`;

  return (
    <div className={mainClass} {...other}>
        <MovieIcon className={iconClass}/>
        <div className={wrapperClass}>
          <SearchInput
            id="input-search"
            ariaLabel="search through movies"
            inputValue={inputValue}
            onChange={handleChange} 
            onClick={handleChange}
          />
          <h4 className={inputTitleClass}>Enter a movie name</h4>
        </div>
    </div>
  )
};

Dropdown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputValue: PropTypes.string
};

Dropdown.defaultProps = {
  inputValue: "",
};