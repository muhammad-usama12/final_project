import React from "react";
import "./Category.scss"
import CategoryListItem from "./CategoryListItem"

// We pass props from Article.js, and App.js
export default function CategoryList(props) {

  const categoriesArray = props.name.shows
  const eachcategory = categoriesArray.map((category) => (
    <CategoryListItem
      key = {category.id}
      name = {category.name} 
      img = {category.image_url}
    />
  ))
  return (
    <section className="category-list">
      { eachcategory }
    </section>
  );
}