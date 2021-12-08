from flask import Blueprint, request, render_template, abort, jsonify
from .qamodel import getAnswer, getSummary

# https://flask.palletsprojects.com/en/2.0.x/blueprints/

bp = Blueprint('questionanswer', __name__)

@bp.route('/api/qa')
def qa():
    wiki_url = request.args.get('wiki_url')
    print(f"wiki url is {wiki_url}")
    # https://en.wikipedia.org/wiki/BERT_(language_model) (wiki_title will BERT_(language_model))
    wiki_title = wiki_url.split("/")[-1]
    print(f"wiki_title is {wiki_title}")
    question = request.args.get('q')
    print(question)
    data = {}
    answers = []
    answers.append(getAnswer(wiki_title, question))
    data["result"] = answers
    response = jsonify(data)
    return response


@bp.route('/api/summary')
def summary():
    wiki_url = request.args.get('wiki_url')
    print(f"wiki url is {wiki_url}")
    wiki_title = wiki_url.split("/")[-1]
    print(f"wiki_title is {wiki_title}")
    data = {}
    data["result"] = getSummary(wiki_title)
    response = jsonify(data)
    return response

