import React from "react";
import Row from "./components/Row";
import requests from "./components/Requests";
import Nav from "./components/Nav";
import Banner from "./components/Banner";

const App = () => {
  return (
    <div>
      <Nav />
      <Banner  fetchUrl={requests.fetchTrending} />

      <Row
        title={"NETFLIX ORIGINALS"}
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeMenu
      />
      <Row title={"Trending Movies"} fetchUrl={requests.fetchTrending} />
      <Row title={"Horror Movies"} fetchUrl={requests.fetchHorrorMovies} />
      <Row title={"TopRated Movies"} fetchUrl={requests.fetchTopRated} />
      <Row title={"Action Movies"} fetchUrl={requests.fetchActionMovies} />
      <Row title={"Comedy Movies"} fetchUrl={requests.fetchComedyMovies} />
      <Row title={"Romance Movies"} fetchUrl={requests.fetchRomanceMovies} />
      <Row title={"Documentaries"} fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
};

export default App;
