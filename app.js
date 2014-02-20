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


