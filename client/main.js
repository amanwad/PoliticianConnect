import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

import './main.html';

// Meteor.call('uploadVideo', "amanisannoying", "testing.jpeg", '/Users/amanwadhwa/Downloads/image0.jpeg',
// (err, res) =>
// {
//   console.log('running');
  
//   console.log(res);

// });
Session.set("x", "Loading...");
x = Meteor.call('getStatePolitician', '416 Vanderveer Road Bridgewater NJ 08807', (err, res) => {
    Session.set("x", res);
})

Template.body.helpers({
    test: function() {
        return Session.get("x");
    }
});

