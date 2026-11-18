# STYLE — Alibis · « Plan » (V2, validé et **verrouillé** le 2026-11-18)

> Source : `G-DESIGN/planches/v2/02-plan.html`. Desktop 1440 × 900 uniquement. Toute nouvelle planche suit ce document strictement.

## 1. Principe

Un plan d'étage et une frise horaire dessinés **au trait rouge épais**, traités comme un plateau de jeu : tuiles, pions, pastilles, touches. Une seule couleur d'accent ; l'encre sert aux contours des objets qu'on peut toucher.

## 2. Palette

| Rôle | Nom | Hex |
|---|---|---|
| Fond du jeu | Crème | `#fbf7f0` |
| Surface (tuiles, pilules) | Blanc | `#ffffff` |
| Accent unique (trait, sélection, action) | Rouge | `#e4432f` |
| Sélection douce (pièce choisie, pressé) | Rose | `#fbe0d9` |
| Contours, texte, ombres | Encre | `#141414` |
| Texte secondaire | Gris | `#8d8781` |
| Éléments éliminés / fantômes | Gris clair | `#b9b3ab` |
| Désactivé | Sable | `#eee9e1` fond, `#cfc8be` bord, `#a8a29a` texte |

Règle : le rouge veut toujours dire « information » ou « action ». Jamais de rouge décoratif.

## 3. Typographie

Deux familles, embarquées dans l'app (zéro requête externe) : une grotesque (Inter ou équivalent libre) et une mono (IBM Plex Mono).

| Usage | Famille | Graisse | Taille |
|---|---|---|---|
| Titre du cas | Grotesque | 800, approche -0.03em | 34 px |
| Bouton principal | Grotesque | 800 | 16 px |
| Valeur clé (accusation, chiffres) | Grotesque | 800 | 17 px |
| Texte de rapport, règle | Grotesque | 600 / 500 | 14.5–15.5 px |
| Pilule (suspect) | Grotesque | 800 | 14 px |
| Étiquette de section | Mono | 700, capitales, +0.06em, rouge | 11 px |
| Heure · source | Mono | 700, capitales, gris | 10.5 px |
| Chiffres (chrono, stats) | Mono | 700 | 11–13 px |

## 4. Grille

- Cadre du jeu : 734 × 648 (post déplié), bord encre 3 px, rayon 16 px, padding 20 / 24 px.
- Écran Jeu : 2 colonnes, 310 px (plan + frise) | reste (rapports), gouttière 22 px.
- Rythme vertical : 4 / 8 / 12 / 14 / 18 px. Les filets séparent, les blancs ne remplacent pas les filets.
- Post dans le feed (vue inline) : 734 × 400.

## 5. Traits

| Élément | Épaisseur |
|---|---|
| Mur de pièce | 4 px (choisie : 5.5 px), joints et bouts arrondis, rayon 10 |
| Pièce extérieure (toit) | 4 px pointillé 10/7 |
| Contour de pion, pilule, bouton, puce | 3 px encre |
| Filet entre rapports | 3 px rouge |
| Filet de titre | 4 px rouge |
| Filet d'accusation | 4 px encre |
| Piste de la frise | 4.5 px encre ; segment de conflit 9 px rouge |
| Rature (mensonge) | 3 px rouge sur le texte ; croix 4.5 px |

## 6. Composants

- **Pièce** : tuile blanche, mur rouge 4 px. Choisie : fond rose + hachures rouges à 22 % + mur 5.5 px. Étiquette « LOCKED hh:mm » en pilule rouge pleine.
- **Pion** : disque r 19, contour encre 3 px, ombre encre décalée de 2.5 px vers le bas, initiales 12 px 800. Accusé : plein rouge, initiales blanches. Pastille rouge (r 8, liseré crème) = n° du rapport qui cite ce suspect.
- **Fantôme** : pion en pointillés gris clair, barré d'une croix rouge 4.5 px. Montre un alibi réfuté.
- **Jeton de frise** : disque r 10, contour 3 px, n° du rapport. Mensonge : pointillés gris + rature rouge.
- **Rapport** : pastille n° (24 px, rouge plein ; gris si faux), heure · source en mono, texte mi-gras. Faux : rature 3 px + tampon « FALSE » (rouge, bord encre 3 px, rotation -4°).
- **Pilule suspect** : bord encre 3 px, fond blanc. Choisie : fond rouge, texte blanc, ombre encre 3 px dessous.
- **Puce d'info** (chrono, série) : bord encre 3 px, mono 13 px ; variante pleine rouge pour la série.
- **Bouton principal** : rouge, bord encre 3 px, rayon 12, ombre encre décalée 4/4 px. Une seule action pleine par écran.
- **Bouton secondaire** : blanc, bord encre 3 px, même rayon, même ombre.
- **Tampon** : grand texte capitales 800 dans un cadre de 4–5 px, incliné de -6° à -4°.

## 7. Mouvement

- Toucher un rapport : fond rose 80 ms, puis rature tracée de gauche à droite en 180 ms, tampon qui tombe (échelle 1.3 → 1, rebond, 220 ms).
- Pion accusé : saut de 4 px et retour (160 ms).
- Bouton : pressé = translation 4/4 px, ombre à 0 (60 ms).
- Fin de partie : le tampon « CASE CLOSED » tombe en 260 ms, puis les chiffres défilent (400 ms).
- Chargement : le plan se trace mur après mur (stroke-dashoffset, 600 ms au total).
- `prefers-reduced-motion` : aucun mouvement, changements d'état immédiats.

## 8. Règles d'états

| Composant | Repos | Pressé | Choisi / actif | Éliminé | Désactivé |
|---|---|---|---|---|---|
| Rapport | blanc, filet rouge | fond rose | — | raturé + FALSE | — |
| Pièce | tuile blanche | fond rose | rose + hachures + 5.5 px | — | — |
| Pilule suspect | blanc | translation 2 px | rouge plein + ombre | gris clair pointillé | — |
| Bouton principal | rouge + ombre | enfoncé, ombre 0 | — | — | sable, sans ombre |

Un seul rapport peut être marqué faux à la fois : marquer un autre rapport retire la marque précédente.

## 9. Ton

UI en anglais, phrases courtes, présent. Le jeu parle comme un registre de garde, avec un clin d'œil : « Five reports. One is false. » Pas d'emoji dans l'UI, sauf la flamme de la série.
