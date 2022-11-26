import React from "react";
import "./Category.scss"
import CategoryListItem from "./CategoryListItem"

// We pass props from Article.js, and App.js
export default function Category(props) {

  const categoriesArray = props.name
  const eachcategory = categoriesArray.map((category) => (
    <CategoryListItem
    name = {category.name} 
    img = {category.image_url}
    />
  ))
  return (
    <div className="category-tags">

      <ul className="category-list"> { eachcategory } </ul>
   
    </div>
  );
}