/*
Exercice 2 - Geo:
Requêtes shell:
1 - Insérer 3 points dans Paris
2 - Prendre un point dans paris, et trouver le points de notre base le plus proche
3 - Faire une zone ou 2 de ses points sont inclus, et  1 est exclus
4 - Faire un nearsphere
 */

// 1
db.createCollection("geoloc");
db.geoloc.insertMany([
  {
    location: {
      type: "Point",
      coordinates: [2.3174285888671875, 48.87363508768185],
    },
  },
  {
    location: {
      type: "Point",
      coordinates: [2.3656654357910156, 48.86516646209463],
    },
  },
  {
    location: {
      type: "Point",
      coordinates: [2.3112487792968746, 48.84246347725969],
    },
  },
]);
db.geoloc.createIndex({ location: "2dsphere" });

// 2
db.geoloc.findOne({
  location: {
    $near: {
      $geometry: {
        type: "Point",
        coordinates: [2.38128662109375, 48.8762318456925162],
      },
    },
  },
});

// 3
db.geoloc.find({
  location: {
    $geoWithin: {
      $geometry: {
        type: "Polygon",
        coordinates: [
          [
            [2.2983741760253906, 48.88131206934425],
            [2.2927093505859375, 48.83511951292218],
            [2.3272132873535156, 48.835571480280734],
            [2.3392295837402344, 48.883231130667276],
            [2.2983741760253906, 48.88131206934425],
          ],
        ],
      },
    },
  },
});

// 4

db.geoloc.find({
  location: {
    $nearSphere: {
      $geometry: {
        type: "Point",
        coordinates: [2.38128662109375, 48.8762318456925162],
      },
      $maxDistance: 5000,
      $minDistance: 0,
    },
  },
});
