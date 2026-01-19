import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { AppIcon } from './AppIcon'

interface LogoProps {
  className?: string
}

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
`

const LogoText = styled.span`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

export function Logo({ className }: LogoProps) {
  return (
    <LogoLink to="/" className={className}>
      <AppIcon size={24} />
      <LogoText>Exchange app</LogoText>
    </LogoLink>
  )
}
