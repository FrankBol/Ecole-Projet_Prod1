const name = window.localStorage.NAME;
const email = window.localStorage.EMAIL;
const tokenValue = window.localStorage.ACCESS_TOKEN;

const emailValue = document.getElementById("email");
const nameValue = document.getElementById("name");
const deconnexion = document.getElementById("deconnexion");

nameValue.textContent = name;
emailValue.textContent = email;

if(!tokenValue){
    window.location.replace("/login");
}

deconnexion.addEventListener("click", () => {
    window.localStorage.clear();
    window.location.replace("/login");
});

// let token = window.localStorage.ACCESS_TOKEN;

// const body = JSON.stringify({ email: emailValue});

// const response =  fetch("https://ski-api.herokuapp.com/login", {       
//     method: "GET",
//     body,
//      headers : { 
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
    
//   });
