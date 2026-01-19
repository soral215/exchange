import styled, { css } from 'styled-components'

type ButtonVariant = 'primary' | 'dark' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: React.ReactNode
}

const sizeStyles = {
  sm: css`
    height: 40px;
    padding: 0 16px;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,
  md: css`
    height: 48px;
    padding: 0 20px;
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  `,
  lg: css`
    height: 77px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  `,
}

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.inverse};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  dark: css`
    background: #1B2334;
    color: ${({ theme }) => theme.colors.text.inverse};
    border: none;

    &:hover:not(:disabled) {
      background: #151C2A;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.background.tertiary};
    color: ${({ theme }) => theme.colors.text.primary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.border.light};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primaryLight};
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.secondary};
    border: none;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.tertiary};
    }
  `,
}

const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: inherit;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  ${({ $size }) => sizeStyles[$size]}
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $fullWidth }) => $fullWidth && 'width: 100%;'}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  )
}
