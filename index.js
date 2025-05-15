const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load JSON data
const dsaData = require('./DSA_Questions_Day1_to_90.json');

// Generate PDF function
function generatePDF() {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({ margin: 50 });
        const pdfPath = path.join(__dirname, 'public', 'DSA_90_Days_Challenge.pdf');
        const output = fs.createWriteStream(pdfPath);
        
        // Handle stream events
        output.on('finish', () => {
            console.log('✅ PDF generated successfully');
            resolve(pdfPath);
        });
        
        output.on('error', (err) => {
            console.error('❌ Error generating PDF:', err);
            reject(err);
        });
        
        doc.pipe(output);
        
        // Title
        doc.fontSize(18).font('Helvetica-Bold')
           .text('90 Days DSA Challenge (JavaScript)', { align: 'center' })
           .moveDown(1);
        
        // Function to add a day header
        function addDayTitle(day) {
            doc.addPage();
            doc.fontSize(14).fillColor('black').font('Helvetica-Bold')
               .text(`Day ${day}`, { underline: true });
            doc.moveDown(0.5);
        }
        
        // Function to add question block
        function addQuestionBlock(qNo, question, input, output) {
            doc.fontSize(11).font('Helvetica').fillColor('black')
               .text(`${qNo}. ${question}`, { continued: false });
            doc.fontSize(10).fillColor('gray').font('Helvetica-Oblique')
               .text(`   Input: ${input}`)
               .text(`   Output: ${output}`)
               .moveDown(0.5);
        }
        
        // Loop through all days
        for (const dayData of dsaData) {
            addDayTitle(dayData.day);
            dayData.questions.forEach((q, i) => {
                addQuestionBlock(i + 1, q.question, q.input, q.expected_output);
            });
        }
        
        doc.end();
    });
}

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Display DSA questions in browser
app.get('/dsa', (req, res) => {
    // Get day parameter or default to showing all days
    const selectedDay = req.query.day ? parseInt(req.query.day) : null;
    
    // Filter data for selected day or get all data
    let filteredData;
    if (selectedDay) {
        filteredData = dsaData.filter(day => day.day === selectedDay);
    } else {
        filteredData = dsaData;
    }
    
    res.render('dsa', { 
        dsaData: filteredData,
        allDays: dsaData.map(day => day.day),
        selectedDay: selectedDay
    });
});

// View PDF route
app.get('/view-pdf', (req, res) => {
    // Check if PDF exists, if not generate it
    const pdfPath = path.join(__dirname, 'public', 'DSA_90_Days_Challenge.pdf');
    
    if (fs.existsSync(pdfPath)) {
        res.sendFile(pdfPath);
    } else {
        generatePDF()
            .then((filePath) => {
                res.sendFile(pdfPath);
            })
            .catch(err => {
                res.status(500).send('Error generating PDF');
            });
    }
});

// Download PDF route
app.get('/download-pdf', (req, res) => {
    const pdfPath = path.join(__dirname, 'public', 'DSA_90_Days_Challenge.pdf');
    
    // Check if PDF exists, if not generate it
    if (fs.existsSync(pdfPath)) {
        res.download(pdfPath);
    } else {
        generatePDF()
            .then(() => {
                res.download(pdfPath);
            })
            .catch(err => {
                res.status(500).send('Error generating PDF for download');
            });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});