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
    appender(elementArray, appContainer);

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


        var headLogo = $('<header class="logo">');
        var img = $('<img src="./assets/css/sunroof.png">');
        var main = $('<main id="main" class="mainStyle overlay">');
        var searchBtn = $('<button id="searchBtn" class="btnStyle btn btn-lg active">');
        var createBtn = $('<button id="createBtn" class="btnStyle btn btn-lg active">');
        searchBtn.text('Search');
        createBtn.text('Create Event');
        headLogo.append(img);
        main.append(searchBtn);
        main.append(createBtn);
        elementArray.push(carousel);
        elementArray.push(headLogo);
        elementArray.push(main);

    }

    //function that generates the create event page
    function createPage() {

        emptyAppContainer();
        var childElements = [];
        var main = $('<main class="createPageStyle">');
        var mapContainer = $('<div id="map" class="createPageMap">');
        var form = $('<form class="eventForm">');
        var address = $('<h4>');
        var sportsSelector = $('<select name="sports">');
        var sportsOptions =

            '<option value="soccer">soccer</option>' +
            '<option value="football">football</option>' +
            '<option value="volleyball">volleyball</option>' +
            '<option value="hockey">hockey</option>' +
            '<option value="baseball">baseball</option>' +
            '<option value="basketball">basketball</option>';

        var labelStartTime = $('<label for="startTime">');
        var gameStartTime = $('<input type="text" name="startTime">');
        var labelDurationTime = $('<label for="DurationTime">');
        var gameDurationTime = $('<input type="text" name="DurationTime">');
        var labelTeamSize = $('<label for="teamSize">');
        var teamSize = $('<input type="text" name="teamSize">');
        var labelBenchSeats = $('<label for="benchSeats">');
        var benchSeats = $('<input type="text" name="benchSeats">');
        sportsSelector.html(sportsOptions);
        labelStartTime.text('start time: ');
        labelDurationTime.text('Duration: ');
        labelTeamSize.text('Team size: ');
        labelBenchSeats.text('bench seats: ');
        childElements.push(

            address,
            sportsSelector,
            labelStartTime,
            gameStartTime,
            labelDurationTime,
            gameDurationTime,
            labelTeamSize,
            teamSize,
            labelBenchSeats,
            benchSeats);

        appender(childElements, form);

        main.append(mapContainer);
        main.append(form);
        appContainer.append(main);
        initMap();
    }

    // function that is used to append the elements of the landing page
    function appender(elements, container) {

        for (var i = 0; i < elements.length; i++) {
            container.append(elements[i]);
        }

    }
    //function that empties the app div
    function emptyAppContainer() {
        appContainer.empty();
    }
    // initialize google maps function on create event page
    function initMap() {

        var marker;

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 32.852, lng: -117.185 },
            zoom: 9
        });

        function placeMarker(location) {
            if (marker) {
                marker.setPosition(location);
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
            }

        }

        google.maps.event.addListener(map, 'click', function(event) {
            var ltLg = event.latLng;
            placeMarker(ltLg);
            var x = marker.getPosition().toString();
            /*var s = x.formatted_address;*/
            console.log(x);
            console.log(typeof x);
            /*console.log(s);*/

        });

    }
    // adds click handler onto the create event button - event delegation
    $('body').on('click', '#createBtn', createPage);
    /*$('body').on('click', '#searchBtn', searchPage);*/

});