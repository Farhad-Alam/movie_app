import React, { useState, useEffect } from "react";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import MenuOpenIcon from "@material-ui/icons/MenuOpen";
const Nav = () => {
  const [show, setshow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setshow(!show);
      } else {
        setshow(show);
      }
    });
  }, []);
  return (
    <div className={`nav ${show && "show"} `}>
      <div className="nav_info p-3 d-flex justify-content-between">
        <img src="img/net.png" alt="name" />
        <MenuOpenIcon className="nav_icon" />
      </div>
    </div>
  );
};

export default Nav;
