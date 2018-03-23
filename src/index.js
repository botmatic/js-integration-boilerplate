const botmatic = require('@botmatic/js-integration')({port: 5050})
const request = require('request')
const path = require('path')

require('dotenv').config({
  path: process.env.DEV ? path.join(__dirname, '/../.env-dev') : path.join(__dirname, '/../.env')
})

botmatic.onAction(".*", ({auth, data}) => {
  return updateBotmaticContactProperties(data.data.contact_id, data.action, auth.token)
})

const updateBotmaticContactProperties = (contact_id, action, token) => {
  const prop = action.split("_");

  return new Promise((resolve, reject) => {
    try {
      if (prop.length == 2) {
        let dataToSend = {contact : {}};
        dataToSend.contact[prop[0]] = prop[1];

        var url = process.env.BOTMATIC_BASE_URL + 'api/contacts/'+contact_id;
        var headers = {
            'Authorization': 'Bearer ' + token
        };

        request.patch({ url: url, form: dataToSend, headers: headers }, function (e, r, body) {
          resolve({success: true, data: {}, type: "data"});
        });
      } else {
        reject({success: false, data: {error: "Property not found"}, type: "data"});
      }
    } catch(e) {
      console.log('ERROR')
      console.log(e)
    }
  });
}

process.on('unhandledRejection', (e) => {
  console.log('ERROR')
  console.log(e)
})
