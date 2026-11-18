# DESIGN — Alibis (gameday-alibis)

> Journal de design. Versions datées, jamais écrasées. Tenu par Claude (directeur artistique), à partir de `PROMPT-DESIGN.md`.

## LOCK — 2026-11-18 · Style verrouillé

Gaia a validé les quatre planches et lancé `/lock`. **Fin des explorations.**
- Référence unique pour l'implémentation : `G-DESIGN/STYLE.md` + `G-DESIGN/planches/v2/` (01-post, 02-plan, 03-fin, 04-series), desktop 1440 × 900.
- Les planches V1 restent en archive et ne servent plus de référence.
- Toute évolution passe par un `/delta` daté ici, sans nouvelle direction.
- Reste ouvert côté produit, avant le code : les questions de `G-DESIGN/PAGES.md` (le générateur sans mensonge, le lien preuve → suspect, une ou plusieurs accusations) et les hypothèses de la V3.

## V3 — 2026-11-18 · Étape C : style formalisé + déclinaison

Gaia a validé le style V2 (« Oui, étape C »).
- `G-DESIGN/STYLE.md` : palette, typo, grille, épaisseurs de trait, composants, mouvement, règles d'états.
- Planches desktop dans `G-DESIGN/planches/v2/` :
  - `01-post.html` : vue inline dans le feed (734 × 400). Plateau en teaser avec des pions « ? », compteur d'enquêteurs, série, semaine en pastilles. États : reprise en cours, déjà résolu (tampon SOLVED), série cassée.
  - `02-plan.html` : écran Jeu (validé en V2).
  - `03-fin.html` : tampon CASE CLOSED, la vérité sur le plan, tuiles temps/rang/percentile, barres « qui a été accusé », CTA commentaire + copie sans spoiler, compte à rebours. États : perdu (CASE GONE COLD), toast de copie.
  - `04-series.html` : calendrier de série du mois, classement du jour centré sur ma ligne, stats communauté, CTA « Post your time ». États : lignes, jours, onglets.
- Données cohérentes d'une page à l'autre : série 6 avant le cas, 7 après ; 14/17 cas résolus en novembre ; rang 312 sur 2,481.

Hypothèses à confirmer (voir `PAGES.md`) :
- Une seule accusation par jour : la carte « perdu » remet la série à 0.
- Classement = accusations correctes les plus rapides du jour.
- « Post your time » et « Comment your theory » ouvrent le champ de commentaire du post (pas de commentaire posté automatiquement).

## V2 — 2026-11-18 · Plan épaissi (« jeu, pas plan d'archi »)

Planche : `G-DESIGN/planches/v2/02-plan.html` (desktop seul). Retour de Gaia : épaissir les lignes pour que ça fasse jeu.
- Murs à 4–5,5 px, angles arrondis, pièces en tuiles blanches. Pièce choisie : fond rose `#fbe0d9` + hachures épaisses.
- Suspects = pions (anneau d'encre de 3 px, ombre portée) avec une pastille rouge portant le n° du rapport qui les cite. Fausse sortie d'Iris : pion fantôme en pointillés, barré d'une croix épaisse, flèche de sortie.
- Frise devenue une piste (4,5 px) : le conflit 21:30 → 21:34 est une barre rouge de 9 px, et le mensonge un jeton barré.
- Rapports : filets de 3 px, numéros en pastilles, texte mi-gras, mensonge barré de 3 px avec un tampon « FALSE » incliné.
- Choix du coupable en pilules à bord de 3 px. Bouton d'accusation en vraie touche : bord d'encre, ombre décalée de 4 px, état « enfoncé ».
- Supprimé : marges verticales, échelle, « level +1 », titres en minuscules légères (tout ce qui faisait cote d'architecte). Titres en grotesque grasse 800.
- Fond légèrement plus chaud (`#fbf7f0`), cadre du jeu en encre 3 px à coins arrondis de 16 px.

## V1.1 — 2026-11-18 · Validation du style

- **Style validé par Gaia : 02 — Plan** (plan d'étage au trait rouge, frise horaire, fiches à filets).
- **Périmètre : desktop 1440 × 900 uniquement.** Le règlement officiel ne parle pas du mobile : le critère Delightful UX dit « exciting layouts and themes ». Le « mobile first » venait de l'outil d'idéation (`tools/gen-idees.py`). Le cadre mobile des planches V1 est gardé comme archive, et les planches suivantes n'en ont pas. `PROMPT-DESIGN.md` §3 et §6 sont corrigés.
- Prochaine étape (C) : `G-DESIGN/STYLE.md` puis les planches Post, Carte de fin, Séries & classement. Les questions produit de `PAGES.md` restent ouvertes.

## V1 — 2026-11-18 · Exploration de la page principale (« Jeu »)

**Statut : en attente de validation de Gaia (étape B du process, on s'arrête ici).**

### Fait
- `G-DESIGN/REFS.md` : Cosmos et PART Architects ouverts et décodés (principes retenus : hiérarchie par la graisse, une seule action pleine, trait unique comme langage, forme « fiche », métadonnées en marge).
- `G-DESIGN/PAGES.md` : 4 pages proposées (Post, Jeu, Carte de fin, Séries & classement), à valider. Questions produit ouvertes listées.
- 3 planches de la page **Jeu**, chacune avec le cadre desktop 1440 × 900 (post déplié dans un feed neutre) et le cadre mobile 390 × 844, plus une bande d'états des composants :
  - `G-DESIGN/planches/v1/01-dossier.html` : direction de départ poussée au bout. Kraft, fiches tapées, fil rouge tendu entre chaque rapport et son suspect, tampon FALSE.
  - `G-DESIGN/planches/v1/02-plan.html` : plan d'étage au trait rouge et frise horaire. Le mensonge se lit dans le dessin (conflit de temps).
  - `G-DESIGN/planches/v1/03-lineup.html` : s'écarte du brief. Produit contemporain, grotesque très grasse, une couleur par suspect, le mensonge passe en noir.

### Données de démo communes
Cas Nº 042, mardi 18 nov., archive scellée à 21:40. Suspects Iris Vane (librarian), Otto Brandt (night guard), Nadia Kell (chef), Pavel Sorin (courier). Cinq rapports horodatés ; le faux est le badge d'Iris à 21:30, contredit par le témoin de 21:34. État figé : en cours de partie, mensonge marqué, Iris + archive choisis, bouton d'accusation prêt, 01:47 au chrono, série de 6.

### Décisions
- Feed hôte dessiné en gris neutre, sans logo ni Snoo ni karma (critère Reddit-y « pas on the nose »).
- Zéro dépendance réseau : polices système en pile (serif / grotesque / mono). Les polices définitives seront embarquées dans l'app à l'étape C.
- UI en anglais ; planches annotées en français.

### Choix recommandé
**02 — Plan**, avec une réserve. C'est la seule direction où le mensonge se *voit* dans un dessin (le temps qui se contredit sur la frise), ce qui sert à la fois la règle « comprise en 5 secondes » et la singularité face aux autres jeux du jour. Elle tient sur mobile sans texture. La réserve : le plan est petit sur mobile. À l'étape C, le toucher d'une pièce doit l'agrandir (`/cible plan`).
01 est la plus chaleureuse mais la plus proche du cliché du film noir. 03 est la plus « produit lancé » mais la moins mémorable.

### Questions ouvertes (bloquantes pour l'étape C)
Voir `G-DESIGN/PAGES.md` §« Questions produit ouvertes » : le mensonge n'existe pas encore dans le générateur ; le lien preuve → suspect est-il une action du joueur ; une seule accusation par jour ou plusieurs essais.
