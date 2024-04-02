import { useState, useEffect, useRef } from "react";

export default function InformationForm({display, onError, toUpdate, shouldUpdate}) {
  const [formIsValid, setFormIsValid] = useState(0)
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState(
    {
      companyName:"empty",
      industry:"empty",
      dateOfIncorp:"empty",
      country: "empty"
    }
  )
  const [hideOther, sethideOther] = useState(true)
  const otherInput = useRef()

  const companyNameHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, companyName: target.value}));
    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, companyName: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, companyName: 'error message'}))
  }

  const industryHandleInput = e => {
    const target = e.target
    
    setFormData(prev => ({...prev, industry: target.value}));

    
    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, industry: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, industry: 'error message'}))
  }

  const otherHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, other: target.value}));
    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, other: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, other: 'error message'}))
  }

  const dateOfIncorpHandleInput = e => {
    const target = e.target
    setFormData(prev => ({...prev, dateOfIncorp: target.value}));
    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, dateOfIncorp: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, dateOfIncorp: 'error message'}))
  }

  const countryHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, country: target.value}));
    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, country: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, country: 'error message'}))
  }

  const areInputsValid = () => {
    if(Object.values(formErrors).every((value) => {return value === null})) {
      return 1;
    }
    else{
      return 0;
    }
  }
  useEffect(() => {
    onError(formIsValid)
  }, [formIsValid])
  
  useEffect(() => {
    if(formData.industry == "Other"){
      if(formData.other){
        setFormIsValid(true)
      }else{
        setFormIsValid(false)
      }
    } 

    if(!hideOther){
      setFormData(prev => ({...prev, other: otherInput.current.value}));
    }

    if(display ===""){
      onError(formIsValid)
    }
    
  }, [display])

  
  useEffect(()=>{
    setFormIsValid(areInputsValid())
  },[formErrors])

  useEffect(() => {
    if(formData.industry == "Other"){
      sethideOther(false)
    } else{
      sethideOther(true)
    }
    setFormIsValid(areInputsValid())
  }, [formData])
  
  useEffect(() => {
    if(hideOther){
      setFormErrors(prev => ({...prev, other: null}))
      setFormData(prev => ({...prev, other: ""}));
    } else{
      setFormData(prev => ({...prev, other: otherInput.current.value}));
      
    }
  }, [hideOther])
  
  

  useEffect(()=>{
    toUpdate(formData)
  },[shouldUpdate])

  return (
    <div className={display}>
      <h6 className="text-light mt-3 mb-3">Company Information</h6>


      <label className="form-label" htmlFor="companyName">Company name</label>
      <input className="form-control mb-3" onChange={companyNameHandleInput} 
        pattern="[A-Za-z]+" id="companyName" name="companyName" type="text" placeholder="Company name" required/>

      <label className="form-label" for="industry">Industry</label>
        <select id="industry" name="industry" className="form-control mb-3" onChange={industryHandleInput} required>  
          <option disabled selected></option>
          <option value="Agriculture">Agriculture</option>
          <option value="Engineering">Engineering</option>
          <option value="IT">IT</option>
          <option value="Medical">Medical</option>
          <option value="Other">Other</option>
        </select>

      <label className={"form-label " + (hideOther?"d-none":"")} htmlFor="other">Other</label>
      <input className={"form-control mb-3 " + (hideOther?"d-none":"")} ref = {otherInput} onChange={otherHandleInput} 
        pattern="[A-Za-z]+" id="other" name="other" type="text" placeholder="Other" required/>
       
      <label className="form-label" htmlFor="industry">Date of Incorporation</label>
      <input className="bg-transparent mb-3 border-0 border-bottom border-black text-black-50" onChange={dateOfIncorpHandleInput} 
       id="date" name="date" type="date" placeholder="" required/>

      <label className="form-label" htmlFor="country">Country</label>
      <input className="form-control form-select mb-3" onChange={countryHandleInput} 
        pattern="[A-Za-z]+" id="country" name="country" type="text" placeholder="Country" required/>

      {/* <button className="btn"type="button" onClick={() => { console.log(formErrors) }}>Console log formErrors</button> */}
    </div>
  )
}


