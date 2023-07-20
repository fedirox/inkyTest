import axios from "axios";
import _ from "lodash";

const inkyFetch = async (startDate, endDate) => {
  try {
    const response = await axios.get("http://localhost:5000/inky", {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });
    if (response.data.status !== 200) throw response.data.error;
    if (response.data.data?.length < 1)
      throw new Error("no data for those dates");
    const groupedData = _.groupBy(response.data.data, "day");
    const meanValuesByDate = _.mapValues(groupedData, (group) =>
      _.meanBy(group, "maxValue")
    );
    const transformedArray = Object.entries(meanValuesByDate).map(
      ([day, value]) => ({
        day,
        value,
      })
    );
    return { data: transformedArray, error: "" };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

export { inkyFetch };
