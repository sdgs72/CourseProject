# init stuff
A = 0

import wikipedia
import random
def getAnswer(wikiTitle, question):
    print("loadmodel")
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_string_page_contents = page.content # TODO Cleaning
    results = {"text": "I am answer 1" , "score": random.random()}
    return results



def getSummary(wikiTitle):
    page = wikipedia.WikipediaPage(wikiTitle)
    return "I am summary"