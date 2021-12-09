# init stuff
import wikipedia
import random
import re
from .nltk_implementation import getAnswerFor

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lex_rank import LexRankSummarizer
import json

LEX_RANK_SUMMARIZER = LexRankSummarizer()

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
    return removeSections(cleaned_text)

def getAnswer(wikiTitle, question):
    page = wikipedia.WikipediaPage(wikiTitle)
    decoded_text = page.content
    cleaned_text = cleanText(decoded_text)
    answer = getAnswerFor(cleaned_text, question)
    results = {"text": answer, "score": 1.0}
    return results

def getSummary(wikiTitle):
    print(wikipedia.__file__)
    global LEX_RANK_SUMMARIZER
    page = wikipedia.WikipediaPage(wikiTitle)
    images = page.images[:10] if len(page.images) > 10 else page.images
    #decoded_text = json.loads('' + "\"" + page.content + "\"")
    decoded_text = page.content
    cleaned_text = cleanText(decoded_text)
    my_parser = PlaintextParser.from_string(cleaned_text,Tokenizer('english'))
    summary_sencentences = LEX_RANK_SUMMARIZER(my_parser.document,sentences_count=10)
    summary = ""
    summary_line_count = 0
    for sentence in summary_sencentences:
        if summary_line_count == 5: # summary length size
            break
        string_sentence = str(sentence)
        if len(string_sentence) >= 5: # full sentence
            print(string_sentence)
            summary += string_sentence 
            summary_line_count += 1
    return summary, images 



