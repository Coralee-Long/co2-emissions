import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { StaticMap } from "react-map-gl";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import DeckGL, { GeoJsonLayer, ArcLayer, LineLayer } from "deck.gl";

const App = ({ data, viewState }) => {
  const [info, setInfo] = useState([]);
  const [location, setLocation] = useState([
    { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
  ]);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiY29yYWxlZWxvbmciLCJhIjoiY2t5bXVpcDVoM2oxNTJxbzg3MjFsa3Z0eSJ9.BtzKiFvjtKrtbejc2Z2NSA";

  const INITIAL_VIEW_STATE = {
    longitude: -122.42177834,
    latitude: 37.78346622,
    zoom: 3,
    pitch: 0,
    bearing: 0,
  };

  // const COORDINATES =

  const layer = new HeatmapLayer({
    id: "heatmapLayer",
    data: location,
    getPosition: (d) => d.COORDINATES,
    getWeight: (d) => d.WEIGHT,
    aggregation: "SUM",
  });

  const API_URL =
    "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json" +
    "?country=US&begin=2019-05-01&end=2019-05-04";

  // setData:
  // Data format:
  //  * [
  //  *   {COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100},
  //  *   ...
  //  * ]

  const fetchData = async () => {
    await axios

      .get(API_URL)
      .then((response) => {
        setInfo(response.data.features);
      })
      .catch((error) => console.error(error));
  };

  console.log(info);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div style={{ height: "200px" }}>
        {info.map((item, index) => (
          <p key={index}>{item[0]}</p>
        ))}
      </div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        viewState={viewState}
        layers={[layer]}
      >
        {/* <StaticMap
          mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
          style={{ height: "200px" }}
        /> */}
      </DeckGL>
    </>
  );
};

export default App;
