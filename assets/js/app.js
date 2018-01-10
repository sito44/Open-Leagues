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

    // -----------------------------------------function that is used to append the elements
    function appender(elements, container) {

        for (var i = 0; i < elements.length; i++) {
            container.append(elements[i]);
        }

    }
    //------------------------------------------function that empties the app div
    function emptyAppContainer() {
        appContainer.empty();
    }
    // ------------------------------------- correct format converter: returns array [latString,lngString]
    function ltLgConverter(string) {
        var ar1 = string.split('');
        ar1.shift();
        ar1.pop();
        var t = ar1.join('');
        ltLgArray = t.split(',');

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
        var buttonDiv = $('<div class="divForButtons">');
        var searchBtn = $('<button id="searchBtn" class="btnStyle btn btn-lg active">');
        var createBtn = $('<button id="createBtn" class="btnStyle btn btn-lg active">');
        buttonDiv.append(searchBtn);
        buttonDiv.append(createBtn);
        searchBtn.text('Search');
        createBtn.text('Create Event');
        openText.prepend(openTextText);
        openDialogue.prepend(textDialogue);
        main.append(openText);
        main.append(openDialogue);
        main.append(buttonDiv);
        elementArray.push(carousel);
        elementArray.push(main);

    }
    // -------------------------------------------------- function generates the Search Page
    function searchPage() {

        emptyAppContainer();

        elementArray = [];

        var main = $('<main class="createPageStyle">');
        var mapContainer = $('<div id="searchMap" class="createPageMap">');
        elementArray.push(mapContainer);
        
        appender(elementArray, main);
        appContainer.append(main);
        var modal = $('<div class="modal"></div>');
        //modal.prepend($('<div class="modal-inner"></div>'));
        main.append(modal);
        initMap2();


    }
    //-----------------------------------------------function that generates the create event page

    function createPage() {


        emptyAppContainer();

        elementArray = [];
        var childElements = [];

        var main = $('<main class="createPageStyle">');
        var mapContainer = $('<div id="map" class="createPageMap">');
        var weatherDiv = $('<div class="eventForm" id="weatherBox">');
        var weatherHeader = $('<h4>');
        var weatherInfoContainer = $('<div id="weatherInfo" class="divForWeather">');
        weatherDiv.append(weatherHeader);
        weatherDiv.append(weatherInfoContainer);
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
            '<option value="Pool">Pool</option>';


        var labelSportChoice = $('<label for="sportsChoice">');
        var labelDate = $('<label for="date">');
        var date = $('<input type="text" name="date" id="date" placeholder="mm/dd/2018">');
        var dateError = $('<div id="dateError" class="errorTxt">');
        var labelStartTime = $('<label for="startTime">');
        var gameStartTime = $('<input type="text" name="startTime" id="startTime" placeholder="hh:mmam/pm">');
        var startTimeError = $('<div id="startTimeError" class="errorTxt">');
        var labelDurationTime = $('<label for="DurationTime">');
        var gameDurationTime = $('<input type="text" name="DurationTime" id="durationTime" placeholder="Hours (1-4)">');
        var durationError = $('<div id="durationError" class="errorTxt">');
        var labelMaxPeople = $('<label for="maxPeople">');
        var maxPeople = $('<input type="text" name="maxPeople" id="maxPeople" placeholder="4-50">');
        var maxPeopleError = $('<div id="maxPeopleError" class="errorTxt">');
        var labelRules = $('<label for="rules">');
        var rules = $('<textarea name="rules" id="rules" placeholder="100 word minimum" rows="10" cols="50">')
        var rulesError = $('<div id="rulesError" class="errorTxt">');
        var eventSubmit = $('<button id="eventSubmit" class="eSubmit">');
        sportsSelector.html(sportsOptions);

        weatherHeader.text('Selected Area Five Day Weather Forcast');
        labelDate.text('Date of Event');
        labelSportChoice.text('Selected Sport: ');
        labelStartTime.text('Start Time: ');
        labelDurationTime.text('Duration: ');
        labelMaxPeople.text('Max Number of People: ');
        labelRules.text('Rules: ');
        eventSubmit.text('Create Event');

        childElements.push(

            address,
            labelDate,
            date,
            dateError,
            labelSportChoice,
            sportsSelector,
            labelStartTime,
            gameStartTime,
            startTimeError,
            labelDurationTime,
            gameDurationTime,
            durationError,
            labelMaxPeople,
            maxPeople,
            maxPeopleError,
            labelRules,
            rules,
            rulesError,
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

    // ------------------------------------------Function for counting characters in text area


    // -----------------------------------------Form Validation

    function validateForm() {
        var dateInput = $("#date").val().trim();
        var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $('#startTime').val().trim();
        var durationInput = $('#durationTime').val().trim();
        var maxPeopleInput = $('#maxPeople').val().trim();
        var rulesInput = $('#rules').val();
        var dateRegex = /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](20)[1][8]$/;
        var dateResult = dateRegex.test(dateInput);
        var startTimeRegX = /^(0?[1-9]|1[012]):[0-5][0-9]([AaPp][Mm])$/i;
        var startTimeResult = startTimeRegX.test(startTimeInput);
        var durationRegX = /^([1-4])$/;
        var durationResult = durationRegX.test(durationInput);
        var maxNumRegex = /^(5[0-0]|[1-4][0-9]|[3-9])$/
        var maxNumResult = maxNumRegex.test(maxPeopleInput);

       
        // --------------------------------------------date validation

        if (dateResult === false) {
            $('#dateError').text('Use a valid format mm/dd/2018');
        } else {
            $('#dateError').empty();


        }

        //----------------------------------------start time validation

        if (startTimeResult === false) {
            $('#startTimeError').text('Use a valid format HH:mmam/pm');
           
        } else {
            $('#startTimeError').empty();
        }

        //-----------------------------------------duration validation
        
        if (durationResult === false) {
            $('#durationError').text('Enter a number between 1-4');
            
        } else {
            $('#durationError').empty();
        }

        //-------------------------------------------max number validation
         
         if (maxNumResult === false) {
             $('#maxPeopleError').text('Enter a number between 4-50');
         } else {
            $('#maxPeopleError').empty();
         }

        // ---------------------------------------------rules validation

         if (rulesInput.length < 100) {
            $('#rulesError').text('Enter at Least 100 characters')
         } else {
            $('#rulesError').empty();
         }

         if (dateResult === true && startTimeResult === true && durationResult === true && maxNumResult === true && rulesInput.length > 100) {
            console.log('working!')
            firebaseDataInput(dateInput, selectedSport, startTimeInput, durationInput, maxPeopleInput, rulesInput);

         }



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
            getWeather(parseFloat(ltLgArray[0]), parseFloat(ltLgArray[1]));


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
                        iconBtn = "./assets/images/soccerIcon.png'";
                        break;
                    case "Football":
                        iconBtn = "./assets/images/footBallIcon.png";
                        break;
                    case "Volleyball":
                        iconBtn = "./assets/images/volleyBallIcon.png";
                        break;
                    case "Hockey":
                        iconBtn = "./assets/images/hockeyIcon.png";
                        break;
                    case "Baseball":
                        iconBtn = "./assets/images/baseballIcon.png";
                        break;
                    case "BasketBall":
                        iconBtn = "./assets/images/basketballIcon.png";
                        break;
                    case "Golf":
                        iconBtn = "./assets/images/golfIcon.png";
                        break;
                    case "Pool":
                        iconBtn = "./assets/images/poolIcon.png";
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

    // ----------------------------------adds click handlers on buttons - event delegation

    $('body').on('click', '#createBtn', function() {
        createPage();
        /*login();*/
    });
    $('body').on('click', '#searchBtn', function() {
        searchPage();
    });

    $('body').on('click', '.modalButton', function() {
        login();
    });

    $('body').on('click', '#eventSubmit', function() {
        /*login();*/
        event.preventDefault();
        validateForm();
        /*firebaseDataInput();*/
    });


    // -------------------------------------------------------firebase calls 


    function firebaseDataInput(date, selectedSport, startTime, durationTime, maxPeople, rules) {
        ltLgConverter(ltLgString);
        var geocoder = new google.maps.Geocoder;
        var latLng = { lat: parseFloat(ltLgArray[0]), lng: parseFloat(ltLgArray[1]) };
        /*var sportInput = $("#selectedSport").val().trim();
        var startTimeInput = $("#startTime").val().trim();
        var durationInput = $("#durationTime").val().trim();
        var maxPeopleInput = $("#maxPeople").val().trim();
        var rules = $('#rules').val().trim();*/

        geocoder.geocode({ 'location': latLng }, function(results, status) {
            console.log(results);
            if (status === 'OK') {
                if (results[0]) {
                    var x = results[0].formatted_address;
                    var currentUser = {
                        lat: ltLgArray[0],
                        lng: ltLgArray[1],
                        date: date,
                        selectedSport: selectedSport,
                        address: x,
                        startTime: startTime,
                        duration: durationTime,
                        maxPeople: maxPeople,
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

        
    }

    OLdatabase.ref('userEvents/').on("child_added", function(snapshot) {
        var userEntry = snapshot.val();
        searchMapArray.push(userEntry);

    });

    // -------------------------------------------------- weather api calls

    let latitude, longitude;

    function getWeather(latitude, longitude) {

        if (latitude !== '' && longitude !== '') {

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
                let weatherDayOne = results.list[4].dt_txt;
                let weatherDayTwo = results.list[12].dt_txt;
                let weatherDayThree = results.list[20].dt_txt;
                let weatherDayFour = results.list[28].dt_txt;
                let weatherDayFive = results.list[36].dt_txt;
                console.log('Day One: ' + weatherDayOne);
                console.log('Day Two: ' + weatherDayTwo);
                console.log('Day Three: ' + weatherDayThree);
                console.log('Day Four: ' + weatherDayFour);
                console.log('Day Five: ' + weatherDayFive);
                let temperatureDayOne = results.list[4].main.temp;
                let temperatureDayTwo = results.list[12].main.temp;
                let temperatureDayThree = results.list[20].main.temp;
                let temperatureDayFour = results.list[28].main.temp;
                let temperatureDayFive = results.list[36].main.temp;
                console.log('Temp Day One: ' + temperatureDayOne);
                console.log('Temp Day Two: ' + temperatureDayTwo);
                console.log('Temp Day Three: ' + temperatureDayThree);
                console.log('Temp Day Four: ' + temperatureDayFour);
                console.log('Temp Day Five: ' + temperatureDayFive);
                let weatherDescriptionDayOne = response.list[4].weather[0].description;
                let weatherDescriptionDayTwo = response.list[12].weather[0].description;
                let weatherDescriptionDayThree = response.list[20].weather[0].description;
                let weatherDescriptionDayFour = response.list[28].weather[0].description;
                let weatherDescriptionDayFive = response.list[36].weather[0].description;
                console.log('Weather Description Day One: ' + weatherDescriptionDayOne);
                console.log('Weather Description Day Two: ' + weatherDescriptionDayTwo);
                console.log('Weather Description Day Three: ' + weatherDescriptionDayThree);
                console.log('Weather Description Day Four: ' + weatherDescriptionDayFour);
                console.log('Weather Description Day Five: ' + weatherDescriptionDayFive);
                let windDayOne = response.list[4].wind.speed;
                let windDayTwo = response.list[12].wind.speed;
                let windDayThree = response.list[20].wind.speed;
                let windDayFour = response.list[28].wind.speed;
                let windDayFive = response.list[36].wind.speed;
                console.log('Wind Day One: ' + windDayOne);
                console.log('Wind Day Two: ' + windDayTwo);
                console.log('Wind Day Three: ' + windDayThree);
                console.log('Wind Day Four: ' + windDayFour);
                console.log('Wind Day Five: ' + windDayFive);

                $('#weatherInfo').html(

                    '<div class="fLeft wB">' +
                    '<p>Date: ' + weatherDayOne + 'pm</p>' +
                    '<p>Temperature: ' + temperatureDayOne + '</p>' +
                    '<p>Condition: ' + weatherDescriptionDayOne + '</p>' +
                    '<p>Wind: ' + windDayOne + ' mph</p>' +
                    '</div>' +
                    '<div class="wB">' +
                    '<p>Date: ' + weatherDayTwo + 'pm</p>' +
                    '<p>Temperature: ' + temperatureDayTwo + '</p>' +
                    '<p>Condition: ' + weatherDescriptionDayTwo + '</p>' +
                    '<p>Wind: ' + windDayTwo + ' mph</p>' +
                    '</div>' +
                    '<div class="wB">' +
                    '<p>Date: ' + weatherDayThree + 'pm</p>' +
                    '<p>Temperature: ' + temperatureDayThree + '</p>' +
                    '<p>Condition: ' + weatherDescriptionDayThree + '</p>' +
                    '<p>Wind: ' + windDayThree + ' mph</p>' +
                    '</div>' +
                    '<div class="wB">' +
                    '<p>Date: ' + weatherDayFour + 'pm</p>' +
                    '<p>Temperature: ' + temperatureDayFour + '</p>' +
                    '<p>Condition: ' + weatherDescriptionDayFour + '</p>' +
                    '<p>Wind: ' + windDayFour + ' mph</p>' +
                    '</div>' +
                    '<div class="wB">' +
                    '<p>Date: ' + weatherDayFive + 'pm</p>' +
                    '<p>Temperature: ' + temperatureDayFive + '</p>' +
                    '<p>Condition: ' + weatherDescriptionDayFive + '</p>' +
                    '<p>Wind: ' + windDayFive + ' mph</p>' +
                    '</div>');






            });

        }
    }



});