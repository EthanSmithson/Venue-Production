const sql = require("./db.js");

// constructor
const Users = function(user) {
  this.userId;
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.phoneNumber = user.phoneNumber;
  this.password = user.password;
  this.confirmed = 0;
};

Users.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

Users.findByEmail = (email, result) => {
  sql.query(`SELECT email FROM Users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.loginUser = (user, result) => {
  sql.query(`SELECT * FROM Users WHERE email = '${user.email}' AND password = '${user.password}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.isConfirmed = (user, result) => {
  sql.query(`SELECT * FROM Users WHERE email = '${user.email}' AND confirmed = 1`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.emailConfirm = (user, result) => {
  sql.query(`UPDATE Users SET confirmed = 1 WHERE email = '${user.email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Users.changePassword = (data, result) => {
  sql.query(`UPDATE Users SET password = '${data.myNewPassword}' WHERE email = '${data.myEmail}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res[0]);
      return;
    }
  });
};

Users.addPackage = (data, result) => {
  sql.query(`INSERT INTO Events (carrier, trackingNumber, userId, title) VALUES ('${data.slug}', ${data.trackingNumber}, ${data.userId}, '${data.title}')`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res[0]);
      return;
    }
  });
};

Users.removePackage = (data, result) => {
  sql.query(`DELETE FROM Events WHERE trackingNumber = ${data.trackingNumber}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res[0]);
      return;
    }
  });
};

Users.findId = (data, result) => {
  sql.query(`SELECT userId FROM Users WHERE email = '${data.myCookie}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res[0]);
      return;
    }
  });
};

Users.getMe = (data, result) => {
  sql.query(`SELECT firstName FROM Users WHERE email = '${data.myCookie}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res[0]);
      return;
    }
  });
};

Users.getEvents = (data, result) => {
  sql.query(`SELECT * FROM Events WHERE userId = '${data.myCookie}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {
      result(null, res);
      return;
    }
  });
};

module.exports = Users;