import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: 0,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        props.setMovieList(
          props.movieList.map((item) => {
            if (item.id === Number(id)) {
              return res.data;
            } else {
              return item;
            }
          })
        );
        push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1>Update Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Sound of Moo-sic'
          value={movie.title}
        ></input>
        <input
          type='text'
          name='director'
          onChange={handleChange}
          placeholder='Dairy A. Ir'
          value={movie.director}
        ></input>
        <input
          type='text'
          name='metascore'
          onChange={handleChange}
          placeholder='100'
          value={movie.metascore}
        ></input>
        <button>Submit</button>
      </form>
    </div>
  );
};
export default UpdateMovie;
