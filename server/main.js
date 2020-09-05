import { Meteor } from 'meteor/meteor';
import { Posts } from '../imports/posts.js';
import { HTTP } from 'meteor/http';
const { Storage } = require('@google-cloud/storage');

Accounts.onCreateUser((options, user) => {
  return Object.assign(user, options);
})

const storage = new Storage({
  keyFilename: "/Users/amanwadhwa/WebApps/politiciantest/server/key.json",
  projectId: "politicianconnector"});

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  newPost(user, heading, blog, rep, votes){
    var head = heading.replace(' ', "%20");
    var tag = HTTP.call('get', ('http://sidsrivastava.pythonanywhere.com/?string='+head)).content;
    // Posts.insert({
    //   username: user,
    //   heading: heading,
    //   body: blog,
    //   tag: tag,
    //   politician: rep,
    //   stars: votes
    // });
    return tag;
  },
  getLocalPolitician(address){
    var z = address.replace(" ", "%20")
    var x = HTTP.call('GET', 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address='+ address + '&levels=country&roles=legislatorLowerBody&key=AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM');
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
  },
  getGovernor(address){
    var z = address.replace(" ", "%20")
    var x = HTTP.call('GET', 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address='+ address + '&levels=administrativeArea1&roles=headOfGovernment&key=AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM');
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
  },
  getStatePolitician(address){
    var z = address.replace(" ", "%20")
    var x = HTTP.call('GET', 'https://civicinfo.googleapis.com/civicinfo/v2/representatives?address='+ address + '&levels=country&roles=legislatorUpperBody&key=AIzaSyDB5e9LPNi72wi_R7wqCw6VFmloaQZ0jmM');
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
  },
  async getVideo(politician, postHeader){
    const options = {
      version: 'v4',
      action: 'read',
      expires: Date.now() + 60 * 60 * 1000
    };
    const [url] = await storage.bucket(politician).file(postHeader).getSignedUrl(options);
    return url;
  },
  async uploadVideo(politician, postHeader, filepath){
    //check if politician's bucket is created
    var rep = politician.toLowerCase();
    rep.replace(" ", "-");
    const [buckets] = await storage.getBuckets();
    var contains = false;
    var array = []
    buckets.forEach(bucket => {
      if(bucket.name == rep){
        contains = true;
      }
      array.push(bucket.name);
    });
    if(!contains){
      await storage.createBucket(rep);
    }
    await storage.bucket(politician).upload(filepath, {
      resumable: false, //set to true when uploading videos
      gzip:true,
      destination:postHeader
    });
    return array;
    },
    async testingBuckets(){
      const [buckets] = await storage.getBuckets();
      var arr = [];
    buckets.forEach(bucket => {
      arr.push(bucket.name);
    });
    return arr;
    },
  async create(){
    await storage.createBucket('amanisannoying');
    return ('Complete');
  }
  
})
