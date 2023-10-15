import React from "react";
import "../assets/styles/ProductCard.css";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Axios from "axios"
import { API_URL } from "../constants/API";
import { getCartData } from '../redux/actions/cart'

function ProductCard(props) {

    // const addToCartHandler = () => {
    //     // Check apakah user sudah memiliki barang tsb di cart
    //     Axios.get(`${API_URL}/carts/get`, {
    //         params: {
    //             userId: props.userGlobal.id,
    //             productId: props.productData.id,
    //         }
    //     })
    //     .then((result) => {
    //         // if (result.data.length) {
    //         //     Axios.patch(`${API_URL}/carts/edit-carts/${result.data[0].id}`, {
    //         //         quantity: result.data[0].quantity + 1
    //         //     })
    //         //     .then(() => {
    //         //         alert("Berhasil menambahkan barang");
    //         //         props.getCartData(props.userGlobal.id)
    //         //     })
    //         //     .catch(() => {
    //         //         alert("Terjadi kesalahan di server");
    //         //     })
    //         // } else {
    //             Axios.post(`${API_URL}/carts/add-carts`, {
    //                 userId: props.userGlobal.id,
    //                 productId: props.productData.id,
    //                 price: props.productData.price,
    //                 productName: props.productData.productName,
    //                 productImage: props.productData.productImage,
    //                 quantity: 1,
    //             })
    //             .then(() => {
    //                 alert("Berhasil menambahkan barang");
    //                 props.getCartData(props.userGlobal.id)
    //             })
    //             .catch(() => {
    //                 alert("Terjadi kesalahan di server");
    //             });
    //         // };
    //     })
    // }

    return (
        <div className="border-black border p-4 rounded-lg hover:shadow-lg transition-shadow duration-200 flex-shrink-0 overflow-hidden w-64">
        <div className="w-full h-64 overflow-hidden">
          <img src={props.productData.Product_Image} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="mt-1">
          <div>
            <Link to={`/product-detail/${props.productData.ProductID}`} className="text-lg font-bold text-blue-500 hover:text-blue-700">
              {props.productData.Product_Name}
            </Link>
            <div className="text-gray-500">Rp. {props.productData.Price}</div>
          </div>
          <div className="flex justify-end mt-2">
            <button className="bg-indigo-500 text-white px-4 py-2 rounded">Add to Cart</button>
          </div>
        </div>
      </div>
      


      


    );
}


export default (ProductCard)