import React from "react";

import "./Category.scss";

import CategoryListItem from "./CategoryListItem";

// We pass props from Article.js, and App.js
export default function CategoryList(props) {

  const categoriesArray = props.shows;
  const categories = categoriesArray.map((category) => (
    <CategoryListItem
      state={props.state}
      user={props.user}
      deleteFavourites={props.deleteFavourites}
      updateFavourites={props.updateFavourites}
      key={category.id}
      name={category.name}
      img={category.image_url}
      onClick={() => props.getFilteredShows(category.id)}
    />
  ));
  
  return (
    <>
      <div className="general-filter">
        <CategoryListItem showAll name="Show All" onClick={props.getAllShows} />
        <CategoryListItem spoiler name="Hide Spoilers" onClick={props.hideSpoilers} />
      </div>
      <div className="category-list">{categories}</div>
    </>
  );
}
