import { useState, useEffect } from "react";

export default function PasswordForm({display, onError}) {
  const [formIsValid, setFormIsValid] = useState(0)
  const [formData, setFormData] = useState("")
  const [formErrors, setFormErrors] = useState(
    {
    password:"empty",
    confirmPassword:"empty",
    matching:"false"
  })

  const pwordHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, password: target.value}));

    if (target.validity.valid) {
      setFormErrors(prev => ({...prev, password: null}));
      if(target.value === formData.confirmPassword){
        setFormErrors(prev => ({...prev, matching: null}))
      }
      return;
    }
    setFormErrors(prev => ({...prev, matching: "false"}))
    setFormErrors(prev => ({...prev, password: 'error message'}))
  }
  const pwordConfirmHandleInput = e => {
    const target = e.target
   
    setFormData(prev => ({...prev, confirmPassword: target.value}));

    if(formData.password === target.value){
      if (target.validity.valid) {
        setFormErrors(prev => ({...prev, confirmPassword: null}));
        if(target.value === formData.password){
          setFormErrors(prev => ({...prev, matching: null}))
        }
        return;
      }
    }
    setFormErrors(prev => ({...prev, matching: "false"}))
    setFormErrors(prev => ({...prev, confirmPassword: 'error message'}))
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
    if(formData.password && formData.confirmPassword){
      if(formData.password === formData.confirmPassword){
        setFormIsValid(true)
      }else{
        setFormIsValid(false)
      }
    } 
    if(display ===""){
      onError(formIsValid)
    }
  }, [display])

  useEffect(()=>{
    setFormIsValid(areInputsValid())
  },[formErrors])

  
  return (
    <div className={display}>
      <h6 className="text-light mt-3 mb-3">Choose Password</h6>

      <label className="form-label" htmlFor="password">Password</label>
      <input className="form-control mb-3" onChange={pwordHandleInput} 
        pattern="[A-Za-z0-9]{5,}" id="password" name="password" type="password" placeholder="Password" required/>

      <label className="form-label" htmlFor="confirmPassword">Confirm password</label>
      <input className="form-control mb-3" onChange={pwordConfirmHandleInput} 
        pattern="[A-Za-z0-9]{5,}" id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm password" required/>
      
    </div>
  )
}

