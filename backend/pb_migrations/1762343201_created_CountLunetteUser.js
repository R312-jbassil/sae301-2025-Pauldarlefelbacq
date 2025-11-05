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
        "id": "_clone_vkKX",
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
        "id": "number3257917790",
        "max": null,
        "min": null,
        "name": "total",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_256041105",
    "indexes": [],
    "listRule": null,
    "name": "CountLunetteUser",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT `users`.id as id, `Lunette`.id_user AS utilisateur, COUNT(`Lunette`.id) AS total\nFROM `users`\nJOIN `Lunette` ON `Lunette`.id_user = users.id\nGROUP BY `users`.name",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_256041105");

  return app.delete(collection);
})
