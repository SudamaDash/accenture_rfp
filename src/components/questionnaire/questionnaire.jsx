import axios from "axios";
import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";

const Questionnaire = ({
  meargedFiles,
  textFiles,
  quations,
  setQuantions,
  popup,
  setPopup,
  files,
}) => {
  const [quationText, setQuantionText] = useState("");
  const [file, setfile] = useState("All");
  const [loading, setLoading] = useState(false);
  const componentRef = useRef();
  const [selecedFile, setSelectedFile] = useState("All");
  const changeHandler = (e, index) => {
    // const value = e.target.value;
    // const name = e.target.name;
    // const data = { ...inputs[index] };
    // data[name] = value;
    // inputs[index] = data;
  };
  const jsonSeter = (data) => {
    return data
      .slice(0, 3)
      .map((item, index) => {
        return `<div className="flex flex-col gap-2 py-3" ><div className="flex gap-2" style={{background: "#fff",padding: "8px",borderRadius: "8px",}}><div className="text-[14px]">${
          index + 1
        }</div><ul className="m-0 flex flex-col gap-1">${Object.keys(item)
          .map((key) => {
            return `<li className="flex flex-row gap-2 m-0"><span>${key} :</span><span>${[
              item[key],
            ]}</span></li>`;
          })
          .join()
          .toString()
          .replaceAll(",", "")}</ul></div></div>`;
      })
      .join()
      .toString()
      .replaceAll("</div>,", "</div>");
  };
  const [wordCount, setWordCount] = useState("Auto");
  const fileSeter = () => {
    if (selecedFile == "All") {
      return meargedFiles;
    } else if (textFiles.find((item) => item.name == selecedFile)) {
      const file = textFiles.find((item) => item.name == selecedFile);
      const find = Object.values(files).find((item) => item.name == file.name);
      if (
        find &&
        find.type ==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        return textFiles
          .filter((item) => item.name == selecedFile)
          .map((item) => item.data)
          .join(" ");
      } else {
        return textFiles
          .filter((item) => item.name == selecedFile)
          .map((item) => item.pdfText)
          .join(" ");
      }
    }
  };
  const submitHandler = () => {
    if (quationText.length > 10) {
      setLoading(true);
      axios
        .post("http://localhost:3001/ask-question", {
          meargedFiles: fileSeter(),
          quationText,
          words: wordCount != "Auto" ? `in ${wordCount} words` : "",
        })
        .then((res) => {
          const data = res.data.data.choices;
          setQuantionText("");
          setQuantions([
            ...quations,
            { quation: quationText, answer: data[0].message.content },
          ]);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="w-[50%] flex flex-col gap-[24px]  ">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[24px]  font-[600] font-Montserrat">
            Questionnaire
          </p>
          <p className="text-[16px]  font-[500]  ">
            Ask about value levers from{" "}
            <span className=" font-[600]"> Generative AI</span> to get the
            insights.
          </p>
        </div>
        <div className="flex flex-col max-h-[550px] overflow-y-auto">
          <div className="flex py-[0px] px-[16px] flex-col w-[100%] items-center gap-[16px]">
            {quations.map((e, i) => (
              <>
                <div
                  className="flex gap-[12px]  w-[100%]"
                  style={{
                    alignItems: i === 3 ? "flex-start" : "center",
                  }}
                >
                  <div className="w-[38px] rounded-[30px]">
                    <img src="/images/Group2.png" alt="" />
                  </div>
                  <div className="flex py-[18px] w-[100%] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-[#CCC]">
                    <p className="text-[14px] font-[500] leading-[22px]">
                      {e.quation}
                    </p>
                  </div>
                </div>
                <div
                  className="flex gap-[12px]  w-[100%]"
                  style={{
                    alignItems: i === 3 ? "flex-start" : "center",
                  }}
                >
                  <div className="w-[38px] rounded-[30px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="34"
                      height="34"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
                      <path
                        d="M20.0002 0L2.67969 10V30L20.0002 40L37.3208 30V10L20.0002 0ZM21.1684 5.59156L33.0213 26.1215L21.1684 19.2775V5.59156ZM18.8321 19.3266L6.93664 26.1951L18.8321 5.59156V19.3266ZM20.0427 21.3253L31.9813 28.2188H8.10422L20.0427 21.3253ZM34.9845 24.8493L23.2927 4.59859L34.9845 11.3488V24.8493H34.9845ZM16.7077 4.59859L5.01602 24.8493V11.3488L16.7077 4.59859ZM8.31352 30.555H31.687L20.0002 37.3023L8.31352 30.555Z"
                        fill="#8A08E4"
                      />
                    </svg>
                  </div>
                  <div className="flex py-[18px] w-[100%] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-[#CCC]">
                    <p className="text-[14px] font-[500] leading-[22px]">
                      {e.answer?.replaceAll("HTML code","")}
                    </p>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div
            className="flex flex-col gap-[16px] justify-between "
            style={{ position: "sticky", bottom: "0px", background: "#fff" }}
          >
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[8px]">
                <p className="  text-[16px]  font-[500] font-Montserrat">
                  Ask a Question
                </p>
                <div className="flex flex-row gap-[8px] px-[4px]">
                  <input
                    type="text"
                    placeholder="Original Client"
                    className="text-[14px] w-[100%] font-[400] py-[12px] px-[16px] rounded-[8px]  h-[46px] "
                    style={{ border: "1px solid var(--Stroke-2, #CCC)" }}
                    name="keyword"
                    value={quationText}
                    onChange={(e) => setQuantionText(e.target.value)}
                  />
                  <select
                    name="header"
                    onChange={(e) => setSelectedFile(e.target.value)}
                    class=" px-4 py-2  leading-tight h-[46px] text-[12px]  bg-white border border-purple-400 rounded-lg focus:outline-none focus:border-purple-600 w-[120px]"
                  >
                    <option selected hidden>
                      Select File
                    </option>
                    <option value="All">Mearged File</option>
                    {textFiles.map((item) => (
                      <option class="h-[26px]" value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Original Client"
                    className="text-[12px] w-[56px] font-[400] py-[12px] px-[8px] rounded-[8px]  h-[46px] "
                    style={{ border: "1px solid var(--Stroke-2, #CCC)" }}
                    name="keyword"
                    value={wordCount}
                    onChange={(e) => setWordCount(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-3 justify-end">
                <button
                  disabled={loading}
                  onClick={() => setQuantionText("")}
                  className="py-[8px] px-6 justify-center items-center flex rounded-[8px] bg-[#fff] text-[#6E14B5] font-Montserrat text-[14px] font-semibold"
                  style={{ border: "1px solid var(--Red-Mandatory, #6E14B5)" }}
                >
                  Clear
                </button>
                <button
                  onClick={submitHandler}
                  disabled={loading}
                  class="bg-[#6E14B5] flex flex-col w-[182px] rounded-[8px] px-[24px] py-[8px] text-[14px] text-white font-semibold items-center gap-[8px] upload-btn-wrapper "
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
                    "Generate Answer"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed w-full z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins ">
            <div className="flex w-[90%] h-[90vh] overflow-y-auto p-[16px] flex-col items-start gap-[10px] rounded-[16px] bg-[#fff] relative">
              <div className="w-full flex items-center  justify-between ">
                <div className="flex items-center gap-[8px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_134_5862)">
                      <path
                        d="M11.9998 0.5L1.60742 6.5V18.5L11.9998 24.5L22.3921 18.5V6.5L11.9998 0.5ZM12.7006 3.85494L19.8124 16.1729L12.7006 12.0665V3.85494ZM11.2989 12.0959L4.16159 16.217L11.2989 3.85494V12.0959ZM12.0253 13.2952L19.1884 17.4313H4.86214L12.0253 13.2952ZM20.9903 15.4096L13.9753 3.25916L20.9903 7.3093V15.4096H20.9903ZM10.0243 3.25916L3.00922 15.4096V7.3093L10.0243 3.25916ZM4.98772 18.833H19.0118L11.9998 22.8814L4.98772 18.833Z"
                        fill="#8A08E4"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_134_5862">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>

                  <p className="text-[24px] text-[#333] font-[600] ">GenAI</p>
                </div>

                <svg
                  onClick={() => setPopup(false)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <g mask="url(#mask0_134_5866)">
                    <path
                      d="M3.4 22.5L2 21.1L8.6 14.5H4V12.5H12V20.5H10V15.9L3.4 22.5ZM12 12.5V4.5H14V9.1L20.6 2.5L22 3.9L15.4 10.5H20V12.5H12Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
              <div className="max-h-[400px] overflow-y-scroll">
                <div ref={componentRef} className="py-[20px]">
                  <div className="flex py-[0px] px-[16px] flex-col w-[100%] items-center gap-[16px] ">
                    {quations.map((e, i) => (
                      <>
                        <div
                          className="flex gap-[12px]  w-[100%]"
                          style={{
                            alignItems: i === 3 ? "flex-start" : "center",
                          }}
                        >
                          <div className="w-[48px] rounded-[30px]">
                            <img src="/images/Group2.png" alt="" />
                          </div>
                          <div className="flex py-[18px] w-[100%] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-[#CCC]">
                            <p className="text-[14px] font-[500] leading-[22px]">
                              {e.quation}
                            </p>
                          </div>
                        </div>
                        <div
                          className="flex gap-[12px]  w-[100%]"
                          style={{
                            alignItems: i === 3 ? "flex-start" : "center",
                          }}
                        >
                          <div className="w-[48px] rounded-[30px]">
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
                          </div>
                          <div className="flex py-[18px] w-[100%] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-[#CCC]">
                            <p className="text-[14px] font-[500] leading-[22px]">
                              {e.answer}
                            </p>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submitHandler();
                }}
                className="flex w-[100%] p-[16px] items-center gap-[10px]  rounded-[16px] border-[1px] border-[#8A08E4] bg-[rgb(222 222 222)]"
                style={{ position: "absolute", bottom: "11px", width: "97%" }}
              >
                <ReactToPrint
                  trigger={() => (
                    <button className="flex py-[6px] px-[16px] justify-center items-center gap-[8px] rounded-[8px] bg-[#6E14B5]  w-[226px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <g mask="url(#mask0_134_5910)">
                          <path
                            d="M15.9996 8.80759V5.80759H7.99956V8.80759H6.49959V4.30762H17.4995V8.80759H15.9996ZM17.8072 12.8075C18.0906 12.8075 18.3281 12.7117 18.5197 12.52C18.7114 12.3284 18.8072 12.0909 18.8072 11.8075C18.8072 11.5242 18.7114 11.2867 18.5197 11.095C18.3281 10.9034 18.0906 10.8075 17.8072 10.8075C17.5239 10.8075 17.2864 10.9034 17.0947 11.095C16.9031 11.2867 16.8072 11.5242 16.8072 11.8075C16.8072 12.0909 16.9031 12.3284 17.0947 12.52C17.2864 12.7117 17.5239 12.8075 17.8072 12.8075ZM15.9996 19.4999V15.2306H7.99956V19.4999H15.9996ZM17.4995 20.9998H6.49959V16.9998H2.78809V11.3075C2.78809 10.5992 3.03007 10.0055 3.51404 9.52632C3.998 9.04717 4.58934 8.80759 5.28804 8.80759H18.7111C19.4194 8.80759 20.0131 9.04717 20.4923 9.52632C20.9715 10.0055 21.211 10.5992 21.211 11.3075V16.9998H17.4995V20.9998ZM19.7111 15.4999V11.3075C19.7111 11.0242 19.6153 10.7867 19.4236 10.595C19.2319 10.4034 18.9944 10.3075 18.7111 10.3075H5.28804C5.0047 10.3075 4.7672 10.4034 4.57554 10.595C4.38387 10.7867 4.28804 11.0242 4.28804 11.3075V15.4999H6.49959V13.7306H17.4995V15.4999H19.7111Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                      <p className="text-[16px] font-[600] text-[#fff]">
                        Print Results
                      </p>
                    </button>
                  )}
                  content={() => componentRef.current}
                />
                <div
                  className="flex gap-2 w-[auto]"
                  style={{ width: "-webkit-fill-available" }}
                >
                  <input
                    className="flex p-[16px] items-center rounded-[8px] border-[1px] w-[60%] border-[#CCC] bg-[#fff] h-[46px]"
                    type="text"
                    placeholder="Type your Questions here"
                    name="keyword"
                    value={quationText}
                    onChange={(e) => setQuantionText(e.target.value)}
                    style={{ width: "-webkit-fill-available" }}
                  />

                  <button disabled={loading}>
                    {loading ? (
                      <div role="status">
                        <svg
                          aria-hidden="true"
                          class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                      >
                        <g mask="url(#mask0_134_5919)">
                          <path
                            d="M5 33.8332V23.6943L17.8333 20.4998L5 17.2498V7.1665L36.6667 20.4998L5 33.8332Z"
                            fill="#6E14B5"
                          />
                        </g>
                      </svg>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Questionnaire;
