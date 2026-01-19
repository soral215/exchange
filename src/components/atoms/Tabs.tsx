import styled from 'styled-components'

type TabType = 'buy' | 'sell'

interface TabOption {
  value: TabType
  label: string
}

interface TabsProps {
  options: TabOption[]
  value: TabType
  onChange: (value: TabType) => void
  className?: string
}

const TabsContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 12px;
  align-items: center;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 16px;
  border: 1px solid #D0D6DB;
`

const TabButton = styled.button<{ $active: boolean; $type: TabType }>`
  flex: 1;
  height: 59px;
  border: none;
  border-radius: 12px;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  line-height: 1.33;
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  background: ${({ $active, $type, theme }) => {
    if (!$active) return theme.colors.background.primary;
    return $type === 'buy' ? theme.colors.up : theme.colors.primary;
  }};
  
  color: ${({ $active, $type, theme }) => {
    if ($active) return theme.colors.text.inverse;
    return $type === 'buy' ? '#FFA7A7' : '#9DB6FF';
  }};
  
  box-shadow: ${({ $active }) => 
    $active ? '2px 2px 4px rgba(0, 0, 0, 0.1)' : 'none'};

  &:hover:not(:disabled) {
    opacity: ${({ $active }) => $active ? 1 : 0.8};
  }
`

export function Tabs({ options, value, onChange, className }: TabsProps) {
  return (
    <TabsContainer className={className}>
      {options.map((option) => (
        <TabButton
          key={option.value}
          type="button"
          $active={value === option.value}
          $type={option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </TabButton>
      ))}
    </TabsContainer>
  )
}
