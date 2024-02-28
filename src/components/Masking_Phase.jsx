import React, { useRef, useState } from "react";
import styles from "../App.module.css";
import { Document, Page, pdfjs } from "react-pdf";
import Summerizing from "./summerizing/summerizing";
import axios from "axios";
import ReactToPrint from "react-to-print";
import { countWords } from "../common/util";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function Masking_Phase({
  setToggle,
  files,
  textFiles,
  setTextFiles,
  setMigratedFiles,
}) {
  console.log(textFiles);
  const divArray = new Array(5).fill(null);
  const [popup, setPopup] = useState(false);
  const [numPage, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(0.8);
  const demo = `Sorry Requested data size is to large`;
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selected, setSelectedPage] = useState([]);
  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(Math.max(0.1, scale - 0.1));
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const jsonSeter = (data) => {
    return data
      .map((item, index) => {
        return `<div className="flex flex-col gap-2 py-3" ><div className="flex gap-2" style={{background: "#fff",padding: "8px",borderRadius: "8px",}}><div className="text-[14px]">${
          index + 1
        }</div><ul className="m-0 flex flex-col gap-1">${Object.keys(item)
          .map((key) => {
            return `<li className="flex flex-row gap-2 m-0"> <span style="width: 130px; overflow-wrap: break-word;">${key} :</span><span style="width: 130px; overflow-wrap: break-word;">${[
              item[key],
            ]}</span></li>`;
          })
          .join()
          .toString()
          .replaceAll("</li>,", "</li>")}</ul></div></div>`;
      })
      .join()
      .toString()
      .replaceAll("</div>,", "</div>");
  };
  const mergeHandler = () => {
    // setLoading(true);
    const filter = textFiles
      .filter((item) => selected.includes(item.name))
      .map((item) => {
        if (Array.isArray(item.data)) {
          return jsonSeter(item.data);
        } else {
          return item.data;
        }
      })
      .join("");
    setMigratedFiles(filter);
    setPopup(false);
    setToggle(6);
  };
  const selectHandler = (value) => {
    const find = selected.find((item) => item == value);
    if (find) {
      setSelectedPage(selected.filter((item) => item !== value));
    } else {
      setSelectedPage([...selected, value]);
    }
  };
  return (
    <div className="pb-4">
      <div
        className={` ${styles.customMargins} p-[16px] rounded-[16px] bg-[#fff] flex gap-[16px] flex-col  overflow-hidden `}
        style={{
          boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="bg-[#DEDEDE] h-[8px] w-full rounded-full">
          <div className="bg-[#6200AF]  h-[8px] w-[60%] rounded-full"></div>
        </div>

        <div className="flex gap-[24px] ">
          <div className="w-[50%] overflow-hidden flex flex-col gap-[12px]">
            <div className="text-[24px] text-[#333] font-[600]">
              Masked RFP file preview
            </div>
            <div className="flex flex-col gap-[24px]">
              {textFiles.map((item) => (
                <div className="  border-[1px] border-solid border-[#DEDEDE] rounded-[12px] bg-[#f9f0ff]  overflow-hidden h-[700px]  overflow-y-auto">
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
                      {item.name}
                    </div>
                    <div className="flex gap-[12px] items-center text-[12px] font-[600] text-[#333]">
                      <span>
                        {Object.values(files).find(
                          (data) => data.name == item.name
                        ).type !=
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                          ? countWords(item.data) + "     Words"
                          : item.data.length + " Rows"}{" "}
                      </span>{" "}
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

                  <div ref={componentRef}>
                    <div
                      className="px-[45px]  pt-[10px]"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {Object.values(files).find(
                        (data) => data.name == item.name
                      ).type ==
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
                      textFiles.find((data) => data.name == item.name)?.data
                        .length > 0 ? (
                        <>
                          <div className="flex flex-col gap-2 py-3 w-full">
                            {textFiles
                              .find((data) => data.name == item.name)
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
                                    <div className="text-[14px]">
                                      {index + 1}
                                    </div>
                                    <ul className="m-0 flex flex-col gap-1">
                                      {Object.keys(item).map((key) => (
                                        <li className="flex flex-row gap-2 m-0">
                                                                       <span style={{    overflowWrap: "break-word",width: "130px"}}> {key} :</span>
                                          <span style={{    overflowWrap: "break-word",width: "250px"}}>{[item[key]]}</span>
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
                        style={{background:'#fff',padding:'8px',borderRadius:'12px'}}
                          dangerouslySetInnerHTML={{
                            __html: item.data,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-[50%] flex flex-col gap-[12px]">
            <div className="text-[24px] text-[#333] font-[600]">
              Page-wise Summary
            </div>
            <div className="flex flex-col gap-[24px] ">
              {textFiles.map((item) => (
                <Summerizing
                  item={item}
                  demo={demo}
                  setTextFiles={setTextFiles}
                  textFiles={textFiles}
                  files={files}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button onClick={() => setToggle(4)}>
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
          <button onClick={() => setPopup(true)} disabled={loading}>
            <div className="py-[12px] px-[24px] flex gap-[6px] text-[18px] font-[600] text-[#6E14B5] items-center">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                <>
                  Merge & show Insights
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
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {popup && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed w-full z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins ">
            <div className="flex w-[600px] h-[400px] overflow-y-auto p-[16px] flex-col items-start gap-[10px] rounded-[16px] bg-[#fff]">
              <div
                className="flex gap-3 items-center justify-between w-full pb-3"
                style={{ borderBottom: "1px solid #bebebe" }}
              >
                <div className="flex gap-3 items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.9998 0L1.60742 6V18L11.9998 24L22.3921 18V6L11.9998 0ZM12.7006 3.35494L19.8124 15.6729L12.7006 11.5665V3.35494ZM11.2989 11.5959L4.16159 15.717L11.2989 3.35494V11.5959ZM12.0253 12.7952L19.1884 16.9313H4.86214L12.0253 12.7952ZM20.9903 14.9096L13.9753 2.75916L20.9903 6.8093V14.9096H20.9903ZM10.0243 2.75916L3.00922 14.9096V6.8093L10.0243 2.75916ZM4.98772 18.333H19.0118L11.9998 22.3814L4.98772 18.333Z"
                      fill="#8A08E4"
                    />
                  </svg>
                  <span className="text-[20px] font-semibold ">
                    {" "}
                    Merge Document
                  </span>
                </div>
                <img
                  src="images/close.png"
                  alt=""
                  className="cursor-pointer h-[24px] w-[24px]"
                  onClick={() => setPopup(false)}
                />
              </div>
              <div
                className="flex flex-col gap-[14px] py-[12px] h-[400px] w-full  "
                style={{ borderBottom: "1px solid #bebebe" }}
              >
                <div className="flex flex-row gap-3 items-center">
                  <span className="text-[18px]">Select All</span>{" "}
                  <input
                    type="checkbox"
                    checked={selected.length > 0}
                    onChange={() => {
                      if (selected.length > 0) {
                        setSelectedPage([]);
                      } else {
                        setSelectedPage(
                          Object.values(files).map((item) => item.name)
                        );
                      }
                    }}
                  />
                </div>
                <div className="flex flex-col gap-[12px]">
                  {Object.values(files).map((item) => (
                    <div className="flex flex-row gap-3 items-center">
                      <input
                        type="checkbox"
                        onChange={() => selectHandler(item.name)}
                        checked={selected.find((data) => data == item.name)}
                      />
                      <span className="text-[16px]">{item.name}</span>{" "}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row gap-3 justify-end w-full">
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedPage([]);
                  }}
                  className="py-[8px] px-6 justify-center items-center flex rounded-[8px] bg-[#fff] text-[#6E14B5] font-Montserrat text-[14px] font-semibold w-[86px] h-[38px]"
                  style={{ border: "1px solid var(--Red-Mandatory, #6E14B5)" }}
                >
                  Clear
                </button>
                <button
                  onClick={mergeHandler}
                  disabled={loading|| selected.length==0}
                  style={{
                    opacity:loading|| selected.length==0 ? 0.6:1
                  }}

                  class="bg-[#6E14B5] flex flex-col items-center justify-center w-[108px] h-[38px] rounded-[8px] px-[24px] py-[8px] text-[14px] text-white font-semibold items-center gap-[8px] upload-btn-wrapper "
                >
                  {loading ? (
                    <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                  ) : (
                    "Proceed"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Masking_Phase;
