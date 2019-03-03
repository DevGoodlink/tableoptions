// Etudier l'exemple ci-dessous qui affiche la liste des contacts
// Ajouter dans le tableau le nom de la société et son type à laquelle appartient chaque contact
// Ajouter un champ texte au dessus du tableau pour filtrer le tableau par (nom, prenom, ou nom de son organisation)
// Ajouter un formulaire en dessous du tableau pour la modification d'un contact a la selection d'une ligne du tableau
// Ajouter un bouton au dessus du formulaire pour ajouter un contact
// AJouter un bouton a coté du precedent avec un mini formulaire pour ajouter un organisation
// Ajouter un loader lors du chargement / mise a jour du tableau (qui s'affiche lors de l'appel GetContacts et qui se cache lord de l'appel updateContactsTable)



var contacts = [];
var organisations=[];
var fullcontact=[];
function init(){
    initStorage();

    GetContacts(function(data){
        contacts = data;
        
    });
    GetOrganizations(function(data){
        organisations=data;
        contacts.forEach(function(elt){
            elt["NomOrganisation"]=organisations.filter(o=> o.id===elt.orgnisationid).pop().nom;
            elt["TypeOrganisation"]=organisations.filter(o=> o.id===elt.orgnisationid).pop().type;
            fullcontact.push(elt);
        });
        updateContactsTable(fullcontact);
        
        
        
        
        
    });
     
}
function updateSelectOrganisations(){
    var x = document.getElementById("organisation");
    organisations.forEach(function(elt){
        var option = document.createElement("option");
        option.text = elt.nom;
        option.value= elt.id;
        x.add(option); 
    });
}


function changeValue(){
    //console.log("change detected");
    var id = parseInt(document.querySelector("#idcontact").value);
    var contact = fullcontact.filter(c => c.id===id).pop();

    contact.nom=document.querySelector("#nom").value;
    contact.prenom =document.querySelector("#prenom").value;
    contact.orgnisationid  = document.querySelector("#organisation").value;
    contact.NomOrganisation=document.querySelector("#organisation").options[document.querySelector("#organisation").selectedIndex].text;
    contact.civilite = document.querySelector("#civilite").value;
    updateContactsTable(fullcontact);
    
}
function AjouterOrganisation(){
    var organisation = {
        id:document.getElementById("idorganisation").value ,
        nom: document.getElementById("nomOrganisation").value ,
        nbemployes: document.getElementById("nbEmploye").value ,
        type: document.getElementById("type").value
    };
    organisations.push(organisation);


}
function AjouterContact(){


}
function afficheDansFormulaire(id) {
    var contact = contacts.filter(c => c.id==id).pop();
    document.querySelector("#idcontact").value=id;
    document.querySelector("#nom").value=contact.nom;
    document.querySelector("#prenom").value=contact.prenom;
    document.querySelector("#organisation").value=contact.orgnisationid;
    document.querySelector("#civilite").value=contact.civilite;
}
function filterTableau(){
    var word = document.getElementById("filterword").value;
    if(word.length>0){
        newtab = fullcontact.filter((c)=>{
            var values = Object.values(c);
            var flag = false;
            values.forEach((val) => {
                if(typeof val==="string"){
                    if(val.toLowerCase().indexOf(word) > -1) {
                        flag = true;
                        return;
                    }
                }
            });
            if(flag) return c;
        }) ;
            
        updateContactsTable(newtab);
    }else{
        updateContactsTable(fullcontact);
    }
}

//Mettre a jour le tableau de contacts
function updateContactsTable(contacts){
    var html = "<tr><th>Civilité</th><th>Nom</th><th>Prénom</th><th>Nom Organisation</th><th>Type organisation</th>/tr>";
    for(var i = 0; i < contacts.length; i++){
        html += "<tr onclick='afficheDansFormulaire("+contacts[i].id +");'>";
        html += "<td>" + contacts[i].civilite + "</td>";
        html += "<td>" + contacts[i].nom + "</td>";
        html += "<td>" + contacts[i].prenom + "</td>";
        html += "<td>" + contacts[i].NomOrganisation+ "</td>"; 
        html += "<td>" + contacts[i].TypeOrganisation+ "</td>";
        html += "</tr>";
    }
    html +="<tr>";
    html +="<td><select id='civilite' onchange='changeValue()'><option value='Mr'>Mr</option><option value='Mme'>Mme</option></select></td>";
    html +="<td><input type='text' id='nom' onchange='changeValue()'/></td>";
    html +="<td><input type='text' id='prenom' onchange='changeValue()'/></td>";
    html +="<td><select id='organisation' onchange='changeValue()'></select></td>";
    html +="<td><input type='text' id='idcontact' hidden/></td>";
    html +="</tr>";
    
    $("#tableContacts").html(html);
    updateSelectOrganisations();
}

//Recuperer la liste de contacts
function GetContacts(callback){
    setTimeout(function(){
        callback(JSON.parse(localStorage.contacts));
    }, 1000);
}
function GetOrganizations(callback){
    setTimeout(function(){
        callback(JSON.parse(localStorage.organisations));
    }, 1000);
}
//Initialiser une liste de contacts et une liste d'organisations
function initStorage(){
    if(!localStorage.contacts){
        localStorage.contacts = JSON.stringify(
        [
            {id: 1, orgnisationid: 1, civilite: "Mme", prenom: "Beatrice", nom: "Martin"},
            {id: 2, orgnisationid: 2, civilite: "Mr", prenom: "Jean", nom: "Petit"},
            {id: 3, orgnisationid: 3, civilite: "Mr", prenom: "Michel", nom: "Lefebvre"},
            {id: 4, orgnisationid: 1, civilite: "Mme", prenom: "Armelle", nom: "Bertrand"},
            {id: 5, orgnisationid: 2, civilite: "Mr", prenom: "Xavier", nom: "Fournier"},
            {id: 6, orgnisationid: 3, civilite: "Mme", prenom: "Dominique", nom: "Morel"},
            {id: 7, orgnisationid: 1, civilite: "Mme", prenom: "Gaelle", nom: "Lambert"},
            {id: 8, orgnisationid: 2, civilite: "Mr", prenom: "Felix", nom: "Faure"},
            {id: 9, orgnisationid: 3, civilite: "Mr", prenom: "Jeanne", nom: "Chevalier"},
            {id: 10, orgnisationid: 1, civilite: "Mr", prenom: "Henry", nom: "Gauthier"},
        ]);
    }
    if(!localStorage.organisations){
        localStorage.organisations = JSON.stringify(
        [
            {id: 1, nom: "Air France", nbemployes: 2000, type: "Société"},
            {id: 2, nom: "SNCF", nbemployes: 1500, type: "Société"},
            {id: 3, nom: "UFC que coisir", nbemployes: 300, type: "Association"},
        ]);
    }

}

