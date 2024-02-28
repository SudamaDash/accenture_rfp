import React from 'react'
import styles from '../App.module.css'


const SubHeader = () => {
  return (
    <>
    <div className="bg-[#ECECEC] w-full pt-4 pb-4 px-4">
    {/* <div className={`flex bg-[#6200AF] items-start gap-1 flex-col py-4 px-6 self-stretch  rounded-2xl w-[100%] ${styles.customMargins}`}>
        <p className='text-[#fff] font-Montserrat font-semibold text-[24px]'>RFP Document Analysis</p>
        <p className='text-[#fff] font-Montserrat font-medium text-[16px]'>Generative AI to analyze the requirements in the RFP and Identify the Valuable Insights</p>
   
        </div> */}
        <div className={`flex items-start gap-1 flex-col py-4 px-6 self-stretch rounded-2xl w-[100%] ${styles.customMargins}`} style={{ backgroundImage: 'url("img/bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <p className='text-[#fff] font-Montserrat font-semibold text-[24px]'>RFP Document Analysis</p>
  <p className='text-[#fff] font-Montserrat font-medium text-[16px]'>Generative AI to analyze the requirements in the RFP and Identify the Valuable Insights</p>
</div>


    </div>
    
    </>
  )
}

export default SubHeader
