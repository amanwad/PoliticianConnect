import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import './main.html';
import './constants.html';
import './questions.html';

Template.filterButton.events({

    "click .dropdown-menu": function(event) {
        event.preventDefault();
        x = event.target.text;
        console.log(x);
        console.log("a");
    }

});