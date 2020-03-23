// MongoDB

/* TODO

Créer une collection sports avec 3 champs
ajouter 2 fields avec upsert
Title: string 
RequireTeam: boolean


Mettre a jour tout les documents qui ont besoin d'une team en ajoutant un nouveau field qui s'appelle minPlayers

Mettre a jour tout les documents qui ont besoin d'une team en augmentant le nombre de joueurs par 10

Créer un champ teams(array) pour tout le monde
Pour ceux qui ont besoin de teams, ajouter un élement nom prenom numero

Mettre à jour tout les éléments de teams, rajouter une propriété titulaire (tous titulaires)
*/

// Create Collection
db.createCollection("sports");
// Add sports
db.sports.insert([
  {
    type: "collective",
    creationDate: 1809,
    originCountry: "France"
  },
  {
    type: "individual",
    creationDate: 1715,
    originCountry: "France"
  },
  {
    type: "collective",
    creationDate: 1933,
    originCountry: "Germany"
  }
]);
// Add field requireTeam and title
db.sports.updateMany(
  {},
  { $set: { requireTeam: true, title: "titre" } },
  { upsert: true }
);

// Set minPlayer=2 if requiredTeam is true
db.sports.updateMany(
  { requireTeam: true },
  { $set: { minPlayer: 2 } },
  { upsert: true }
);
// Increase minPlayer if requiredTeam is true
db.sports.updateMany(
  { requireTeam: true },
  { $inc: { minPlayer: 10 } },
  { upsert: true }
);
// Add team if requireTeam is true
db.sports.updateMany(
  { requireTeam: true },
  {
    $set: {
      team: [
        { firstname: "prenom1", lastname: "nom1", number: "numero1" },
        { firstname: "prenom2", lastname: "nom2", number: "numero2" }
      ]
    }
  },
  { upsert: true }
);
// Add holder=true to every players
db.sports.updateMany(
  { team: { $exists: true } },
  {
    $set: {
      "team.$[].holder": true
    }
  },
  { upsert: true }
);
