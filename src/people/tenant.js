var Person = require("./person.js");

function Tenant(name, contact) {
  // inherits name contact from Person
  // ...
  // tennant has 'array' of references
  // ...
  this.name = name;
  this.contact = contact;
  this.references = [];
};
Tenant.prototype = new Person;
Tenant.prototype.constructor = Tenant;

// Set prototype and constructor
// ...

Tenant.prototype.addReference = function(reference){
  // add reference to references. Reference must be of type Person
  // ...
  this.references.push(reference);
};

Tenant.prototype.removeReference = function(reference) {
  // remove reference from references.
  // ...
  this.references.splice(this.references.indexOf(reference), 1);
};

module.exports = Tenant;
