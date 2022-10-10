import { ComponentProps } from 'react'
import * as S from './styles'

type ProductSkeletonProps = ComponentProps<typeof S.ProductSkeletonContainer>



export const ProductSkeleton = ({...props}: ProductSkeletonProps) => {
  return (
    <S.ProductSkeletonContainer {...props}>
      <S.SkeletonItem />
      <div>
        <S.SkeletonItem />
        <S.SkeletonItem />
      </div>
    </S.ProductSkeletonContainer>
  )
}