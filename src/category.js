import React, { Component } from "react";
import fire from "./config/fire";

import Product from "./components/product";

class Category extends Component{
constructor(props)
{

    super(props)
    this.state={
      

    }
}

logout(){

    fire.auth().signOut();
}

render(){

    return(
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Category</a>
      </li>
     
     
    </ul>
    <button onClick={this.logout} className="btn btn-danger">Logout</button>
           
  </div>
</nav>

            <div className="row">
            <div className="col-md-8 offset-md-2">
            <Product/>
            </div>
               
            </div>

            <h1>You are logged in</h1>
            
        </div>
    )
}
}

export default Category;