import { Entity, Column, PrimaryColumn } from "typeorm";

export enum Status {
  EN_ATTENTE = "en attente",
  EN_PREPARATION = "en préparation",
  PRET = "prêt",
  EN_LIVRAISON = "en cours de livraison",
  LIVRE = "livré",
}

@Entity()
export class Commande {
  @PrimaryColumn()
  id!: number;

  @Column()
  clientId!: number;

  @Column("json")
  plats!: {
    id: number;
    name: string;
    quantité: number;
    price: number;
  }[];

  @Column({
    type: "enum",
    enum: Status,
    default: Status.EN_ATTENTE,
  })
  status!: Status;

  constructor(
    clientId: number,
    plats: { id: number; name: string; quantité: number; price: number }[],
    status: Status = Status.EN_ATTENTE
  ) {
    this.clientId = clientId;
    this.plats = plats;
    this.status = status;
  }
}
