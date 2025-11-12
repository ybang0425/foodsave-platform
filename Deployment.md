# 🚀 FoodSave 플랫폼 배포 및 환경 설정 가이드

## 📋 전체 프로젝트 구조

```
foodsave-platform/
├── 백엔드 (Node.js + Express)
├── 프론트엔드 (React)
├── 데이터베이스 (MariaDB)
└── 배포 (Cloudtype + GitHub)
```

## ⚠️ 중요 환경 설정 및 오류 방지 가이드

### 1. 필수 사전 준비사항

#### 1.1 Node.js 버전 확인
```bash
node --version  # v18.0.0 이상 필요
npm --version   # v8.0.0 이상 권장
```

#### 1.2 MariaDB 설치 및 설정
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mariadb-server mariadb-client

# macOS
brew install mariadb
brew services start mariadb

# Windows
# MariaDB 공식 사이트에서 다운로드 및 설치
```

### 2. 데이터베이스 초기 설정

```sql
-- MariaDB 접속
mysql -u root -p

-- 데이터베이스 생성
CREATE DATABASE foodsave_db 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- 사용자 생성 및 권한 부여
CREATE USER 'foodsave_user'@'localhost' IDENTIFIED BY 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON foodsave_db.* TO 'foodsave_user'@'localhost';
FLUSH PRIVILEGES;

-- 확인
SHOW DATABASES;
EXIT;
```

### 3. 환경 변수 설정 (.env 파일)

#### 3.1 백엔드 환경 변수 (/foodsave-platform/.env)
```env
# 서버 설정
NODE_ENV=development
PORT=5000

# 데이터베이스 설정 (중요: 실제 값으로 변경 필수!)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=foodsave_db
DB_USER=foodsave_user
DB_PASSWORD=YourSecurePassword123!

# JWT 설정 (중요: 강력한 시크릿 키 생성 필수!)
JWT_SECRET=your-super-secret-jwt-key-change-this-immediately
JWT_EXPIRE=30d

# 프론트엔드 URL
FRONTEND_URL=http://localhost:3000

# Stripe 설정 (선택사항 - 결제 기능 사용시)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...

# 이메일 설정 (선택사항)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# AdminJS 초기 관리자
ADMIN_EMAIL=admin@foodsave.com
ADMIN_PASSWORD=AdminPassword123!
```

#### 3.2 프론트엔드 환경 변수 (/foodsave-platform/client/.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### 4. 의존성 설치

#### 4.1 백엔드 의존성 설치
```bash
cd foodsave-platform
npm install

# 추가로 필요한 패키지들 (package.json에 없을 경우)
npm install express-rate-limit winston nodemailer
npm install --save-dev @types/node
```

#### 4.2 프론트엔드 의존성 설치
```bash
cd client
npm install

# Tailwind CSS 관련 추가 설치
npm install -D @tailwindcss/forms @tailwindcss/typography @tailwindcss/aspect-ratio

# React Scripts 관련 오류 발생시
npm install react-scripts@latest
```

### 5. 자주 발생하는 오류와 해결 방법

#### 5.1 bcrypt 관련 오류
```bash
# bcrypt 재빌드
npm rebuild bcrypt --build-from-source

# 또는 bcryptjs로 교체 (권장)
npm uninstall bcrypt
npm install bcryptjs
# 코드에서 require('bcrypt')를 require('bcryptjs')로 변경
```

#### 5.2 MariaDB 연결 오류
```javascript
// config/database.js 수정
dialectOptions: {
  connectTimeout: 60000,
  // SSL 설정 (Cloudtype용)
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false
}
```

#### 5.3 CORS 오류
```javascript
// server.js에서 CORS 설정 확인
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend-domain.com',
    process.env.FRONTEND_URL
  ],
  credentials: true
}));
```

#### 5.4 React 빌드 오류
```bash
# 캐시 삭제 후 재설치
cd client
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm start
```

### 6. 개발 서버 실행

#### 6.1 백엔드 서버 실행
```bash
# 개발 모드
npm run dev

# 또는 nodemon이 없을 경우
node server.js
```

#### 6.2 프론트엔드 서버 실행
```bash
cd client
npm start
# http://localhost:3000 자동 열림
```

### 7. 프로덕션 빌드 및 배포

#### 7.1 프론트엔드 빌드
```bash
cd client
npm run build
# build 폴더가 생성됨
```

#### 7.2 PM2를 사용한 프로덕션 실행
```bash
# PM2 설치
npm install -g pm2

