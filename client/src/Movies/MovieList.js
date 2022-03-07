import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';

export default function MovieList({movieList, addToSavedList}) {
  const { url } = useRouteMatch();

  return (
    <div className="movie-list">
      {movieList && movieList.map(movie => {
        return <MovieCard addToSavedList={addToSavedList} key={movie.id} movieDetails={movie}/>
      })}
    </div>
  );
}

