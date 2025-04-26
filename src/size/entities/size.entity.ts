import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "src/product/entities/product.entity";

@Entity()
export class SizeEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 5, nullable: false })
    size: string;

    @ManyToMany(() => Product, (product) => product.size)
    @JoinTable()
    products: Product[];
    
}
