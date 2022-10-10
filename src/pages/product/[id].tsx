import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/future/image'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { IProduct } from '../../contexts/CartContext'
import { useCart } from '../../hooks/useCart'
import { stripe } from '../../lib/stripe'
import * as S from '../../styles/pages/product'

type ProductProps = {
  product: IProduct
}

const Product = ({ product }: ProductProps) => {
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  const { isFallback } = useRouter()

  const { addToCart, checkIfItemAlreadyExists } = useCart()

  if (isFallback) {
    return <p>Loading...</p>
  }

  const itemAlreadyInCart = checkIfItemAlreadyExists(product.id)

  return (
    <>
      <Head>
       <title>{product.name} | Ignite Shop</title>
      </Head>
    
      <S.ProductContainer>
        <S.ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt='' />
        </S.ImageContainer>

        <S.ProductDetails>
          <h1>{product.name}</h1>
          <span>{product.price}</span>

          <p>
            {product.description}
          </p>

          <button disabled={itemAlreadyInCart} onClick={() => addToCart(product)}>{itemAlreadyInCart
            ? 'Produto já está no carrinho'
            : 'Colocar na sacola'
          }</button>
        </S.ProductDetails>
      </S.ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_MVjeqgOH3nhODT' } }
    ],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pr-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(price.unit_amount / 100),
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}

export default Product