import axios from "axios";
import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// Set worker path for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfTextExtractor = () => {
  const [numPages, setNumPages] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [file, setFile] = useState(null);
  const [dataFromAi, setDatFromAi] = useState(null);
  const onFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    let fullText = "";
    const pdfTextPromises = [];

    for (let i = 1; i <= numPages; i++) {
      pdfTextPromises.push(fileToText(file, i));
    }

    Promise.all(pdfTextPromises).then((texts) => {
      fullText = texts.join("");
      console.log(texts);

      setPdfText(fullText);

    });
  };

  // useEffect(() => {
  //   if (pdfText.length > 0) {
  //     axios
  //       .post("http://localhost:3001/get-html", { text: pdfText })
  //       .then((res) => {
  //         const data = res.data.data.choices;
  //         setDatFromAi(data);
  //       })
  //       .catch((err) => {
  //         console.log("error", err);
  //       });
  //   }
  // }, [pdfText]);
  const fileToText = (file, pageNumber) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const typedarray = new Uint8Array(event.target.result);
        pdfjs.getDocument(typedarray).promise.then(function (pdf) {
          pdf.getPage(pageNumber).then(function (page) {
            page.getTextContent().then(function (textContent) {
              const textItems = textContent.items.map((item) => item.str);
              resolve(textItems.join(" "));
            });
          });
        });
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div>
      <input type="file" onChange={onFileChange} />
      <div style={{display:'none'}}>
        {file && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
      {dataFromAi?.length > 0 && (
        <div
          dangerouslySetInnerHTML={{ __html: dataFromAi[0].message.content }}
        />
      )}
    </div>
  );
};

export default PdfTextExtractor;
