import "./index.scss";
console.log("ciao");
// fetch si aspetta: nome dell'api, method:"stringa", body:"stringa"
fetch("http://localhost:5001/test", {
    method:"POST",
    headers: {
        "Content-Type": "application/json"
    },
    //stringify per trasforma i parametri in stringa
    body: JSON.stringify({
        nome: "Amir",
        cognome: "Gheser"
    })
}).then(async (response)=>{
    const responseText = await response.text();
    console.log(responseText);
});

//document per riferirsi ad index.html
const verticalMenu = document.querySelector(".vertical-menu");

document.querySelector("#menu-button").addEventListener("click", (e) => {
    verticalMenu.classList.add("visible");
    e.stopPropagation();
});
document.querySelector("#menu-button2").addEventListener("click", (e) => {
    verticalMenu.classList.add("visible");
    e.stopPropagation();
});

verticalMenu.addEventListener("click", (e) => {
    e.stopPropagation();
})

document.body.addEventListener("click", () => {
    if (verticalMenu.classList.contains("visible")){
        verticalMenu.classList.remove("visible");
    }
})

