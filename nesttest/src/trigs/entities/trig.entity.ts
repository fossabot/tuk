import { Geometry, Point } from 'geojson';

import { Photo } from "src/photos/entities/photo.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn,  UpdateDateColumn, Generated, VersionColumn, Index } from "typeorm";

@Entity()
export class Trig {

  @PrimaryGeneratedColumn("identity") 
  id: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  waypoint?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'numeric', precision: 12, scale: 8, nullable: true })
  wgs_lat?: number;

  @Column({ type: 'numeric', precision: 12, scale: 8, nullable: true })
  wgs_lon?: number;

  @Column({ type: 'numeric', precision: 8, scale: 3, nullable: true })
  wgs_height?: number;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  osgb_eastings?: number;

  @Column({ type: 'numeric', precision: 12, scale: 3, nullable: true })
  osgb_northings?: number;

  @Column({ type: 'numeric', precision: 8, scale: 3, nullable: true })
  osgb_height?: number;



  @Index({ spatial: true })
  @Column({ type: 'geography', spatialFeatureType: "Point", srid: 4326, nullable: false })
  wgs_point: Point;




  // Maybe create abstract class for these columns?
  @CreateDateColumn()
  crt_timestamp?: Date;

  @UpdateDateColumn()
  upd_timestamp?: Date;

  @VersionColumn({type: 'numeric', default: 0 })
  upd_count?: number;

  @Column()
  @Generated("uuid")
  uuid: string;



  @OneToMany(type => Photo, photo => photo.trig)
  photos: Photo[];
}
