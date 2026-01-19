import styled from 'styled-components'

interface NavTabItem {
  key: string
  label: string
}

interface NavTabProps {
  items: NavTabItem[]
  activeKey: string
  onChange: (key: string) => void
  className?: string
}

const TabContainer = styled.nav`
  display: flex;
  align-items: center;
`

const TabButton = styled.button<{ $active: boolean }>`
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  font-family: inherit;
  font-size: 20px;
  line-height: 1.33;
  transition: color ${({ theme }) => theme.transitions.fast};

  font-weight: ${({ $active, theme }) =>
    $active
      ? theme.typography.fontWeight.bold
      : theme.typography.fontWeight.medium};

  color: ${({ $active }) => ($active ? '#36414C' : '#8899AA')};

  &:hover {
    color: #36414C;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
    border-radius: 4px;
  }
`

export function NavTab({ items, activeKey, onChange, className }: NavTabProps) {
  return (
    <TabContainer className={className}>
      {items.map((item) => (
        <TabButton
          key={item.key}
          $active={activeKey === item.key}
          onClick={() => onChange(item.key)}
          type="button"
        >
          {item.label}
        </TabButton>
      ))}
    </TabContainer>
  )
}
