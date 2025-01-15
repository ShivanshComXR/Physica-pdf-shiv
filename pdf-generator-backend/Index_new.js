const express = require('express');
const PDFDocument = require('pdfkit');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


// Endpoint to save JSON data
app.post('/save-json', (req, res) => {
  data = req.body;
  res.status(200).send('Data saved successfully');
});

app.post('/generate-pdf', (req, res) => {
  if (!data) {
    return res.status(400).send('No data available to generate PDF');
  }

  const doc = new PDFDocument({ size: [1440, 2038], margin: 0 });

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="generated.pdf"');

  doc.pipe(res);

  const BGimagePath = './assets/Assessment_Report_Clean.jpg';
  const painLevelImagePath = `./assets/Pain-${data.pain_level}.png`; // Dynamic pain level image
  const callImagePath = './assets/call.png';
  const globalImagePath = './assets/global.png';
  const houseImagePath = './assets/house.png';

  doc.image(BGimagePath, 0, 0, { width: 1440, height: 2038 });

  const scaleFactor = 1.05;
  doc.font('./assets/PlusJakartaSans-SemiBold.ttf');

  // Header section
  doc.fontSize(12).fillColor('#333').text(`Name: ${data.patient_name}`, 150, 200);
  doc.text(`Age/Sex: ${data.age}Y / ${data.gender}`, 650, 200);
  doc.text(`Date of Session: ${data.date}`, 1150, 200);

  doc.text(`Doctor: ${data.physiotherapist_name}`, 150, 260);
  doc.text(`Patient ID: 1012`, 650, 260); // Dynamically add Patient ID if available
  doc.text(`Date of Report: ${data.date_of_surgery}`, 1150, 260);

  doc.text(`Surgery Type: ${data.surgery_type}`, 150, 320);

  // Horizontal line
  doc.moveTo(100, 360).lineTo(1340, 360).stroke();

  // Primary Complaints
  doc.fontSize(14).text('Primary Complaints', 150, 400);
  doc.fontSize(12).text(data.primary_complaint, 150, 440);

  // Diagnosis
  doc.fontSize(14).text('Diagnosis', 150, 500);
  doc.fontSize(12).text(data.differential_diagnosis, 150, 540);

  // Pain Level and Pain Type
  doc.fontSize(14).text(`Pain Level: ${data.pain_level}/10`, 700, 500);
  doc.image(painLevelImagePath, 700, 540, { width: 200 });

  doc.fontSize(14).text('Pain Type', 1050, 500);
  const painTypeText = data.pain_type.join(', ');
  const painparts = painTypeText.split(', ');
  doc.fontSize(12);
  painparts.forEach((painpart, index) => {
    doc.text(painpart.trim(), 1050, 540 + index * 20);
  });

  // Physical Assessment Findings
  doc.fontSize(14).text('Physical Assessment Findings', 150, 620);
  doc.fontSize(12).text(`Affected Areas: ${data.affected_joints.join(', ')}`, 150, 660);
  doc.text(`ROM of Affected Areas: ${data.range_of_motion_active}`, 150, 700);
  doc.text(`ROM of Affected Areas (Passive): ${data.range_of_motion_passive}`, 150, 740);
  doc.text(`Muscle Strength: ${data.muscle_strength}`, 150, 780);

  data.physical_findings.forEach((finding, index) => {
    doc.text(finding, 150, 820 + index * 40);
  });

  // Positive Special Tests
  doc.fontSize(14).text('Positive Special Tests', 750, 620);
  doc.fontSize(12).text('McMurray test - Mild Pain', 750, 660); // Dynamically add if available

  // Neurological Symptoms
  doc.fontSize(14).text('Neurological Symptoms', 750, 700);
  doc.text('None', 750, 740); // Dynamically add if available

  // Functional Limitations
  doc.fontSize(14).text('Functional Limitations', 750, 780);
  const funlimTypeText = data.functional_limitations.join(', ');
  const funlimparts = funlimTypeText.split(', ');
  funlimparts.forEach((funlimpart, index) => {
    doc.text(funlimpart.trim(), 750, 820 + index * 20);
  });

  // Treatment Plan
  doc.fontSize(14).text('Treatment Plan', 150, 1000);
  doc.fontSize(12).text(data.treatment_plan, 150, 1040);

  // Modalities
  doc.fontSize(14).text('Modalities', 750, 1000);
  doc.fontSize(12).text(data.modalities_used, 750, 1040);

  // Additional Assistive Aids
  doc.fontSize(14).text('Additional Assistive Aids', 1050, 1000);
  doc.fontSize(12).text(data.assistive_aids, 1050, 1040);

  // Additional Notes
  doc.fontSize(14).text('Additional Notes', 150, 1140);
  doc.fontSize(12).text(data.doctor_prescription, 150, 1180, { width: 1200 });

  // Footer
  doc.fontSize(10).text('Physica Healthtech Private Limited', 150, 1900);
  doc.image(houseImagePath, 150, 1940, { width: 20 });
  doc.text('386 Sane Guruji Premises, Veer Savarkar Marg, Prabhadevi, Mumbai 400025', 180, 1940);
  doc.image(globalImagePath, 850, 1940, { width: 20 });
  doc.text('www.physica.fit', 880, 1940);
  doc.image(callImagePath, 1200, 1940, { width: 20 });
  doc.text('+91 9892260450', 1230, 1940);

  doc.end();
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
