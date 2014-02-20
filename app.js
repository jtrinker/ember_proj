// Ember application object

var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

// Ember router

App.Router.map(function() {
	this.route('about');
});


