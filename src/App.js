import { useState } from "react";
import { inkyFetch } from "./api";
import DateSearch from "./components/DateSearch";
import InkyChart from "./components/InkyChart";

function App() {
  const [error, setError] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = async (startDate, endDate) => {
    const { data, error } = await inkyFetch(startDate, endDate);
    setData(data);
    setError(error);
  };

  return (
    <div className="App">
      <DateSearch onSubmit={handleSubmit} />
      <InkyChart data={data} error={error} />
    </div>
  );
}

export default App;
