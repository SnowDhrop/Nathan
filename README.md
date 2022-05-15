# NathanArditti_7_20032022
Nathan_Arditti_Groupomania_20032022


Comment installer et utiliser le projet

Configuration:
- Serveur local wamp64
- Database : MySQL avec PhpMyAdmin
- FrontEnd: React
- BackEnd: Node/Sequelize
 - Environnement: Visual Studio Code
 - console: Bash
 
 // Intro //
 
 Téléchargez le dossier du projet en .zip
 
 Extrayez les fichiers dans un dossier sur votre serveur local.
 
 Si une fenêtre windows s'affiche lors du transfert, cliquez sur "Remplacer les fichiers dans la destination".
 
/// I. Importation de la base de données ///

1°/ Ouvrez PhpMyAdmin et créez une nouvelle base de données nommée "groupomania"

2°/ Cliquez sur "importer" et sélectionnez le fichier "groupomania.sql" situé dans le dossier "db" du projet.

3°/ Les identifiants utilisés pour se connecter à la base de données sont "root" sans mot de passe.

-> Si vous n'avez pas les mêmes informations de connection, allez dans back/config/config.json, puis dans "development", et changez les valeurs des clés "username" et "password" pour qu'elles correspondent à vos identifiants.

/// II. Installation des modules et dépendances ///

Back:

1°/ Ouvrir la console (dans vs code par exemple) et aller dans le dossier back

2°/ Installer bcrypt, express, fs, jsonwebtoken, multer, mysql2, path, sequelize en tapant dans la console la commande "npm i bcrypt express fs jsonwebtoken multer mysql2 path sequelize"

3°/ Installer nodemon en tapant dans la console la commande "npm i -g nodemon". S'il y a des nulnérabilités hautes "high vulnerability", taper "npm audit fix"


Front:

1°/ Ouvrir la console (dans vs code par exemple) et aller dans le dossier front

2°/ Installer le front en tapant dans la console la commande "npm i"

3°/ Aller dans le dossier front/public/images

4°/ Créer un dossier "posts"

/// III. Lancement du projet ///

1°/ Ouvrir la console et aller dans le dossier back

2°/ Taper dans la console la commande "nodemon server"

4°/ Ouvrir une deuxième console et aller dans le dossier front

5°/ Taper dans la console la commande "npm start"

6°/ La console va afficher un message "Something is already running on port 3000, Would you like to run on another port instead ?"

7°/ Taper "y"

=> Le réseau social va se lancer automatiquement :)

=>  Vous remarquerez qu'il n'y a qu'un seul utilisateur d'enregistré dans la table "user" de la base de données. C'est l'administrateur.

=> Ses identifiants sont les suivants : 

    - email: nath.arditti@yahoo.fr
    - mot de passe: Pyrom123!!!


