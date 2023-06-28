import * as S from "./styles";
import SidebarNav from "../SidebarNav";
import { ReactComponent as Logo } from "../../assets/expensable-logo.svg";
import { getProfileInfo, logout } from "../../services/session-service";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles";
import { useEffect, useState } from "react";

const CurrentUser = styled.div`
  border-top: 1px solid ${colors.gray[200]};
  padding-top: 1rem;
`

const StyledLogout = styled.button`
  display: flex;
  flex-direction: flex-start;
  border: none;
  background-color: ${colors.gray[100]};
  width: 100%;
  height: 24px;
  color: ${colors.pink[400]};
  &:hover {
    color: ${colors.pink[600]};
  }
`

function Sidebar() {

  const navigate = useNavigate()
  const [userData, setUserData] = useState(null)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  useEffect( async () => {
    const response = await getProfileInfo()
    setUserData(response)
  }, [])

  return (
    <S.Wrapper>
      <div>
        <Logo />
        <SidebarNav />
      </div>
      <CurrentUser>
        <p style={{ color: colors.gray[700] }}>{`${userData?.first_name} ${userData?.last_name}`}</p>
        <p style={{ color: colors.gray[500] }}>{userData?.email}</p>
        <StyledLogout onClick={handleLogout}>Log out</StyledLogout>
      </CurrentUser>
    </S.Wrapper>
  );
}

export default Sidebar;
