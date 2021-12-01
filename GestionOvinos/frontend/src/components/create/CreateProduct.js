import React, { Component } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import axios from 'axios'

export default class createProduct extends Component {

    state = {
        name: '',
        category: '',
        price: 0,
        imgURL: ''
    }

    async componentDidMount() {
        const res = await axios.get('http://104.193.108.64:4000/api/products');

        if (this.props.match.params.id) {
            console.log(this.props.match.params.id)
            const res = await axios.get('http://104.193.108.64:4000/api/products/' + this.props.match.params.id);
            console.log(res.data)
            this.setState({
                name: res.data.name,
                category: res.data.category,
                price: res.data.price,
                imgURL: res.data.imgURL
            });
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        if (this.state.editing) {
            const updatedProduct = {
                name: this.state.name,
                category: this.state.category,
                price: this.state.price,
                imgURL: this.state.imgURL
            };
            await axios.put('http://104.193.108.64:4000/api/products/' + this.state._id, updatedProduct);
        } else {
            const newProduct = {
                name: this.state.name,
                category: this.state.category,
                price: this.state.price,
                imgURL: this.state.imgURL
            };
            axios.post('http://104.193.108.64:4000/api/products', newProduct);
        }
        window.location.href = '/';

    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        return (
            <div className="col-md-6 offset-md-3">
                <div className="card card-body">
                    <h4>Ingresar producto</h4>
                    <form onSubmit={this.onSubmit}>
                        {/* Nombre de producto */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de Producto"
                                onChange={this.onInputChange}
                                name="name"
                                value={this.state.name}
                                required />
                        </div>
                        {/* Categoría */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Categoría"
                                onChange={this.onInputChange}
                                name="category"
                                value={this.state.category}
                            />
                        </div>
                        {/* Precio */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Precio"
                                onChange={this.onInputChange}
                                name="price"
                                value={this.state.price}
                            />
                        </div>
                        {/* URL de Imagen */}
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="URL de Imagen"
                                onChange={this.onInputChange}
                                name="imgURL"
                                value={this.state.imgURL}
                            />
                        </div>
                        <button className="btn btn-primary">
                            Guardar
                            <i className="material-icons">
                                assignment
                            </i>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}
