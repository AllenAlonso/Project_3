import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
import json

from flask import Flask, jsonify, render_template

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def main_page():
    """
    Render the main page of the webapp.
    Currently, the only api route accessed by the web page is 'passengersbyclass'.
    """
    return render_template('index.html')
# grabs top 10 highschool player data for the drop down 
@app.route("/highschool")
def high_school():
    with open("static/data/the_top_10_HS.json") as hsdata:
        jdata= json.load(hsdata)
    return jdata

@app.route("/college")
def college():
    with open("static/data/the_top_10_colleges.json") as hsdata:
        jdata= json.load(hsdata)
    return jdata

@app.route("/api/v1.0/baseballdata")
def passengers_by_class():
   
    df = pd.read_csv("static/data/baseball_drafts_location.json")
    return df.to_json(orient="records")


if __name__ == '__main__':
    app.run(debug=False)
