import { Column, Generated, PrimaryColumn } from "typeorm"

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
    price_selling: number

    @Column()
    price_msrp: number

    @Column()
    image_filename: string

    // @CreateDateColumn()
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    created_at: Date

    // @UpdateDateColumn({ onUpdate: "CURRENT_TIMESTAMP(6)" }) 
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updated_at: Date

    // @ManyToOne(() => User, data => data.id) // User dari entities
    // user: User // dari entities


    // @ManyToOne(() => User, data => data.id) // User dari entities

    @Column()
    user_obj_string: string // dari entities
}
