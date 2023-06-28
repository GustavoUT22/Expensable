import styled from "@emotion/styled";
import { format, getMonth, getYear } from "date-fns";
import { Link, useParams } from "react-router-dom";

import Categories from "../components/Categories/categories";
import MonthPicker from "../components/MonthPicker";
import { useSearchParamsWithLocal } from "../hooks";
import { typography } from "../styles";

import { RiAddCircleLine, RiIndeterminateCircleLine } from "react-icons/ri";
import { useState } from "react";
import Tab from "../components/TabBar/Tab";
import { TabsWrapper } from "../components/TabBar/tabBar";
import Layout from "../components/Layout/layout";

const Title = styled.h1`
  ${typography.head.sm}
  font-weight: 600;
`;

const initialDate = {
  year: getYear(new Date()),
  month: getMonth(new Date()),
};

function CategoriesPage() {
  let params = useParams();

  // {year: 2023, month: 5}
  const [searchParams, setSearchParams] = useSearchParamsWithLocal(
    initialDate,
    "expensable_date"
  );

  // income page || expense page
  const type = params.type || "expense";

  const date = {
    year: +searchParams.get("year"),
    month: +searchParams.get("month"),
  };
  // date = {year: 2023, month: 5}

  const handleRightClick = () => {
    const newMonth = date.month + 1;
    if (newMonth > 11) {
      setSearchParams({ year: date.year + 1, month: 0 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  const handleLeftClick = () => {
    const newMonth = date.month - 1;
    if (newMonth < 0) {
      setSearchParams({ year: date.year - 1, month: 11 });
    } else {
      setSearchParams({ year: date.year, month: newMonth });
    }
  };

  return (
    <Layout>
      <div>
        <Title>Categories</Title>
        <TabsWrapper>
          <Tab
            title="Expenses"
            isActive={type === "expense"}
            type={"expense"}
            Icon={RiIndeterminateCircleLine}
          />
          <Tab
            title="Income"
            isActive={type === "income"}
            type={"income"}
            Icon={RiAddCircleLine}
          />
        </TabsWrapper>
        <MonthPicker
          label={format(new Date(date.year, date.month), "MMMM yyyy")}
          onRightClick={handleRightClick}
          onLeftClick={handleLeftClick}
        />
        <Categories {...{ date, type }} />
      </div>
    </Layout>
  );
}

export default CategoriesPage;
