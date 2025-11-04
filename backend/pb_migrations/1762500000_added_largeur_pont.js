/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");

  // Add largeur_pont field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "number_largeur_pont",
    "max": 24,
    "min": 14,
    "name": "largeur_pont",
    "onlyInt": true,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");

  // Remove largeur_pont field
  collection.fields.removeById("number_largeur_pont");

  return app.save(collection);
});
