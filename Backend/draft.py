import pandas as pd
df =  pd.read_csv('extracted_skills - Final (1).csv')
for i in df.columns[1:-1]:
    print(f'<option value = \"{i}\" >{i}</option>')