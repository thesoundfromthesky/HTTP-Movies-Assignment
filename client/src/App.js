import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieUpdate from "./Movies/MovieUpdate";

// - Add a route at the path `/update-movie/:id`
// - Create a component with a form to update the chosen movie
// - Add a button in the movie component that routes you to your new route with the movies's id as the URL param
// - The form should make a PUT request to the server when submitted
// - When the call comes back successfully, reset your form state and route the user to `/movies` where they will see the updated movie in the list

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route path="/update-movie/:id" component={MovieUpdate} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
    </>
  );
};

export default App;
