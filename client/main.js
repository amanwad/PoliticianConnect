import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import './main.html';

Meteor.call('alternate', 
(err, res) =>
{
  console.log('running');
  
  console.log(res);

});

Template.body.events({
  'click .sign-out'(event) {
      console.log("Pressed Logout!");
      AccountsTemplates.logout();
  }
})

// User accounts documentation: https://github.com/meteor-useraccounts/core/blob/master/Guide.md#form-fields-configuration
AccountsTemplates.addField({
  _id: "home_address",
  type: "text",
  placeholder: "Home Address",
  displayName: "Home Address",
  required: true,
});

//var x = fetch('https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=416%20Vanderveer%20Road%20Bridgewater%20NJ%2008807&levels=country&roles=legislatorLowerBody&key=AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM');
//console.log(x);