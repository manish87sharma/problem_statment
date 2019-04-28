//'use strict';


const constants = require('./constants');
var request = require('request');

class restQuery {

   constructor() {
      this.baseUrl = "https://reqres.in/api/users"
     // this.baseUrl = "https://medium.com/@aitchkhan/downloading-csv-files-from-express-server-7a3beb3ae52c233"
   }

   getUrl(page = 1) {
      return `${this.baseUrl}?page=${page}`;
   };

   exceuteGetData(pageNumber) {
      return new Promise((resolve, reject) => {
         request(this.getUrl(pageNumber), function (error, response, body) {
            if (error) {
               console.log('error:', error);
               reject(error);
            }
            else if (response.statusCode === 200) {
               let parsedData = JSON.parse(response.body);
               resolve(parsedData)
            }
            else if (response.statusCode === 404) {
               reject("Service unavailable");
            }
            else {
               console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
               console.log('body:', body);
               reject("Unknown Error");
            }
         });
      })

   }

}

module.exports = restQuery;

