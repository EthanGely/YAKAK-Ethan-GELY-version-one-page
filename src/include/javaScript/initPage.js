function loadPage(nomPage) {
    $(function () {
        $("#body").load("src/include/site/" + nomPage);
        $(function () {
            setTimeout(() => {
                $("#header").load("src/include/site/common/header.html");
                $("#footer").load("src/include/site/common/footer.html");
                $(function () {
                    setTimeout(() => {
                        init(nomPage.split(".")[0]);
                    }, 5000);
                });
            }, 500);
        });
    });
}

function init(nom) {
    setTimeout(() => {
        var active = document.getElementById(nom);
        if (active == null) {
            while (active == null) {
                active = document.getElementById(nom);
            }
        }
        active.classList.add("active");
        if (nom.includes("voyage")) {
            document.getElementById("voyage").classList.add('active');
        }

    }, 1000);
}

function actionSousMenu(id) {
    var sousMenu = document.getElementById(id);
    var etat = sousMenu.style.display;
    if (id.split("-")[1] != null) {
        fermerSousMenu(id.split("-")[0]);
    } else {
        fermerSousMenu();
    }


    if (etat == "block") {
        sousMenu.style.display = "none";
    } else {
        sousMenu.style.display = "block";
    }

}

function fermerSousMenu(keepOpen) {
    var sousMenu = document.getElementsByClassName("sousMenu");
    var sousMenuOuvert = document.getElementById(keepOpen);
    for (var i = 0; i < sousMenu.length; i++) {
        sousMenu[i].style.display = "none";
    }
    if (sousMenuOuvert != null)
        sousMenuOuvert.style.display = "block";


}

function toTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
}