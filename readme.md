# introduction
CSV upload is an express project for coding ninjas backend skill test.
This project allows the user to upload a csv file and then view it whenever required in a very simplified manner 

# structure
index.js is the starting file
routes contains all the routes
controller contains the actions for the routes

# model
The csv model is a mongodb schema for saving the files to be accessible premanently, otherwise it would disappear once the server is restarted
It contains: 
name: name of the file
header_row: the field containing information regarding header of the csv file, as it supposed to be dynamic
data_row: this field contains the main csv data in the form of an array of objects 

# setup
please run npm install to install all the dependencies 

# working
This project makes use of multer for uploading the files and csv-parse to parse the files into data that can be used by us 

