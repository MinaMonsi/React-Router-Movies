import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';

export default function MovieCard (props) {
  const [movie, setMovie] = useState({});

  let { movieList, movieDetails, addToSavedList } = props;
  let { movieId } = useParams();

  const isHomepage = movieDetails !== undefined;
  if (movieDetails !== undefined){
    movieId = movieDetails.id;
  } else if ( movieList !== undefined){
    movieDetails = movieList.find(movie => `${movie.id}` === movieId);
  }

  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${movieId}`)
      .then(response => {
        // console.log("Response from MovieCard useEffect: ", response);
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      }); 
  }, [movieId]);

  const saveMovie = evt => { 
    console.log("function: ", addToSavedList);
    addToSavedList(movie);
    console.log("movie from MC: ", movie);
  };

  if (!movieDetails) {
    return <div>Loading movie information...</div>;
  };

  //movie info
  const { title, director, metascore } = movieDetails;
  const { stars } = movie;

  return(
    <div>
      <div onClick={(evt) => history.push(`/movies/${movie.id}`)} className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div> 
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        {/* Inline If with Logical && Operator */}
        { !isHomepage && <h3>Actors</h3> }

        {/* Only render if it's not the homepage  */}
        {!isHomepage && stars && stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>

      <div onClick={saveMovie} className="save-button">Save</div>

    </div>
  )
}
