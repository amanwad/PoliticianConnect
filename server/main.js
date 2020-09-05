import { Meteor } from 'meteor/meteor';
import { Posts } from '../imports/posts.js';
import { HTTP } from 'meteor/http';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser((options, user) => {
  return Object.assign(user, options);
});

Meteor.methods({
  loadClient() {
    gapi.client.setApiKey("AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM");
    return gapi.client.load("https://civicinfo.googleapis.com/$discovery/rest?version=v2");
  },
  getSenators(address) {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": address,
      "levels": [
        "country"
      ],
      "roles": [
        "legislatorUpperBody"
      ],
      "prettyPrint": true
    });
  },
  getDistrictRep(address) {
    return gapi.client.civicinfo.representatives.representativeInfoByAddress({
      "address": address,
      "levels": [
        "country"
      ],
      "roles": [
        "legislatorLowerBody"
      ],
      "prettyPrint": true
    });
  },
  newPost(user, blog, level, rep){
    Posts.insert({
      username: user,
      content: blog,
      level: level,
      representative: rep
    });
  },
  alternate(){
    var x = HTTP.call('GET', 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=416%20Vanderveer%20Road%20Bridgewater%20NJ%2008807&levels=country&roles=legislatorLowerBody&key=AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM');
    var y = x.data['officials'];
    var arr = [];

    for(var a=0; a<y.length; a++){
      var z = [];
      z.push(y[a]['name']);
      z.push(y[a]['party']);
      z.push(y[a]['urls'][0]);
      arr.push(z);
    }
    
    
    return arr;
  }
})