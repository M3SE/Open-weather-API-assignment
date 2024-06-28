async function getWeather() {
    const zipCode = document.getElementById('zipCode').value;
    const apiKey = '67a91b9db4448719864c584b1913a235'; // Replace with your actual API key
    
    // API URL to get latitude and longitude from zip code
    const geoApiUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},US&appid=${apiKey}`;

    try {
        // Fetch latitude and longitude
        const geoResponse = await fetch(geoApiUrl);
        if (!geoResponse.ok) {
            throw new Error('Network response was not ok ' + geoResponse.statusText);
        }
        const geoData = await geoResponse.json();
        const latitude = geoData.lat;
        const longitude = geoData.lon;
        
        // API URL to get weather data using latitude and longitude
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
        
        // Fetch weather data
        const weatherResponse = await fetch(weatherApiUrl);
        if (!weatherResponse.ok) {
            throw new Error('Network response was not ok ' + weatherResponse.statusText);
        }
        const weatherData = await weatherResponse.json();
        
        // Parse and display the required data points
        document.getElementById('currentDate').textContent = new Date().toLocaleDateString();
        document.getElementById('city').textContent = weatherData.name;
        document.getElementById('temperature').textContent = weatherData.main.temp;
        document.getElementById('conditions').textContent = weatherData.weather[0].description;
        document.getElementById('tempHiLo').textContent = `${weatherData.main.temp_max} / ${weatherData.main.temp_min}`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again.');
    }
}




// 67a91b9db4448719864c584b1913a235 this is the api key