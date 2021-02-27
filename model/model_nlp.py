from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def txt_to_list(path):
    import re
    file = open(path,'r')
    file_list = file.readlines()
    filtered_file_list = []
    for i in range(len(file_list)):
        text = re.sub('\n','',file_list[i][:])
        filtered_file_list.append(text)
    return filtered_file_list

def Similar(query,items):
    stopwords = txt_to_list('stopwords.txt')
    text = []
    index_to_send=[]
    word_tokenizer=Tokenizer()
    
    word_tokenizer.fit_on_texts(items)
    sent=[]
    for item in items:
        words=[]
        for word in item.split(" "):
            words.append(word)
        sent.append(words)
    word_tokenizer_stop = Tokenizer()
    word_tokenizer_stop.fit_on_texts(sent)
    x_encoded=word_tokenizer_stop.texts_to_sequences(sent)
    y_encoded=word_tokenizer_stop.texts_to_sequences([query])
    max_len=len(word_tokenizer_stop.word_index)
    X_padded=pad_sequences(x_encoded,maxlen=max_len,padding='pre',truncating='post') 
    Y_padded=pad_sequences(y_encoded,maxlen=max_len,padding='pre',truncating='post')
    cosine_sim=cosine_similarity(Y_padded,X_padded)
    main_index=np.argmax(cosine_sim)
    #index_to_send.append(main_index)
    cosine_sim_2=cosine_similarity(X_padded,X_padded)
    similar_scores=list(enumerate(cosine_sim_2[main_index]))
    similar_scores=sorted(similar_scores,key=lambda x:x[1],reverse=True)
    if(len(similar_scores)>5):
        similar_scores=similar_scores[0:5]
    else:
        similar_scores=similar_scores[:]
    root_indices=[i[0] for i in similar_scores]
    index_to_send.append(root_indices)
    return np.array(index_to_send).flatten()