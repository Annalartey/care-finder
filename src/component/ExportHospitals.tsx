import React from 'react'
import { jsPDF } from "jspdf";

function ExportHospitals() {
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data: any = await document.querySelector("#pdf");
    pdf.html(data).then(() => {
      pdf.save("hospital_details.pdf")
    })
    console.log(data)
  }
  return (
    <div>
      <button onClick={createPDF}>Export as pdf</button>
    </div>
  )
}

export default ExportHospitals