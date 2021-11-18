import { Link } from 'react-router-dom'
import { IList } from '../../types/IList'
import * as S from './ListCardStyled'

type ListCardProps = {
  list: IList
}

export const ListCard = ({ list }: ListCardProps) => {
  return (
    <S.ListCardWrapper>
      <S.ListCardTitle>{list.name}</S.ListCardTitle>
      <S.ListCardEmail>{list.email}</S.ListCardEmail>
      <S.ListCardPhone>{list.phoneNumber}</S.ListCardPhone>
      <Link
        to={`/list/${list.id}`}
      >
        <button>Ver lista</button>
      </Link>
      
    </S.ListCardWrapper>
  )
}
