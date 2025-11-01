# 🎮 TP1 & TP2 – Application de suivi de séries et films

**Cours : 420-514 – Collecte et interprétation de données**
**Auteur : Chadi El-Chami – Cégep Marie-Victorin (Automne 2025)**

---

## 📘 Sommaire

* [TP1 – Version JSON (v1)](#tp1--application-de-suivi-de-séries-et-films)
* [TP2 – Version MongoDB + JWT (v2)](#tp2--application-de-suivi-de-médias-séries-et-films)

---

# 🎮 TP1 – Application de suivi de séries et films

## 🚀 Fonctionnalités

* 📌 Gestion des **médias** (films, séries, mini-séries)
* 📌 Organisation des séries en **saisons** et **épisodes**
* 📌 Suivi de la progression de visionnement (**episodes vus**)
* 📌 Validation stricte des données via **expressions régulières**
* 📌 Gestion des utilisateurs (**admin** et **user**) avec favoris
* 📌 Journalisation avec **Winston** (logs séparés : actions et erreurs)
* 📌 Persistance dans `src/data/db.json`
* 📌 Tests via **Postman** (collection incluse)

---

## 🔧 Stack technologique

| Outil / Technologie | Icône                                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Node.js**         | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge\&logo=node.js\&logoColor=white)          |
| **TypeScript**      | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge\&logo=typescript\&logoColor=white) |
| **Express.js**      | ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express\&logoColor=white)       |
| **Winston**         | ![Winston](https://img.shields.io/badge/Winston-FFCC00?style=for-the-badge\&logo=javascript\&logoColor=black)       |
| **Postman**         | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge\&logo=postman\&logoColor=white)          |
| **JSON file**       | 🗂️ Fichier de persistance                                                                                          |

---

## 📂 Structure du projet (TP1)

```
tp1_collecte/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/
│   ├── utils/
│   ├── data/
│   │   └── db.json
│   └── app.ts
├── tests/
│   └── postman_collection.json
└── package.json
```

---

## 📌 Endpoints principaux (TP1)

### 🎮 Médias

* `GET /api/medias`
* `GET /api/medias/:id`
* `POST /api/medias` (**admin**)
* `PUT /api/medias/:id` (**admin**)
* `DELETE /api/medias/:id` (**admin**)

### 🛋️ Séries & Épisodes

* `GET /api/series/:id/episodes`
* `POST /api/saisons` (**admin**)
* `POST /api/episodes` (**admin**)
* `PATCH /api/series/:serieId/saisons/:saisonNumero/episodes/:episodeId`

### 👤 Utilisateurs

* `GET /api/users`
* `GET /api/users/:id`
* `POST /api/users` (**admin**)
* `DELETE /api/users/:id` (**admin**)
* `GET /api/users/:id/medias`
* `POST /api/users/:id/favorites`
* `DELETE /api/users/:id/favorites/:mediaId`

### 📝 Logs

* `GET /api/logs`

---

## 🤪 Tests Postman

Une collection Postman (`tp1_collecte.postman_collection.json`) contient tous les tests :

* ✅ Cas valides (GET, POST, PATCH, DELETE)
* ❌ Cas invalides (regex, erreurs de validation, etc.)

---

## ⚙️ Installation & Exécution (TP1)

```bash
npm install
npm start
```

---

## 👨‍💻 Auteur

Projet réalisé par **Chadi El-Chami**
Cégep Marie-Victorin — Automne 2025

---

# 🧩 TP2 – Application de suivi de médias (séries et films)

> Version améliorée avec **MongoDB**, **JWT**, et **modes multi-environnements (dev/test/prod)**

---

## 🚀 Fonctionnalités

* 🔐 Authentification sécurisée avec **JWT**
* 🥩 Gestion complète des **films, séries, saisons, épisodes**
* ⭐ Système de **notation (ratings)** et **favoris utilisateurs**
* 🌍 Trois environnements : **développement**, **test**, **production**
* 🗾 Persistance via **MongoDB (Mongoose)**
* 📘 Documentation Swagger (en dev)
* 🤪 Tests automatisés avec **Postman + variables d’environnement**

---

## ⚙️ Installation & Lancement
**Cloner le projet :**

```bash
git clone https://github.com/ChadiEC/Tp1_Collecte_Chadi_ElChami.git

Tp1_Collecte_Chadi_ElChami
```
### 📦 Après un `git clone`


1️⃣ **Installer les dépendances :**

```bash
npm install
```

2️⃣ **Créer un fichier `.env` à la racine du projet :**

* Inspirez-vous du fichier `.env.example`
* Il doit contenir tes variables sensibles (ex: clés JWT, secrets, ports, certificats HTTPS)
* ⚠️ Le `.env` **n’est pas inclus dans le dépôt** pour des raisons de sécurité

Exemple minimal :

```env
NODE_ENV=development
JWT_SECRET=monsecretlocal
PORT=3000
MONGO_URI=mongodb://localhost:27017/media_dev
```

3️⃣ **Lancer selon l’environnement :**

