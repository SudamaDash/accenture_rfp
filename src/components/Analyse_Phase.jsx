import React, { useRef, useState } from "react";
import styles from "../App.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import ReactToPrint from "react-to-print";
import { countWords } from "../common/util";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Analyse_Phase({ setToggle, file, textFiles }) {
  const divArray = new Array(5).fill(null);
  const [viewIndex, setViewIndex] = useState(0);
  const [numPage, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);
  const [selectedPage, setSelectedPage] = useState(1);
  const componentRef = useRef();
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
    setSelectedPage(newPage);
    console.log(31, newPage);
  };

  const renderPageList = () => {
    if (numPage === null) {
      return null;
    }

    const pages = [];
    for (let i = 1; i <= numPage; i++) {
      pages.push(
        <div
          key={i}
          onClick={() => handlePageChange(i)}
          className="flex "
        ></div>
      );
    }

    return (
      <div className="flex">
        <button
          className="arrow left"
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          {"<"}
        </button>
        {pages}
        {numPage > 0 && (
          <div className="px-2">
            {pageNumber} / {numPage}
          </div>
        )}
        {numPage > 0 && (
          <button
            className="arrow right"
            onClick={() => handlePageChange(pageNumber + 1)}
            disabled={pageNumber === numPage}
          >
            {">"}
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="pb-4">
      <div
        className={` ${styles.customMargins} p-[16px]  rounded-[16px] bg-[#fff] flex gap-[16px] flex-col  overflow-hidden `}
        style={{
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="bg-[#DEDEDE] h-[8px] w-full rounded-full">
          <div className="bg-[#6200AF]  h-[8px] w-[50%] rounded-full"></div>
        </div>
        <div className="text-[24px] text-[#333] font-[600]">
          Masked RFP file preview
        </div>

        <div className="flex">
          <div
            className=" flex flex-col w-[17.90%] h-[620px] overflow-y-auto  bg-[#484F59]  px-4 py-[24px]  rounded-tl-[12px] rounded-bl-[12px]  overflow-x-auto gap-[24px]"
            style={{ scrollbarWidth: "none" }}
          >
            {textFiles.map((item) => (
              <div
                className={`flex flex-col gap-[4px] items-center justify-center w-[170px] h-[216px]  border-solid rounded-[12px] border-[#9747FF] cursor-pointer ${
                  viewIndex == item.index ? " border-[2px] " : ""
                } ${viewIndex == item.index ? "bg-[#6E14B526] " : ""} `}
                onClick={() => {
                  setViewIndex(item.index);
                }}
              >
                <div className="sm-preview text-[2px] h-[150px] w-[106px] overflow-hidden rounded-[6px] bg-white p-2 ">
                  {Object.values(file).find(
                    (item) => item.name == item.name
                  ).type ==
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                  textFiles.find(
                    (item) => item.name == item.name
                  )?.data.length > 0 ? (
                    <>
                      <div className="flex flex-col gap-[2px] py-3">
                        {textFiles
                          .find(
                            (item) => item.name == item.name
                          )
                          ?.data.map((item, index) => {
                            return (
                              <div
                                className="flexgap-[2px]"
                                style={{
                                  background: "#fff",
                                  padding: "1px",
                                  borderRadius: "8px",
                                }}
                              >
                                <div className="text-[4px]">{index + 1}</div>
                                <ul className="m-0 flex flex-col gap-[1px]">
                                  {Object.keys(item).map((key) => (
                                    <li className="flex flex-row gap-[1px] m-0">
                                      <span>{key} :</span>
                                      <span>{[item[key]]}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                      </div>
                    </>
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.data,
                      }}
                    />
                  )}
                </div>
                <div className="font-[14px] text-white text-center">
                  {item.name}
                </div>
              </div>
            ))}
          </div>

          <div
            className="w-[82.10%]  h-[620px] overflow-y-auto border-[1px] border-solid border-[#DEDEDE] rounded-tr-[12px] rounded-br-[12px] bg-[rgb(222 222 222)] overflow-hidden  "
            style={{ scrollbarWidth: "none" }}
          >
            <div
              className="py-[6px] px-[12px] flex  sticky top-0 justify-between "
              style={{
                backgroundColor: "#dedede",
                backdropFilter: "blur(4px)",
                zIndex: "1",
              }}
            >
              <div className="flex gap-[4px] text-[14px] font-[500] text-[#333]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <g mask="url(#mask0_134_5393)">
                    <path
                      d="M5.75034 17.5831C5.375 17.5831 5.05887 17.4536 4.80192 17.1946C4.54498 16.9356 4.4165 16.6185 4.4165 16.2434V3.75625C4.4165 3.38114 4.54602 3.06407 4.80505 2.80505C5.06407 2.54602 5.38114 2.4165 5.75625 2.4165H12.2082L15.5831 5.79146V16.2434C15.5831 16.6185 15.4535 16.9356 15.1943 17.1946C14.9351 17.4536 14.6179 17.5831 14.2425 17.5831H5.75034ZM11.4165 6.58313V3.49982H5.75625C5.69214 3.49982 5.63337 3.52653 5.57994 3.57994C5.52652 3.63337 5.49982 3.69214 5.49982 3.75625V16.2434C5.49982 16.3075 5.52652 16.3663 5.57994 16.4197C5.63337 16.4731 5.69214 16.4998 5.75625 16.4998H14.2434C14.3075 16.4998 14.3663 16.4731 14.4197 16.4197C14.4731 16.3663 14.4998 16.3075 14.4998 16.2434V6.58313H11.4165Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
                {textFiles[viewIndex].name}
              </div>
              <div className="flex flex-row gap-3 items-center ">
                {textFiles.find(
                  (item) => item.name == textFiles[viewIndex].name
                )?.pdfText && (
                  <>
                    {countWords(
                      textFiles.find(
                        (item) => item.name == textFiles[viewIndex].name
                      )?.pdfText
                    )}{" "}
                    Words
                  </>
                )}{" "}
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

              {/* 
              <div className="flex gap-[12px] items-center text-[12px] font-[600] text-[#333]">
                <div
                  className="rounded-[24px] py-[2px] px-[4px] flex items-center gap-[8px]"
                  style={{
                    boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.31)",
                  }}
                >
                  <button onClick={handleZoomIn}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_134_5399)">
                        <path
                          d="M17.5959 18.8152L13.9075 14.8113C13.4075 15.2074 12.8592 15.5097 12.2627 15.718C11.6661 15.9263 11.0506 16.0305 10.416 16.0305C8.85628 16.0305 7.5303 15.4846 6.4381 14.3927C5.3459 13.3008 4.7998 11.9754 4.7998 10.4167C4.7998 8.858 5.34575 7.53215 6.43765 6.4392C7.52955 5.34627 8.85487 4.7998 10.4136 4.7998C11.9723 4.7998 13.2982 5.34591 14.3911 6.43811C15.4841 7.53031 16.0305 8.85628 16.0305 10.416C16.0305 11.0698 15.9232 11.695 15.7084 12.2915C15.4937 12.888 15.2029 13.4267 14.8363 13.9075L18.7959 17.6152L17.5959 18.8152ZM10.4152 14.7306C11.6203 14.7306 12.6408 14.3126 13.4767 13.4767C14.3126 12.6408 14.7306 11.6203 14.7306 10.4152C14.7306 9.21002 14.3126 8.18951 13.4767 7.35361C12.6408 6.51771 11.6203 6.09975 10.4152 6.09975C9.21002 6.09975 8.1895 6.51771 7.3536 7.35361C6.51772 8.18951 6.09978 9.21002 6.09978 10.4152C6.09978 11.6203 6.51772 12.6408 7.3536 13.4767C8.1895 14.3126 9.21002 14.7306 10.4152 14.7306ZM9.76518 12.8074V11.0651H8.02288V9.76518H9.76518V8.02288H11.0652V9.76518H12.8075V11.0651H11.0652V12.8074H9.76518Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  </button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="2"
                    height="16"
                    viewBox="0 0 2 16"
                    fill="none"
                  >
                    <path
                      d="M1 0.5L0.999999 15.5"
                      stroke="#333333"
                      stroke-linecap="round"
                    />
                  </svg>
                  <button onClick={handleZoomOut}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_134_5403)">
                        <path
                          d="M17.5959 18.8152L13.9075 14.8113C13.4075 15.2074 12.8592 15.5097 12.2627 15.718C11.6661 15.9263 11.0506 16.0305 10.416 16.0305C8.85628 16.0305 7.5303 15.4846 6.4381 14.3927C5.3459 13.3008 4.7998 11.9754 4.7998 10.4167C4.7998 8.858 5.34575 7.53215 6.43765 6.4392C7.52955 5.34627 8.85487 4.7998 10.4136 4.7998C11.9723 4.7998 13.2982 5.34591 14.3911 6.43811C15.4841 7.53031 16.0305 8.85628 16.0305 10.416C16.0305 11.0698 15.9232 11.695 15.7084 12.2915C15.4937 12.888 15.2029 13.4267 14.8363 13.9075L18.7959 17.6152L17.5959 18.8152ZM10.4152 14.7306C11.6203 14.7306 12.6408 14.3126 13.4767 13.4767C14.3126 12.6408 14.7306 11.6203 14.7306 10.4152C14.7306 9.21002 14.3126 8.18951 13.4767 7.35361C12.6408 6.51771 11.6203 6.09975 10.4152 6.09975C9.21002 6.09975 8.1895 6.51771 7.3536 7.35361C6.51772 8.18951 6.09978 9.21002 6.09978 10.4152C6.09978 11.6203 6.51772 12.6408 7.3536 13.4767C8.1895 14.3126 9.21002 14.7306 10.4152 14.7306ZM8.13055 11.0651V9.76518H12.6998V11.0651H8.13055Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g mask="url(#mask0_134_5406)">
                    <path
                      d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div> */}
            </div>

            <div ref={componentRef}>
              <div
                className="pt-[10px] px-[48px] overflow-y-auto  flex items-center justify-center "
                style={{ scrollbarWidth: "none" }}
              >
                {Object.values(file).find(
                  (item) => item.name == textFiles[viewIndex].name
                ).type ==
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                textFiles.find((item) => item.name == textFiles[viewIndex].name)
                  ?.data.length > 0 ? (
                  <>
                    <div className="flex flex-col gap-2 py-3 w-full">
                      {textFiles
                        .find((item) => item.name == textFiles[viewIndex].name)
                        ?.data.map((item, index) => {
                          return (
                            <div
                              className="flex gap-2"
                              style={{
                                background: "#fff",
                                padding: "8px",
                                borderRadius: "8px",
                              }}
                            >
                              <div className="text-[14px]">{index + 1}</div>
                              <ul className="m-0 flex flex-col gap-1">
                                {Object.keys(item).map((key) => (
                                  <li className="flex flex-row gap-2 m-0">
                                    <span>{key} :</span>
                                    <span>{[item[key]]}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          );
                        })}
                    </div>
                  </>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: textFiles[viewIndex].data,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setToggle(3)}>
            <div className="py-[12px] px-[24px] flex gap-[6px] text-[18px] font-[600] text-[#6E14B5] items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g mask="url(#mask0_134_5412)">
                  <path
                    d="M19.9998 25.7914L21.4581 24.3331L18.1717 21.0468H26.0468V18.9528H18.1717L21.4581 15.6665L19.9998 14.2082L14.2082 19.9998L19.9998 25.7914ZM20.0026 35.8331C17.8241 35.8331 15.7732 35.4175 13.8498 34.5864C11.9265 33.7553 10.2475 32.6228 8.81288 31.1888C7.37824 29.7548 6.24518 28.0765 5.41371 26.154C4.58224 24.2315 4.1665 22.1811 4.1665 20.0026C4.1665 17.8127 4.58206 15.7543 5.41317 13.8274C6.24428 11.9005 7.37684 10.2244 8.81084 8.79901C10.2448 7.37362 11.9231 6.24519 13.8455 5.41371C15.768 4.58224 17.8185 4.1665 19.997 4.1665C22.1869 4.1665 24.2453 4.58206 26.1722 5.41317C28.0991 6.24428 29.7752 7.3722 31.2006 8.79692C32.626 10.2217 33.7544 11.8971 34.5859 13.8231C35.4174 15.7492 35.8331 17.8071 35.8331 19.997C35.8331 22.1755 35.4175 24.2264 34.5864 26.1498C33.7553 28.0731 32.6274 29.7521 31.2027 31.1867C29.7779 32.6214 28.1025 33.7544 26.1765 34.5859C24.2504 35.4174 22.1925 35.8331 20.0026 35.8331ZM19.9998 33.7391C23.8274 33.7391 27.0742 32.4033 29.7402 29.7316C32.4061 27.06 33.7391 23.816 33.7391 19.9998C33.7391 16.1722 32.4061 12.9254 29.7402 10.2594C27.0742 7.59345 23.8274 6.26046 19.9998 6.26046C16.1835 6.26046 12.9396 7.59345 10.268 10.2594C7.5963 12.9254 6.26046 16.1722 6.26046 19.9998C6.26046 23.816 7.5963 27.06 10.268 29.7316C12.9396 32.4033 16.1835 33.7391 19.9998 33.7391Z"
                    fill="#6E14B5"
                  />
                </g>
              </svg>
              Back
            </div>
          </button>
          <button onClick={() => setToggle(5)}>
            <div className="py-[12px] px-[24px] flex gap-[6px] text-[18px] font-[600] text-[#6E14B5] items-center">
              Analyze with Generative AI
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g mask="url(#mask0_134_5418)">
                  <path
                    d="M20.0003 25.7914L25.7919 19.9998L20.0003 14.2082L18.542 15.6665L21.8284 18.9528H13.9533V21.0468H21.8284L18.542 24.3331L20.0003 25.7914ZM20.0031 35.8331C17.8246 35.8331 15.7737 35.4175 13.8503 34.5864C11.927 33.7553 10.248 32.6228 8.81337 31.1888C7.37873 29.7548 6.24567 28.0765 5.4142 26.154C4.58273 24.2315 4.16699 22.1811 4.16699 20.0026C4.16699 17.8127 4.58255 15.7543 5.41366 13.8274C6.24477 11.9005 7.37733 10.2244 8.81133 8.79901C10.2453 7.37362 11.9236 6.24519 13.846 5.41371C15.7685 4.58224 17.819 4.1665 19.9975 4.1665C22.1874 4.1665 24.2458 4.58206 26.1727 5.41317C28.0996 6.24428 29.7757 7.3722 31.2011 8.79692C32.6265 10.2217 33.7549 11.8971 34.5864 13.8231C35.4178 15.7492 35.8336 17.8071 35.8336 19.997C35.8336 22.1755 35.418 24.2264 34.5869 26.1498C33.7558 28.0731 32.6279 29.7521 31.2032 31.1867C29.7784 32.6214 28.103 33.7544 26.177 34.5859C24.2509 35.4174 22.193 35.8331 20.0031 35.8331ZM20.0003 33.7391C23.8279 33.7391 27.0747 32.4033 29.7407 29.7316C32.4066 27.06 33.7396 23.816 33.7396 19.9998C33.7396 16.1722 32.4066 12.9254 29.7407 10.2594C27.0747 7.59345 23.8279 6.26046 20.0003 6.26046C16.184 6.26046 12.9401 7.59345 10.2685 10.2594C7.59678 12.9254 6.26095 16.1722 6.26095 19.9998C6.26095 23.816 7.59678 27.06 10.2685 29.7316C12.9401 32.4033 16.184 33.7391 20.0003 33.7391Z"
                    fill="#6E14B5"
                  />
                </g>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Analyse_Phase;
