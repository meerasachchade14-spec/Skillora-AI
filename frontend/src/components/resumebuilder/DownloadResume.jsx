import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import {
  FaDownload,
  FaPrint,
  FaFilePdf,
  FaBolt,
} from "react-icons/fa";

function DownloadResume() {

  const downloadPDF = async () => {

    const resume = document.getElementById("resume-preview");

    if (!resume) {
      alert("Resume Preview Not Found");
      return;
    }

    const canvas = await html2canvas(resume, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const pageHeight =
      (canvas.height * pageWidth) / canvas.width;

    pdf.addImage(
      imgData,
      "PNG",
      0,
      0,
      pageWidth,
      pageHeight
    );

    pdf.save("Skillora_Resume.pdf");
  };


  const printResume = () => {
    window.print();
  };


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">

      <div className="flex items-center justify-between mb-3">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">

            <FaDownload />

          </div>

          <div>

            <h3 className="font-black text-sm text-slate-900">
              Export Resume
            </h3>

            <p className="text-[10px] text-slate-500">
              Download or print your resume
            </p>

          </div>

        </div>

        <FaBolt className="text-amber-400 text-sm" />

      </div>


      <div className="grid grid-cols-2 gap-2">

        <button
          onClick={downloadPDF}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white text-xs font-bold hover:shadow-lg hover:shadow-blue-200 transition"
        >
          <FaFilePdf />
          PDF
        </button>

        <button
          onClick={printResume}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
        >
          <FaPrint />
          Print
        </button>

      </div>


      <button
        onClick={downloadPDF}
        className="w-full mt-2 py-2 text-[10px] font-bold text-slate-500 hover:text-blue-600 transition"
      >
        Export ATS-Friendly Version →
      </button>

    </div>

  );
}

export default DownloadResume;