const recettes = [
    { id: 1, nom: "Salade marocaine", prix: 8, categorie: "entree", qualite: "vegetarien" },
    { id: 2, nom: "Soupe Harira", prix: 10, categorie: "entree", qualite: "classique" },
    { id: 3, nom: "Zaalouk", prix: 9, categorie: "entree", qualite: "vegetarien" },
    { id: 4, nom: "Tajine de poulet", prix: 25, categorie: "plat", qualite: "classique" },
    { id: 5, nom: "Pâtes à la tomate", prix: 18, categorie: "plat", qualite: "vegetarien" },
    { id: 6, nom: "Couscous aux légumes", prix: 22, categorie: "plat", qualite: "vegetarien" },
    { id: 7, nom: "Kefta aux tomates", prix: 24, categorie: "plat", qualite: "classique" },
    { id: 8, nom: "Salade de fruits", prix: 8, categorie: "dessert", qualite: "vegetarien" },
    { id: 9, nom: "Yaourt nature", prix: 4, categorie: "dessert", qualite: "classique" },
    { id: 10, nom: "Orange à la cannelle", prix: 5, categorie: "dessert", qualite: "vegetarien" }
];

const btnPdf = document.getElementById("btn-pdf");
const ajbtn = document.getElementById("add-button");
const sectbtn = document.getElementById("form-section");
const annuler = document.getElementById("cancel-button");
const fermer = document.getElementById("close-modal");
const nrecttes = document.getElementById("nrecettes");
const form = document.getElementById("recipe-form");
const messageForm = document.getElementById("form-message");

btnPdf.addEventListener("click", function () {
    window.print();
});

ajbtn.addEventListener("click", function () {
    form.reset();
    delete form.dataset.id;
    messageForm.classList.add("hidden");
    sectbtn.classList.remove("hidden");
});

function fermerFormulaire() {
    sectbtn.classList.add("hidden");
    form.reset();
    delete form.dataset.id;
    messageForm.classList.add("hidden");
}

annuler.addEventListener("click", fermerFormulaire);
fermer.addEventListener("click", fermerFormulaire);

function actualiserSelects() {
    const tousLesSelects = document.querySelectorAll("#days select");

    for (let i = 0; i < tousLesSelects.length; i++) {
        const select = tousLesSelects[i];
        const ancienneValeur = select.value;
        let categorieSelect = "";

        if (select.id.includes("entree")) {
            categorieSelect = "entree";
        } else if (select.id.includes("plat")) {
            categorieSelect = "plat";
        } else if (select.id.includes("dessert")) {
            categorieSelect = "dessert";
        }

        select.innerHTML = '<option value="">Choisir une recette</option>';

        for (let j = 0; j < recettes.length; j++) {
            if (recettes[j].categorie === categorieSelect) {
                const option = document.createElement("option");
                option.value = recettes[j].id;
                option.textContent = recettes[j].nom + " - " + recettes[j].prix + " DH";
                select.appendChild(option);
            }
        }

        select.value = ancienneValeur;
    }
}

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nom = document.getElementById("recipe-name").value.trim();
    const categorie = document.getElementById("recipe-category").value;
    const prix = Number(document.getElementById("recipe-price").value);
    const qualite = document.getElementById("recipe-quality").value;

    messageForm.classList.add("hidden");

    if (nom === "" || categorie === "" || prix <= 0 || qualite === "") {
        messageForm.textContent = "Veuillez remplir correctement les champs.";
        messageForm.classList.remove("hidden");
        return;
    }

    for (let i = 0; i < recettes.length; i++) {
        if (
            recettes[i].nom.toLowerCase() === nom.toLowerCase() &&
            recettes[i].id !== Number(form.dataset.id)
        ) {
            messageForm.textContent = "Cette recette existe déjà.";
            messageForm.classList.remove("hidden");
            return;
        }
    }

    if (form.dataset.id) {
        const idAModifier = Number(form.dataset.id);

        for (let i = 0; i < recettes.length; i++) {
            if (recettes[i].id === idAModifier) {
                recettes[i].nom = nom;
                recettes[i].categorie = categorie;
                recettes[i].prix = prix;
                recettes[i].qualite = qualite;
                break;
            }
        }
    } else {
        let id = 0;

        for (let i = 0; i < recettes.length; i++) {
            if (recettes[i].id > id) {
                id = recettes[i].id;
            }
        }

        recettes.push({
            id: id + 1,
            nom: nom,
            prix: prix,
            categorie: categorie,
            qualite: qualite
        });
    }

    delete form.dataset.id;

    affichager();
    nrecttes.textContent = recettes.length;
    actualiserSelects();
    calculerBudget();

    form.reset();
    sectbtn.classList.add("hidden");
});