# 서버 실행
pm2 start ecosystem.config.js --env production

# 로그 확인
pm2 logs

# 서버 중지
pm2 stop all
```

### 8. Cloudtype 배포 설정

#### 8.1 GitHub 저장소 준비
```bash
# Git 초기화
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/foodsave-platform.git
git push -u origin main
```

#### 8.2 Cloudtype 프로젝트 설정

1. Cloudtype 대시보드 접속
2. "새 프로젝트" 클릭
3. GitHub 저장소 연결
4. 빌드 설정:
   ```yaml
   name: foodsave-platform
   type: nodejs
   version: 18
   build:
     - npm install
     - cd client && npm install && npm run build && cd ..
   run: npm start
   port: 5000
   ```

#### 8.3 Cloudtype 환경 변수 설정

Cloudtype 대시보드에서 다음 환경 변수 설정:
- `NODE_ENV`: production
- `DB_HOST`: Cloudtype에서 제공하는 MariaDB 호스트
- `DB_NAME`: Cloudtype에서 생성한 DB 이름
- `DB_USER`: Cloudtype DB 사용자명
- `DB_PASSWORD`: Cloudtype DB 비밀번호
- `JWT_SECRET`: 강력한 랜덤 문자열 (최소 32자)
- 기타 필요한 환경 변수들

### 9. 데이터베이스 마이그레이션

#### 9.1 초기 테이블 생성
```javascript
// 서버 첫 실행시 자동으로 테이블 생성됨
// server.js의 sequelize.sync() 부분 확인
```

#### 9.2 시드 데이터 추가 (선택사항)
```bash
# seeders 폴더에 시드 파일 생성 후
npm run seed
```

### 10. 보안 체크리스트

- [ ] 모든 환경 변수가 .env 파일에 설정됨
- [ ] .env 파일이 .gitignore에 포함됨
- [ ] JWT_SECRET이 강력한 랜덤 문자열로 설정됨
- [ ] 데이터베이스 비밀번호가 안전하게 설정됨
- [ ] HTTPS 적용 (프로덕션)
- [ ] Rate Limiting 활성화
- [ ] CORS 설정 확인
- [ ] SQL Injection 방지 (Sequelize ORM 사용)
- [ ] XSS 방지 (React 자동 이스케이핑)
- [ ] 관리자 계정 초기 비밀번호 변경

### 11. 모니터링 및 로깅

#### 11.1 로그 확인
```bash
# 개발 환경
tail -f logs/combined.log
tail -f logs/error.log

# PM2 환경
pm2 logs
pm2 monit
```

#### 11.2 헬스체크 엔드포인트
```javascript
// server.js에 추가
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

### 12. 트러블슈팅 체크리스트

문제 발생시 확인 사항:
1. Node.js 버전이 18 이상인가?
2. 모든 npm 패키지가 설치되었는가?
3. .env 파일이 올바르게 설정되었는가?
4. MariaDB가 실행 중인가?
5. 포트(5000, 3000)가 사용 중이지 않은가?
6. 방화벽이 포트를 차단하지 않는가?

### 13. 추가 최적화 (선택사항)

#### 13.1 Redis 캐싱
```bash
npm install redis ioredis
# Redis 서버 설치 및 실행 필요
```

#### 13.2 이미지 최적화
```bash
npm install sharp multer-sharp-resizer
```

#### 13.3 압축
```bash
npm install compression
```

### 14. 백업 전략

#### 14.1 데이터베이스 백업
```bash
# 백업
mysqldump -u foodsave_user -p foodsave_db > backup_$(date +%Y%m%d).sql

# 복원
mysql -u foodsave_user -p foodsave_db < backup_20240101.sql
```

#### 14.2 파일 백업
```bash
# uploads 폴더 백업
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

---

## 📞 지원 및 문의

- 기술 지원: tech@foodsave.com
- GitHub Issues: https://github.com/logisave/foodsave-platform/issues
- 문서: https://docs.foodsave.com

## 🎯 다음 단계

1. 로컬 개발 환경 설정 완료
2. 테스트 실행
3. Cloudtype 배포
4. 도메인 연결
5. SSL 인증서 설정
6. 프로덕션 운영 시작

---
*Last Updated: 2024.11*
