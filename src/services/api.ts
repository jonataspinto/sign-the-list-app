import { IList } from '../types/IList'
import { IObjectLiteral } from '../types/ObjectLiteral'
import firebase from './firebase'

export const getLists = (callback:(data: IObjectLiteral<IList>) => void) => {
  let data: IObjectLiteral<IList> = {} as IObjectLiteral<IList>
  firebase
    .database()
    .ref('dev')
    .on('value', (snapshot) => {
      const response = snapshot.val() as IObjectLiteral<IList>

      data = response

      callback(response)
    })

  return data
}