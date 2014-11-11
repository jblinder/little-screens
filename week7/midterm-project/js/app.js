$(document).ready(function(){

	// Setup variables for our forecast.io request
	var apiKey     = 'a586d11648043cec0b74207005ff6a5d';
	var apiURL     = 'https://api.forecast.io/forecast/' + apiKey; 
	var defaultLat = '40.6760148';
	var defaultLng = '-73.9785012';
	var flickrURL  = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c9467f1387e9e9d88b3294f6c9ec6cfb&tags=sunny&format=json&api_sig=528c5fb3611f7c43a8676c0a5c81b7dc';
	/*
		1. Request the user's location via their browser
	*/
	getWeatherWithPos();
	// Request the user's latitude/longitude
	if ( Modernizr.geolocation ) {
		navigator.geolocation.getCurrentPosition(success, error);
	}
	else {
		showError();
	}

	// Recieved a latitude/longitude from the browser
	function success(position) {

		console.log(position);
		console.log(apiURL);
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
		// https://api.forecast.io/forecast/a586d11648043cec0b74207005ff6a5d 
		apiURL += "/" + lat + "," + lng;
		console.log(apiURL);

		// Make a request to forecast.io
		$.ajax({
			url: flickrURL,
			type: "GET",
			crossDomain: true,
            dataType: 'jsonp',
			success: function (response) {
				var photo = response.photo[0];
				var url = 'http://farm'++'.staticflickr.com/'++'/'++'_'++'.jpg';
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


	/*
		3. Insert weather data into app and stylize
	*/

	// Parse and use the weather values from the forecast.io JSON
	function parseWeather(data) {
		var today = data.daily.data[0];
		var tomorrow = data.daily.data[1];
		var nextDay  = data.daily.data[2];
		
		$('#temp').text("The high today is" + today.temperatureMax + "and the low is " + today.temperatureMin);
		console.log(today);
		console.log(tomorrow);
		console.log(nextDay);
		//var precipColor = getPrecipColor(data.currently.precipProbability);

		// windSpeed = data.currently.windSpeed;
		// $('#temp').text("Currently: " + Math.floor(data.currently.apparentTemperature));
		// $('#temp').addClass('degrees');
		// $('body').css('background-color',precipColor);
		// addWindAnimation();
	}

	// Show an error if we can't access the weather
	function showError(){
		$('#temp').text('Oh no! Your forecast is currently unavailable.');
		$('body').css('background-color','rgb(240,14,10');	
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
				  .animate({left: '-='+ windSpeed  },2000, addWindAnimation);
	}

});