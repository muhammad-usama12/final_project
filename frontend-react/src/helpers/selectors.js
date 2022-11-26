export function getShowCategories(shows) { 


  let result = [];

  for (const show of shows) {
    const showCategories = show.name
    result.push(showCategories)
  }
  return result
}