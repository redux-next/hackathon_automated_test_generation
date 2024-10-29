// const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const csvtojson = require('csvtojson')
const Test = require('./test')
const fs = require('fs');

const TestArray = require('./testArray')


const excelToJson = require('convert-excel-to-json');
 

// app.use(express.static('public'))    // static folder
// app.set('view engine','ejs')  
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors())

// // set the template engine

// app.get('/', function(req, res) {
//     res.render('pages/index');
//   });

// app.listen(3000, () => {
//      console.log('server started at port 3000')
// })


// var excelStorage = multer.diskStorage({  
//     destination:(req,file,cb)=>{  
//          cb(null,'./excelUploads');      // file added to the public folder of the root directory
//     },  
//     filename:(req,file,cb)=>{  
//          cb(null,file.originalname);  
//     }  
// });  
// var excelUploads = multer({storage:excelStorage}); 
// app.get('/',(req,res) => {
//        res.render('index.ejs');
// })



// app.post('/uploadExcelFile', excelUploads.single("uploadfile"), async (req, res) => {
//     try {
//         console.log('dfdfgdh')
//         const filePath = './excelUploads/' + req.file.filename; // Ensure this path is correct
//         const arrayToInsert = [];

//         const source = await csvtojson().fromFile(filePath); // Await the promise here

//         consolr.log('SDDF')
//         // Fetching the all data from each row
//         for (const row of source) {
//             const singleRow = {
//                 questions: row["Questions"],
//                 option1: row["Option1"],
//                 option2: row["Option2"],
//                 option3: row["Option3"],
//                 option4: row["Option4"],
//                 correctAnswer: row["correctAnswer"]
//             };
//             arrayToInsert.push(singleRow);
//             console.log('Row to insert:', singleRow);
//         }

//         // Inserting into the table student
//         const result = await Student.insertMany(arrayToInsert); // Await the insertMany call
//         console.log("File imported successfully.", result);
//         res.redirect('/');

//     } catch (err) {
//         console.error("Error importing file:", err);
//         res.status(500).send("Error importing file");
//     }
// });


const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;


mongoose.connect('mongodb+srv://oisik:123@hackathon.iuets.mongodb.net/').then(() => {     // MongoDB connection
    console.log('database connected')
});

// Middleware
app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

// Endpoint to handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {

  console.log('File received:', req.file);

  const filePath = './uploads/' + req.file.filename;

  const arrayToInsert = [];


  // const source = await csvtojson().fromFile(filePath);



  const result = excelToJson({
    sourceFile: filePath
});

fs.writeFileSync('output.json', JSON.stringify(result, null));


console.log(result.Sheet1)
  
  res.send({ message: 'File uploaded successfully', file: req.file });

  for (const row of result.Sheet1) {
             const singleRow = {
                    questions: row["A"],
                    option1: row["B"],
                    option2: row["C"],
                    option3: row["D"],
                    option4: row["E"],
                    correctAnswer: row["F"]
                };

                arrayToInsert.push(singleRow);
              }




              const newTestArray = new TestArray({
                tests: arrayToInsert
              })

              await newTestArray.save()
               
  // const finalResult = await TestArray.insertMany(arrayToInsert);

  console.log('Data imported successfully:', arrayToInsert);
});


app.get('/getData/', async (req, res)=>{
  try{
    const data = await TestArray.find()
    res.json(data)
  }catch(err){
    res.status(500).send(err)
  }
})


app.get(`/getData/${id}`, async (req, res)=>{
  try{
    const data = await TestArray.findOne(id)
    res.json(data)
  }catch(err){
    res.status(500).send(err)
  }
})


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});