import React, { useState, useEffect } from 'react';
import axios from 'axios';
//imported React router, switch, & link 
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom';
import SavedList from './Movies/SavedList';

export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        //Shortened response to res & got the axios response in the console
        .then(res => {
          console.log("axios response", res.data)
          setMovieList(res.movieList)
          // Study this response with a breakpoint or log statements
          // and set the response data as the 'movieList' slice of state
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  const addToSavedList = id => {
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <BrowserRouter>
    <div>
      <SavedList list={[ /* This is stretch */]} />

      {/* <Route>
        <Link to="/"></Link>
      </Route> */}
      <Route>Replace this Div with your Routes</Route>
    </div>
    </BrowserRouter>
  );
}
