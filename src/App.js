import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { StaticMap } from "react-map-gl";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import DeckGL, { GeoJsonLayer, ArcLayer, LineLayer } from "deck.gl";

const App = ({ viewState }) => {
  const [info, setInfo] = useState();
  const [location, setLocation] = useState([
    { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
    { COORDINATES: [10.4515, 51.1657], WEIGHT: 60 },
    // { COORDINATES: [3.436, 55.3781], WEIGHT: 80 },
    // { COORDINATES: [2.2137, 46.2276], WEIGHT: 60 },
    // { COORDINATES: [31.1656, 48.3794], WEIGHT: 100 },
    // { COORDINATES: [105.3188, 61.524], WEIGHT: 100 },
    // { COORDINATES: [51.9253, 14.235], WEIGHT: 40 },
    // { COORDINATES: [52.5167, 13.3833], WEIGHT: 100 },
    // { COORDINATES: [53.55, 10.0], WEIGHT: 100 },
    // { COORDINATES: [50.9422, 6.9578], WEIGHT: 100 },
    // { COORDINATES: [50.7339, 7.0997], WEIGHT: 100 },
    // { COORDINATES: [5.2913, 52.1326], WEIGHT: 100 },
    // { COORDINATES: [3.7492, 40.4637], WEIGHT: 100 },
    // {
    //   COORDINATES: [8.820533894380851, 53.488646312903136],
    //   WEIGHT: 0.038743987679481506,
    // },
    // {
    //   COORDINATES: [7.654194492486757, 52.28981958893976],
    //   WEIGHT: 0.036840688437223434,
    // },
    // {
    //   COORDINATES: [7.476832225737172, 52.63056505451241],
    //   WEIGHT: 0.03662116825580597,
    // },
    // { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
    // { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
    // { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
    // { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
  ]);
  const [newLocation, setNewLocation] = useState([
    { COORDINATES: [-122.42177834, 37.78346622], WEIGHT: 100 },
    { COORDINATES: [-23, 12], WEIGHT: 100 },
  ]);
  const [loading, setLoading] = useState(true);

  const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiY29yYWxlZWxvbmciLCJhIjoiY2t5bXVpcDVoM2oxNTJxbzg3MjFsa3Z0eSJ9.BtzKiFvjtKrtbejc2Z2NSA";

  const INITIAL_VIEW_STATE = {
    longitude: 10.4515,
    latitude: 51.1657,
    zoom: 4,
    pitch: 0,
    bearing: 0,
  };

  const API_URL =
    "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json?country=DE&begin=2019-05-01&end=2019-05-04";

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
        // setNewLocation([response.data.features]);
        setLoading(false);
        // response.data.features.map((item) => {
        //   setLocation((prevLocation) => [
        //     ...prevLocation,
        //     {
        //       COORDINATES: [
        //         parseInt(item.geometry.coordinates[0]),
        //         parseInt(item.geometry.coordinates[1]),
        //       ],
        //       WEIGHT: parseInt(item.properties.value),
        //     },
        //   ]);
        // });

        // setInfo(response.data.features[0].geometry.coordinates[0]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
    // info && infoMapped();
  }, []);

  // const infoMapped = async () =>
  //   info &&
  //   (await info.map((item) => {
  //     setLocation((prevLocation) => [
  //       ...prevLocation,
  //       {
  //         COORDINATES: [
  //           `${item.geometry.coordinates[0]}`,
  //           ` ${item.geometry.coordinates[1]} `,
  //         ],
  //         WEIGHT: `${item.properties.value}`,
  //       },
  //     ]);
  //   }));

  console.log(location);
  // const data = location;
  const layer =
    info &&
    new HeatmapLayer({
      id: "heatmapLayer",
      data: API_URL,
      dataTransform: (d) => d.features,
      getPosition: (d) => d.geometry.coordinates,
      getWeight: (d) => d.properties.value,
      aggregation: "SUM",
    });

  console.log(layer);

  return (
    <>
      {/* <div style={{ height: "200px" }}>
        <h1>TEST DATA</h1>
        {info ? (
          <>
            {info.map((item) => {
              return (
                <div>
                  <p>Coordinates:{item.geometry.coordinates}</p>
                  <p>Value:{item.properties.value}</p>
                </div>
              );
            })}
          </>
        ) : (
          <p>Loading...</p>
        )}{" "}
      </div> */}
      {info ? (
        <DeckGL
          initialViewState={INITIAL_VIEW_STATE}
          controller={true}
          viewState={viewState}
          layers={[layer]}
        >
          <StaticMap
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            style={{ height: "200px" }}
          />
        </DeckGL>
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
};

export default App;
