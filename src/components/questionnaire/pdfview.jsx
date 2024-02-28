import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { countWords } from "../../common/util";
const Pdfview = ({ data, item, textFiles, isExcel }) => {
  const componentRef = useRef();
  const [view, setView] = useState(false);
console.log(item)
  return (
    <div className="bg-[rgb(222 222 222)] flex-col rounded-[12px] w-[100%] border-[1px] border-[#DEDEDE]">
      <div
        className="w-[100%] justify-between rounded-t-[12px]  items-center py-[6px] px-[12px]  flex"
        style={{ background: "rgba(222, 222, 222, 0.60)" }}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            setView(!view);
          }}
          className="flex gap-1 items-center"
          style={{ width: "-webkit-fill-available" }}
        >
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
            {item.name}
          </p>
        </div>
        <div className="flex flex-row gap-2 items-center justify-between w-[24%]">
          <span>

            {item?.summery && isExcel
              ? item.data.length + " Rows"
              : countWords(item.summery) + " Words"}{" "}
          </span>{" "}
          <button
            onClick={() => {
              if (!view) {
                setView(true);
              }
            }}
          >
            <ReactToPrint
              trigger={() => (
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
              )}
              content={(e) => componentRef.current}
            />
          </button>
        </div>
      </div>
      {view && (

      <div className="h-[520px]  overflow-y-auto">
        <div ref={componentRef}>
          <div
            className="px-[45px]  pt-[10px]"
            style={{ scrollbarWidth: "none" }}
          >
            {isExcel ? (
              <>
                {item.data?.map((item, index) => {
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
              </>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: item.data,
                }}
              />
            )}
          </div>
        </div>
      </div>
  )}
    </div>
  );
};

export default Pdfview;
