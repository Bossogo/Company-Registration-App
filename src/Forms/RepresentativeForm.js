import { useState, useEffect } from "react";

export default function Representative({display, onError, toUpdate, shouldUpdate}) {
  const [formIsValid, setFormIsValid] = useState(0)
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState(
    {
      firstName:"",
      lastName:"",
      email:"",
      phoneNo:""
  })
 
  const fNameHandleInput = e => {
    const target = e.target
    let input = target.value
    let pattern = /^[a-zA-Z]+$/
    setFormData(prev => ({...prev, firstName: target.value}));
    
    if (pattern.test(input)) {
      setFormErrors(prev => ({...prev, firstName: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, firstName: 'error message'}))
  }
  const lNameHandleInput = e => {
    const target = e.target
    let input = target.value
    let pattern = /^[a-zA-Z]+$/
    setFormData(prev => ({...prev, lastName: target.value}));
    
    if (pattern.test(input)) {
      setFormErrors(prev => ({...prev, lastName: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, lastName: 'error message'}))
  }
  const emailHandleInput = e => {
    const target = e.target
    setFormData(prev => ({...prev, email: target.value}));
  
    if (target.validity.valid) {
      
      setFormErrors(prev => ({...prev, email: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, email: 'error message'}))
  }
  const phoneNoHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, phoneNo: target.value}));
    if (target.validity.valid) {
      
      setFormErrors(prev => ({...prev, phoneNo: null}));
      return;
    }
    
    setFormErrors(prev => ({...prev, phoneNo: 'error message'}))
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
    if(display === ""){
      onError(formIsValid)
    }
  }, [display])

  
  useEffect(()=>{
    setFormIsValid(areInputsValid())
  },[formErrors])

  useEffect(()=>{
    toUpdate(formData)
  },[shouldUpdate])

  return (
    <div className={display}>
      <h6 className="text-light mt-3 mb-3">Company Representative</h6>

      <label className="form-label" htmlFor="firstName">First name</label>
      <input className="form-control mb-3" onChange={fNameHandleInput} 
        pattern="[a-zA-Z]+" id="firstName" name="firstName" type="text" placeholder="First name" title="Letters only" required/>

      <label className="form-label" htmlFor="lastName">Last name</label>
      <input className="form-control mb-3" onChange={lNameHandleInput} 
        pattern="[A-Za-z]+" id="lastName" name="lastName" type="text" placeholder="Last name" required/>

      <label className="form-label" htmlFor="email">Email</label>
      <input className="form-control mb-3" onChange={emailHandleInput} 
         id="email" name="email" type="email" placeholder="Email" required/>

      <label className="form-label" htmlFor="phoneNo">Phone No</label>
      <div className="input-group">
        <div type="text" className="input-group-text bg-white">NG (+234)</div>
        <div type="text" className="input-group-text bg-white border-0 "></div>
        <input className="form-control" onChange={phoneNoHandleInput} maxLength={10}
          pattern="[0-9]{10}" id="phoneNo" name="phoneNo" type="text" placeholder="01 804 0123" required/>
      </div> 

    </div>
  )
}