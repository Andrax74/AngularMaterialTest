
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
}

export interface ITransazioni {
  id: number
  data: Date
  puntoVendita: string
  bollini: number
}
