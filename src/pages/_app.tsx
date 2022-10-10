import { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'
import  Header from '../components/Header'


import { Container } from '../styles/pages/app'
import { CartContextProvider } from '../contexts/CartContext'


globalStyles()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <CartContextProvider>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </CartContextProvider>
  )
}

export default MyApp
