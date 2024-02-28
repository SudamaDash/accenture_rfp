import React, { useEffect, useRef, useState } from "react";
import styles from "../App.module.css";

import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";

// Import styles
import "@react-pdf-viewer/page-navigation/lib/styles/index.css";
import { LocalizationMap, Viewer } from "@react-pdf-viewer/core";
import axios from "axios";
import { Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const Form1 = ({
  setToggle,
  setFile,
  file,
  uploadedFiles,
  setDisable,
  disable,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadFile, setUploadFile] = useState([]);

  const fileRef = useRef(null);
  const handleButtonClick = () => {
    fileRef.current.click();
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const [save, setSave] = useState(true);
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files;
    console.log(selectedFile);
    setFile(selectedFile);
    setFile(selectedFile);
    setUploadFile(uploadFile);
    setSave(false);
  };

  const newplugin = defaultLayoutPlugin();

  const [profileData, setProfileData] = useState({
    ClientName: "",
    OpportunityID: "",
    OpportunityName: "",
    OpportunityType: "",
    OpportunitySource: "",
    DealValue: "",
    DealType: "",
    DealStage: "",
    Solution: "",
    ExpectedSubmission: "",
  });

  const inputFields = [
    {
      label: "Client Name",
      type: "text",
      name: "ClientName",
      placeholder: "Entet Client Name",
      value: profileData.ClientName,
      className: " ",
      isMaditory: true,
    },
    {
      label: "Opportunity ID",
      type: "text",
      name: "OpportunityID",
      placeholder: "Enter OpportunityID",
      value: profileData.OpportunityID,
      className: " ",
      isMaditory: true,
    },
    {
      label: "Opportunity Name",
      type: "text",
      name: "OpportunityName",
      placeholder: "Enter Opportunity Name",
      value: profileData.OpportunityName,
      className: "",
      isMaditory: true,
    },
    {
      label: "Opportunity Type",
      type: "text",
      name: "OpportunityType",
      placeholder: "Find Type",
      value: profileData.OpportunityType,
      className: "",
      isMaditory: true,
    },
    {
      label: "Request Type",
      type: "text",
      name: "RequestType",
      placeholder: "Find Type",
      value: profileData.RequestType,
      className: "",
    },
    {
      label: "Market",
      type: "text",
      name: "Market",
      placeholder: "Find Type",
      value: profileData.Market,
      className: "",
    },
    {
      label: "Market Unit",
      type: "text",
      name: "MarketUnit",
      placeholder: "Find Type",
      value: profileData.MarketUnit,
      className: "",
    },
    {
      label: "Client Group",
      type: "text",
      name: "ClientGroup",
      value: profileData.ClientGroup,
      className: "",
    },
    {
      label: "Opportunity Source ",
      type: "text",
      name: "OpportunitySource",
      placeholder: "Find items",
      value: profileData.OpportunitySource,
      className: "",
      isMaditory: true,
    },
    {
      label: "Deal Value (in Million $)  ",
      type: "text",
      name: "DealValue",
      placeholder: "Find items",
      value: profileData.DealValue,
      className: "",
      isMaditory: true,
    },
    {
      label: "Deal Type ",
      type: "text",
      name: "DealType",
      placeholder: "Find items",
      value: profileData.DealType,
      className: "",
      isMaditory: true,
    },
    {
      label: "Deal Stage",
      type: "text",
      name: "DealStage",
      placeholder: "Find items",
      value: profileData.DealStage,
      className: "",
      isMaditory: true,
    },
    {
      label: "Framework",
      type: "text",
      name: "Framework",
      placeholder: "eg-Agile, etc.",
      className: "",
    },
    {
      label: "WBSE",
      type: "text",
      name: "WBSE",
      placeholder: "",
      className: "",
    },
    {
      label: "Solution Architect",
      type: "text",
      name: "Solution Architect",
      placeholder: "",
      className: "",
    },
    {
      label: "Country of Opportunit...",
      type: "text",
      name: "Country of Opportunit...",
      placeholder: "",
      className: "",
    },
    {
      label: "Expected Submission ",
      type: "date",
      name: "ExpectedSubmission",
      placeholder: "",
      className: "",
      isMaditory: true,
    },
    {
      label: "Technologies",
      type: "text",
      name: "Technologies",
      placeholder: "eg- java, etc",
      className: "",
    },

    {
      label: " Additional Comments",
      textarea: "text",
      name: "Comments",
      className: "col-span-3 ",
    },
    {
      label: "Solution",
      type: "text",
      name: "Solution",
      className: "",
      isMaditory: true,
    },
    {
      label: "Sub-Category",
      type: "text",
      name: "Sub-Category",
      className: "",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(182, name, value);
    setProfileData({
      ...profileData,
      [name]: value,
    });
    setIsModified(true);
    setFormErrors({ ...formErrors, [name]: value.trim() === "" });
  };
  const [formErrors, setFormErrors] = useState({
    ClientName: false,
    ClientName: false,
    OpportunityName: false,
  });
  const isDisabled = () => {
    if (isDisabled) {
      return true;
    }
    if (!isChecked || !isModified) return true;
    const {
      ClientName,
      OpportunityID,
      OpportunityName,
      OpportunityType,
      OpportunitySource,
      DealValue,
      DealType,
      DealStage,
      Solution,
      ExpectedSubmission,
    } = profileData;

    const isAnyFieldEmpty = Object.values({
      ClientName,
      OpportunityID,
      OpportunityName,
      OpportunityType,
      OpportunitySource,
      DealValue,
      DealType,
      DealStage,
      Solution,
      ExpectedSubmission,
    }).some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }

      if (typeof value === "number") {
        return value.toString().trim() === "";
      }
      return true;
    });

    return isAnyFieldEmpty;
  };
  const excludedIndices = [4, 5, 6, 7, 12, 13, 14, 15, 17, 18, 20];
  const svgSelter = (type) => {
    if (
      type ==
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.5625 38H9.375C9.22582 38 9.08274 37.9407 8.97725 37.8352C8.87176 37.7298 8.8125 37.5867 8.8125 37.4375V2.5625C8.8125 2.41332 8.87176 2.27024 8.97725 2.16475C9.08274 2.05926 9.22582 2 9.375 2H27.7474C27.8965 2.00003 28.0396 2.05932 28.1451 2.16481L33.9602 7.97994C34.0657 8.0854 34.125 8.22845 34.125 8.37762V37.4375C34.125 37.5867 34.0657 37.7298 33.9602 37.8352C33.8548 37.9407 33.7117 38 33.5625 38Z"
            fill="url(#paint0_linear_465_291)"
          />
          <path
            d="M6 20.532L8.25 19.5381L9.8205 21.9484H6V20.532Z"
            fill="url(#paint1_linear_465_291)"
          />
          <path
            d="M33 38H8.8125C8.66332 38 8.52024 37.9407 8.41475 37.8352C8.30926 37.7298 8.25 37.5867 8.25 37.4375V2.5625C8.25 2.41332 8.30926 2.27024 8.41475 2.16475C8.52024 2.05926 8.66332 2 8.8125 2H27.4177L33.5625 8.14475V37.4375C33.5625 37.5867 33.5032 37.7298 33.3977 37.8352C33.2923 37.9407 33.1492 38 33 38Z"
            fill="url(#paint2_linear_465_291)"
          />
          <path
            d="M27.4177 2V7.58225C27.4177 7.73143 27.477 7.87451 27.5825 7.98C27.688 8.08549 27.831 8.14475 27.9802 8.14475H33.5625L30.8062 4.826L27.4177 2Z"
            fill="url(#paint3_linear_465_291)"
          />
          <path
            d="M22.2624 31H6.73764C6.64076 31.0001 6.54482 30.9744 6.4553 30.9244C6.36578 30.8744 6.28444 30.8011 6.21593 30.7087C6.14742 30.6163 6.09309 30.5065 6.05604 30.3858C6.01899 30.265 5.99995 30.1355 6 30.0048V21H22.2624C22.458 21.0001 22.6455 21.105 22.7838 21.2916C22.9221 21.4782 22.9999 21.7313 23 21.9952V30.0048C23 30.2688 22.9223 30.5219 22.7839 30.7085C22.6456 30.8952 22.458 31 22.2624 31Z"
            fill="url(#paint4_linear_465_291)"
          />
          <path
            d="M8.25 19.5381H6.9945C6.86393 19.538 6.73462 19.5637 6.61396 19.6136C6.49331 19.6635 6.38367 19.7367 6.29132 19.829C6.19896 19.9213 6.1257 20.0309 6.07571 20.1515C6.02573 20.2722 6 20.4014 6 20.532C5.99993 20.6626 6.0256 20.792 6.07555 20.9127C6.1255 21.0334 6.19875 21.143 6.29112 21.2354C6.38348 21.3278 6.49314 21.401 6.61383 21.451C6.73453 21.5009 6.86388 21.5266 6.9945 21.5265H8.25V19.5381Z"
            fill="#185C37"
          />
          <path
            d="M18.344 29H17.272C17.1973 29 17.1373 28.9813 17.092 28.944C17.0493 28.9067 17.0147 28.864 16.988 28.816L15.648 26.596C15.6267 26.6627 15.6013 26.72 15.572 26.768L14.288 28.816C14.256 28.8613 14.2187 28.904 14.176 28.944C14.136 28.9813 14.0827 29 14.016 29H13.012L14.932 26.024L13.088 23.216H14.16C14.2347 23.216 14.288 23.2267 14.32 23.248C14.3547 23.2667 14.3867 23.2987 14.416 23.344L15.732 25.464C15.7587 25.3973 15.7907 25.3307 15.828 25.264L17.036 23.364C17.0653 23.3133 17.0973 23.276 17.132 23.252C17.1667 23.228 17.2107 23.216 17.264 23.216H18.292L16.432 25.98L18.344 29Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_465_291"
              x1="21.4688"
              y1="-15.9927"
              x2="21.4688"
              y2="-14.5493"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#B5FFC1" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_465_291"
              x1="6.66511"
              y1="19.3803"
              x2="7.83567"
              y2="22.5878"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#18884F" />
              <stop offset="0.5" stop-color="#117E43" />
              <stop offset="1" stop-color="#0B6631" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_465_291"
              x1="20.9063"
              y1="-1.05381"
              x2="20.9063"
              y2="88.6121"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#BBFFB5" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_465_291"
              x1="30.4901"
              y1="-11.1788"
              x2="30.4901"
              y2="-0.249438"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#B5FFC1" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_465_291"
              x1="8.95951"
              y1="20.3455"
              x2="13.5583"
              y2="33.8603"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#18884F" />
              <stop offset="0.5" stop-color="#117E43" />
              <stop offset="1" stop-color="#0B6631" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else if (type == "image/png") {
      return (
        <svg
          className="h-[40px] w-[40px]"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="41"
          viewBox="0 0 40 41"
          fill="none"
        >
          <path
            d="M30.8904 2.40479L38.0046 9.92071V38.502H11.4287V38.5953H38.0954V10.0153L30.8904 2.40479Z"
            fill="#909090"
          />
          <path
            d="M30.4763 2.40479H11.4287V38.5953H38.0954V10.0153L30.4763 2.40479Z"
            fill="#F4F4F4"
          />
          <path
            d="M10.8186 4.875H2.83105V13.4088H27.9561V4.875H10.8186Z"
            fill="#7A7B7C"
          />
          <path
            d="M28.0899 13.2636H2.99365V4.72363H28.0899V13.2636Z"
            fill="#DD2025"
          />
          <path
            d="M11.3149 6.16736H9.68115V12.1674H10.9662V10.1436L11.2499 10.1599C11.5256 10.1551 11.7987 10.1057 12.0587 10.0136C12.2865 9.93524 12.4962 9.8115 12.6749 9.64986C12.8568 9.49589 13.0002 9.30156 13.0937 9.08237C13.219 8.71799 13.2638 8.33074 13.2249 7.94736C13.2171 7.6735 13.1691 7.40227 13.0824 7.14236C13.0035 6.95475 12.8864 6.78561 12.7385 6.64573C12.5907 6.50585 12.4153 6.39828 12.2237 6.32986C12.0579 6.26986 11.8867 6.22632 11.7124 6.19986C11.5804 6.1795 11.4472 6.16864 11.3137 6.16736M11.0774 9.03486H10.9662V7.18486H11.2074C11.3139 7.17719 11.4207 7.19353 11.52 7.23269C11.6193 7.27185 11.7086 7.33283 11.7812 7.41111C11.9316 7.61238 12.0119 7.85737 12.0099 8.10861C12.0099 8.41611 12.0099 8.69486 11.7324 8.89111C11.5325 9.00107 11.3049 9.05183 11.0774 9.03486ZM15.6662 6.15111C15.5274 6.15111 15.3924 6.16111 15.2974 6.16486L14.9999 6.17236H14.0249V12.1724H15.1724C15.6109 12.1844 16.0475 12.1101 16.4574 11.9536C16.7873 11.8228 17.0794 11.6118 17.3074 11.3399C17.5291 11.0654 17.6882 10.7459 17.7737 10.4036C17.8719 10.016 17.9198 9.61726 17.9162 9.21736C17.9404 8.74506 17.9039 8.2716 17.8074 7.80861C17.7159 7.46782 17.5445 7.15373 17.3074 6.89236C17.1214 6.68132 16.8937 6.51108 16.6387 6.39236C16.4196 6.29101 16.1892 6.21631 15.9524 6.16986C15.8582 6.15431 15.7628 6.1472 15.6674 6.14861M15.4399 11.0699H15.3149V7.23986H15.3312C15.5889 7.21021 15.8496 7.25671 16.0812 7.37361C16.2507 7.50902 16.3889 7.67961 16.4862 7.87361C16.5911 8.07778 16.6516 8.30187 16.6637 8.53111C16.6749 8.80611 16.6637 9.03111 16.6637 9.21736C16.6687 9.43191 16.6549 9.64649 16.6224 9.85861C16.5839 10.0764 16.5127 10.2871 16.4112 10.4836C16.2963 10.6663 16.141 10.8202 15.9574 10.9336C15.8032 11.0334 15.6206 11.0799 15.4374 11.0661M21.7874 6.17236H18.7499V12.1724H20.0349V9.79236H21.6599V8.67736H20.0349V7.28736H21.7849V6.17236"
            fill="#464648"
          />
          <path
            d="M27.2264 25.8189C27.2264 25.8189 31.2114 25.0964 31.2114 26.4576C31.2114 27.8189 28.7426 27.2651 27.2264 25.8189ZM24.2801 25.9226C23.647 26.0625 23.03 26.2674 22.4389 26.5339L22.9389 25.4089C23.4389 24.2839 23.9576 22.7501 23.9576 22.7501C24.5542 23.7543 25.2484 24.6972 26.0301 25.5651C25.4406 25.653 24.8564 25.7732 24.2801 25.9251V25.9226ZM22.7026 17.7976C22.7026 16.6114 23.0864 16.2876 23.3851 16.2876C23.6839 16.2876 24.0201 16.4314 24.0314 17.4614C23.934 18.4971 23.7172 19.518 23.3851 20.5039C22.9303 19.6762 22.6949 18.7458 22.7014 17.8014L22.7026 17.7976ZM16.8914 30.9426C15.6689 30.2114 19.4551 27.9601 20.1414 27.8876C20.1376 27.8889 18.1714 31.7076 16.8914 30.9426ZM32.3751 26.6189C32.3626 26.4939 32.2501 25.1101 29.7876 25.1689C28.7612 25.1523 27.7353 25.2247 26.7214 25.3851C25.7392 24.3956 24.8934 23.2795 24.2064 22.0664C24.6392 20.8157 24.9011 19.5122 24.9851 18.1914C24.9489 16.6914 24.5901 15.8314 23.4401 15.8439C22.2901 15.8564 22.1226 16.8626 22.2739 18.3601C22.422 19.3664 22.7015 20.349 23.1051 21.2826C23.1051 21.2826 22.5739 22.9364 21.8714 24.5814C21.1689 26.2264 20.6889 27.0889 20.6889 27.0889C19.4673 27.4866 18.3173 28.0774 17.2826 28.8389C16.2526 29.7976 15.8339 30.5339 16.3764 31.2701C16.8439 31.9051 18.4801 32.0489 19.9426 30.1326C20.7197 29.1429 21.4296 28.1022 22.0676 27.0176C22.0676 27.0176 24.2976 26.4064 24.9914 26.2389C25.6851 26.0714 26.5239 25.9389 26.5239 25.9389C26.5239 25.9389 28.5601 27.9876 30.5239 27.9151C32.4876 27.8426 32.3926 26.7414 32.3801 26.6214"
            fill="#DD2025"
          />
          <path
            d="M30.2837 2.4043V10.2317H38.0953V10.0233L30.2837 2.4043Z"
            fill="#909090"
          />
          <path
            d="M30.4761 2.40479V10.0238H38.0951L30.4761 2.40479Z"
            fill="#F4F4F4"
          />
          <path
            d="M11.2187 6.07117H9.58496V12.0712H10.875V10.0487L11.16 10.0649C11.4357 10.0602 11.7088 10.0108 11.9687 9.91867C12.1966 9.84026 12.4062 9.71653 12.585 9.55492C12.7655 9.40053 12.9076 9.20624 13 8.98742C13.1253 8.62305 13.1701 8.2358 13.1312 7.85242C13.1234 7.57856 13.0754 7.30733 12.9887 7.04742C12.9098 6.85981 12.7927 6.69067 12.6449 6.55079C12.497 6.41091 12.3217 6.30333 12.13 6.23492C11.9635 6.17434 11.7914 6.13037 11.6162 6.10367C11.4842 6.08331 11.351 6.07245 11.2175 6.07117M10.9812 8.93867H10.87V7.08867H11.1125C11.2189 7.08099 11.3258 7.09734 11.4251 7.1365C11.5244 7.17566 11.6136 7.23664 11.6862 7.31492C11.8366 7.51619 11.917 7.76118 11.915 8.01242C11.915 8.31992 11.915 8.59867 11.6375 8.79492C11.4375 8.90488 11.21 8.95438 10.9825 8.93742M15.57 6.05492C15.4312 6.05492 15.2962 6.06492 15.2012 6.06867L14.9075 6.07617H13.9325V12.0762H15.08C15.5185 12.0882 15.9551 12.0139 16.365 11.8574C16.6949 11.7266 16.987 11.5156 17.215 11.2437C17.4367 10.9692 17.5958 10.6497 17.6812 10.3074C17.7794 9.91976 17.8273 9.52107 17.8237 9.12117C17.848 8.64887 17.8114 8.17541 17.715 7.71242C17.6234 7.37163 17.452 7.05754 17.215 6.79617C17.029 6.58513 16.8013 6.41489 16.5462 6.29617C16.3272 6.19482 16.0968 6.12012 15.86 6.07367C15.7658 6.05812 15.6704 6.051 15.575 6.05242M15.3475 10.9737H15.2225V7.14367H15.2387C15.4964 7.11402 15.7571 7.16052 15.9887 7.27742C16.1583 7.41283 16.2965 7.58342 16.3937 7.77742C16.4987 7.98159 16.5592 8.20568 16.5712 8.43492C16.5825 8.70992 16.5712 8.93492 16.5712 9.12117C16.5763 9.33572 16.5625 9.5503 16.53 9.76242C16.4914 9.98021 16.4202 10.1909 16.3187 10.3874C16.2038 10.5701 16.0486 10.7241 15.865 10.8374C15.7107 10.9372 15.5281 10.9837 15.345 10.9699M21.6912 6.07617H18.6537V12.0762H19.9387V9.69617H21.5637V8.58117H19.9387V7.19117H21.6887V6.07617"
            fill="white"
          />
        </svg>
      );
    } else {
      return (
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.5625 38H9.375C9.22582 38 9.08274 37.9407 8.97725 37.8352C8.87176 37.7298 8.8125 37.5867 8.8125 37.4375V2.5625C8.8125 2.41332 8.87176 2.27024 8.97725 2.16475C9.08274 2.05926 9.22582 2 9.375 2H27.7474C27.8965 2.00003 28.0396 2.05932 28.1451 2.16481L33.9602 7.97994C34.0657 8.0854 34.125 8.22845 34.125 8.37762V37.4375C34.125 37.5867 34.0657 37.7298 33.9602 37.8352C33.8548 37.9407 33.7117 38 33.5625 38Z"
            fill="url(#paint0_linear_450_282)"
          />
          <path
            d="M6 20.532L8.25 19.5381L9.8205 21.9484H6V20.532Z"
            fill="url(#paint1_linear_450_282)"
          />
          <path
            d="M33 38H8.8125C8.66332 38 8.52024 37.9407 8.41475 37.8352C8.30926 37.7298 8.25 37.5867 8.25 37.4375V2.5625C8.25 2.41332 8.30926 2.27024 8.41475 2.16475C8.52024 2.05926 8.66332 2 8.8125 2H27.4177L33.5625 8.14475V37.4375C33.5625 37.5867 33.5032 37.7298 33.3977 37.8352C33.2923 37.9407 33.1492 38 33 38Z"
            fill="url(#paint2_linear_450_282)"
          />
          <path
            d="M27.4177 2V7.58225C27.4177 7.73143 27.477 7.87451 27.5825 7.98C27.688 8.08549 27.831 8.14475 27.9802 8.14475H33.5625L30.8062 4.826L27.4177 2Z"
            fill="url(#paint3_linear_450_282)"
          />
          <path
            d="M27.9499 31.5315H6.99563C6.86486 31.5316 6.73536 31.5059 6.61453 31.4558C6.4937 31.4058 6.38391 31.3325 6.29145 31.24C6.19898 31.1476 6.12565 31.0378 6.07564 30.917C6.02563 30.7961 5.99993 30.6666 6 30.5359V21.5269H27.9499C28.2139 21.527 28.467 21.6319 28.6537 21.8186C28.8404 22.0053 28.9454 22.2585 28.9455 22.5225V30.5359C28.9455 30.7999 28.8406 31.0532 28.6539 31.2399C28.4672 31.4266 28.2139 31.5315 27.9499 31.5315Z"
            fill="url(#paint4_linear_450_282)"
          />
          <path
            d="M8.25 19.5381H6.9945C6.86393 19.538 6.73462 19.5637 6.61396 19.6136C6.49331 19.6635 6.38367 19.7367 6.29132 19.829C6.19896 19.9213 6.1257 20.0309 6.07571 20.1515C6.02573 20.2722 6 20.4014 6 20.532C5.99993 20.6626 6.0256 20.792 6.07555 20.9127C6.1255 21.0334 6.19875 21.143 6.29112 21.2354C6.38348 21.3278 6.49314 21.401 6.61383 21.451C6.73453 21.5009 6.86388 21.5266 6.9945 21.5265H8.25V19.5381Z"
            fill="url(#paint5_linear_450_282)"
          />
          <path
            d="M11.5085 29H10.5635V23.939H11.5085V29ZM18.1296 23.939V29H17.3001V25.731C17.3001 25.6003 17.3071 25.4592 17.3211 25.3075L15.7916 28.181C15.7193 28.3187 15.6085 28.3875 15.4591 28.3875H15.3261C15.1768 28.3875 15.066 28.3187 14.9936 28.181L13.4466 25.297C13.4536 25.374 13.4595 25.4498 13.4641 25.5245C13.4688 25.5992 13.4711 25.668 13.4711 25.731V29H12.6416V23.939H13.3521C13.3941 23.939 13.4303 23.9402 13.4606 23.9425C13.491 23.9448 13.5178 23.9507 13.5411 23.96C13.5668 23.9693 13.589 23.9845 13.6076 24.0055C13.6286 24.0265 13.6485 24.0545 13.6671 24.0895L15.1826 26.9C15.2223 26.9747 15.2585 27.0517 15.2911 27.131C15.3261 27.2103 15.36 27.292 15.3926 27.376C15.4253 27.2897 15.4591 27.2068 15.4941 27.1275C15.5291 27.0458 15.5665 26.9677 15.6061 26.893L17.1006 24.0895C17.1193 24.0545 17.1391 24.0265 17.1601 24.0055C17.1811 23.9845 17.2033 23.9693 17.2266 23.96C17.2523 23.9507 17.2803 23.9448 17.3106 23.9425C17.341 23.9402 17.3771 23.939 17.4191 23.939H18.1296ZM23.4308 26.4625V28.51C23.1741 28.699 22.9 28.8378 22.6083 28.9265C22.319 29.0128 22.0086 29.056 21.6773 29.056C21.2643 29.056 20.8898 28.9918 20.5538 28.8635C20.2201 28.7352 19.9343 28.5567 19.6963 28.328C19.4606 28.0993 19.2786 27.8263 19.1503 27.509C19.022 27.1917 18.9578 26.8452 18.9578 26.4695C18.9578 26.0892 19.0196 25.7403 19.1433 25.423C19.267 25.1057 19.442 24.8327 19.6683 24.604C19.897 24.3753 20.1735 24.198 20.4978 24.072C20.8221 23.946 21.1861 23.883 21.5898 23.883C21.7951 23.883 21.9865 23.8993 22.1638 23.932C22.3435 23.9647 22.5091 24.0102 22.6608 24.0685C22.8148 24.1245 22.9548 24.1933 23.0808 24.275C23.2068 24.3567 23.3223 24.4465 23.4273 24.5445L23.1578 24.9715C23.1158 25.0392 23.061 25.0812 22.9933 25.0975C22.9256 25.1115 22.8521 25.094 22.7728 25.045C22.6958 25.0007 22.6188 24.9563 22.5418 24.912C22.4648 24.8677 22.3785 24.8292 22.2828 24.7965C22.1895 24.7638 22.0833 24.737 21.9643 24.716C21.8476 24.695 21.7123 24.6845 21.5583 24.6845C21.3086 24.6845 21.0823 24.7265 20.8793 24.8105C20.6786 24.8945 20.5071 25.0147 20.3648 25.171C20.2225 25.3273 20.1128 25.5152 20.0358 25.7345C19.9588 25.9538 19.9203 26.1988 19.9203 26.4695C19.9203 26.7588 19.9611 27.0178 20.0428 27.2465C20.1268 27.4728 20.2435 27.6653 20.3928 27.824C20.5445 27.9803 20.7265 28.1005 20.9388 28.1845C21.1511 28.2662 21.388 28.307 21.6493 28.307C21.836 28.307 22.0028 28.2872 22.1498 28.2475C22.2968 28.2078 22.4403 28.1542 22.5803 28.0865V27.1695H21.9433C21.8826 27.1695 21.8348 27.1532 21.7998 27.1205C21.7671 27.0855 21.7508 27.0435 21.7508 26.9945V26.4625H23.4308Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="paint0_linear_450_282"
              x1="21.4688"
              y1="-15.9927"
              x2="21.4688"
              y2="-14.5493"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#B5D1FF" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_450_282"
              x1="7.91025"
              y1="19.2405"
              x2="7.91025"
              y2="26.3462"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6E14B5" />
              <stop offset="1" stop-color="#1D0C2F" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_450_282"
              x1="20.9063"
              y1="-1.05381"
              x2="20.9063"
              y2="88.6121"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#B5D1FF" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_450_282"
              x1="30.4901"
              y1="-11.1788"
              x2="30.4901"
              y2="-0.249438"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F3F7FF" />
              <stop offset="0.99" stop-color="#B5D1FF" />
            </linearGradient>
            <linearGradient
              id="paint4_linear_450_282"
              x1="17.4727"
              y1="20.2916"
              x2="17.4727"
              y2="49.7857"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6E14B5" />
              <stop offset="1" stop-color="#1D0C2F" />
            </linearGradient>
            <linearGradient
              id="paint5_linear_450_282"
              x1="7.125"
              y1="19.2926"
              x2="7.125"
              y2="25.1546"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6E14B5" />
              <stop offset="0.647222" stop-color="#1D0C2F" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };
  const submitHandler = () => {
    setLoading(true);
    axios
      .post("http://localhost:3001/api/add/data", profileData)
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
          setDisable(true);
        }, 1000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <div className="bg-[#ECECEC] w-full  pb-4 px-4">
        <div
          className={`flex bg-[#FFF] flex-col p-4 items-start gap-6 rounded-2xl self-stretch w-[100%] ${styles.customMargins}`}
          style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
        >
          <div className="flex  px-3 items-center self-stretch w-full ">
            <div className="bg-[#DEDEDE] h-[8px] w-full rounded-full">
              <div className="bg-[#6200AF]  h-[8px] w-[10%] rounded-full"></div>
            </div>
          </div>
          <div
            className="grid grid-cols-2  w-full"
            style={{ gridTemplateColumns: "53.30% 46.7%" }}
          >
            <div className=" grid grid-cols-3 gap-2 w-full ">
              {inputFields.map((item, index) => (
                <div
                  className={`flex flex-col gap-1  ${item.className}`}
                  key={index}
                >
                  <div className="text-[14px] font-montserrat font-medium">
                    {item.label}
                    {item.isMaditory && (
                      <span className="text-[#C00000] font-Montserrat text-[14px] font-semibold">
                        *
                      </span>
                    )}
                  </div>

                  <div
                    className={`border-[1px] flex rounded-[8px] w-[100%] px-1 py-[7px] ${
                      formErrors[item.name] && !excludedIndices.includes(index)
                        ? "border-[#C00000]"
                        : "border-[#9D9D9D]"
                    }`}
                  >
                    <div className="w-full ">
                      {index === 0 ||
                      index === 1 ||
                      index === 2 ||
                      index === 12 ||
                      index === 13 ||
                      index === 14 ||
                      index === 15 ||
                      index === 17 ||
                      index === 16 ||
                      index === 18 ? (
                        <input
                          type={item.type}
                          className="w-full text-[14px] font-montserrat outline-none"
                          onChange={handleInputChange}
                          disabled={!isChecked}
                          name={item.name}
                        />
                      ) : (
                        <select
                          name={item.name}
                          className="w-full text-[14px] font-montserrat outline-none bg-[#fff]"
                          value={profileData[item.name]}
                          onChange={handleInputChange}
                          disabled={!isChecked}
                        >
                          <option value="">Find items</option>

                          <option value="Option1">Option 1</option>
                          <option value="Option2">Option 2</option>
                          <option value="Option3">Option 3</option>
                        </select>
                      )}
                    </div>
                  </div>
                  {formErrors[item.name] &&
                    !excludedIndices.includes(index) && (
                      <span className="text-[#C00000] text-[12px]">
                        Field is required
                      </span>
                    )}
                </div>
              ))}
            </div>
            {disable ? (
              <div className="grid px-4">
                <div className="document_img w-[100%] h-[800px] rounded-[16px] flex items-center justify-center">
                  <div className="flex flex-col gap-[24px] text-[24px] font-[600] items-center justify-center text-[#fff] ">
                    Upload RPF Document
                    {file ? (
                      <div
                        className="w-[100%] bg-[#fff] rounded-[12px] py-[16px] px-[24px] flex flex-col gap-[16px] justify-center items-center rounded-[12px]"
                        style={{
                          backdropFilter: "blur(3px)",
                        }}
                      >
                        {Object.values(file).map((file) => (
                          <div className="text-[16px] py-[8px] px-[12px] font-[500] text-[#000] w-full flex gap-[8px] items-center rounded-[8px] border-solid border-[1px] border-[#CCC]">
                            {svgSelter(file.type)}
                            {file.name}
                          </div>
                        ))}
                        <div className="flex flex-col gap-[4px] text-[14px] items-center justify-center font-[400] text-[#333]">
                          <div className="text-[16px] font-[400] text-[#333]">
                            <span className="text-[#8A08E4] font-[600]">
                              Browse file
                            </span>{" "}
                            or drag and drop
                          </div>
                          Allowed file formats: PDF, DOC, DOCX | up to 1.5 MB
                        </div>
                        <div
                          ref={fileRef}
                          onDragOver={handleDragOver}
                          onDrop={handleFileChange}
                          class="bg-[#6E14B5] flex flex-col w-full rounded-[8px] px-[16px] py-[12px] items-center gap-[8px] upload-btn-wrapper "
                        >
                          <input
                            type="file"
                            name="myfile"
                            multiple
                            onChange={handleFileChange}
                          />

                          <>
                            <div className="  flex  flex-col  items-center"></div>
                            <div class="flex flex-col gap-[4px]	font-normal	">
                              <div
                                onClick={handleButtonClick}
                                class="flex text-center justify-center text-[16px] font-[600] text-[#fff] "
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="25"
                                  viewBox="0 0 24 25"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_203_55)">
                                    <path
                                      d="M11.25 16.2884V7.8884L8.78462 10.3538L7.7308 9.2692L12 5L16.2692 9.2692L15.2153 10.3538L12.7499 7.8884V16.2884H11.25ZM6.3077 20C5.80257 20 5.375 19.825 5.025 19.475C4.675 19.125 4.5 18.6974 4.5 18.1923V15.4808H5.99997V18.1923C5.99997 18.2692 6.03202 18.3397 6.09612 18.4038C6.16024 18.4679 6.23077 18.5 6.3077 18.5H17.6922C17.7692 18.5 17.8397 18.4679 17.9038 18.4038C17.9679 18.3397 18 18.2692 18 18.1923V15.4808H19.5V18.1923C19.5 18.6974 19.325 19.125 18.975 19.475C18.625 19.825 18.1974 20 17.6922 20H6.3077Z"
                                      fill="white"
                                    />
                                  </g>
                                </svg>
                                Upload Files
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div
                          className="w-[100%] bg-[#fff] rounded-[12px] py-[16px] px-[24px] flex flex-col gap-[16px] justify-center items-center rounded-[12px]"
                          style={{
                            backdropFilter: "blur(3px)",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="60"
                            height="61"
                            viewBox="0 0 60 61"
                            fill="none"
                          >
                            <path
                              d="M47.7749 12.725H12.225V48.275C5.47379 48.275 0 42.8012 0 36.0499V12.725C0 5.97379 5.47379 0.5 12.225 0.5H35.5499C42.3011 0.5 47.7749 5.97379 47.7749 12.725Z"
                              fill="#9B6AFB"
                            />
                            <path
                              d="M60 24.9502V48.275C60 55.0263 54.5263 60.5 47.775 60.5H24.4502C21.0741 60.5 18.0181 59.1316 15.8058 56.9193C13.5936 54.7071 12.2251 51.6502 12.2251 48.275L30 30.5L47.7749 48.2749V12.7251C54.5262 12.7251 60 18.1989 60 24.9502Z"
                              fill="#2FD5EB"
                            />
                            <path
                              d="M12.2251 12.7251V48.275L30 30.5L47.7749 48.2749V12.7251H12.2251ZM38.4148 27.6245C35.3551 27.6245 32.8756 25.1449 32.8756 22.0853C32.8756 19.0257 35.3551 16.5454 38.4148 16.5454C41.4744 16.5454 43.9547 19.0256 43.9547 22.0853C43.9547 25.145 41.4744 27.6245 38.4148 27.6245Z"
                              fill="#3A2CAF"
                            />
                            <path
                              d="M43.9546 22.0853C43.9546 25.145 41.4743 27.6245 38.4147 27.6245C35.355 27.6245 32.8755 25.145 32.8755 22.0853C32.8755 19.0257 35.355 16.5454 38.4147 16.5454C41.4744 16.5455 43.9546 19.0257 43.9546 22.0853Z"
                              fill="white"
                            />
                          </svg>
                          <div className="flex flex-col gap-[4px] text-[14px] items-center justify-center font-[400] text-[#333]">
                            <div className="text-[16px] font-[400] text-[#333]">
                              <span className="text-[#8A08E4] font-[600]">
                                Browse file
                              </span>{" "}
                              or drag and drop
                            </div>
                            Allowed file formats: PDF, DOC, DOCX | up to 1.5 MB
                          </div>
                          <div
                            ref={fileRef}
                            onDragOver={handleDragOver}
                            onDrop={handleFileChange}
                            class="bg-[#6E14B5]  flex flex-col w-full rounded-[8px] px-[16px] py-[12px] items-center gap-[8px] upload-btn-wrapper "
                          >
                            <input
                              type="file"
                              name="myfile"
                              multiple
                              onChange={handleFileChange}
                            />

                            <>
                              <div className="  flex  flex-col  items-center"></div>
                              <div class="flex flex-col gap-[4px]	font-normal	">
                                <div
                                  onClick={handleButtonClick}
                                  class="flex text-center justify-center text-[16px] font-[600] text-[#fff] "
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="25"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                  >
                                    <g mask="url(#mask0_203_55)">
                                      <path
                                        d="M11.25 16.2884V7.8884L8.78462 10.3538L7.7308 9.2692L12 5L16.2692 9.2692L15.2153 10.3538L12.7499 7.8884V16.2884H11.25ZM6.3077 20C5.80257 20 5.375 19.825 5.025 19.475C4.675 19.125 4.5 18.6974 4.5 18.1923V15.4808H5.99997V18.1923C5.99997 18.2692 6.03202 18.3397 6.09612 18.4038C6.16024 18.4679 6.23077 18.5 6.3077 18.5H17.6922C17.7692 18.5 17.8397 18.4679 17.9038 18.4038C17.9679 18.3397 18 18.2692 18 18.1923V15.4808H19.5V18.1923C19.5 18.6974 19.325 19.125 18.975 19.475C18.625 19.825 18.1974 20 17.6922 20H6.3077Z"
                                        fill="white"
                                      />
                                    </g>
                                  </svg>
                                  Upload Files
                                </div>
                              </div>
                            </>
                          </div>
                        </div>
                      </>
                    )}
                    <button
                      onClick={() => setToggle(3)}
                      className={`py-[12px] px-[24px] flex gap-[6px] items-center justify-center text-[18px] font-[600] text-[#fff] ${
                        file === null && " opacity-50"
                      }`}
                      disabled={file === null}
                    >
                      Save & Continue
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="41"
                        viewBox="0 0 40 41"
                        fill="none"
                      >
                        <g mask="url(#mask0_203_61)">
                          <path
                            d="M20 26.2914L25.7917 20.4998L20 14.7082L18.5417 16.1665L21.8281 19.4528H13.9531V21.5468H21.8281L18.5417 24.8331L20 26.2914ZM20.0028 36.3331C17.8243 36.3331 15.7734 35.9175 13.8501 35.0864C11.9267 34.2553 10.2478 33.1228 8.81312 31.6888C7.37848 30.2548 6.24543 28.5765 5.41396 26.654C4.58248 24.7315 4.16675 22.6811 4.16675 20.5026C4.16675 18.3127 4.5823 16.2543 5.41341 14.3274C6.24453 12.4005 7.37708 10.7244 8.81108 9.29901C10.2451 7.87362 11.9233 6.74519 13.8458 5.91371C15.7683 5.08224 17.8188 4.6665 19.9972 4.6665C22.1871 4.6665 24.2455 5.08206 26.1724 5.91317C28.0993 6.74428 29.7755 7.8722 31.2008 9.29692C32.6262 10.7217 33.7547 12.3971 34.5861 14.3231C35.4176 16.2492 35.8333 18.3071 35.8333 20.497C35.8333 22.6755 35.4178 24.7264 34.5867 26.6498C33.7556 28.5731 32.6276 30.2521 31.2029 31.6867C29.7782 33.1214 28.1028 34.2544 26.1767 35.0859C24.2507 35.9174 22.1927 36.3331 20.0028 36.3331ZM20 34.2391C23.8277 34.2391 27.0745 32.9033 29.7404 30.2316C32.4064 27.56 33.7394 24.316 33.7394 20.4998C33.7394 16.6722 32.4064 13.4254 29.7404 10.7594C27.0745 8.09345 23.8277 6.76046 20 6.76046C16.1838 6.76046 12.9398 8.09345 10.2682 10.7594C7.59654 13.4254 6.26071 16.6722 6.26071 20.4998C6.26071 24.316 7.59654 27.56 10.2682 30.2316C12.9398 32.9033 16.1838 34.2391 20 34.2391Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid px-4">
                <div className="w-[100%] object-contain">
                  <img src="img/frm1.png" alt="" className="w-full h-full ob" />
                            
                </div>
              </div>
            )}
            <div className="w-full flex justify-end gap-3">
              <button
                // onClick={()=>setToggle(3)}
                style={{ opacity: isDisabled() ? 0.5 : 1 }}
                onClick={() => submitHandler()}
                // disabled={isDisabled()}
                className="w-[100px] h=[40px] justify-center items-center flex rounded-[8px] bg-[#6E14B5] text-[#fff] font-Montserrat text-[14px] font-semibold"
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4  text-white animate-spin"
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
                  "Submit"
                )}
              </button>
              <button
                className="py-[10px] px-6 justify-center items-center flex rounded-[8px] bg-[#fff] text-[#C00000] font-Montserrat text-[14px] font-semibold"
                style={{ border: "1px solid var(--Red-Mandatory, #C00000)" }}
                onClick={() => {
                  setDisable(false);
                  setProfileData({
                    ClientName: "",
                    OpportunityID: "",
                    OpportunityName: "",
                    OpportunityType: "",
                    OpportunitySource: "",
                    DealValue: "",
                    DealType: "",
                    DealStage: "",
                    Solution: "",
                    ExpectedSubmission: "",
                  });
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form1;
