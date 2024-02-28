import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { countWords } from "../../common/util";

const Summerizing = ({ item, demo, setTextFiles, textFiles, files }) => {
  const [loading, setLoading] = useState(false);
  const [dataFromAi, setDatFromAi] = useState(demo);
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const componentRef = useRef();
  const [wordCount, setWordCount] = useState(400);
  useEffect(() => {
    if (item.summery) {
      setWordCount(countWords(item.summery));
    }
    if (item.summery == undefined) {
      setLoading(true);
      const findxlsx =
        Object.values(files).find((data) => data.name == item.name).type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      if (findxlsx) {
        axios
          .post("http://localhost:3001/excel_summery", {
            data: item.data,
            wordCount: wordCount,
          })
          .then((res) => {
            const data = res.data.data.choices;
            setDatFromAi(data[0].message.content.replace("```html","").replace("```",""));
            setTextFiles([
              ...textFiles.filter((data) => data.index != item.index),
              {
                ...item,
                summery: data[0].message.content.replace("```html","").replace("```",""),
              },
            ]);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("error", err);
          });
      } else {
        axios
          .post("http://localhost:3001/get-summery-html", {
            text: item.pdfText,
            wordCount: wordCount,
          })
          .then((res) => {
            const data = res.data.data.choices;
            setDatFromAi(data[0].message.content.replace("```html","").replace("```",""));
            setTextFiles([
              ...textFiles.filter((data) => data.index != item.index),
              {
                ...item,
                summery: data[0].message.content.replace("```html","").replace("```",""),
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
    if (item.summery != undefined) {
      setDatFromAi(item.summery);
    }
  }, []);
  useEffect(() => {
    if (recall > 0) {
      setLoading(true);
      const findxlsx =
        Object.values(files).find((data) => data.data == item.name)?.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      if (textFiles.find((data) => data.name == item.name)) {
        // console.log(findxlsx)
        axios
          .post("http://localhost:3001/excel_summery", {
            data: textFiles.find((data) => data.name == item.name).data,
            wordCount: wordCount,
          })
          .then((res) => {
            const data = res.data.data.choices;
            setDatFromAi(data[0].message.content.replace("```html","").replace("```",""));
            setTextFiles([
              ...textFiles.filter((data) => data.index != item.index),
              {
                ...item,
                summery: data[0].message.content.replace("```html","").replace("```",""),
              },
            ]);
            // setWordCount(countWords(item.summery));
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            console.log("error", err);
          });
      } else {
        axios
          .post("http://localhost:3001/get-summery-html", {
            text: item.pdfText,
            wordCount: wordCount,
          })
          .then((res) => {
            const data = res.data.data.choices;
            setDatFromAi(data[0].message.content);
            setTextFiles([
              ...textFiles.filter((data) => data.index != item.index),
              {
                ...item,
                summery: data[0].message.content,
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
  }, [recall]);

  return (
    <>
      <div className="  border-[1px] border-solid border-[#DEDEDE] rounded-[12px] bg-[#f9f0ff] overflow-hidden h-[700px] overflow-y-auto ">
        <div
          className="py-[6px] px-[12px] flex  sticky top-0 justify-between "
          style={{
            backgroundColor: "#dedede",
            backdropFilter: "blur(4px)",
            zIndex: "1",
          }}
        >
          <div className="flex gap-[4px] text-[14px] font-[500] text-[#333] w-[50%]">
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
          <div className="flex flex-row gap-3 items-center">
            <input
              type="text"
              value={wordCount}
              className="h-[30px] px-[8px] w-[66px] rounded-[8px] border border-gray-300 "
              onChange={(e) => setWordCount(e.target.value)}
            />
            <button
              onClick={() => forceUpdate()}
              className="flex flex-row gap-1 items-center "
            >
              {" "}
              <img
                src="images/re.png"
                style={{
                  height: "16px",
                  width: "16px",
                }}
                alt=""
              />
              <span style={{ fontWeight: "600" }}>Re-Summarize </span>
            </button>
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
        <div ref={componentRef} className="h-full w-full">
          <div
            className="px-[45px]   pt-[10px] relative h-full w-full"
            style={{ scrollbarWidth: "none" }}
          >
            {loading ? (
              <div id="preloader">
                <div id="loader"></div>
              </div>
            ) : (
              <div
              style={{background:'#fff',padding:'8px',borderRadius:'12px'}}
                dangerouslySetInnerHTML={{
                  __html: dataFromAi,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summerizing;
