#ayush day1


data =[23,56,78,97,54,35]

print("my data:",data)
print(("max data:"),max (data))
print(("min data:"),min (data))
print (("avrage:"),sum(data)/len(data))

# find sorted data
sorted_data = sorted(data)
print ("sorted data" , sorted_data)

# find number greater than 35

above_30=[x for x in data if x>30]
print ("above 30:", above_30)


# count number more than 20

print ("count how many number above 30:",len(above_30))