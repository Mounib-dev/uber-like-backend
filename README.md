Backend – Uber-like Microservices


Chaque microservice fonctionne indépendamment avec sa propre base de données PostgreSQL.


Prérequis :


Node.js  / PostgreSQL (et PgAdmin ou équivalent) /  Git

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

 Gateway – api-microservices-gateway-uber-like/.env

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

*** Remarque : JWT_SECRET est requis uniquement pour les services qui gèrent l’authentification (gateway & client).

4. Lancer les services

Dans chaque dossier :

npm run dev 

Répétez dans des terminaux séparés pour lancer tous les services.


----Test de l'application----

Utilisez Postman ou le front-end  pour faire des requêtes via la gateway.

Exemple de route : "http://localhost:3010/api/v1/user/register"

tout est spécifié dans le dossier service de la gateway


Vérifiez les logs des services ou les bases de données pour suivre le comportement.
