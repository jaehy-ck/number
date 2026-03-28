<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>난수 생성기 | Random Number Generator</title>
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700&family=Noto+Sans+JP:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --background: #1a1a2e;
      --foreground: #f5f5f5;
      --card: #252542;
      --card-foreground: #f5f5f5;
      --primary: #e07a3a;
      --primary-foreground: #f5f5f5;
      --secondary: #2d2d4a;
      --secondary-foreground: #f5f5f5;
      --muted: #3a3a5c;
      --muted-foreground: #a0a0a0;
      --border: #3d3d5c;
      --destructive: #ef4444;
      --radius: 0.75rem;
    }

    body {
      font-family: 'Noto Sans', sans-serif;
      background: var(--background);
      color: var(--foreground);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .font-jp {
      font-family: 'Noto Sans JP', sans-serif;
    }

    .screen {
      display: none;
      width: 100%;
    }

    .screen.active {
      display: block;
    }

    #mode-screen {
      max-width: none;
      height: 100vh;
      position: fixed;
      inset: 0;
      display: none;
      background: linear-gradient(135deg, #1e3a5f 0%, #1a1a2e 50%, #4a1a3d 100%);
    }

    #mode-screen.active {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .mode-container {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: relative;
    }

    .character {
      position: absolute;
      bottom: 10%;
      height: 60%;
      max-height: 450px;
      object-fit: contain;
      pointer-events: none;
      z-index: 1;
    }

    .character-left {
      left: 8%;
    }

    .character-right {
      right: 8%;
    }

    @media (max-width: 1100px) {
      .character {
        height: 45%;
        max-height: 350px;
      }
      .character-left {
        left: 2%;
      }
      .character-right {
        right: 2%;
      }
    }

    @media (max-width: 768px) {
      .character {
        height: 35%;
        max-height: 250px;
        opacity: 0.6;
      }
      .character-left {
        left: 0;
      }
      .character-right {
        right: 0;
      }
    }

    @media (max-width: 500px) {
      .character {
        display: none;
      }
    }

    .card {
      background: rgba(37, 37, 66, 0.95);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(61, 61, 92, 0.5);
      border-radius: var(--radius);
      padding: 1.5rem;
      position: relative;
      z-index: 10;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    }

    .card-small {
      max-width: 28rem;
      width: 90%;
    }

    .card-header {
      text-align: center;
      padding-bottom: 0.5rem;
    }

    .card-title {
      font-size: 1.875rem;
      font-weight: 700;
    }

    .card-desc {
      color: var(--muted-foreground);
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .card-content {
      padding-top: 1rem;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 1rem;
      border: 1px solid rgba(61, 61, 92, 0.5);
      border-radius: var(--radius);
      font-size: 1.125rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      background: var(--secondary);
      color: var(--foreground);
    }

    .btn:hover {
      transform: scale(1.02);
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn-primary {
      background: var(--primary);
      border-color: var(--primary);
    }

    .btn-primary:hover {
      background: #c96a2f;
    }

    .btn-ghost {
      background: transparent;
      border: none;
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
    }

    .btn-ghost:hover {
      background: rgba(45, 45, 74, 0.5);
    }

    .btn-mode {
      height: 5rem;
      margin-bottom: 1rem;
      text-align: left;
      padding-left: 1.5rem;
    }

    .btn-mode:hover {
      background: var(--primary);
    }

    .btn-mode:last-child:hover {
      background: #5a5aaa;
    }

    .btn-icon {
      width: 2rem;
      height: 2rem;
      margin-right: 0.75rem;
    }

    .btn-text {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }

    .btn-text small {
      font-size: 0.75rem;
      color: var(--muted-foreground);
      font-weight: 400;
    }

    .btn-mode:hover .btn-text small {
      color: rgba(255, 255, 255, 0.7);
    }

    #range-screen {
      max-width: 28rem;
    }

    .header-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }

    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      background: var(--secondary);
      border: 1px solid rgba(61, 61, 92, 0.5);
      border-radius: var(--radius);
      color: var(--foreground);
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s;
    }

    .form-input:focus {
      border-color: var(--primary);
    }

    .error-box {
      display: none;
      align-items: center;
      gap: 0.5rem;
      background: rgba(239, 68, 68, 0.1);
      color: var(--destructive);
      padding: 0.75rem;
      border-radius: var(--radius);
      font-size: 0.875rem;
      margin-bottom: 1rem;
    }

    .error-box.show {
      display: flex;
    }

    #draw-screen {
      position: fixed;
      inset: 0;
      display: none;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background-image: url('https://media.istockphoto.com/id/1129069115/ko/%EC%82%AC%EC%A7%84/%EB%82%AE%EC%97%90-%EC%9D%BC%EB%B3%B8-%ED%92%8D%EA%B2%BD.jpg?s=1024x1024&w=is&k=20&c=Dg_F8NtqdCtuUer3T4lJO5LUCd7YemDcfJZ-joP2g0M=');
      background-size: cover;
      background-position: center;
      max-width: none;
    }

    #draw-screen.active {
      display: flex;
    }

    .draw-overlay {
      position: absolute;
      inset: 0;
      background: rgba(26, 26, 46, 0.7);
      backdrop-filter: blur(4px);
    }

    .draw-content {
      position: relative;
      z-index: 10;
      width: 100%;
      max-width: 32rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
    }

    .draw-header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .range-badge {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      background: rgba(37, 37, 66, 0.5);
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
    }

    .range-badge span:last-child {
      font-weight: 600;
      color: var(--foreground);
    }

    .result-card {
      width: 100%;
      background: rgba(37, 37, 66, 0.9);
      backdrop-filter: blur(12px);
      border-radius: 1rem;
      border: 1px solid rgba(61, 61, 92, 0.5);
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }

    .result-mode {
      text-align: center;
      font-size: 0.875rem;
      color: var(--muted-foreground);
      margin-bottom: 0.5rem;
    }

    .result-display {
      text-align: center;
      font-size: 4rem;
      font-weight: 700;
      padding: 2rem 0;
      transition: color 0.2s;
    }

    .result-display.animating {
      color: var(--primary);
      animation: slot-spin 0.1s ease-in-out infinite;
    }

    @keyframes slot-spin {
      0%, 100% { transform: translateY(0); }
      25% { transform: translateY(-10px); }
      75% { transform: translateY(10px); }
    }

    .draw-btn {
      max-width: 20rem;
      height: 4rem;
      font-size: 1.25rem;
      box-shadow: 0 10px 15px -3px rgba(224, 122, 58, 0.3);
    }

    .draw-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
    }

    .history-toggle {
      color: var(--muted-foreground);
    }

    .history-box {
      display: none;
      width: 100%;
      background: rgba(37, 37, 66, 0.8);
      backdrop-filter: blur(12px);
      border-radius: 0.75rem;
      border: 1px solid rgba(61, 61, 92, 0.5);
      padding: 1rem;
    }

    .history-box.show {
      display: block;
    }

    .history-title {
      font-size: 0.875rem;
      color: var(--muted-foreground);
      margin-bottom: 0.75rem;
    }

    .history-items {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .history-item {
      padding: 0.5rem 0.75rem;
      border-radius: 0.5rem;
      font-size: 0.875rem;
      background: var(--secondary);
      color: var(--secondary-foreground);
    }

    .history-item:first-child {
      background: var(--primary);
      color: var(--primary-foreground);
    }

    @media (min-width: 768px) {
      .result-display {
        font-size: 5rem;
      }
    }
  </style>
</head>
<body>
  <!-- Screen 1: Mode Selection -->
  <div id="mode-screen" class="screen active">
    <div class="mode-container">
      <!-- Doraemon on the left -->
      <img 
        src="https://img.extmovie.com/files/attach/images/174/500/322/005/b8a36bfbe9ab62a7e89ff08505d49adf.png" 
        alt="Doraemon" 
        class="character character-left"
      >
      
      <!-- Card in the center -->
      <div class="card card-small">
        <div class="card-header">
          <h1 class="card-title font-jp">モード選択</h1>
          <p class="card-desc">Select your preferred mode</p>
        </div>
        <div class="card-content">
          <button class="btn btn-mode" onclick="selectMode('japanese')">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"/>
            </svg>
            <div class="btn-text">
              <span class="font-jp">日本語モード</span>
              <small>Japanese Mode</small>
            </div>
          </button>
          <button class="btn btn-mode" onclick="selectMode('number')">
            <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
            </svg>
            <div class="btn-text">
              <span>숫자 모드</span>
              <small>Number Mode</small>
            </div>
          </button>
        </div>
      </div>

      <!-- Character on the right -->
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMlJyXqqoN2or5uw4LPZJpvfZ0NtqQHjnsbg&s" 
        alt="Character" 
        class="character character-right"
      >
    </div>
  </div>

  <!-- Screen 2: Range Input -->
  <div id="range-screen" class="screen">
    <div class="card">
      <div class="card-header" style="text-align: left;">
        <div class="header-row">
          <button class="btn btn-ghost" onclick="goToScreen('mode')" style="width: auto; padding: 0.5rem;">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <h2 class="card-title" style="font-size: 1.5rem;">범위 입력</h2>
        </div>
        <p class="card-desc" style="padding-left: 2.75rem;">Enter your number range</p>
      </div>
      <div class="card-content">
        <div class="form-group">
          <label class="form-label">시작 번호를 입력하세요</label>
          <input type="number" id="min-input" class="form-input" placeholder="예: 1">
        </div>
        <div class="form-group">
          <label class="form-label">끝 번호를 입력하세요</label>
          <input type="number" id="max-input" class="form-input" placeholder="예: 100">
        </div>
        <div id="error-box" class="error-box">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span id="error-text"></span>
        </div>
        <button class="btn btn-primary" onclick="confirmRange()">
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          확인
        </button>
      </div>
    </div>
  </div>

  <!-- Screen 3: Main Draw -->
  <div id="draw-screen" class="screen">
    <div class="draw-overlay"></div>
    <div class="draw-content">
      <div class="draw-header">
        <button class="btn btn-ghost" onclick="goToScreen('range')">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          뒤로
        </button>
        <div class="range-badge">
          <span>범위:</span>
          <span id="range-display">1 ~ 100</span>
        </div>
        <button class="btn btn-ghost" onclick="resetAll()">
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
          초기화
        </button>
      </div>

      <div class="result-card">
        <p id="mode-display" class="result-mode font-jp">日本語モード</p>
        <div id="result-display" class="result-display font-jp">?</div>
      </div>

      <button id="draw-btn" class="btn btn-primary draw-btn" onclick="startDraw()">
        <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.75rem;">
          <rect x="2" y="2" width="8" height="8" rx="1"/>
          <rect x="14" y="2" width="8" height="8" rx="1"/>
          <rect x="2" y="14" width="8" height="8" rx="1"/>
          <rect x="14" y="14" width="8" height="8" rx="1"/>
          <circle cx="6" cy="6" r="1" fill="currentColor"/>
          <circle cx="18" cy="6" r="1" fill="currentColor"/>
          <circle cx="6" cy="18" r="1" fill="currentColor"/>
          <circle cx="18" cy="18" r="1" fill="currentColor"/>
        </svg>
        <span id="draw-btn-text">番号を引く</span>
      </button>

      <button id="history-toggle" class="btn btn-ghost history-toggle" onclick="toggleHistory()" style="display: none;">
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="margin-right: 0.5rem;">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
        <span id="history-toggle-text">기록 보기 (0)</span>
      </button>

      <div id="history-box" class="history-box">
        <p class="history-title">이전 결과</p>
        <div id="history-items" class="history-items"></div>
      </div>
    </div>
  </div>

  <script>
    let currentMode = 'japanese';
    let minNum = 1;
    let maxNum = 100;
    let history = [];
    let isAnimating = false;
    let showHistory = false;

    const basicNumbers = {
      0: '零', 1: '一', 2: '二', 3: '三', 4: '四',
      5: '五', 6: '六', 7: '七', 8: '八', 9: '九',
      10: '十', 100: '百', 1000: '千', 10000: '万'
    };

    function numberToJapanese(num) {
      if (num < 0) return 'マイナス ' + numberToJapanese(Math.abs(num));
      if (num === 0) return basicNumbers[0];
      if (num <= 10) return basicNumbers[num];

      let result = '';

      if (num >= 10000) {
        const manDigit = Math.floor(num / 10000);
        result += (manDigit === 1 ? '' : numberToJapanese(manDigit)) + basicNumbers[10000];
        num %= 10000;
      }

      if (num >= 1000) {
        const senDigit = Math.floor(num / 1000);
        result += (senDigit === 1 ? '' : basicNumbers[senDigit]) + basicNumbers[1000];
        num %= 1000;
      }

      if (num >= 100) {
        const hyakuDigit = Math.floor(num / 100);
        result += (hyakuDigit === 1 ? '' : basicNumbers[hyakuDigit]) + basicNumbers[100];
        num %= 100;
      }

      if (num >= 10) {
        const juDigit = Math.floor(num / 10);
        result += (juDigit === 1 ? '' : basicNumbers[juDigit]) + basicNumbers[10];
        num %= 10;
      }

      if (num > 0) {
        result += basicNumbers[num];
      }

      return result;
    }

    function formatResult(num) {
      return currentMode === 'japanese' ? numberToJapanese(num) : num.toString();
    }

    function generateRandomNumber() {
      return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    }

    function goToScreen(screen) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById(screen + '-screen').classList.add('active');
    }

    function selectMode(mode) {
      currentMode = mode;
      goToScreen('range');
    }

    function confirmRange() {
      const minInput = document.getElementById('min-input');
      const maxInput = document.getElementById('max-input');
      const errorBox = document.getElementById('error-box');
      const errorText = document.getElementById('error-text');

      const min = parseInt(minInput.value, 10);
      const max = parseInt(maxInput.value, 10);

      if (isNaN(min) || isNaN(max)) {
        errorText.textContent = '숫자만 입력해주세요 (Numbers only)';
        errorBox.classList.add('show');
        return;
      }

      if (min >= max) {
        errorText.textContent = '시작 숫자는 끝 숫자보다 작아야 합니다';
        errorBox.classList.add('show');
        return;
      }

      if (min < 0 || max < 0) {
        errorText.textContent = '양수만 입력해주세요 (Positive numbers only)';
        errorBox.classList.add('show');
        return;
      }

      errorBox.classList.remove('show');
      minNum = min;
      maxNum = max;

      document.getElementById('range-display').textContent = `${min} ~ ${max}`;
      document.getElementById('mode-display').textContent = currentMode === 'japanese' ? '日本語モード' : '숫자 모드';
      document.getElementById('result-display').className = currentMode === 'japanese' ? 'result-display font-jp' : 'result-display';
      document.getElementById('draw-btn-text').textContent = currentMode === 'japanese' ? '番号を引く' : '번호 뽑기';
      
      goToScreen('draw');
    }

    function resetAll() {
      currentMode = 'japanese';
      minNum = 1;
      maxNum = 100;
      history = [];
      showHistory = false;
      
      document.getElementById('min-input').value = '';
      document.getElementById('max-input').value = '';
      document.getElementById('result-display').textContent = '?';
      document.getElementById('result-display').classList.remove('animating');
      document.getElementById('history-toggle').style.display = 'none';
      document.getElementById('history-box').classList.remove('show');
      document.getElementById('error-box').classList.remove('show');
      
      goToScreen('mode');
    }

    function startDraw() {
      if (isAnimating) return;

      isAnimating = true;
      showHistory = false;
      document.getElementById('history-box').classList.remove('show');

      const drawBtn = document.getElementById('draw-btn');
      const drawBtnText = document.getElementById('draw-btn-text');
      const resultDisplay = document.getElementById('result-display');

      drawBtn.disabled = true;
      drawBtnText.textContent = currentMode === 'japanese' ? '抽選中...' : '추첨 중...';

      resultDisplay.classList.add('animating');

      let speed = 50;
      const maxSpeed = 200;
      const duration = 1500;
      const startTime = Date.now();

      function animate() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        const randomNum = generateRandomNumber();
        resultDisplay.textContent = formatResult(randomNum);

        if (progress < 1) {
          speed = 50 + progress * (maxSpeed - 50);
          setTimeout(animate, speed);
        } else {
          const finalNumber = generateRandomNumber();
          resultDisplay.textContent = formatResult(finalNumber);
          resultDisplay.classList.remove('animating');

          history.unshift(finalNumber);
          if (history.length > 10) history.pop();
          updateHistoryDisplay();

          isAnimating = false;
          drawBtn.disabled = false;
          drawBtnText.textContent = currentMode === 'japanese' ? '番号を引く' : '번호 뽑기';
        }
      }

      animate();
    }

    function updateHistoryDisplay() {
      const historyToggle = document.getElementById('history-toggle');
      const historyToggleText = document.getElementById('history-toggle-text');
      const historyItems = document.getElementById('history-items');

      if (history.length > 0) {
        historyToggle.style.display = 'flex';
        historyToggleText.textContent = showHistory ? `기록 숨기기 (${history.length})` : `기록 보기 (${history.length})`;

        historyItems.innerHTML = history.map((num, index) => {
          if (currentMode === 'japanese') {
            return `<div class="history-item font-jp">${numberToJapanese(num)}</div>`;
          }
          return `<div class="history-item">${num}</div>`;
        }).join('');
      }
    }

    function toggleHistory() {
      showHistory = !showHistory;
      document.getElementById('history-box').classList.toggle('show', showHistory);
      document.getElementById('history-toggle-text').textContent = showHistory ? `기록 숨기기 (${history.length})` : `기록 보기 (${history.length})`;
    }

    document.getElementById('min-input').addEventListener('input', () => {
      document.getElementById('error-box').classList.remove('show');
    });
    document.getElementById('max-input').addEventListener('input', () => {
      document.getElementById('error-box').classList.remove('show');
    });
  </script>
</body>
</html>
