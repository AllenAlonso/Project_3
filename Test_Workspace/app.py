import numpy as np

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import pandas as pd
import json

from flask import Flask, jsonify, render_template


#################################################
# Database Setup
#################################################
# engine = create_engine("sqlite:///data/titanic.sqlite")

# # reflect an existing database into a new model
# Base = automap_base()
# # reflect the tables
# Base.prepare(autoload_with=engine)

# # Save reference to the table
# Passenger = Base.classes.passenger

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
    """
    Return a dictionary of summary data. Data are structured as follows:
    Data[Survived_or_Died][Class_1_2_or_3] = count_of_passengers_matching_this_description
    """
    df = pd.read_csv("static/data/baseball_drafts_location.json")
    return df.to_json(orient="records")
    # session = Session(engine)
    # # Query all passengers
    # results = session.query(Passenger.name, Passenger.age, 
    #                         Passenger.sex, Passenger.pclass,
    #                         Passenger.survived).all()

    # session.close()

    # df = pd.DataFrame(results)
    # results = {}
    # results["Survived"] = df[df['survived']==1].groupby(['pclass'])['name'].count().to_dict()
    # results["Died"] = df[df['survived']==0].groupby(['pclass'])['name'].count().to_dict()
    # return jsonify(results)
    # return "passengersbyclass"

# The following routes are not currently used by the application, 
# but can still be accessed when the flask app is running

@app.route("/api/v1.0/names")
def names():
    """Return a list of all passenger names"""

    # Create our session (link) from Python to the DB
    # session = Session(engine)

    # # Query all passengers
    # results = session.query(Passenger.name).all()

    # session.close()

    # # Convert list of tuples into normal list
    # all_names = list(np.ravel(results))

    # return jsonify(all_names)
    return "names"


if __name__ == '__main__':
    app.run(debug=False)
