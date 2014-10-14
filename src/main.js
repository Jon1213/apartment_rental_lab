"use strict"
var menu = require('node-menu');
var app = require('./app.js');

var building = new app.Building("Waterfront Tower");
var people = [];

var add = function(a,b){
      return a + b;
};

// --------------------------------
menu.addDelimiter('-', 40, building.address + " rental app");

menu.addItem('Add manager', 
  function(name, contact) {
    var aManager = new app.Manager(name, contact);
    aManager.addBuilding(building);
    building.setManager(aManager);
    people.push(new app.Manager(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Add tenant', 
  function(name, contact) {
    people.push(new app.Tenant(name, contact));
  },
  null, 
  [{'name': 'name', 'type': 'string'}, {'name': 'contact', 'type': 'string'}]
);

menu.addItem('Show tenants:', 
  function() {
    for (var i = 0; i <= people.length; i++) {
      if (people[i] instanceof app.Tenant){
        console.log("\n" + people[i].name + " " + people[i].contact);
        var references = people[i].references;
        if(!references) {continue;}
        for (var j = references.length - 1; j >= 0; j--) {
          console.log("-> Reference: " + references[j].name + " " + references[j].contact);
        };
      }
    }
  }
);

menu.addItem('Add unit', 
  function(number, sqft, rent) {
    var aUnit = new app.Unit(number, building, sqft, rent);
    building.units.push(aUnit);
  },
  null, 
  [{'name': 'number', 'type': 'string'},
    {'name': 'sqft', 'type': 'numeric'}, 
    {'name': 'rent', 'type': 'numeric'}]
);

menu.addItem('Show all units', 
  function() {
    for(var i = building.units.length - 1; i >= 0; i--) {
      console.log(" tenant: " + building.units[i].tenant +
      			  " num: " + building.units[i].number + 
                  " sqft: " + building.units[i].sqft +
                  " rent: $" + building.units[i].rent);
    }
  }  
);

menu.addItem('Show available units', 
  function() {
      var available = building.availableUnits();
      for(var i = available.length - 1; i >= 0; i--) {
      console.log(" tenant: " + available[i].tenant +
              " num: " + available[i].number + 
                  " sqft: " + available[i].sqft +
                  " rent: $" + available[i].rent);
      }
    } 
);

menu.addItem('Add tenant reference', 
  function(tenant_name, ref_name, ref_contact) {
      var is_tenant = false;
      var tenant;
      for(var i = 0; i < people.length; i++){
        if(people[i].name === tenant_name && people[i] instanceof app.Tenant){
          is_tenant = true;
          tenant = people[i];
        }
      }
      if(!is_tenant){
        console.log("Error: this is not a tenant");return null;
      }
      var newRef = new app.Person(ref_name, ref_contact);
      tenant.references.push(newRef);
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'},
    {'name': 'ref_name', 'type': 'string'},
    {'name': 'ref_contact', 'type': 'string'}] 
);

menu.addItem('Move tenant in unit', 
  function(unit_number, tenant_name) {
      // find tenant and unit objects, use building's addTenant() function.
      var new_tenant = null;
      var unit = null;
      for(var i = 0; i < people.length; i++){
        if(people[i].name === tenant_name && people[i] instanceof app.Tenant){
          new_tenant = people[i];
        }
      }
      for(var j = 0; j < building.units.length; j++){
        if(building.units[i].name === unit_number && building.units[i] instanceof app.Unit){
          unit = building.units[i];
        }
      }
      if(unit === null){
        console.log("Error: unit does not exist");
        return null;
      }
      if(new_tenant === null){
        console.log("Error: new_tenant is not a tenant");
        return null;
      }
      building.addTenant(unit, new_tenant);

    },
    null, 
    [{'name': 'unit_number', 'type': 'string'},
    {'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Evict tenant', 
  function(tenant_name) {
      // Similar to above, use building's removeTenant() function.
      var tenant = null;
      var unit = null;
      for(var i = 0; i < people.length; i++){
        if(people[i].name === tenant_name && people[i] instanceof app.Tenant){
          tenant = people[i];
        }
      }
      for(var j = 0; j < building.units.length; j++){
        if(building.units[i].tenant === tenant && building.units[i] instanceof app.Unit){
          unit = building.units[i];
        }
      }
      building.removeTenant(unit, tenant);
    },
    null, 
    [{'name': 'tenant_name', 'type': 'string'}] 
);

menu.addItem('Show total sqft rented', 
  function() {
    
    var rented_units = building.availableUnits();
    var ret = [];
    for(var i = 0; i < rented_units.length; i++){
      ret.push(rented_units[i].sqft);
    }
    ret.reduce(add);

    return ret;
  } 
);

menu.addItem('Show total yearly income', 
  function() {
      // Note: only rented units produce income
      var rented_units = building.availableUnits();
      var ret = [];
      for(var i = 0; i < rented_units.length; i++){
        ret.push(rented_units[i].sqft);
      }
      ret.reduce(add);

      return ret;
  } 
);

menu.addItem('(Add your own feature ...)', 
  function() {
      console.log("Implement a feature that you find is useful");
    } 
);

// *******************************
menu.addDelimiter('*', 40);

menu.start();