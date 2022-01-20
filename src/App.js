import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { StaticMap } from "react-map-gl";
import DeckGL, { GeoJsonLayer, ArcLayer } from "deck.gl";
import { LineLayer } from "@deck.gl/layers";

const App = () => {
  const [info, setInfo] = useState([]);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiY29yYWxlZWxvbmciLCJhIjoiY2t5bXVpcDVoM2oxNTJxbzg3MjFsa3Z0eSJ9.BtzKiFvjtKrtbejc2Z2NSA";

  const INITIAL_VIEW_STATE = {
    longitude: -122.41669,
    latitude: 37.7853,
    zoom: 13,
    pitch: 0,
    bearing: 0,
  };

  const data = [
    {
      sourcePosition: [-122.41669, 37.7853],
      targetPosition: [-122.41669, 37.781],
    },
  ];

  const layers = [new LineLayer({ id: "line-layer", data })];

  const API_URL =
    "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json" +
    "?country=US&begin=2019-05-01&end=2019-05-04";

  const fetchData = async () => {
    await axios

      .get(API_URL)
      .then((response) => {
        setInfo(response);
      })
      .catch((error) => console.error(error));
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default App;
