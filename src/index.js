const botmatic = require('@botmatic/js-integration')({port: 5050})

botmatic.onAction(".*", ({client, data}) => {
  console.log('RECEIVE ACTION')
  console.log(data)
  // return new Promise((resolve, reject) => {
    return updateBotmaticContactProperties(body.data.contact_id, body.action)
  // })
})

const updateBotmaticContactProperties = (contact_id, action) => {
  const prop = action.split("_");

  return new Promise((resolve, reject) => {
    if (prop.length == 2) {
      console.log('good format for action name')

      let dataToSend = {contact : {}};
      dataToSend.contact[prop[0]] = prop[1];

      var url = process.env.BOTMATIC_URL + 'api/contacts/'+contact_id;
      var headers = {
          'Authorization': 'Bearer ' + process.env.BOTMATIC_WORKSPACE_TOKEN
      };

      console.log('headers')
      console.log(headers)

      request.patch({ url: url, form: dataToSend, headers: headers }, function (e, r, body) {
        console.log("body)")
        console.log(body)

        console.log("e)")
        console.log(e)

        resolve({success: true, data: {}, type: "data"});
      });
    } else {
      console.log('reject, bad format for action name')
      reject({success: false, data: {error: "Property not found"}, type: "data"});
    }
  });
}
