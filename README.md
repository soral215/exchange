# 환전 서비스

환율을 실시간으로 조회하고 원화와 외화 간 환전을 수행하는 웹 애플리케이션입니다.

## 기술 스택

- **프레임워크**: React 19 + TypeScript
- **빌드 도구**: Vite
- **상태 관리**: Zustand
- **서버 상태**: TanStack Query (React Query)
- **스타일링**: styled-components
- **라우팅**: React Router DOM

## 프로젝트 구조

```
src/
├── components/           # 아토믹 디자인 패턴 기반 컴포넌트
│   ├── atoms/           # 기본 UI 요소 (Button, Input, Text 등)
│   ├── molecules/       # atoms 조합 (FormField 등)
│   ├── organisms/       # 복잡한 컴포넌트 (ProtectedRoute 등)
│   └── templates/       # 페이지 레이아웃
├── pages/               # 라우트별 페이지 컴포넌트
├── hooks/               # 커스텀 훅
├── services/            # API 서비스 레이어
├── stores/              # Zustand 상태 저장소
├── styles/              # 글로벌 스타일, 테마
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 환경 설정

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

API 서버(`exchange-example.switchflow.biz`)에 대한 CORS 문제를 해결하기 위해 Vite 프록시가 설정되어 있습니다. 모든 `/api/*` 요청은 자동으로 백엔드 서버로 프록시됩니다.
