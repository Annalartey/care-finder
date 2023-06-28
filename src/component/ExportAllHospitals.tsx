import React from 'react'
import { jsPDF } from "jspdf";

function ExportHospitals() {
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data: any = await document.querySelector("#pdf-all");
    pdf.html(data).then(() => {
      pdf.save("hospital_details.pdf")
    })
    console.log(data)
  }
  return (
    <div className="mx-12 bg-gray-400 my-4 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-gray-800 text-center"
    >
      <button onClick={createPDF}>Export hospital details as pdf</button>
    </div>
  )
}

export default ExportHospitals