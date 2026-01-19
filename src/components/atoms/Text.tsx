import styled, { css } from 'styled-components'

type TextVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'label'
type TextColor = 'primary' | 'secondary' | 'tertiary' | 'inverse' | 'error' | 'success'

interface TextProps {
  variant?: TextVariant
  color?: TextColor
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  align?: 'left' | 'center' | 'right'
  children: React.ReactNode
  className?: string
}

const variantStyles = {
  title: css`
    font-size: ${({ theme }) => theme.typography.fontSize['4xl']};
    font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  subtitle: css`
    font-size: 32px;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  body: css`
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  `,
  caption: css`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
  label: css`
    font-size: ${({ theme }) => theme.typography.fontSize.xl};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    line-height: ${({ theme }) => theme.typography.lineHeight.normal};
  `,
}

const colorMap = {
  primary: css`color: ${({ theme }) => theme.colors.text.primary};`,
  secondary: css`color: ${({ theme }) => theme.colors.text.secondary};`,
  tertiary: css`color: ${({ theme }) => theme.colors.text.tertiary};`,
  inverse: css`color: ${({ theme }) => theme.colors.text.inverse};`,
  error: css`color: ${({ theme }) => theme.colors.error};`,
  success: css`color: ${({ theme }) => theme.colors.success};`,
}

const StyledText = styled.p<{
  $variant: TextVariant
  $color: TextColor
  $weight?: TextProps['weight']
  $align?: TextProps['align']
}>`
  margin: 0;
  ${({ $variant }) => variantStyles[$variant]}
  ${({ $color }) => colorMap[$color]}
  ${({ $weight, theme }) => $weight && `font-weight: ${theme.typography.fontWeight[$weight]};`}
  ${({ $align }) => $align && `text-align: ${$align};`}
`

export function Text({
  variant = 'body',
  color = 'primary',
  weight,
  align,
  children,
  className,
}: TextProps) {
  return (
    <StyledText
      className={className}
      $variant={variant}
      $color={color}
      $weight={weight}
      $align={align}
    >
      {children}
    </StyledText>
  )
}
