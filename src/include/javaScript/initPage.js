$(function(){
    $("#header").load("common/header.html");
    $("#footer").load("common/footer.html");
    $(function() {
        setTimeout(() => {  init(); }, 500);
    });

});

function init(){
    var nom = window.location.pathname;
    nom = nom.split("/");
    nom = nom[nom.length - 1];
    nom = nom.substr(0, nom.lastIndexOf("."));
    nom = nom.replace(new RegExp("(%20|_|-)", "g"), "");
    setTimeout(() => {
        var active = document.getElementById(nom);
        if (active == null) {
            while (active == null) {
                active = document.getElementById(nom);
            }
        }
        active.classList.add("active");
        if (nom.includes("voyage")){
            document.getElementById("voyage").classList.add('active');
        }

        }, 1000);
}

function actionSousMenu(id) {
    var sousMenu = document.getElementById(id);
    var etat = sousMenu.style.display;
    fermerSousMenu();

    if (etat == "block") {
        sousMenu.style.display = "none";
    }else{
        sousMenu.style.display = "block";
    }

}

function fermerSousMenu(id) {
    var sousMenu = document.getElementsByClassName("sousMenu");
    for (var i = 0; i < sousMenu.length; i++) {
        sousMenu[i].style.display = "none";
    }

}