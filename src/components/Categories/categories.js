import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import apiFetch from "../../services/api-fetch";
import Calculator from "../Calculator";
import CategoriesList from "../CategoriesList";
import { getMonthlyData } from "./utils";
import { colors, typography } from "../../styles";
import NewCategory from "../NewCategory/newCategory";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const TotalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const TotalAmount = styled.p`
  ${typography.head.lg}
  color: ${colors.red[500]};
`;

const TotalLabel = styled.p`
  ${typography.text.sm}
  font-weight: 500;
  color: ${colors.gray[500]};
`;

const CalculatorModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(23 23 23 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateCategoryModal = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgb(23 23 23 / 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Categories({ date, type }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoryModalOpen, SetIsCategoryModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const monthlyData = getMonthlyData(categories, date, type);
  const total = monthlyData.reduce((acc, cur) => acc + cur.amount, 0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    apiFetch("categories")
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, []);

  function handleCategoryClick(category) {
    setSelectedCategory(category);
    setIsOpen(true);
  }

  function handleCalculatorClose() {
    setIsOpen(false);
  }

  function handleCreateCategoryClick() {
    SetIsCategoryModalOpen(true);
  }

  function handleCreateCategoryClose() {
    SetIsCategoryModalOpen(false);
  }

  function handleCalcSubmit(categoryId, amount, date) {
    apiFetch(`categories/${categoryId}/transactions`, {
      body: { amount, date },
    })
      .then((data) => {
        const newCategories = [...categories];

        const category = newCategories.find((cat) => cat.id === categoryId);
        category.transactions.push(data);

        setCategories(newCategories);
      })
      .catch((error) => console.log(error));
  }

  function handleCreateCategorySubmit(name, transaction_type, color, icon) {
    apiFetch(`categories`, {
      body: { name, transaction_type, color, icon },
    })
      .then((data) => {
        const newCategories = [...categories, data];
        setCategories(newCategories)
      })
      .catch((error) => console.log(error));
  }

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Wrapper>
      <TotalWrapper>
        <TotalAmount>$ {Intl.NumberFormat("en-US").format(total)}</TotalAmount>
        <TotalLabel>
          Total {type === "expense" ? "Expenses" : "Income"}
        </TotalLabel>
      </TotalWrapper>
      <CategoriesList
        data={monthlyData}
        onCategoryClick={handleCategoryClick}
        onCreateCategoryClick={handleCreateCategoryClick}
      />
      {isOpen ? (
        <CalculatorModal>
          <Calculator
            category={selectedCategory}
            onCloseClick={handleCalculatorClose}
            date={date}
            onCalcSubmit={handleCalcSubmit}
          />
        </CalculatorModal>
      ) : null}
      {isCategoryModalOpen ? (
        <CreateCategoryModal>
          <NewCategory
            onCloseModal={handleCreateCategoryClose}
            type={type}
            onCreateCategory={handleCreateCategorySubmit}
          />
        </CreateCategoryModal>
      ) : null}
    </Wrapper>
  );
}

Categories.propTypes = {
  date: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
  }),
  type: PropTypes.oneOf(["income", "expense"]),
};

export default Categories;
