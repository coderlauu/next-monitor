import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { ApplicationEntity } from './application.entity'

@Entity('admin')
export class AdminEntity {
    /**
     * 主键
     */
    @PrimaryGeneratedColumn()
    id: number

    /**
     * 用户名
     */
    @Column({
        type: 'varchar',
        length: 20,
    })
    username: string

    /**
     * 密码
     */
    @Column({
        type: 'varchar',
        length: 20,
    })
    password: string

    /**
     * 邮箱
     */
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    email: string

    /**
     * 手机号
     */
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    phone: string

    /**
     * 头像
     */
    @Column({
        type: 'varchar',
        length: 20,
        nullable: true,
    })
    avatar: string

    /**
     * 创建时间
     */
    @Column({
        nullable: true,
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
        nullable: true,
        default: false,
    })
    isDeleted: boolean

    @OneToMany(() => ApplicationEntity, application => application.user)
    applications: ApplicationEntity[]
}
