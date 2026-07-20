import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  FaDownload,
  FaPrint,
  FaFilePdf,
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

    <div className="bg-white rounded-3xl shadow-xl p-6">

      <h2 className="text-xl font-bold text-slate-800 mb-5">

        Download Resume

      </h2>

      <div className="space-y-4">

        <button
          onClick={downloadPDF}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-xl font-semibold hover:scale-105 transition"
        >

          <FaFilePdf />

          Download PDF

        </button>

        <button
          onClick={printResume}
          className="w-full flex items-center justify-center gap-3 border-2 border-sky-500 text-sky-600 py-4 rounded-xl font-semibold hover:bg-sky-50 transition"
        >

          <FaPrint />

          Print Resume

        </button>

        <button
          onClick={downloadPDF}
          className="w-full flex items-center justify-center gap-3 bg-slate-900 text-white py-4 rounded-xl font-semibold hover:bg-black transition"
        >

          <FaDownload />

          Export ATS Resume

        </button>

      </div>

    </div>

  );

}

export default DownloadResume;