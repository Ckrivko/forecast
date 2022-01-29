function attachEvents() {

    let locationEl = document.getElementById('location');
    let submitBtn = document.getElementById('submit')
    let forecastEl = document.querySelector('#forecast');
    let divCurrentEl = document.querySelector('#current');
    let divUpcomingEl = document.querySelector('#upcoming');



    submitBtn.addEventListener('click', weatherHandler)

    function weatherHandler() {
        
        if (divCurrentEl.children[0].textContent == 'Error') {

            console.log('We have problem')
            divUpcomingEl.style.display = 'block';
            divCurrentEl.children[0].textContent='Current conditions';

        }

        let forecastElements = Array.from(document.getElementsByClassName('forecast'));
        let forecastElementsPrev = Array.from(document.getElementsByClassName('forecast-info'));

        forecastElements.forEach(el => el.remove());
        forecastElementsPrev.forEach(el => el.remove());

        let currLocation = locationEl.value;

        fetch('http://localhost:3030/jsonstore/forecaster/locations/')
            .then(res => res.json())
            .then(data => {

                let location = Object.values(data).find(el => el.name == currLocation)
                let code = location.code;
                return fetch(`http://localhost:3030/jsonstore/forecaster/today/${code}`)
                    .then(res => res.json())
                    .then(data => {

                        createCurrentWeatherEl(data);

                        forecastEl.style.display = 'block'

                        return fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${code}`)
                    })
                    .then(res => res.json())
                    .then(dataPrev => {

                        console.log(dataPrev.name)

                        createThreeDaysWeather(dataPrev);


                    })

                    .catch(err => {

                        console.log(err);
                    })

            })
            .catch(err => {
                forecastEl.style.display = 'block'
               divCurrentEl.children[0].textContent='Error';
                
               divUpcomingEl.style.display='none';
                
            })
    }

    function createCurrentWeatherEl(data) {

        let name = data.name;
        let condition = data.forecast.condition;
        let high = data.forecast.high;
        let low = data.forecast.low;

        let divForecast = document.createElement('div');
        divForecast.className = 'forecast';
        let spanSymbol = document.createElement('span');
        spanSymbol.className = 'condition symbol';
        spanSymbol.textContent = `${weatherIcon(condition)}`


        let spanCondition = document.createElement('span');
        spanCondition.className = 'condition';


        let spanName = document.createElement('span');
        spanName.className = 'forecast-data';
        spanName.textContent = name;

        let spanDegrees = document.createElement('span');
        spanDegrees.className = 'forecast-data';
        spanDegrees.textContent = `${high}° /${low}°`

        let spanIcon = document.createElement('span');
        spanIcon.className = 'forecast-data';
        spanIcon.textContent = condition;

        spanCondition.appendChild(spanName);
        spanCondition.appendChild(spanDegrees);
        spanCondition.appendChild(spanIcon);

        divForecast.appendChild(spanSymbol);
        divForecast.appendChild(spanCondition);

        divCurrentEl.appendChild(divForecast);

    }

    function createThreeDaysWeather(data) {

        console.log(data)
        let divForecast = document.createElement('div');
        divForecast.className = 'forecast-info';

        data.forecast.forEach(el => {

            console.log(el)
            let spanUpcoming = document.createElement('span');
            spanUpcoming.className = 'upcoming';

            let spanSymbol = document.createElement('span');
            let spanDegrees = document.createElement('span');
            let spanCondition = document.createElement('span');

            spanSymbol.className = 'symbol';
            spanDegrees.className = 'forecast-data';
            spanCondition.className = 'forecast-data';

            spanSymbol.textContent = weatherIcon(el.condition);
            spanDegrees.textContent = `${el.high}°/${el.low}°`;
            spanCondition.textContent = `${el.condition}`;

            spanUpcoming.appendChild(spanSymbol);
            spanUpcoming.appendChild(spanDegrees);
            spanUpcoming.appendChild(spanCondition);

            divForecast.appendChild(spanUpcoming);

        })

        divUpcomingEl.appendChild(divForecast);

    }




}


function weatherIcon(input) {

    switch (input) {
        case 'Rain': return '☂';
            break;
        case 'Sunny': return '☀';
            break;
        case 'Partly sunny': return '⛅';
            break;
        case 'Overcast': return ' ☁';
            break;

        default:
            break;
    }

}


// Sunny &amp;#x2600; // ☀
//  Partly sunny &amp;#x26C5; // ⛅
//  Overcast &amp;#x2601; // ☁
//  Rain &amp;#x2614; // ☂
//  Degrees &amp;#176; //
// °


attachEvents();



// let divForecast = document.createElement('dvi')
                        // divForecast.className = 'forecast';

                        // let spanSymbol = document.createElement('span');
                        // spanSymbol.className = 'condition symbol';
                        // spanSymbol.textContent = `${weatherIcon(condition)}`;

                        // let spanCondition = document.createElement('span');
                        // spanCondition.className = 'condition';


                        // let spanName = document.createElement('span');
                        // spanName.className = 'forecast-data';
                        // spanName.textContent = name;

                        // let spanDegrees = document.createElement('span');
                        // spanDegrees.className = 'forecast-data';
                        // spanDegrees.textContent = `${high}° /${low}°`

                        // let spanIcon = document.createElement('span');
                        // spanIcon.className = 'forecast-data';
                        // spanIcon.textContent = condition;

                        // spanCondition.appendChild(spanName);
                        // spanCondition.appendChild(spanDegrees);
                        // spanCondition.appendChild(spanIcon);

                        // divForecast.appendChild(spanSymbol);
                        // divForecast.appendChild(spanCondition);

                        // divCurrentEl.appendChild(divForecast);
