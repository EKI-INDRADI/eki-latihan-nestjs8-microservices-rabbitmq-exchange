import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity({ name: 'main_product' })
export class Product {
    // @PrimaryGeneratedColumn()
    // https://stackoverflow.com/questions/69474337/error-creating-entity-with-nestjs-typeorm-and-postgresql
    @PrimaryColumn()
    id: string

    @Column()
    barcode: string

    @Column()
    sku: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price_purchase: number

    @Column()
    price_sale: number

    @Column()
    price_msrp: number

    @Column()
    price_net: number

    @Column()
    image_filename_ext: string

    // @CreateDateColumn()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date

    // @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" }) 
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at: Date

    // @ManyToOne(() => User, data => data.id) // User dari entities
    // user: User // dari entities


    // @ManyToOne(() => User, data => data.id) // User dari entities

    @Column()
    user: string // dari entities
}
