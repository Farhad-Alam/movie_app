import { MuiThemeProvider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import instance from "./Axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseURl = "https://image.tmdb.org/t/p/original";

const Banner = ({ fetchUrl }) => {
  const [data, setdata] = useState([]);
  const [trailerUrl, settrailerUrl] = useState("");

  const fetchData = async () => {
    const request = await instance.get(fetchUrl);
    const randomNum = Math.floor(
      Math.random() * request.data.results.length - 1
    );
    setdata(request.data.results[randomNum]);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      movieTrailer(
        movie?.name ||
          movie?.original_name ||
          movie?.original_title ||
          movie?.title ||
          ""
      )
        .then((url) => {
          const fullUrl = new URLSearchParams(new URL(url).search);
          settrailerUrl(fullUrl.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div
        className="banner text-white"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${baseURl}${data?.backdrop_path})`,
          backgroundPosition: "center 0rem",
        }}
      >
        <div className="banner_info px-4">
          <h1 className="overview">{data?.title || data?.original_name}</h1>
          <div className="btn_container mb-3">
            <button
              className="button rounded"
              onClick={() => {
                handleClick(data);
              }}
            >
              Play
            </button>
            <button className="button rounded">My List</button>
          </div>
          <p className="overview ">{truncate(data.overview, 130)}</p>
        </div>

        <div className="fadein"></div>
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </>
  );
};

export default Banner;
