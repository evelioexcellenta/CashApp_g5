import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import "../assets/styles/admin.css"
import { connect } from "react-redux"

class Admin extends Component {
  state = {
    productList: [],
    categoryList: [],
    addProductName: "",
    addPrice: 0,
    addProductImage: "",
    addDescription: "",
    addCategory: "",
    editId: 0,
    editProductName: "",
    editPrice: 0,
    editProductImage: "",
    editDescription: "",
    editCategory: "",
  }

  fetchProducts = () => {
    Axios.get(`${API_URL}/product/get`)
      .then((result) => {
        this.setState({ productList: result.data });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };

  fetchCategories = () => {
    Axios.get(`${API_URL}/category/get`)
      .then((result) => {
        this.setState({ categoryList: result.data });
      })
      .catch(() => {
        alert("Terjadi kesalahan di server");
      });
  };


  editToggle = (editData) => {
    this.setState({
      editId: editData.ProductID,
      editProductName: editData.Product_Name,
      editPrice: editData.Price,
      editProductImage: editData.Product_Image,
      editDescription: editData.Description,
      editCategory: editData.CategoryID,
    })
  }

  cancelEdit = () => {
    this.setState({ editId: 0 })
  }

  saveBtnHandler = () => {
    Axios.patch(`${API_URL}/product/edit-products/${this.state.editId}`, {
      Product_Name: this.state.editProductName,
      Price: parseInt(this.state.editPrice),
      Product_Image: this.state.editProductImage,
      Description: this.state.editDescription,
      CategoryID: this.state.editCategory,
    })
      .then(() => {
        this.fetchProducts()
        this.cancelEdit();
      })
      .catch(() => {
        alert("Terjadi kesalahan")
      })
  }

  deleteBtnHandler = (deleteId) => {
    const confirmDelete = window.confirm("Are you sure you want delete this event?");
    if (confirmDelete) {
      Axios.delete(`${API_URL}/product/delete-products/${deleteId}`)
        .then(() => {
          this.fetchProducts();
        })
        .catch(() => {
          alert("Terjadi kesalahan di server!")
        })
    } else {
      alert("Cancel delete barang");
    }
  }

  renderProducts = () => {
    return this.state.productList.map((val) => {
      if (val.ProductID === this.state.editId) {
        return (
          <tr key={val.ProductID} className="text-center">
            <td className="p-2 border">{val.ProductID}</td>
            <td className="p-2 border">
              <input value={this.state.editProductName} onChange={this.inputHandler} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="editProductName" />
            </td>
            <td className="p-2 border">
              <input value={this.state.editPrice} onChange={this.inputHandler} type="number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="editPrice" />
            </td>
            <td className="p-2 border">
              <input value={this.state.editProductImage} onChange={this.inputHandler} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="editProductImage" />
            </td>
            <td className="p-2 border">
              <input value={this.state.editDescription} onChange={this.inputHandler} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" name="editDescription" />
            </td>
            <td>
              <select value={this.state.editCategory} onChange={this.inputHandler} name="editCategory" className="form-control">
                <option value="">Category</option>
                {this.state.categoryList.map((category) => (
                  <option key={category.CategoryID} value={category.CategoryID}>
                    {category.Category_Name}
                  </option>
                ))}
              </select>
            </td>
            <td className="p-2 border">
              <button onClick={this.saveBtnHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded">Save</button>
            </td>
            <td className="p-2 border">
              <button onClick={this.cancelEdit} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Cancel</button>
            </td>
          </tr>

        )
      }
      return (
        <tr className="text-center">
          <td className="p-2 border">{val.ProductID}</td>
          <td className="p-2 border">{val.Product_Name}</td>
          <td className="p-2 border">{val.Price}</td>
          <td className="p-2 border">
            <img className="w-20 h-20 object-cover mx-auto block" src={val.Product_Image} alt="" />
          </td>
          <td className="p-2 border">{val.Description}</td>
          <td className="p-2 border">{val.Category_Name}</td>
          <td className="p-2 border">
            <button onClick={() => this.editToggle(val)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">Edit</button>
          </td>
          <td className="p-2 border">
            <button onClick={() => this.deleteBtnHandler(val.ProductID)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded">Delete</button>
          </td>
        </tr>

      );
    });
  };

  addNewProduct = () => {
    Axios.post(`${API_URL}/product/add-products`, {
      Product_Name: this.state.addProductName,
      Price: parseInt(this.state.addPrice),
      Product_Image: this.state.addProductImage,
      Description: this.state.addDescription,
      CategoryID: parseInt(this.state.addCategory), // make sure the selected CategoryID is sent
    })
      .then(() => {
        this.fetchProducts()
        this.setState({
          addProductName: "",
          addPrice: 0,
          addProductImage: "",
          addDescription: "",
          addCategory: "",
        })
      })
      .catch(() => {
        alert("Terjadi Kesalahan di Server")
      })
  }


  inputHandler = (event) => {
    const { name, value } = event.target

    this.setState({ [name]: value });
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  render() {
    // if (this.props.userGlobal.role !== "admin") {
    //     return (
    //         <div style={{ textAlign: "center" }}>
    //             <p>You are not authorized.</p>
    //             <Link to="/">
    //                 <button className="btn btn-danger">Go Back to Home</button>
    //             </Link>
    //         </div>

    //     );
    // }

    return (
      <div className="p-5">
        <div className="flex justify-center">
          <div className="text-center shadow-md"  >
            <h1 className="text-2xl mt-3">Manage Product</h1>
            <table className="table-auto mt-4 mx-auto ">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 ">ID</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Image</th>
                  <th className="px-4 py-2">Description</th>
                  <th className="px-4 py-2">Category</th>
                  <th colSpan="2" className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>{this.renderProducts()}</tbody>
              <tfoot className="bg-gray-200 border border-grey">
                <tr>
                  <td></td>
                  <td>
                    <input value={this.state.addProductName} onChange={this.inputHandler} name="addProductName" type="text" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm" />
                  </td>
                  <td>
                    <input value={this.state.addPrice} onChange={this.inputHandler} name="addPrice" type="number" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm" />
                  </td>
                  <td>
                    <input value={this.state.addProductImage} onChange={this.inputHandler} name="addProductImage" type="text" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm" />
                  </td>
                  <td>
                    <input value={this.state.addDescription} onChange={this.inputHandler} name="addDescription" type="text" className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm" />
                  </td>
                  <td>
                    <select value={this.state.addCategory} onChange={this.inputHandler} name="addCategory" className="form-control">
                      <option value="">Category</option>
                      {this.state.categoryList.map((category) => (
                        <option key={category.CategoryID} value={category.CategoryID}>
                          {category.Category_Name}
                        </option>
                      ))}
                    </select>

                  </td>
                  <td colSpan="2">
                    <button onClick={this.addNewProduct} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">Add Product</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      


    );
  }
}

const mapStateToProps = (state) => {
  return {
    userGlobal: state.user,
  };
};

export default connect(mapStateToProps)(Admin);