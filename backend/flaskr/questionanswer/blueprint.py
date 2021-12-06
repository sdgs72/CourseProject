from flask import Blueprint, request, render_template, abort, jsonify
from .qamodel import getAnswer

# https://flask.palletsprojects.com/en/2.0.x/blueprints/

bp = Blueprint('questionanswer', __name__)

@bp.route('/qa')
def qa():
    wiki_title = request.args.get('wiki_title')
    question = request.args.get('q')
    print(question)
    data = {}
    data["result2"] = getAnswer(wiki_title, question)
    response = jsonify(data)
    return response
