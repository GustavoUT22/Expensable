import PropTypes from "prop-types";

import * as Styled from "./styles";
import CircleIcon from "../CircleIcon";

function CategoryCard({ id, name, color, Icon, amount, onCategoryClick }) {
  return (
    <Styled.Wrapper
      color={color}
      onClick={() => onCategoryClick({ id, name, color, Icon, amount })}
    >
      <CircleIcon Icon={Icon} size="lg" color={color} />
      <div>
        <Styled.CategoryName>{name}</Styled.CategoryName>
        <Styled.CategoryAmount>
          <span>$</span>
          <span>{Intl.NumberFormat("en-US").format(amount)}</span>
        </Styled.CategoryAmount>
      </div>
    </Styled.Wrapper>
  );
}

CategoryCard.propTypes = {
  name: PropTypes.string,
  color: PropTypes.string,
  Icon: PropTypes.func,
  amount: PropTypes.number,
};

export default CategoryCard;
