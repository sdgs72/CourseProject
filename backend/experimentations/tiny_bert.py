from transformers import pipeline

import wikipedia

page = wikipedia.WikipediaPage("United_States")
raw = page.content

qa_pipeline = pipeline(
    "question-answering",
    model="mrm8488/bert-tiny-finetuned-squadv2",
    tokenizer="mrm8488/bert-tiny-finetuned-squadv2"
)

''''
print(qa_pipeline({
    'context': "Manuel Romero has been working hardly in the repository hugginface/transformers lately",
    'question': "Who has been working hard for hugginface/transformers lately?"
}))
'''

print(qa_pipeline({
    'context': raw,
    'question': "How many states are there in the United States?"
}))



# summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
# summarizer(text)