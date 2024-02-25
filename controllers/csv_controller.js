//parse function for csv files and fs
const {parse} = require('csv-parse');
const fs = require('fs');

//csv model
const Csv = require('../models/csv');

module.exports = {
    //controller for uploading the file 
    uploadFile: (req, res)=>{

        //checking is the file is uploaded or not
        if(!req.file){
            return res.status(400).send("No file uploaded");
        }
        
        //putting a check so that only csv files are accepted
        if(req.file.mimetype !== 'text/csv'){
            return res.status(400).send("Only CSV files are allowed");
        }
        
        const csvData = []; //for the datarow
        const headers = []; //for the headers 

        //parsing the csv file 
        const stream = fs.createReadStream(req.file.path, 'utf8');
        stream.pipe(parse({
            columns: true,
            delimiter: ',',
            trim: true
        }))
        .on('data', (record)=>{
            //putting all the data into the csvData array
            csvData.push(record);
        })
        .on('end', async ()=>{
            console.log("csv parsing completed");
            console.log(csvData);

            //creating an array to identify the headers of the file
            Object.keys(csvData[0]).forEach(key=>{
                headers.push(key)
            })
            console.log(headers);

            //pushing the file into the database 
            try {
                await Csv.create({
                    name: req.file.filename, //name of the file
                    header_row: headers, //the headers
                    data_row: csvData //the main data in the form of array of objects
                })
            } catch (error) {
                console.log(`error in creating document --> ${error}`);
                return res.status(400).send("Error in creating");
            }

            return res.redirect('back');
        })
        .on('error', (err)=>{
            console.error("Error parsing csv", err);
            return res.status(500).send("Error in parsing csv file");
        })
    },

    //controller for viewing single file 
    view: async (req, res)=>{
        try {
            //fetching the file using id inside params 
            let csvFile = await Csv.findOne({_id: req.params.id});
            if(!csvFile){
                return res.status(400).end("Not found");
            }
            
            //passing the data row in this form to be used by the frontend javascript
            const dataRow = JSON.stringify(csvFile.data_row)    
            
            return res.render("csvFile", {
                title: "file",
                csvFile: csvFile, //to be used by ejs
                dataRow: dataRow //to be used by javascript 
            })
            
        } catch (error) {
            
            return res.redirect('back');
        }
    }
}

