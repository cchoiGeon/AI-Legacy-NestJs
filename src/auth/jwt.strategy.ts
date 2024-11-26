import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "../user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey:"123456",
            jwtFromRequest: ExtractJwt.fromExtractors([(request) => {
                // 쿠키에서 JWT 추출
                return request?.cookies?.accessToken || null;
            }]),
        });
    }

    async validate(payload) {
        const { uuid } = payload;

        const user: User = await this.userRepository.findOne({ where: { uuid } });
        if(!user) {
            throw new UnauthorizedException();
        }

        return user.uuid;
    }
}