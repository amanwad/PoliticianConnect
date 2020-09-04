import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('MainLayout', {main: "Home"});
    }
});


FlowRouter.route('/questions', {
    name: 'questions',
    action() {
        BlazeLayout.render('MainLayout', {main: "Questions"}); //template name
    }
});

FlowRouter.route('/answered', {
    name: 'answered',
    action() {
        BlazeLayout.render('MainLayout', {main: "Answered"});
    }
});

FlowRouter.route('/replies', {
    name: 'replies',
    action() {
        BlazeLayout.render('MainLayout', {main: "Replies"});
    }
});

FlowRouter.route('/ranks', {
    name: 'ranks',
    action() {
        BlazeLayout.render('MainLayout', {main: "Ranks"});
    }
});
