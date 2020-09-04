import React, { useState, useEffect } from 'react';

const ProductForm = (props) => {
    const initialFieldValues = {
        productName: '',
        productPrice: '',
        productCategory: ''
    }


    var [values, setValues] = useState(initialFieldValues)

    useEffect(()=>{
        if(props.currentId == '')
            setValues({
                ...initialFieldValues
            })
        else
            setValues({
                ...props.productObjects[props.currentId]
            })
        
    },[props.currentId,props.productObjects])

    

    const handleInputChange = e => {
        var { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        props.addOrEdit(values)
    }

    return (
        <form autoComplete="off" onSubmit={handleFormSubmit}>
            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" name="productName" placeholder="Product Name"
                    value={values.productName}
                    onChange={handleInputChange}
                />
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" name="productPrice" placeholder="price"
                        value={values.productPrice}
                        onChange={handleInputChange}
                    />
            </div>

            <div className="form-group input-group">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <i className="fas fa-user"></i>
                    </div>
                </div>
                <input className="form-control" name="productCategory" placeholder="Category Name"
                        value={values.productCategory}
                        onChange={handleInputChange}
                    />
            </div>

          
            <div className="form-group">
                <input type="submit" value={props.currentId==''?"Save":"Update"} className="btn btn-primary btn-block" />
            </div>
        </form>
    );
}

export default ProductForm;