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
    var map;

    landingPage();
    appender(elementArray);

// function that generates the landing page
    function landingPage() {

        emptyAppContainer();

        var carousel =

            '<div id="carouselExampleSlidesOnly" class="carousel slide" data-ride="carousel">' +
            '<div class="carousel-inner">' +
            '<div class="carousel-item active">' +
            '<img class="d-block w-100" src="assets/css/grass.jpg" alt="First slide">' +
            '</div>' +
            '<div class="carousel-item">' +
            '<img class="d-block w-100" src="assets/css/basketball.jpg" alt="Second slide">' +
            '</div>' +
            '<div class="carousel-item">' +
            '<img class="d-block w-100" src="assets/css/hockey.jpg" alt="Third slide">' +
            '</div>' +
            '</div>' +
            '</div>';




        var headLogo = $('<header>');
        var main = $('<main>');
        var searchBtn = $('<button>');
        var createBtn = $('<button>');
        main.attr('id', 'main');
        searchBtn.attr('id', 'searchBtn');
        createBtn.attr('id', 'createBtn');
        headLogo.addClass('logo');
        main.addClass('mainStyle overlay');
        searchBtn.addClass('btnStyle btn btn-lg active');
        createBtn.addClass('btnStyle btn btn-lg active');
        searchBtn.text('Search');
        createBtn.text('Create Event');
        main.append(searchBtn);
        main.append(createBtn);
        elementArray.push(carousel);
        elementArray.push(headLogo);
        elementArray.push(main);

    }

//function that generates the create event page
    function createPage() {

        emptyAppContainer();

        var main = $('<main>');
        var mapContainer = $('<div>');
        main.addClass('createPageStyle');
        mapContainer.attr('id', 'map');
        mapContainer.addClass('createPageMap');
        main.append(mapContainer);
        appContainer.append(main);
        initMap();
    }
// function that is used to append the elements of the landing page
    function appender(elements) {

        for (var i = 0; i < elements.length; i++) {
            appContainer.append(elements[i]);
        }

    }
//function that empties the app div
    function emptyAppContainer() {
        appContainer.empty();
    }
// initialize google maps function
    function initMap() {

        var marker;
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 32.852, lng: -117.185 },
            zoom: 9
        });


        google.maps.event.addListener(map, 'click', function(event) {

            marker = new google.maps.Marker({ position: event.latLng, map: map, title: 'test' });

        });

    }
// adds click handler onto the create event button - event delegation
    $('body').on('click', '#createBtn', createPage);
    /*$('body').on('click', '#searchBtn', searchPage);*/

});