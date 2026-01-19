import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import styled from 'styled-components'
import { Header } from '@/components/organisms'
import { Text, Card, Badge, Tabs, Button, Input, Dropdown, SpinnerFullPage } from '@/components/atoms'
import { exchangeRateService, walletService, orderService } from '@/services'
import { formatNumber } from '@/utils'
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

  ${({ theme }) => theme.media.mobile} {
    padding: 24px 20px 12px 20px;
  }
`

const PageTitle = styled(Text)`
  font-size: 40px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: #28323C;
  line-height: 1.33;

  ${({ theme }) => theme.media.mobile} {
    font-size: 28px;
  }
`

const PageDescription = styled(Text)`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.normal};
  color: #374553;
  line-height: 1.33;

  ${({ theme }) => theme.media.mobile} {
    font-size: 14px;
  }
`

const MainContent = styled.div`
  display: flex;
  flex: 1 1 auto;
  gap: 24px;
  padding: 0 80px 50px 80px;

  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    padding: 0 20px 30px 20px;
    gap: 20px;
  }
`

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${({ theme }) => theme.media.mobile} {
    gap: 16px;
  }
`

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${({ theme }) => theme.media.mobile} {
    gap: 16px;
  }
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
  padding-right: 110px;
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

const InputErrorMessage = styled.div`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  line-height: 1.5;
`

