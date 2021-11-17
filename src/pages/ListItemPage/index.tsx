import React from 'react'
import { useParams } from 'react-router'
import { IList } from '../../types/IList'

interface Props {
  list: IList
}

export const ListItemPage: React.FC<Props> = () => {
  const params = useParams<{ id: string }>();

  return <div>teste{ params.id }</div>
}
