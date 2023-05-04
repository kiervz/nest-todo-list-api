export class CreateTodoCommand {
  constructor(public readonly name: string, public readonly due_date: Date) {}
}
