import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import "./searchInput.scss";

export const SearchInput = ({
  id,
  ariaLabel,
  inputValue,
  onChange,
  placeholder,
  className,
  ...other
}) => {
  const mainClassName = "main-search";
  const inputClass = `${mainClassName}__input`;
  const mainClass = classNames(mainClassName, className);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  })

  return (
    <div className={mainClass} {...other}>
      <input
        autoFocus
        type="search"
        className={inputClass}
        value={inputValue}
        onChange={onChange}
        id={id}
        aria-label={ariaLabel}
        autoComplete="off"
        placeholder={placeholder}
        ref={inputRef}
      />
      </div>
  );
};

SearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    ariaLabel: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  
  SearchInput.defaultProps = {
    inputValue: "",
    className: "",
    placeholder: "",
    ariaLabel: "",
  };