$(document).ready(function() {

	$.getJSON("js/weather.json", function(data) {
        for ( var i = 0; i < data.daily.data.length; i++) {
        	var dailyWeather = data.daily.data[i];
        	var cloudColor = 1.0 - dailyWeather.cloudCover;
        	var day = $('li').get(i);
        	console.log(dailyWeather);
        	$(day).css( {opacity : cloudColor} );
        }
    });
});