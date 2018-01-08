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
            console.log(response.status);
            if (response.status === 'connected') {
                $('.w3-modal').hide();
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
        var weatherDiv = $('<div class="divForWeather" id="weatherBox">');
        /*var weatherTable = $('<table class="tableForWeather table">');*/
        weatherDiv.append(weatherTable);
        var form = $('<form class="eventForm">');
        var address = $('<h4>');
        var sportsSelector = $('<select name="sports" id="selectedSport" class="sportChoice">');
        var sportsOptions =

            '<option value="Soccer">Soccer</option>' +
            '<option value="Football">Football</option>' +
            '<option value="Volleyball">Volleyball</option>' +
            '<option value="Hockey">Hockey</option>' +
            '<option value="Baseball">Baseball</option>' +
            '<option value="Basketball">Basketball</option>' +
            '<option value="Golf">Golf</option>' +
            '<option value="Pool">Pool</option>'


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
        elementArray.push(weatherDiv);
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
        weatherDiv.append(weatherTable);
        elementArray.push(mapContainer);
        elementArray.push(weatherDiv);
        appender(elementArray, main);
        appContainer.append(main);
        var modal = $('<div class="modal"></div>');
        //modal.prepend($('<div class="modal-inner"></div>'));
        main.append(modal);
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
            ltLgConverter(ltLgString);
            getWeather(parseFloat(ltLgArray[0]),parseFloat(ltLgArray[1]));


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

                let lt = parseFloat(eventData[m].lat);
                let lg = parseFloat(eventData[m].lng);
                let address = eventData[m].address;
                let selectedSport = eventData[m].selectedSport;
                let startTime = eventData[m].startTime;
                let duration = eventData[m].duration;
                let maxPeople = eventData[m].maxPeople;
                let benchSeats = eventData[m].benchSeats;
                let rules = eventData[m].rules;
                let iconBtn;
                let contentString =

                    '<div id="eventInfo">' +
                    '<h2>Open ' + selectedSport + ' League</h2>' +
                    '<h3>Address: ' + address + '</h3>' +
                    '<p>Start Time: ' + startTime + '</p>' +
                    '<p>Duration: ' + duration + '</p>' +
                    '<p>Max Number of People: ' + maxPeople + '</p>' +
                    '<p>Bench Seats: ' + benchSeats + '</p>' +
                    '<p>Rules: ' + rules + '</p>';

                   
                switch (selectedSport) {
                    case "Soccer":
                        iconBtn = './assets/images/soccerIcon.png';
                        break;
                    case "Football":
                        iconBtn = './assets/images/footBallIcon.png';
                        break;
                    case "Volleyball":
                        iconBtn = './assets/images/volleyBallIcon.png';
                        break;
                    case "Hockey":
                        iconBtn = './assets/images/hockeyIcon.png';
                        break;
                    case "Baseball":
                        iconBtn = './assets/images/baseballIcon.png';
                        break;
                    case "BasketBall":
                        iconBtn = './assets/images/basketballIcon.png';
                        break;
                    case "Golf":
                        iconBtn = './assets/images/golfIcon.png';
                        break;
                    case "Pool":
                        iconBtn = './assets/images/poolIcon.png';
                        break;

                }

                console.log(iconBtn);
                let image = {
                    url: iconBtn,
                    // This marker is 20 pixels wide by 32 pixels high.
                    size: new google.maps.Size(40, 40),
                    // The origin for this image is (0, 0).
                    origin: new google.maps.Point(0, 0),
                    // The anchor for this image is the base of the flagpole at (0, 32).
                    anchor: new google.maps.Point(0, 32)
                };

                let infowindow = new google.maps.InfoWindow({
                    content: contentString
                });


                let marker = new google.maps.Marker({
                    map: map2,
                    animation: google.maps.Animation.DROP,
                    icon: image,
                    position: { lat: lt, lng: lg }
                });

                marker.info = infowindow;

                function toggleBounce() {
                    if (marker.getAnimation() !== null) {
                        marker.setAnimation(null);
                    } else {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }
                }
                google.maps.event.addListener(marker, 'click', function() {
                    marker.info.open(map2, marker);
                    toggleBounce();

                });
            }

        }

        placeMarkers(searchMapArray);
    }

    console.log(searchMapArray);

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

    $('body').on('click', '#eventSubmit', function() {
        login();

    });


    // -------------------------------------------------------firebase calls 


    $('body').on('click', '#eventSubmit', function(event) {
        event.preventDefault();
        ltLgConverter(ltLgString);
        var geocoder = new google.maps.Geocoder;
        var latLng = { lat: parseFloat(ltLgArray[0]), lng: parseFloat(ltLgArray[1]) };
        var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $("#startTime").val().trim();
        var durationInput = $("#durationTime").val().trim();
        var maxPeopleInput = $("#maxPeople").val().trim();
        var rules = $('#rules').val().trim();

        geocoder.geocode({ 'location': latLng }, function(results, status) {
            console.log(results);
            if (status === 'OK') {
                if (results[0]) {
                    var x = results[0].formatted_address;
                    var currentUser = {
                        lat: ltLgArray[0],
                        lng: ltLgArray[1],
                        selectedSport: sportInput,
                        address: x,
                        startTime: startTimeInput,
                        duration: durationInput,
                        maxPeople: maxPeopleInput,
                        benchSeats: 0,
                        rules: rules

                    };
                    OLdatabase.ref('userEvents/').push(currentUser);
                    console.log(x);
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });

        $('#selectedSport').val('');
        $('#startTime').val('');
        $('#durationTime').val('');
        $('#maxPeople').val('');
        $('#rules').val('');
    });

    OLdatabase.ref('userEvents/').on("child_added", function(snapshot) {
        var userEntry = snapshot.val();
        searchMapArray.push(userEntry);

    });

    // -------------------------------------------------- weather api calls

    let latitude,longitude; 
    
    function getWeather(latitude,longitude) {

        if(latitude != '' && longitude != '') {

        var queryURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + 
            '&units=imperial&APPID=eae68fa56af3e63c236a36180ed2fe9c';

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response);
            var results = response;

            console.log(results);

            let city = results.city.name;
            console.log(city);
            let weatherDayOne = results.list[3].dt_txt;
            let weatherDayTwo = results.list[11].dt_txt;
            let weatherDayThree = results.list[19].dt_txt;
            let weatherDayFour = results.list[27].dt_txt;
            let weatherDayFive = results.list[35].dt_txt;
            console.log('Day One: ' + weatherDayOne);
            console.log('Day Two: ' + weatherDayTwo);
            console.log('Day Three: ' + weatherDayThree);
            console.log('Day Four: ' + weatherDayFour);
            console.log('Day Five: ' + weatherDayFive);
            let temperatureDayOne = results.list[3].main.temp;
            let temperatureDayTwo = results.list[11].main.temp;
            let temperatureDayThree = results.list[19].main.temp;
            let temperatureDayFour = results.list[27].main.temp;
            let temperatureDayFive = results.list[35].main.temp;
            console.log('Temp Day One: ' + temperatureDayOne);
            console.log('Temp Day Two: ' + temperatureDayTwo);
            console.log('Temp Day Three: ' + temperatureDayThree);
            console.log('Temp Day Four: ' + temperatureDayFour);
            console.log('Temp Day Five: ' + temperatureDayFive);
            let weatherDescriptionDayOne = response.list[3].weather[0].description;
            let weatherDescriptionDayTwo = response.list[11].weather[0].description;
            let weatherDescriptionDayThree = response.list[19].weather[0].description;
            let weatherDescriptionDayFour = response.list[27].weather[0].description;
            let weatherDescriptionDayFive = response.list[35].weather[0].description;
            console.log('Weather Description Day One: '+ weatherDescriptionDayOne);
            console.log('Weather Description Day Two: '+ weatherDescriptionDayTwo);
            console.log('Weather Description Day Three: '+ weatherDescriptionDayThree);
            console.log('Weather Description Day Four: '+ weatherDescriptionDayFour);
            console.log('Weather Description Day Five: '+ weatherDescriptionDayFive);
            let windDayOne = response.list[3].wind.speed;
            let windDayTwo = response.list[11].wind.speed;
            let windDayThree = response.list[19].wind.speed;
            let windDayFour = response.list[27].wind.speed;
            let windDayFive = response.list[35].wind.speed;
            console.log('Wind Day One: '+ windDayOne);
            console.log('Wind Day Two: '+ windDayTwo);
            console.log('Wind Day Three: '+ windDayThree);
            console.log('Wind Day Four: '+ windDayFour);
            console.log('Wind Day Five: '+ windDayFive);

            /*$('#weatherBox').html(

                '<div'
                );*/

            /*var weatherTable = $('<table class="tableForWeather table">');*/
            

        });

    }
}

/*getWeather(parseFloat(ltLgArray[0]),parseFloat(ltLgArray[1]));*/

});
