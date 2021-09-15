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

    //Bouton => vider mon panier. Reset complet du panier et du localStorage
    let reset = document.getElementById("reset");
    reset.addEventListener("click", function() {
        localStorage.clear();
        total.innerHTML = 0;
        let clearedResult = document.getElementById("list");
        while (clearedResult.lastElementChild) {
            clearedResult.removeChild(clearedResult.lastElementChild);
        };  
    });
};