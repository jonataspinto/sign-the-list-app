export interface IObjectLiteral<T> {
  [key: string]: T
}

export interface IObjectLiteralReducer<T, M> {
  [key: string]: (state: T, action: M) => T
}
