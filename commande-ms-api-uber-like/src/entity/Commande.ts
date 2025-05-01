import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum Status {
  EN_ATTENTE = "en attente",
  EN_PREPARATION = "en préparation",
  PRET = "prêt",
  LIVRE = "livré",
}

@Entity()
export class Commande {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  clientId!: number;
  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }) // ✅ Correction ici
  date!: Date;

  @Column("json")
  plats!: {
    id: number;
    nom: string;
    quantite: number;
    prix: number;
  }[];

  @Column({
    type: "enum",
    enum: Status,
    default: Status.EN_ATTENTE,
  })
  status!: Status;

  constructor(
    clientId: number,
    date: Date = new Date() ,
    plats: { id: number; nom: string; quantite: number; prix: number }[],
    status: Status = Status.EN_ATTENTE
  ) {
    this.clientId = clientId;
    this.plats = plats;
    this.status = status;
    this.date= date
  }
}
