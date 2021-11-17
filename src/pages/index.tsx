import { ListsSection } from '../components/ListsSection'
import { useEffect, useState } from 'react'
import { getLists } from '../services/api'
import { ILists } from '../types/IList'

export const Home = () => {
  const [lists, setLists] = useState<ILists>({} as ILists)

  useEffect(() => {
    getLists((response) => setLists(response))
  }, [])

  return <ListsSection data={lists} />
}
