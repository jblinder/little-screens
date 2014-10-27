$(document).ready(function(){

	// Setup variables for our forecast.io request
	var apiKey     = 'a586d11648043cec0b74207005ff6a5d';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.6760148';
	var defaultLng = '-73.9785012';

	/*
		1. Request the user's location via their browser
	*/

	// Request the user's latitude/longitude
	if ( Modernizr.geolocation ) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		// Prompt user
	}

	// Recieved a latitude/longitude from the browser
	function success(position) {
		console.log(position);
		getWeatherWithPos(position.coords.latitude,position.coords.longitude);
	}

	// Unable to find a latitude/longitude
	function error(error) {
		console.log(error);
		getWeatherWithPos(defaultLat,defaultLng);
	}

	/*
		2. Request weather data for a location
	*/

	// Request weather from forecast.io with a latitude/longitude
	function getWeatherWithPos(lat,lng) {
		// Construct the url to request
		apiURL += "/" + lat + "," + lng;
		console.log(apiURL);

		// Make a request to forecast.io
		$.ajax({
			url: apiURL,
			type: "GET",
			crossDomain: true,
            dataType: 'jsonp',
			success: function (response) {
				// The request succeeded
				console.log(response);
				parseWeather(response);
				$('#loader').remove();
			},
			error: function (xhr, status) {
				// The request failed
		    	console.log(status);
		    	$('#loader').remove();
		    	showError();
			}
		});
	}

	// Show an error if we can't access the weather
	function showError(){
		$('#temp').text('Oh no! Your forecast is currently unavailable.');
		$('body').css('background-color','rgb(240,14,10');	
	}

	/*
		3. Insert weather data into app and stylize
	*/

	// Parse and use the weather values from the forecast.io JSON
	function parseWeather(data) {
		var precipColor = getPrecipColor(data.currently.precipProbability);
		var tempColor	= data.currently.apparentTemperature;
		windSpeed = data.currently.windSpeed;
		$('#temp').text("Currently: " + data.currently.apparentTemperature);
		$('#temp').addClass('degrees');
		$('body').css('background-color',precipColor);
		addWindAnimation();
	}


	// Convenience function - returns 1 of 4 colors based on the perciptation percentage
	function getPrecipColor(precipitation) {
		if ( precipitation > .75 ) 
			return	'#3686FF';
		if ( precipitation > .50 ) 
			return	'#A8BDD8';
		if ( precipitation > .25 ) 
			return	'#C6DFFF';
		return '#FFFFFF';
	}

	var windSpeed;
	function addWindAnimation(){
		$('#temp').animate({ left: '+='+windSpeed  }, 2000 )
				  .animate({left: '-='+ windSpeed  },2000,addWindAnimation);
	}

});