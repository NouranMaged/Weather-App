
// Personal API Key for OpenWeatherMap API
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=" 
const apiKey = '&appid=6ef33cc10fc5a40089a5a753e5c6123f&units=imperial';

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  if (document.getElementById("zip").value === "") {
    return alert("Enter Zip Code!");
  } else {
    const userZip = document.getElementById("zip").value;
    //const userZip = 94040;
    const userResponse = document.getElementById("feelings").value;
    getWeatherData(baseURL+userZip+apiKey).then(function (data) {
      postData("/addData", {
        temperature: data.main.temp,
        date: data.timezone,
        user_response: userResponse,
      }).then(()=>updateUI());
    });
  }
}

// TODO-Async GET
const getWeatherData = async (url = "") => {
  const response = await fetch(url);
  try {
    const newData = await response.json();
    console.log("getData", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  console.log("postData", data);
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    console.log("newData", newData);
    return newData;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    console.log("allData", allData.reverse());
    let d = new Date(allData[0].date);
    let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
    document.getElementById("date").innerHTML = newDate;
    document.getElementById("temp").innerHTML = allData[0].temperature;
    document.getElementById("content").innerHTML = allData[0].user_response;
  } catch (error) {
    console.log("error", error);
  }
};
