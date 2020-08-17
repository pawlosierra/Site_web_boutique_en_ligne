
//la déclaration et l'initialisation de la table d'objets nommée tab_photographes est effectuée.
var tab_photographes = []

//La fonction Photographe est le constructeur. 
//nom, region, type sont les attributs de l'objet.
function Photographe(nom, region, type) {
  this.nom = nom;
  this.region = region;
  this.type = type;
}

window.onload=function() {
  chargerPhotographes();
  document.getElementById("rafraichir").addEventListener("click", rafraichir);
  //le évènement doit ecouter tout changement (change) sur le select#filtrer-region. Apres il 
  //vas executer la fonction fitrerParRegion().
  document.getElementById("filtrer-region").addEventListener("change", filtrerParRegion);
  //le évènement doit écouter tout changement (change) sur le select#filtrer-type. Apres il vas
  //exécuter la function filtrerParType().
  document.getElementById("filtrer-type").addEventListener("change", filtrerParType);
  //le évènement doit écouter le déclenchement du keyup sur le input#nom et executer la fonction
  //filtrerParNom().
  document.getElementById("nom").addEventListener("keyup",filtrerParNom);
};

//Dans la fonction chargerPhotographes(), nous allons créer les objets qui sont inclus dans 
//le tableau tab_photographes.

function chargerPhotographes(){
   
  var photographe1 = new Photographe("Annie Simard", "Montreal", ["Evenement", "Corporatif"]);
  var photographe2 = new Photographe("Joey Michaud", "Sherbrooke", ["Corporatif"]);
  var photographe3 = new Photographe("Micheal", "Quebec", ["Famille"]);
  var photographe4 = new Photographe("Stephanie Dulude", "Quebec", ["Mariage"]);
  var photographe5 = new Photographe("Isabelle Theriault", "Quebec", ["Famille", "Mariage"]);
  var photographe6 = new Photographe("Magalie Simoneau", "Montreal", ["Mariage"]);
  var photographe7 = new Photographe("John Harvey", "Trois-Riviere", ["Corporatif"]);
  //Avec la fonction push(), les objets créés dans le tableau des tab_photographes sont saisis un par un.
  tab_photographes.push(photographe1);
  tab_photographes.push(photographe2);
  tab_photographes.push(photographe3);
  tab_photographes.push(photographe4);
  tab_photographes.push(photographe5);
  tab_photographes.push(photographe6);
  tab_photographes.push(photographe7);

  //nous appelons la fonction afficherPhotographes afin qu'elle affiche à l'écran le tableau des objets que //nous avons créés.
  afficherPhotographes(tab_photographes);

}

  //la fonction afficherPhotographes montre tous les éléments du tableau tab_photographes. Il est nécessaire de créer un élément tr contenant 3 elements td qui montre le contenu de chacun des objets. Il est important de noter que cette fonction affichera tous les objets qui font partie du tableau tab_photographe. C'est-à-dire qu'il affichera toutes les photographes par défaut.
function afficherPhotographes(tableau){ 
  
    for(var i=0; i<tableau.length;i++){
    var tr = document.createElement("tr");
    var nom = document.createElement("td");
    var ville = document.createElement("td");
    var type = document.createElement("td");
    var texte = document.createTextNode(tableau[i].nom);
    var texte2 = document.createTextNode(tableau[i].region);
    var texte3 = document.createTextNode(tableau[i].type);

    nom.appendChild(texte);
    ville.appendChild(texte2);
    type.appendChild(texte3);

    tr.appendChild(nom);
    tr.appendChild(ville);
    tr.appendChild(type);

    document.getElementById("tableau-photographes").appendChild(tr).setAttribute('id',i);
    
    }
}

//Dans la fonction filtrerParType, le filtrage sera effectué en tenant compte de l'événement "filtrer par type". En fonction de la sélection de l'utilisateur, le tableau tab_photographes sera filtré et seuls les éléments correspondant à la recherche seront affichés à partir du tableau tab_photographes. 

function filtrerParType(e){

  //Dans la variable demandeFiltrage nous stockons une variable de type chaîne de caractères dans laquelle nous allons stocker l'option que l'utilisateur a sélectionnée comme filtrage.
  demandeFiltrage = e.target.value;
  
  var tabType = [];
  //Tant que l'utilisateur ne sélectionne pas le type de filtrage par type, l'ensemble du tableau d'objets sera affiché.
  if(demandeFiltrage!=""){
    for(var t=0; t<tab_photographes.length;t++){
      //dans le tableau tabType, nous allons stocker uniquement les éléments de type de chacun des objets du tableau. C'est-à-dire que nous créons un nouveau tableau où ne figurent que des informations comme: famille, Corporatif, etc ...
      tabType[t]=tab_photographes[t].type;

      //Maintenant que nous disposons d'un tableau des types d'informations, nous pouvons effectuer un filtrage. Pour cela, nous utilisons la fonction includes(). Le paramètre que nous allons utiliser dans cette fonction est la variable demandeFiltrage.
      
      if(tabType[t].includes(demandeFiltrage)){

        document.getElementById(t).style.display="table-row";
      }else{
        //si le paramètre sélectionné par l'utilisateur dans le tableau tabType n'est pas inclus, cet élément sera automatiquement masqué.
        document.getElementById(t).style.display="none";
      }
    } 
  }else{
    for(var j=0;j<tab_photographes.length;j++){
      document.getElementById(j).style.display="table-row";
    }
  }
}

