'use strict';
$(function() {

    //--------------------------------------fireBase Initialization
    var config = {
        apiKey: "AIzaSyD4zfoBJAqzq1qJNqAbW87-OlVXbOId8Hg",
        authDomain: "open-leagues.firebaseapp.com",
        databaseURL: "https://open-leagues.firebaseio.com",
        projectId: "open-leagues",
        storageBucket: "open-leagues.appspot.com",
        messagingSenderId: "827491709161"
    };
    firebase.initializeApp(config);

    //--------------------------------------------------Global Variables
    var OLdatabase = firebase.database();
    var elementArray = [];
    var searchMapArray = [];
    var appContainer = $('#app');
    var map;
    var map2;
    var ltLgString;
    var ltLgArray;

    landingPage();
    appender(elementArray, appContainer);

    // -------------------------------------------------function that generates the landing page
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
        var createBtn = $('<button id="createBtn" class="btnStyle btn btn-lg active">');
        searchBtn.text('Search');
        createBtn.text('Create Event');
        headLogo.html(img);
        main.append(searchBtn);
        main.append(createBtn);
        elementArray.push(carousel);
        elementArray.push(headLogo);
        elementArray.push(main);

    }



    //------------------------------------------------------FaceBook API Initialization
    window.fbAsyncInit = function() {
        FB.init({
            appId: '316009212235911',
            cookie: true,
            xfbml: true,
            version: 'v2.11'
        });

        FB.getLoginStatus(function(response) {
            if (response.status === 'connected') {
                console.log('we are connected');
            } else if (response.status === 'not_authorized') {
                console.log('we are not connected');
            } else {
                console.log('you are not connected');
            }

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

    function login() {
        FB.login(function(reponse) {
            if (response.status === 'connected') {
                console.log('we are connected');
            } else if (response.status === 'not_authorized') {
                console.log('we are not connected');
            } else {
                console.log('you are not connected');
            }

        });

    }


    //-----------------------------------------------function that generates the create event page

    function createPage() {



        emptyAppContainer();

        elementArray = [];
        var childElements = [];

        var main = $('<main class="createPageStyle">');
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
        elementArray.push(headLogo);
        elementArray.push(mapContainer);
        elementArray.push(form);
        appender(elementArray, main);

        appContainer.append(main);
        initMap();

    }




    function searchPage() {
        emptyAppContainer();

        elementArray = [];

        var main = $('<main class="createPageStyle">');
        var headLogo = $('<header class="createEventLogo">');
        var img = $('<img src="./assets/images/sunroof.png">');
        var mapContainer = $('<div id="searchMap" class="createPageMap">');
        headLogo.append(img);
        elementArray.push(headLogo);
        elementArray.push(mapContainer);
        appender(elementArray, main);
        appContainer.append(main);
        initMap2();


    }

    // -----------------------------------------function that is used to append the elements of the landing page
    function appender(elements, container) {

        for (var i = 0; i < elements.length; i++) {
            container.append(elements[i]);
        }

    }
    //------------------------------------------function that empties the app div
    function emptyAppContainer() {
        appContainer.empty();
    }
    // -----------------------------------------initialize google maps function on create event page
    function initMap() {

        var marker;

        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 32.852, lng: -117.185 },
            zoom: 10
        });

        function placeMarker(location) {
            if (marker) {
                marker.setPosition(location);
            } else {
                marker = new google.maps.Marker({
                    position: location,
                    animation: google.maps.Animation.DROP,
                    map: map
                });
            }

        }

        google.maps.event.addListener(map, 'click', function(event) {
            var ltLg = event.latLng;
            placeMarker(ltLg);
            ltLgString = marker.getPosition().toString();


        });

    }
    // -----------------------------------------initialize google maps function on search page
    function initMap2() {

        let marker;

        map2 = new google.maps.Map(document.getElementById('searchMap'), {
            center: { lat: 32.852, lng: -117.185 },
            zoom: 10
        });

        function placeMarkers(eventData) {
            for (let m = 0; m < eventData.length; m++) {
                var lt = parseFloat(eventData[m].lat);
                var lg = parseFloat(eventData[m].lng);
                var selectedSport = eventData[m].selectedSport;
                var startTime = eventData[m].startTime;
                var duration = eventData[m].duration;
                var teamSize = eventData[m].teamSize;
                var benchSeats = eventData[m].benchSeats;
                var contentString =
                    '<div id="eventInfo">' +
                    '<h2>Open ' + selectedSport + ' League</h2>' +
                    '<p>Start Time: ' + startTime + '</p>' +
                    '<p>Duration: ' + duration + '</p>' +
                    '<p>Team Size: ' + teamSize + '</p>' +
                    '<p>Bench Seats: ' + benchSeats + '</p>';

                var infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                console.log(lt);
                marker = new google.maps.Marker({
                    map: map2,
                    animation: google.maps.Animation.DROP,
                    position: { lat: lt, lng: lg }
                });
                /*google.maps.event.addListener(marker, 'click', function() {
                    // do something with this marker ...
                    $(this).infowindow.open(map2, marker);
                });*/
            }
            marker.addListener('click', function() {
                infowindow.open(map2, marker);
            });


        }


        placeMarkers(searchMapArray);

    }


    function ltLgConverter(string) {
        var ar1 = string.split('');
        ar1.shift();
        ar1.pop();
        var t = ar1.join('');
        ltLgArray = t.split(',');



    }

    // ----------------------------------adds click handler onto the create event button - event delegation

    $('body').on('click', '#createBtn', function() {
        createPage();
        login();
    });
    $('body').on('click', '#searchBtn', function() {
        searchPage();
    });


    // -------------------------------------------------------firebase calls 

    $('body').on('click', '#eventSubmit', function(event) {
        event.preventDefault();
        ltLgConverter(ltLgString);
        var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $("#startTime").val().trim();
        var durationInput = $("#durationTime").val().trim();
        var teamSizeInput = $("#teamSize").val().trim();
        var benchSeatsInput = $("#benchSeats").val().trim();


        var currentUser = {
            lat: ltLgArray[0],
            lng: ltLgArray[1],
            selectedSport: sportInput,
            startTime: startTimeInput,
            duration: durationInput,
            teamSize: teamSizeInput,
            benchSeats: benchSeatsInput
        };
        OLdatabase.ref('userEvents/').push(currentUser);
        $('#selectedSport').val('');
        $('#startTime').val('');
        $('#durationTime').val('');
        $('#teamSize').val('');
        $('#benchSeats').val('');
    });

    OLdatabase.ref('userEvents/').on("child_added", function(snapshot) {
        var userEntry = snapshot.val();
        searchMapArray.push(userEntry);
        console.log(searchMapArray[1]);

    });
});