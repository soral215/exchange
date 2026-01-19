import { useState } from 'react'
import styled from 'styled-components'
import { Header } from '@/components/organisms'
import { Text, Card, Badge, Tabs, Button, Input, Dropdown } from '@/components/atoms'
import usFlag from '@/assets/flags/us.svg'
import jpFlag from '@/assets/flags/jp.svg'

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
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #374553;
  line-height: 1.33;
`

const MainContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 24px;
  padding: 0 80px 50px 80px;
`

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

// 환율 카드 섹션
const RateCardsContainer = styled.div`
  display: flex;
  gap: 16px;
`

const RateCard = styled(Card)`
  flex: 1;
  padding: 20px 24px;
`

const RateCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const CurrencyCode = styled(Text)`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #646F7C;
  line-height: 1.33;
`

const CurrencyName = styled(Text)`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #646F7C;
  line-height: 1.33;
`

const RateValue = styled(Text)`
  font-size: 24px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #28323C;
  line-height: 1.33;
  margin-bottom: 4px;
`

// 환전 섹션
const ExchangeCard = styled(Card)`
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const CurrencyDropdown = styled(Dropdown)`
  margin-bottom: 16px;
`

const TabsWrapper = styled.div``

const ExchangeFormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormGroup = styled.div``

const FormLabel = styled(Text)`
  display: block;
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #646F7C;
  line-height: 1.33;
`

const InputWrapper = styled.div`
  position: relative;
`

const InputSuffix = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 4px;
  color: #646F7C;
  line-height: 1.33;
`

const InputSuffixNumber = styled.span`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`

const InputSuffixText = styled.span`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`

const ExchangeArrow = styled.div`
  display: flex;
  justify-content: center;
  `

const ArrowIcon = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #E5E8EB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #D0D6DB;

  svg {
    width: 20px;
    height: 20px;
  }
`

const RequiredInputSuffix = styled.span<{ $isSell?: boolean }>`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ $isSell, theme }) => $isSell ? theme.colors.primary : theme.colors.up};
`

const ExchangeInput = styled(Input)`
  padding-right: 160px;
`

const ExchangeDivider = styled.hr`
  width: 100%;
  height: 1px;
  border: none;
  background: ${({ theme }) => theme.colors.border.light};
  margin: 0;
`

const ExchangeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ExchangeInfoLabel = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #646F7C;
  line-height: 1.33;
`

const ExchangeInfoValue = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #646F7C;
  line-height: 1.33;
`

const ExchangeButton = styled(Button)``

// 내 지갑 섹션
const WalletCard = styled(Card)`
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
`

const WalletTitle = styled(Text)`
  font-size: 24px;
  font-weight: 800;
  color: #28323C;
  line-height: 1.33;
  margin-bottom: 32px;
`

const WalletList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
`

const WalletItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const WalletCurrency = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #646F7C;
  line-height: 1.33;
`

const WalletBalance = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: #646F7C;
  line-height: 1.33;
`

const WalletTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`

const WalletTotalLabel = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: #646F7C;
  line-height: 1.33;
`

const WalletTotalValue = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.primary};
  line-height: 1.33;
`

// 국기 이미지 컴포넌트
const FlagImage = styled.img<{ $hasBorder?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  ${({ $hasBorder }) => $hasBorder && `
    border: 1px solid #F1F2F4;
  `}
`

// Mock 데이터
const exchangeRates = [
  { code: 'USD', name: '미국 달러', rate: '1,320.50', unit: 'KRW', change: 0.5, direction: 'up' as const },
  { code: 'JPY', name: '일본 엔화', rate: '9.85', unit: 'KRW', change: -1.1, direction: 'down' as const },
]

const walletBalances = [
  { currency: 'KRW', balance: '₩ 1,200,000' },
  { currency: 'USD', balance: '$ 50.000' },
  { currency: 'JPY', balance: '₩ 150.000' },
]

const currencyOptions = [
  { value: 'USD', label: 'USD 환전하기', icon: <FlagImage src={usFlag} alt="미국" />, optionLabel: '미국 USD' },
  { value: 'JPY', label: 'JPY 환전하기', icon: <FlagImage src={jpFlag} alt="일본" $hasBorder />, optionLabel: '일본 JPY' },
]

