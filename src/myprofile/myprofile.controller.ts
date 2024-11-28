import { Controller, Get, Param, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MyprofileService } from './myprofile.service';
import { GetMainQuestionDTO } from './dto/myprofile.dto';

@Controller('myprofile')
@UseGuards(AuthGuard())
export class MyprofileController {
    constructor(
        private myprofileService: MyprofileService,
    ){}
    @Get("/:caseId")
    async getMainQuestion(
        @Param() getMainQuestionDTO: GetMainQuestionDTO
    ){
        const {caseId} = getMainQuestionDTO;
        return await this.myprofileService.getMainQuestion(caseId);
    }
}
