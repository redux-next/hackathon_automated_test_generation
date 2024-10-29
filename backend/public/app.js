const Student = require('../student');


var excelStorage = multer.diskStorage({  
    destination:(req,file,cb)=>{  
         cb(null,'./excelUploads');      // file added to the public folder of the root directory
    },  
    filename:(req,file,cb)=>{  
         cb(null,file.originalname);  
    }  
});  
var excelUploads = multer({storage:excelStorage}); 
app.get('/',(req,res) => {
       res.render('index.ejs');
})



app.post('/uploadExcelFile', excelUploads.single("uploadfile"), async (req, res) => {
    try {
        console.log('dfdfgdh')
        const filePath = './excelUploads/' + req.file.filename; // Ensure this path is correct
        const arrayToInsert = [];

        const source = await csvtojson().fromFile(filePath); // Await the promise here

        consolr.log('SDDF')
        // Fetching the all data from each row
        for (const row of source) {
            const singleRow = {
                questions: row["Questions"],
                option1: row["Option1"],
                option2: row["Option2"],
                option3: row["Option3"],
                option4: row["Option4"],
                correctAnswer: row["correctAnswer"]
            };
            arrayToInsert.push(singleRow);
            console.log('Row to insert:', singleRow);
        }

        // Inserting into the table student
        const result = await Student.insertMany(arrayToInsert); // Await the insertMany call
        console.log("File imported successfully.", result);
        res.redirect('/');

    } catch (err) {
        console.error("Error importing file:", err);
        res.status(500).send("Error importing file");
    }
});