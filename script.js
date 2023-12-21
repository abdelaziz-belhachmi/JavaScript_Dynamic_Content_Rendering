

// nodes contien toutes les Noeuds.
let nodes = {};
// roots contient seulement les element root "les noeud qui sont sans noeud parent ".
let roots = [];

// dict . 
const dict = {
    "CSS": ["Côté client", "css.png", "Feuilles de style en cascade: est l'un des langages principaux du Web ouvert et a été standardisé par le W3C"],
    "HTML": ["Côté client", "html.jpg", "HyperText Markup Language: langage de balisage conçu pour représenter les pages web."],
    "PHP": ["Côté serveur", "php.jpg", "Hypertext convertir_dict_en_arbreor: langage de programmation libre, principalement utilisé pour produire des pages Web dynamiques via un serveur web."],
    "PHP7": ["Côté serveur mobile", "php.jpg", "Hypertext convertir_dict_en_arbreor: langage de programmation libre, principalement utilisé pour produire des pages Web dynamiques via un serveur web."],
    "Kotlin": ["Développement mobile", "", "Hypertext convertir_dict_en_arbreor: langage de programmation libre, principalement utilisé pour produire des pages Web dynamiques via un serveur web."],
    "Côté client": ["Développement Web", "", "fait référence à tout ce qui est affiché ou se déroule dans une application Web sur le client (appareil de l'utilisateur final)"],
    "Côté serveur": ["Développement Web", "", "fait référence à tout ce qui est cote serveur"],
    "Développement Web": ["", "", "Le développement Web désigne de manière générale les tâches associées au développement de sites Web destinés à être hébergés via un intranet ou Internet."],
    "Développement mobile": ["", "", "Le développement Web désigne de manière générale les tâches associées au développement de sites Web destinés à être hébergés via un intranet ou Internet."],
    "Côté serveur mobile": ["Développement mobile", "", "fait référence à tout ce qui est cote serveur"],
    "Développement Jeux": ["", "", "Le développement jeux désigne de manière générale les tâches associées au développement de sites Web destinés à être hébergés via un intranet ou Internet."],
    "C++": ["Développement Jeux", "", "HyperText Markup Language: langage de balisage conçu pour représenter les pages web."]

};



class Noeud {
    constructor(name)
    {
        this.ID= Math.random() * 10000;
        this.name = name;
        this.bouton_ajouter_suivant =' <a onclick="ajouter_apres(this)">⊷</a> ';
        this.boutton_ajouter_precedent =' <a onclick="ajouter_precedent(this)">⊶</a>  ';
        this.boutton_supprimer = ' <a onclick="deletenode(this)">⋫</a> ';
        this.parent = null;
        this.description = "...";
        this.lien_image = null;
        this.NoeudFils = [];
    }

    definireParent(parent)
    {
        this.parent = parent;
        return this;
    }

    setDescription(description)
    {
        this.description = description;
        return this;
    }

    definire_image(lien_image)
    {
        this.lien_image = lien_image;
        return this;
    }

    ajouter_fils(NoeudFils)
    {
        this.NoeudFils.push(NoeudFils);
    }
 
    supprimer_N()
    {
        // Recursivement dissocier NoeudFils
        this.NoeudFils.forEach(NoeudFils => {
            NoeudFils.supprimer_N();
        });
    
        // dessiocier le parent
        if(this.parent)
        {
            const index = this.parent.NoeudFils.indexOf(this);
         
            if(index !== -1)
            {
            this.parent.NoeudFils.splice(index, 1);
            }
        }
    
        // effacent properties
        this.NoeudFils = [];
        this.lien_image = null;
        this.description = null;
        this.parent = null;
        
        // Supprimer le noeud de lobjet noeuds en effectuant une nouvelle copie sans que le neud soit ajoute a la suppresion
        const newNoeuds = Object.fromEntries(Object.entries(nodes).filter(([key, value]) => value !== this));

        // Update l object nodes
        nodes = newNoeuds;

    }
    
}

// fonction recursive pour checher dans larbre le noeud par ID 
function chercher_neud_parID(node, targetId)
{
    if(node.ID == targetId)
        {
        return node;
    }

    for(const NoeudFils of node.NoeudFils){
        const ntouvee = chercher_neud_parID(NoeudFils, targetId);
            if(ntouvee)
            {
                return ntouvee;
            }
    }

    return null;
}

