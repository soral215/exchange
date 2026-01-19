import { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'

interface DropdownOption {
  value: string
  label: string
  optionLabel?: string
  icon?: React.ReactNode
}

interface DropdownProps {
  options: DropdownOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

const DropdownWrapper = styled.div`
  position: relative;
`

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  padding: 0;
`

const DropdownLabel = styled.span`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #28323C;
  line-height: 1.33;
`

const DropdownArrow = styled.span<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.primary};
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(0deg)' : 'rotate(180deg)')};

  svg {
    width: 20px;
    height: 20px;
  }
`

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 8px;
  min-width: 160px;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid #D0D6DB;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  overflow: hidden;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`

const DropdownItem = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  padding: 16px 20px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #28323C;
  transition: background 0.2s ease;
  text-align: left;

  &:hover {
    background: #F7F8F9;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #E5E8EB;
  }
`

const OptionIcon = styled.span`
  font-size: 32px;
  line-height: 1;
`

export function Dropdown({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  className,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <DropdownWrapper ref={wrapperRef} className={className}>
      <DropdownButton type="button" onClick={() => setIsOpen(!isOpen)}>
        <OptionIcon>{selectedOption?.icon}</OptionIcon>
        <DropdownLabel>
          {selectedOption?.label || placeholder}
        </DropdownLabel>
        <DropdownArrow $isOpen={isOpen}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 15.75 7.5-7.5 7.5 7.5"
            />
          </svg>
        </DropdownArrow>
      </DropdownButton>

      <DropdownMenu $isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            type="button"
            onClick={() => handleSelect(option.value)}
          >
            <OptionIcon>{option.icon}</OptionIcon>
            {option.optionLabel || option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  )
}
