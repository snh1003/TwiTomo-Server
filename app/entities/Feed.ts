import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn} from 'typeorm'

@Entity()
export class Feed extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    title!: string;

    @Column()
    name!:string

    @Column()
    profile!: string

    @Column("varchar",{array: true})
    tag!: string[]

    @Column()
    location! : string

    @Column()
    day! : Date

    @Column()
    Money! : number

    @Column()
    People! : string

    @Column()
    content!: string

    @Column()
    photo: string = '';

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @Column("varchar",{array: true})
    join : string[] =  []

}
export default Feed