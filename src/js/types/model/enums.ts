// Enums and constants for Ticket module

export enum TicketStatusEnum {
  New = 'new',
  InProgress = 'in_progress',
  Closed = 'closed',
}

export enum TicketPriorityEnum {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
}

export const statusOptions = [
  { label: 'Nowe', value: TicketStatusEnum.New },
  { label: 'W trakcie', value: TicketStatusEnum.InProgress },
  { label: 'Zamknięte', value: TicketStatusEnum.Closed },
]

export const priorityOptions = [
  { label: 'Niski', value: TicketPriorityEnum.Low },
  { label: 'Średni', value: TicketPriorityEnum.Medium },
  { label: 'Wysoki', value: TicketPriorityEnum.High },
]

export const priorityLabel = (priority: TicketPriorityEnum): string => {
  if (priority === TicketPriorityEnum.Low) {
    return 'Niski'
  }

  if (priority === TicketPriorityEnum.Medium) {
    return 'Średni'
  }

  if (priority === TicketPriorityEnum.High) {
    return 'Wysoki'
  }

  return String(priority)
}
