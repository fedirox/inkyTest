import { useState } from "react";

function DateSearch({ onSubmit }) {
  const [startDate, setStartDate] = useState("2022-11-30");
  const [endDate, setEndDate] = useState("2022-12-30");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(startDate, endDate);
  };
  return (
    <div>
      <h1>In our dataset, the data spans from 2022-11-30 to 2022-12-30.</h1>
      <form onSubmit={handleSubmit}>
        <label>start date</label>
        <input
          type="date"
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
        <label>end date</label>
        <input
          type="date"
          onChange={(e) => setEndDate(e.target.value)}
          value={endDate}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DateSearch;
