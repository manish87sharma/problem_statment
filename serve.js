var restQuery = require('./common/restQuery');
var jsoncsv = require('json-csv');

class serve extends restQuery {
   constructor() {
      super();
   }

   async convertToCsv(jsonData) {
      return new Promise((resolve, reject) => {
         let data = jsoncsv.csvBuffered(jsonData, {
               fields: [
                  {
                     name: 'id',
                     label: 'id'
                  },
                  {
                     name: 'first_name',
                     label: 'first_name'
                  },
                  {
                     name: 'last_name',
                     label: 'last_name'
                  },
                  {
                     name: 'avatar',
                     label: 'avatar'
                  }
               ]
            },
            function (err, csv) {
               if (err) {
                  resolve(err);
               }
                console.log(csv);
               resolve(csv)
            });
      });
   }

   executeRequest(req) {
      let query = require('url').parse(req.url, true).query;
      let pageNumber = (query["page"] && query["page"].replace(/[{}]/g, "")) || 1;
      let convertToNumber = +pageNumber;
      return new Promise((resolve, reject) => {
         if (Number.isInteger(convertToNumber)) {
            this.exceuteGetData(pageNumber).then((jsonData) => {
               console.log("Third party apid data",jsonData);
               this.convertToCsv(jsonData["data"]).then((csv) => {
                  resolve(csv);
               }).catch((err) => {
                  console.error("error during preparing csv data", err);
                  reject(err);
               })
            }).catch((err) => {
               console.error("error occured", err);
               reject(err);

            })
         } else {
            reject("invalid page Number");
         }
      })
   }

}

module.exports = serve;


