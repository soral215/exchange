import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { Logo, NavTab, Button } from '@/components/atoms'
import { useAuthStore } from '@/stores'

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 75px;
  padding: 16px 40px;
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid #D0D6DB;

  ${({ theme }) => theme.media.mobile} {
    height: 60px;
    padding: 12px 16px;
  }
`

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;

  ${({ theme }) => theme.media.mobile} {
    gap: 12px;
  }
`

const NavTabWrapper = styled.div`
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`

const LogoutButton = styled(Button)`
  height: auto;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};

  ${({ theme }) => theme.media.mobile} {
    padding: 6px 10px;
    font-size: 14px;
  }
`

const navItems = [
  { key: 'exchange', label: '환전 하기' },
  { key: 'history', label: '환전 내역' },
]

export function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const clearAuth = useAuthStore((state) => state.clearAuth)

  const getActiveKey = () => {
    if (location.pathname === '/history') return 'history'
    return 'exchange'
  }

  const handleTabChange = (key: string) => {
    if (key === 'exchange') {
      navigate('/')
    } else if (key === 'history') {
      navigate('/history')
    }
  }

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <StyledHeader>
      <LeftSection>
        <Logo />
      </LeftSection>

      <RightSection>
        <NavTabWrapper>
          <NavTab
            items={navItems}
            activeKey={getActiveKey()}
            onChange={handleTabChange}
          />
        </NavTabWrapper>
        <LogoutButton variant="primary" size="sm" onClick={handleLogout}>
          Log out
        </LogoutButton>
      </RightSection>
    </StyledHeader>
  )
}