//Dans la fonction filtrerParRegion, le filtrage sera effectué en tenant compte de l'événement "filtrer par region". En fonction de la sélection de l'utilisateur, le tableau tab_photographes sera filtré et seuls les éléments correspondant à la recherche seront affichés à partir du tableau tab_photographes. 
function filtrerParRegion(e){
   //Dans la variable demandeFiltrage nous stockons une variable de type chaîne de caractères dans laquelle nous allons stocker l'option que l'utilisateur a sélectionnée comme filtrage.
  demandeFiltrage = e.target.value;
  //Tant que l'utilisateur ne sélectionne pas le type de filtrage par region, l'ensemble du tableau d'objets sera affiché.
  //nous utilisons "" lorsque l'utilisateur ne sélectionne aucune ville.
  if(demandeFiltrage!=""){
  
  tabVille = [];
  for(var v=0; v<tab_photographes.length;v++){
    //un tableau appelé tabVille est créé où seules les villes de chacun des objets sont stockées. 
    tabVille[v]=tab_photographes[v].region;
  } 

  var compteur = [];
  var k = 0;
  for(var j=0; j<tabVille.length;j++){
    //Nous vérifions si l'élément que l'utilisateur a sélectionné dans le tableau des tabVille existe, c'est-à-dire une ville. Nous créons un tableau appelé compteur où nous stockons l'index de la table tabVille où nous trouvons la ville que l'utilisateur a sélectionnée.
    if(tabVille[j] == demandeFiltrage){
      compteur[k] =j;
      k=k+1;
    }
  }
  var tableau=[];
  for(var p=0;p<tab_photographes.length;p++){
    //nous utilisons chacune des valeurs du tableau compteur comme indice. 
    //Seuls les objets dont l'index est présent en compteur seront stockés dans le tableau.
  tableau [p]= tab_photographes[compteur[p]];
  }
  //Avec la fonction filter(), nous allons nettoyer les tableaux dans lesquels il y a des éléments non définis.
  tableauRase = tableau.filter(Boolean);
  tableau = tableauRase;
  for(var j=0;j<tab_photographes.length;j++){
    ////Maintenant que nous disposons d'un tableau compteur, nous pouvons effectuer un filtrage. Pour cela, nous utilisons la fonction includes(). Le paramètre que nous allons utiliser dans cette fonction est la variable j. Nous voulons vérifier que les index de la table des compteurs sont dans la table tab_photographes.
   if(compteur.includes(j)){
    document.getElementById(j).style.display="table-row";
   }else{
     //si le paramètre sélectionné par l'utilisateur dans le tableau compteur n'est pas inclus, cet élément sera automatiquement masqué.
    document.getElementById(j).style.display="none";
   }  
  } 
  }else{
    for(var j=0;j<tab_photographes.length;j++){
      document.getElementById(j).style.display="table-row";
    }
  }
  //Comme nous pouvons le vérifier dans cette fonction, la logique et la procédure sont un peu plus étendues que dans les autres fonctions de filtrage. En effet, c'est la première fonction qui a été exécutée et à partir de là, la logique a été améliorée pour les deux autres fonctions.
}

//Cette fonction doit trouver les photographes qui contiennent la chaine de caractere dans leur nom. 

function filtrerParNom(e){
  
   //Dans la variable demandeFiltrage nous stockons une variable de type chaîne de caractères dans laquelle nous allons stocker l'option que l'utilisateur a sélectionnée comme filtrage.
  demandeFiltrage = e.target.value;
  //Comment la recherche ne doit pas etre sensible au majuscule ou mminuscule. Vous devez utiliser la fonction toLowerCase() pour convertir toutes les chaînes de caractères en minuscules.
  demandeFiltrageMinuscule = demandeFiltrage.toLowerCase();
  var tabNom = [];
    if(demandeFiltrage!=""){
      for(var n=0; n<tab_photographes.length;n++){
        //Seuls les noms d'objets seront stockés dans la table taNom. 
        tabNom[n]=tab_photographes[n].nom.toLowerCase();
        //Maintenant que nous disposons d'un tableau des noms, nous pouvons effectuer un filtrage. Pour cela, nous utilisons la fonction includes(). Le paramètre que nous allons utiliser dans cette fonction est la variable demandeFiltrage, c'est-à-dire le nom du photographe que l'utilisateur veut voir à l'écran.
        if(tabNom[n].includes(demandeFiltrageMinuscule)){
          document.getElementById(n).style.display="table-row";
        }else{
          //si le paramètre sélectionné par l'utilisateur dans le tableau tabNom n'est pas inclus, cet élément sera automatiquement masqué.
          document.getElementById(n).style.display="none";
        }
      }
      console.log(tabNom);
  
    }else{
      for(var j=0;j<tab_photographes.length;j++){
        document.getElementById(j).style.display="table-row";
      }
    }

}

function rafraichir(){
  location.reload(); 
}
