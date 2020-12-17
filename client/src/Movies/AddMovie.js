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

const AddMovie = () => {
  const [addMovie, setAddMovie] = useState(initialMovie);

  const handleChange = (e) => {
    setAddMovie({ ...addMovie, [e.target.name]: e.target.value });
  };
  const submit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/movies", addMovie)
      .then((res) => {
        console.log(res);
        setAddMovie(initialMovie);
      })

      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          type='text'
          name='title'
          onChange={handleChange}
          placeholder='Transformers 42'
          value={addMovie.title}
        ></input>
        <input
          type='text'
          name='director'
          onChange={handleChange}
          placeholder='M Night Sham-a-Lon'
          value={addMovie.director}
        ></input>
        <input
          type='text'
          name='metascore'
          onChange={handleChange}
          placeholder='90'
          value={addMovie.metascore}
        ></input>

        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddMovie;
