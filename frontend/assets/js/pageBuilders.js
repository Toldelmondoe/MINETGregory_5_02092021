//Fonction de création de la page index.html
function indexFill() {
    for (let i=0; i<ours.length; i++) {
        //Création des vignettes contenant les articles
        //Configuration de l'Id index, endroit ou le script sera appliqué 
        let main = document.getElementById("index");
        //Création d'un lien a class vignette avec récupération de l'id présent sur la BDD au click et retournant cet id sur la page produit 
        let link = document.createElement("a");
        link.setAttribute("href", `./pages/produit.html?id=${ours[i]._id}`);
        link.setAttribute("class", "vignette");
        link.setAttribute("id", [i]);
        main.appendChild(link);
        //Création div class vignette__picture
        let div1 = document.createElement("div");
        div1.setAttribute("class", "vignette__picture");
        link.appendChild(div1);
        //Création Balise img, récupération image de l'ours sur la BDD
        let image = document.createElement("img");
        image.setAttribute("src", ours[i].imageUrl);
        image.setAttribute("alt", "photo ours en peluche");
        div1.appendChild(image);
        //Création div class vignette__title
        let div2 = document.createElement("div");
        div2.setAttribute("class", "vignette__title");
        link.appendChild(div2);
        //Création titre h2, récupération du nom de l'ours sur la BDD
        let title = document.createElement("h2");
        title.innerHTML = ours[i].name;
        div2.appendChild(title);
        //Création div class price, récupération du prix/100 de l'ours sur la BDD
        let div3 = document.createElement("div");
        div3.setAttribute("class", "price");
        div3.innerHTML = ours[i].price/100+" €";
        div3.style.fontWeight = "bold";
        div2.appendChild(div3);
    };
};

//Fonction de création de la page produit
function productFill() {
    //Configuration de l'Id ours__imageUrl, endroit où l'image sera chargée, l'image provient de la BDD à ours.imageUrl
    let productImage = document.getElementById("ours__imageUrl");
    productImage.setAttribute("src", ours.imageUrl);
    productImage.setAttribute("alt", "photo ours");
    //Configuration de l'Id ours__name, endroit où le nom sera chargé, le nom provient de la BDD à ours.name
    let productName = document.getElementById("ours__name");
    productName.innerHTML = ours.name;
    //Configuration de l'Id ours__description, endroit où la description sera chargée, la description provient de la BDD à ours.description
    let productDescript = document.getElementById("ours__description");
    productDescript.innerHTML = ours.description;
    //Configuration de l'Id ours__price, endroit où le prix sera chargé, le prix/100 provient de la BDD à ours.price
    let productPrice = document.getElementById("ours__price");
    productPrice.innerHTML = ours.price/100+" €"; 
};

//Fonction de création du panier
function caddyListFill() {
    if (localStorage.getObject('carts')) {
        let teddies = localStorage.getObject('carts');
        console.log(teddies)
        //Création du récapitulatif de commande dans le panier
        teddies.forEach(element => {
            //Configuration de l'Id list, endroit ou le script sera appliqué 
            let list = document.getElementById("list");
            //Création autant de div que d'article dans panier avec nom et couleur de l'article qui proviennent de la page function.js
            let box = document.createElement("div");
            box.setAttribute("aria-label",`${element.name}, ${element.color}`);
            list.appendChild(box);
            //Création p récupérant le nom element.name qui provient de la page function.js
            let teddyName = document.createElement("p");
            teddyName.setAttribute("class", "maxi bold");
            teddyName.style.marginTop = "10px";
            teddyName.innerHTML = element.name;
            box.appendChild(teddyName);
            //Création p récupérant la couleur element.color qui provient de la page function.js
            let teddyColor = document.createElement("p");
            teddyColor.innerHTML = element.color;
            teddyColor.setAttribute("class", "bold");
            teddyColor.style.marginBottom = "5px";
            box.appendChild(teddyColor);
            //Création p pour afficher texte
            let listPrice = document.createElement("p");
            listPrice.innerHTML = "Prix : ";
            box.appendChild(listPrice);
            //Création span qui récupère le prix element.price de la page function.js
            let teddyPrice = document.createElement("span");
            teddyPrice.innerHTML = element.price+" €/pièce TTC";
            teddyPrice.setAttribute("class", "bold");
            listPrice.appendChild(teddyPrice);
            //Création button pour supprimer un article
            let kill = document.createElement("button");
            kill.setAttribute("class",`${element.name}/${element.color}/ kill`);
            kill.setAttribute("aria-label", "Retirer l'article du panier.");
            kill.style.marginTop = "4px";
            kill.innerHTML = 'X';
            box.appendChild(kill);
            //Création input role spinbutton pour augmenter ou diminuer le nombre d'ours
            let teddyNb = document.createElement("input");
            teddyNb.setAttribute("class", `${element.name}/${element.color}/ teddyNb`);
            teddyNb.setAttribute("type", "number");
            teddyNb.setAttribute("required","true");
            teddyNb.setAttribute("role", "spinbutton");
            teddyNb.setAttribute("aria-label", "nombre d'ours");
            teddyNb.setAttribute("min", "1");
            teddyNb.value = element.nb;
            teddyNb.style.textAlign = "center";
            box.appendChild(teddyNb);
            //Création HR pour séparer les articles et améliorer la lisibilité
            let line = document.createElement("HR");
            box.appendChild(line);
        });
        //Récupération du prix total de la page function.js
        updateTotalPrice(total);    
    };   
};