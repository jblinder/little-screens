$(document).ready(function() {

    // Mock data for testing
    var weeklyForecast = ["clear-day", "rain", "rain", "wind", "cloud", "cloud", "fog"];
    for ( var i = 0; i < weeklyForecast.length; i++) {
        var dailyWeather = weeklyForecast[i];
        var day = $('li').get(i);
        var color = parseDay(dailyWeather);
        $(day).css( 'background-color', color );
    }

    function parseDay(condition){

    	switch(condition) {
    		case "clear-day":
    		case "clear-night":	
                var color = "rgb(200,200,0)";
                break;
    		case "rain":
    		case "snow":
    		case "sleet":
                var color = "rgb(0,0,200)";
                break;
    		case "wind":
    		case "fog":
    		case "cloudy":
    		case "partly-cloudy-day":
    		case "partly-cloudy-night":
                var color = "rgb(125,125,125)";
                break;
    		default:
    			break;	
    	}
        return color;

    }
});