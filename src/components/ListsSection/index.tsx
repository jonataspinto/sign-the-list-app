import { ILists } from '../../types/IList'
import { ListCard } from '../ListCard'

type ListsProps = {
  data: ILists
}

export const ListsSection = ({ data }: ListsProps) => {
  const keys = data.lists ? Object.keys(data?.lists) : []

  return (
    <div>
      Listas
      {keys.map((key) => (
        <div key={data.lists[key].id}>
          <ListCard list={data.lists[key]} />
        </div>
      ))}
    </div>
  )
}
