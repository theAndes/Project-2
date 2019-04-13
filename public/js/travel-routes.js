let APP_ID_HERE = "qXr6JxTSNIjGC5Oz6R2u";
let APP_CODE_HERE = "dYXcTWDO6R-CHChaYaULZA";

// by default, Austin...
let coordinates = "30.2672,97.7431";

$("#addressSubmit").on("click", function () {
    event.preventDefault();
    // FORM VALIDATION
    if ($("#address1").val().trim() === "" && $("#address2").val().trim() === "") {
        $("#add1-validation").show();
        $("#add2-validation").show();
    }
    if ($("#address1").val().trim() !== "" && $("#address2").val().trim() !== "") {
        $("#add1-validation").hide();
        $("#add2-validation").hide();
        validTravelSubmit();
    }
    if ($("#address1").val().trim() === "" && $("#address2").val().trim() !== "") {
        $("#add1-validation").show();
        $("#add2-validation").hide();
    }
    if ($("#address1").val().trim() !== "" && $("#address2").val().trim() === "") {
        $("#add2-validation").show();
        $("#add1-validation").hide();
    }

    function validTravelSubmit() {
        var address1 = $("#address1")
            .val()
            .trim();
        var address2 = $("#address2")
            .val()
            .trim();
        console.log(address1);
        var address1Encoded = address1.replace(/\s|, /gi, "+");
        var address2Encoded = address2.replace(/\s|, /gi, "+");
        var add1CoordURL =
            "https://api.tomtom.com/search/2/geocode/" +
            address1Encoded +
            ".json?typeahead=true&key=gjYKsyv64Bl7JdFG9ZOJz16rqIaAtT4L";
        var add2CoordURL =
            "https://api.tomtom.com/search/2/geocode/" +
            address2Encoded +
            ".json?typeahead=true&key=gjYKsyv64Bl7JdFG9ZOJz16rqIaAtT4L";
        console.log("add1CoordURL: " + add1CoordURL);
        $.ajax({
            url: add1CoordURL,
            method: "GET"
        }).done(function (response) {
            var add1LatLong =
                response.results[0].position.lat +
                "," +
                response.results[0].position.lon;
            console.log("add1LatLong: " + add1LatLong);
            $.ajax({
                url: add2CoordURL,
                method: "GET"
            }).done(function (response) {
                var add2LatLong =
                    response.results[0].position.lat +
                    "," +
                    response.results[0].position.lon;
                console.log("add2LatLong: " + add2LatLong);

                var dayNoTime = moment().format().replace(/T.*/, "");

                // REMOVED until can get from database &arriveAt=" + arrivalTime +//
                var routeURL =
                    "https://api.tomtom.com/routing/1/calculateRoute/" +
                    add1LatLong +
                    ":" +
                    add2LatLong +
                    "/json?instructionsType=text&routeRepresentation=polyline&computeTravelTimeFor=all&routeType=fastest&avoid=tollRoads&travelMode=car&key=gjYKsyv64Bl7JdFG9ZOJz16rqIaAtT4L";
                console.log("routeURL: " + routeURL);
                $.ajax({
                    url: routeURL,
                    method: "GET"
                }).done(function (response) {
                    var travelTimeSecs =
                        response.routes[0].summary
                            .liveTrafficIncidentsTravelTimeInSeconds;
                    var secDur = moment.duration(travelTimeSecs, "seconds");
                     var formTravelTime =
                        travelTimeSecs > 3600
                            ? secDur.format("h:mm") + " h"
                            : Math.floor(secDur.asMinutes()) + " mins";
                    console.log(formTravelTime);
                    var directionsURL = "https://www.google.com/maps/dir/?api=1&origin=" + address1Encoded + "&destination=" + address2Encoded;
                    console.log(directionsURL);
                    $("#traffic").html("<div id='traffic'>Current travel time to your destination is: <span style='color: #de751f'><h3 style='font-weight: bold'>" + formTravelTime + "</h3></span></div><button id='directions-link' class='btn btn-secondary' type='button' style='background-color:#8d7147'><a target='_blank' style='color:black' href='" + directionsURL + "'>GET DIRECTIONS</a></button>")
                });
            });
        });
    }
});



$("#address1").autocomplete({
    source: fullAC,
    minLength: 2,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " with LocationId " + ui.item.id);
    }
});

$("#address2").autocomplete({
    source: fullAC,
    minLength: 2,
    select: function (event, ui) {
        console.log("Selected: " + ui.item.value + " with LocationId " + ui.item.id);
    }
});

// Combination of both Address and Place autocomplete
function fullAC(query, callback) {

    let p1 = $.getJSON("https://places.cit.api.here.com/places/v1/autosuggest?at=" + coordinates + "&result_types=Place" + "&q=" + query.term + "&app_id=" + APP_ID_HERE + "&app_code=" + APP_CODE_HERE);
    let p2 = $.getJSON("https://autocomplete.geocoder.api.here.com/6.2/suggest.json?prox=" + coordinates + "&query=" + query.term + "&app_id=" + APP_ID_HERE + "&app_code=" + APP_CODE_HERE);

    console.log("p1: " + p1);
    console.log("p2: " + p2);

    $.when(p1, p2).done(function (data1, data2) {

        //data1 is from Places autosuggest
        var places = data1[0].results.filter(place => place.vicinity);
        places = places.map(place => {
            return {
                title: place.title,
                value: place.title + ', ' + place.vicinity.replace(/<br\/>/g, ", "),
                distance: place.distance,
                id: place.id
            };
        });

        // data2 is from address autocomplete
        var addresses = data2[0].suggestions;
        addresses = addresses.map(addr => {
            return {
                title: addr.label,
                value: addr.label.split(', ').reverse().join(', '),
                distance: addr.distance,
                id: addr.locationId
            };
        });

        // lets merge the two arrays into the first
        $.merge(places, addresses);

        // let's sort by distance
        places.sort(function (p1, p2) { return p1.distance - p2.distance });

        // limit display to 10 results
        return callback(places.slice(0, 10));
    })
}


$("#current-location").click(function () {
    event.preventDefault();
    $("#address1").val(currentLocation)
});


