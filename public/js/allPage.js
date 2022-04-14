logo = () => C.assign("/");
imgProfil = () => window.location.assign("/users/profil");

let pagination = document.querySelectorAll("#pagination[href]");


for (var i = 0; i < pagination.length + 1; i++) {
    console.log(pagination.length);
    console.log(window.location.href);
    console.log(window.origin + "/" + i);
    
    if(window.location.href == window.origin + "/" + i){
        console.log(window.location.href);
        console.log(window.origin + "/" + i);
        console.log(i);
        pagination[i-1].style="font-size: 2.5rem"
    }

    
}

// nextPrev => {
//     for (var i = 0; i < pagination.length + 1; i++) {
//         console.log(pagination.length);
//         console.log(window.location.href);
//         console.log(window.origin + "/" + i);
        
//         if(window.location.href == window.origin + "/" + i){
//             console.log(window.location.href);
//             console.log(window.origin + "/" + i);
//             console.log(i);
//             pagination[i-1].style="font-size: 2.5rem"
//         }
// }

// }
