// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../data/types.d.ts" />

migrate(
  (app) => {
    let superusers = app.findCollectionByNameOrId("_superusers");

    let record = new Record(superusers);

    record.set("email", $os.getenv("POCKETBASE_SUPERADMIN_EMAIL"));
    record.set("password", $os.getenv("POCKETBASE_SUPERADMIN_PASSWORD"));

    app.save(record);
  },
);
