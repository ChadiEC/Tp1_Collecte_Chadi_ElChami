# 🎬 TP1 – Application de suivi de séries et films


## 🚀 Fonctionnalités

- 📌 Gestion des **médias** (films, séries, mini-séries)  
- 📌 Organisation des séries en **saisons** et **épisodes**  
- 📌 Suivi de la progression de visionnement (**episodes vus**)  
- 📌 Validation stricte des données via **expressions régulières**  
- 📌 Gestion des utilisateurs (**admin** et **user**) avec favoris  
- 📌 Journalisation avec **Winston** (logs séparés : actions et erreurs)  
- 📌 Persistance dans `src/data/db.json`  
- 📌 Tests via **Postman** (collection incluse)  

---

## 🛠️ Stack technologique

| Outil / Technologie       | Icône |
|---------------------------|-------|
| **Node.js** (runtime)     | ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) |
| **TypeScript** (POO)      | ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) |
| **Express.js** (API)      | ![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| **Winston** (logs)        | ![Winston](https://img.shields.io/badge/Winston-FFCC00?style=for-the-badge&logo=javascript&logoColor=black) |
| **Postman** (tests)       | ![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white) |
| **JSON file** (persistence) | 📂 |

---

## 📂 Structure du projet

```
tp1_collecte/
├── src/
│   ├── controllers/     # Logique des routes
│   ├── models/          # Classes (POO : Media, Film, Serie, Saison, Episode, User)
│   ├── routes/          # Définition des endpoints
│   ├── middlewares/     # Auth, validation, erreurs
│   ├── services/        # Logique métier (CRUD, favoris…)
│   ├── utils/           # Logger Winston, gestion db.json
│   ├── data/
│   │   └── db.json      # Persistance des données
│   └── app.ts           # Point d’entrée
├── tests/
│   └── postman_collection.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📌 Endpoints principaux

### 🎞️ Médias
- `GET /api/medias` → Lister tous les contenus  
- `GET /api/medias/:id` → Obtenir un contenu par ID  
- `POST /api/medias` → Ajouter un contenu (**admin**)  
- `PUT /api/medias/:id` → Modifier un contenu (**admin**)  
- `DELETE /api/medias/:id` → Supprimer un contenu (**admin**)  

### 📺 Séries & Épisodes
- `GET /api/series/:id/episodes` → Lister les épisodes d’une série  
- `POST /api/saisons` → Ajouter une saison à une série (**admin**)  
- `POST /api/episodes` → Ajouter un épisode (**admin**)  
- `PATCH /api/series/:serieId/saisons/:saisonNumero/episodes/:episodeId` → Mettre à jour l’état `vu`  

### 👤 Utilisateurs
- `GET /api/users` → Lister les utilisateurs  
- `GET /api/users/:id` → Obtenir un utilisateur  
- `POST /api/users` → Créer un utilisateur (**admin**)  
- `DELETE /api/users/:id` → Supprimer un utilisateur (**admin**)  
- `GET /api/users/:id/medias` → Médias favoris d’un utilisateur  
- `POST /api/users/:id/favorites` → Ajouter un favori  
- `DELETE /api/users/:id/favorites/:mediaId` → Retirer un favori  

### 📝 Logs
- `GET /api/logs` → Dernière action enregistrée  

---

## 🧪 Tests Postman

Une **collection Postman** est fournie dans `/tests/tp1_collecte.postman_collection.json`.  
Elle inclut les cas :  

✅ Requêtes valides (GET, POST, PATCH, DELETE)  
❌ Requêtes invalides (titre manquant, regex non respectée, année future)  

---

## ⚙️ Installation & exécution

### 1️⃣ Cloner le projet
```bash
git clone https://github.com/ChadiEc/Tp1_Collecte_Chadi_ElChami.git
cd tp1_collecte
```

### 2️⃣ Installer les dépendances
```bash
npm install
```

### 3️⃣ Lancer en mode développement
```bash
npm run start

```

## 👨‍💻 Auteur

Projet réalisé par **Chadi El-Chami**  
Collège — Automne 2025  