// 내 지갑 섹션
const WalletCard = styled(Card)`
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 300px;
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

// 통화 이름 매핑
const currencyNames: Record<string, string> = {
  USD: '미국 달러',
  JPY: '일본 엔화',
}

// 통화 기호 매핑
const currencySymbols: Record<string, string> = {
  KRW: '₩',
  USD: '$',
  JPY: '¥',
}

// 통화별 최소 금액
const minAmounts: Record<string, number> = {
  USD: 1,
  JPY: 100,
}

const currencyOptions = [
  { value: 'USD', label: 'USD 환전하기', icon: <FlagImage src={usFlag} alt="미국" />, optionLabel: '미국 USD' },
  { value: 'JPY', label: 'JPY 환전하기', icon: <FlagImage src={jpFlag} alt="일본" $hasBorder />, optionLabel: '일본 JPY' },
]

export function ExchangePage() {
  const queryClient = useQueryClient()
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy')
  const [amount, setAmount] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD')
  const [debouncedAmount, setDebouncedAmount] = useState('')

  // 디바운스 처리
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedAmount(amount)
    }, 300)
    return () => clearTimeout(timer)
  }, [amount])

  // 숫자 입력 검증
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value)
    }
  }

  // 환율 조회 (10초마다 자동 갱신)
  const { data: exchangeRates = [], isLoading: isLoadingRates } = useQuery({
    queryKey: ['exchangeRates'],
    queryFn: exchangeRateService.getLatest,
    refetchInterval: 10000,
  })

  // 지갑 조회
  const { data: walletData, isLoading: isLoadingWallet } = useQuery({
    queryKey: ['wallets'],
    queryFn: walletService.getWallets,
  })

  const isLoading = isLoadingRates || isLoadingWallet

  // 선택된 통화의 환율 정보
  const selectedRate = exchangeRates.find((rate) => rate.currency === selectedCurrency)

  // 견적 조회
  const { data: quoteData, isFetching: isQuoteFetching } = useQuery({
    queryKey: ['quote', selectedCurrency, debouncedAmount, activeTab],
    queryFn: () =>
      orderService.getQuote({
        fromCurrency: activeTab === 'buy' ? 'KRW' : selectedCurrency,
        toCurrency: activeTab === 'buy' ? selectedCurrency : 'KRW',
        forexAmount: parseFloat(debouncedAmount) || 0,
      }),
    enabled: !!debouncedAmount && parseFloat(debouncedAmount) > 0,
  })

  // 지갑 잔액 가져오기
  const getWalletBalance = (currency: string) => {
    const wallet = walletData?.wallets.find((w) => w.currency === currency)
    return wallet?.balance || 0
  }

  // 금액 유효성 검사
  const validateAmount = (): string | null => {
    const numAmount = parseFloat(amount)
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return null // 아직 입력 전
    }

    const minAmount = minAmounts[selectedCurrency] || 0.01

    // 최소 금액 체크
    if (numAmount < minAmount) {
      return `최소 ${minAmount} ${selectedCurrency} 이상 입력해주세요.`
    }

    // 최대 금액 체크 (지갑 잔액 기준)
    if (activeTab === 'buy') {
      // 매수: KRW 잔액 체크 (견적 기준)
      const krwBalance = getWalletBalance('KRW')
      if (quoteData && quoteData.krwAmount > krwBalance) {
        return `KRW 잔액이 부족합니다. (보유: ${formatNumber(krwBalance, 0)}원)`
      }
    } else {
      // 매도: 외화 잔액 체크
      const forexBalance = getWalletBalance(selectedCurrency)
      if (numAmount > forexBalance) {
        return `${selectedCurrency} 잔액이 부족합니다. (보유: ${formatNumber(forexBalance, 2)})`
      }
    }

    return null
  }

  const amountError = validateAmount()

  // 환전 주문
  const orderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: () => {
      alert('환전이 완료되었습니다!')
      setAmount('')
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      queryClient.invalidateQueries({ queryKey: ['exchangeRates'] })
    },
    onError: (error: Error & { response?: { data?: { code?: string; message?: string } } }) => {
      const errorMessage = error.response?.data?.message || '환전에 실패했습니다. 다시 시도해주세요.'
      alert(errorMessage)
      
      if (error.response?.data?.code === 'EXCHANGE_RATE_MISMATCH') {
        queryClient.invalidateQueries({ queryKey: ['exchangeRates'] })
      }
    },
  })

  const handleExchange = async () => {
    if (!selectedRate || !amount || parseFloat(amount) <= 0) {
      alert('금액을 입력해주세요.')
      return
    }

    try {
      // 최신 환율 조회
      const latestRates = await exchangeRateService.getLatest()
      const latestRate = latestRates.find((r) => r.currency === selectedCurrency)

      if (!latestRate) {
        alert('환율 정보를 가져올 수 없습니다.')
        return
      }

      // 화면에 최신 환율 즉시 반영
      queryClient.setQueryData(['exchangeRates'], latestRates)

      // 환율 변동 확인
      if (latestRate.exchangeRateId !== selectedRate.exchangeRateId) {
        const confirmed = window.confirm(
          `환율이 변동되었습니다.\n\n` +
          `이전: 1 ${selectedCurrency} = ${formatNumber(selectedRate.rate, 2)} 원\n` +
          `현재: 1 ${selectedCurrency} = ${formatNumber(latestRate.rate, 2)} 원\n\n` +
          `변동된 환율로 환전을 진행하시겠습니까?`
        )

        if (!confirmed) {
          return
        }
      }

      // 환전 주문 (최신 환율 사용)
      orderMutation.mutate({
        exchangeRateId: latestRate.exchangeRateId,
        fromCurrency: activeTab === 'buy' ? 'KRW' : selectedCurrency,
        toCurrency: activeTab === 'buy' ? selectedCurrency : 'KRW',
        forexAmount: parseFloat(amount),
      })
    } catch {
      alert('환율 정보를 가져오는데 실패했습니다.')
    }
  }

  return (
    <PageContainer>
      {isLoading && <SpinnerFullPage />}
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
                <RateCard key={rate.exchangeRateId} variant="outlined">
                  <RateCardHeader>
                    <CurrencyCode>{rate.currency}</CurrencyCode>
                    <CurrencyName>{currencyNames[rate.currency] || rate.currency}</CurrencyName>
                  </RateCardHeader>
                  <RateValue>{formatNumber(rate.rate, 2)} KRW</RateValue>
                  <Badge variant={rate.changePercentage >= 0 ? 'up' : 'down'}>
                    {rate.changePercentage >= 0 ? '+' : ''}{rate.changePercentage}%
                  </Badge>
                </RateCard>
              ))}
            </RateCardsContainer>

            {/* 내 지갑 */}
            <WalletCard variant="filled">
              <WalletTitle>내 지갑</WalletTitle>
              <WalletList>
                {walletData?.wallets.map((wallet) => (
                  <WalletItem key={wallet.walletId}>
                    <WalletCurrency>{wallet.currency}</WalletCurrency>
                    <WalletBalance>
                      {currencySymbols[wallet.currency] || ''} {formatNumber(wallet.balance, wallet.currency === 'KRW' ? 0 : 2)}
                    </WalletBalance>
                  </WalletItem>
                ))}
              </WalletList>
              <WalletTotal>
                <WalletTotalLabel>총 보유 자산</WalletTotalLabel>
                <WalletTotalValue>₩ {formatNumber(walletData?.totalKrwBalance || 0, 0)}</WalletTotalValue>
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
                      inputMode="decimal"
                      placeholder="0"
                      value={amount}
                      onChange={handleAmountChange}
                      fullWidth
                      error={!!amountError}
                    />
                    <InputSuffix>
                      <InputSuffixText>
                        {selectedCurrency === 'USD' ? '달러' : '엔'} {activeTab === 'buy' ? '사기' : '팔기'}
                      </InputSuffixText>
                    </InputSuffix>
                  </InputWrapper>
                  {amountError && (
                    <InputErrorMessage>{amountError}</InputErrorMessage>
                  )}
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
                  <FormLabel>{activeTab === 'buy' ? '필요 원화' : '받을 금액'}</FormLabel>
                  <InputWrapper>
                    <ExchangeInput
                      type="text"
                      value={isQuoteFetching ? '계산 중...' : (quoteData ? formatNumber(quoteData.krwAmount, 0) : '0')}
                      readOnly
                      fullWidth
                    />
                    <RequiredInputSuffix $isSell={activeTab === 'sell'}>
                      {isQuoteFetching ? '' : (activeTab === 'buy' ? '원 필요해요' : '원 받을 수 있어요')}
                    </RequiredInputSuffix>
                  </InputWrapper>
                </FormGroup>
              </ExchangeFormSection>

              {/* 구분선 */}
              <ExchangeDivider />

              {/* 적용 환율 */}
              <ExchangeInfo>
                <ExchangeInfoLabel>적용 환율</ExchangeInfoLabel>
                <ExchangeInfoValue>
                  1 {selectedCurrency} = {selectedRate ? formatNumber(selectedRate.rate, 2) : '0'} 원
                </ExchangeInfoValue>
              </ExchangeInfo>

              {/* 환전하기 버튼 */}
              <ExchangeButton
                variant="dark"
                size="lg"
                fullWidth
                onClick={handleExchange}
                disabled={orderMutation.isPending || !amount || parseFloat(amount) <= 0 || !!amountError}
              >
                {orderMutation.isPending ? '환전 중...' : '환전하기'}
              </ExchangeButton>
            </ExchangeCard>
          </RightSection>
        </MainContent>
      </ContentWrapper>
    </PageContainer>
  )
}
