function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(queryApi);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
function queryApi(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    coordinates = lat + "," + long;
    // eslint-disable-next-line prettier/prettier
    var queryUrl = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/b303671769b2b1c088768ac04dd1b7a7/" + lat + "," + long;
    $.ajax({
        url: queryUrl,
        type: "GET"
    }).then(function (response) {
        var summary = response.daily.data[0].summary;
        var highTemp = Math.round(
            response.daily.data[0].apparentTemperatureHigh
        );
        var lowTemp = Math.round(response.daily.data[0].apparentTemperatureLow);
        var precipType = response.daily.data[0].precipType;
        if (response.daily.data[0].precipType === undefined) {
            precipType = "precipitation";
        }
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

    let MQ_KEY = "6KiSyVT6eCBOACnPMSNKOBf9BsMiWRaA";
    $.ajax({
        url:
            "http://www.mapquestapi.com/geocoding/v1/reverse?key=" + MQ_KEY + "&location=" + lat + "," + long + "&includeRoadMetadata=true&includeNearestIntersection=true",
        method: "GET"
    }).then(function (response) {
        console.log(response);
        currentLocation = response.results[0].locations[0].street + ", " + response.results[0].locations[0].adminArea5 + ", " + response.results[0].locations[0].adminArea3
    });
}

getWeather();
