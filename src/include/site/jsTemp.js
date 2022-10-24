//Variable globale qui contient les destinations du tableau
var destinations = [];


//Fonction lancée à l'initialisation
function init2() {
    //On attend de récupérer les destinations, puis on les affiche
    getDestinations().then(r => afficheDestinations());
}


//Récupère un tableau de destinations via le localStorage ou un fichier s'il n'existe pas
async function getDestinations() {
    //On essaye de récuperer le local storage
    const dest = localStorage.getItem('destinations');
    //S'il n'y a pas de destinations enregistrées, on ajoute la liste de base (contenue dans un fichier)
    //Et on met le contenu de cette liste dans le local storage
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


//Cette fonction ajoute les destinations contenues dans la variable globale "destinations".
//Attention : Seules les elements contenus dans la variable seront affichés.
//Les autres éléments seront supprimés

function afficheDestinations() {
    //On récupère le corps du tableau et on le vide
    let tbody = document.getElementById("bodyDestination");
    tbody.innerHTML = "";

    //Pour chaque nouvelle destination
    for (let i = 0; i < destinations.length; i++) {
        //On crée un élément <tr> (une ligne)
        let tr = document.createElement("tr");

        //Puis une cellule, dans laquelle on ajoute le nom de la destination (avec une maj au début)
        let td1 = document.createElement("td");
        td1.innerText = destinations[i]["destination"].substring(0,1).toUpperCase() + destinations[i]["destination"].substring(1);

        //On crée une image, puis selon le type (lien internet ou lien local) on ajoute la source
        let img = document.createElement("img");
        if (destinations[i]["image"].includes("data:image/") || destinations[i]["image"].includes("https://") || destinations[i]["image"].includes("http://")){
            img.src = destinations[i]["image"];
        }else{
            img.src = "../images/" + destinations[i]["image"];
        }
        //Puis le texte alt de l'image sera "image" + destination
        img.alt = "Image " + destinations[i]["destination"];

        //On ajoute l'image dans la balise <td>, puis on ajoute ce <td> dans le <tr>
        td1.appendChild(img);
        tr.appendChild(td1);

        //On crée un autre <td>, puis on note le nom de l'offre
        let td2 = document.createElement("td");
        td2.innerText = destinations[i]["offre"];

        //et on ajoute ce <td> au <tr>
        tr.appendChild(td2);

        //On crée un autre <td>, puis on note le prix de l'offre
        let td3 = document.createElement("td");
        td3.innerText = destinations[i]["prix"];

        //et on ajoute ce <td> au <tr>
        tr.appendChild(td3);

        //On crée un ultime <td> où on crée le bouton pour visualiser l'offre
        let td4 = document.createElement("td");
        let button = document.createElement("button");
        button.innerText = "Découvrir l'offre";

        //On ajoute le bouton au td, puis le td au tr, et finalement le tr au tbody
        td4.appendChild(button);
        tr.appendChild(td4);

        tbody.appendChild(tr);
    }
}




//Cette fonction ajoute une entrée dans la liste des destinations, puis met à jour la page.
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
            //Si la destination n'existe pas, on l'ajoute à l'array
            destinations.push(destinationsToAdd[i]);
        }else {
            //Sinon, si la destination existe,
            //On trouve son index, et on la remplace par la nouvelle
            const index = destinations.indexOf(destinationsToAdd[i]["destination"]);
            if (index > -1) {
                destinations.splice(index, 1);
                destinations.push(destinationsToAdd[i]);
            }
        }
    }
    //Puis on stocke le tout dans le local storage
    localStorage.setItem("destinations", JSON.stringify(destinations));

    //Et on affiche le résultat
    afficheDestinations();
}

//Fonction qui supprime une destination de la variable globale et du local storage via le nom de la destination
//Puis affiche le résultat
function removeDestination(destToRemove) {
    const index = destinations.indexOf(destToRemove);
    if (index > -1) {
        destinations.splice(index, 1);
        localStorage.setItem("destinations", JSON.stringify(destinations));
        afficheDestinations();
    }
}


/////////////Pour modifier le tableau via le navigateur///////////////////////

//Supprime le contenu du local storage
function clear() {
    localStorage.clear();
}

//Ajoute une destination dans la liste, puis actualise le tableau (ici codée en brut car la fonction sera utilisée depuis une cli, donc difficile
//de passer un array bien structuré
function addDest() {
    let dest = [{"image": "https://voyagerloin.com/countries/italie.jpg",
        "destination" : "Italie",
        "offre" : "Circuit Venezia, hôtel 4 *",
        "prix" : "8000 €"}];
    addDestinations(dest);
}

//Supprime une destination (codée en brut car utilisation depuis cli).
function rmDest() {
    removeDestination("Maroc");
}
///////////////////////////////////////////////////////