export function ExchangePage() {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')

  return (
    <PageContainer>
      <Header />

      <ContentWrapper>
        <TitleSection>
          <PageTitle variant="title">환율 정보</PageTitle>
          <PageDescription variant="body" color="secondary">
            실시간 환율을 확인하고 간편하게 환전하세요.
          </PageDescription>
        </TitleSection>

        <MainContent>
          <LeftSection>
            {/* 환율 카드 */}
            <RateCardsContainer>
              {exchangeRates.map((rate) => (
                <RateCard key={rate.code} variant="outlined">
                  <RateCardHeader>
                    <CurrencyCode>{rate.code}</CurrencyCode>
                    <CurrencyName>{rate.name}</CurrencyName>
                  </RateCardHeader>
                  <RateValue>{rate.rate} {rate.unit}</RateValue>
                  <Badge variant={rate.direction}>
                    {rate.direction === 'up' ? '+' : ''}{rate.change}%
                  </Badge>
                </RateCard>
              ))}
            </RateCardsContainer>

            {/* 내 지갑 */}
            <WalletCard variant="filled">
              <WalletTitle>내 지갑</WalletTitle>
              <WalletList>
                {walletBalances.map((item) => (
                  <WalletItem key={item.currency}>
                    <WalletCurrency>{item.currency}</WalletCurrency>
                    <WalletBalance>{item.balance}</WalletBalance>
                  </WalletItem>
                ))}
              </WalletList>
              <WalletTotal>
                <WalletTotalLabel>총 보유 자산</WalletTotalLabel>
                <WalletTotalValue>₩ 3,000,000</WalletTotalValue>
              </WalletTotal>
            </WalletCard>
          </LeftSection>

          <RightSection>
            {/* 환전 섹션 */}
            <ExchangeCard variant="filled">
              {/* 드롭다운 + 탭 */}
              <div>
                <CurrencyDropdown
                  options={currencyOptions}
                  value={selectedCurrency}
                  onChange={setSelectedCurrency}
                />
                <TabsWrapper>
                  <Tabs
                    options={[
                      { value: 'buy', label: '살래요' },
                      { value: 'sell', label: '팔래요' },
                    ]}
                    value={activeTab}
                    onChange={setActiveTab}
                  />
                </TabsWrapper>
              </div>

              {/* 매수/매도 금액 + 화살표 + 필요 원화 */}
              <ExchangeFormSection>
                <FormGroup>
                  <FormLabel>{activeTab === 'buy' ? '매수 금액' : '매도 금액'}</FormLabel>
                  <InputWrapper>
                    <ExchangeInput
                      type="text"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      fullWidth
                    />
                    <InputSuffix>
                      <InputSuffixNumber>30</InputSuffixNumber>
                      <InputSuffixText>
                        달러 {activeTab === 'buy' ? '사기' : '팔기'}
                      </InputSuffixText>
                    </InputSuffix>
                  </InputWrapper>
                </FormGroup>

                <ExchangeArrow>
                  <ArrowIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="#FFFFFF"
                      style={{ transform: 'rotate(180deg)' }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                      />
                    </svg>
                  </ArrowIcon>
                </ExchangeArrow>

                <FormGroup>
                  <FormLabel>필요 원화</FormLabel>
                  <InputWrapper>
                    <ExchangeInput
                      type="text"
                      value="42,530"
                      readOnly
                      fullWidth
                    />
                    <RequiredInputSuffix $isSell={activeTab === 'sell'}>
                      {activeTab === 'buy' ? '원 필요해요' : '원 받을 수 있어요'}
                    </RequiredInputSuffix>
                  </InputWrapper>
                </FormGroup>
              </ExchangeFormSection>

              {/* 구분선 */}
              <ExchangeDivider />

              {/* 적용 환율 */}
              <ExchangeInfo>
                <ExchangeInfoLabel>적용 환율</ExchangeInfoLabel>
                <ExchangeInfoValue>1 USD = 1,320.50 원</ExchangeInfoValue>
              </ExchangeInfo>

              {/* 환전하기 버튼 */}
              <ExchangeButton variant="dark" size="lg" fullWidth>
                환전하기
              </ExchangeButton>
            </ExchangeCard>
          </RightSection>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  )
}
