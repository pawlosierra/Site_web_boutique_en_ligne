var tab_produits = [];
var panier = [];
//var listedeProduit = [];
i=0;

window.onload=function() {
  chargerProduits();
};

//La fonction chargeProduits() creera un tableau associatif ayant comme cle le nom de l'image. Cette fonction retournera tab_produits.
function chargerProduits(){

  tab_produits["canon-t8i.jpg"] = 1199.00;
  tab_produits["canon-90D.jpg"] = 1999.99;
  tab_produits["nikon-z50.jpg"] = 1599.00;
  tab_produits["flash-godox.jpg"] = 229.95;
  tab_produits["objectif-canon.jpg"] = 669.00;
  tab_produits["objectif-canon-macro.jpg"] = 2899.00;
  tab_produits["trepied.jpg"] = 239.95;
  tab_produits["sac.jpg"] = 69.95;
  tab_produits["carte-memoire.jpg"] = 52.95;

  return tab_produits;
}

//la fonction ajouterAuPanier recevra comme paramètre item. La fonction montre tous les éléments dans le panier d'achat a gauche. Il est nécessaire de créer un élément tr contenant un elements img qui montre le produit et un element td que montre le contenu.
function ajouterAuPanier(item) {
  
  var tr = document.createElement("tr");
  var img = document.createElement("img");
  var td = document.createElement("td");
  img.src = "images/"+item;
  img.width = "50";
  img.height = "50";

  var produits= chargerProduits();
  var prix = produits.includes(item);
  var prix = produits[item];
  //Avec la fonction itemExistant, nous vérifions si le produit existe dans le panier d'achat, si le produit n'existe pas, il sera ajouté à notre tableau appelé panier.
  if(itemExistant(item)){
    
  }else{
  panier.push(item);
  
  var texte = document.createTextNode(prix);
  document.getElementById("bodyPanier").appendChild(tr);
  tr.onclick = retirerDuPanier;
  tr.appendChild(img);
  td.appendChild(texte);
  tr.appendChild(td);
  
  mettreJourPrix();
  }
}
//Avec cette fonction, nous cherchons à actualiser le montant total de l'achat. Cela doit être fait car l'utilisateur peut ajouter ou retirer les produits du panier à tout moment. Cette fonction permet de restituer le prix d'achat total.
function mettreJourPrix(){
  var prixProduit=0;
 var achatTotal=0;
 //Nous devons passer par le tableau appelé "panier" pour vérifier tous les produits que nous y avons.
 for(var n=0; n<panier.length;n++){
   //nous avons 9 produits différents avec leurs prix respectifs. Dans la table du panier, il y a les produits que le client veut acheter. En utilisant un Switch, vous pouvez obtenir le prix de chacun des produits dans le panier et en même temps les additionner pour obtenir un total.
   switch (panier[n]){
     
    case "canon-t8i.jpg":
      prixProduit = 1199.00;
      achatTotal = achatTotal + prixProduit;
      break;
    case "canon-90D.jpg":
      prixProduit = 1999.00;
      achatTotal = achatTotal + prixProduit;
      break;
    case "nikon-z50.jpg":
      prixProduit = 1599.00;
      achatTotal = achatTotal + prixProduit;
      break;
    case "flash-godox.jpg":
      prixProduit = 229.95;
      achatTotal = achatTotal + prixProduit;
      break;
    case "objectif-canon.jpg":
      prixProduit = 669.00;
      achatTotal = achatTotal + prixProduit;
      break;
    case "objectif-canon-macro.jpg":
      prixProduit = 2899.00;
      achatTotal = achatTotal + prixProduit;
      break;
    case "trepied.jpg":
      prixProduit = 239.95;
      achatTotal = achatTotal + prixProduit;
      break;
    case "sac.jpg":
      prixProduit = 69.95;
      achatTotal = achatTotal + prixProduit;
      break;
    case "carte-memoire.jpg":
      prixProduit = 52.95;
      achatTotal = achatTotal + prixProduit;
      break;
    default:
      console.log(prixProduit=0);
   }
   
 } 
 prixTotal = achatTotal.toString();
 afficherTotal(prixTotal);
}

