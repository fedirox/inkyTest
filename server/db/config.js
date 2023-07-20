const sqlite3 = require("sqlite3").verbose();
let sql;

// open the database
let db = new sqlite3.Database('./inkyfada.db', sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to database.');
  });
  
  db.serialize(() => {
    db.each(`SELECT PlaylistId as id,
                    Name as name
             FROM playlists`, (err, row) => {
      if (err) {
        console.error(err.message);
      }
      console.log(row.id + "\t" + row.name);
    });
  });
  
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Close the database connection.');
  });