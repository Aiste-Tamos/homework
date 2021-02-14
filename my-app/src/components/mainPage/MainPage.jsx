import React from "react";
import { MovieSearch } from "./MovieSearch";

import "./mainPage.scss";

export const MainPage = () => {
    const mainClass = "main-page";
    const widgetClass = `${mainClass}__widget`;
  
  return (
      <section className={mainClass}>
        <div className={widgetClass}>
            <MovieSearch />
        </div>
      </section>
  )
};