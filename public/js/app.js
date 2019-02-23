const form = document.querySelector("form");
const button = document.querySelector("#unit");
const getLocation = () =>{
  // geolocation
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showPosition);
    
  }else {
    document.body.innerHTML = "browser does not support geolocation";
  }
}
const options = {
// options for AJAX
  async:true,
  dataType:"json",
  method:"GET",
};
const KtoFahrenheit = (k) =>{
  // converts kelvin to fahrenheit
  return ( k - 273.15) * (9/5) + 32;
}
const showPosition = (position) =>{
  // get lat and lon
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  options.url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e7cb75660d6f159232ff07da46970568`;
  AJAX();
}
function AJAX(){
  // AJAX function
  const xhr = new XMLHttpRequest();
  xhr.open(options.method,options.url,options.async);
  xhr.onload = function(){
    if(this.status === 200){
      const API = JSON.parse(this.response);
      document.getElementById("temp").innerHTML = `${parseInt(KtoFahrenheit(API.main.temp))}`;
      document.getElementById("city").innerHTML = API.name + ",";
      document.getElementById("country").innerHTML = API.sys.country;
      document.getElementById("icon").innerHTML = `<img src=http://openweathermap.org/img/w/${API.weather[0].icon}.png alt="open weather app icon"/>`;
      document.getElementById("forecast").innerHTML = API.weather[0].main;
      
    } else if(this.status === 404){
      // if enter wrong location
    }
  }
  xhr.send();
}
getLocation();


form.addEventListener('submit',(evt)=>{
  evt.preventDefault();
  let city = evt.target.firstElementChild.value; // first input field
  let zip = evt.target.firstElementChild.nextElementSibling.value; // second input field
  if(city){
    // if city has a value
    options.url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e7cb75660d6f159232ff07da46970568`;
    evt.target.firstElementChild.value = ""; // resets input to empty string
    AJAX();
  } else{
    options.url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=e7cb75660d6f159232ff07da46970568`;
    AJAX();
    evt.target.firstElementChild.nextElementSibling.value = ""; // resets input to empty string
  }
  
  }
)
button.addEventListener('click',(evt)=>{
  let temp = document.querySelector('#temp')
  if(evt.target.textContent === "°F"){
    temp.textContent = `${parseInt((temp.textContent  - 32) * 5/9 )} `;
    evt.target.style.backgroundColor = "blue";
    evt.target.textContent = `°C`;
  } else {
    temp.textContent = `${parseInt((temp.textContent  * 9/5) + 32 )}`;
    evt.target.style.backgroundColor = "red";
    evt.target.textContent = `°F`;
  }
})