import React from "react";

import "./Category.scss";

import CategoryListItem from "./CategoryListItem";

// We pass props from Article.js, and App.js
export default function CategoryList(props) {
  const categoriesArray = props.shows;
  const categories = categoriesArray.map((category) => (
    <CategoryListItem
      key={category.id}
      name={category.name}
      img={category.image_url}
      onClick={() => props.getFilteredShows(category.id)}
    />
  ));
  

  return (
    <section>
      <div className="general-filter">
        <CategoryListItem name="Show All" onClick={props.getAllShows} />
        <CategoryListItem name="Hide Spoilers" onClick={props.hideSpoilers} />
      </div>
      <div className="category-list">{categories}</div>
    </section>
  );
}
