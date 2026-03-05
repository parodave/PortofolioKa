# Portfolio Personnel

Ce projet est un portfolio personnel moderne et interactif, conçu pour présenter un parcours professionnel, des compétences et des réalisations. Il est construit avec les dernières technologies web pour offrir une expérience utilisateur fluide, performante et esthétique.

## 🚀 Technologies Utilisées

Ce projet repose sur une stack technique robuste et moderne :

-   **[Next.js](https://nextjs.org/)** : Framework React pour le rendu côté serveur et la génération de site statique (App Router).
-   **[TypeScript](https://www.typescriptlang.org/)** : Superset typé de JavaScript pour un code plus fiable et maintenable.
-   **[Tailwind CSS](https://tailwindcss.com/)** : Framework CSS utilitaire pour un design rapide et responsive.
-   **[Framer Motion](https://www.framer.com/motion/)** : Bibliothèque d'animations pour React.
-   **[Radix UI](https://www.radix-ui.com/)** : Composants UI non stylés et accessibles.
-   **[React Hook Form](https://react-hook-form.com/)** & **[Zod](https://zod.dev/)** : Gestion et validation de formulaires performante.
-   **[Lucide React](https://lucide.dev/)** : Bibliothèque d'icônes.
-   **[Magic UI](https://magicui.design/)** : Composants d'interface utilisateur pour des effets visuels avancés.
-   **[Next Themes](https://github.com/pacocoursey/next-themes)** : Gestion du mode sombre et clair.

## ✨ Fonctionnalités

Le portfolio inclut les sections et fonctionnalités suivantes :

-   **Hero Section** : Introduction visuelle impactante.
-   **À Propos** : Présentation personnelle.
-   **Expérience Professionnelle** : Chronologie du parcours pro.
-   **Éducation** : Parcours académique.
-   **Compétences** : Liste des compétences techniques (Skills).
-   **Projets** : Galerie des réalisations avec détails.
-   **Contact** : Formulaire de contact fonctionnel.
-   **Mode Sombre/Clair** : Thème adaptable aux préférences de l'utilisateur.
-   **Design Responsive** : Optimisé pour tous les écrans (mobile, tablette, desktop).
-   **Animations Fluides** : Transitions et interactions soignées.

## 🛠️ Installation et Démarrage

Pour lancer ce projet localement, suivez ces étapes :

### Prérequis

Assurez-vous d'avoir **Node.js** installé. Ce projet utilise **pnpm** comme gestionnaire de paquets.

### Installation

1.  Clonez le dépôt :
    ```bash
    git clone <votre-url-du-repo>
    cd <nom-du-dossier>
    ```

2.  Installez les dépendances :
    ```bash
    pnpm install
    ```

### Lancement en développement

Pour démarrer le serveur de développement :

```bash
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir le résultat.

### Construction pour la production

Pour créer une version optimisée pour la production :

```bash
pnpm build
```

Pour prévisualiser la version de production localement :

```bash
pnpm start
```

## 📂 Structure du Projet

Voici un aperçu de l'organisation des fichiers :

-   `app/` : Contient les pages et le layout principal (App Router de Next.js).
    -   `page.tsx` : Page d'accueil regroupant toutes les sections.
    -   `layout.tsx` : Layout global (incluant les polices, le thème, etc.).
-   `components/` : Composants Réutilisables.
    -   `ui/` : Composants de base (boutons, inputs, cards...) basés sur Radix UI.
    -   `magicui/` : Composants spécifiques pour les effets visuels.
    -   `hero-section.tsx`, `about-section.tsx`, etc. : Composants spécifiques à chaque section du portfolio.
-   `lib/` : Fonctions utilitaires (ex: gestion des classes CSS).
-   `public/` : Fichiers statiques (images, favicons).

## 🎨 Personnalisation

Vous pouvez personnaliser le contenu en modifiant les composants situés dans le dossier `components/`. Les couleurs et styles globaux peuvent être ajustés dans `app/globals.css` ou via la configuration Tailwind.

---

*Généré pour un projet v0.*
