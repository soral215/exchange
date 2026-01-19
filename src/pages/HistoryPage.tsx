import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'
import { Header } from '@/components/organisms'
import { SpinnerFullPage } from '@/components/atoms'
import { PageContainer, ContentWrapper, TitleSection, PageTitle, PageDescription } from '@/components/templates'
import { orderService } from '@/services'
import { formatNumber } from '@/utils'

const TableSection = styled.div`
  padding: 0 80px 50px 80px;

  ${({ theme }) => theme.media.mobile} {
    padding: 0 20px 30px 20px;
  }
`

const TableWrapper = styled.div`
  border: 1px solid #D0D6DB;
  border-radius: 16px;
  overflow-x: auto;

  ${({ theme }) => theme.media.mobile} {
    border-radius: 12px;
  }
`

const Table = styled.table`
  width: 100%;
  min-width: 600px;
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

const EmptyMessage = styled.div`
  padding: 60px 24px;
  text-align: center;
  color: #646F7C;
  font-size: 16px;
`

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toISOString().replace('T', ' ').slice(0, 19)
}

export function HistoryPage() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getOrders,
  })

  return (
    <PageContainer>
      {isLoading && <SpinnerFullPage />}
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
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <EmptyMessage>환전 내역이 없습니다.</EmptyMessage>
                    </TableCell>
                  </TableRow>
                ) : (
                  orders.map((order) => (
                    <TableRow key={order.orderId}>
                      <TableCell>{order.orderId}</TableCell>
                      <TableCell>{formatDateTime(order.orderedAt)}</TableCell>
                      <TableCell>{formatNumber(order.toAmount, 2)}</TableCell>
                      <TableCell>{formatNumber(order.appliedRate, 2)}</TableCell>
                      <TableCell>{formatNumber(order.fromAmount, 0)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableWrapper>
        </TableSection>
      </ContentWrapper>
    </PageContainer>
  )
}
