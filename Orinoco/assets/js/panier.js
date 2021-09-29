//Tableau de produit et objet contact à envoyer
let products = [];
let contact;

//Réponse du serveur
let serverResponse;

onload = function() {
    console.log(localStorage);
   
    //création du panier
    let total = document.getElementById("total");
    total.innerHTML = 0;
    caddyListFill();    

    //Boutons suppression d'un article et Inputs nombre d'articles
    let list = document.getElementById("list");
   
    list.addEventListener('click', function(event) {
        if(event.target.innerHTML === 'X') {
            let teddy = event.target.getAttribute('class').split('/',2);
            deleteTeddy(teddy[0], teddy[1]);
            event.target.parentElement.remove();
            console.log(localStorage);
            updateTotalPrice(total);
        };   
    });
    list.addEventListener('change', function(event) {
        if(event.target.getAttribute('type') === 'number') {
            let teddy = event.target.getAttribute('class').split('/',2);
            if (event.target.value >= 1) {
                updateTeddyNb(event, teddy[0], teddy[1]);
            }
            else {
                event.target.value = 1;
                updateTeddyNb(event, teddy[0], teddy[1]);
            }
        };
    });

    //Bouton vider mon panier. Reset du panier et du localStorage
    let reset = document.getElementById("reset");
    reset.addEventListener("click", function() {
        localStorage.clear();
        total.innerHTML = 0;
        let clearedResult = document.getElementById("list");
        while (clearedResult.lastElementChild) {
            clearedResult.removeChild(clearedResult.lastElementChild);
        };  
    });

    //REGEX
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;

    //Formulaire
    let clientLastName = document.getElementById("lastName");
    let clientFirstName = document.getElementById("firstName");
    let clientAddress = document.getElementById("address");
    let clientCity = document.getElementById("city");
    let clientEmail = document.getElementById("email");
    contact = new Client(clientFirstName.value, clientLastName.value, clientAddress.value, clientCity.value, clientEmail.value);
    
    clientLastName.addEventListener("blur", function() {
        if (regexName.test(clientLastName.value) && clientLastName.value != "") {
            contact.lastName = clientLastName.value;
            validForm(clientLastName);
        }
        else {
            alertForm(clientLastName, "Veuillez saisir votre nom");
        };
    }); 
    clientFirstName.addEventListener("blur", function() {
        if (regexName.test(clientFirstName.value) && clientFirstName.value != "") {
            contact.firstName = clientFirstName.value;
            validForm(clientFirstName);
        }
        else {
            alertForm(clientFirstName, "Veuillez saisir votre prénom");
        };
    });
    clientAddress.addEventListener("blur", function() {
        if (clientAddress.value.length > 5) {
            contact.address = clientAddress.value;
            validForm(clientAddress);
        }
        else {
            alertForm(clientAddress, "Veuillez saisir votre adresse complète");
        };
    });
    clientCity.addEventListener("blur", function() {
        if (regexName.test(clientCity.value) && clientCity.value != "") {
            contact.city = clientCity.value;
            validForm(clientCity);
        }
        else {
            alertForm(clientCity, "Veuillez saisir votre ville");
        };
    });
    clientEmail.addEventListener("blur", function() {
        if (regexMail.test(clientEmail.value) && clientEmail != "") {
            contact.email = clientEmail.value;
            validForm(clientEmail);
        }
        else {
            alertForm(clientEmail, "Veuillez saisir votre email");
        };
    });

    //Bouton => Valider ma commande
    let post = document.getElementById("send");
    post.addEventListener("click",function(e) {
        e.preventDefault();

        //Vérification des données formulaires
        let check = document.getElementsByClassName("alert");
        if (check.length == 0 && contact.lastName != "" && contact.firstName != "" && contact.address != "" && contact.city != "" && contact.email != "") {   
            //Ajout des articles au tableau products et MAJ du localStorage
            updateProductsArray();
            updateStorage();
            //Retrait des articles du panier
            localStorage.removeItem('carts');
            if (products.length > 0) {
                postOrder();
            } 
            else {
                alert("Vous n'avez aucun article dans votre panier !!");
            };
        } 
        else {
            alert("Veuillez remplir tous les champs du formulaire");
        };
    });
};