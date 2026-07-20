# skillora/mongo_router.py
#
# Routes all custom Skillora app models to MongoDB.
# Django's built-in apps (auth, admin, contenttypes, sessions) go to SQLite.

MONGO_APPS = {
    'resumes',
    'analysis',
    'matcher',
    'jobs',
}


class MongoRouter:
    """
    Database router that sends all custom app models to MongoDB and
    lets Django's built-in apps (auth, admin, contenttypes, sessions)
    use the default SQLite database.
    """

    def _is_mongo_app(self, app_label):
        return app_label in MONGO_APPS

    def db_for_read(self, model, **hints):
        if self._is_mongo_app(model._meta.app_label):
            return 'mongodb'
        return 'default'

    def db_for_write(self, model, **hints):
        if self._is_mongo_app(model._meta.app_label):
            return 'mongodb'
        return 'default'

    def allow_relation(self, obj1, obj2, **hints):
        # Allow relations within the same database
        db1 = 'mongodb' if self._is_mongo_app(obj1._meta.app_label) else 'default'
        db2 = 'mongodb' if self._is_mongo_app(obj2._meta.app_label) else 'default'
        return db1 == db2

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if self._is_mongo_app(app_label):
            return db == 'mongodb'
        return db == 'default'
