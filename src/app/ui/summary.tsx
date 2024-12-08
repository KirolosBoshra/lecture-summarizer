import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import "@/app/markdown.css"

export default function Summary({ content }: { content: String }) {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const element = contentRef.current;
    if (element) {
      const options = {
        margin: 10,
        filename: 'summary.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };

      html2pdf().from(element).set(options).save();
    }
  }

  const handleDownloadWord = () => {

    if (!content) return;

    // Wrap the content in Word-compatible HTML structure
    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Document</title></head>
        <body>${content}</body>
      </html>
    `;

    // Create a Blob with the HTML content
    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword',
    });

    // Create a download link
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'document.doc'; // Download as .doc file (Word format)

    // Trigger the download
    link.click();

    // Clean up
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="flex flex-col justify-center items-center p-2 ">
      <div className="flex flex-row p-4 space-x-8">
        <div className="flex flex-row items-center justify-center bg-red-800 
          hover:bg-red-900 w-36 h-10 rounded-md cursor-pointer" onClick={handleDownloadPdf}>
          Download PDF
        </div>
        <div className="flex flex-row items-center justify-center 
          bg-blue-800 hover:bg-blue-900 w-36 h-10 rounded-md cursor-pointer" onClick={handleDownloadWord}>
          Download Word
        </div>
      </div>
      <div className="flex flex-col w-4/5 max-sm:w-full justify-center text-lg leading-relaxed
        p-2 border-4 rounded-md bg-white text-black"
      >
        <div ref={contentRef} className="bg-white text-black"
          dangerouslySetInnerHTML={{
            __html: content
          }}></div>
      </div>
    </div>
  )
}
