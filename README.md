# QNA

### a) Describe a way to optimize the solution for heavy traffic (it can be anything, from database to data structure).
We can improve the solution by using a real-time database and implementing SSE to directly send data from server to client. Alternatively, we can integrate Firebase on the client side for seamless data communication
### b) Implementation of filtering per page url (show chart for specific period and page url).
app.get("/inky", (req, res) => {
  const { start_date, end_date, referrer } = req.query;

  const sql = `SELECT MAX(eventValue)as maxValue, strftime('%Y-%m-%d', events.createdAt) AS day ,events.visitId
   FROM events 
   INNER JOIN records ON events.sessionId=records.sessionId 
   WHERE eventType=1 
   AND ? <= day
   AND day <= ?
   AND referrer = ?
   GROUP BY events.visitId, day`;
  try {
    db.all(sql, [start_date, end_date, referrer], (err, rows) => {
      if (err) return res.json({ status: 300, success: false, error: err });

      return res.json({ status: 200, data: rows, success: true });
    });
  } catch (error) {
    // Handle any errors that occur during the query execution
    return res.json({ status: 400, success: false, error });
  }
});
### c) What other metrics can we calculate from this database?
We can also calculate the time spent on each page or the time the client spends scrolling to reach their last scroll point.