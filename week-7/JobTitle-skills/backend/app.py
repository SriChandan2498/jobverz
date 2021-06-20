from flask import Flask, render_template, jsonify
import os
import requests
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

# srcJobtitlesToSkills = './titles_skills_mapping.json'
srcTrending = './extracted_skills - Final (2).csv'

def getJobtitlesAndSkills(url):
    response = requests.get(url)
    return response.json()
    
jobTitleSkillsDict = getJobtitlesAndSkills(srcJobtitlesToSkills)

@app.route("/allJobRoles")
def getTrendingSkills():
    # val=""
    # for i in jobTitleSkillsDict.keys():
    #     val+=(str(i)+',')
    # val=val[:-1] + ''
    return jsonify({"jobRoles" : list(jobTitleSkillsDict.keys())})

@app.route("/<position>")
def getSkills(position):
    jobRole = position.replace('_',' ')
    jobRole = jobRole.replace('+','/')
    if(jobRole not in jobTitleSkillsDict.keys()):
        return jsonify({"jobRole":jobRole ,"trendingSKills" :'noDataFound',"otherSkills" : 'noDataFound'})

    df= pd.read_csv(srcTrending)
    trendsDict = df.set_index('Skills')['Total'].to_dict()
    skills = [i.lower() for i in jobTitleSkillsDict[jobRole]]
    output = set()
    other = set()
    # print(skills)
    for i in skills:
        if(i in trendsDict.keys()):
            output.add(i)
        else:
            other.add(i)
    finalOutput = sorted(output, key = lambda x : trendsDict[x],reverse=True)
    finalOutput = [[i,trendsDict[i]] for i in finalOutput]
    # if comp not in skills_match_df.columns:
    #     # print("Exec---------------------------------------------------")
    #     return jsonify({"company":comp ,"data" :'noDataFound'})
    # comp_df=skills_match_df[['Skills',comp]]
    # comp_df.sort_values(by=[comp],ascending=False,inplace=True)
    # comp_df.reset_index(inplace=True)
    # result=[]
    # for i in comp_df.index:
    #     result.append({"group": comp_df['Skills'][i],"value": comp_df[comp][i]})
    # val='[["Skills","Frequency"]'
    # for i in finalOutput:
    #     val+=(f'"{str(i)}",')
    # val=val[:-1]+"]"
    # otherOutput = "["+str(other)[1:-1]+"]"
    return jsonify({"jobRole":jobRole ,"trendingSKills" : finalOutput,"otherSkills" : list(other) })
    # return jsonify({"company":comp ,"data" :str(val)})

if __name__=="__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)