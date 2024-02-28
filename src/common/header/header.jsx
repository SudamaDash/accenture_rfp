import React, { useState } from "react";
import styles from '../../App.module.css'
import Downloads from "../../components/Downloads";

const Header = () => {

  const [show,setShow] = useState(false)
  return (
 

    <>
         <div
          className="flex px-4 py-4 bg-white w-full  "
          style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
        >
          

          <div className={`flex items-center self-stretch justify-between w-[100%] ${styles.customMargins}`}>
            <div className="flex items-center gap-4">
              <img src="img/ac.png" alt="" className="w-[37px] h-[40px]" />
              <p className="text-[#333] font-Montserrat text-[28px] font-[700]">
                Accenture
              </p>
            </div>
            <div className="flex items-center gap-4">
              <img 
              onClick={() =>setShow(true)}
              src="img/fol.png" alt="" className="w-[24px] h-[24px]" />
              <div className="flex items-center py-[3px] px-[5px]">
                <img
                  src="img/not.png"
                  alt=""
                  className="w-[19.33px] h-[24px]"
                />
              </div>
              <div className="flex items-center gap-2 justify-end">
              <img
                  src="img/pro.png"
                  alt=""
                  className="w-[40px] h-[40px]"
                />
                <div className="flex items-center justify-end gap-[2px]">
                  <p className="text-[#333] font-Montserrat font-semibold text-[14px]">Sudama Dash</p>
                  <img
                  src="img/dr.png"
                  alt=""
                  className="w-[20px] h-[20px]"
                />

                </div>

              </div>
            </div>
         
          </div>
        </div> 

        {
              show &&
<>
<div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
              <div className="absolute  w-[90%] "></div>
              <div className="  w-[100%] ">
              <Downloads setShow={setShow}/>
              </div>
              </div>
            
             
              </>
            }
    </>
    
  );
};

export default Header;
