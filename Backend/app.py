from flask import Flask, render_template, jsonify
import os
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
path = './extracted_skills - Final (1).csv'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<comp>")
def getCompanyDetails(comp):
    skills_match_df= pd.read_csv(path)
    if comp not in skills_match_df.columns:
        # print("Exec---------------------------------------------------")
        return jsonify({"company":comp ,"data" :'noDataFound'})
    comp_df=skills_match_df[['Skills',comp]]
    comp_df.sort_values(by=[comp],ascending=False,inplace=True)
    comp_df.reset_index(inplace=True)
    result=[]
    for i in comp_df.index:
        result.append({"group": comp_df['Skills'][i],"value": comp_df[comp][i]})
    val="["
    for i in result:
        val+=(str(i)+',')
    val=val[:-1]+"]"
    return jsonify({"company":comp ,"data" :str(val)})

if __name__=="__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)