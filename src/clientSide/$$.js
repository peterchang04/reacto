module.exports = {};
// form and validation
Object.assign(module.exports,require('./form.js'));
Object.assign(module.exports,require('./modal.js'));
Object.assign(module.exports,{$:require('jquery')});
Object.assign(module.exports,{Request:require('../../src/core/httpRequest')});