from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
app=Flask(__name__)
CORS(app) # kya likhu yha

#load the dataset 
df= pd.read_csv("/home/bog/day1/StudentsPerformance.csv")

#rout 1 - Home

@app.route('/')
def home():
    return jsonify ({
        "message": "welcome to student performance API",
        "made_by":"ayush dubey",
        "total student":(len(df))
    })

#get all student
@app.route('/student')
def get_student():
    return jsonify(df.head(10).to_dict(orient='records'))


#get avrage score
@app.route('/average')
def get_avrage():
    return jsonify({
        "math": round(df['math score'].mean(), 2),
        "reading":round(df['reading score'].mean(),2),
        "writng":round(df['writing score'].mean(),2) 
    })

# route 4 by gender
@app.route('/by-gender')
def by_gender():
    result = df.groupby('gender')[['math score', 'reading score', 'writing score']].mean()
    return jsonify(result.to_dict())



# route 5 top 5 student
@app.route('/top5student')
def top5():
    top=df.nlargest(5, 'math score')[['gender', 'reading score', 'writing score']]
    return jsonify(top.to_dict(orient='records'))




if __name__ == '__main__':
    app.run(debug=True)

