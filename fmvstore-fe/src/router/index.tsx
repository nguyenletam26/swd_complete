import ErrorPage from '@/error-page'
import RootLayout from '@/layouts'
import PaymentVerify from '@/pages/payment/verify'
import AccountPage from '@/pages/account'
import CheckoutPage from '@/pages/checkout'
import ForgotPasswordPage from '@/pages/forgot-password'
import HomePage from '@/pages/home'
import LoginPage from '@/pages/login'
import OrderPage from '@/pages/order'
import PaymentPage from '@/pages/payment'
import ProductsPage from '@/pages/products'
import ProductDetailPage from '@/pages/products/detail'
import RegisterPage from '@/pages/register'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/products',
        element: <ProductsPage />,
      },
      {
        path: '/products/:id',
        element: <ProductDetailPage />,
      },
      {
        path: '/account',
        element: <AccountPage />,
      },
      {
        path: '/order',
        element: <OrderPage />,
      },
      {
        path: '/payment',
        element: <PaymentPage />,
      },
      {
        path: '/payment/verify',
        element: <PaymentVerify />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
    ],
  },
])

export default router
