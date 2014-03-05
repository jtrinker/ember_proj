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
		this.route('onsale');
	});
});

// routes

App.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.findAll('product');
	}
});

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

App.ProductsOnsaleRoute = Ember.Route.extend({
	model: function() {
		return this.modelFor('products').filterBy('isOnSale');
	}
});


// controllers

App.IndexController = Ember.ArrayController.extend({
	productsCount: Ember.computed.alias('length'),
	logo: 'images/logo.png',
	time: function() {
		return (new Date()).toDateString();
	}.property(),
	onSale: function() {
		return this.filterBy('isOnSale').slice(0, 3);
	}.property('@each.isOnSale')
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

App.ProductsController = Ember.ArrayController.extend({
	sortProperties: ['title']
});

App.ProductController = Ember.ObjectController.extend({
  text: '',
  actions: {
    createReview: function () {
      var review = this.store.createRecord('review', {
        text: this.get('text'),
        product: this.get('model'),
        reviewedAt: new Date()
      });
      var controller = this;
      review.save().then(function(review) {
        controller.set('text', ''),
        controller.get('model.reviews').addObject(review)
      });
    }
  }
});

App.ReviewsController = Ember.ArrayController.extend({
  sortProperties: ['reviewedAt'],
  sortAscending: false
});

// components

App.ProductDetailsComponent = Ember.Component.extend({
	reviewsCount: Ember.computed.alias('product.reviews.length'),
	hasReviews: function() {
		return this.get('reviewsCount') > 0;
	}.property('reviewsCount')
});

// models

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// Product Class
App.Product = DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	price: DS.attr('number'),
	isOnSale: DS.attr('boolean'),
	image: DS.attr('string'),
	reviews: DS.hasMany('review', {async: true})
});

App.Review = DS.Model.extend({
	text: DS.attr('string'),
	reviewedAt: DS.attr('date'),
	product: DS.belongsTo('product')
});

// Product Instances
App.Product.FIXTURES = [
	{
		id: 1,
		title: "Flint",
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
		image: "kindling.png",
		reviews: [1,2]
	},
	{
		id: 3,
		title: "Sparky",
		price: 99,
		description: "Sparky is awesome.",
		isOnSale: true,
		image: "flint.png"
	},
	{
		id: 4,
		title: "Wood",
		price: 99,
		description: "Wood is awesome.",
		isOnSale: true,
		image: "flint.png"
	},
	{
		id: 5,
		title: "Matches",
		price: 99,
		description: "Matches burn.",
		isOnSale: true,
		image: "flint.png"
	},
];

App.Review.FIXTURES = [
	{
		id: 1,
		product: 2,
		text: "Awesome!"
	},
	{
		id: 2,
		product: 2,
		text: "Terrible!"
	}
]


