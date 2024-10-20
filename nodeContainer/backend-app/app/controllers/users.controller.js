const Users = require("../models/users.model.js");
const User = require("../models/users.model.js");
const http = require("https");
const geohash = require('ngeohash');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a User
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: req.body.password,
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.json({status: 1});
    });
};

// Retrieve all User from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single User with a email
exports.findOne = (req, res) => {
    User.findByEmail(req.params.email, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.json({
              status: 2
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with email " + req.params.email
            });
          }
        } else res.json({ status: 1, message: "This User Exists!" });
      });
};

exports.loginUser = (req, res) => {
  User.loginUser((req.params), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.json({
          status: 2
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params.email
        });
      }
    } else res.json({ status: 1, message: "This User Exists!" });
  });
}

exports.confirmed = (req, res) => {
  User.isConfirmed((req.params), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.json({
          status: 2
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params.email
        });
      }
    } else res.json({ status: 1, message: "This User is Confirmed!" });
  });
}

exports.emailConfirmed = (req, res) => {
  User.emailConfirm((req.params), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        var path = require('path');
        res.sendFile(path.resolve('../../nodeContainer/backend-app/emailTemplates/confirmedEmailMessage.html'));
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params.email
        });
      }
    } else res.json({ status: 1, message: "This User is Confirmed!" });
  });
}

exports.changePassword = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  if (req.body.myNewPassword != req.body.reMyNewPassword) {
    res.status(400).send({
      message: 3
    })
    return
  }

  // console.log(req.body);

  Users.changePassword((req.body), (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else res.json({status: 1});
  });
}

exports.createPackage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Users.addPackage((req.body), (err, data) => {
    if ( err && err.errno == 1062) {
      res.json({dupe: 1});
    } else if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else res.json({status: 1});
  });
}

exports.removePackage = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // console.log(req.body);

  Users.removePackage((req.body), (err, data) => {
    if ( err && err.errno == 1062) {
      res.json({dupe: 1});
    } else if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred."
      });
    else res.json({status: 1});
  });
}

exports.findId = (req, res) => {
  User.findId((req.params), (err, data) => {
    // console.log(req.params);
    if (err) {
      if (err.kind === "not_found") {
        res.json({
          status: 2
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params
        });
      }
    } else res.json( data );
  });
}

exports.getVenues = (req, res) => {
  // console.log(req.body.geoHash)
  http.get(`https://app.ticketmaster.com/discovery/v2/venues.json?radius=50&geoPoint=${req.body.geoHash}&size=10&apikey=AQnz8QPEolgr7ZyJ3W1qxNLwh46uf1GK`, resp => {
    let data = ''
    resp.on('data', chunk => {
        data += chunk
    })
    resp.on('end', () => {
        let eventData = JSON.parse(data)
        let events = eventData._embedded;
        let eventsList = events.venues
        console.log(eventsList.length);
        return res.json({"nearbyVenues": eventsList});
    })
})
.on('error', err => {
    console.log("Error: ", err.message)
})
}

exports.trackPackages = (req, res) => {
  const options = {
    "method": "GET",
    "hostname": "api.aftership.com",
    "port": null,
    "path": "/tracking/2024-07/trackings",
    "headers": {
      "Content-Type": "application/json",
      "as-api-key": "asat_b805cdf94e3d40e495af7fe45cc51227"
    }
  };
  
  const request = http.request(options, function (res) {
    const chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  request.write(JSON.stringify({
    order_id: '736f6f0da45a44f3abe2b0b10a1db452',
  }));
  
  request.end();
}

exports.createTracking = (req, res) => {
  const options = {
    "method": "POST",
    "hostname": "api.aftership.com",
    "port": null,
    "path": "/tracking/2024-07/trackings",
    "headers": {
      "Content-Type": "application/json",
      "as-api-key": "asat_b805cdf94e3d40e495af7fe45cc51227"
    }
  };
  
  const request = http.request(options, function (res) {
    const chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });
  
  request.write(JSON.stringify({
    tracking_number: '123456789',
  }));
  request.end();
}

exports.getSlug = (req, res) => {
  const options = {
    "method": "GET",
    "hostname": "api.aftership.com",
    "port": null,
    "path": "/tracking/2024-07/trackings",
    "headers": {
      "Content-Type": "application/json",
      "as-api-key": "asat_b805cdf94e3d40e495af7fe45cc51227"
    }
  };
  
  // const request = http.request(options, function (res) {
  //   const chunks = [];
  
  //   res.on("data", function (chunk) {
  //     chunks.push(chunk);
  //   });

  //   res.on("end", function () {
  //     const body = Buffer.concat(chunks);
  //     console.log(body.toString());
  //   });
  // });

  // request.write(JSON.stringify({
  //   order_id: req.params.trackingNumber,
  // }));
  
  // request.end();
}

exports.getMe = (req, res) => {
  User.getMe((req.params), (err, data) => {
    // console.log(req.params);
    if (err) {
      if (err.kind === "not_found") {
        res.json({
          status: 2
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with email " + req.params
        });
      }
    } else res.json( data );
  });
}

exports.geoHashing = (req, res) => {
  console.log(req.body);
  const hash = geohash.encode(req.body.lat, req.body.lng, 9); // Encode coordinates
  console.log(hash); 

  const { latitude, longitude } = geohash.decode(hash); // Decode geohash
  console.log(latitude, longitude); 

  res.json({"geoHash": hash});
}

exports.getMyVenuesEvents = (req, res) => {
  console.log(req.body)
  http.get(`https://app.ticketmaster.com/discovery/v2/events.json?venueId=${req.body.venueId}&size=5&apikey=AQnz8QPEolgr7ZyJ3W1qxNLwh46uf1GK&segmentId=KZFzniwnSyZfZ7v7nJ`, resp => {
    let data = ''
    resp.on('data', chunk => {
        data += chunk
    })
    resp.on('end', () => {
        let eventData = JSON.parse(data)
        let events = eventData._embedded;
        // let eventsList = events.venues
        console.log(events);
        // return res.json({"nearbyVenues": eventsList});
    })
})
.on('error', err => {
    console.log("Error: ", err.message)
})
}