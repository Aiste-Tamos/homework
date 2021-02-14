import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as MovieIcon } from "../../assets/icons/movie.svg";

import "./searchInput.scss";

export const SearchInput = ({
  id,
  inputValue,
  onChange,
  options,
  placeholder,
  className,
  ...other
}) => {
  const mainClassName = "main-search";
  const inputClass = `${mainClassName}__input`;
  const inputIconClassName = `${mainClassName}__icon`;
  const mainClass = classNames(mainClassName, className);

  const inputRef = useRef(null);

  return (
    <div className={mainClass} {...other}>
        <MovieIcon className={inputIconClassName}/>
      <input
        type="text"
        className={inputClass}
        value={inputValue}
        onChange={onChange}
        id={id}
        aria-label="search"
        autoComplete="off"
        placeholder={placeholder}
        // onKeyDown={handleSearchInputKeyDown}
        ref={inputRef}
      />
      </div>
  );
};

SearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
  };
  
  SearchInput.defaultProps = {
    inputValue: "",
    options: [],
    className: "",
  };