# 프로젝트 안정화 가이드 (Number App)

## ⚠️ 이전 이슈 (해결됨)
tailwindcss resolve 에러는 Turbopack이 workspace root를 잘못 감지하여 발생.
`next.config.ts`에 `turbopack.root`를 명시 설정하여 해결.

---

## 공동작업 시 반드시 지킬 것

### 1. 처음 클론 후 또는 pull 후
```sh
npm install
npm run dev
```

### 2. 패키지 추가/제거 시
```sh
npm install <패키지명>   # 추가
npm uninstall <패키지명>  # 제거
# package.json과 package-lock.json 둘 다 커밋할 것!
```

### 3. tailwindcss 에러 발생 시 (비상)
```sh
rm -rf node_modules .next
npm install
npm run dev
```

### 4. Node 버전
- `.nvmrc` 파일에 Node 22로 고정됨
- `nvm use` 명령어로 맞출 수 있음

---

## Netlify 배포
- `netlify.toml` 설정 포함됨
- Node 22, `@netlify/plugin-nextjs` 사용
- `npm run build` 명령어로 빌드

---

## 금지 사항
- ❌ `package.json`이나 `package-lock.json`을 `.gitignore`에 넣지 말 것
- ❌ 홈 디렉토리(`~/`)에 `package.json`이나 `node_modules`를 만들지 말 것
- ❌ `sudo npm install` 사용 금지 (캐시 권한 꼬임)