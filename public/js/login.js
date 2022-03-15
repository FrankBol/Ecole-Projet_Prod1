const getAccessToken = () => {
    return window.localStorage.getItem("ACCESS_TOKEN");
}
const token = getAccessToken();
if (!!token) {
    window.location.replace("/profil");
}
let a = document.querySelector("#email");

const login = async () => {
    const emailValue = document.getElementById("email").value;
    const passwordValue = document.getElementById("password").value;

    if (!!emailValue && !!passwordValue) {
        const body = JSON.stringify({
            email: emailValue,
            password: passwordValue
        });

        const response = await fetch("https://ski-api.herokuapp.com/login", {

            method: "POST",
            body,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }

        });
        const data = await response.json();

        if (!!data.token) {
            window.localStorage.setItem("ACCESS_TOKEN", data.token);
            window.localStorage.setItem("NAME", data.name);
            window.localStorage.setItem("EMAIL", data.email);
            window.location.replace("/profil");
        }
    }
};