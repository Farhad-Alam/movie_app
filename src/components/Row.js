import React, { useState, useEffect } from "react";
import instance from "./Axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURl = "https://image.tmdb.org/t/p/original";

const Row = ({ title, fetchUrl, isLargeMenu }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  const fecthData = async () => {
    const request = await instance.get(fetchUrl);

    setmovies(request.data.results);
  };

  // useEffect prop

  useEffect(() => {
    fecthData();
  }, [fetchUrl]);

  function truncate(elem, x) {
    return elem?.length > x ? elem.substr(0, x - 1) + "…" : elem;
  }
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      settrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.original_name || movie?.original_title ||movie?.title || "")
        .then((url) => {
          const fullUrl = new URLSearchParams(new URL(url).search);
          settrailerUrl(fullUrl.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  console.table(movies);

  return (
    <div className={`movies_sec text-center ${isLargeMenu && "hero"} `}>
      <h1> {title}</h1>

      <div className={`movies_info mt-1 `}>
        {movies.map((movie) => {
          const {
            id,
            poster_path,
            name,
            original_title,
            backdrop_path,
            overview,
            vote_average,
          } = movie;
          const back = backdrop_path ? backdrop_path : poster_path;
          return (
            <div key={id}>
              <div className="m_img">
                <img
                  onClick={() => handleClick(movie)}
                  className={`my-3 mt-0 movies_img ${isLargeMenu && "m_trend"} 
               mx-3`}
                  src={`${baseURl}${isLargeMenu ? poster_path : back} `}
                  alt="name"
                />
                <div
                  className={`info_list d-flex align-items-center ${
                    isLargeMenu && "l_list"
                  }`}
                >
                  <div className="info">
                    <p className="fw-bold mb-0">{movie?.title || name || original_title}</p>
                    <p className="mt-1">{truncate(overview, 70)}</p>
                    <p className="mt-3 d-flex justify-content-end fs-4">
                      {vote_average}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
