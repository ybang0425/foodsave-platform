# 🍽️ FoodSave - AI 기반 제약형 푸드 셰어링 플랫폼

[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.2.0-blue.svg)](https://reactjs.org/)
[![MariaDB](https://img.shields.io/badge/MariaDB-v10.6+-orange.svg)](https://mariadb.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 📋 목차
- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [프로젝트 구조](#-프로젝트-구조)
- [설치 방법](#-설치-방법)
- [환경 설정](#-환경-설정)
- [실행 방법](#-실행-방법)
- [API 문서](#-api-문서)
- [데이터베이스 구조](#-데이터베이스-구조)
- [배포](#-배포)
- [트러블슈팅](#-트러블슈팅)
- [기여 방법](#-기여-방법)
- [라이선스](#-라이선스)

## 🎯 프로젝트 소개

FoodSave는 AI 기술을 활용한 제약형 푸드 셰어링 플랫폼으로, 소상공인과 푸드뱅크를 연결하여 음식물 낭비를 줄이고 지역사회에 온기를 전달합니다.

### 팀 정보
- **팀명**: LogiSave (Logic + Save)
- **프로젝트명**: FoodSave
- **개발 기간**: 2024.11 - 2025.01

## ✨ 주요 기능

### 1. AI 기반 매칭 시스템
- 실시간 최적 매칭 알고리즘
- 규제 자동 검증 시스템
- 스마트 추천 엔진

### 2. 사용자별 대시보드
- **소상공인**: 기부 관리, 통계, 리포트
- **푸드뱅크**: 수령 관리, 재고, 수요 예측
- **관리자**: AdminJS 기반 통합 관리

### 3. 실시간 추적 시스템
- GPS 기반 실시간 위치 추적
- QR 코드 검증
- 투명한 기부 이력 관리

### 4. 구독 및 결제
- Stripe 연동 결제 시스템
- 티어별 구독 모델
- 자동 청구 관리

## 🛠 기술 스택

### Backend
- **Runtime**: Node.js v18+
- **Framework**: Express.js
- **Database**: MariaDB 10.6+
- **ORM**: Sequelize
- **Admin**: AdminJS
- **Payment**: Stripe API
- **Auth**: JWT

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **State**: Zustand
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Maps**: Leaflet
- **HTTP**: Axios

### DevOps
- **CI/CD**: GitHub Actions
- **Hosting**: Cloudtype
- **Container**: Docker
- **Monitoring**: PM2

## 📁 프로젝트 구조

```
foodsave-platform/
├── 📄 README.md
├── 📄 package.json
├── 📄 .env.example
├── 📄 .gitignore
├── 📄 server.js
├── 📄 ecosystem.config.js
├── 📄 Dockerfile
├── 📄 docker-compose.yml
│
├── 📂 config/
│   ├── database.js
│   ├── stripe.js
│   └── constants.js
│
├── 📂 models/
│   ├── index.js
│   ├── User.js
│   ├── Business.js
│   ├── FoodBank.js
│   ├── Donation.js
│   ├── Matching.js
│   └── Violation.js
│
├── 📂 routes/
│   ├── auth.js
│   ├── users.js
│   ├── businesses.js
│   ├── foodBanks.js
│   ├── donations.js
│   ├── matching.js
│   ├── subscriptions.js
│   └── regulations.js
│
├── 📂 controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── businessController.js
│   ├── foodBankController.js
│   ├── donationController.js
│   ├── matchingController.js
│   ├── subscriptionController.js
│   └── regulationController.js
│
├── 📂 middleware/
│   ├── auth.js
│   ├── validate.js
│   ├── errorHandler.js
│   └── rateLimiter.js
│
├── 📂 utils/
│   ├── emailService.js
│   ├── smsService.js
│   ├── aiMatcher.js
│   ├── regulationChecker.js
│   └── logger.js
│
├── 📂 database/
│   ├── 📂 migrations/
│   └── 📂 seeders/
│
├── 📂 public/
│   └── uploads/
│
├── 📂 client/
│   ├── 📄 package.json
│   ├── 📄 tailwind.config.js
│   ├── 📄 postcss.config.js
│   ├── 📄 .env.example
│   │
│   ├── 📂 public/
│   │   ├── index.html
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   └── 📂 src/
│       ├── 📄 index.js
│       ├── 📄 App.js
│       │
│       ├── 📂 pages/
│       │   ├── HomePage.js
│       │   ├── LoginPage.js
│       │   ├── RegisterPage.js
│       │   ├── DashboardPage.js
│       │   ├── DonationsPage.js
│       │   ├── FoodBanksPage.js
│       │   ├── AboutPage.js
│       │   └── ContactPage.js
│       │
│       ├── 📂 components/
│       │   ├── Navbar.js
│       │   ├── Footer.js
│       │   ├── HeroSection.js
│       │   ├── FeatureCard.js
│       │   ├── StatsSection.js
│       │   ├── TestimonialSlider.js
│       │   ├── ProtectedRoute.js
│       │   ├── LoadingSpinner.js
│       │   └── ErrorBoundary.js
│       │
│       ├── 📂 services/
│       │   ├── api.js
│       │   ├── auth.service.js
│       │   └── donation.service.js
│       │
│       ├── 📂 hooks/
│       │   ├── useAuth.js
│       │   ├── useApi.js
│       │   └── useGeolocation.js
│       │
│       ├── 📂 store/
│       │   ├── authStore.js
│       │   └── appStore.js
│       │
│       ├── 📂 styles/
│       │   └── globals.css
│       │
│       └── 📂 utils/
│           ├── constants.js
│           ├── validators.js
│           └── formatters.js
│
└── 📂 tests/
    ├── 📂 unit/
    └── 📂 integration/
```

## 🚀 설치 방법

### 필수 요구사항
- Node.js v18.0.0 이상
- MariaDB 10.6 이상
- npm 또는 yarn
- Git

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/foodsave-platform.git
cd foodsave-platform
```

### 2. 의존성 설치
```bash
# 백엔드 의존성 설치
npm install

# 프론트엔드 의존성 설치
cd client
npm install
cd ..
```

### 3. 데이터베이스 설정
```sql
CREATE DATABASE foodsave_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'foodsave_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON foodsave_db.* TO 'foodsave_user'@'localhost';
FLUSH PRIVILEGES;
```

## ⚙️ 환경 설정

### 1. 환경 변수 설정

`.env.example` 파일을 `.env`로 복사하고 수정:

```bash
cp .env.example .env
```

**중요 환경 변수 설명:**

```env
# 서버 설정
NODE_ENV=development  # production으로 변경 시 보안 강화
PORT=5000             # Cloudtype에서는 자동 할당

# 데이터베이스 (MariaDB)
DB_HOST=localhost     # Cloudtype: 제공된 호스트 사용
DB_PORT=3306         
DB_NAME=foodsave_db   # Cloudtype: 자동 생성된 DB명 사용
DB_USER=your_user     # Cloudtype: 제공된 사용자명
DB_PASSWORD=your_pass # Cloudtype: 제공된 비밀번호

# JWT (보안상 강력한 키 사용 필수)
JWT_SECRET=generate_strong_secret_key_here # openssl rand -base64 32
JWT_EXPIRE=30d

# Stripe (실제 운영 시 본인 키 사용)
STRIPE_SECRET_KEY=sk_test_... # Stripe 대시보드에서 확인
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 2. 클라이언트 환경 설정

`client/.env` 파일 생성:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

## 🎮 실행 방법

### 개발 모드
```bash
# 백엔드 서버 실행
npm run dev

# 새 터미널에서 프론트엔드 실행
cd client
npm start
```

### 프로덕션 모드
```bash
# 클라이언트 빌드
cd client
npm run build
cd ..

# PM2로 서버 실행
npm run start:prod
```

## 🐳 Docker 실행

```bash
# 이미지 빌드 및 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f
```

## 📡 API 엔드포인트

### 인증
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/refresh` - 토큰 갱신
- `POST /api/auth/logout` - 로그아웃

### 기부 관리
- `GET /api/donations` - 기부 목록 조회
- `POST /api/donations` - 새 기부 등록
- `GET /api/donations/:id` - 기부 상세 조회
- `PUT /api/donations/:id` - 기부 정보 수정
- `DELETE /api/donations/:id` - 기부 취소

### 매칭
- `POST /api/matching/auto` - AI 자동 매칭
- `GET /api/matching/suggestions` - 매칭 제안 조회
- `POST /api/matching/accept/:id` - 매칭 수락
- `POST /api/matching/reject/:id` - 매칭 거절

## 🗄️ 데이터베이스 마이그레이션

```bash
# 마이그레이션 실행
npm run migrate

# 마이그레이션 롤백
npm run migrate:undo

# 시드 데이터 추가
npm run seed
```

## 🚢 Cloudtype 배포

### 1. GitHub 연동
1. GitHub에 코드 푸시
2. Cloudtype 대시보드에서 GitHub 저장소 연결

### 2. 환경 변수 설정
Cloudtype 대시보드에서 환경 변수 설정:
- MariaDB 연결 정보 입력
- JWT 시크릿 키 설정
- Stripe API 키 설정

### 3. 빌드 설정
```yaml
# cloudtype.yml
name: foodsave-platform
type: nodejs
version: 18
build:
  - npm install
  - cd client && npm install && npm run build
run: npm start
port: 5000
```

## 🐛 트러블슈팅

### 일반적인 오류 해결

#### 1. MariaDB 연결 오류
```
Error: ER_ACCESS_DENIED_ERROR
```
**해결**: `.env` 파일의 DB 정보 확인, 사용자 권한 확인

#### 2. CORS 오류
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**해결**: `server.js`의 CORS 설정 확인

#### 3. bcrypt 오류 (Node 버전 불일치)
```
Error: The module was compiled against a different Node.js version
```
**해결**:
```bash
npm rebuild bcrypt
# 또는
npm uninstall bcrypt
npm install bcrypt
```

#### 4. 포트 사용 중 오류
```
Error: listen EADDRINUSE: address already in use :::5000
```
**해결**:
```bash
# Linux/Mac
lsof -i :5000
kill -9 [PID]

# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F
```

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 팀원

- **팀장**: [이름] - 백엔드 개발
- **팀원1**: [이름] - 프론트엔드 개발
- **팀원2**: [이름] - AI/ML 개발
- **팀원3**: [이름] - UI/UX 디자인

## 📞 문의

- 이메일: contact@foodsave.com
- 웹사이트: https://foodsave.com
- GitHub: https://github.com/logisave/foodsave-platform

---
Made with ❤️ by LogiSave Team
