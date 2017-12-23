'use strict';
$(function(){
	var elementArray = [];
	var appContainer = $('#app');
	var headLogo = $('<header>');
	var main = $('<main>');
	var searchBtn = $('<button>');
	var createBtn = $('<button>');
	main.attr('id', 'main');
	searchBtn.attr('id', 'searchBtn');
	createBtn.attr('id', 'createBtn');
	headLogo.addClass('logo');
	main.addClass('mainStyle');
	searchBtn.addClass('btnStyle');
	createBtn.addClass('btnStyle');
	searchBtn.text('Search');
	createBtn.text('Create Event');
	elementArray.push(headLogo);
	elementArray.push(main);
	elementArray.push(searchBtn);
	elementArray.push(createBtn);

	appender(elementArray);

	function appender(elements) {

	for (var i = 0; i < elements.length; i++) {
		appContainer.append(elements[i]);
	}

	}
	function emptyAppContainer() {
		appContainer.empty();
	}

});