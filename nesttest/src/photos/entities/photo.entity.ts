import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Photo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer'})
  user: number;

  @Column({ type: 'integer'})
  trig: number;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column({ type: 'integer'})
  width: number;

  @Column({ type: 'integer'})
  height: number;

}
