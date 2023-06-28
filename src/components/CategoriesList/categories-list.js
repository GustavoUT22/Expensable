import PropTypes from "prop-types";

import { Wrapper } from "./styles";
import CategoryCard from "../CategoryCard";
import styled from "@emotion/styled";
import { colors } from "../../styles";


const AddCategoryButton = styled.button`
  border: 2px dashed #A8A29E;
  border-radius: 8px;
  background: none;
  color: #A8A29E;
  font-size: 26px;
  cursor: pointer;
  min-height: 108px;

  &:hover {
    background: ${colors.pink[100]}
  }
`
function CategoriesList({ data, onCategoryClick, onCreateCategoryClick }) {
  return (
    <Wrapper>
      {data.map(({ ...data }) => (
        <CategoryCard
          key={data.id}
          onCategoryClick={onCategoryClick}
          {...data}
        />
      ))}
      <AddCategoryButton onClick={onCreateCategoryClick}>+</AddCategoryButton>
    </Wrapper>
  );
}

CategoriesList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default CategoriesList;
