const sql = require("./database.js");

// constructor
class Note {
  constructor(note) {
    this.title = note.title;
    this.content = note.content;
    this.created = note.created;
    this.modified = note.modified;
  }
  static create(newNote, result) {
    sql.query("INSERT INTO notes SET ?", newNote, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created note: ", { id: res.insertId, ...newNote });
      result(null, { id: res.insertId, ...newNote });
    });
  }
  static findById(id, result) {
    sql.query(`SELECT * FROM notes WHERE id = ${id}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found note: ", res[0]);
        result(null, res[0]);
        return;
      }

      // not found note with the id
      result({ kind: "not_found" }, null);
    });
  }
  static getAll(title, result) {
    let query = "SELECT * FROM notes";

    //   if (title) {
    //     query += ` WHERE title LIKE '%${title}%'`;
    //   }
    sql.query(query, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("notes: ", res);
      result(null, res);
    });
  }
  // note.getAllPublished = result => {
  //   sql.query("SELECT * FROM notes WHERE published=true", (err, res) => {
  //     if (err) {
  //       console.log("error: ", err);
  //       result(null, err);
  //       return;
  //     }
  //     console.log("notes: ", res);
  //     result(null, res);
  //   });
  // };
  static updateById(id, note, result) {
    sql.query(
      "UPDATE notes SET title = ?, content = ?, created = ?, modified = ? WHERE id = ?",
      [note.title, note.content, note.created, note.modified, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          // not found note with the id
          result({ kind: "not_found" }, null);
          return;
        }

        console.log("updated note: ", { id: id, ...note });
        result(null, { id: id, ...note });
      }
    );
  }
  static remove(id, result) {
    sql.query("DELETE FROM notes WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found note with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("deleted note with id: ", id);
      result(null, res);
    });
  }
}

// note.removeAll = result => {
//   sql.query("DELETE FROM notes", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} notes`);
//     result(null, res);
//   });
// };

module.exports = Note;
