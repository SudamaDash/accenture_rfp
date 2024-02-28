import React, { useEffect, useState } from "react";

import SubHeader from "../common/SubHeader";
import Insights from "../components/Insights";
import MainRfp from "../components/MainRfp";
import Docxtemplater from "docxtemplater";
import JSZip from "jszip";

import Progress from "../components/Progress";
import OriginalRfp from "../components/OriginalRfp";
import Analyse_Phase from "../components/Analyse_Phase";
import Masking_Phase from "../components/Masking_Phase";
import * as XLSX from "xlsx";

import Header from "../common/header/header";
import { pdfjs } from "react-pdf";
import Form1 from "../components/form1";
import { Document, Paragraph } from 'docx';
import PizZip from "pizzip";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Home = () => {
  const [disable, setDisable] = useState(false);
  const [textFiles, setTextFiles] = useState([]);
  const [textFileMain, setTextFilesMain] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [file, setFile] = useState(null);
  const [meargedFiles, setMigratedFiles] = useState("");
  const uploadedFiles = (data) => {
    console.log(11111, data);
    // setFile(data);
  };
  const getExcelData = (file, index) => {
    if (
      file.type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const promise = new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws);
          resolve(data);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise.then((data) => {
        setTextFiles(prev=>[
          ...prev,
          {
            index,
            name: file.name,
            pdfText: "",
            data: data,
          },
        ]);
      });
    }  
    
  };

  useEffect(() => {
    if (file) {
      Object.values(file).forEach((item, index) => {
        getExcelData(item, index);
      });
    }
  }, [file]);

  return (
    <>
      <Header />
      <SubHeader />

      <div className="bg-[#ECECEC]">
        {toggle === 0 && (
          <>
            <Form1
              setToggle={setToggle}
              setFile={setFile}
              file={file}
              uploadedFiles={uploadedFiles}
              setDisable={setDisable}
              disable={disable}
            />
          </>
        )}

        {toggle === 3 && (
          <>
            <OriginalRfp
              setToggle={setToggle}
              files={file}
              uploadedFiles={uploadedFiles}
              setTextFiles={setTextFiles}
              textFiles={textFiles}
              textFileMain={textFileMain}
            />
          </>
        )}
        {toggle === 4 && (
          <>
            <Analyse_Phase
              setToggle={setToggle}
              file={file}
              textFiles={textFiles.sort((a, b) => a.index - b.index)}
              uploadedFiles={uploadedFiles}
            />
          </>
        )}
        {toggle === 5 && (
          <>
            <Masking_Phase
              setToggle={setToggle}
              files={file}
              uploadedFiles={uploadedFiles}
              textFiles={textFiles.sort((a, b) => a.index - b.index)}
              setTextFiles={setTextFiles}
              setMigratedFiles={setMigratedFiles}
            />
          </>
        )}
        {toggle === 6 && (
          <>
            <MainRfp
              setToggle={setToggle}
              file={file}
              uploadedFiles={uploadedFiles}
              meargedFiles={meargedFiles}
              textFiles={textFiles.sort((a, b) => a.index - b.index)}
            />
          </>
        )}
        {toggle === 7 && (
          <>
            <Insights
              setToggle={setToggle}
              file={file}
              uploadedFiles={uploadedFiles}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
