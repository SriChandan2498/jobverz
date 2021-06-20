from flask import Flask, render_template, jsonify
import os
import json
import pandas as pd
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

srcJobtitlesToSkills = './jobtitleTrendingSkills.json'
srcTrending = './Aggregated Skills Data - Final.csv'

def getJobtitlesAndSkills(src):
    f = open(src)
    jobTitleSkillsDict = json.load(f)
    return jobTitleSkillsDict

jobTitleSkillsDict = getJobtitlesAndSkills(srcJobtitlesToSkills)

@app.route("/allJobRoles")
def getTrendingSkills():
    return jsonify({"jobRoles" : list(jobTitleSkillsDict.keys())})

@app.route("/<position>")
def getSkills(position):
    jobRole = position.replace('_',' ')
    jobRole = jobRole.replace('+','/')
    if(jobRole not in jobTitleSkillsDict.keys()):
        return jsonify({"jobRole":jobRole ,"trendingSKills" :'noDataFound',"otherSkills" : 'noDataFound'})
    else:
        return jsonify(jobTitleSkillsDict[jobRole])

if __name__=="__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port)