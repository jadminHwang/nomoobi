# 🏗️ 노임단가 정보 웹앱

국가통계포털(KOSIS) 데이터를 활용한 개별직종 노임단가 정보 제공 웹앱입니다.

## ✨ 주요 기능

- 🔍 직종별 노임단가 검색
- 📍 지역별 필터링
- 📅 년도별 데이터 조회
- 📊 정렬 및 표시 기능
- 📱 반응형 디자인

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)를 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 🌐 배포 방법

### Vercel 배포 (추천)

1. [Vercel](https://vercel.com)에 회원가입
2. GitHub 저장소 연결
3. 환경변수 설정:
   - `REACT_APP_KOSIS_API_KEY`: KOSIS API 키

### Netlify 배포

1. [Netlify](https://netlify.com)에 회원가입
2. 빌드 폴더 업로드 또는 Git 연결
3. 환경변수 설정

## 📊 데이터 출처

- [국가통계포털(KOSIS)](https://kosis.kr)
- 개별직종 노임단가 데이터

## 🛠️ 기술 스택

- React 18 + TypeScript
- Axios (API 통신)
- CSS3 (반응형 디자인)

## 📝 라이선스

MIT License
