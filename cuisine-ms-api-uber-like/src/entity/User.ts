import { Entity, Column, PrimaryColumn } from "typeorm";

export enum UserRole {
  CLIENT = "client",
  CHEF = "chef",
  LIVREUR = "livreur",
}

@Entity()
export class User {
  @PrimaryColumn()
  id!: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    role: UserRole
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.role = role;
  }
}
