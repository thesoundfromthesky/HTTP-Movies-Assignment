import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieUpdate() {
  const { id } = useParams();
  const { push } = useHistory();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  const { title, director, metascore, stars } = movie;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie({ ...res.data });
      })
      .catch(err => console.log(err.response));
  }, []);

  function handleChange(e) {
    const ev = e.target;
    if (ev.name !== "star") {
      setMovie(prev => ({ ...prev, [ev.name]: ev.value }));
    } else {
      setMovie(prev => {
        prev.stars[ev.dataset.id] = ev.value;
        return { ...prev };
      });
    }
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(e => {
        console.log(e);
        push("/");
      })
      .catch(err => console.error(err));
    console.log("submit");
  }

  return (
    <div className="save-wrapper">
      <form id="form-movie" onSubmit={handleSubmit} className="movie-card">
        <h2>
          <label>Title:</label>
          <input
            name="title"
            value={title}
            onChange={handleChange}
            placeholder={`change Title`}
          />
        </h2>

        <div className="movie-director">
          <label>
            <em>Director:</em>
          </label>
          <input
            name="director"
            value={director}
            onChange={handleChange}
            placeholder={`change Director`}
          />
        </div>

        <div className="movie-metascore">
          <label>
            <strong>Metascore:</strong>
          </label>
          <input
            name="metascore"
            value={metascore}
            onChange={handleChange}
            placeholder={`change Metascore`}
          />
        </div>

        <h3>
          <label>
            <strong>Actors</strong>
          </label>
          {stars.map((star, i) => (
            <input
              data-id={i}
              name="star"
              key={i}
              value={star}
              onChange={handleChange}
              placeholder={`change Actors`}
            />
          ))}
        </h3>
      </form>
      <button type="submit" form="form-movie" className="save-button">
        Update
      </button>
      <Link className="update-button" to={`/movies/${id}`}>
        Back
      </Link>
    </div>
  );
}
