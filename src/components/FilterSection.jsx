import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../Contexts/FilterContext";
import { FaCheck } from "react-icons/fa";
import IndianPrice from "../Helpers/IndianPrice";
import {Button} from "../styles/Button"

const FilterSection = () => {
  const {
    products,
    filters: { text, category, company, color, price, maxPrice, minPrice },
    updateFiltersValue, clearFilter
  } = useFilterContext();

  const getUniqueValues = (data, property) => {
    let filterData = data.map((currEle) => {
      return currEle[property];
    });

    let newVal = ["All", ...new Set(filterData)];
    // console.log(newVal);

    // colors extra code
    if (property === "colors") {
      // old method but good
      let totalColors = ["All", ...new Set([].concat(...filterData))];
      console.log(totalColors);
      return totalColors;

      // new Method
      // return newVal.flat();
    }

    return Array.from(newVal);
  };

  const categoryOnlyFilter = getUniqueValues(products, "category");
  const companyOnlyFilter = getUniqueValues(products, "company");
  const colorOnlyFilter = getUniqueValues(products, "colors");

  return (
    <Wrapper>
      <div className="filter-search">
        <form action="#" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Search"
            onChange={updateFiltersValue}
          />
        </form>
      </div>

      <div className="filter-category">
        <h3>Category</h3>
        <div>
          {categoryOnlyFilter.map((curEl, idx) => {
            return (
              <button
                key={idx}
                type="button"
                name="category"
                value={curEl}
                onClick={updateFiltersValue}
              >
                {curEl}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter-company">
        <h3>Company</h3>

        <form action="#">
          <select
            name="company"
            id="company"
            className="filter-company--select"
            onClick={updateFiltersValue}
          >
            {companyOnlyFilter.map((curEl, idx) => {
              return (
                <option value={curEl} key={idx} name="company">
                  {curEl}
                </option>
              );
            })}
          </select>
        </form>
      </div>

      <div className="filter-color colors">
        <h3>Colors</h3>
        <div className="filter-color-style">
          {colorOnlyFilter.map((curColor, index) => {
            return curColor !== "All" ? (
              <button
                key={index}
                style={{ backgroundColor: curColor }}
                name="color"
                value={curColor}
                // className="btnStyle"
                className={color === curColor ? "btnStyle active" : "btnStyle"}
                onClick={updateFiltersValue}
              >
                {color === curColor ? <FaCheck className="checkStyle" /> : null}
                {/* {<FaCheck className="checkStyle" />} */}
              </button>
            ) : (
              <button
                name="color"
                value={curColor}
                className="color-all--style"
                onClick={updateFiltersValue}
              >
                {curColor}
              </button>
            );
          })}
        </div>
      </div>

      <div className="filter_price">
        <h3>Price</h3>
        <p>
          <IndianPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFiltersValue}
        ></input>
      </div>

      <div className="filter_clear">
        <Button className="btn" onClick={clearFilter}>Clear Filter</Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 5rem 0;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  h3 {
    padding: 2rem 0;
    font-size: bold;
  }
  .filter-search {
    input {
      padding: 0.6rem 1rem;
      width: 80%;
    }
  }
  .filter-category {
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 1.4rem;
      button {
        border: none;
        background-color: ${({ theme }) => theme.colors.white};
        text-transform: capitalize;
        cursor: pointer;
        &:hover {
          color: ${({ theme }) => theme.colors.btn};
        }
      }
      .active {
        border-bottom: 1px solid #000;
        color: ${({ theme }) => theme.colors.btn};
      }
    }
  }
  .filter-company--select {
    padding: 0.3rem 1.2rem;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    text-transform: capitalize;
  }
  .filter-color-style {
    display: flex;
    justify-content: center;
  }
  .color-all--style {
    background-color: transparent;
    text-transform: capitalize;
    border: none;
    cursor: pointer;
  }
  .btnStyle {
    width: 2rem;
    height: 2rem;
    background-color: #000;
    border-radius: 50%;
    margin-left: 1rem;
    border: none;
    outline: none;
    opacity: 0.5;
    cursor: pointer;
    &:hover {
      opacity: 1;
    }
  }
  .active {
    opacity: 1;
  }
  .checkStyle {
    font-size: 1rem;
    color: #fff;
  }
  .filter_price {
    input {
      margin: 0.5rem 0 1rem 0;
      padding: 0;
      box-shadow: none;
      cursor: pointer;
    }
  }
  .filter-shipping {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .filter-clear .btn {
    background-color: #ec7063;
    color: #000;
  }
`;

export default FilterSection;
