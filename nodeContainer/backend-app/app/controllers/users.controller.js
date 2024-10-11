const Users = require("../models/users.model.js");
const User = require("../models/users.model.js");
const http = require("https");

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

exports.getPackages = (req, res) => {
  User.getPackages((req.params), (err, data) => {
    // console.log(req.params);
    if (err) {
      if (err.kind === "not_found") {
        res.json({
          status: 2
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with ID " + req.params
        });
      }
    } else res.json( data );
  });
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

    var testJson = `{"meta":{"code":200},"data":{"page":1,"limit":100,"count":9,"keyword":"","slug":"","origin":[],"destination":[],"transit_time":[],"tag":"","order_id":"","fields":"","created_at_min":"2024-06-13T14:14:15+00:00","created_at_max":"2024-10-11T14:14:15+00:00","last_updated_at":null,"return_to_sender":[],"courier_destination_country_iso3":[],"trackings":[{"id":"78d42c2d4ef64feca086260a4edf6851","created_at":"2024-10-11T13:49:40+00:00","updated_at":"2024-10-11T13:49:42+00:00","last_updated_at":"2024-10-11T13:49:42+00:00","tracking_number":"020207021381215","slug":"fedex","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_004","subtag_message":"Wrong carrier","title":"020207021381215","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.fedex.com/apps/fedextrack/?tracknumbers=020207021381215&cntry_code=US","first_attempted_at":null,"courier_redirect_link":"https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=020207021381215&cntry_code=US","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"nirau3dfuqa8om24saz47006","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"ad31ffad607049a695e28ef8370a1c07","created_at":"2024-10-11T13:13:03+00:00","updated_at":"2024-10-11T13:13:04+00:00","last_updated_at":"2024-10-11T13:13:04+00:00","tracking_number":"039813852990618","slug":"fedex","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_004","subtag_message":"Wrong carrier","title":"039813852990618","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.fedex.com/apps/fedextrack/?tracknumbers=039813852990618&cntry_code=US","first_attempted_at":null,"courier_redirect_link":"https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=039813852990618&cntry_code=US","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"o2jiza2up2b2im24qzvjc028","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"9eb01414109840aa9c59a75aab57e0b5","created_at":"2024-10-10T22:06:02+00:00","updated_at":"2024-10-10T22:06:08+00:00","last_updated_at":"2024-10-10T22:06:08+00:00","tracking_number":"1Z12345E0205271688","slug":"ups","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"1Z12345E0205271688","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.ups.com/track?loc=en_US&tracknum=1Z12345E0205271688&requester=WT/trackdetails","first_attempted_at":null,"courier_redirect_link":"https://www.ups.com/track?loc=en_US&tracknum=1Z12345E0205271688&requester=WT/trackdetails","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"i7vs4v2up2b2im23ulfr900a","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"121269903ba746dbb0a7bea110ac429c","created_at":"2024-10-10T21:55:24+00:00","updated_at":"2024-10-10T21:55:26+00:00","last_updated_at":"2024-10-10T21:55:26+00:00","tracking_number":"231300687629630","slug":"fedex","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"231300687629630","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.fedex.com/apps/fedextrack/?tracknumbers=231300687629630&cntry_code=US","first_attempted_at":null,"courier_redirect_link":"https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=231300687629630&cntry_code=US","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"s0ct5xvdbpx7bm23u7rvl01d","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"8e23163a9c984c71b84d06ff15dc46f9","created_at":"2024-10-10T21:54:05+00:00","updated_at":"2024-10-10T21:54:06+00:00","last_updated_at":"2024-10-10T21:54:06+00:00","tracking_number":"122816215025810","slug":"fedex","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"122816215025810","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.fedex.com/apps/fedextrack/?tracknumbers=122816215025810&cntry_code=US","first_attempted_at":null,"courier_redirect_link":"https://www.fedex.com/apps/fedextrack/?action=track&tracknumbers=122816215025810&cntry_code=US","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"okla0z68i3vk4m23u636q01v","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"de1133a1e4734b8c9b39ce347ea0a892","created_at":"2024-10-10T19:24:08+00:00","updated_at":"2024-10-10T19:24:09+00:00","last_updated_at":"2024-10-10T19:24:09+00:00","tracking_number":"1111111111111111","slug":"canada-post","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"1111111111111111","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"http://www.canadapost.ca/cpotools/apps/track/personal/findByTrackNumber?trackingNumber=1111111111111111&LOCALE=en","first_attempted_at":null,"courier_redirect_link":"https://www.canadapost.ca/cpc/en/business/shipping/package-redirection.page?","order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"soqynyvdxaf1cm23ot919027","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"9aba3250e8434e0f8f2bcc971ed3ffce","created_at":"2024-10-10T19:22:50+00:00","updated_at":"2024-10-10T19:22:53+00:00","last_updated_at":"2024-10-10T19:22:53+00:00","tracking_number":"123456789","slug":"dhl","active":true,"custom_fields":{"product_name":"iPhone Case","product_price":"USD19.99"},"customer_name":null,"destination_country_iso3":"USA","courier_destination_country_iso3":null,"emails":["another_email@yourdomain.com","email@yourdomain.com"],"expected_delivery":null,"note":null,"order_id":"ID 1234","order_id_path":"http://www.aftership.com/order_id=1234","order_date":null,"origin_country_iso3":"CHN","shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":["+18555072501","+18555072509"],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"Title Name","tracked_count":1,"last_mile_tracking_supported":null,"language":"en","checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":"2019-05-20","delivery_type":"pickup_at_store","pickup_location":"Flagship Store","pickup_note":"Reach out to our staffs when you arrive our stores for shipment pickup","courier_tracking_link":"https://www.dhl.com/us-en/home/tracking/tracking-express.html?submit=1&tracking-id=123456789","first_attempted_at":null,"courier_redirect_link":"https://delivery.dhl.com/prg/on-demand-delivery.xhtml?ctrycode=US","order_tags":[],"order_number":"1234","aftership_estimated_delivery_date":null,"destination_raw_location":"13th Street, New York, NY, 10011, USA, United States","latest_estimated_delivery":{"type":"specific","source":"Order EDD","datetime":"2019-05-20","datetime_min":null,"datetime_max":null},"courier_connection_id":null,"first_estimated_delivery":{"type":"specific","source":"Order EDD","datetime":"2019-05-20","datetime_min":null,"datetime_max":null},"custom_estimated_delivery_date":null,"origin_state":"Beijing","origin_city":"Beijing","origin_postal_code":"065001","origin_raw_location":"Lihong Gardon 4A 2301, Chaoyang District, Beijing, BJ, 065001, CHN, China","destination_state":"New York","destination_city":"New York City","destination_postal_code":"10001","shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"kwose8zsdifpmm23orkvc002","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":"CHN","tracking_destination_country":"USA","tracking_key":null,"tracking_postal_code":"10001","tracking_ship_date":null,"tracking_state":"NewYork"},{"id":"736f6f0da45a44f3abe2b0b10a1db452","created_at":"2024-10-10T15:13:47+00:00","updated_at":"2024-10-10T15:13:49+00:00","last_updated_at":"2024-10-10T15:13:49+00:00","tracking_number":"123456789","slug":"aeronet","active":true,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":null,"note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":null,"shipment_delivery_date":null,"shipment_type":null,"signed_by":null,"smses":[],"source":"api","tag":"Pending","subtag":"Pending_001","subtag_message":"Pending","title":"123456789","tracked_count":1,"last_mile_tracking_supported":null,"language":null,"checkpoints":[],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.aeronet.com/#tracking","first_attempted_at":null,"courier_redirect_link":null,"order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":null,"latest_estimated_delivery":null,"courier_connection_id":null,"first_estimated_delivery":null,"custom_estimated_delivery_date":null,"origin_state":null,"origin_city":null,"origin_postal_code":null,"origin_raw_location":null,"destination_state":null,"destination_city":null,"destination_postal_code":null,"shipment_tags":[],"next_couriers":[],"transit_time":null,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":null,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"gu6en168i3vk4m23fvao602j","on_time_status":null,"on_time_difference":null,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null},{"id":"8d4e5b0de9c84939929c16668281d33e","created_at":"2024-10-10T14:17:29+00:00","updated_at":"2024-10-10T14:17:38+00:00","last_updated_at":"2024-10-10T14:17:38+00:00","tracking_number":"ITD-0-12345678","slug":"testing-courier","active":false,"custom_fields":null,"customer_name":null,"destination_country_iso3":null,"courier_destination_country_iso3":null,"emails":[],"expected_delivery":"2024-10-13T10:17:36-04:00","note":null,"order_id":null,"order_id_path":null,"order_date":null,"origin_country_iso3":null,"shipment_package_count":null,"shipment_pickup_date":"2024-10-10T10:17:34-04:00","shipment_delivery_date":"2024-10-10T10:17:36-04:00","shipment_type":null,"signed_by":null,"smses":[],"source":"web","tag":"Delivered","subtag":"Delivered_001","subtag_message":"Delivered","title":"ITD-0-12345678","tracked_count":4,"last_mile_tracking_supported":true,"language":null,"checkpoints":[{"slug":"testing-courier","city":"Lakewood","created_at":"2024-10-10T14:17:32+00:00","location":"1000 Testfield St, Lakewood, Colorado, 11111","country_name":null,"message":"Received a request from the shipper and is about to pick up the shipment","country_iso3":null,"tag":"InfoReceived","subtag":"InfoReceived_001","subtag_message":"Info Received","checkpoint_time":"2024-10-10T10:17:32-04:00","coordinate":null,"state":"Colorado","zip":"11111","raw_tag":"InfoReceived_001","events":[]},{"slug":"testing-courier","city":"Reedley","created_at":"2024-10-10T14:17:36+00:00","location":"1000 E Test Ave, Reedley, California, 11111","country_name":null,"message":"The shipment is on the way","country_iso3":null,"tag":"InTransit","subtag":"InTransit_001","subtag_message":"In Transit","checkpoint_time":"2024-10-10T10:17:34-04:00","coordinate":null,"state":"California","zip":"11111","raw_tag":"InTransit_001","events":[]},{"slug":"testing-courier","city":"Austin","created_at":"2024-10-10T14:17:38+00:00","location":"1000 W Test Ln, Austin, Texas, 11111","country_name":null,"message":"The shipment was delivered successfully","country_iso3":null,"tag":"Delivered","subtag":"Delivered_001","subtag_message":"Delivered","checkpoint_time":"2024-10-10T10:17:36-04:00","coordinate":null,"state":"Texas","zip":"11111","raw_tag":"Delivered_001","events":[]}],"subscribed_smses":[],"subscribed_emails":[],"return_to_sender":false,"order_promised_delivery_date":null,"delivery_type":null,"pickup_location":null,"pickup_note":null,"courier_tracking_link":"https://www.aftership.com/couriers","first_attempted_at":"2024-10-10T10:17:36-04:00","courier_redirect_link":null,"order_tags":[],"order_number":null,"aftership_estimated_delivery_date":null,"destination_raw_location":"1000 W Test Ln, Austin, Texas, 11111","latest_estimated_delivery":{"type":"specific","source":"Carrier EDD","datetime":"2024-10-13T10:17:36-04:00","datetime_min":null,"datetime_max":null},"courier_connection_id":null,"first_estimated_delivery":{"type":"specific","source":"Carrier EDD","datetime":"2024-10-11T10:17:32-04:00","datetime_min":null,"datetime_max":null},"custom_estimated_delivery_date":null,"origin_state":"California","origin_city":"Reedley","origin_postal_code":"11111","origin_raw_location":"1000 E Test Ave, Reedley, California, 11111","destination_state":"Texas","destination_city":"Austin","destination_postal_code":"11111","shipment_tags":[],"next_couriers":[],"transit_time":0,"carbon_emissions":null,"shipping_method":null,"location_id":null,"failed_delivery_attempts":0,"signature_requirement":null,"shipment_weight":null,"delivery_location_type":null,"legacy_id":"l0okthj5f7qu5m23duw7h021","on_time_status":"early","on_time_difference":-1,"tracking_account_number":null,"tracking_origin_country":null,"tracking_destination_country":null,"tracking_key":null,"tracking_postal_code":null,"tracking_ship_date":null,"tracking_state":null}]}}`
  
  //   res.on("end", function () {
  //     const body = Buffer.concat(chunks);
  //     console.log(body.toString());
  //   });
  // });
  console.log(req.params.trackingNumber)
  var jsonObject = JSON.parse(testJson).data.trackings
  for (i=0; i<jsonObject.length; i++) {
    if(jsonObject[i].tracking_number == (req.params.trackingNumber)) {
      console.log(jsonObject[i].slug)
      res.json({ slug: jsonObject[i].slug });
    }
    // console.log(jsonObject[i].tracking_number)
  }
  // console.log(jsonObject)
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