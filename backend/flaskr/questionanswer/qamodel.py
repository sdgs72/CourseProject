# init stuff
A = 0

import wikipedia

def getAnswer(wikiTitle, question):
    print("loadmodel")
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_string_page_contents = page.content # TODO Cleaning
    return ["I am answer 1"]