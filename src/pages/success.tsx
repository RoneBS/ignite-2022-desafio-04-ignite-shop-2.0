import { GetServerSideProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import * as S from '../styles/pages/success'

type SuccessPorps = {
  customerName: string
  productsImages: string[]
}

const Success = ({ customerName, productsImages }: SuccessPorps) => {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name='robots' content='noindex'/>
      </Head>
      <S.SuccessContainer>
        <S.ImagesContainer>
          {productsImages.map((image, i) => (
            <S.ImageContainer key={i}>
            <Image src={image} width={120} height={110} alt='' />
          </S.ImageContainer>
          ))}
        </S.ImagesContainer>

        <h1>Compra efetuada!</h1>
        
        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de {' '}
          {productsImages.length} camisetas já esta a caminho da sua casa.
        </p>

        <Link href='/'>
          Voltar ao catálogo
        </Link>
      </S.SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params}) => {
  
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name
  const productsImages = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product
    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImages
    }
  }
}

export default Success