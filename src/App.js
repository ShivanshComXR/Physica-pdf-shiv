import React from 'react';

function App() {
  const generatePDF = async () => {
    const response = await fetch('http://localhost:3001/generate-pdf', {
      method: 'POST',
    });

    // Check if the response is successful
    if (response.ok) {
      const blob = await response.blob();  // Get the PDF as a Blob
      const url = window.URL.createObjectURL(blob);  // Create an object URL for the Blob
      const a = document.createElement('a');  // Create an anchor element
      a.style.display = 'none';  // Hide the anchor element
      a.href = url;  // Set the href to the object URL
      a.download = 'generated.pdf';  // Set the file name for download
      document.body.appendChild(a);  // Append the anchor to the body
      a.click();  // Programmatically click the anchor to trigger download
      window.URL.revokeObjectURL(url);  // Clean up the object URL
    } else {
      console.error('PDF generation failed');
    }
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default App;
