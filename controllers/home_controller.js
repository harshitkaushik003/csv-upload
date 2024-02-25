const Csv = require("../models/csv")

//controller for home 
module.exports = {
    home: async (req, res)=>{
        //fetching all the files from database
        const csvFile = await Csv.find({});
        
        return res.render("home", {
            title: "Homepage",
            csvFile: csvFile
        })
    }
}