# NutriTrack

## 🌟 Objectif

L'application **NutriTrack** a pour objectif de vous aider à **suivre vos repas et leurs apports nutritionnels**. Elle propose des fonctionnalités clés pour une gestion simple et efficace de votre alimentation.

## 🔊 Fonctionnalités

✅ **Ajout d'aliments à un repas** via :  
- **Barre de recherche** pour trouver facilement des aliments.  
- **Scanner de code-barres** pour une saisie rapide.

✅ **Récupération des informations nutritionnelles** grâce à l'API **Edamam**.

✅ **Gestion des comptes utilisateurs** avec **Clerk** :  
- **Inscription**  
- **Connexion**  
- **Profil utilisateur**

✅ **Affichage de la liste des repas enregistrés** ainsi que leurs **détails nutritionnels**.

✅ Navigation fluide avec **Expo Router** :  
- **Tabs** et **Stacks** pour une expérience utilisateur optimisée.

## 📁 Configuration

1. Clonez le répertoire du projet :
   ```bash
   git clone https://github.com/votre-repo/nutritrack.git
   cd nutritrack
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Configuration des clés API :
   - **Les clés API ne sont pas fournies par défaut.**  
   - Copiez le fichier `.env.ini` :
     ```bash
     cp .env.ini .env
     ```
   - Ouvrez le fichier `.env` et renseignez vos propres clés API.

4. Lancez l'application :
   ```bash
   npx expo start
   ```

## 🌟 Technologies utilisées
- **React Native** avec **Expo**
- **Expo Router** pour la navigation
- **Clerk** pour l'authentification utilisateur
- **API Edamam** pour les données nutritionnelles

---

✨ **NutriTrack** - Votre allié pour un suivi nutritionnel simplifié ! 🍎🍊🍇

