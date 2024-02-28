import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import generatePDF, { ReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { countOccurrences, countWords } from "../../common/util";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ExtractedView = ({
  file,
  index,
  inputs,
  textFiles,
  setTextFiles,
  textOccurances,
  setTextOccurances,
}) => {
  const componentRef = useRef();
  const handlePrint = () => {
    generatePDF(componentRef, {
      filename: `${file.name}.pdf`,
    });
  };

  const [scale, setScale] = useState(0.8);
  const [loading, setLoading] = useState(false);
  const handleZoomIn = () => {
    setScale(scale + 0.1);
  };

  const handleZoomOut = () => {
    setScale(Math.max(0.1, scale - 0.1));
  };
  const [numPages, setNumPages] = useState(null);
  const [pdfText, setPdfText] = useState("");
  const [dataFromAi, setDatFromAi] = useState();

  useEffect(() => {
    if (inputs.length > 0) {
      if (
        file.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        inputs.forEach((item) => {
          if (item.header) {
            const find = textFiles.find((data) => data.name == file.name).data;
            const finalData = find.map((data) => {
              const obj = { ...data };
              Object.keys(obj).forEach((key) => {
                if (item.header == "All") {
                  
                  obj[key] = obj[key].replace(item.keyword, item.replacement);
                } else if (item.header == key) {
                  obj[key] = obj[key].replace(item.keyword, item.replacement);
                }
              });
              return obj;
            });
            console.log( item.index,textFiles)
            setTextFiles(prev=>[
              ...prev.filter((item) => item.index != index),
              {
                data: finalData,
                index,
                name: file.name,
                pdfText: "",
              },
            ]);
          }
        });
      } else {
        inputs.forEach((item) => {
          if (item.file == "All") {
            setDatFromAi(dataFromAi.replace(item.keyword, item.replacement));
            const find = textOccurances.find((item) => item.name == file.name);
            const findIndex = textOccurances.findIndex(
              (item) => item.name == file.name
            );

            if (find) {
              const dummyData = [...textOccurances];
              dummyData[findIndex] = {
                ...find,
                data: countOccurrences(dataFromAi, item.keyword) + find.data,
              };
              setTextOccurances(dummyData);
            } else {
              setTextOccurances([
                ...textOccurances,
                {
                  data: countOccurrences(dataFromAi, item.keyword),
                  keyword: item.keyword,
                },
              ]);
            }

            setTextFiles(prev=>[
              ...prev.filter((item) => item.index != index),
              {
                data: dataFromAi.replace(item.keyword, item.replacement),
                index,
                name: file.name,
                pdfText,
              },
            ]);
          } else if (item.file == file.name) {
            setDatFromAi(dataFromAi.replace(item.keyword, item.replacement));
            const find = textOccurances.find((item) => item.name == file.name);
            const findIndex = textOccurances.findIndex(
              (item) => item.name == file.name
            );
            if (find) {
              const dummyData = [...textOccurances];
              dummyData[findIndex] = {
                ...find,
                data: countOccurrences(dataFromAi, item.keyword) + find.data,
              };
              setTextOccurances(dummyData);
            } else {
              setTextOccurances([
                ...textOccurances,
                {
                  data: countOccurrences(dataFromAi, item.keyword),
                  keyword: item.keyword,
                },
              ]);
            }
            setTextFiles([
              ...textFiles.filter((item) => item.index != index),
              {
                data: dataFromAi.replace(item.keyword, item.replacement),
                index,
                name: file.name,
                pdfText,
              },
            ]);
          }
        });
      }
    }
  }, [inputs]);
  const onDocumentLoadSuccess = ({ numPages }) => {
    if (file.type != "image/png") {
      setNumPages(numPages);
      let fullText = "";
      const pdfTextPromises = [];

      for (let i = 1; i <= numPages; i++) {
        pdfTextPromises.push(fileToText(file, i));
      }

      Promise.all(pdfTextPromises).then((texts) => {
        fullText = texts.join("");
        setPdfText(fullText);
      });
    }
  };

  useEffect(() => {
    const find = textFiles.find((item) => item.name == file.name);
    if (find && find.data.length > 0) {
      setDatFromAi(find.data);
    } else {
      if (pdfText.length > 0) {
        if (file.type == "application/pdf" && file.data == undefined) {
          setLoading(true);
          axios
            .post("http://localhost:3001/get-html", { text: pdfText })
            .then((res) => {
              const data = res.data.data.choices;
              setDatFromAi(
                data[0].message.content
                  .replace("```", "")
                  .replace("```html", "").replace("html", "")
              );
              
              setTextFiles(prevCount =>  [
                ...prevCount.filter(item=>item.index !=index),
                {
                  data: data[0].message.content
                    .replace("```html", "").replace("html", "")
                    .replace("```", ""),
                  index,
                  name: file.name,
                  pdfText,
                },
              ]);
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              console.log("error", err);
            });
        }
      }
      if (file.type == "image/png" && file.data == undefined) {
        const formData = new FormData();
        formData.append("image", file);
        setLoading(true);
        axios
          .post("http://localhost:3001/img-get-html", formData)
          .then((res) => {
            const data = res.data.data.choices;
            const text = res.data.text;
            setDatFromAi(
              data[0].message.content.replace("```html", "").replace("```", "").replace("html", "")
            );
            setTextFiles(prevCount =>  [
              ...prevCount.filter(item=>item.index !=index),
              {
                data: data[0].message.content
                  .replace("```html", "")
                  .replace("html", "")
                  .replace("```", ""),
                index,
                name: file.name,
                pdfText: text,
              },
            ]);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("error", err);
          });
      }
    }
  }, [pdfText]);

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
      <div style={{ display: "none" }}>
        {file && file.type == "application/pdf" && (
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        )}
      </div>
      <div className="flex flex-col ">
        <div
          className="px-[6px] py-[12px]  justify-between flex flex-row rounded-tl-[8px] rounded-tr-[8px]"
          style={{ background: "rgba(222, 222, 222, 0.60)" }}
        >
          <div className="flex flex-row gap-[4px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g mask="url(#mask0_134_2592)">
                <path
                  d="M5.75034 17.5831C5.375 17.5831 5.05887 17.4536 4.80192 17.1946C4.54498 16.9356 4.4165 16.6185 4.4165 16.2434V3.75625C4.4165 3.38114 4.54602 3.06407 4.80505 2.80505C5.06407 2.54602 5.38114 2.4165 5.75625 2.4165H12.2082L15.5831 5.79146V16.2434C15.5831 16.6185 15.4535 16.9356 15.1943 17.1946C14.9351 17.4536 14.6179 17.5831 14.2425 17.5831H5.75034ZM11.4165 6.58313V3.49982H5.75625C5.69214 3.49982 5.63337 3.52653 5.57994 3.57994C5.52652 3.63337 5.49982 3.69214 5.49982 3.75625V16.2434C5.49982 16.3075 5.52652 16.3663 5.57994 16.4197C5.63337 16.4731 5.69214 16.4998 5.75625 16.4998H14.2434C14.3075 16.4998 14.3663 16.4731 14.4197 16.4197C14.4731 16.3663 14.4998 16.3075 14.4998 16.2434V6.58313H11.4165Z"
                  fill="#333333"
                />
              </g>
            </svg>
            <div className="text-[14px] whitespace-nowrap max-w-[auto] overflow-hidden ">
              {file.name}
            </div>
          </div>

          <div className="flex flex-row gap-[12px] items-center">
            {file.type !=
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
              textFiles.find((item) => item.name == file.name)?.pdfText && (
                <>
                  {countWords(
                    textFiles.find((item) => item.name == file.name)?.pdfText
                  )}{" "}
                  Words
                </>
              )}
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
        <div
          className=" px-[45px] h-[520px] overflow-y-auto  rounded-bl-[8px] rounded-br-[8px] bg-[#f9f0ff] relative  "
          style={{ scrollbarWidth: "none" }}
        >
          {file.type ==
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
          textFiles.find((item) => item.name == file.name)?.data.length > 0 ? (
            <>
              <div className="flex flex-col gap-2 py-3" ref={componentRef}>
                {textFiles
                  .find((item) => item.name == file.name)
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
            <>
              {!loading && dataFromAi?.length > 0 && (
                <div
                  ref={componentRef}
                  id="pdf-content"
                  style={{
                    padding: "20px",
                    background:'#fff'
                  }}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataFromAi,
                    }}
                  />
                </div>
              )}
              {loading && (
                <div id="preloader">
                  <div id="loader"></div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractedView;
