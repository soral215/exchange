import styled from 'styled-components'
import { Text } from '@/components/atoms'

export const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`

export const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
`

export const TitleSection = styled.div`
  padding: 40px 80px 16px 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${({ theme }) => theme.media.mobile} {
    padding: 24px 20px 12px 20px;
  }
`

export const PageTitle = styled(Text)`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #28323C;
  line-height: 1.33;

  ${({ theme }) => theme.media.mobile} {
    font-size: 28px;
  }
`

export const PageDescription = styled(Text)`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #374553;
  line-height: 1.33;

  ${({ theme }) => theme.media.mobile} {
    font-size: 14px;
  }
`
