import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaDownload } from "react-icons/fa";

function DownloadResume() {

  const downloadPDF = () => {

    const resume = document.getElementById("resume-preview");

    html2canvas(resume, {
      scale: 2,
      useCORS: true,
    }).then((canvas) => {

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = pdf.internal.pageSize.getWidth();

      const pdfHeight =
        (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight
      );

      pdf.save("Skillora_Resume.pdf");

    });

  };

  return (

    <button

      onClick={downloadPDF}

      className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition"

    >

      <FaDownload />

      Download Resume PDF

    </button>

  );

}

export default DownloadResume;