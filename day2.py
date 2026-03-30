#load the data sheet
import matplotlib.pyplot as pit 
import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("/home/bog/day1/StudentsPerformance.csv")

print ("first 5 row of data sheet")

print(df.head())


print("\n shape of data sheet")
print(df.shape)

print("\n column of data sheet")
print(df.columns.tolist())



# data Analysis
#avrage score

print("avrage score")
print("math:" ,df ['math score'] .mean(), round(2))
print("reading",df['reading score'].mean(),round(2))
print("writing" ,df ['writing score'].mean(),round(2))

#who score better Male of Female

print("\n score by gendder")
print(df.groupby('gender') [['math score', 'reading score' , 'writing score']].mean().round(2))


#does test prepration help

print("\n    impect of test prepration cource")
print(df.groupby("test preparation course")[['math score', 'reading score', 'writing score']].mean().round(2))


#top 5 student name

print("  Top 5 scores")
print(df.nlargest (5, 'math score') [['gender' , 'math score' , 'reading score' , 'writing score']])

avg_score = df[['math score' , 'reading score' , 'writing score']].mean()
avg_score.plot(kind='bar')
plt.title("average student score")
pit.xlabel("subject")
pit.ylabel("avrage score")
pit.xticks(rotation=0)

pit.show()

gender_avg = df.groupby('gender')[['math score' , 'reading score' , 'writing score']].mean()

gender_avg.plot(kind='bar')

plt.title("avrage score by gender")
pit.xlabel("gender")
pit.ylabel("marks")

pit.show()

df['math score'].plot(kind='hist' , bins=20)
pit.title("math score distribution")
pit.xlabel("math score")
pit.ylabel("number of student")

pit.show()



