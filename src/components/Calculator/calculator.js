import styled from "@emotion/styled";
import { format } from "date-fns";
import { useState } from "react";
import { FaEquals } from "react-icons/fa";
import { TiBackspace } from "react-icons/ti";
import { IoMdCheckmark } from "react-icons/io";
import { RiCalendarEventFill } from "react-icons/ri";
import { GrClose } from "react-icons/gr";

import CircleIcon from "../CircleIcon";
import { colors, typography } from "../../styles";

const Container = styled.div`
  width: fit-content;
  color: ${colors.gray[600]};
  display: grid;
  gap: 1px;
  grid-template-columns: repeat(5, 50px);
  grid-template-rows: repeat(6, 50px) auto;
  background-color: ${colors.gray[200]};
  border: 1px solid ${colors.gray[200]};
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.gray[600]};
  border: none;
  cursor: pointer;
  background-color: ${({ type }) =>
    type === "operant" ? colors.gray[100] : colors.white};
  ${typography.text.xl};
  &:hover {
    background-color: ${({ type }) =>
      type === "operant" ? colors.gray[200] : colors.gray[50]};
  }
`;

const Display = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${typography.text.xl};
  grid-column: span 5;
  background-color: ${colors.white};
`;

const Header = styled.header`
  padding: 0.25rem 0.75rem;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: span 5;
`;

const HeaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: span 2;
  color: ${colors.white};
  font-size: 20px;
  background-color: ${({ color }) => color};
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const HeaderInfo = styled.div`
  color: ${colors.white};
  .title {
    ${typography.text.xs};
    margin: 0;
  }
  .category {
    ${typography.text.md};
    font-weight: 500;
    margin: 0;
  }
`;

const DateContainer = styled.div`
  grid-column: span 5;
  background-color: ${colors.gray[100]};
  text-align: center;
  ${typography.text.xs}
  padding: 0.25rem;
`;

function Button({ type = "digit", value, onClick }) {
  return (
    <StyledButton type={type} onClick={() => onClick(value)}>
      {value}
    </StyledButton>
  );
}

function Calculator({ category, onCloseClick, date, onCalcSubmit }) {
  const [prevNumber, setPrevNumber] = useState("");
  const [operant, setOperant] = useState("");
  const [currentNumber, setCurrentNumber] = useState("0");

  const display = prevNumber + operant + currentNumber;

  function handleDigitClick(value) {
    if (currentNumber === "0" && value === "0") return;
    if (value === "." && currentNumber.includes(".")) return;
    if (value === "." && currentNumber === "") {
      setCurrentNumber("0.");
      return;
    }
    if (currentNumber === "0" && value !== "0" && value !== ".") {
      setCurrentNumber(value);
      return;
    }
    setCurrentNumber(currentNumber + value);
  }

  function handleOperantClick(value) {
    if (operant !== "" && currentNumber !== "") {
      setPrevNumber(calculate());
      setOperant(value);
      setCurrentNumber("");
      return;
    }
    if (operant !== "") {
      setOperant(value);
      return;
    }
    setPrevNumber(currentNumber);
    setOperant(value);
    setCurrentNumber("");
  }

  function handleSubmit() {
    if (operant) {
      setPrevNumber("");
      setOperant("");
      setCurrentNumber(calculate());
    } else {
      onCalcSubmit(category.id, currentNumber, format(getDay(), "yyyy-MM-dd"));
      onCloseClick();
    }
  }

  function handleClear() {
    setCurrentNumber("0");
    setOperant("");
    setPrevNumber("");
  }

  function handleBack() {
    if (currentNumber.length === 1 && !operant && !prevNumber) {
      setCurrentNumber("0");
      return;
    }
    if (currentNumber.length === 1) {
      setCurrentNumber("");
      return;
    }
    if (operant && !currentNumber) {
      setCurrentNumber(prevNumber);
      setPrevNumber("");
      setOperant("");
      return;
    }
    setCurrentNumber(currentNumber.slice(0, -1));
  }

  function calculate() {
    switch (operant) {
      case "+":
        return `${(Number(prevNumber) + Number(currentNumber)).toFixed(2)}`;
      case "-":
        return `${(Number(prevNumber) - Number(currentNumber)).toFixed(2)}`;
      case "×":
        return `${(Number(prevNumber) * Number(currentNumber)).toFixed(2)}`;
      case "÷":
        return `${(Number(prevNumber) / Number(currentNumber)).toFixed(2)}`;

      default:
        return;
    }
  }

  function getDay() {
    const selectedDate = new Date(date.year, date.month);
    const currentDate = new Date();

    if (
      date.year === currentDate.getFullYear() &&
      date.month === currentDate.getMonth()
    ) {
      return currentDate;
    }

    if (selectedDate < currentDate) {
      return new Date(date.year, +date.month + 1, 0);
    } else {
      return new Date(date.year, +date.month, 1);
    }
  }

  return (
    <Container>
      <Header color={category.color}>
        <HeaderContainer>
          <CircleIcon color={category.color} Icon={category.Icon} inverted />
          <HeaderInfo>
            <p className="title">Add expense to</p>
            <p className="category">{category.name}</p>
          </HeaderInfo>
        </HeaderContainer>
        <GrClose
          style={{ cursor: "pointer", height: "24px", width: "24px" }}
          onClick={onCloseClick}
        />
      </Header>
      <Display>$ {display}</Display>
      <Button value="÷" type="operant" onClick={handleOperantClick} />
      <Button value="1" onClick={handleDigitClick} />
      <Button value="2" onClick={handleDigitClick} />
      <Button value="3" onClick={handleDigitClick} />
      <Button value={<TiBackspace />} onClick={handleBack} />
      <Button value="×" type="operant" onClick={handleOperantClick} />
      <Button value="4" onClick={handleDigitClick} />
      <Button value="5" onClick={handleDigitClick} />
      <Button value="6" onClick={handleDigitClick} />
      <Button value="c" onClick={handleClear} />
      <Button value="-" type="operant" onClick={handleOperantClick} />
      <Button value="7" onClick={handleDigitClick} />
      <Button value="8" onClick={handleDigitClick} />
      <Button value="9" onClick={handleDigitClick} />
      <SubmitButton color={category.color} onClick={handleSubmit}>
        {operant ? <FaEquals /> : <IoMdCheckmark />}
      </SubmitButton>
      <Button value="+" type="operant" onClick={handleOperantClick} />
      <Button value={<RiCalendarEventFill />} onClick={() => {}} />
      <Button value="0" onClick={handleDigitClick} />
      <Button value="." onClick={handleDigitClick} />

      <DateContainer>{format(getDay(), "dd MMMM yyyy")}</DateContainer>
    </Container>
  );
}

export default Calculator;