function affichager() {
    const reserve = document.getElementById("reserve");
    reserve.innerHTML = "";

    for (let i = 0; i < recettes.length; i++) {
        const recette = recettes[i];

        const carte = document.createElement("div");
        carte.className = "bg-white rounded-xl p-5 border border-gray-200";

        const nom = document.createElement("h3");
        nom.textContent = recette.nom;
        nom.className = "text-lg font-bold text-gray-800 mb-2";
        carte.appendChild(nom);

        const categorie = document.createElement("p");

        if (recette.categorie === "entree") {
            categorie.textContent = "Entrée";
        } else if (recette.categorie === "plat") {
            categorie.textContent = "Plat principal";
        } else if (recette.categorie === "dessert") {
            categorie.textContent = "Dessert";
        }

        categorie.className = "text-sm text-gray-500 mb-2";
        carte.appendChild(categorie);

        const qualite = document.createElement("p");

        if (recette.qualite === "bio") {
            qualite.textContent = "Bio";
        } else if (recette.qualite === "vegetarien") {
            qualite.textContent = "Végétarien";
        } else {
            qualite.textContent = "Classique";
        }

        qualite.className = "text-sm text-green-700 mb-3";
        carte.appendChild(qualite);

        const prix = document.createElement("p");
        prix.textContent = recette.prix + " DH";
        prix.className = "text-green-700 font-bold mb-4";
        carte.appendChild(prix);

        const modifier = document.createElement("button");
        modifier.textContent = "Modifier";
        modifier.type = "button";
        modifier.className = "bg-green-600 px-4 py-2 rounded-lg text-white hover:bg-green-700 mr-2";

        modifier.addEventListener("click", function () {
            modifierRecette(recette);
        });

        carte.appendChild(modifier);

        const supprimer = document.createElement("button");
        supprimer.textContent = "Supprimer";
        supprimer.type = "button";
        supprimer.className = "bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600";

        supprimer.addEventListener("click", function () {
            supprimerRecette(recette);
        });

        carte.appendChild(supprimer);
        reserve.appendChild(carte);
    }
}

function modifierRecette(recette) {
    document.getElementById("recipe-name").value = recette.nom;
    document.getElementById("recipe-category").value = recette.categorie;
    document.getElementById("recipe-price").value = recette.prix;
    document.getElementById("recipe-quality").value = recette.qualite;

    form.dataset.id = recette.id;

    messageForm.classList.add("hidden");
    sectbtn.classList.remove("hidden");
}

function supprimerRecette(recette) {
    for (let i = 0; i < recettes.length; i++) {
        if (recettes[i].id === recette.id) {
            recettes.splice(i, 1);
            break;
        }
    }

    affichager();
    nrecttes.textContent = recettes.length;
    actualiserSelects();
    calculerBudget();
}

function calculerBudget() {
    const jours = ["lundi", "mardi", "mercredi", "jeudi", "vendredi"];

    let joursPlanifies = 0;
    let budgetSemaine = 0;

    for (let i = 0; i < jours.length; i++) {
        const jour = jours[i];

        const entree = document.getElementById("entree-" + jour);
        const plat = document.getElementById("plat-" + jour);
        const dessert = document.getElementById("dessert-" + jour);

        const selections = [entree, plat, dessert];

        let total = 0;
        let nombreChoisi = 0;

        for (let j = 0; j < selections.length; j++) {
            const idRecette = Number(selections[j].value);

            if (idRecette !== 0) {
                for (let k = 0; k < recettes.length; k++) {
                    if (recettes[k].id === idRecette) {
                        total += recettes[k].prix;
                        nombreChoisi++;
                        break;
                    }
                }
            }
        }

        budgetSemaine += total;

        if (nombreChoisi === 3) {
            joursPlanifies++;
        }

        const carte = entree.closest(".day-card");
        const budgetJour = carte.querySelector(".day-budget");
        const totalJour = carte.querySelector(".day-total");

        budgetJour.textContent = total + " / 50 DH";
        totalJour.textContent = total + " DH";

        if (total > 50) {
            budgetJour.classList.add("bg-red-100", "text-red-800");
            budgetJour.classList.remove("bg-green-100", "text-green-800");
        } else {
            budgetJour.classList.remove("bg-red-100", "text-red-800");
            budgetJour.classList.add("bg-green-100", "text-green-800");
        }
    }

    document.getElementById("bdsm").textContent = budgetSemaine;
    document.getElementById("planned-count").textContent = joursPlanifies + " / 5";
}

const selectsMenu = document.querySelectorAll("#days select");

for (let i = 0; i < selectsMenu.length; i++) {
    selectsMenu[i].addEventListener("change", function () {
        const carte = selectsMenu[i].closest(".day-card");
        const message = carte.querySelector(".day-message");

        message.classList.add("hidden");
        calculerBudget();
    });
}

const boutonsMenu = document.querySelectorAll(".add-menu-button");

for (let i = 0; i < boutonsMenu.length; i++) {
    boutonsMenu[i].addEventListener("click", function () {
        const carte = boutonsMenu[i].closest(".day-card");
        const selects = carte.querySelectorAll("select");
        const message = carte.querySelector(".day-message");
        const total = Number(carte.querySelector(".day-total").textContent.replace(" DH", ""));

        let complet = true;

        for (let j = 0; j < selects.length; j++) {
            if (selects[j].value === "") {
                complet = false;
            }
        }

        if (!complet) {
            message.textContent = "Choisissez les 3 recettes.";
            message.classList.remove("hidden");
            return;
        }

        if (total > 50) {
            message.textContent = "Le budget maximum est de 50 DH.";
            message.classList.remove("hidden");
            return;
        }

        for (let j = 0; j < selects.length; j++) {
            selects[j].disabled = true;
        }

        carte.classList.remove("bg-green-50", "border-green-200");
        carte.classList.add("bg-gray-300", "border-gray-400");

        message.textContent = "Menu validé.";
        message.classList.remove("hidden");

        boutonsMenu[i].textContent = "Menu validé";
        boutonsMenu[i].disabled = true;
    });
}

actualiserSelects();
affichager();

nrecttes.textContent = recettes.length;

calculerBudget();