function ajouter_apres(ele)   {
    var pID = ele.parentNode.getAttribute("id");

    var Noeudcourent;

    for(const node of Object.values(nodes))
      {
        Noeudcourent = chercher_neud_parID(node, pID);
        if(Noeudcourent != null)
        {
            break; //sortire du loop si on trouve le noeud 
        }
 }

    // console.log(Noeudcourent);

    // Check si courrent noeuds n'est pas null
    if(Noeudcourent)
    {
        // cree nouveau noeude
        var newNoeud = new Noeud(".......");
        console.log(newNoeud);

        // Determinant si le noeud a un parent ou sans parent " si sans parent doit etre root , le plus grant element dans l'arbre"
        if(Noeudcourent.parent != null)
        {
            // determiner la position de noeud current entre les autres neoud voisins
            var index = Noeudcourent.parent.NoeudFils.indexOf(Noeudcourent);

            // inserer le nouveau noud dans avant la position de noued courrent
            Noeudcourent.parent.NoeudFils.splice(index + 1, 0, newNoeud);

            // definire le parent de nouveau element autent que le parent d'element courrent
            newNoeud.definireParent(Noeudcourent.parent);
        } 
        else   {
            // si n a pas de parent , on l ajout comme voisin precedent dans le tableau des roots
            var index = roots.indexOf(Noeudcourent);
            roots.splice(index + 1, 0, newNoeud);

            // mettre le parent de nouveau noeud a null , puisque il est root , il n as pas de parent noued
            newNoeud.definireParent(null);
        }

        // Maintain order within the nodes object
        const noeudesArray = Object.values(nodes);
        const indexcurr = noeudesArray.findIndex(n => n.ID === Noeudcourent.ID);
        noeudesArray.splice(indexcurr + 1, 0, newNoeud);

        // Rebuild the nodes object with the correct order
        nodes = {};
        noeudesArray.forEach(n => (nodes[n.ID] = n));
    }
    afficherArbre();
}

function ajouter_precedent(ele)
{
    var pID = ele.parentNode.getAttribute("id");

    var Noeudcourent;

    for(const node of Object.values(nodes))
    {
        Noeudcourent = chercher_neud_parID(node, pID);
      if(Noeudcourent != null)
       {

            break; 
         }
}

    console.log(Noeudcourent);

    // Check si Noeudcourent exist and not null
    if(Noeudcourent)
    {
        // Cree un nouveau noeud
        var newNoeud = new Noeud(".......");
        console.log(newNoeud)

        // Determinant si le noeud a un parent ou sans parent " si sans parent doit etre root , le plus grant element dans l'arbre"
        if(Noeudcourent.parent != null)
        {
            // determiner la position de noeud current entre les autres neoud voisins
            var index = Noeudcourent.parent.NoeudFils.indexOf(Noeudcourent);

            // inserer le nouveau noud dans avant la position de noued courrent
            Noeudcourent.parent.NoeudFils.splice(index, 0, newNoeud);

            // definire le parent de nouveau element autent que le parent d'element courrent
            newNoeud.definireParent(Noeudcourent.parent);
        } 
        else   {
            // si n a pas de parent , on l ajout comme voisin precedent dans le tableau des roots
            var index = roots.indexOf(Noeudcourent);
            roots.splice(index, 0, newNoeud);

            //  mettre le parent de nouveau noeud a null , puisque il est root , il n as pas de parent noued
            newNoeud.definireParent(null);
        }

        // convertire object nodes en tablea "array" pour maintenir l ordre et ajouter le nouveau element dans la position correcte
        const noeudesArray = Object.values(nodes);
        const indexcurr = noeudesArray.findIndex(n => n.ID === Noeudcourent.ID);
        noeudesArray.splice(indexcurr, 0, newNoeud);

        // recreant l'object des noeud avec le nouveau ordre puisque le nouveau element sera au milieu plupart de temp
        nodes = {};
        noeudesArray.forEach(n => (nodes[n.ID] = n));
    }
    afficherArbre();
}


// Function to delete a node by ID from the nodes tree
function supprimerNoeud(targetId)
{
    // lopper sur chaque element root recursivement pour trouver le noeud desiree a trouver par id
    for(const root of roots)
    {
        const nodeToDelete = chercher_neud_parID(root, targetId);

        if(nodeToDelete)
        {
            console.log("i will call supprimer_N()");
            // suppriment le noeud avec la fonction supprimer_N() qui est definit dans la class Noeud    
            nodeToDelete.supprimer_N();
            
            break; // Break si on trouve le noeud desiree et on le suprime
        }

    }


}

