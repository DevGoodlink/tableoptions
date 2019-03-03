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

// J'ai utilisé cette fontion pour la modification d'un contact a la selection d'une ligne du tableau
function changeValue(){
    
    var id = parseInt(document.querySelector("#idcontact").value);
	if(id){
		var contact = fullcontact.filter(c => c.id===id).pop();
		contact.nom=document.querySelector("#nom").value;
		contact.prenom =document.querySelector("#prenom").value;
		contact.orgnisationid  = parseInt(document.querySelector("#organisation").value);
		contact.NomOrganisation=document.querySelector("#organisation").options[document.querySelector("#organisation").selectedIndex].text;
		contact.TypeOrganisation=organisations.filter(o => o.id==contact.orgnisationid).pop().id;
		contact.civilite = document.querySelector("#civilite").value;
		updateContactsTable(fullcontact);
	}
    
    
}
function ajouterOrganisation(){

    var organisation = {
        id:parseInt(document.getElementById("idorganisation").value),
        nom: document.getElementById("nomOrganisation").value ,
        nbemployes: parseInt(document.getElementById("nbEmploye").value) ,
        type: document.getElementById("type").value
    };
    organisations.push(organisation);
	alert("Organisation a été ajoutée avec succées");
	document.getElementById("idorganisation").value="";
	document.getElementById("nomOrganisation").value="" ;
    document.getElementById("nbEmploye").value="" ;
    document.getElementById("type").value="";
	

}

function ajouterContact(){
	var contact={};
	contact.id = fullcontact.length+1;
	contact.nom= document.querySelector("#nom").value;
	contact.prenom= document.querySelector("#prenom").value;
	contact.orgnisationid  = document.querySelector("#organisation").value;
	contact.NomOrganisation=document.querySelector("#organisation").options[document.querySelector("#organisation").selectedIndex].text;
	contact.TypeOrganisation=organisations.filter(o => o.id==contact.orgnisationid).pop().type;
	contact.civilite= document.querySelector("#civilite").value;
	fullcontact.push(contact);
	updateContactsTable(fullcontact);
}

function afficheDansFormulaire(id) {
    var contact = contacts.filter(c => c.id==id).pop();
    document.querySelector("#idcontact").value=id;
    document.querySelector("#nom").value=contact.nom;
    document.querySelector("#prenom").value=contact.prenom;
    document.querySelector("#organisation").value=contact.orgnisationid;
    document.querySelector("#civilite").value=contact.civilite;
}
//La fonction qui permet de parcourir le tableau
function filterTableau(){
    var word = document.getElementById("filterword").value;
    var filtredData=[];
	if(word.length>0){
        filtredData = fullcontact.filter((c)=>{
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
            
        updateContactsTable(filtredData);
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
    html +="<td><select id='civilite' onchange='changeValue()' class='custom-select mr-sm-2'><option value='Mr'>Mr</option><option value='Mme'>Mme</option></select></td>";
    html +="<td><input type='text' id='nom' onchange='changeValue()' class='form-control mr-sm-2'/></td>";
    html +="<td><input type='text' id='prenom' onchange='changeValue()' class='form-control mr-sm-2'/></td>";
    html +="<td><select id='organisation' onchange='changeValue()' class='custom-select mr-sm-2'></select></td>";
    html +="<td><input type='text' id='idcontact' hidden/><button onclick='ajouterContact();' class='btn btn-warning'>Ajouter contact</button></td>";
    html +="</tr>";

    $("#tableContacts").html(html);
    updateSelectOrganisations();
}

//Recuperer la liste de contacts
function GetContacts(callback){ 
    $(".spinner").show();
    setTimeout(function(){
        callback(JSON.parse(localStorage.contacts));
		 $('.spinner').hide();
    }, 1000);
}
//Recuperer le nom et le type d'organisations
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
