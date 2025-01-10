const express = require('express');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

let storedData = null; // Store JSON data temporarily
// Endpoint to save JSON data
app.post('/save-json', (req, res) => {
  data = req.body;
  res.status(200).send('Data saved successfully');
});

app.post('/generate-pdf', (req, res) => {
  // Load the JSON file dynamically
  //const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'));
  if (!data) {
    return res.status(400).send('No data available to generate PDF');
  }

  const doc = new PDFDocument({ size: 'A4', margin: 0 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  doc.pipe(res);

  const BGimagePath = './assets/Assessment_Report_Clean.jpg';
  const painLevelImagePath = `./assets/Pain-${data.pain_level}.png`; // Dynamic pain level image
  const callImagePath = './assets/call.png';
  const globalImagePath = './assets/global.png';
  const houseImagePath = './assets/house.png';

  doc.image(BGimagePath, 0, 0, { width: doc.page.width, height: doc.page.height });

  const scaleFactor = 1.05;
  doc.font('./assets/PlusJakartaSans-SemiBold.ttf');

  // Add the header text
  doc.fontSize(8 * scaleFactor).fillColor('#333').text(`Name: ${data.patient_name}`, 15, 90);
  doc.fontSize(8 * scaleFactor).text(`Age/Sex: ${data.age}Y / ${data.gender}`, 247, 90);
  doc.fontSize(8 * scaleFactor).text(`Date of Session: ${data.date}`, 441, 90);

  doc.fontSize(8 * scaleFactor).text(`Doctor: ${data.physiotherapist_name}`, 15, 114);
  doc.fontSize(8 * scaleFactor).text(`Patient ID: 1012`, 247, 114); // Add Patient ID dynamically if available
  doc.fontSize(8 * scaleFactor).text(`Date of Report: ${data.date_of_surgery}`, 441, 114);

  doc.fontSize(8 * scaleFactor).text(`Surgery Type: ${data.surgery_type}`, 15, 139);

  // Horizontal line
  doc.moveTo(9, 170).lineTo(585, 170).stroke();

  // Primary Complaints
  doc.fontSize(10).text('Primary Complaints', 15, 205);
  doc.fontSize(8 * scaleFactor).text(data.primary_complaint, 15, 226);

  // Diagnosis
  doc.fontSize(10).text('Diagnosis', 15, 250);
  doc.fontSize(8 * scaleFactor).text(data.differential_diagnosis, 15, 272);

  // Pain Level and Pain Type
  doc.fontSize(10).text(`Pain Level: ${data.pain_level}/10`, 258, 250);
  doc.image(painLevelImagePath, 258, 268, { width: 135 });

  doc.fontSize(10).text('Pain Type', 451, 250);
  const painTypeText = data.pain_type.join(', ');
  // Split the text into multiple lines based on the separator (comma)
  const painparts = painTypeText.split(', ');
  // Render each part on a new line
  doc.fontSize(8 * scaleFactor);
  painparts.forEach((painpart, index) => {
  doc.text(painpart.trim(), 451, 272 + index * 12);
  });

  // Physical Assessment Findings
  doc.fontSize(10).text('Physical Assessment Findings', 15, 314);
  doc.fontSize(8 * scaleFactor).text(`Affected Areas: ${data.affected_joints.join(', ')}`, 15, 339);
  doc.fontSize(8 * scaleFactor).text(`ROM of Affected Areas: ${data.range_of_motion_active}`, 15, 353);
  doc.fontSize(8 * scaleFactor).text(`ROM of Affected Areas (Passive): ${data.range_of_motion_passive}`, 15, 371);
  doc.fontSize(8 * scaleFactor).text(`Muscle Strength: ${data.muscle_strength}`, 15, 389);

  data.physical_findings.forEach((finding, index) => {
    doc.fontSize(8 * scaleFactor).text(finding, 15, 407 + index * 18);
  });

  // Add Positive Special Tests
  doc.fontSize(10).text('Positive Special Tests', 283, 314).fontSize(10);
  doc.fontSize(8 * scaleFactor).text('McMurray test - Mild Pain', 283, 333);// Add dynamically if available
  // Add Neurological Symptoms
  doc.fontSize(10).text('Neurological Symptoms', 283, 351);
  doc.fontSize(8 * scaleFactor).text('None', 283, 369);// Add dynamically if available

  // Functional Limitations
  doc.fontSize(10).text('Functional Limitations', 283, 386);
  //doc.fontSize(8 * scaleFactor).text(data.functional_limitations.join(', '), 283, 404);
  const funlimTypeText = data.functional_limitations.join(', ');
  const funlimparts = funlimTypeText.split(', ');
  doc.fontSize(8 * scaleFactor);
  funlimparts.forEach((funlimpart, index) => {
  doc.text(funlimpart.trim(), 283, 404 + index * 12);
  });
  
  // Treatment Plan
  doc.fontSize(10).text('Treatment Plan', 15, 508);
  doc.fontSize(8 * scaleFactor).text(data.treatment_plan, 15, 526);

  // Modalities
  doc.fontSize(10).text('Modalities', 247, 508);
  doc.fontSize(8 * scaleFactor).text(data.modalities_used, 247, 526);

  // Additional Assistive Aids
  doc.fontSize(10).text('Additional Assistive Aids', 430, 508);
  doc.fontSize(8 * scaleFactor).text(data.assistive_aids, 430, 526);

  // Additional Notes
  doc.fontSize(10).text('Additional Notes', 15, 624);
  doc.fontSize(8 * scaleFactor).text(data.doctor_prescription, 15, 645, { width: 500 });

  // Footer
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
