# init stuff
import wikipedia
import random
import re
from .nltk_implementation import getAnswerFor

def cleanText(raw_string_page_contents):
    cleaned_text = raw_string_page_contents.strip()
    cleaned_text = re.sub("=.*=.", "", cleaned_text) # remove headings...
    print("------------ before cleaning ----------------")
    print(raw_string_page_contents)
    print("------------ after cleaning ----------------")
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