| Environnement | Commande             | Port | Base Mongo | HTTPS |
| ------------- | -------------------- | ---- | ---------- | ----- |
| Dev           | `npm run dev`        | 3000 | media_dev  | ❌     |
| Test          | `npm run test`       | 3001 | media_test | ❌     |
| Prod          | `npm run start:prod` | 3443 | media_prod | ✅     |
| Seed Prod     | `npm run seed:prod`  | -    | media_prod | -     |

---

## 🔐 Authentification

1. `POST /api/v2/auth/register` → création d’un utilisateur (role user ou admin en dev/test)
2. `POST /api/v2/auth/login` → retourne un `{ token }`
3. `Authorization: Bearer {{jwt}}` sur toutes les routes protégées

---

## 📦 Configuration MongoDB

Fichiers `/config/*.json` :

* **development.json** → `media_dev`
* **test.json** → `media_test`
* **production.json** → `media_prod`

---

## 🧱 Structure du projet (TP2)

```
src/
 ├── v2/
 │   ├── controllers/
 │   ├── models/
 │   ├── routes/
 │   ├── services/
 │   ├── middlewares/
 │   └── data/seedProd.ts
 ├── config/
 │   ├── development.json
 │   ├── test.json
 │   ├── production.json
 └── app.ts
```

---

## 🔒 HTTPS local (certificats)

Le serveur **production** utilise des certificats auto-signés pour activer le HTTPS local :

* `certs/cert.pem`
* `certs/key.pem`

Ces fichiers **ne sont pas inclus dans le dépôt Git** car ils contiennent des clés privées.
Pour les régénérer localement :

```bash
mkdir certs
openssl req -nodes -new -x509 -keyout certs/key.pem -out certs/cert.pem
```

Puis lancez le serveur en HTTPS :

```bash
npm run start:prod
```

---

## 📌 Endpoints principaux (TP2)

### 🔸 Auth & Users

| Méthode | Route                                         | Auth      | Description         |
| ------- | --------------------------------------------- | --------- | ------------------- |
| POST    | `/api/v2/auth/register`                       | ❌         | Inscription         |
| POST    | `/api/v2/auth/login`                          | ❌         | Connexion           |
| GET     | `/api/v2/users/me`                            | ✅         | Profil utilisateur  |
| PATCH   | `/api/v2/users/me`                            | ✅         | Modifier le profil  |
| GET     | `/api/v2/users/:id`                           | 🛡️ admin | Voir un utilisateur |
| POST    | `/api/v2/users/:id/favorites`                 | ✅         | Ajouter un favori   |
| DELETE  | `/api/v2/users/:id/favorites/:kind/:targetId` | ✅         | Supprimer un favori |

### 🎮 Films

| Méthode | Route               | Auth      |
| ------- | ------------------- | --------- |
| GET     | `/api/v2/films`     | ❌         |
| POST    | `/api/v2/films`     | 🛡️ admin |
| GET     | `/api/v2/films/:id` | ❌         |
| PUT     | `/api/v2/films/:id` | 🛡️ admin |
| DELETE  | `/api/v2/films/:id` | 🛡️ admin |

### 🛋️ Séries / Saisons / Épisodes

| Méthode | Route                                                 | Auth      |
| ------- | ----------------------------------------------------- | --------- |
| GET     | `/api/v2/series`                                      | ❌         |
| POST    | `/api/v2/series`                                      | 🛡️ admin |
| POST    | `/api/v2/series/:seriesId/saisons`                    | 🛡️ admin |
| POST    | `/api/v2/series/:seriesId/saisons/:saisonId/episodes` | 🛡️ admin |
| GET     | `/api/v2/series/:seriesId/saisons/:saisonId/episodes` | ❌         |

### ⭐ Ratings

| Méthode | Route                                  | Auth |
| ------- | -------------------------------------- | ---- |
| POST    | `/api/v2/ratings`                      | ✅    |
| GET     | `/api/v2/ratings/avg/films/:filmId`    | ❌    |
| GET     | `/api/v2/ratings/avg/series/:seriesId` | ❌    |

---

## 🤪 Tests Postman

📁 **Collection :** `tp2_collecte_collection.json`
✅ Inclut 12 requêtes réparties entre Auth, Films, Séries, Ratings, Favoris
✅ Utilise la variable `{{jwt}}` automatiquement remplie après login
✅ Fonctionne sur `http://localhost:3001` (base `media_test`)

---

## 🌐 Environnements configurés

| Mode | Port | Base Mongo | JWT Secret     | HTTPS |
| ---- | ---- | ---------- | -------------- | ----- |
| Dev  | 3000 | media_dev  | auto           | ❌     |
| Test | 3001 | media_test | test-secret    | ❌     |
| Prod | 3443 | media_prod | use-env-secret | ✅     |

---

## ✅ Statut final du projet

| Fonctionnalité                   | État |
| -------------------------------- | ---- |
| Auth JWT                         | ✅    |
| CRUD Films                       | ✅    |
| CRUD Séries / Saisons / Épisodes | ✅    |
| Ratings + Moyennes               | ✅    |
| Favoris                          | ✅    |
| Swagger (dev)                    | ✅    |
| Postman automatisé               | ✅    |
| Modes dev/test/prod              | ✅    |

---

## 👨‍💻 Auteur

Projet complet réalisé par **Chadi El-Chami**
Cégep Marie-Victorin — Automne 2025
TP1 + TP2 – *Collecte et interprétation de données*
