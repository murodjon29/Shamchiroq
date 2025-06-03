
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import config from "src/config";

@Injectable()
export class MailService{
    constructor(private readonly mailService: MailerService) {}

    async sendOTP(email: string, otp: string): Promise<void>{
        await this.mailService.sendMail({
            from: config.MAIL_USER,
            to: email,
            subject: 'Shamchiroq login',
            text: otp
        })
    }

}