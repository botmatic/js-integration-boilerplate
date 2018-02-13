const botmatic = require('@botmatic/js-integration')()

// Tips: you can use regexp for action name.
botmatic.onAction(".*", ({client, data}) => {
  return Promise.resolve({data: {action: data.action, type:"action"}});
})

modules.export = botmatic
