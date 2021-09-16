//Création d'une méthode object pour le localStorage(stringify et parse auto)

Storage.prototype.setObject = function(cle, objet) {
this.setItem(cle, JSON.stringify(objet));
};
   
Storage.prototype.getObject = function(cle) {
var valeur = this.getItem(cle);
return valeur && JSON.parse(valeur);
};

//Fonctions update
updateTotalPrice = function(elt) {
    if (localStorage.getObject('carts')) {
        let teddies = localStorage.getObject('carts');
        elt.innerHTML = 0;
        teddies.forEach(element => {
            elt.innerHTML = parseInt(elt.innerHTML) + (parseInt(element.price)*parseInt(element.nb));
        });
    }
    else {
        elt.innerHTML = 0;
    };
};

updateNbArticles = function(elt) {
    if (localStorage.getObject('carts')) {
        let teddies = localStorage.getObject('carts');
        teddies.forEach(element => {
            elt.innerHTML = parseInt(elt.innerHTML) + parseInt(element.nb);
        });
    }
    else {
        elt.innerHTML = 0;
    };
};

updateProductsArray = function() {
    let teddies = localStorage.getObject('carts');

    teddies.forEach(obj => {
        if(obj.nb > 1) {
            let nb = parseInt(obj.nb);
            for(i=1; i<=nb; i++) {
                products.push(obj.id);
            };
        }
        else {
            products.push(obj.id);
        };
    });
};

updateStorage = function() {
    let teddies = localStorage.getObject('carts');
    let totalPrice = 0;

    teddies.forEach(element => {
        totalPrice = parseInt(totalPrice) + (parseInt(element.price)*parseInt(element.nb));
    });
    localStorage.setItem("totalPrice",totalPrice);
};

updateTeddyNb = function(event, name, color) {
    let teddies = localStorage.getObject('carts');
    let target = teddies.findIndex(elt => elt.name === name && elt.color === color);
    teddies[target].nb = event.target.value;
    localStorage.setObject('carts', teddies);
    console.log(localStorage);
    updateTotalPrice(total);
};

//Fonctions ADD & DELETE Teddy
addTeddy = function(ours) {
    if(localStorage.getObject('carts')) {
        let teddies = localStorage.getObject('carts');
        if (teddies.find(elt => elt.name === ours.name && elt.color === ours.color)) {
            let target = teddies.findIndex(elt => elt.name === ours.name && elt.color === ours.color);
            teddies[target].nb = parseInt(teddies[target].nb) + parseInt(ours.nb);
        } 
        else {
            teddies.push(ours);
        };
        localStorage.setObject('carts', teddies);
    }
    else {
        let carts = [];
        carts.push(ours);
        localStorage.setObject('carts', carts);
    };
};

deleteTeddy = function(name, color) {
    let teddies = localStorage.getObject('carts');
    if ( teddies.find(elt => elt.name === name && elt.color === color)) {
        let target = teddies.findIndex(elt => elt.name === name && elt.color === color);
        console.log(target)
        teddies.splice(target, 1);
        localStorage.setObject('carts', teddies);
    }
    else {
        console.log(`no teddy called ${name} in ${color}`);
    };
};