import mysql.connector
import pandas as pd

# Load the dataset
df = pd.read_csv('zipfile/zomato.csv', encoding='latin1')

# Replace NaN values with None (which will be treated as NULL in MySQL)
df = df.where(pd.notnull(df), None)

# Load the Country-code data from Excel
country_df = pd.read_excel('zipfile/Country-Code.xlsx')

# MySQL connection
connection = mysql.connector.connect(
    host="localhost",  
    user="root",  
    password="root@123",  
    database="zomato_db"  
)
cursor = connection.cursor()

# Insert unique countries into the countries table
for _, row in country_df.iterrows():
    cursor.execute('''
        INSERT IGNORE INTO countries (country_code, country_name)
        VALUES (%s, %s)
    ''', (row['Country Code'], row['Country']))

# Insert data into restaurants table while ignoring duplicates (INSERT IGNORE)
for _, row in df.iterrows():
    cursor.execute('''
        INSERT IGNORE INTO restaurants (restaurant_id, name, address, city, cuisines, average_cost, aggregate_rating, latitude, longitude, country_code)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    ''', (row['Restaurant ID'], row['Restaurant Name'], row['Address'], row['City'], row['Cuisines'], row['Average Cost for two'], row['Aggregate rating'], row['Latitude'], row['Longitude'], row['Country Code']))

connection.commit()
connection.close()