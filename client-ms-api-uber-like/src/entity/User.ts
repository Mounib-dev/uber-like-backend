import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum UserRole {
  CLIENT = "client",
  CHEF = "chef",
  LIVREUR = "livreur",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  constructor(
    firstName: string,
    lastName: string,
    address: string,
    phoneNumber: string,
    email: string,
    password: string,
    role: UserRole
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
