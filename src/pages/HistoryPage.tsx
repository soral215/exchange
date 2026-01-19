import styled from 'styled-components'
import { Header } from '@/components/organisms'
import { Text } from '@/components/atoms'

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
`

const ContentWrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1440px;
  margin: 0 auto;
`

const TitleSection = styled.div`
  padding: 40px 80px 16px 80px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PageTitle = styled(Text)`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #28323C;
  line-height: 1.33;
`

const PageDescription = styled(Text)`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #374553;
  line-height: 1.33;
`

const TableSection = styled.div`
  padding: 0 80px 50px 80px;
`

const TableWrapper = styled.div`
  border: 1px solid #D0D6DB;
  border-radius: 16px;
  overflow: hidden;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: ${({ theme }) => theme.colors.background.primary};
`

const TableHead = styled.thead`
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid #D0D6DB;
`

const TableHeaderRow = styled.tr``

const TableHeaderCell = styled.th`
  padding: 20px 24px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #646F7C;
  text-align: left;
  line-height: 1.33;

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    text-align: right;
  }
`

const TableBody = styled.tbody``

const TableRow = styled.tr`
  border-bottom: 1px solid #E5E8EB;

  &:last-child {
    border-bottom: none;
  }
`

const TableCell = styled.td`
  padding: 20px 24px;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #374553;
  line-height: 1.5;

  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    text-align: right;
  }
`

// Mock 데이터
const historyData = [
  { id: 10, date: '2025-10-05 00:00:00', buyAmount: '32.50', rate: '1,383.07', sellAmount: '51,976' },
  { id: 9, date: '2025-10-05 00:00:00', buyAmount: '500', rate: '1,383.07', sellAmount: '699,690' },
  { id: 8, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '1,609.70', sellAmount: '454,734' },
  { id: 7, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '1,609.70', sellAmount: '454,734' },
  { id: 6, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '1,383.07', sellAmount: '454,734' },
  { id: 5, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '942.56', sellAmount: '454,734' },
  { id: 4, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '942.56', sellAmount: '454,734' },
  { id: 3, date: '2025-10-05 00:00:00', buyAmount: '41,698', rate: '942.56', sellAmount: '30.00' },
  { id: 2, date: '2025-10-05 00:00:00', buyAmount: '41,698', rate: '1,383.07', sellAmount: '30.00' },
  { id: 1, date: '2025-10-05 00:00:00', buyAmount: '325.50', rate: '1,383.07', sellAmount: '454,734' },
]

export function HistoryPage() {
  return (
    <PageContainer>
      <Header />
      <ContentWrapper>
        <TitleSection>
          <PageTitle variant="title">환전 내역</PageTitle>
          <PageDescription variant="body">
            환전 내역을 확인하실 수 있어요.
          </PageDescription>
        </TitleSection>

        <TableSection>
          <TableWrapper>
            <Table>
              <TableHead>
                <TableHeaderRow>
                  <TableHeaderCell>거래 ID</TableHeaderCell>
                  <TableHeaderCell>거래 일시</TableHeaderCell>
                  <TableHeaderCell>매수 금액</TableHeaderCell>
                  <TableHeaderCell>체결 환율</TableHeaderCell>
                  <TableHeaderCell>매도 금액</TableHeaderCell>
                </TableHeaderRow>
              </TableHead>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.buyAmount}</TableCell>
                    <TableCell>{item.rate}</TableCell>
                    <TableCell>{item.sellAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableWrapper>
        </TableSection>
      </ContentWrapper>
    </PageContainer>
  )
}
