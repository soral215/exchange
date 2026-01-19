import styled from 'styled-components'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  fullWidth?: boolean
}

const StyledInput = styled.input<{ $error?: boolean; $fullWidth?: boolean }>`
  height: 75px;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-family: inherit;
  color: ${({ theme }) => theme.colors.text.primary};
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme, $error }) => 
    $error ? theme.colors.error : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: border-color ${({ theme }) => theme.transitions.fast};
  outline: none;
  
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  }

  &:hover:not(:disabled):not(:focus) {
    border-color: ${({ theme, $error }) => 
      $error ? theme.colors.error : theme.colors.border.dark};
  }

  &:focus {
    border-color: ${({ theme, $error }) => 
      $error ? theme.colors.error : theme.colors.primary};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.background.tertiary};
    cursor: not-allowed;
  }

  &:read-only {
    background: #F1F2F4;
    border-color: #ACB4BB;
    cursor: default;
  }

  &:read-only:focus {
    border-color: #ACB4BB;
  }
`

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, fullWidth = true, ...props }, ref) => {
    return (
      <StyledInput
        ref={ref}
        $error={error}
        $fullWidth={fullWidth}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
