/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");

  // Add nom field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text_nom",
    "max": 0,
    "min": 0,
    "name": "nom",
    "pattern": "",
    "presentable": true,
    "required": false,
    "system": false,
    "type": "text"
  }));

  // Add prix field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number_prix",
    "max": null,
    "min": 0,
    "name": "prix",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");

  // Remove fields
  collection.fields.removeById("text_nom");
  collection.fields.removeById("number_prix");

  return app.save(collection);
});
