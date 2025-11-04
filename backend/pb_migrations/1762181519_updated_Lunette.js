/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_4090550476",
    "hidden": false,
    "id": "relation133698772",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_mat_b",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_984715480",
    "hidden": false,
    "id": "relation2538015045",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_mat_m",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "relation112446027",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "id_user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3690071135")

  // remove field
  collection.fields.removeById("relation133698772")

  // remove field
  collection.fields.removeById("relation2538015045")

  // remove field
  collection.fields.removeById("relation112446027")

  return app.save(collection)
})
