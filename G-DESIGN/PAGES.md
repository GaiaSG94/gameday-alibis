# PAGES — Alibis

> Statuts : à dessiner / en revue / validée. Liste validée par Gaia. **Style verrouillé le 2026-11-18 (/lock).**
> Planches en desktop 1440 × 900 uniquement (décision du 2026-11-18 : le règlement n'exige pas le mobile). Style validé : **02 — Plan**.

| # | Page | Rôle | Contenu clé | Statut |
|---|------|------|-------------|--------|
| 1 | **Post** | Vue dans le feed (splash inline) : donner envie d'ouvrir le dossier du jour | En-tête du post, n° et titre du cas, nombre d'enquêteurs du jour, série du joueur, bouton « Open the file » | **validée** · `planches/v2/01-post.html` |
| 2 | **Jeu** | Écran principal, une seule règle : « 5 reports, 1 lie — find who and where » | 5 rapports horodatés, 4 suspects, 4 lieux, lien preuve → suspect (fil rouge), tampon FALSE, chrono, accusation | **validée** · `planches/v2/02-plan.html` |
| 3 | **Carte de fin** | Résultat + boucle quotidienne + accroche commentaire | Gagné/perdu, temps, série, % de la communauté qui a trouvé, comparaison, bouton commenter / partager sans spoiler, prochain dossier dans HH:MM | **validée** · `planches/v2/03-fin.html` |
| 4 | **Séries & classement** | Montrer la communauté et la série | Série perso (calendrier), classement du jour (temps), répartition des accusations de la communauté | **validée** · `planches/v2/04-series.html` |

## Questions produit ouvertes (non tranchées)

1. **Le mensonge n'existe pas encore dans le générateur** (`src/shared/puzzle.ts`) : l'indice du coupable le place dans la pièce du crime et il est vrai, donc la partie se résout sans chercher de mensonge. Les planches dessinent la mécanique d'`IDEE.md` (5 rapports, exactement 1 faux). À confirmer.
2. **« Relier des preuves à des suspects »** : le jeu actuel n'a que deux sélections (suspect, pièce). Les planches proposent : toucher un rapport pour le tamponner FALSE, puis accuser. Le lien fil rouge est-il une action du joueur ou une visualisation automatique ? Les planches le montrent comme automatique (le rapport désigne déjà un suspect).
3. **Erreur = fin de partie ?** Une seule accusation par jour, ou plusieurs essais avec pénalité de temps ? Les planches supposent une seule accusation.
4. **Les états d'erreur et de chargement** existent déjà (« Opening the case file… ») ; ils seront dessinés dans la déclinaison.
