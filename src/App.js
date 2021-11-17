import React, { useEffect, useState } from "react";
import "./App.css";

const customers = ["😄", "😜", "🤣", "🥳", "🤢", "😘", "😎"];

function QueueItem(props) {
  return <span>{customers[props.position % customers.length]}</span>;
}

function App() {
  const [data, setData] = useState(undefined);

  // Found on https://upmostly.com/tutorials/settimeout-in-react-components-using-hooks
  useEffect(() => {
    // Fetch data and set it to state
    const getData = async () => {
      const res = await fetch("https://kea-alt-del.dk/kata-distortion/");
      const json = await res.json();
      setData(json);
    };
    // Update every 10 seconds
    const interval = setInterval(() => {
      getData();
    }, 10000);
    getData();
    return () => clearInterval(interval);
  }, []);

  const queueItems = data ? new Array(parseInt(data.inQueue)).fill(0) : [];

  return (
    <div className="App">
      <h1>Number of people currently in the queue: {queueItems.length}</h1>
      {queueItems.map((item, index) => {
        return <QueueItem key={index.toString()} position={index} />;
      })}
    </div>
  );
}

export default App;
