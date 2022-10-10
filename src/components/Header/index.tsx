import Image from "next/future/image"
import { useRouter } from "next/router"
import logoImg from '../../assets/logo.svg'
import Cart from "../Cart"
import * as S from './styles'

 const Header = () => {
  const { pathname } = useRouter()

  const showCartButton = pathname !== '/success'
  return (
    <S.HeaderContainer>
      <Image src={logoImg} alt="" />
      <Cart />
      {showCartButton && <Cart />}
    </S.HeaderContainer>
  )
}

export default Header