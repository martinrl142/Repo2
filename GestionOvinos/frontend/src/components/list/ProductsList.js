import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import Dropdown from 'react-bootstrap/Dropdown'
import { AiFillPlusCircle } from "react-icons/ai";



export default class ProductsList extends Component {

    state = {
        products: []
    }

    async componentDidMount() {
        this.getProducts();
    }

    getProducts = async () => {
        const res = await axios.get('http://localhost:4000/api/products')
        this.setState({
            products: res.data
        });
    }

    deleteProduct = async (productId) => {
        await axios.delete('http://localhost:4000/api/products/' + productId);
        this.getEstables();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12 p-12">
                    <h1>Productos</h1>
                </div>
                <div className="col-md-11 p-11">
                </div> 
                <div className="col-md-1 p-1">
                    <Link to="/createProduct" className="nav-link"><h1 to="/createProduct"><AiFillPlusCircle/></h1></Link>
                </div> 
                {
                    this.state.products.map(product => (
                        <div className="col-md-4 p-2" key={product._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>Nombre: {product.name}</h5>
                                </div>
                                <div className="card-body">
                                    <p>
                                        Categoria: {product.category}
                                    </p>
                                    <p>
                                        Precio: {product.price}
                                    </p>
                                    <p>
                                        Imagen: {product.imgURL}
                                    </p>
                                </div>
                                <div className="card-footer d-flex justify-content-between">
                                    <Link to={"/editProduct/" + product._id} className="btn btn-primary">
                                        <i className="material-icons">
                                            border_color</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }               
            </div>
        )
    }
}
