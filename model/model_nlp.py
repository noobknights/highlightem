#!/usr/bin/env python
# coding: utf-8

# In[43]:


from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
def Similar(query,items):
    index_to_send=[]
    word_tokenizer=Tokenizer()
    word_tokenizer.fit_on_texts(items)
    x_encoded=word_tokenizer.texts_to_sequences(items)
    y_encoded=word_tokenizer.texts_to_sequences([query])
    max_len=len(word_tokenizer.word_index)
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


# In[ ]:




