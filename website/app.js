/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let key = '0ec19b9d2de7f0fdcc648f9a086c83dc';
const addBaseURL = ',us&units=imperial&appid=';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+ 1) +'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getTemperature(baseURL, zipCode, key)
    .then(function (data){
        console.log(data);
        // Add data to POST request
        postData('/addWeatherData', {temperature: data.main.temp, date: newDate, user_response: feelings } );
    })
        // Function which updates UI
        .then(
            updateUI()
        );
    };

const getTemperature = async(baseURL, zipCode, key)=>{
    const response = await fetch(baseURL + zipCode + addBaseURL + key);
    try{
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error){
        console.log('error', error);
    }
}




// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
  
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('error', error);
    }
}

// Update user interface
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temperature;
        document.getElementById('content').innerHTML = allData.user_response;
    }
    catch (error) {
        console.log('error', error);
    }
}