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
 
 
/// I. Importation de la base de données ///

1°/ Ouvrir PhpMyAdmin, créer une nouvelle base de données nommée "groupomania"

2°/ Cliquer sur "importer" et importer le fichier "groupomania.sql" situé dans le dossier "db" du projet.

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


