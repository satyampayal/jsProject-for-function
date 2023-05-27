const searchBox=document.querySelector(".searchBox");
const searchBtn=document.querySelector(".searchBtn");
const weatherContainer=document.querySelector(".weather-container");
const temperature=document.querySelector(".temperature");
const description=document.querySelector(".description");
const humidity=document.querySelector("#humidity");
const windSpeed=document.querySelector("#wind-speed");
const weather_img=document.querySelector(".weather-image");



// fetchWeather function
async function fetchWeather(city){
    //console.log("start");

    const api_key="772c7770915b97d38112b88ad39a056e";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;


    const weatherData= await fetch(`${url}`).then(response=>
        response.json() );

    temperature.innerHTML=`${Math.round(weatherData.main.temp-273.15)}°C`;
    description.innerHTML=`${weatherData.weather[0].description}`;
    
    humidity.innerHTML=`${weatherData.main.humidity}%`;
   windSpeed.innerHTML=`${weatherData.wind.speed}Km`;


   switch(weatherData.weather[0].main){
    case 'Clouds':
        weather_img.src="./img/cloud.jpeg";
        break;
    case 'Clear':
        weather_img.src="./img/clear.jpeg";
        break;
    case 'Rain':
        weather_img.src="./img/rain.jpeg";
        break;
    case 'Snow':
        weather_img.src="./img/snow.jpeg";
        break;
    case 'Mist':
        weather_img.src="./img/mist.jpeg";
        break;
   }

    
    //console.log(weatherData);

}

// serchBtn 
searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();// hold not submit autometically


    const searchInput=searchBox.value.trim();
    fetchWeather(searchInput);
    //console.log(searchInput);//check its working or not
});

