const express = require('express');
const PDFDocument = require('pdfkit');

const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.post('/generate-pdf', (req, res) => {
  const doc = new PDFDocument({ size: 'A4', margin: 0 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  doc.pipe(res);

  
  // Set the path to your image file
  const BGimagePath = './assets/Assessment_Report_Clean.jpg';
  const painLevel5ImagePath = './assets/Pain-8.png';
  const callImagePath = './assets/call.png';
  const globalImagePath = './assets/global.png';
  const houseImagePath = './assets/house.png';

  // Add the background image first
  doc.image(BGimagePath, 0, 0, { width: doc.page.width, height: doc.page.height });

  // Add text after the image
//   doc.fontSize(25).text('Hello, World! This is your PDF file.');
//   doc.fontSize(15).text('with co-ordinates 100 100', 100, 100);
//   doc.fontSize(9).text('with co-ordinates 400 100', 400, 100);
//   doc.fontSize(12).text('with co-ordinates 100 200', 100, 200);
//   doc.fontSize(9).text('with co-ordinates 100 300', 100, 300);
const scaleFactor = 1.05;
  doc.font('./assets/PlusJakartaSans-SemiBold.ttf');
  // Function to add spaced text

    // Add the header text
    
  doc.fontSize(8 * scaleFactor).fillColor('#333').text('Name: Rehan Poonawala', 15, 90);
  doc.fontSize(8 * scaleFactor).text('Age/Sex: 32Y / M', 247, 90);
  doc.fontSize(8 * scaleFactor).text('Date of Session: 10/01/2025', 441, 90);

  doc.fontSize(8 * scaleFactor).text('Doctor: Dr. Shweta Dharod', 15, 114);
  doc.fontSize(8 * scaleFactor).text('Patient ID: 1012', 247, 114);
  doc.fontSize(8 * scaleFactor).text('Date of Report: 11/01/2025', 441, 114);

  doc.fontSize(8 * scaleFactor).text('Surgery Type: Total Knee Replacement', 15, 139);

  // Draw a horizontal line
  doc.moveTo(9, 170).lineTo(585, 170).stroke();

  // Add sections
  doc.fontSize(10).text('Primary Complaints', 15, 205).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Pain and stiffness in the right knee following surgery.', 15, 226);

  doc.fontSize(10).text('Diagnosis', 15, 250).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Post-surgical inflammation', 15, 272);

  doc.fontSize(10).text('Pain Level: 8/10', 258, 250).fontSize(10);
  doc.image(painLevel5ImagePath, 258, 268, { width: 135 });

  doc.fontSize(10).text('Pain Type', 451, 250).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Dull Aching Pain', 451, 272);

  // Add Physical Assessment Findings
  doc.fontSize(10).text('Physical Assessment Findings', 15, 314).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Affected Areas: Knee', 15, 339);
  doc.fontSize(8 * scaleFactor).text('ROM of Affected Areas: Limited - More than Half', 15, 353);
  doc.fontSize(8 * scaleFactor).text('ROM of Affected Areas(Passive): Limited - More than Half', 15, 371);
  doc.fontSize(8 * scaleFactor).text('Muscle Strength: Weak', 15, 389);
  doc.fontSize(8 * scaleFactor).text('Swelling: Absent', 15, 407);
  doc.fontSize(8 * scaleFactor).text('Tenderness: Yes', 15, 425);
  doc.fontSize(8 * scaleFactor).text('Redness: No', 15, 443);
  doc.fontSize(8 * scaleFactor).text('Tightness: Yes', 15, 461);

   // Add Positive Special Tests
  doc.fontSize(10).text('Positive Special Tests', 283, 314).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('McMurray test - Mild Pain', 283, 333);
  doc.fontSize(10).text('Neurological Symptoms', 283, 351);
  doc.fontSize(8 * scaleFactor).text('None', 283, 369);
  doc.fontSize(10).text('Functional Limitations', 283, 386);
  doc.fontSize(8 * scaleFactor).text('Walking', 283, 404);
  doc.fontSize(8 * scaleFactor).text('Sitting', 283, 415);

  // Add more sections
  doc.fontSize(10).text('Treatment Plan', 15, 508).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Knee ROM Exercises', 15, 526);
  doc.fontSize(8 * scaleFactor).text('Ankle Pumps', 15, 540);
  doc.fontSize(8 * scaleFactor).text('Walking Exercises', 15, 556);
  doc.fontSize(8 * scaleFactor).text('Static Quads and Dynamic Quads', 15, 572);

  doc.fontSize(10).text('Modalities', 247, 508).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Ultrasound for 15 minutes Daily', 247, 526);

  doc.fontSize(10).text('Treatment Duration', 247, 550).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('6 weeks | 2 to 3 sessions per week', 247, 565);

  doc.fontSize(10).text('Additional assistive aids', 430, 508).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Walker', 430, 526);
  doc.fontSize(8 * scaleFactor).text('Theraband - 2kg', 430, 538);

  doc.fontSize(10).text('Additional Notes', 15, 624).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('Patient reports good adherence to home exercises but finds knee tightness limiting progress.', 15, 645, { width: 500 });

  // Footer section
  doc.fontSize(7 * 1.155).text('Physica Healthtech Private Limited', 15, 780);
  doc.image(houseImagePath, 12, 798, { width: 10 });
  doc.fontSize(6 * 1.25).text('386 Sane Guruji Premises, Veer Savarkar Marg, Prabhadevi, Mumbai 400025', 27, 800);
  doc.image(globalImagePath, 12, 815, { width: 10 });
  doc.fontSize(6 * 1.3).text('www.physica.fit', 27, 815);
  doc.image(callImagePath, 139, 815, { width: 10 });
  doc.fontSize(6 * 1.2).text('+91 9892260450', 153, 815);

  doc.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
