import nltk
from nltk.stem import WordNetLemmatizer
import wikipedia
import string
from sklearn.feature_extraction.text import TfidfVectorizer

import io
import random
import string # to process standard python strings
import warnings
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

#nltk.download('punkt') # install tokenizers/punkt/english.pickle
nltk.download('popular', quiet=True) #downloads packages

lemmer = nltk.stem.WordNetLemmatizer()
remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)

def LemTokens(tokens):
    return [lemmer.lemmatize(token) for token in tokens]

def LemNormalize(text):
    return LemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))

def getAnswerFor(passage, question):
    sentence_tokens = nltk.sent_tokenize(passage)# converts to list of sentences 
    sentence_tokens.append(question)

    TfidfVec = TfidfVectorizer(tokenizer=LemNormalize, stop_words='english')
    tfidf = TfidfVec.fit_transform(sentence_tokens)

    cosine_scores = cosine_similarity(tfidf[-1], tfidf)
    index_of_highest_score = cosine_scores.argsort()[0][-2]
    
    flattened_scores = cosine_scores.flatten()
    flattened_scores.sort()
    req_tfidf = flattened_scores[-2]

    sentence_tokens.remove(question)

    if(req_tfidf==0):
        return "Sorry, I can't help you with that"
    else:
        return str(sentence_tokens[index_of_highest_score])