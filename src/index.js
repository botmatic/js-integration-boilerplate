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
      let dataToSend = {contact : {}};
      dataToSend.contact[prop[0]] = prop[1];

      var url = process.env.BOTMATIC_URL + 'api/contacts/'+contact_id;
      var headers = {
          'Authorization': 'Bearer ' + process.env.BOTMATIC_WORKSPACE_TOKEN
      };

      request.patch({ url: url, form: dataToSend, headers: headers }, function (e, r, body) {
        console.log("body)")
        console.log(body)
        resolve({success: true, data: {}, type: "data"});
      });
    } else {
      reject({success: false, data: {error: "Property not found"}, type: "data"});
    }
  });
}
