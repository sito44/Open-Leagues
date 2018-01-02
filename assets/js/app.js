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

    //Linking Facebook
    
    window.fbAsyncInit = function() {
        FB.init({
            appId: '316009212235911',
            cookie: true,
            xfbml: true,
            version: 'v2.11'
        });


        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });


    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    function statusChangeCallback(response) {
        if (response.status === 'connected') {
            console.log('logged in and authenticated');
        } else {
            console.log('not authenticated');
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }


    var elementArray = [];
    var appContainer = $('#app');
    var map;

    landingPage();
    appender(elementArray, appContainer);

    // function that generates the landing page
    function landingPage() {

        emptyAppContainer();

        var carousel =

            '<div id="carouselExampleSlidesOnly" class="carousel slide full-screen" data-ride="carousel">' +
            '<div class="carousel-inner">' +
            '<div class="carousel-item active">' +
            '<img class="d-block w-100 full-screen" src="assets/images/basketball2.jpeg" alt="First slide">' +
            '</div>' +
            '<div class="carousel-item">' +
            '<img class="d-block w-100 full-screen" src="assets/images/soccer2.jpeg" alt="Second slide">' +
            '</div>' +
            '<div class="carousel-item">' +
            '<img class="d-block w-100 full-screen" src="assets/images/volleyball.jpeg" alt="Third slide">' +
            '</div>' +
            '</div>' +
            '</div>';


        var headLogo = $('<header class="logo">');
        var img = $('<img src="./assets/images/sunroof.png" class="openLogo">');
        var main = $('<main id="main" class="mainStyle overlay">');
        var searchBtn = $('<button id="searchBtn" class="btnStyle btn btn-lg active">');
        //var createBtn = $('<button id="createBtn" class="btnStyle btn btn-lg active">');
        searchBtn.text('Search');
        //createBtn.text('Create Event');
        headLogo.html(img);
        main.append(searchBtn);
        //main.append(createBtn);
        elementArray.push(carousel);
        elementArray.push(headLogo);
        elementArray.push(main);

    }

    //function that generates the create event page
    function createPage() {

        emptyAppContainer();
        



        var childElements = [];

        var main = $('<main class="createPageStyle">');

        /*var fbBtn = '<fb:login-button scope="public_profile,email" onlogin="checkLoginState();">' +
            '</fb:login-button>';*/

        var headLogo = $('<header class="createEventLogo">');
        var img = $('<img src="./assets/images/sunroof.png">');
        var mapContainer = $('<div id="map" class="createPageMap">');
        var form = $('<form class="eventForm">');
        var address = $('<h4>');
        var sportsSelector = $('<select name="sports" id="selectedSport" class="sportChoice">');
        var sportsOptions =

            '<option value="soccer">soccer</option>' +
            '<option value="football">football</option>' +
            '<option value="volleyball">volleyball</option>' +
            '<option value="hockey">hockey</option>' +
            '<option value="baseball">baseball</option>' +
            '<option value="basketball">basketball</option>' +
            '<option value="yoga">yoga</option>' +
            '<option value="hiking">hiking</option>';

        var labelSportChoice = $('<label for="sportsChoice">');
        var labelStartTime = $('<label for="startTime">');
        var gameStartTime = $('<input type="text" name="startTime" id="startTime">');
        var labelDurationTime = $('<label for="DurationTime">');
        var gameDurationTime = $('<input type="text" name="DurationTime" id="durationTime">');
        var labelTeamSize = $('<label for="teamSize">');
        var teamSize = $('<input type="text" name="teamSize" id="teamSize">');
        var labelBenchSeats = $('<label for="benchSeats">');
        var benchSeats = $('<input type="text" name="benchSeats" id="benchSeats">');
        var eventSubmit = $('<button id="eventSubmit" class="eSubmit">');
        sportsSelector.html(sportsOptions);

        labelStartTime.text('Start Time: ');
        labelDurationTime.text('Duration: ');
        labelTeamSize.text('Team Size: ');
        labelBenchSeats.text('Bench Seats: ');
        eventSubmit.text('Create Event');

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
            benchSeats,
            eventSubmit);

        appender(childElements, form);
        headLogo.append(img);
        /*main.append(fbBtn);*/
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




    // firebase calls 

    $('body').on('click', '#eventSubmit', function(event) {
        event.preventDefault();

        var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $("#startTime").val().trim();
        var durationInput = $("#durationTime").val().trim();
        var teamSizeInput = $("#teamSize").val().trim();
        var benchSeatsInput = $("#benchSeats").val().trim();

        var currentUser = {
            selectedSport: sportInput,
            startTime: startTimeInput,
            duration: durationInput,
            teamSize: teamSizeInput,
            benchSeats: benchSeatsInput
        };
        OLdatabase.ref().push(currentUser);
        $('#selectedSport').val('');
        $('#startTime').val('');
        $('#durationTime').val('');
        $('#teamSize').val('');
        $('#benchSeats').val('');
    });

});