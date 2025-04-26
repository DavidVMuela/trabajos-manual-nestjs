import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 50, nullable: false })
    name: string;

    @Column('varchar', { length: 50, nullable: false })
    last_name: string;

    @Column('varchar', { length: 50,  nullable: false })
    email: string;

    @Column('date', { nullable: false })
    birthday: Date;

    @OneToMany(() => Product, (product) => product.user)
    products: Product[];
}