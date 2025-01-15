// import React from 'react';

// function App() {
//   const generatePDF = async () => {
//     const response = await fetch('http://localhost:3001/generate-pdf', {
//       method: 'POST',
//     });

//     // Check if the response is successful
//     if (response.ok) {
//       const blob = await response.blob();  // Get the PDF as a Blob
//       const url = window.URL.createObjectURL(blob);  // Create an object URL for the Blob
//       const a = document.createElement('a');  // Create an anchor element
//       a.style.display = 'none';  // Hide the anchor element
//       a.href = url;  // Set the href to the object URL
//       a.download = 'generated.pdf';  // Set the file name for download
//       document.body.appendChild(a);  // Append the anchor to the body
//       a.click();  // Programmatically click the anchor to trigger download
//       window.URL.revokeObjectURL(url);  // Clean up the object URL
//     } else {
//       console.error('PDF generation failed');
//     }
//   };

//   return (
//     <div>
//       <button onClick={generatePDF}>Generate PDF</button>
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';

const App = () => {
  const [responses, setResponses] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const questions = require('./form.json').form;

  const handleInputChange = (fieldId, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [fieldId]: value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/save-json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(responses),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        setIsFormSubmitted(true);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate-pdf', {
        method: 'POST',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'generated.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error('PDF generation failed');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const renderField = (field) => {
    switch (field.answer_type) {
      case 'text':
      case 'number':
      case 'date':
        return (
          <input
            type={field.answer_type}
            placeholder={field.placeholder || ''}
            onChange={(e) => handleInputChange(field.id, e.target.value)}
          />
        );
      case 'radio':
        return field.options?.map((option) => (
          <div key={`${field.id}-${option}`} className="option">
            <label>
              <input
                type="radio"
                name={field.id}
                value={option}
                onChange={() => handleInputChange(field.id, option)}
              />
              {option}
            </label>
          </div>
        ));
      case 'checkbox':
        return field.options?.map((option) => (
          <div key={`${field.id}-${option}`} className="option">
            <label>
              <input
                type="checkbox"
                value={option}
                onChange={(e) => {
                  const newValue = responses[field.id] || [];
                  if (e.target.checked) {
                    handleInputChange(field.id, [...newValue, option]);
                  } else {
                    handleInputChange(
                      field.id,
                      newValue.filter((val) => val !== option)
                    );
                  }
                }}
              />
              {option}
            </label>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <div className="form-container">
          {questions.map((question, index) => (
            <div key={index} className="question">
              <h2>{question.question}</h2>
              {renderField(question)}
            </div>
          ))}
          <button onClick={handleFormSubmit}>Submit</button>
        </div>
      ) : (
        <div>
          <button onClick={handleGeneratePDF}>Generate PDF</button>
        </div>
      )}
    </div>
  );
};

export default App;


// import React, { useState } from "react";

// function App() {
//   const [loading, setLoading] = useState(false);

//   const handleGeneratePDF = async () => {
//     setLoading(true);

//     try {
//       // Make a request to the backend's `/generate-pdf` endpoint
//       const response = await fetch("http://localhost:3001/generate-pdf", {
//         method: "POST",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate PDF");
//       }

//       // Create a blob from the PDF response
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);

//       // Trigger the download
//       const link = document.createElement("a");
//       link.href = url;
//       link.download = "Generated_Report.pdf";
//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       setLoading(false);
//       alert("PDF downloaded successfully!");
//     } catch (error) {
//       setLoading(false);
//       console.error("Error generating PDF:", error);
//       alert("An error occurred while generating the PDF. Check the console for details.");
//     }
//   };

//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       <h1>Generate PDF</h1>
//       <p>Click the button below to generate a PDF using the data from <code>data.json</code>.</p>
//       <button
//         onClick={handleGeneratePDF}
//         disabled={loading}
//         style={{
//           padding: "10px 20px",
//           fontSize: "16px",
//           backgroundColor: loading ? "gray" : "#007BFF",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         {loading ? "Generating PDF..." : "Generate PDF"}
//       </button>
//     </div>
//   );
// }

// export default App;

