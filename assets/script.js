var cities = [];

function startPage() {
    if(localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    
    for(i=0;i<cities.length;i++){
        addButton(cities[i]);
    }
}

function addButton(buttonText) {
    var button = $("<button>");
        button.text(buttonText).attr("id",buttonText);
        button.on("click", () => {
            getData(buttonText);
        })
        $("#history").prepend(button);
}

$("#search-button").on("click", function() {
    var searchWord = $("#search-input").val() || "sheffield";
    if(localStorage.getItem("cities") !== null) {
        cities = JSON.parse(localStorage.getItem("cities"));
    }
    if(cities.indexOf(searchWord) === -1) {
       cities.push(searchWord);
       localStorage.setItem("cities",JSON.stringify(cities));
       getData(searchWord);
       addButton(searchWord);
    }
    $("#search-input").val("");
});

function getData(callsearchWord) {
    
    var longtitude;
    var latitude;
    var queryURL1 = "https://api.openweathermap.org/data/2.5/forecast?q="+callsearchWord+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8";
    
    fetch(queryURL1)
        .then(function (data) {
          return data.json();
        }).then(function(data) {
        longtitude = data.city.coord.lon;
        latitude = data.city.coord.lat;
    });

    window.setTimeout(function() {
        var queryURL2 = "https://api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longtitude+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8&units=metric";
        var queryURL3 ="https://api.openweathermap.org/data/2.5/forecast?lat="+latitude+"&lon="+longtitude+"&appid=122837ec0c3dc22fd1d0b18bbf2d38f8&units=metric";

        fetch(queryURL2)
        .then(function (dataCurrent) {
          return dataCurrent.json();
        }).then(function(dataCurrent) {
            setCurrentData(dataCurrent);
        });

        fetch(queryURL3)
        .then(function (dataForecast) {
          return dataForecast.json();
        }).then(function(dataForecast) {
            setForecastData(dataForecast);
        });
                
    }, 200);
    window.setTimeout(function(){
        $("#dashboard").attr("style", "");
    },200);
    
}

function setCurrentData(respCurrent) {
    var iconurl = "https://openweathermap.org/img/w/" + respCurrent.weather[0].icon+ ".png";
    $("#current-icon").attr("src",iconurl);
    var day= moment().get("date");
    var month = moment().get("month") + 1;
    var year = moment().get("year")
    $("#titleToday").text("TODAY: " + "   " + day + " / " + month + " / " + year +"");
    $("#title").text(respCurrent.name);
    $("#current-temp").text("Temperature: " + respCurrent.main.temp + " °C");
    $("#current-wind").text("Wind: " + respCurrent.wind.speed + " Km/h");
    $("#current-hum").text("Humidity: " + respCurrent.main.humidity + "%");

}

function setForecastData(respFuture) {
    var iconurl1 = "https://openweathermap.org/img/w/" + respFuture.list[3].weather[0].icon+ ".png";
            $("#icon1").attr("src",iconurl1);
            $("#title1").text((respFuture.list[3].dt_txt.split(" "))[0]);
            $("#temp1").text("Temp: " + respFuture.list[3].main.temp + " °C");
            $("#wind1").text("Wind: " + respFuture.list[3].wind.speed + " Km/h");
            $("#hum1").text("Humidity: " + respFuture.list[3].main.humidity + "%");
    var iconurl2 = "https://openweathermap.org/img/w/" + respFuture.list[11].weather[0].icon+ ".png";
            $("#icon2").attr("src",iconurl2);
            $("#title2").text((respFuture.list[11].dt_txt.split(" "))[0]);
            $("#temp2").text("Temp: " + respFuture.list[11].main.temp + " °C");
            $("#wind2").text("Wind: " + respFuture.list[11].wind.speed + " Km/h");
            $("#hum2").text("Humidity: " + respFuture.list[11].main.humidity + "%");
    var iconurl3 = "https://openweathermap.org/img/w/" + respFuture.list[19].weather[0].icon+ ".png";
            $("#icon3").attr("src",iconurl3);
            $("#title3").text((respFuture.list[19].dt_txt.split(" "))[0]);
            $("#temp3").text("Temp: " + respFuture.list[19].main.temp + " °C");
            $("#wind3").text("Wind: " + respFuture.list[19].wind.speed + " Km/h");
            $("#hum3").text("Humidity: " + respFuture.list[19].main.humidity + "%");
    var iconurl4 = "https://openweathermap.org/img/w/" + respFuture.list[27].weather[0].icon+ ".png";
            $("#icon4").attr("src",iconurl4);
            $("#title4").text((respFuture.list[27].dt_txt.split(" "))[0]);
            $("#temp4").text("Temp: " + respFuture.list[27].main.temp + " °C");
            $("#wind4").text("Wind: " + respFuture.list[27].wind.speed + " Km/h");
            $("#hum4").text("Humidity: " + respFuture.list[27].main.humidity + "%");
    var iconurl5 = "https://openweathermap.org/img/w/" + respFuture.list[35].weather[0].icon+ ".png";
            $("#icon5").attr("src",iconurl5);
            $("#title5").text((respFuture.list[35].dt_txt.split(" "))[0]);
            $("#temp5").text("Temp: " + respFuture.list[35].main.temp + " °C");
            $("#wind5").text("Wind: " + respFuture.list[35].wind.speed + " Km/h");
            $("#hum5").text("Humidity: " + respFuture.list[35].main.humidity + "%");
}

startPage();