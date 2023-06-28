import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { BsBank2, BsFillCartFill } from "react-icons/bs";
import { GiHealthNormal } from "react-icons/gi";
import { FaGamepad, FaGraduationCap } from "react-icons/fa";
import { RiBillFill, RiGiftFill } from "react-icons/ri";
import { AiFillCar } from "react-icons/ai";
import { colors } from "../../styles";

const NewCategoryModal = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  max-width: 272px;
`;

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ColorCircleWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const ColorCircle = styled.div`
  background: ${(props) => props.color};
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  ${(props) =>
    props.isSelected
      ? "outline-offset: 2px; outline: 2px solid " + props.color
      : ""};
`;

const IconsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  column-gap: 2.25rem;
  justify-content: center;
`;

const StyledIcon = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.isSelected
      ? `background: black; color: white; border-radius: 50%;`
      : ""}
  cursor: pointer;
`;

const NewCategoryIcon = ({ Icon, isSelected, onClick, onCreateCategory }) => {
  return (
    <StyledIcon isSelected={isSelected}>
      <Icon onClick={onClick} />
    </StyledIcon>
  );
};

const NewCategory = ({ onCloseModal, onCreateCategory, type }) => {
  const categoryNameRef = useRef();
  const [color, setColor] = useState("red");
  const [icon, setIcon] = useState("bank");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateCategory(categoryNameRef.current.value, type, color, icon)
    onCloseModal()
  };

  return (
    <NewCategoryModal>
      <form onSubmit={handleSubmit}>
        <HeaderModal>
          <h2>New Category</h2>{" "}
          <GrClose
            style={{ cursor: "pointer", height: "24px", width: "24px" }}
            onClick={onCloseModal}
          />
        </HeaderModal>
        <div>
          <label htmlFor="categoryname">Name</label>
          <input
            type="text"
            id="categoryname"
            name="categoryname"
            ref={categoryNameRef}
          />
        </div>
        <div>
          <h3>COLOR</h3>
          <ColorCircleWrapper>
            <ColorCircle
              isSelected={color == "red"}
              onClick={() => setColor("red")}
              color={colors.red[500]}
            />
            <ColorCircle
              isSelected={color == "orange"}
              onClick={() => setColor("orange")}
              color={colors.orange[500]}
            />
            <ColorCircle
              isSelected={color == "yellow"}
              onClick={() => setColor("yellow")}
              color={colors.yellow[500]}
            />
            <ColorCircle
              isSelected={color == "green"}
              onClick={() => setColor("green")}
              color={colors.green[500]}
            />
            <ColorCircle
              isSelected={color == "teal"}
              onClick={() => setColor("teal")}
              color={colors.teal[500]}
            />
            <ColorCircle
              isSelected={color == "cyan"}
              onClick={() => setColor("cyan")}
              color={colors.cyan[500]}
            />
            <ColorCircle
              isSelected={color == "light-blue"}
              onClick={() => setColor("light-blue")}
              color={colors.lightBlue[500]}
            />
            <ColorCircle
              isSelected={color == "blue"}
              onClick={() => setColor("blue")}
              color={colors.blue[500]}
            />
          </ColorCircleWrapper>
        </div>
        <div>
          <h3>ICON</h3>
          <IconsWrapper>
            <NewCategoryIcon
              Icon={BsBank2}
              onClick={() => setIcon("bank")}
              isSelected={icon == "bank"}
            />
            <NewCategoryIcon
              Icon={BsFillCartFill}
              onClick={() => setIcon("cart")}
              isSelected={icon == "cart"}
            />
            <NewCategoryIcon
              Icon={GiHealthNormal}
              onClick={() => setIcon("health")}
              isSelected={icon == "health"}
            />
            <NewCategoryIcon
              Icon={FaGamepad}
              onClick={() => setIcon("game")}
              isSelected={icon == "game"}
            />
            <NewCategoryIcon
              Icon={RiBillFill}
              onClick={() => setIcon("bill")}
              isSelected={icon == "bill"}
            />
            <NewCategoryIcon
              Icon={FaGraduationCap}
              onClick={() => setIcon("education")}
              isSelected={icon == "education"}
            />
            <NewCategoryIcon
              Icon={AiFillCar}
              onClick={() => setIcon("car")}
              isSelected={icon == "car"}
            />
            <NewCategoryIcon
              Icon={RiGiftFill}
              onClick={() => setIcon("gift")}
              isSelected={icon == "gift"}
            />
          </IconsWrapper>
        </div>
        <button type="submit">Create</button>
      </form>
    </NewCategoryModal>
  );
};

export default NewCategory;
