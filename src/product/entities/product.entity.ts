import { SizeEntity } from "src/size/entities/size.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('varchar', { length: 50, nullable: false })
    description: string;

    @Column('date', { nullable: false })
    created_at: Date;

    @Column('date', { nullable: false })
    updated_at: Date;

    @Column()
    userId: number;

    @ManyToOne(() => User, (user) => user.products, {eager: true})
    @JoinColumn({ name: 'userId' })
    user: User;

    @JoinTable()
    @ManyToMany(() => SizeEntity, (size) => size.products, {eager: true})
    size: SizeEntity[];

}
