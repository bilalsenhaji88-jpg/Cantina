const recettes = [
  { id: 1, nom: "Salade marocaine", prix: 8, categorie: "entree" },
  { id: 2, nom: "Soupe Harira", prix: 10, categorie: "entree" },
  { id: 3, nom: "Zaalouk", prix: 9, categorie: "entree" },

  { id: 4, nom: "Tajine de poulet", prix: 25, categorie: "plat" },
  { id: 5, nom: "Pâtes à la tomate", prix: 18, categorie: "plat" },
  { id: 6, nom: "Couscous aux légumes", prix: 22, categorie: "plat" },
  { id: 7, nom: "Kefta aux tomates", prix: 24, categorie: "plat" },

  { id: 8, nom: "Salade de fruits", prix: 8, categorie: "dessert" },
  { id: 9, nom: "Yaourt nature", prix: 4, categorie: "dessert" },
  { id: 10, nom: "Orange à la cannelle", prix: 5, categorie: "dessert" }
];


const selectsEntree = document.querySelectorAll('[id*="entree"]');
const selectsplat = document.querySelectorAll('[id*="plat"]');
const selectsDessert = document.querySelectorAll('[id*="dessert"]');

selectsEntree.forEach(function (select) {
    recettes.forEach(function (recette) {
        if (recette.categorie === "entree") {
            const option = document.createElement("option");

            option.value = recette.id;
            option.textContent = `${recette.nom} - ${recette.prix} DH`;

            select.appendChild(option);
        }
    });
});

selectsplat.forEach(function (select) {
    recettes.forEach(function (recette) {
        if (recette.categorie === "plat") {
            const option = document.createElement("option");

            option.value = recette.id;
            option.textContent = `${recette.nom} - ${recette.prix} DH`;

            select.appendChild(option);
        }
    });
});
selectsDessert.forEach(function (select) {
    recettes.forEach(function (recette) {
        if (recette.categorie === "dessert") {
            const option = document.createElement("option");

            option.value = recette.id;
            option.textContent = `${recette.nom} - ${recette.prix} DH`;

            select.appendChild(option);
        }
    });
});

const btnPdf = document.querySelector("#btn-pdf");

btnPdf.addEventListener("click", function () {
  window.print();
});

const ajbtn=document.querySelector("#add-button")
const sectbtn=document.querySelector("#form-section")

ajbtn.addEventListener("click",function(){
sectbtn.classList.remove('hidden')
})

const annuler=document.getElementById("cancel-button")
annuler.addEventListener("click",function(){
sectbtn.classList.add("hidden")
})

const nrecttes =  document.getElementById("nrecettes")
let total = 0
recettes.forEach(recette => {
    total++;
});
nrecttes.textContent=total
function ajouter() {
    const form = document.getElementById("recipe-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nom = document.getElementById("recipe-name").value.trim();
        const categorie = document.getElementById("recipe-category").value;
        const prix = Number(document.getElementById("recipe-price").value);

        if (nom === "" || prix <= 0) {
            console.log("Veuillez remplir correctement les champs.");
            return;
        }

        for (let i = 0; i < recettes.length; i++) {
            if (recettes[i].nom.toLowerCase() === nom.toLowerCase()) {
                console.log("Cette recette existe déjà.");
                return;
            }
        }

        let id = 0;

        for (let i = 0; i < recettes.length; i++) {
            if (recettes[i].id > id) {
                id = recettes[i].id;
            }
        }

        id = id + 1;

        const recette = {
            id: id,
            nom: nom,
            prix: prix,
            categorie: categorie
        };

        recettes.push(recette);

        document.getElementById("nrecettes").textContent = recettes.length;

        let selecteurs;

        if (categorie === "entree") {
            selecteurs = document.querySelectorAll('[id*="entree"]');
        } else if (categorie === "plat") {
            selecteurs = document.querySelectorAll('[id*="plat"]');
        } else if (categorie === "dessert") {
            selecteurs = document.querySelectorAll('[id*="dessert"]');
        }

        for (let i = 0; i < selecteurs.length; i++) {
            const option = document.createElement("option");

            option.value = recette.id;
            option.textContent = recette.nom + " - " + recette.prix + " DH";

            selecteurs[i].appendChild(option);
        }

        
        console.log("Recette ajoutée avec succès !");
        console.log(recettes);

        form.reset();
        document.getElementById("form-section").classList.add("hidden");
    });
}

ajouter()



