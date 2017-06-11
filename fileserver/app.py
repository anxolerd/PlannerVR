from flask import Flask
from flask_pymongo import PyMongo

from .views import (
    index as index_view,
    get_image as get_image_view,
)


def setup_routes(app):
    app.add_url_rule(
        '/',
        'view_index',
        methods=['GET', 'POST'],
        view_func=index_view
    )
    app.add_url_rule(
        '/img/<image_id>',
        'view_image',
        methods=['GET'],
        view_func=get_image_view,
    )


def init_app():
    app = Flask('PlannerVR-fileserver')
    app.config.update(
        DEBUG=True,
        TESTING=False,
        MONGO_DBNAME='plannervr',
    )
    mongo = PyMongo(app)
    app.mongo = mongo
    setup_routes(app)

    return app
