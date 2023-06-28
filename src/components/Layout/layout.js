import styled from "@emotion/styled";
import Sidebar from "../Sidebar";
import { colors } from "../../styles";

const Container = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  background-color: ${colors.gray[50]};
  height: 100vh;
`;

const MainContainer = styled.main`
  padding: 1.5rem 2rem;
`;

const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
};

export default Layout;