function deletenode(element)
{
    // Get the ID of the element to delete
    const idToDelete = element.parentNode.getAttribute("id");
    console.log("Deleting element with this id from nodes: " + idToDelete);

    // Call the function to delete the node by ID
    supprimerNoeud(idToDelete);

    // Update roots after deletion
    roots = redefinire_les_neuds_roots();
    // Render the updated tree
    afficherArbre();
}


// Function to calculate the average number of words in each subtree of a node
function calculerMotMoyenne(node)
{
    let motstotals = 0;
    let nombreTotalDesSousArbres = 0;

    function calcluler_mots_recursivement(subtreeNode)
    {
        if(subtreeNode && subtreeNode.description)
        {
            motstotals += subtreeNode.description.trim().split(/\s+/).length;
            nombreTotalDesSousArbres++;
        }

        if(subtreeNode && subtreeNode.NoeudFils)
        {
            subtreeNode.NoeudFils.forEach(NoeudFils => calcluler_mots_recursivement(NoeudFils));
        }
    }

    calcluler_mots_recursivement(node);

    // si n'est pas null , c'est bon 
    if (nombreTotalDesSousArbres > 0) {
        return motstotals / nombreTotalDesSousArbres
    } else {
        // mais si n'est pas null , aux mois je doit avoir un nombre 0 , pour ne pas avoir NaN
        return 0;
    }

}

// la fonction qui change les positions de division a gauche avec a droite
function switchpositions()
{

    var control = document.getElementById('control');
    // le convertire on tableau d elements
    var ordreCourent = Array.from(control.children);

    // dans le nouveau ordre on change la division d index 2 avec l index 0 , comme ci dessous
    var nouveau_Ordre = [ordreCourent[2], ordreCourent[1], ordreCourent[0]];
      control.innerHTML = '';
    // puis appendChild pour chaque element de nouveau ordre 
    nouveau_Ordre.forEach(function (element)
    {
        control.appendChild(element);
    });
 
 }

function redefinire_les_neuds_roots(){
    roots=[];
    // chaque Noeud si n'a pas de parent on le ajout au tableau root  par la condition !node.parent
    Object.values(nodes).forEach(function (node){
   if( !node.parent)
        {
            roots.push(node);
        }
    });
    return roots;
}

function convertir_dict_en_arbre()
{
    // Cree un noeud pour chaque elemt dans dict , le Nom du nOeud sera le cle , puisque dans dict les element sont de type "cle":"valeur" hors en valeur est un tableau des valeur donc l indice 0 des valeur est le nom le parent comme declaree ici : nom_parent = dict[cle][0]
    Object.keys(dict).forEach(function (cle)
    {
        nodes[cle] = new Noeud(cle).setDescription(dict[cle][2]).definire_image(dict[cle][1])
    });

    // chque noeud on le defini sont parent et le Fils de sont parent , puisque nom_parent = dict[cle][0]  et nom_parent.ajouter_fils ( on le donne le nouveau noeud comme fils)
    Object.keys(nodes).forEach(function (cle)
    {
        const nom_parent = dict[cle][0];
        if(nom_parent)
        {
            if(nodes[nom_parent])
            {
                nodes[nom_parent].ajouter_fils(nodes[cle]);
                nodes[cle].definireParent(nodes[nom_parent]);
            }
        } 
        else   {
            roots.push(nodes[cle]);
        }
    });
}

