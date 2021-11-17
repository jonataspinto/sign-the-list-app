import { IObjectLiteral } from './ObjectLiteral'

export type RawFile = {
  path: string
}

export type Image = {
  rawFile: RawFile
  src: string
  title: string
}

export type Item = {
  description: string
  image: Image
  name: string
}

export type IList = {
  email: string
  id: string
  image: Image
  items: Item[]
  name: string
  phone: string
}

export type ILists = {
  lists: IObjectLiteral<IList>
}
