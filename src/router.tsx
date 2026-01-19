import { createBrowserRouter } from 'react-router-dom'
import { LoginPage, ExchangePage, HistoryPage } from '@/pages'
// import { ProtectedRoute } from '@/components/organisms'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  // TODO: 디자인 완료 후 ProtectedRoute 다시 적용
  // {
  //   element: <ProtectedRoute />,
  //   children: [
  {
    path: '/',
    element: <ExchangePage />,
  },
  {
    path: '/history',
    element: <HistoryPage />,
  },
  //   ],
  // },
])
