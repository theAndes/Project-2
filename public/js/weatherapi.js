function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(queryApi);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
function queryApi(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // eslint-disable-next-line prettier/prettier
    var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c862563a11d6e79b149ee1ac7e419121/"+ lat + "," + long;
    $.ajax({
        url: queryUrl,
        type: "GET"
    }).then(function(response) {
        console.log(response);
        var summary = response.daily.data[0].summary;
        var highTemp = Math.round(
            response.daily.data[0].apparentTemperatureHigh
        );
        var lowTemp = Math.round(response.daily.data[0].apparentTemperatureLow);
        var precipType = response.daily.data[0].precipType;
        var precipProb =
            Math.round(response.daily.data[0].precipProbability) * 100 +
            "% chance of " +
            precipType;
        $("#demo").html(
            summary +
                "<br>" +
                "High: " +
                highTemp +
                "&#176" +
                "<br>" +
                "Low: " +
                lowTemp +
                "&#176" +
                "<br>" +
                precipProb
        );
    });
}
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(queryApi);
} else {
    console.log("Geolocation is not supported by this browser.");
}
function queryApi(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    // eslint-disable-next-line prettier/prettier
    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/c862563a11d6e79b149ee1ac7e419121/" + lat + "," + long;
    $.ajax({
        url: url,
        type: "GET"
    }).then(function(response) {
        console.log(response);
        var summary = response.daily.data[0].summary;
        var highTemp = Math.round(
            response.daily.data[0].apparentTemperatureHigh
        );
        var lowTemp = Math.round(response.daily.data[0].apparentTemperatureLow);
        var precipType = response.daily.data[0].precipType;
        var precipProb =
            response.daily.data[0].precipProbability * 100 +
            "% chance of " +
            precipType;
        $("#demo").html(
            summary +
                "<br>" +
                "High: " +
                highTemp +
                "&#176" +
                "<br>" +
                "Low: " +
                lowTemp +
                "&#176" +
                "<br>" +
                precipProb
        );
    });
}
getWeather();
