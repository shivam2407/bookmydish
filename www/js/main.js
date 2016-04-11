/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2015, Codrops
 * http://www.codrops.com
 */
;(function(window) {

	'use strict';
	var global_data=" ";
	var support = { animations : Modernizr.cssanimations },
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
		onEndAnimation = function( el, callback ) {
			var onEndCallbackFn = function( ev ) {
				if( support.animations ) {
					if( ev.target != this ) return;
					this.removeEventListener( animEndEventName, onEndCallbackFn );
				}
				if( callback && typeof callback === 'function' ) { callback.call(); }
			};
			if( support.animations ) {
				el.addEventListener( animEndEventName, onEndCallbackFn );
			}
			else {
				onEndCallbackFn();
			}
		};


	// from http://www.sberry.me/articles/javascript-event-throttling-debouncing
	function throttle(fn, delay) {
		var allowSample = true;

		return function(e) {
			if (allowSample) {
				allowSample = false;
				setTimeout(function() { allowSample = true; }, delay);
				fn(e);
			}
		};
	}

	// sliders - flickity
	var sliders = [].slice.call(document.querySelectorAll('.slider')),
		// array where the flickity instances are going to be stored
		flkties = [],
		// grid element
		grid = document.querySelector('.grid'),
		// isotope instance
		iso,
		// filter ctrls
		filterCtrls = [].slice.call(document.querySelectorAll('.filter > button')),
		// cart
		cart = document.querySelector('.cart'),
		cartItems = cart.querySelector('.cart__count');

	
	function init() {
		// preload images
		imagesLoaded(grid, function() {
			initFlickity();
			initIsotope();
			initEvents();
			classie.remove(grid, 'grid--loading');
		});
	}

	function initFlickity() {
		sliders.forEach(function(slider){
			var flkty = new Flickity(slider, {
				prevNextButtons: false,
				wrapAround: true,
				cellAlign: 'left',
				contain: true,
				resize: false
			});

			// store flickity instances
			flkties.push(flkty);
		});
	}

	function initIsotope() {
		iso = new Isotope( grid, {
			isResizeBound: false,
			itemSelector: '.grid__item',
			percentPosition: true,
			masonry: {
				// use outer width of grid-sizer for columnWidth
				columnWidth: '.grid__sizer'
			},
			transitionDuration: '0.6s'
		});
	}
	function initEvents() {
		filterCtrls.forEach(function(filterCtrl) {
			filterCtrl.addEventListener('click', function() {
				classie.remove(filterCtrl.parentNode.querySelector('.filter__item--selected'), 'filter__item--selected');
				classie.add(filterCtrl, 'filter__item--selected');
				iso.arrange({
					filter: filterCtrl.getAttribute('data-filter')
				});
				recalcFlickities();
				iso.layout();
			});
		});

		// window resize / recalculate sizes for both flickity and isotope/masonry layouts
		window.addEventListener('resize', throttle(function(ev) {
			recalcFlickities()
			iso.layout();
		}, 50));

	cart.addEventListener('click',cart_clicked);
		// add to cart
		[].slice.call(grid.querySelectorAll('.grid__item')).forEach(function(item) {

			item.querySelector('.action--buy').addEventListener('click', addToCart);
			//item.querySelector('.action--buy').getAttribute('id'));
		});
	}

		function getInfo(button){


			//console.log(button);
			var child = button.parentElement.childNodes[3].children;


			var data ={};

			var attributes = ["title","brand","price"];
			for(var i=0;i<attributes.length;i++){
				data[attributes[i]] = child[i].innerHTML;
			}



			return data;



		}

		function addToCart(evt) {


			var data = getInfo($(evt.target).closest("button")[0]);
			console.log(data);
			console.log(data['price']);
			console.log(typeof(data['price']));
			var div1 = document.createElement("div");
			var div2 = document.createElement("div");
			div1.innerHTML = data['title'];
			document.getElementById('confItems1').appendChild(div1);
			div2.innerHTML = data['price'];
			document.getElementById('confItems2').appendChild(div2);
			window.glob = window.glob+data['title']+"~";
			window.glob = window.glob+data['price']+"|";
			//console.log(global_data);

		classie.add(cart, 'cart--animate');
		setTimeout(function() {cartItems.innerHTML = Number(cartItems.innerHTML) + 1;}, 200);
		onEndAnimation(cartItems, function() {
			classie.remove(cart, 'cart--animate');
		});
	}

	
	function cart_clicked(){

		//	window.alert("cart_clicked");
		
	}

	function recalcFlickities() {
		for(var i = 0, len = flkties.length; i < len; ++i) {
			flkties[i].resize();
		}
	}


	init();

})(window);
