var express = require('express');
var app = express();
const path = require('path')

// Used for integration settings page.
const fs = require('fs');
const Mustache = require('mustache')
const tplFieldsBuf = fs.readFileSync(__dirname + '/../views/fields.html');
const tplFieldsStr = tplFieldsBuf.toString('utf8')

require('dotenv').config({
  path: path.join(__dirname, '/../.env')
})

const botmatic = require('@botmatic/js-integration')({
  server: app,
  auth: (token) => {
    return new Promise((resolve, reject) => {
      // Retrieve the client in your database, or other.
      const client_authenticated = {id: "client_id"}
      // If the client is known
      resolve(client_authenticated)
      // if not
      // reject();
    })
  }
})

// Tips: you can use regexp for action name.
botmatic.onAction(".*", ({client, data}) => {
  return Promise.resolve({data: {action: data.action, type:"action"}});
})

// Tips: you can use regexp for event name.
botmatic.onEvent(botmatic.events.CONTACT_UPDATED, function({client, data}) {
  return new Promise((resolve, reject) => {
    resolve({data: "ok", type: "data"});
  })
})

/**
 * Settings form integration page.
 */
botmatic.onSettingsPage("/settingspath", (token) => {
  return new Promise(async (resolve) => {
    const myObject = {api_key: "my api key"}

    // Construct the html template to return.
    // The second parameter is an object with:
    // - name: name value of html input tag.
    // - value: value when form is in modification.
    let tpl = Mustache.render(tplFieldsStr, {name: "api_key", value: myObject.api_key});
    resolve(tpl)
  })
})

/**
 * When Botmatic integration form is submitted, update datastore with client.
 * @param  {String} token Botmatic integration token
 * @param  {Object} data  Content the event
 * @return {Promise} Always resolvev promise, with success= true or false
 */
botmatic.onUpdateSettings('/settingspath', function(token, data) {
  return new Promise(async (resolve) => {
    // Check if API key is given.
    if (data.api_key) {
      // Store value somewhere.
      resolve({success: true})
    } else {
      console.error('ERROR:', "API key is required.");
      resolve({
        success: false,
        errorFields: {
          api_key: "Field required"
        }
      })
    }
  })
})

var listener = app.listen(process.env.BOTMATIC_PORT, () => console.log(`App listening on port ${listener.address().port}!`))
