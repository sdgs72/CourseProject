# init stuff
import wikipedia
import random
import re
from .nltk_implementation import getAnswerFor


REMOVABLE_SECTIONS = ["== See Also ==", "== External links ==", "== References ==", "== Further reading ==", "=== References ==="]

def removeSections(raw_string_page_contents):
    a_string = raw_string_page_contents
    for elem in REMOVABLE_SECTIONS:
        split_string = a_string.split(elem, 1)
        a_string = split_string[0]
    return a_string

def cleanText(raw_string_page_contents):
    cleaned_text = raw_string_page_contents.strip()
    cleaned_text = re.sub("=.*=.", "", cleaned_text) # remove headings...
    print(raw_string_page_contents)
    print(cleaned_text)
    return cleaned_text

def getAnswer(wikiTitle, question):
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_string_page_contents = page.content 
    raw_string_page_contents = cleanText(raw_string_page_contents)
    answer = getAnswerFor(raw_string_page_contents, question)
    results = {"text": answer, "score": 1.0}
    return results

def getSummary(wikiTitle):
    page = wikipedia.WikipediaPage(wikiTitle)
    raw_summary = page.summary
    images = page.images[:10] if len(page.images) > 10 else page.images
    
    cleaned_raw_summary = cleanText(raw_summary)
    return cleaned_raw_summary, images 



