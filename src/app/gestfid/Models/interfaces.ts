
export interface IClienti {
  codFid: string
  nominativo: string
  comune: string
  idAvatar: string
  stato: number
  transazioni: Array<ITransazioni>
}

export interface IClienti2 {
  codFid: string
  nominativo: string
  comune: string
  idAvatar: string
  stato: string
  bollini: number
  spese: number
  dataSpesa: Date
  transazioni: Array<ITransazioni>
}

export interface ITransazioni {
  id: number
  data: Date
  puntoVendita: string
  bollini: number
}

export interface IMessage {
  messaggio: string
}

export interface IStatoCliente {
  value: number;
  viewValue: string;
}

export class BookTrackerError {
  errorNumber: number;
  message: string;
  friendlyMessage: string;
}
