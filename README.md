Backend – Uber-like Microservices

\***\*\*\*\***IMPORTANT----Test de l'application----\***\*\*\*\***

Après avoir suivi les étapes d'installation ci-dessous, reférez-vous au paragraphe suivant :

Référez-vous au repository frontend pour lancer l'application, vous serez guidé pour vous inscrire rapidement, créez 3 comptes (ETAPES 6 READ.ME FRONTEND), ils seront par défaut tous avec le rôle "client", vous devrez modifier à la main les rôles des deux autres utilisateurs pour les mettre respectivement à "livreur" et "chef", ainsi vous connecter sur une fenêtre du navigateur de vtore choix, une deuxième en navigation privée du même navigateur et une troisième avec un second navigateur de votre choix également pour tester les mises à jour et alertes en temps réellement lorsque la commande change d'état.

\***\*ETAPES D'INSTALLATION\*\*\***

Introduction :

Chaque microservice fonctionne indépendamment avec sa propre base de données PostgreSQL.

Prérequis :

Node.js / PostgreSQL (et PgAdmin ou équivalent) / Git

Installation et Configuration

1. Cloner le projet

git clone https://github.com/Mounib-dev/uber-like-backend.git

cd <répertoire_du_projet>

2. Installer les dépendances

Installez les dépendances dans chaque service :

cd api-microservices-gateway-uber-like

npm install

cd ../client-ms-api-uber-like

npm install

cd ../commande-ms-api-uber-like

npm install

cd ../cuisine-ms-api-uber-like

npm install

cd ../livraison-ms-api-uber-like

npm install

Les bases de données doivent être déjà créées. Le fichier .env de chaque service doit être rempli avec les bonnes informations. (voir ci-dessous)

3. Créer les fichiers .env

Chaque dossier de service nécessite un fichier .env. Voici les modèles à suivre (remplir avec vos propres données) :

------ Gateway – api-microservices-gateway-uber-like/.env ---------

PORT=5000

JWT_SECRET=your_jwt_secret

----- Client Service – client-ms-api-uber-like/.env-----

DATABASE_NAME='uber-like-client'

DATABASE_HOST='localhost'

DATABASE_PORT=5432

DATABASE_USERNAME='postgre'

DATABASE_PASSWORD=your_password

JWT_SECRET=your_jwt_secret

----- Commande Service – commande-ms-api-uber-like/.env -----

DATABASE_NAME='uber-like-commande'

DATABASE_HOST='localhost'

DATABASE_PORT=5432

DATABASE_USERNAME='postgre'

DATABASE_PASSWORD=your_password

---- Cuisine Service – cuisine-ms-api-uber-like/.env----

DATABASE_NAME='uber-like-cuisine'

DATABASE_HOST='localhost'

DATABASE_PORT=5432

DATABASE_USERNAME='postgre'

DATABASE_PASSWORD=your_password

----- Livraison Service – livraison-ms-api-uber-like/.env -----

DATABASE_NAME='uber-like-livraison'

DATABASE_HOST='localhost'

DATABASE_PORT=5432

DATABASE_USERNAME='postgre'

DATABASE_PASSWORD=your_password

**_ Remarque : JWT_SECRET est requis uniquement pour les services qui gèrent l’authentification (gateway & client).
_** Remarque 2 : les noms spécifiés dans DATABASE_NAME exemple "uber-like-livraison" doivent être les mêmes que ceux créées dans PgAdmin.
Remarque 3 : Dans le cahier de charges, il est spécifié qu'on doit aider un restaurant à gérer les commandes clients tout en coordination avec le(s) livreur(s), cependant, dans notre cas, nous avons mocké en mémoire "plusieurs restaurants", avec différents menus pour simuler ce "seul restaurant", c'est-à-dire, que vous pouvez avoir un panier constitué de plats de deux restaurants différents ou plus (simplement pour la simulation).

4. Lancer les services

Dans chaque dossier :

npm run dev

Répétez dans des terminaux séparés pour lancer tous les services.
