import os

from flask import Flask
#from qamodel import getAnswer
from threading import RLock
# import qamodel
from .questionanswer import blueprint

# https://flask.palletsprojects.com/en/2.0.x/tutorial/factory/

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    app.register_blueprint(questionanswer.blueprint.bp)
    
    @app.after_request
    def apply_cors(response):
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
        response.headers.add('Content-Type', 'application/json')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    return app

    
