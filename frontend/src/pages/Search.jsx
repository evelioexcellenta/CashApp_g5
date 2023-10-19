import React from "react";
import ProductCard from "../components/ProductCard";
import Axios from "axios";
import { API_URL } from "../constants/API";
import {
  SimpleGrid,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Flex, HStack, VStack
} from "@chakra-ui/react";
import { Fullscreen } from "lucide-react";

class Home extends React.Component {
  state = {
    productList: [],
    page: 1,
    maxPage: 0,
    itemPerPage: 10,
    searchProductName: "",
    searchCategory: "",
    filteredProductList: [],
    sortBy: "",
    categoryList:[],
  }

  fetchProducts = () => {
    Axios.get(`${API_URL}/product/get`)
      .then((result) => {
        this.setState({ productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage), filteredProductList: result.data })
      })
      .catch(() => {
        alert("terjadi kesalahan dalam server");
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

  renderProducts = () => {
    const beginningIndex = (this.state.page - 1) * this.state.itemPerPage
    let rawData = [...this.state.filteredProductList]

    const compareString = (a, b) => {
      if (a.Product_Name < b.Product_Name) {
        return -1;
      } if (a.Product_Name > b.Product_Name) {
        return 1;
      }

      return 0
    }

    switch (this.state.sortBy) {
      case "lowPrice":
        rawData.sort((a, b) => a.Price - b.Price)
        break
      case "highPrice":
        rawData.sort((a, b) => b.Price - a.Price)
        break
      case "az":
        rawData.sort(compareString)
        break
      case "za":
        rawData.sort((a, b) => compareString(b, a))
        break
      default:
        rawData = [...this.state.filteredProductList]
        break
    }
    const currentData = rawData.slice(beginningIndex, beginningIndex + this.state.itemPerPage)

    return currentData.map((val) => {
      return <ProductCard productData={val} />
    })
  }

  nextPageHandler = () => {
    if (this.state.page < this.state.maxPage) {
      this.setState({ page: this.state.page + 1 })
    }
  }
  prevPageHandler = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  };

  inputHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    this.setState({ [name]: value })
  }

  searchBtnHandler = () => {
    const filteredProductList = this.state.productList.filter((val) => {
      return val.Product_Name?.toLowerCase().includes(this.state.searchProductName?.toLowerCase()) && val.Category_Name?.toLowerCase().includes(this.state.searchCategory?.toLowerCase())
    })

    this.setState({ filteredProductList, maxPage: Math.ceil(filteredProductList.length / this.state.itemPerPage), page: 1 })
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCategories();
  }

  render() {
    return (
      <Box mt={3} marginLeft={5} marginRight={5} height={1000}>
        <Flex width={1500}>
          <VStack spacing={5} width={1500}>
            <Box >
              <HStack spacing={5}>
                <Box borderWidth="1px" borderRadius="lg" p={4} width={800}>
                  <Heading size="md" mb={1}>
                    Filter Products
                  </Heading>
                  <HStack spacing={5}>
                    <FormControl id="searchProductName">
                      <FormLabel>Product Name</FormLabel>
                      <Input type="text" name="searchProductName"
                        onChange={this.inputHandler}
                      />
                    </FormControl>
                    <FormControl id="searchCategory">
                      <FormLabel>Product Category</FormLabel>
                      <Select onChange={this.inputHandler} name="searchCategory">
                        <option value="">All Items</option>
                        {this.state.categoryList.map((category) => (
                          <option key={category.CategoryID} value={category.Category_Name}>
                            {category.Category_Name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <Button className="btn btn-primary mt-3" onClick={this.searchBtnHandler} >
                      Search
                    </Button>
                  </HStack>
                </Box>
                <Box borderWidth="1px" borderRadius="lg" p={4} mt={1}>
                  {/* <Heading size="md" mb={4}>
                    Sort Products
                  </Heading> */}
                  <FormControl id="sortBy">
                    <FormLabel>Sort By</FormLabel>
                    <Select name="sortBy" onChange={this.inputHandler}>
                      <option value="">Default</option>
                      <option value="lowPrice">Lower Price</option>
                      <option value="highPrice">Highest Price</option>
                      <option value="az">A-Z</option>
                      <option value="za">Z-A</option>
                    </Select>
                  </FormControl>
                </Box>
              </HStack>

              <Flex mt={1} justify="space-between" align="center">
                <Button onClick={this.prevPageHandler} isDisabled={this.state.page === 1}>
                  {"<"}
                </Button>
                <div>Page {this.state.page} of {this.state.maxPage}</div>
                <Button onClick={this.nextPageHandler} isDisabled={this.state.page === this.state.maxPage}>
                  {">"}
                </Button>
              </Flex>
            </Box>

            <Box flex={1} ml={0} width={1300}>
              <SimpleGrid columns={5} spacing={10} minChildWidth="250px">
                {this.renderProducts()}
              </SimpleGrid>
            </Box>
          </VStack>
        </Flex>

      </Box>
    )
  }
}

export default Home
