import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Text, Button, Input, Card } from '@/components/atoms'
import { useAuthStore } from '@/stores'
import { authService } from '@/services'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background.primary};
`

const LoginCard = styled.div`
  width: 100%;
  max-width: 560px;
  text-align: center;
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`

const Icon = styled.div`
  width: 56px;
  height: 56px;
  color: ${({ theme }) => theme.colors.primary};
`

const Title = styled(Text)`
  margin-bottom: 8px;
`

const Description = styled(Text)`
  margin-bottom: 32px;
`

const FormCard = styled(Card)`
  text-align: left;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const Label = styled(Text)`
  display: block;
  margin-bottom: 12px;
`

const ErrorMessage = styled(Text)`
  margin-top: 8px;
`

export function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('이메일을 입력해주세요.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      const response = await authService.login(email)
      setAuth(response.token, response.memberId)
      navigate('/')
    } catch {
      setError('로그인에 실패했습니다. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <LoginCard>
        <IconWrapper>
          <Icon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              width="100%"
              height="100%"
            >
              <path d="M12.75 19.5v-.75a7.5 7.5 0 0 0-7.5-7.5H4.5m0-6.75h.75c7.87 0 14.25 6.38 14.25 14.25v.75M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </Icon>
        </IconWrapper>

        <Title variant="title">반갑습니다.</Title>
        <Description variant="subtitle" color="secondary">
          로그인 정보를 입력해주세요.
        </Description>

        <FormCard variant="filled">
          <Form onSubmit={handleSubmit}>
            <div>
              <Label variant="label" color="secondary">
                이메일 주소를 입력해주세요.
              </Label>
              <Input
                type="email"
                placeholder="test@test.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                disabled={isLoading}
              />
              {error && (
                <ErrorMessage variant="caption" color="error">
                  {error}
                </ErrorMessage>
              )}
            </div>

            <Button
              type="submit"
              variant="dark"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인 하기'}
            </Button>
          </Form>
        </FormCard>
      </LoginCard>
    </Container>
  )
}
