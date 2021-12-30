import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../../utilities/my.css'
/** import Redux Slice  */
import { getcontacts } from "../../redux/contacts";


export default function Contacts() {
    const dispatch = useDispatch();
    
    const contacts = useSelector(state => state.contacts)
  

    const getcontactsdata = () => {

        console.log("get contacts")

        return dispatch(getcontacts());

    };


    useEffect(() => {
        // getArticle();
        // getProjectDataByProject();
        // getActualCoostdataByProject();
        getcontactsdata();

    }, []);





    return (
        <div className="contactWrapper">
            <h1 className="title">  Contacts</h1>

 <div className="contactcontainer">
 {
        contacts.contacts.map((item) => (
            <div  className="rowdata" key={item.id} value={item.id} >
               <label > ContactName :</label>  <p> {item.contactName}</p>
         <label > alternative email :</label>  <p> {item.email}</p>
                <label >Phone No :</label>  <p> {item.phoneNo}</p>
                <label >HomeNo No :</label>  <p> {item.homeNo}</p>
                
            </div>
        ))
    }
 </div>
        </div >
    )
}
