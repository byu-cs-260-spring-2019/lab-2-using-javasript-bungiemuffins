window.onload = function() {
    document.getElementById("weatherSubmit").addEventListener("click", async function(event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "")
        return;
        console.log(value);

        const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=4f4b58f4ef4729724eb1e4382ef25bb0";
        try{
            //trying to do something that might fail
            const response = await fetch(url);
            //console.log("response:", response);
            const json = await response.json();
            console.log("json:",json)


            let results = "";
            //try to change background pic.
            var today = new Date();
            var time = today.getHours;
            var night = false;
            var weatherDescriptor = json.weather[0].main;
            var weatherImageURL = "";
            if(time >= 21 && time <= 5) {
                night = true;
            }
            switch(weatherDescriptor) {
                case 'Clear':
                    weatherImageURL += 'clearSky';
                    break;
                case 'Snow':
                    weatherImageURL += 'snow';
                    break;
                case 'Clouds':
                    weatherImageURL += 'cloudy';
                    break;
                case 'Rain':
                    weatherImageURL += 'rainy';
                    break;
                default:
                    weatherImageURL += 'clearSky';
                    break;
            }
            if(night = true){
                weatherImageURL += 'Night';
            }
            else{
                weatherImageURl += 'Day';
            }
            results += '<div class="weatherContainer" style="background-image: url(images/' + weatherImageURL + '.jpg)">';


            results += '<h2>Weather in ' + json.name + "</h2>";
            for (let i=0; i < json.weather.length; i++) {
                results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
            }
            results += '<h2>' + json.main.temp + " &deg;F</h2>"
            results += "<p>"
            for (let i=0; i < json.weather.length; i++) {
                results += json.weather[i].description;
                if (i !== json.weather.length - 1)
                    results += ", ";
            }
            results += "</p>";

            results += "</div>";

            document.getElementById("weatherResults").innerHTML = results;

        }
        catch(err){
            console.log(err);
        }

        //fetching the forecast
        const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial" + "&APPID=4f4b58f4ef4729724eb1e4382ef25bb0";
        try{
            const response = await fetch(url2);
            const json = await response.json();
            console.log("json: ", json);

            let forecast = "";
            //changing background pic of each forecast;
            for (let i = 0; i <json.list.length; i++){
                //looping to get the background pic for each forecast
                var night = false;
                var weatherImageURL = "";
                var date = json.list[i].dt_txt;
                var time = '';
                time += date.charAt(11);
                time += date.charAt(12);
                var weatherDescriptor = json.list[i].weather.main;
                if(time >= 21 && time <= 5) {
                    night = true;
                }
                switch(weatherDescriptor) {
                    case 'Clear':
                        weatherImageURL += 'clearSky';
                        break;
                    case 'Snow':
                        weatherImageURL += 'snow';
                        break;
                    case 'Clouds':
                        weatherImageURL += 'cloudy';
                        break;
                    case 'Rain':
                        weatherImageURL += 'rainy';
                        break;
                    default:
                        weatherImageURL += 'clearSky';
                        break;
                }
                if(night = true){
                    weatherImageURL += 'Night';
                }
                else{
                    weatherImageURl += 'Day';
                }
    
                forecast += '<div class="weatherContainer" style="background-image: url(images/' + weatherImageURL + '.jpg)">';
                //forecast content
                forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
                forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
                forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'

                forecast += "</div>";
            }
            document.getElementById("forecastResults").innerHTML = forecast;
        }
        catch(err){
            console.log(err);
        }

        /*.then(function(response) {
            return response.json();
          }).then(function(json) {	
            console.log(json);
          });
        */
    });
}