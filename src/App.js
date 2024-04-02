import { useState } from "react";
import FormManager from "./FormManager"
import PageIndex from "./PageIndex";

export default function App() {
  const [pageIndex, setPageIndex] = useState(0)

  const switchHandler = (index) => {
    setPageIndex(index);
  }
  
  return (
  <>
    <div className="content-container mt-4">
      <div className="logo"> </div>
      <div className={"content mt-2 " + (pageIndex !== 4?"":"d-none")}>
      
          <PageIndex index={pageIndex}/>
    
        <div className="static-form pt-5">
          <div className="title-bar">
            <h4 className=" border-2 border-bottom border-primary pb-lg-2 pb-2">Company Registration</h4>
          </div>
        
            <FormManager onSwitch={switchHandler} />
        </div>
       
      </div>
      <div className={"success-page mt-2 "+(pageIndex !== 4?"d-none":"")}>
        <div className="content">
          <img src="/images/success.PNG" alt="Imag" style={{width:100 + "px", height:86 +"px"}}/>
          <h4 className="text-secondary mt-3">Registration Complete</h4>
          <p className="text-light">Your application was submitted successfully, and is currently undergoing review.</p>
        </div>
      </div>
    </div>
    <div className="btn-div">
      <button className="btn btn-primary ">Help</button>
    </div>
  </>
  );
}


