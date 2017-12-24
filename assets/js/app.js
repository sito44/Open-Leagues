'use strict';
$(function() {

    var config = {
        apiKey: "AIzaSyD4zfoBJAqzq1qJNqAbW87-OlVXbOId8Hg",
        authDomain: "open-leagues.firebaseapp.com",
        databaseURL: "https://open-leagues.firebaseio.com",
        projectId: "open-leagues",
        storageBucket: "open-leagues.appspot.com",
        messagingSenderId: "827491709161"
    };
    firebase.initializeApp(config);
    var OLdatabase = firebase.database();


    var elementArray = [];
    var appContainer = $('#app');

    landingPage();
    appender(elementArray);

    function landingPage() {
        var headLogo = $('<header>');
        var main = $('<main>');
        var searchBtn = $('<button>');
        var createBtn = $('<button>');
        main.attr('id', 'main');
        searchBtn.attr('id', 'searchBtn');
        createBtn.attr('id', 'createBtn');
        headLogo.addClass('logo');
        main.addClass('mainStyle');
        searchBtn.addClass('btnStyle btn btn-lg active');
        createBtn.addClass('btnStyle btn btn-lg active');
        searchBtn.text('Search');
        createBtn.text('Create Event');
        main.append(searchBtn);
        main.append(createBtn);
        elementArray.push(headLogo);
        elementArray.push(main);

    }

    function appender(elements) {

        for (var i = 0; i < elements.length; i++) {
            appContainer.append(elements[i]);
        }

    }

    function emptyAppContainer() {
        appContainer.empty();
    }

});