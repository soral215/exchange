import { createBrowserRouter } from 'react-router-dom'
import { LoginPage, ExchangePage, HistoryPage } from '@/pages'
import { ProtectedRoute } from '@/components/organisms'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <ExchangePage />,
      },
      {
        path: '/history',
        element: <HistoryPage />,
      },
    ],
  },
])
