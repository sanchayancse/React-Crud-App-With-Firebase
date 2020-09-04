import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import fire from '../config/fire';
import '../Home.css'

import 'font-awesome/css/font-awesome.min.css';

const Product = () =>{

    const getMode = ()=>{
        return JSON.parse(localStorage.getItem("mode")) || false
    }

    const [dark, setMode]  = useState(getMode)
    useEffect(()=>{
        localStorage.setItem("mode", JSON.stringify(dark))
    },[dark])
   
    var [productObjects, setProductObjects] = useState({})
    var[currentId, setCurrentId] = useState('')

    useEffect(()=>{
        fire.database().ref().child('products').on('value', snapshot=>{
            if(snapshot.val()!=null)
                setProductObjects({
                    ...snapshot.val()
                })
            else
                setProductObjects({})

        })

    },[])
    const addOrEdit = obj =>{
        if(currentId == '')
        fire.database().ref().child('products').push(
            obj,
            err => {
                if (err)
                    console.log(err)
                else
                    setCurrentId('')
            }
        )
        else
            fire.database().ref().child(`products/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')

                    
                }
            )
        

    }

    const onDelete =  key=>{
        if(window.confirm('Are You sure to delete this record?')){
            fire.database().ref().child(`products/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')

                    
                }
            )
        
        }
    }

    return(

        <>
    <div className={dark ? "dark-mode":"white-mode"}>
        <div className="jumbotron jumbotron-fluid">
  <div className="container">
  <label class="switch">
  <input type="checkbox"  checked={dark} onChange={()=>setMode(!dark)}/>
  <span class="slider round"></span>
</label>
    <h1 className="display-4">Welcome To dashboard</h1>
   
  </div>
</div>

        <div className="row">
            <div className="col-md-4">
                <ProductForm {...({addOrEdit,currentId,productObjects})}/>

            </div>
            <div className="col-md-8">
               <table className="table table-borderless table-stripped">
                   <thead className="thead-light">
                       <tr>
                           <th>Product Name</th>
                           <th>Product Price</th>
                           <th>Product Category</th>
                           <th>Actions</th>
                           
                       </tr>
                   </thead>
                   <tbody style={{background:"#cfd1d4"}}>
                       {Object.keys(productObjects).map(id=>{
                           return <tr key={id}>
                               <td>{productObjects[id].productName}</td>
                               <td>{productObjects[id].productPrice}</td>
                               <td>{productObjects[id].productCategory}</td>
                               <td>
                                   <a className="btn text-primary" onClick={()=>{setCurrentId(id) }}>
                                   <i class="fas fa-pencil-alt"></i>
                                   </a> &nbsp;
                                   <a className="btn text-danger" onClick={()=>{ onDelete(id) }}>
                                   <i className="far fa-trash-alt" ></i>
                                   </a>
                               </td>
                           </tr>
                       })}
                   </tbody>
               </table>
            </div>
        </div>
        </div>
        </>
    );
}


export default Product;