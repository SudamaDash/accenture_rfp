import React, { useRef, useState } from "react";
import styles from "../App.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import Questionnaire from "./questionnaire/questionnaire";
import ReactToPrint from "react-to-print";
import Pdfview from "./questionnaire/pdfview";
import { countWords } from "../common/util";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function MainRfp({ setToggle, file, uploadFile, meargedFiles, textFiles }) {
  const [popup, setPopup] = useState(false);
  const [quations, setQuantions] = useState([]);
  const [view, setView] = useState(true);

  const [numPage, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);

  const onDocumentLoadSuccess = ({ numPages }) => {
    if (numPages !== undefined) {
      setNumPages(numPages);
    }
  };
  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(Math.max(0.1, scale - 0.1));
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };
  const componentRef = useRef();

  const genAi = [
    {
      text: "Hi, Good Morning.",
      img: <img src="/images/Group2.png" alt="" />,
    },
    {
      text: "Good morning! How can I assist you today?",
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20.0002 0L2.67969 10V30L20.0002 40L37.3208 30V10L20.0002 0ZM21.1684 5.59156L33.0213 26.1215L21.1684 19.2775V5.59156ZM18.8321 19.3266L6.93664 26.1951L18.8321 5.59156V19.3266ZM20.0427 21.3253L31.9813 28.2188H8.10422L20.0427 21.3253ZM34.9845 24.8493L23.2927 4.59859L34.9845 11.3488V24.8493H34.9845ZM16.7077 4.59859L5.01602 24.8493V11.3488L16.7077 4.59859ZM8.31352 30.555H31.687L20.0002 37.3023L8.31352 30.555Z"
            fill="#8A08E4"
          />
        </svg>
      ),
    },
    {
      text: "Give me Information of the client",
      img: <img src="/images/Group2.png" alt="" />,
    },
    {
      text: <img className="h-[260px]" src="/images/sector.png" alt="" />,
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
        >
          <path
            d="M20.0002 0L2.67969 10V30L20.0002 40L37.3208 30V10L20.0002 0ZM21.1684 5.59156L33.0213 26.1215L21.1684 19.2775V5.59156ZM18.8321 19.3266L6.93664 26.1951L18.8321 5.59156V19.3266ZM20.0427 21.3253L31.9813 28.2188H8.10422L20.0427 21.3253ZM34.9845 24.8493L23.2927 4.59859L34.9845 11.3488V24.8493H34.9845ZM16.7077 4.59859L5.01602 24.8493V11.3488L16.7077 4.59859ZM8.31352 30.555H31.687L20.0002 37.3023L8.31352 30.555Z"
            fill="#8A08E4"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="pb-4">
      <div
        className={`flex w-full rounded-[16px] p-[16px]  flex-col items-start bg-[#fff]  ${styles.customMargins}`}
        style={{ boxShadow: "0px 0px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="w-[100%] flex bg-[#fff]  p-[16px] items-start gap-[24px] ">
          <div className="w-[50%] overflow-hidden flex flex-col items-start gap-[12px] bg-[#fff]">
            <p className="text-[24px] text-[#333] font-[600]">
              Main RFP file preview
            </p>

            <div className="bg-[#f9f0ff] flex-col rounded-[12px] w-[100%] border-[1px] border-[#DEDEDE]">
              <div
                className="w-[100%] justify-between rounded-t-[12px]  items-center py-[6px] px-[12px]  flex"
                style={{ background: "rgba(222, 222, 222, 0.60)" }}
                // onClick={() => setView(!view)}
              >
                <div className="flex gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <g mask="url(#mask0_134_4794)">
                      <path
                        d="M5.75083 17.5834C5.37549 17.5834 5.05935 17.4539 4.80241 17.1948C4.54546 16.9358 4.41699 16.6187 4.41699 16.2436V3.7565C4.41699 3.38139 4.54651 3.06432 4.80553 2.80529C5.06456 2.54626 5.38163 2.41675 5.75674 2.41675H12.2087L15.5836 5.79171V16.2436C15.5836 16.6187 15.454 16.9358 15.1948 17.1948C14.9356 17.4539 14.6184 17.5834 14.243 17.5834H5.75083ZM11.417 6.58337V3.50006H5.75674C5.69263 3.50006 5.63386 3.52677 5.58043 3.58019C5.52701 3.63362 5.5003 3.69239 5.5003 3.7565V16.2436C5.5003 16.3077 5.52701 16.3665 5.58043 16.4199C5.63386 16.4734 5.69263 16.5001 5.75674 16.5001H14.2439C14.308 16.5001 14.3667 16.4734 14.4202 16.4199C14.4736 16.3665 14.5003 16.3077 14.5003 16.2436V6.58337H11.417Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                  <p className="text-[14px] font-[500] leading-[160%] text-[#333] text-center">
                    Mearged File
                  </p>
                </div>
                <div className="flex flex-row gap-2 items-center">
                  <span>{countWords(meargedFiles)} Words</span>{" "}
                  <ReactToPrint
                    trigger={() => (
                      <button>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g mask="url(#mask0_134_2605)">
                            <path
                              d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                              fill="#333333"
                            />
                          </g>
                        </svg>
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
              <div className="h-[520px]  overflow-y-auto ">
              {view && (
                <div ref={componentRef} >
                  <div
                    className="px-[45px] h-[520px]  overflow-y-auto pt-[10px]"
                    style={{ scrollbarWidth: "none" }}
                    
                  >
                    <div
                    style={{background:'#fff',padding:'8px',borderRadius:'12px'}}
                      dangerouslySetInnerHTML={{
                        __html: meargedFiles,
                      }}
                    />
                  </div>
                </div>
              )}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-[100%]">
              {textFiles.map((item) => (
                <Pdfview
                  data={item.summery}
                  item={item}
                  textFiles={textFiles}
                  isExcel={
                    Object.values(file).find((data) => data.name == item.name)
                      .type ==
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  }
                />
              ))}
            </div>
          </div>

          <Questionnaire
            meargedFiles={meargedFiles}
            textFiles={textFiles}
            setQuantions={setQuantions}
            quations={quations}
            popup={popup}
            setPopup={setPopup}
            files={file}
          />
        </div>

        <div className="justify-between bg-[#fff] flex w-[100%]">
          <button
            onClick={() => setToggle(5)}
            className="flex py-[12px] px-[24px] justify-center items-center gap-[6px]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_134_4857)">
                <path
                  d="M20.0003 25.7917L21.4586 24.3334L18.1722 21.047H26.0472V18.9531H18.1722L21.4586 15.6667L20.0003 14.2084L14.2087 20L20.0003 25.7917ZM20.0031 35.8333C17.8246 35.8333 15.7737 35.4178 13.8503 34.5867C11.927 33.7556 10.248 32.623 8.81337 31.189C7.37873 29.755 6.24567 28.0768 5.4142 26.1543C4.58273 24.2318 4.16699 22.1813 4.16699 20.0028C4.16699 17.8129 4.58255 15.7546 5.41366 13.8277C6.24477 11.9007 7.37733 10.2246 8.81133 8.79925C10.2453 7.37386 11.9236 6.24543 13.846 5.41396C15.7685 4.58249 17.819 4.16675 19.9975 4.16675C22.1874 4.16675 24.2458 4.58231 26.1727 5.41342C28.0996 6.24453 29.7757 7.37244 31.2011 8.79716C32.6265 10.2219 33.7549 11.8973 34.5864 13.8234C35.4178 15.7494 35.8336 17.8074 35.8336 19.9972C35.8336 22.1758 35.418 24.2267 34.5869 26.15C33.7558 28.0733 32.6279 29.7523 31.2032 31.187C29.7784 32.6216 28.103 33.7547 26.177 34.5861C24.2509 35.4176 22.193 35.8333 20.0031 35.8333ZM20.0003 33.7394C23.8279 33.7394 27.0747 32.4035 29.7407 29.7319C32.4066 27.0602 33.7396 23.8163 33.7396 20C33.7396 16.1724 32.4066 12.9256 29.7407 10.2597C27.0747 7.59369 23.8279 6.26071 20.0003 6.26071C16.184 6.26071 12.9401 7.59369 10.2685 10.2597C7.59678 12.9256 6.26095 16.1724 6.26095 20C6.26095 23.8163 7.59678 27.0602 10.2685 29.7319C12.9401 32.4035 16.184 33.7394 20.0003 33.7394Z"
                  fill="#6E14B5"
                />
              </g>
            </svg>
            <p className="text-[18px] font-[600] text-[#6E14B5]">Back</p>
          </button>

          <button
            onClick={() => setPopup(true)}
            className="flex py-[12px] px-[24px] justify-center items-center gap-[6px]"
          >
            <p className="text-[18px] font-[600] text-[#6E14B5]">
              Interact With GenAI
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g mask="url(#mask0_134_4863)">
                <path
                  d="M20.0003 25.7917L25.7919 20L20.0003 14.2084L18.542 15.6667L21.8284 18.9531H13.9533V21.047H21.8284L18.542 24.3334L20.0003 25.7917ZM20.0031 35.8333C17.8246 35.8333 15.7737 35.4178 13.8503 34.5867C11.927 33.7556 10.248 32.623 8.81337 31.189C7.37873 29.755 6.24567 28.0768 5.4142 26.1543C4.58273 24.2318 4.16699 22.1813 4.16699 20.0028C4.16699 17.8129 4.58255 15.7546 5.41366 13.8277C6.24477 11.9007 7.37733 10.2246 8.81133 8.79925C10.2453 7.37386 11.9236 6.24543 13.846 5.41396C15.7685 4.58249 17.819 4.16675 19.9975 4.16675C22.1874 4.16675 24.2458 4.58231 26.1727 5.41342C28.0996 6.24453 29.7757 7.37244 31.2011 8.79716C32.6265 10.2219 33.7549 11.8973 34.5864 13.8234C35.4178 15.7494 35.8336 17.8074 35.8336 19.9972C35.8336 22.1758 35.418 24.2267 34.5869 26.15C33.7558 28.0733 32.6279 29.7523 31.2032 31.187C29.7784 32.6216 28.103 33.7547 26.177 34.5861C24.2509 35.4176 22.193 35.8333 20.0031 35.8333ZM20.0003 33.7394C23.8279 33.7394 27.0747 32.4035 29.7407 29.7319C32.4066 27.0602 33.7396 23.8163 33.7396 20C33.7396 16.1724 32.4066 12.9256 29.7407 10.2597C27.0747 7.59369 23.8279 6.26071 20.0003 6.26071C16.184 6.26071 12.9401 7.59369 10.2685 10.2597C7.59678 12.9256 6.26095 16.1724 6.26095 20C6.26095 23.8163 7.59678 27.0602 10.2685 29.7319C12.9401 32.4035 16.184 33.7394 20.0003 33.7394Z"
                  fill="#6E14B5"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainRfp;
