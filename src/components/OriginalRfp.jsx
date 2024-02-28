import styles from "../App.module.css";
import React, { useState } from "react";

import { Document, Page, pdfjs } from "react-pdf";
import ExtractedView from "./masking/extractedView";
import Masking from "./masking/masking";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const OriginalRfp = ({ setToggle, files, textFiles, setTextFiles,textFileMain }) => {
  const [inputs, setInputs] = useState([]);
  const [textOccurances, setTextOccurances] = useState([])


  return (
    <>
      <div className="bg-[#ECECEC] w-full  pb-4 px-4">
        <div
          className={`flex bg-[#FFF] flex-col p-4 items-start gap-6 rounded-2xl self-stretch w-[100%] ${styles.customMargins}`}
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex  px-3 items-center self-stretch w-full ">
            <div className="bg-[#DEDEDE] h-[8px] w-full rounded-full">
              <div className="bg-[#6200AF]  h-[8px] w-[40%] rounded-full"></div>
            </div>
          </div>
          <div className="flex items-start gap-6 self-stretch w-full">
            <div className="w-[50%] flex flex-col gap-[12px] rounded-[8px]">
              <div className="text-[24px]  font-[600] text-[#333]  ">
                Original RFP file
              </div>
              {Object.values(files).map((file, index) => (
                <ExtractedView file={file} index={index} inputs={inputs} setTextFiles={setTextFiles} textFiles={textFiles} setTextOccurances={setTextOccurances} textOccurances={textOccurances} />
              ))}
            </div>

            {/* SECTION 2 */}

            <Masking
              files={files}
              setInputMain={setInputs}
              mainInputs={inputs}
              textFiles={textFiles}
              textOccurances={textOccurances}
              textFileMain={textFileMain}
            />
          </div>

          <div className="flex w-full flex-row justify-between p-[16px]">
            <button>
              <div
                onClick={() => setToggle(0)}
                className="flex flex-row gap-[6px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g mask="url(#mask0_134_2641)">
                    <path
                      d="M19.9998 25.7914L21.4581 24.3331L18.1717 21.0468H26.0468V18.9528H18.1717L21.4581 15.6665L19.9998 14.2082L14.2082 19.9998L19.9998 25.7914ZM20.0026 35.8331C17.8241 35.8331 15.7732 35.4175 13.8498 34.5864C11.9265 33.7553 10.2475 32.6228 8.81288 31.1888C7.37824 29.7548 6.24518 28.0765 5.41371 26.154C4.58224 24.2315 4.1665 22.1811 4.1665 20.0026C4.1665 17.8127 4.58206 15.7543 5.41317 13.8274C6.24428 11.9005 7.37684 10.2244 8.81084 8.79901C10.2448 7.37362 11.9231 6.24519 13.8455 5.41371C15.768 4.58224 17.8185 4.1665 19.997 4.1665C22.1869 4.1665 24.2453 4.58206 26.1722 5.41317C28.0991 6.24428 29.7752 7.3722 31.2006 8.79692C32.626 10.2217 33.7544 11.8971 34.5859 13.8231C35.4174 15.7492 35.8331 17.8071 35.8331 19.997C35.8331 22.1755 35.4175 24.2264 34.5864 26.1498C33.7553 28.0731 32.6274 29.7521 31.2027 31.1867C29.7779 32.6214 28.1025 33.7544 26.1765 34.5859C24.2504 35.4174 22.1925 35.8331 20.0026 35.8331ZM19.9998 33.7391C23.8274 33.7391 27.0742 32.4033 29.7402 29.7316C32.4061 27.06 33.7391 23.816 33.7391 19.9998C33.7391 16.1722 32.4061 12.9254 29.7402 10.2594C27.0742 7.59345 23.8274 6.26046 19.9998 6.26046C16.1835 6.26046 12.9396 7.59345 10.268 10.2594C7.5963 12.9254 6.26046 16.1722 6.26046 19.9998C6.26046 23.816 7.5963 27.06 10.268 29.7316C12.9396 32.4033 16.1835 33.7391 19.9998 33.7391Z"
                      fill="#6E14B5"
                    />
                  </g>
                </svg>
                <p className="flex justify-center items-center text-[18px]  font-[600] text-[#6E14B5]  ">
                  Back
                </p>
              </div>
            </button>
            <button>
              <div
                className="flex flex-row gap-[6px]"
                onClick={() => setToggle(4)}
              >
                <p className="flex justify-center items-center text-[18px]  font-[600] text-[#6E14B5] font-Montserrat ">
                  Mask & Replace Keywords
                </p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <g mask="url(#mask0_134_2647)">
                    <path
                      d="M19.9998 25.7914L25.7914 19.9998L19.9998 14.2082L18.5415 15.6665L21.8279 18.9528H13.9528V21.0468H21.8279L18.5415 24.3331L19.9998 25.7914ZM20.0026 35.8331C17.8241 35.8331 15.7732 35.4175 13.8498 34.5864C11.9265 33.7553 10.2475 32.6228 8.81288 31.1888C7.37824 29.7548 6.24518 28.0765 5.41371 26.154C4.58224 24.2315 4.1665 22.1811 4.1665 20.0026C4.1665 17.8127 4.58206 15.7543 5.41317 13.8274C6.24428 11.9005 7.37684 10.2244 8.81084 8.79901C10.2448 7.37362 11.9231 6.24519 13.8455 5.41371C15.768 4.58224 17.8185 4.1665 19.997 4.1665C22.1869 4.1665 24.2453 4.58206 26.1722 5.41317C28.0991 6.24428 29.7752 7.3722 31.2006 8.79692C32.626 10.2217 33.7544 11.8971 34.5859 13.8231C35.4174 15.7492 35.8331 17.8071 35.8331 19.997C35.8331 22.1755 35.4175 24.2264 34.5864 26.1498C33.7553 28.0731 32.6274 29.7521 31.2027 31.1867C29.7779 32.6214 28.1025 33.7544 26.1765 34.5859C24.2504 35.4174 22.1925 35.8331 20.0026 35.8331ZM19.9998 33.7391C23.8274 33.7391 27.0742 32.4033 29.7402 29.7316C32.4061 27.06 33.7391 23.816 33.7391 19.9998C33.7391 16.1722 32.4061 12.9254 29.7402 10.2594C27.0742 7.59345 23.8274 6.26046 19.9998 6.26046C16.1835 6.26046 12.9396 7.59345 10.268 10.2594C7.5963 12.9254 6.26046 16.1722 6.26046 19.9998C6.26046 23.816 7.5963 27.06 10.268 29.7316C12.9396 32.4033 16.1835 33.7391 19.9998 33.7391Z"
                      fill="#6E14B5"
                    />
                  </g>
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OriginalRfp;
