# iut-project
Veuillez suivre les étapes suivantes pour configurer et lancer le projet.

## Configuration du projet
Si vous voulez utiliser docker voici la commande : 
`docker run -d --name hapi-mysql -e MYSQL_ROOT_PASSWORD=hapi -e MYSQL_DATABASE=user mysql:8.0 --default-authentication-plugin=mysql_native_password`
Installer les dépendances : 
`npm i`

## Fichier .env
Le fichier .env est nécessaire pour stocker les varaibles d'environnement pour le projet
Il faut donc créer un fichier .env à la racine du projet et y ajouter les variables suivantes : 
### Configuration de la base de données
- DB_HOST -> l'adresse du serveur MySql
- DB_USER -> l'utilisateur du serveur MySql
- DB_PASSWORD -> le mot de passe du serveur MySql
- DB_DATABASE -> le nom de la base de données 
- DB_PORT -> le port de la base de données
### Configuration du serveur de mail 
- EMAIL_HOST : l'adresse du serveur SMTP (ici smtp.ethereal.email)
- EMAIL_PORT : le port utilisé par le serveur SMTP
- EMAIL_USER : le nom d'utilisateur pour se connecter au serveur SMTP
- EMAIL_PASS : le mot de passe pour se connecter au serveur SMTP
## Lancement du projet 
Pour démarrer le serveur : 
`spm start`
Pour démarrer le worker qui ici s'appelle worker.js: 
`node worker.js`
## Gestion des migrations 
Pour lancer les migrations : ``npx knex migrate:latest``
Pour revenir en arrière d'une migration : ``npx knex migrate:rollback``
Pour revenir en arrière de toutes les migrations : ``npx knex migrate:rollback --all``
Pour avoir l'etat des migrations : ``npx knex migrate:status``