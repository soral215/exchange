# 환전 서비스

원화(KRW)와 외화(USD, JPY) 간 실시간 환전을 지원하는 웹 애플리케이션입니다.

## 주요 기능

- **로그인**: 이메일 기반 간편 로그인 (JWT 인증)
- **환율 조회**: 실시간 환율 정보 표시 (1분 주기 자동 갱신)
- **환전**: 외화 매수/매도 기능, 환율 변동 시 재확인 프로세스
- **지갑**: 통화별 잔액 조회 및 총 자산 표시
- **환전 내역**: 과거 거래 기록 조회

## 기술 스택

- React 19 + TypeScript
- Vite
- styled-components
- TanStack Query
- Zustand
- React Router DOM

## 프로젝트 구조

```
src/
├── components/
│   ├── atoms/        # Button, Input, Card, Tabs, Dropdown 등
│   └── organisms/    # Header, ProtectedRoute
├── pages/            # LoginPage, ExchangePage, HistoryPage
├── services/         # API 호출 (auth, wallet, exchangeRate, order)
├── stores/           # 인증 상태 관리
├── styles/           # 테마, 글로벌 스타일
├── types/            # API 응답 타입 정의
└── utils/            # 숫자/날짜 포맷팅 유틸
```

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버: http://localhost:3000

## 주요 구현 사항

### 인증
- localStorage에 JWT 저장
- Axios interceptor로 모든 요청에 토큰 자동 첨부
- 401 응답 시 자동 로그아웃 처리
- ProtectedRoute로 미인증 사용자 접근 차단

### 환전 프로세스
- 금액 입력 시 디바운싱(300ms) 적용 후 견적 API 호출
- 환전 버튼 클릭 시 최신 환율 재조회
- 환율 변동 감지 시 사용자 확인 후 진행
- 환전 완료 후 지갑 잔액 자동 갱신

### 유효성 검사
- 숫자/소수점만 입력 가능
- 통화별 최소 금액 체크 (USD: 1, JPY: 100)
- 지갑 잔액 초과 시 에러 표시

### 반응형
- 768px 기준 모바일 대응
- 2컬럼 → 1컬럼 레이아웃 전환

## 추가 구현 사항

### UX 개선
- 로딩 스피너: 페이지/API 호출 시 불투명 오버레이 + 스피너 표시
- 견적 조회 로딩: 금액 계산 중 "계산 중..." 텍스트 표시
- 에러 메시지: 유효성 검사 실패 시 인풋 하단에 에러 표시

### 성능 최적화
- `useCallback`, `useMemo`로 불필요한 리렌더링 방지
- 금액 입력 디바운싱으로 API 호출 최소화

### 코드 품질
- 공통 레이아웃 컴포넌트 분리 (`templates/PageLayout`)
- API 에러 타입 공통화 (`types/api.ts`)
- Atomic Design 패턴 적용 (atoms → organisms → templates → pages)

## API 프록시

Vite 개발 서버에서 `/api/*` 요청을 백엔드로 프록시합니다.

```typescript
// vite.config.ts
proxy: {
  '/api': {
    target: 'https://exchange-example.switchflow.biz',
    changeOrigin: true,
  }
}
```
