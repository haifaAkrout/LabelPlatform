# LabelPlatform (Plateforme des startups)

Présentation du projet
----------------------
La plateforme des startups à vocation à devenir un “One stop shop” pour les startups du pays.
La vision est la suivante : Le porteur du projet (qui peut être une personne physique qui n’a pas encore créé sa startup) commence son parcours en postulant au label en ligne. Le processus d’instruction de son dossier se fait sur la plateforme. S’il est retenu, toutes les procédures de création, de gestion, de demandes de documents, de demandes d’avantages, d’actualisation des données et même de liquidation se feront en ligne.
Comme première étape et afin de lancer rapidement le programme, on commence par un MVP de la plateforme. Une V0 qui permet d’avoir les fonctionnalités nécessaires à la réception des candidatures et l'instruction des dossiers. Une autre fonctionnalité tout aussi importante est les demandes d’avantages prévus par la loi.
Il faut néanmoins prendre en compte les évolutions futures de la plateforme lors de la conception et des choix techniques.
Le présent document concerne la mise en place du portail des startups dont le lancement est une condition sinéquanone pour la réception et la gestion des candidatures des startups.


Exemple of some API URL specifications for interacting with documents and subdocuments

Action	Method	URL path	Parameters	Example
Get all users	GET	/users/getAll	-	200 OK
{
"error": false,
"users": [{
"_id": "5ca6c0b6d5e20a55c82fe35c",
"FirstName": "seif",
"LastName": "ben salem",
"Email": "nader@gmail.com",
"created_at": "2019-04-05T02:43:02.497Z",
"__v": 0,"id": "5ca6c0b6d5e20a55c82fe35c"
}]}
-------------------
Add new user	
POST	/users/add	
params :
FirstName
LastName
Email
Password	
Response :200 ok
{
    "error": false
}
