# init stuff
A = 0

import wikipedia
import random
from .bert import QA

QA_MODEL = QA('bert-large-uncased-whole-word-masking-finetuned-squad')


def getPredictionAnswerForText(raw_string_page_contents, question):
    global QA_MODEL
    doc = getAnswer(raw_string_page_contents)
    answer = QA_MODEL.predict(doc, question)
    return answer

def getAnswer(wikiTitle, question):
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_string_page_contents = page.content # TODO Cleaning
    print(raw_string_page_contents)
    answer = getPredictionAnswerForText(raw_string_page_contents, question)
    results = {"text": answer['answer'], "score": random.random()}
    return results

def getSummary(wikiTitle):
    page = wikipedia.WikipediaPage(wikiTitle)
    return "I am summary"
