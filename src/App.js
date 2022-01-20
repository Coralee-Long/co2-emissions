import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const MAPBOX_TOKEN =
    "pk.eyJ1IjoiY29yYWxlZWxvbmciLCJhIjoiY2t5bXVpcDVoM2oxNTJxbzg3MjFsa3Z0eSJ9.BtzKiFvjtKrtbejc2Z2NSA";

  const URL =
    "https://api.v2.emissions-api.org/api/v2/carbonmonoxide/geo.json?country=US&begin=2019-05-01&end=2019-05-04";

  const fetchData = async () => {
    await axios

      .get(URL)
      .then((response) => {
        setData(response);
      })
      .catch((error) => console.error(error));
  };

  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return <div className="App"></div>;
}

export default App;
