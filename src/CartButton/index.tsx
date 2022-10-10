import { Handbag } from 'phosphor-react'
import { ComponentProps } from 'react'
import * as S from './styles'

type CartButtonProps = ComponentProps<typeof S.CartButtonContainer>

const CartButton = ({ ...rest }: CartButtonProps) => {
  return (
    <S.CartButtonContainer {...rest}>
      <Handbag weight="bold" />
    </S.CartButtonContainer>
  )
}

export default CartButton