function creeElement(node,CSSCounter)
{
    spn = document.createElement("span");
    
    spn.innerText ="⧁";
     
    const a = document.createElement("a");
    a.innerHTML = node.name;

    const li = document.createElement('li');
    li.setAttribute("id",node.ID);
   
    li.appendChild(spn);
    li.appendChild(a);

    L = node.boutton_ajouter_precedent + node.boutton_supprimer + node.bouton_ajouter_suivant;
    li.innerHTML = li.innerHTML + L;

    li.onclick = function (event)
    {
        
        event.stopPropagation();
        
        afficher_description_image_du_noeud(node);
        
        onclickSurNoeud(li);
        
        // ⟏ / ⧁ 
            const span = li.querySelector('span');
            if(span.innerText == "⧁"){
             span.innerText = "⟏";
            }else if (span.innerText == "⟏"){
             span.innerText ="⧁";
            }
         
         
        
        // calcule des mots avec espace comme un delimiteur
        nombredesmots = node.description.trim().split(/\s+/).length;

        //
        if(node.parent)
        {
            
            nombredecategories = node.parent.NoeudFils.length;
            
        }else{
            nombredecategories = roots.length;
        }
        
        
        let moyencategories = 0;

        node.NoeudFils.forEach((NoeudFils) => {
            // calculent le nombre total de NoeudFils pour chaque NoeudFils
            let nmbrdesouscategories = NoeudFils.NoeudFils.length;
        
            // le ajouter dans le total
            moyencategories += nmbrdesouscategories;
        });
        
        // puis calculer la moyenne
        if(node.NoeudFils.length > 0)
        {
            moyencategories /= node.NoeudFils.length;
        }

        motsmoyen = calculerMotMoyenne(node);

        detailsdiv = document.getElementById("details");
        p = document.createElement("p");
        p.innerText = `- Nombre de mots: ${nombredesmots} - Nombre de catégories : ${nombredecategories} - Nombre moyen de sous-catégoriesc : ${moyencategories} - Nombre moyen de mots par catégories : ${motsmoyen}`; 
        detailsdiv.innerHTML = "";
        detailsdiv.appendChild(p);

        if(li.innerText.slice(0, 10).includes(".......") || li.innerText.slice(0, 6).includes("null"))
        {
            var yesno = window.confirm("Est ce que vous voulez changer les details de cet element ?");


           if(yesno){
            var input_name = prompt("Entrez le Nom:");
            var input_url = prompt("Entrez l\'URL d\'image :");
            var input_description = prompt("Entrez la description:");
        
            
            node.name = input_name;
            node.lien_image =input_url
            node.setDescription(input_description)
            liID = li.getAttribute("id")
            document.getElementById(liID).innerHTML= node.name + node.boutton_ajouter_precedent + node.boutton_supprimer + node.bouton_ajouter_suivant;
            // alert(formdiv.innerHTML);
            descriptionDivv = document.getElementById('term-description');
            imagee = document.getElementById('term-image');
            titlee = document.getElementById("ttl");
            titlee.textContent = node.name
            descriptionDivv.textContent = node.description;
            imagee.alt = "Image for " + node.name;
            imagee.setAttribute("src",node.lien_image);
            imagee.style.display = '';
            imagee.style.height = "300px";
           }

        }


    };

    if(node.NoeudFils.length > 0)
    {
        const ol = document.createElement('ol');
        str = "N"+CSSCounter;
        ol.setAttribute("class",str)
        ol.style.display = 'none'; 
        node.NoeudFils.forEach(function (NoeudFils)
        {
            str = "N";
            ol.appendChild(creeElement(NoeudFils,str));
        });
        li.appendChild(ol);
    }
    // afficherArbre();
    return li;
}

function afficher_description_image_du_noeud(node)
{
    const descriptionDiv = document.getElementById('term-description');
    const image = document.getElementById('term-image');
    const title = document.getElementById("ttl");
    title.textContent = node.name
    descriptionDiv.textContent = node.description;
    image.alt = "Image for " + node.name;
    if(node.lien_image)
    {
        image.src = node.lien_image;
        image.style.display = 'block';
        image.style.height = "300px";
        // image.style.width="80%";
    } 
    else   {
        image.style.display = 'none';
    }
}

function onclickSurNoeud(liElement)
{
    const NoeudFilsUl = liElement.querySelector('ol');
    // NoeudFilsUl.setAttribute("type","a");
    if(NoeudFilsUl)
    {
        NoeudFilsUl.style.display = NoeudFilsUl.style.display === 'none' ? 'block' : 'none';
    }
}

function afficherArbre()
{
    const leftPanel = document.getElementById('left-panel');
    leftPanel.innerHTML = "";

    const ol = document.createElement('ol');
    ol.setAttribute("class", "N1");

    roots.forEach(function (root)
    {
        ol.appendChild(creeElement(root,2));
    });

    leftPanel.appendChild(ol);
}

window.onload = function ()
{
    convertir_dict_en_arbre();
    afficherArbre();
};
