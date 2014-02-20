// Ember application object

var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

// Ember router

App.Router.map(function() {
	this.route('about', { path: '/aboutus' } );
});

// controllers

App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'images/logo.png',
	time: function() {
		return (new Date()).toDateString()
	}.property()
});

App.AboutController = Ember.Controller.extend({
  contactName: "Jamie",
  avatar: 'images/avatar.png',
  open: function() {
    if ((new Date()).getDay() === 0) {
      return "Sorry, we're closed";
    }else{
      return "We're open!";
    }
  }.property()
});

