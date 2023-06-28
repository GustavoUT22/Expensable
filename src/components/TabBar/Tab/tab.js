import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { colors } from "../../../styles";

const TapWrapper = styled.div`
  ${(props) =>
    props.isActive ? "border-bottom: 2px solid" + props.color : ""};
  padding-bottom: 0.5rem;
`;

const TabElement = styled(Link)`
  gap: 0.5rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: ${(props) => props.color};
`;

function Tab({ title, isActive, type, Icon }) {
  const color = isActive ? colors.pink[600] : colors.gray[500];
  return (
    <TapWrapper color={color} isActive={isActive}>
      <TabElement to={`/categories/${type}`} style={{ color }}>
        <Icon />
        {title}
      </TabElement>
    </TapWrapper>
  );
}

export default Tab;
