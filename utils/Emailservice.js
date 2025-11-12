const nodemailer = require('nodemailer');
const logger = require('./logger');

class EmailService {
  constructor() {
    // Create transporter based on environment
    if (process.env.NODE_ENV === 'production') {
      // Production email configuration
      this.transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT || 587,
        secure: process.env.EMAIL_PORT === '465',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
    } else {
      // Development - use Ethereal Email or console logging
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'ethereal.user@ethereal.email',
          pass: 'ethereal.pass'
        }
      });
    }
  }

  /**
   * Send email
   */
  async sendEmail(to, subject, html, text) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"FoodSave" <noreply@foodsave.com>',
        to,
        subject,
        html,
        text: text || html.replace(/<[^>]*>?/gm, '') // Strip HTML if no text provided
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      logger.info(`Email sent to ${to}: ${info.messageId}`);
      
      // Get test URL in development
      if (process.env.NODE_ENV !== 'production') {
        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
      }
      
      return info;
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw error;
    }
  }

  /**
   * Send verification email
   */
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #10b981); color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🍽️ FoodSave</h1>
            <p>이메일 인증</p>
          </div>
          <div class="content">
            <h2>안녕하세요!</h2>
            <p>FoodSave에 가입해주셔서 감사합니다.</p>
            <p>아래 버튼을 클릭하여 이메일 인증을 완료해주세요:</p>
            <div style="text-align: center;">
              <a href="${verificationUrl}" class="button">이메일 인증하기</a>
            </div>
            <p>또는 다음 링크를 브라우저에 직접 입력하세요:</p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${verificationUrl}</p>
            <p>이 링크는 24시간 동안 유효합니다.</p>
          </div>
          <div class="footer">
            <p>© 2024 FoodSave. All rights reserved.</p>
            <p>서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      email,
      'FoodSave 이메일 인증',
      html
    );
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #10b981); color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .warning { background: #fef2f2; border-left: 4px solid #ef4444; padding: 10px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 FoodSave</h1>
            <p>비밀번호 재설정</p>
          </div>
          <div class="content">
            <h2>비밀번호 재설정 요청</h2>
            <p>비밀번호 재설정을 요청하셨습니다.</p>
            <p>아래 버튼을 클릭하여 새로운 비밀번호를 설정하세요:</p>
            <div style="text-align: center;">
              <a href="${resetUrl}" class="button">비밀번호 재설정</a>
            </div>
            <p>또는 다음 링크를 브라우저에 직접 입력하세요:</p>
            <p style="word-break: break-all; background: #fff; padding: 10px; border-radius: 5px;">${resetUrl}</p>
            <div class="warning">
              <strong>⚠️ 주의:</strong> 이 요청을 하지 않으셨다면 이 이메일을 무시하세요. 귀하의 비밀번호는 변경되지 않습니다.
            </div>
            <p>이 링크는 1시간 동안 유효합니다.</p>
          </div>
          <div class="footer">
            <p>© 2024 FoodSave. All rights reserved.</p>
            <p>서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      email,
      'FoodSave 비밀번호 재설정',
      html
    );
  }

  /**
   * Send donation confirmation email
   */
  async sendDonationConfirmationEmail(email, donationDetails) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .info-box { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .info-row:last-child { border-bottom: none; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ FoodSave</h1>
            <p>기부 확인</p>
          </div>
          <div class="content">
            <h2>기부가 성공적으로 등록되었습니다!</h2>
            <p>귀하의 소중한 기부가 곧 필요한 이웃에게 전달됩니다.</p>
            
            <div class="info-box">
              <h3>기부 상세 정보</h3>
              <div class="info-row">
                <span><strong>기부 ID:</strong></span>
                <span>#${donationDetails.id}</span>
              </div>
              <div class="info-row">
                <span><strong>음식 종류:</strong></span>
                <span>${donationDetails.foodType}</span>
              </div>
              <div class="info-row">
                <span><strong>수량:</strong></span>
                <span>${donationDetails.quantity} ${donationDetails.unit}</span>
              </div>
              <div class="info-row">
                <span><strong>픽업 시간:</strong></span>
                <span>${donationDetails.pickupTime}</span>
              </div>
              <div class="info-row">
                <span><strong>상태:</strong></span>
                <span style="color: #10b981; font-weight: bold;">매칭 대기중</span>
              </div>
            </div>
            
            <p>매칭이 완료되면 알림을 보내드리겠습니다.</p>
          </div>
          <div class="footer">
            <p>© 2024 FoodSave. All rights reserved.</p>
            <p>서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      email,
      'FoodSave - 기부 등록 확인',
      html
    );
  }

  /**
   * Send matching notification email
   */
  async sendMatchingNotificationEmail(email, matchingDetails) {
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Noto Sans KR', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #10b981); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .success-box { background: #d1fae5; border: 2px solid #10b981; padding: 20px; border-radius: 10px; margin: 20px 0; text-align: center; }
          .info-box { background: white; padding: 20px; border-radius: 10px; margin: 20px 0; }
          .button { display: inline-block; padding: 12px 30px; background: linear-gradient(135deg, #3b82f6, #10b981); color: white; text-decoration: none; border-radius: 25px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 FoodSave</h1>
            <p>매칭 성공!</p>
          </div>
          <div class="content">
            <div class="success-box">
              <h2 style="color: #059669; margin: 0;">매칭이 완료되었습니다!</h2>
            </div>
            
            <p>귀하의 기부가 ${matchingDetails.foodBankName}와 성공적으로 매칭되었습니다.</p>
            
            <div class="info-box">
              <h3>매칭 정보</h3>
              <p><strong>푸드뱅크:</strong> ${matchingDetails.foodBankName}</p>
              <p><strong>주소:</strong> ${matchingDetails.address}</p>
              <p><strong>연락처:</strong> ${matchingDetails.contact}</p>
              <p><strong>픽업 코드:</strong> <span style="font-size: 24px; font-weight: bold; color: #3b82f6;">${matchingDetails.pickupCode}</span></p>
            </div>
            
            <p style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/dashboard/matching/${matchingDetails.id}" class="button">매칭 상세보기</a>
            </p>
            
            <p><strong>다음 단계:</strong></p>
            <ol>
              <li>정해진 시간에 음식을 준비해주세요</li>
              <li>푸드뱅크 담당자가 픽업 시 코드를 확인할 예정입니다</li>
              <li>전달이 완료되면 확인 알림을 받으실 수 있습니다</li>
            </ol>
          </div>
          <div class="footer">
            <p>© 2024 FoodSave. All rights reserved.</p>
            <p>서울특별시 강남구 테헤란로 123</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail(
      email,
      'FoodSave - 매칭 완료 알림',
      html
    );
  }
}

module.exports = new EmailService();
