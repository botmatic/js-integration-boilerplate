const botmatic = require('@botmatic/js-integration')({
  auth: (token) => {
    return Promise.resolve({success: token=="azertyuiopqsdfghjklmwxcvbn"})
  }
})

// Tips: you can use regexp for action name.
botmatic.onAction(".*", ({client, data}) => {
  console.log('RECEIVE ACTION')
  return Promise.resolve({data: {action: data.action, type:"action"}});
})

botmatic.onEvent(".*", ({client, data}) => {
  console.log('RECEIVE EVENT')
  return Promise.resolve({data: "ok"});
})
