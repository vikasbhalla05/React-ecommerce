const FilterReducer = (state, action) => {

  switch (action.type) {

    case "LOAD_FILTER_PRODUCTS":

      let priceArr = action.payload.map((singleP) => singleP.price);
      let maxPrice = Math.max(...priceArr);
      console.log(maxPrice);

      return {
        ...state,
        filterProducts: [...action.payload],
        products: [...action.payload],
        maxPrice,
        filters : {
          ...state.filters,
          maxPrice,
          price: maxPrice
        }
      };

    case "SET_GRID_VIEW":
      return {
        ...state,
        gridView: true,
      };

    case "SET_LIST_VIEW":
      return {
        ...state,
        gridView: false,
      };

    case "LOAD_SORT_VALUE":
      // let userSortValue = document.getElementById("sort");
      // let sort_value = userSortValue.options[userSortValue.selectedIndex].value;

      // console.log(action.payload);
      return {
        ...state,
        sorting_value: action.payload,
      };

    case "SORTING_PRODUCTS":
      let FilterProducts;
      let {sorting_value} = state;
      let tempFilterProducts = [...action.payload];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.price - b.price;
        }

        if (sorting_value === "highest") {
          return b.price - a.price;
        }

        if (sorting_value === "a-z") {
          return a.name.localeCompare(b.name);
        }

        if (sorting_value === "z-a") {
          return b.name.localeCompare(a.name);
        }
      };
      FilterProducts = tempFilterProducts.sort(sortingProducts);
      // console.log(sorting_value);
      // console.table(FilterProducts);
      return {
        ...state,
        filterProducts: FilterProducts
      };

    case "CHANGE_SEARCH_BOX_VALUE":
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

      case "CLEAR_FILTERS":
        return {
          ...state,
          filters : {
            text : "",
            category : "All",
            company: "All",
            color: "All",
            price: 0,
            maxPrice: 0,
            minPrice: 0
          }
      }

      case "FILTER_PRODUCTS":
        // let allProducts = products;
        let {products} = state;
        let tempFilteredProducts = [...products];

        const {text, category, company, color, price} = state.filters;

        if(text) {
          tempFilteredProducts = tempFilteredProducts.filter((currEle) => 
            currEle.name.toLowerCase().includes(text)
          );
        }

        if(category) {
          tempFilteredProducts = tempFilteredProducts.filter((currEle) => {
            if(category==="All") 
              return currEle;
            
            return currEle.category.toLowerCase()===category;
          }
          );
        }

        if(company) {
          tempFilteredProducts = tempFilteredProducts.filter((currEle) => {
            if(company==="All") 
              return currEle;
            
            return currEle.company.toLowerCase() ===company.toLowerCase();
          })
        }

        if(color) {
          tempFilteredProducts = tempFilteredProducts.filter((currEle) => 
            color !== "All" ? currEle.colors.includes(color) : tempFilteredProducts
          );
        }

        if(price){
          tempFilteredProducts = tempFilteredProducts.filter((currEle) => 
            currEle.price <= price
          );
        }

        console.table(tempFilteredProducts)

        return {
          ...state,
          filterProducts: [...tempFilteredProducts]
        };



    default:
      return { ...state };
  }
};

export default FilterReducer;