//la fonction retireDuPanier vous permet de retirer des produits du panier. Cette fonction est appelée chaque fois que l'utilisateur clique sur les produits dans le panier.
function retirerDuPanier(){
  
  elementSupprime = this.parentNode.removeChild(this);
  articleretirepanier = this.firstChild.src;
  article = articleretirepanier.substring(91);
  positionpanier = panier.indexOf(article);
  panier.splice(positionpanier,1);
  //La fonction mettreJourPrix() doit être appelée pour mettre à jour la valeur d'achat.
  mettreJourPrix();
}


//Avec la fonction afficherTotal, nous pouvons montrer au client le prix total des produits dans le panier.
function afficherTotal(prixTotal){
  document.getElementById("divTotalPanier").innerHTML = prixTotal;
}

/*  La fonction itemExistant valide si l'item est déjà dans le panier et
 *  retourne true s'il est présent, et false s'il ne l'est pas  */
function itemExistant(item){

  if (panier.includes(item)){
    alert("Un item ne doit pas pouvoir se retrouver deux fois dans la liste.");
    return true;
  }else{
    
    return false;
  }
    
}
//La fonction validerPaiement vérifiera si l'utilisateur saisit correctement ses données personnelles. Par exemple, il vérifiera que le nom n'a pas d'espace au début et à la fin. Il vérifiera également que le numéro de la carte de crédit est uniquement Masterd Card et Visa. En outre, nous vérifierons que le numéro de sécurité de la carte (CVC) ne contient que 3 caractères, qui doivent tous être des chiffres. Il est important de noter qu'aucun champ ne doit être vide.
function validerPaiement(f){
  var nom = f.nom.value.trim(); 
  if (nom =="") {
      alert("Le nom est obligatoire.");
      return false;
   }
  if (nom.length<3){
      alert("Le nom doit etre plus long que 3 caracteres.");
      return false;
  }
  var numero = f.numero.value.trim(); 
  if (numero =="") {
      alert("Le numero est obligatoire.");
      return false;
   }
  var numeroString = numero.toString();
    if (!(numero.charAt(0) === "4")){
      if (!(numero.charAt(0) === "5")){
        alert("Seulement les cartes Visa et MasterCard sont acceptes.");
        return false;
      }
  }
  var cvc = f.cvc.value.trim(); 
  if (cvc =="") {
      alert("Le cvc est obligatoire.");
      return false;
   }
  //nous devons convertir le numéro CVC en une chaîne de caractères afin de vérifier que ce numéro de sécurité comporte 3 chiffres.
  var cvcString = cvc.toString();
  if (!(cvcString.length === 3)){
    alert("Le code CVC doit avoir 3 chiffres.");
    return false;
  }
  
    console.log(cvc.length);
//Nous vérifions que chacun des caractères de la table CVC sont des chiffres de 0 à 9.
    for(var c=0; c<cvc.length;c++ ){
      if ((( cvc[c] === '0')) || (( cvc[c] === '1')) || (( cvc[c] === '2'))|| (( cvc[c] === '3'))|| (( cvc[c] === '4'))|| (( cvc[c] === '5'))|| (( cvc[c] === '6'))|| (( cvc[c] === '7'))|| (( cvc[c] === '8'))|| (( cvc[c] === '9'))){
          console.log(cvc[c]);
      }else{
        alert("Le code CVC doit etre des chiffres.");
        return false;
      }
    }
  
    //nous avons créé les tableaux des mois et des jours. Ensuite, nous créons l'objet date. Nous faisons tout cela pour montrer avec une fenêtre que l'achat a été fait correctement en concaténant cette information avec la date à laquelle l'achat a été fait.
  var mois = new Array("janvier","fevrier","mars","avril","mai","juin","juilliet","aout","septembre","octubre","novembre","decembre");
  var jour = new Array("dimanche","lundi", "mardi","mercredi","jeudi","vendredi","samedi");

  var date = new Date();
  alert("Paiement effectue avec succès le "+jour[date.getDay()]+" "+ date.getDate()+" "+mois[date.getMonth()]+" "+date.getFullYear()+" "+"a"+" "+date.getHours()+":"+date.getMinutes());

  return true;


}
