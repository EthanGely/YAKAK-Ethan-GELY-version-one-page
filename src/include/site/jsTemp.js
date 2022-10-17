//Cette fonction ajoute les destinations contenues dans la variable globale "destinations".
//Attention : Seules les elements contenus dans la variable seront affichés.
//Les autres éléments seront supprimés

var destinations = [];

function afficheDestinations() {
    console.log("AfficheDest")
    let tbody = document.getElementById("destinations").querySelector("tbody");
    tbody.innerHTML = "";

    for (let i = 0; i < destinations.length; i++) {
        let tr = document.createElement("tr");


        let td1 = document.createElement("td");
        td1.innerText = destinations[i]["destination"].substring(0,1).toUpperCase() + destinations[i]["destination"].substring(1);

        let img = document.createElement("img");
        if (destinations[i]["image"].includes("data:image/") || destinations[i]["image"].includes("https://") || destinations[i]["image"].includes("http://")){
            img.src = destinations[i]["image"];
        }else{
            img.src = "../images/" + destinations[i]["image"];
        }
        img.alt = destinations[i]["destination"].split(".")[0];

        td1.appendChild(img);
        tr.appendChild(td1);


        let td2 = document.createElement("td");
        td2.innerText = destinations[i]["offre"];

        tr.appendChild(td2);

        let td3 = document.createElement("td");
        td3.innerText = destinations[i]["prix"];

        tr.appendChild(td3);

        let td4 = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "Découvrir l'offre";

        td4.appendChild(button);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}




//Cette fonction ajoute une entrée dans la liste des destinations, et met à jour la page.
//Il suffit de fournir un array comme suit (avec une ou plusieurs destinations) :
// ATTENTION : bien noter qu'il y a un array imbriqué dans un autre array (comme si on stockait des objets "destination" dans un array).
//  [
//      {
//          image : "espagne.png", //-- l'image doit être placée dans le dossier "images". Seul le nom et l'extension doivent être précisé (pas besoin du chemin). Le nom de l'image sera utilisé dans le "alt" --//
//          destination : "Espagne", //-- Le nom de la destination (une majuscule est mise automatiquement). --//
//          offre : "Circuit plage, hôtel 4 *", //-- description de l'offre --//
//          prix : "800 €" //-- Prix de l'offre --//
//      },
//
//      {
//          image : "maroc.png",
//          destination : "Maroc",
//          offre : "Circuit Oasis, hôtel 4 *",
//          prix : "1000 €"
//      }
//  ]

function addDestinations(destinationsToAdd) {
    for (let i = 0; i < destinationsToAdd.length; i++) {
        //recherche dans un array sans casse
        if (destinations.find(({ destination }) => destination.toLocaleLowerCase() === destinationsToAdd[i]["destination"].toLocaleLowerCase()) === undefined){
            destinations.push(destinationsToAdd[i]);
        }else {
            const index = destinations.indexOf(destinationsToAdd[i]["destination"]);
            if (index > -1) {
                destinations.splice(index, 1);
                destinations.push(destinationsToAdd[i]);
            }
        }
    }
    localStorage.setItem("destinations", JSON.stringify(destinations));
}


function removeDestination(destToRemove) {
    const index = destinations.indexOf(destToRemove);
    if (index > -1) {
        destinations.splice(index, 1);
        afficheDestinations();
    }
}

function init() {

    getDestinations().then(r => afficheDestinations());
}

/////////////Pour le navigateur///////////////////////
function clear() {
    localStorage.clear();
}

function addDest() {
    let dest = [{"image": "https://voyagerloin.com/countries/italie.jpg",
        "destination" : "Italie",
        "offre" : "Circuit Venezia, hôtel 4 *",
        "prix" : "8000 €"}];
    addDestinations(dest);
    afficheDestinations();
}

function rmDest() {
    removeDestination("Maroc");
}

async function getDestinations() {
    const dest = localStorage.getItem('destinations');
    //Si il n'y a pas de destinations enregistrées, on ajoute la liste de base
    if (dest == undefined) {
        const requestURL = '../data/destination.json';
        const request = new Request(requestURL);

        const response = await fetch(request);
        destinations = await response.json();
        localStorage.setItem("destinations", JSON.stringify(destinations));


        //Sinon, on utilise la liste enregistrée
    }else{
        destinations = JSON.parse(dest);
    }
}
