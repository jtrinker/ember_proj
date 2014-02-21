// Ember application object

var App = Ember.Application.create({
	LOG_TRANSITIONS: true,
	LOG_TRANSITIONS_INTERNAL: true
});

// Ember router

App.Router.map(function() {
	this.route('about', { path: '/aboutus' } );
	this.resource('products');
	this.resource('product', { path: '/products/:price' } );
});

// routes

App.ProductsRoute = Ember.Route.extend({
	model: function() {
		return App.PRODUCTS;
	}
});

App.ProductRoute = Ember.Route.extend({
	model: function(params) {
		console.log(params);
	}
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

// models

App.PRODUCTS =[
	{
		title: "flint",
		price: 99,
		description: "Flint is awesome.",
		isOnSale: true,
		image: "flint.png"
	},
	{
		title: "Kindling",
		price: 249,
		description: "Easily starts fires.",
		isOnSale: false,
		image: "kindling.png"
	}
];

