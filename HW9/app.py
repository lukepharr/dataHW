from flask import Flask, jsonify

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, inspect, func
engine = create_engine("sqlite:///hawaii.sqlite", echo=False)
Base = automap_base()
Base.prepare(engine, reflect=True)
Base.classes.keys()
Station = Base.classes.station
Measurement = Base.classes.measurement
session = Session(engine)
app = Flask(__name__)
import numpy as np

@app.route("/api/v1.0/precipitation")
def prec():
    """dates and temperature observations from the last year"""

    results = session.query(Measurement.date,Measurement.prcp ).filter(Measurement.date>'2016-08-23').all()

    year_temps = dict(results)


    return jsonify(year_temps)
@app.route("/api/v1.0/stations")
def temps():
    """list of stations"""

    results = session.query(Measurement.station,func.count(Measurement.station)).group_by(Measurement.station).order_by(func.count(Measurement.station).desc()).all()

    stations = dict(results)


    return jsonify(stations)
@app.route("/api/v1.0/tobs")
def tobs():
    """tobs for previous year"""

    results = session.query(Measurement.date,Measurement.tobs ).filter(Measurement.date>'2016-08-23').all()


    tobs = dict(results)


    return jsonify(tobs)
@app.route("/api/v1.0/<start>")
def start_(start):
    """tobs stats after start before end"""

    results = {'mean':session.query(func.avg(Measurement.tobs)).filter(Measurement.date>start).all()[0][0],\
    'max':session.query(func.max(Measurement.tobs)).filter(Measurement.date>start).all()[0][0],\
    'min':session.query(func.min(Measurement.tobs)).filter(Measurement.date>start).all()[0][0]}


    stats = dict(results)


    return jsonify(stats)
@app.route("/api/v1.0/<start>/<end>")
def end_(start,end):
    """tobs stats after start before end"""

    results = {'mean':session.query(func.avg(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0],\
    'max':session.query(func.max(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0],\
    'min':session.query(func.min(Measurement.tobs)).filter(Measurement.date>start).filter(Measurement.date<end).all()[0][0]}


    stats = dict(results)


    return jsonify(stats)
if __name__ == '__main__':
    app.run(debug=True)
