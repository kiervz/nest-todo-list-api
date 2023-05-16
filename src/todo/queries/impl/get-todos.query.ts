export class GetTodosQuery {
  constructor(public readonly page: number, public readonly limit: number) {}
}
