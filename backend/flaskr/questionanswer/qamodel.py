# init stuff
import wikipedia
import random
from .nltk_implementation import getAnswerFor

def cleanText(raw_string_page_contents):
    return raw_string_page_contents.strip('\'').strip('==')

def getAnswer(wikiTitle, question):
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_string_page_contents = page.content # TODO Cleaning
    raw_string_page_contents = cleanText(raw_string_page_contents)
    print(raw_string_page_contents)
    answer = getAnswerFor(raw_string_page_contents, question)
    print("------------------SECTIONS-----------------")
    print(page.sections)
    results = {"text": answer, "score": 1.0}
    return results

def getSummary(wikiTitle):
    page = wikipedia.WikipediaPage(wikiTitle)
    return "I am summary"


