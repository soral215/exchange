import styled from 'styled-components'

type BadgeVariant = 'up' | 'down'

interface BadgeProps {
  variant: BadgeVariant
  children: React.ReactNode
  className?: string
}

const StyledBadge = styled.span<{ $variant: BadgeVariant }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  color: ${({ theme, $variant }) => theme.colors[$variant]};
`

const Arrow = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 8px;
  color: inherit;
`

const UpArrow = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
    <path d="M7 0L14 8H0L7 0Z" />
  </svg>
)

const DownArrow = () => (
  <svg width="14" height="8" viewBox="0 0 14 8" fill="currentColor">
    <path d="M7 8L0 0H14L7 8Z" />
  </svg>
)

export function Badge({ variant, children, className }: BadgeProps) {
  return (
    <StyledBadge className={className} $variant={variant}>
      <Arrow>
        {variant === 'up' ? <UpArrow /> : <DownArrow />}
      </Arrow>
      {children}
    </StyledBadge>
  )
}
