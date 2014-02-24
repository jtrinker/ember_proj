// Ember application object

App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

// Ember router

App.Router.map(function() {
	this.route('about', { path: '/aboutus' } );
	this.resource('products', function() {
		this.resource('product', { path: '/:product_id' } );
	});
});

// routes

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('product', params.product_id);
	}
});


// controllers

App.IndexController = Ember.Controller.extend({
	productsCount: 6,
	logo: 'images/logo.png',
	time: function() {
		return (new Date()).toDateString();
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

// models

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// Product Class
App.Product = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	price: DS.attr('number'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string')
});

// Product Instances
App.Product.FIXTURES = [
	{
		id: 1,
		title: "flint",
		price: 99,
		description: "Flint is awesome.",
		isOnSale: true,
		image: "flint.png"
	},
	{
		id: 2,
		title: "Kindling",
		price: 249,
		description: "Easily starts fires.",
		isOnSale: false,
		image: "kindling.png"
	}
];


