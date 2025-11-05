/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");
  const existingFields = Array.from(collection.fields || [])
  // case-insensitive name check to avoid duplicates like "Nom" vs "nom"
  const hasNom = existingFields.some((f) => (f.name || "").toString().toLowerCase() === "nom");
  const hasPrix = existingFields.some((f) => (f.name || "").toString().toLowerCase() === "prix");

  // Add nom field if it doesn't already exist
  if (!hasNom) {
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
  }

  // Add prix field if it doesn't already exist
  if (!hasPrix) {
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
  }

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135");

  // Remove fields if they exist (avoid errors if different ids/names were used previously)
  try {
    const existingFieldsDown = Array.from(collection.fields || [])
    const hasTextNomId = existingFieldsDown.some((f) => (f.id || "") === "text_nom");
    const hasNumberPrixId = existingFieldsDown.some((f) => (f.id || "") === "number_prix");

    if (hasTextNomId) {
      collection.fields.removeById("text_nom");
    }

    if (hasNumberPrixId) {
      collection.fields.removeById("number_prix");
    }
  } catch (e) {
    // best-effort removal; swallow errors to keep rollback tolerant
  }

  return app.save(collection);
});
