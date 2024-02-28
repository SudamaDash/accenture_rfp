import React, { useState } from "react";
import { countOccurrences } from "../../common/util";

const Masking = ({
  files,
  setInputMain,
  mainInputs,
  textFiles,
  textOccurances,
  textFileMain,
}) => {
  const [inputs, setInputs] = useState([
    { keyword: "", replacement: "", file: "All", header: "All" },
  ]);

  const [file, setfile] = useState("All");

  const changeHandler = (e, index) => {
    const value = e.target.value;
    const name = e.target.name;
    const dummyData = [...inputs];
    const data = { ...inputs[index] };
    data[name] = value;
    dummyData[index] = data;
    setInputs(dummyData);
  };

  const submitHandler = () => {
    setInputMain([...mainInputs, ...inputs]);
    setInputs(inputs.map((item) => ({ ...item, showOccurence: true })));
  };
  function findOccurrences(word, array) {
    let occurrences = 0;
    array.forEach((obj) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === "string" && value.includes(word)) {
          occurrences++;
        }
      });
    });
    return occurrences;
  }

  const getTextOccurence = (data) => {
    let count = 0;

    const find = textFileMain.find((item) => data.file == item.name);
    const filter = Object.values(files).filter(
      (item) =>
        item.type ==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    if (data.showOccurence) {
      if (data.file == "All") {
        textFiles.map((item) => {
          if (filter.length > 0) {
            filter.forEach((item) => {
              const findData = textFiles.find(
                (elem) => elem.name == item.name
              );
              if (findData.data.length > 0) {
                count += findOccurrences(data.replacement, findData.data);
              }
            });
          } else {
            count += countOccurrences(item.data, data.replacement);
          }
        });
      } else {

        textFiles.map((item) => {
          if (item.name == data.file) {
            const find = filter.find((elem) => elem.name == data.file);
            if (
              find && find?.type ==
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            ) {
              count += findOccurrences(data.replacement, item.data);
            } else {
              count += countOccurrences(item.data, data.replacement);
            }
          }
        });
      }
      return "Number of Replacement : " + count;
    }
  };

  function containsExcelFile(fileArray) {
    for (let i = 0; i < fileArray.length; i++) {
      if (
        fileArray[i].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        return fileArray[i]; // Found an Excel file
      }
    }
    return false; // Excel file not found in the array
  }
  function extractKeys(fileArray) {
    let keys = [];
    for (let i = 0; i < fileArray.length; i++) {
      if (
        fileArray[i].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        textFiles
          .find((item) => item.name == fileArray[i].name)
          ?.data.forEach((obj) => {
            keys = keys.concat(Object.keys(obj));
          });
      }
    }

    return Array.from(new Set(keys));
  }

  return (
    <>
      <div className="w-[50%] flex flex-col gap-[24px]  ">
        <div className="flex flex-col gap-[4px]">
          <p className="text-[24px]  font-[600] font-Montserrat">
            Apply Masking
          </p>
          <p className="text-[16px]  font-[500]  ">
            Enter the keywords you want to replace from the original file.
          </p>
        </div>

        <div className="flex flex-col gap-[16px] justify-between min-h-[300px]">
          <div className="flex flex-col gap-[16px]">
            {inputs.map((item, index) => (
              <div
                className="flex flex-col gap-[8px]"
                style={{
                  background: "whitesmoke",
                  padding: "14px",
                  borderRadius: "12px",
                }}
              >
                <div className="flex flex-row justify-between items-center">
                  {" "}
                  <p className="  text-[16px]  font-[500] font-Montserrat">
                    Keyword {index + 1}
                  </p>
                  <select
                    name="file"
                    onChange={(e) => changeHandler(e, index)}
                    class=" px-4 py-2 pr-8 leading-tight h-[34px] text-[12px] bg-white border border-purple-400 rounded-lg focus:outline-none focus:border-purple-600 w-[200px]"
                  >
                    <option value="All" selected>
                      All File Selected
                    </option>
                    {Object.values(files).map((file) => (
                      <option class="h-26" value={file.name}>
                        {file.name}
                      </option>
                    ))}
                  </select>
                  {containsExcelFile(Object.values(files)) && (
                    <select
                      name="header"
                      onChange={(e) => changeHandler(e, index)}
                      class=" px-4 py-2 pr-8 leading-tight h-[34px] text-[12px] bg-white border border-purple-400 rounded-lg focus:outline-none focus:border-purple-600 w-[200px]"
                    >
                      <option selected hidden>
                        Select Header
                      </option>
                      <option value="All">All Headers</option>
                      {containsExcelFile(Object.values(files)) &&
                        extractKeys(files).map((file) => (
                          <option class="h-26" value={file}>
                            {file}
                          </option>
                        ))}
                    </select>
                  )}
                </div>
                <div className="flex flex-row gap-[16px]">
                  <div className=" ">
                    <input
                      type="text"
                      placeholder="Original Client"
                      className="text-[14px] w-[100%] font-[400] py-[12px] px-[16px] rounded-[8px]  "
                      style={{ border: "1px solid var(--Stroke-2, #CCC)" }}
                      name="keyword"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </div>
                  <p
                    className="flex justify-center items-center  text-[#6E14B5] text-[14px]  font-[600]"
                    style={{
                      whiteSpace: "nowrap",
                    }}
                  >
                    Replace to
                  </p>
                  <div className="">
                    <input
                      type="text"
                      placeholder="XYZ Client"
                      className="text-[14px] w-[100%] font-[400] py-[12px] px-[16px] rounded-[8px]"
                      style={{ border: "1px solid var(--Stroke-2, #CCC)" }}
                      name="replacement"
                      onChange={(e) => changeHandler(e, index)}
                    />
                  </div>
                </div>
                <div>{getTextOccurence(item)}</div>
              </div>
            ))}
            <div
              className="flex flex-row gap-[16px] items-center cursor-pointer"
              onClick={() => {
                setInputs([
                  ...inputs,
                  { keyword: "", replacement: "", file: "All" },
                ]);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g mask="url(#mask0_144_122)">
                  <path
                    d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                    fill="#6E14B5"
                  />
                </g>
              </svg>
              <div className="text-[#6E14B5] font-Montserrat ">Add Keyword</div>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <button
              onClick={submitHandler}
              class="bg-[#6E14B5] flex flex-col w-[162px] rounded-[8px] px-[24px] py-[10px] text-[14px] text-white font-semibold items-center gap-[8px] upload-btn-wrapper "
            >
              Mask & Replace
            </button>
            <button
              onClick={() =>
                setInputs([{ keyword: "", replacement: "", file: "" }])
              }
              className="py-[10px] px-6 justify-center items-center flex rounded-[8px] bg-[#fff] text-[#6E14B5] font-Montserrat text-[14px] font-semibold"
              style={{ border: "1px solid var(--Red-Mandatory, #6E14B5)" }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Masking;
