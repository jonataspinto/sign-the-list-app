export interface IObjectLiteral<T> {
  [key: string]: T
}

export interface IObjectLiteralReducer<T, N, M> {
  [key: string]: (state: N, action: M) => T
}
