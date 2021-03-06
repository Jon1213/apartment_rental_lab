"use strict"

function Building(address) {
  // building has an address
  // ...
  // and array of units
  // ...
  this.address = address;
  this.units = [];
}
Building.prototype.manager = null;


Building.prototype.setManager = function(person) {
  // set this.manager to person. Person needs to be of type Manager.
  //
  // we can't use `instanceof` here because requiring the Manager
  // class in this file would create a circular dependency. therefore,
  // we're giving you this `if` statement for free.  in most other
  // cases you can use `instanceof` to check the class of something.
  if (person.constructor.name === "Manager") {
    // ...
    Building.prototype.manager = person;
  }
};

Building.prototype.getManager = function(){
  // return this.manager 
  // ..
  if(this.manager !== null){
    return this.manager;
  }
};

Building.prototype.addTenant = function(unit, tenant) {
  // add tenant but check to make sure there
  // is a manager first and a tenant has 2 references
  // Note that tenenat does not belong to Building, but to Unit
  // ...
  if( (this.manager !== null) && (tenant.references.length > 1) && (this.units.indexOf(unit) > -1) && unit.tenant === null){
    unit.tenant = tenant;
  }
};

Building.prototype.removeTenant = function(unit, tenant) {
  // remove tenant
  // ...
  if((this.manager !== null) && (this.units.indexOf(unit) > -1) && (unit.tennant !== null) && unit.tenant === tenant){
    unit.tenant = null;
  }
};

Building.prototype.availableUnits = function(){
  // return units available
  // ...
  var ret = [];
  for (var i = 0; i < this.units.length; i++){
    if(this.units[i].tenant === null){
      ret.push(this.units[i]);
    }
  }
  return ret;
};

Building.prototype.rentedUnits = function(){
  // return rented units
  // ...
  var ret = [];
  for (var i = 0; i < this.units.length; i++){
    if(this.units[i].tenant !== null){
      ret.push(this.units[i]);
    }
  }
  return ret;
};

module.exports = Building;
