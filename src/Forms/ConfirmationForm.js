import { useEffect, useState } from "react";

export default function ConfirmationForm({display, dataSummary}) {

  return (
    <div className={display}>
      <h6 className="text-light mt-3 mb-3">Company Information</h6>

      <div className="container">
        <div className="row mb-1 pt-1">
          <div className="col col-6">First name</div>
          <div className="col col-end col-6 ">{dataSummary.firstName}</div>
        </div>
        <div className="row mb-1 pt-1">
          <div className="col col-6">Last Name</div>
          <div className="col col-end col-6 ">{dataSummary.lastName}</div>
        </div>
        <div className="row mb-1 pt-1">
          <div className="col col-6">Email</div>
          <div className="col col-end col-6 ">{dataSummary.email}</div>
        </div>
        <div className="row mb-1 pt-1">
          <div className="col col-6">Mobile</div>
          <div className="col col-end col-6 ">{dataSummary.phoneNo}</div>
        </div>
      </div>
      
      <h6 className="text-light mt-3 mb-3">Company Information</h6>

      <div className="container">
        <div className="row mb-1 pt-1">
          <div className="col col-6">Company name</div>
          <div className="col col-end col-6 ">{dataSummary.companyName}</div>
        </div>
        <div className="row mb-1 pt-1">
          <div className="col col-6">Industry name</div>
          <div className="col col-end col-6 ">{dataSummary.industry}</div>
        </div>
        {dataSummary.other?<div className="row mb-1 pt-1">
          <div className="col col-6">Other</div>
          <div className="col col-end col-6 ">{dataSummary.other}</div>
        </div> :null}
        <div className="row mb-1 pt-1">
          <div className="col col-6">Date of incorporation</div>
          <div className="col col-end col-6 ">{dataSummary.dateOfIncorp}</div>
        </div>
        <div className="row pt-1">
          <div className="col col-6">Country</div>
          <div className="col col-end col-6 ">{dataSummary.country}</div>
        </div>
      </div>

    </div>
  )
}



