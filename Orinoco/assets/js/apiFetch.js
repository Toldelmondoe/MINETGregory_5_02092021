//Fonction Fetch API
let apiFetch = async function() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let data = await response.json();
            ours = data;
        } 
        else {
            console.error(response.status);
            alert("Chargement de la page impossible. Nous avons actuellement un problème de connexion au serveur. Veuillez réessayer ultérieurement ou contacter nos services.");
        };
    }
    catch (e) {
        console.log(e);
    };
};

//Fonction Fetch API par :_id
let apiFetchProduct = async function() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/"+id);
        if (response.ok) {
            let data = await response.json();
            ours = data;
        } 
        else {
            console.error(response.status);
            alert("Chargement de la page impossible. Nous avons actuellement un problème de connexion au serveur. Veuillez réessayer ultérieurement ou contacter nos services.");
        };
    }
    catch (e) {
        console.log(e);
    };
};
