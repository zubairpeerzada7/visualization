import React, { useState } from "react";
import css from "./NavBar.module.css";

const NavBar = (props) => {
  const { changeChart, chartType } = props;

  return (
    <div className={css.container}>
      <select
        className={css.select}
        onChange={(e) => changeChart(e.target.value)}
        value={chartType}
      >
        <option value="country">Country</option>
        <option value="topic">Topic</option>
        <option value="region">Region</option>
      </select>
    </div>
  );
};

export default NavBar;
