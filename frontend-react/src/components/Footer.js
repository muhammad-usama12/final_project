import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";

export default function Footer(props) {

  return (
    <footer>
      <span>
      @ 2022 <Link to="https://github.com/muhammad-usama12/final_project">teebo</Link> by <Link to="https://github.com/DeviRaju27">devi raju</Link>, <Link to="https://github.com/muhammad-usama12">muhammad usama</Link>, <Link to="https://github.com/kaseyvee">kasey valdez</Link>
      </span>
    </footer>
  );
}