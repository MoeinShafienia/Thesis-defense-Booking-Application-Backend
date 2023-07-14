import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  async sendAddMeetingEmail(user: any) {
    let text = `دانشجوی گرامی جلسه دفاع شما در سامانه ثبت شد لطفا نسبت به انتخاب اساتید دفاع خود اقدام فرمایید`;
    let subject = `جلسه دفاع`;

    this.sendEmail(user.email, subject, text);
  }

  async sendAddProfessorEmail(studentName: any, professorEmail: any) {
    let text = `با سلام شما به جلسه دفاع دانشجو ${studentName} دعوت شده اید لطفا ساعت های خالی خود را از طریق این لینک مشخص کنید`;
    let subject = `لینک دعوت به جلسه دفاع`;

    this.sendEmail(professorEmail, subject, text);
  }

  async sendFinilizedEmail(
    finalDatetime: any,
    studentName: any,
    professors: any[],
  ) {
    let text = `به اطلاع میرسانیم جلسه دفاع آقا/خانم ${studentName} در تاریخ و ساعت ${finalDatetime} نهایی شده و منتظر حضور گرم شما هستیم`;
    let subject = `نهایی شدن جلسه دفاع`;

    professors.forEach((p) => this.sendEmail(p.email, subject, text));
  }

  async sendEmail(email, subject, text) {
    console.log(email);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'moein.shafienia.uni@gmail.com',
        pass: 'llkerwekbxbpqxjo',
      },
    });

    const mailOptions = {
      from: 'moein.shafienia.uni@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        // do something useful
      }
    });
  }
}


