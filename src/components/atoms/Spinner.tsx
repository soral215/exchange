import styled, { keyframes } from 'styled-components'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const sizeMap = {
  sm: '20px',
  md: '32px',
  lg: '48px',
}

const StyledSpinner = styled.div<{ $size: string; $color?: string }>`
  width: ${({ $size }) => $size};
  height: ${({ $size }) => $size};
  border: 3px solid #E5E8EB;
  border-top-color: ${({ $color, theme }) => $color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`

export function Spinner({ size = 'md', color }: SpinnerProps) {
  return <StyledSpinner $size={sizeMap[size]} $color={color} />
}

export function SpinnerFullPage() {
  return (
    <Overlay>
      <Spinner size="lg" />
    </Overlay>
  )
}
