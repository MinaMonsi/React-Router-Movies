import React, { useState, useEffect } from 'react';
import axios from 'axios';
//**imported React router, switch, & link 
import { Route, Switch} from 'react-router-dom';
import SavedList from './Movies/SavedList';
//**imported MovieList component from Movies folder
import MovieList from './Movies/MovieList';
import MovieCard from './Movies/MovieCard';


export default function App () {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies') // Study this endpoint with Postman
        //Shortened response to res & got the axios response in the console
        .then(res => {
           console.log("response", res.data)
          setMovieList(res.data)
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
    
    <div>
      <SavedList list={[ /* This is stretch */]} />

      <Switch>
        <Route path="/">
          <MovieList movies={movieList}/>
        </Route>

        <Route path='/movies/:movieId'>
          <MovieCard movieList={movieList}/>
        </Route>

      </Switch>
      
    </div>

  );
}
