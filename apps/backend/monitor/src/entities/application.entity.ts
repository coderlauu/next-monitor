import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { AdminEntity } from './admin.entity'

@Entity('application')
export class ApplicationEntity {
    /**
     * 用于自实例化实体初始化
     * @param partial
     */
    constructor(partial: Partial<ApplicationEntity>) {
        Object.assign(this, partial)
    }

    /**
     * 主键
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 应用ID
     */
    @Column({
        type: 'varchar',
        length: 20,
    })
    appId: string

    /**
     * 应用类型
     */
    @Column({
        type: 'enum',
        enum: ['vanilla', 'react', 'vue'],
    })
    type: 'vanilla' | 'react' | 'vue'

    /**
     * 应用名称
     */
    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string

    /**
     * 应用描述
     */
    @Column({
        type: 'text',
        nullable: true,
    })
    description: string

    /**
     * 创建时间
     */
    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt?: Date

    /**
     * 更新时间
     */
    @Column({
        nullable: true,
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt?: Date

    /**
     * 是否删除
     */
    @Column({
        type: 'boolean',
        default: false,
    })
    isDeleted: boolean

    @ManyToOne(() => AdminEntity, admin => admin.applications)
    user: AdminEntity
}
