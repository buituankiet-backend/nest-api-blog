import { Exclude, classToPlain } from 'class-transformer';
import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity } from "typeorm";
import { AbstractEntity } from "./abstract-entity";
import argon2 from 'argon2';

@Entity('users')
export class UserEntity extends AbstractEntity {
    @Column( {unique: true})
    @IsEmail()
    email: string;

    @Column( {unique: true})
    username: string;

    @Column( {default: ''})
    bio: string;

    @Column( { default: null, nullable: true})
    image: null | string;

    @Column()
    @Exclude()
    password: string;

    //TODO: add following
    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    toJSON() {
        return classToPlain(this);
    }

    async comparePassword(attempt: string) {
        return await argon2.verify(attempt, this.password);
    }
}