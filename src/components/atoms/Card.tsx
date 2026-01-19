import styled, { css } from 'styled-components'

type CardVariant = 'default' | 'filled' | 'outlined'

interface CardProps {
  children: React.ReactNode
  variant?: CardVariant
  padding?: 'sm' | 'md' | 'lg'
  shadow?: boolean
  className?: string
}

const paddingMap = {
  sm: '16px 20px',
  md: '24px 32px',
  lg: '32px 40px',
}

const variantStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.background.primary};
  `,
  filled: css`
    background: #F7F8F9;
    border: 1px solid #D0D6DB;
  `,
  outlined: css`
    background: ${({ theme }) => theme.colors.background.primary};
    border: 1px solid ${({ theme }) => theme.colors.border.light};
  `,
}

const StyledCard = styled.div<{
  $variant: CardVariant
  $padding: string
  $shadow: boolean
}>`
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: ${({ $padding }) => $padding};
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $shadow, theme }) => $shadow && `box-shadow: ${theme.shadows.md};`}
`

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  shadow = false,
  className,
}: CardProps) {
  return (
    <StyledCard
      className={className}
      $variant={variant}
      $padding={paddingMap[padding]}
      $shadow={shadow}
    >
      {children}
    </StyledCard>
  )
}
