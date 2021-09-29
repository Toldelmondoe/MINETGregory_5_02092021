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
            alert("Chargement de la page impossible. Veuillez réessayer ultérieurement.");
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
            alert("Chargement de la page impossible. Veuillez réessayer ultérieurement.");
        };
    }
    catch (e) {
        console.log(e);
    };
};

//Fonction postOrder 
let postOrder = async function() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/order",{
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({contact, products})
        });
        if(response.ok){
            let data = await response.json();
            serverResponse = data;
            if (typeof serverResponse != "undefined") {
                localStorage.setItem("orderId",serverResponse.orderId);
                localStorage.setItem("custName", serverResponse.contact.firstName);
                window.location.replace("./recap.html");
            }
            else {
                console.log(serverResponse);
                alert("Chargement de la page impossible. Veuillez réessayer ultérieurement.");
            };  
        }
        else {
            console.error(response.status);
        };
    }
    catch (e) {
        console.log("error post");
    };
};
