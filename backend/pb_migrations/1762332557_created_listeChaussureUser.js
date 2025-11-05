/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "hidden": false,
        "id": "_clone_4TT7",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "utilisateur",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "json1496927013",
        "maxSize": 1,
        "name": "lunettes",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      }
    ],
    "id": "pbc_2756659126",
    "indexes": [],
    "listRule": null,
    "name": "listeChaussureUser",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT `users`.id AS id, `Lunette`.id_user AS utilisateur,\nGROUP_CONCAT(`Lunette`.id) AS lunettes\nFROM `users`\nJOIN `Lunette` ON `Lunette`.id_user = users.id\nGROUP BY `users`.name",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2756659126");

  return app.delete(collection);
})
