import { useState, useEffect } from "react";
import Representative from "./Forms/RepresentativeForm";
import PasswordForm from "./Forms/PasswordForm";
import InformationForm  from "./Forms/InformationForm";
import ConfirmationForm from "./Forms/ConfirmationForm";

export default function FormManager({ onSwitch }) {
  const [pageIndex,setPageIndex] = useState(0)
  const [isValid, setValidity] = useState(0)
  const [isCurrentValid, setIsCurrentValid] = useState(0)
  const [pullData, setPullData] =useState(false)
  const [formDataSummary, setDataSummary] = useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      phoneNo:"",
      companyName:"",
      industry:"",
      dateOfIncorp:"",
      country: ""
  })
  const [checked, setChecked] = useState(false)

  const policyHandleInput = e => {
    const target = e.target
   
    setChecked(prev => !prev)
    if (target.checked) {
      setValidity(1)
      return;
    }
    setValidity(0)
  }

  const updateFormData = (data) => {
    setDataSummary(prev => ({...prev, ...data}))
  }
  const errorHandler = (validity) => {
   setIsCurrentValid(validity)
  }

  useEffect(() => {
    onSwitch(pageIndex)
    if(pageIndex == 3 ){
      if(checked){
        setValidity(1)
      }
      else{
        console.log("setting to 0");
      setValidity(0)
      }
    } 
    if(pageIndex == 4){
      console.log(formDataSummary)
    }
  }, [pageIndex]);

  useEffect(() => {
    if(pageIndex === 3){
      if(!checked){
        setValidity(0);
        return;
      }
      setValidity(1);
    }
  }, [checked])
  
  useEffect(() => {
    if(!isCurrentValid){setValidity(0);return}
    setValidity(1)
  }, [isCurrentValid])
  
  const validate = e => {
    e.preventDefault()

    if(!isValid){
      e.target.classList.add("was-validated")
    } else{
      setPullData(prev=>prev+1)
      e.target.classList.remove("was-validated")
      
      if(pageIndex < 4){
        setValidity(prev => prev-1)
        setPageIndex(prev => prev+1)
      }
    } 
    
  }

  const goBack = e =>{
    setPageIndex(prev => prev-1)
    setValidity(1)
    }

  
    return (
      <form className="dynamic-form pb-5" onSubmit={e => validate(e)} noValidate>
        <div className="page pb-4 mb-4" >
          <Representative onError={errorHandler} toUpdate={updateFormData} shouldUpdate={pullData} display={pageIndex !== 0?"d-none":""}/>
          <PasswordForm onError={errorHandler} display={pageIndex !== 1?"d-none":""}/>
          <InformationForm onError={errorHandler} toUpdate={updateFormData} shouldUpdate={pullData} display={pageIndex !== 2?"d-none":""}/>
          <ConfirmationForm dataSummary={formDataSummary} display={pageIndex !== 3?"d-none":""}/>
          
        </div>


        <div className="form-btns container m-0 p-0" style={pageIndex === 3?{display: "flex", justifyContent: "space-between"}:{display: "flex", justifyContent: "space-between"}}>
          <div className={pageIndex !== 3?"d-none":""}>
            <input onClick={policyHandleInput} className="" type="checkbox" id="policy" required/>
            <label className="ms-1" for="policy">Please accept the </label><a href="#">privacy policy...</a>
          </div>
          <div>
            <button type="submit" className={"btn btn-primary gradient " + (!isValid?"disabled ":"") +(pageIndex === 4?"d-none":"")}
              style={{order:1}}>{pageIndex === 3?"Register":"Proceed"}</button>
            { pageIndex > 0?
              <button type="button" onClick={goBack} className="btn btn-outline-info ms-3">Back</button>
              :""
            }
          </div>
        </div>
        </form>
    )
    
  
}
