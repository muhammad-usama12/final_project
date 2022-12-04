import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";

export default function Footer(props) {

  return (
    <footer>
      <span>
      @ 2022 <Link key={1} to="https://github.com/muhammad-usama12/final_project">teebo</Link> by <Link key={2} to="https://github.com/DeviRaju27">devi raju</Link>, <Link key={3} to="https://github.com/muhammad-usama12">muhammad usama</Link>, <Link key={4} to="https://github.com/kaseyvee">kasey valdez</Link>
      </span>
    </footer>
  );
}