import { ILists } from '../types/IList'
import firebase from './firebase'

export const getLists = (callback:(data: ILists) => void) => {
  let data: ILists = {} as ILists
  firebase
    .database()
    .ref('dev')
    .on('value', (snapshot) => {
      const response = snapshot.val() as ILists

      data = response

      callback(response)
    })

  return data
}
