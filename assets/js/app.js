
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
    var hasBeenClicked = false;

    landingPage();
    appender(elementArray, appContainer);

    // ----------------function to create modal
    function createModal() {
        var modal = $('<div id="id01" class="w3-modal"></div>');
        var modalContent = $('<div class="w3-modal-content">');
        var modalTxt = $('<p class="modalText">You Must Log In With Facebook to Continue</p>');
        var modalBtn = $('<button class="modalButton">Retry</button>');
        modal.prepend(modalContent);
        modalContent.prepend(modalTxt);
        modalContent.append(modalBtn);
        $('#app').prepend(modal);
    }

 // -----------------------------------------FB button functionality
    function checkBtnClick() {
        $('#loginbutton').click(function() {
            hasBeenClicked = true;
        });

        if (hasBeenClicked) {
            $('#id01').hide();
        } else {
            $('#id01').show();
        }


    }


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

        var openText = $('<div class="openText">');
        var openTextText = $('<p>OPEN LEAGUES</p>');
        var openDialogue = $('<div class="openDialogue">');
        var textDialogue = $('<p class="textDialogue">Welcome to Open Leagues! Click on the Search Button to find local sports leagues and events. Click on the Create Event button to create your own events and dream team.</p>');
        var main = $('<main id="main" class="mainStyle overlay">');
        var searchBtn = $('<button id="searchBtn" class="btnStyle btn btn-lg active">');
        var createBtn = $('<button id="createBtn" class="btnStyle btn btn-lg active">');
        searchBtn.text('Search');
        createBtn.text('Create Event');
        openText.prepend(openTextText); 
        openDialogue.prepend(textDialogue);          
        main.append(openText);
        main.append(openDialogue);
        main.append(searchBtn);
        main.append(createBtn);
        elementArray.push(carousel);
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
        FB.login(function(response) {
            console.log(response.status)
            if (response.status === 'connected') {
                console.log('we are connected');
            } else {
                createModal(); 
            }

        });

    }


    //-----------------------------------------------function that generates the create event page

    function createPage() {


        emptyAppContainer();

        elementArray = [];
        var childElements = [];

        var main = $('<main class="createPageStyle">');
        var mapContainer = $('<div id="map" class="createPageMap">');
        var form = $('<form class="eventForm">');
        var address = $('<h4>');
        var sportsSelector = $('<select name="sports" id="selectedSport" class="sportChoice">');
        var sportsOptions =

            '<option value="soccer">Soccer</option>' +
            '<option value="football">Football</option>' +
            '<option value="volleyball">Volleyball</option>' +
            '<option value="hockey">Hockey</option>' +
            '<option value="baseball">Baseball</option>' +
            '<option value="basketball">Basketball</option>' +
            '<option value="yoga">Yoga</option>' +
            '<option value="hiking">Hiking</option>';

        var labelSportChoice = $('<label for="sportsChoice">');
        var labelStartTime = $('<label for="startTime">');
        var gameStartTime = $('<input type="text" name="startTime" id="startTime">');
        var labelDurationTime = $('<label for="DurationTime">');
        var gameDurationTime = $('<input type="text" name="DurationTime" id="durationTime">');
        var labelMaxPeople = $('<label for="maxPeople">');
        var maxPeople = $('<input type="text" name="maxPeople" id="maxPeople">');
        var labelRules = $('<label for="rules">');
        var rules = $('<textarea name="rules" id="rules" rows="10" cols="50">');
        var eventSubmit = $('<button id="eventSubmit" class="eSubmit">');
        sportsSelector.html(sportsOptions);

        labelStartTime.text('Start Time: ');
        labelDurationTime.text('Duration: ');
        labelMaxPeople.text('Max Number of People: ');
        labelRules.text('Rules: ');
        eventSubmit.text('Create Event');

        childElements.push(

            address,
            sportsSelector,
            labelStartTime,
            gameStartTime,
            labelDurationTime,
            gameDurationTime,
            labelMaxPeople,
            maxPeople,
            labelRules,
            rules,
            eventSubmit);

        appender(childElements, form);
        elementArray.push(mapContainer);
        elementArray.push(form);
        appender(elementArray, main);

        appContainer.append(main);
        initMap();

        //createModal();
        // checkBtnClick();

        

    }




    function searchPage() {

        emptyAppContainer();

        elementArray = [];

        var main = $('<main class="createPageStyle">');
        var mapContainer = $('<div id="searchMap" class="createPageMap">');
        elementArray.push(mapContainer);
        appender(elementArray, main);
        appContainer.append(main);
        initMap2();
          var modal = $('<div class="modal"></div>');
        //modal.prepend($('<div class="modal-inner"></div>'));
        main.append(modal);


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
                var maxPeople = eventData[m].maxPeople;
                var benchSeats = eventData[m].benchSeats;
                var contentString =
                    '<div id="eventInfo">' +
                    '<h2>Open ' + selectedSport + ' League</h2>' +
                    '<p>Start Time: ' + startTime + '</p>' +
                    '<p>Duration: ' + duration + '</p>' +
                    '<p>Team Size: ' + maxPeople + '</p>' +
                    '<p>Bench Seats: ' + benchSeats + '</p>';

                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                });

                
                let marker = new google.maps.Marker({
                    map: map2,
                    animation: google.maps.Animation.DROP,
                    position: { lat: lt, lng: lg }
                });

                marker.info = infowindow;
              
                google.maps.event.addListener(marker, 'click', function() {
                	marker.info.open(map2, marker);
                });
            }


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

    $('body').on('click', '.modalButton', function() {
        login();

    });


    // -------------------------------------------------------firebase calls 

    $('body').on('click', '#eventSubmit', function(event) {
        event.preventDefault();
        ltLgConverter(ltLgString);
        var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $("#startTime").val().trim();
        var durationInput = $("#durationTime").val().trim();
        var maxPeopleInput = $("#maxPeople").val().trim();
        var rules = $('#rules').val().trim();


        var currentUser = {
            lat: ltLgArray[0],
            lng: ltLgArray[1],
            selectedSport: sportInput,
            startTime: startTimeInput,
            duration: durationInput,
            maxPeople: maxPeopleInput,
            rules: rules
            
        };
        OLdatabase.ref('userEvents/').push(currentUser);
        $('#selectedSport').val('');
        $('#startTime').val('');
        $('#durationTime').val('');
        $('#maxPeople').val('');
        $('#rules').val('');
    });

    OLdatabase.ref('userEvents/').on("child_added", function(snapshot) {
        var userEntry = snapshot.val();
        searchMapArray.push(userEntry);
        console.log(searchMapArray[1]);

    });

    // -------------------------------------------------- weather api calls

    // let latitude,longitude 
    
    // function getWeather(latitude,longitude) {

    //     if(latitude != '' && longitude != '') {

    //     var queryURL = 'api.openweathermap.org/data/2.5/forecast?id=524901&units=imperial&APPID=eae68fa56af3e63c236a36180ed2fe9c';

    //     console.log(queryURL);

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).done(function(response) {
    //         console.log(response);

    //         var results = response.data;

    //         console.log(results);

    //     }

    // }

});
