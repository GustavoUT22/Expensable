import styled from "@emotion/styled";
import { GiTargeted } from "react-icons/gi";
import { BiCategoryAlt } from "react-icons/bi";
import { BsReceiptCutoff } from "react-icons/bs";

import SidebarNavItem from "./sidebar-nav-item";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

function SidebarNav() {
  const navigation = [
    {
      name: "Categories",
      to: "/categories",
      icon: <BiCategoryAlt />,
    },
    {
      name: "Transactions",
      icon: <BsReceiptCutoff />,
      to: "/transactions",
    },
    { name: "Budgets", to: "/budgets", icon: <GiTargeted /> },
  ];

  return (
    <Wrapper>
      {navigation.map((nav) => (
        <SidebarNavItem key={nav.name} {...nav} />
      ))}
    </Wrapper>
  );
}

export default SidebarNav;
