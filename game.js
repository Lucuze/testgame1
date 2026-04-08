/**
 * 똑똑 생활왕 👑 — game.js
 * 지적장애 초등 저학년을 위한 생활 기술 학습 게임
 */

'use strict';

/* ============================================================
   게임 데이터 — 3가지 모드 문제 (각 20개+)
   ============================================================ */
const QUESTIONS = {
  safety: [
    { q: '빨간 불에 길을 건너요', emoji: '🚦', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '횡단보도에서 초록 불에 건너요', emoji: '🚶', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    { q: '뜨거운 냄비를 맨손으로 잡아요', emoji: '🍳', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '계단에서 뛰어요', emoji: '🏃', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '손잡이를 잡고 계단을 내려가요', emoji: '🪜', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    { q: '그네 타다가 손을 놓아요', emoji: '🎡', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '비가 올 때 우산을 써요', emoji: '☂️', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    { q: '전기 콘센트에 젓가락을 꽂아요', emoji: '🔌', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '자전거 탈 때 헬멧을 써요', emoji: '🚲', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    { q: '차도로 갑자기 뛰어나가요', emoji: '🚗', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    {
      q: '모르는 사람이 따라오면 어떻게 할까요?',
      emoji: '👤',
      choices: ['큰 소리로 도움 요청해요 📢', '혼자 조용히 도망가요', '아무것도 안 해요'],
      answer: 0,
      hint: '어른들이 도와줄 수 있어요. 큰 소리로 불러요!'
    },
    {
      q: '수영장에서 혼자 깊은 곳에 가요',
      emoji: '🏊',
      choices: ['안전해요 🟢', '위험해요 🔴'],
      answer: 1
    },
    { q: '안전벨트를 매고 차를 타요', emoji: '🚙', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    { q: '주방에서 칼을 가지고 놀아요', emoji: '🔪', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '높은 곳에서 뛰어내려요', emoji: '🏔️', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    {
      q: '불이 났을 때 어떻게 할까요?',
      emoji: '🔥',
      choices: ['낮게 엎드려 나가요 🏃', '불을 직접 끄려 해요', '숨어서 기다려요'],
      answer: 0,
      hint: '연기는 위로 올라가요. 낮게 이동해요!'
    },
    { q: '놀이터에서 친구를 밀어요', emoji: '🛝', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    { q: '차가 오는지 확인하고 길을 건너요', emoji: '👀', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
    {
      q: '엘리베이터에 혼자 갇혔어요. 어떻게 할까요?',
      emoji: '🛗',
      choices: ['비상 버튼을 눌러요 🔔', '문을 억지로 열어요', '소리를 안 질러요'],
      answer: 0,
      hint: '비상 버튼은 도움을 요청하는 버튼이에요!'
    },
    { q: '학교에서 허락 없이 교실을 나가요', emoji: '🚪', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 1 },
    {
      q: '올바른 횡단보도 이용 방법은?',
      emoji: '🚶',
      choices: ['초록 불에 좌우를 보고 건너요 ✅', '빨간 불에 빨리 건너요', '자동차 사이로 건너요', '눈 감고 건너요'],
      answer: 0,
      hint: '초록 불에 좌우를 확인해요!'
    },
    { q: '모자를 쓰고 자전거를 타요', emoji: '⛑️', choices: ['안전해요 🟢', '위험해요 🔴'], answer: 0 },
  ],

  health: [
    {
      q: '배가 너무 아파요. 어떻게 할까요?',
      emoji: '😣',
      choices: ['선생님/부모님께 말해요 ✅', '운동장을 달려요', '그냥 참아요'],
      answer: 0,
      hint: '어른에게 꼭 말해야 해요!'
    },
    {
      q: '손을 다쳐서 피가 나요. 어떻게 할까요?',
      emoji: '🩹',
      choices: ['깨끗한 천으로 누르고 어른에게 알려요 ✅', '그냥 두어요', '흙을 발라요'],
      answer: 0,
      hint: '깨끗하게 하는 게 중요해요!'
    },
    {
      q: '열이 나고 몸이 뜨거워요. 어떻게 할까요?',
      emoji: '🤒',
      choices: ['어른에게 알려요 ✅', '찬물로 혼자 목욕해요', '계속 학교에 다녀요'],
      answer: 0,
      hint: '어른이 병원에 데려다줄 수 있어요!'
    },
    {
      q: '눈에 먼지가 들어갔어요. 어떻게 할까요?',
      emoji: '👁️',
      choices: ['깨끗한 물로 씻어요 ✅', '눈을 손으로 비벼요', '눈을 꽉 감아요'],
      answer: 0,
      hint: '눈을 비비면 더 나빠질 수 있어요!'
    },
    {
      q: '코피가 나요. 어떻게 할까요?',
      emoji: '🩸',
      choices: ['고개를 앞으로 숙이고 코를 막아요 ✅', '고개를 뒤로 젖혀요', '코를 세게 풀어요'],
      answer: 0,
      hint: '고개를 앞으로 숙여야 해요!'
    },
    {
      q: '넘어져서 무릎이 까졌어요. 어떻게 할까요?',
      emoji: '🦵',
      choices: ['소독하고 반창고 붙여요 ✅', '그냥 두어요', '흙을 붙여요'],
      answer: 0,
      hint: '소독을 먼저 해야 해요!'
    },
    {
      q: '친구가 갑자기 쓰러졌어요. 어떻게 할까요?',
      emoji: '🆘',
      choices: ['어른에게 빨리 알려요 ✅', '혼자 일으키려 해요', '그냥 두고 가요'],
      answer: 0,
      hint: '선생님이나 어른을 빨리 불러요!'
    },
    {
      q: '약을 먹어야 해요. 누가 줘야 할까요?',
      emoji: '💊',
      choices: ['부모님 / 선생님 ✅', '친구에게 받아요', '혼자 마음대로 먹어요'],
      answer: 0,
      hint: '약은 어른이 주는 것만 먹어요!'
    },
    {
      q: '두드러기가 났어요. 어떻게 할까요?',
      emoji: '🔴',
      choices: ['어른에게 알려요 ✅', '긁어요', '그냥 두어요'],
      answer: 0,
      hint: '알레르기일 수 있어요. 어른에게 말해요!'
    },
    {
      q: '치통이 심하게 아파요. 어떻게 할까요?',
      emoji: '🦷',
      choices: ['부모님께 말하고 치과에 가요 ✅', '혼자 치과에 가요', '그냥 참아요'],
      answer: 0,
      hint: '어른이 치과에 데려다줄 수 있어요!'
    },
    {
      q: '머리를 세게 부딪쳤어요. 어떻게 할까요?',
      emoji: '🤕',
      choices: ['어른에게 바로 알려요 ✅', '계속 운동해요', '잠을 자요'],
      answer: 0,
      hint: '머리를 다치면 꼭 어른에게 알려요!'
    },
    {
      q: '물건을 삼켰어요. 어떻게 할까요?',
      emoji: '😮',
      choices: ['어른에게 바로 알려요 ✅', '물을 많이 마셔요', '그냥 두어요'],
      answer: 0,
      hint: '어른에게 빨리 말해야 해요!'
    },
    {
      q: '감기에 걸렸어요. 어떻게 해야 할까요?',
      emoji: '🤧',
      choices: ['마스크를 쓰고 쉬어요 ✅', '친구들과 계속 뛰어 놀아요', '찬 것을 많이 먹어요'],
      answer: 0,
      hint: '쉬면 빨리 나을 수 있어요!'
    },
    {
      q: '발목을 삐었어요. 어떻게 할까요?',
      emoji: '🦶',
      choices: ['어른에게 알리고 쉬어요 ✅', '계속 뛰어요', '발목을 세게 주물러요'],
      answer: 0,
      hint: '다치면 움직이지 말고 쉬어야 해요!'
    },
    {
      q: '화상을 입었어요(뜨거운 것에 데었어요). 어떻게 할까요?',
      emoji: '🔥',
      choices: ['차가운 물로 식혀요 ✅', '버터를 발라요', '그냥 두어요'],
      answer: 0,
      hint: '흐르는 찬물로 식혀야 해요!'
    },
    {
      q: '벌에 쏘였어요. 어떻게 할까요?',
      emoji: '🐝',
      choices: ['어른에게 알리고 카드로 침을 뽑아요 ✅', '손으로 짜내요', '그냥 두어요'],
      answer: 0,
      hint: '손으로 짜면 더 독이 들어갈 수 있어요!'
    },
    {
      q: '갑자기 숨이 막혀요. 어떻게 할까요?',
      emoji: '😮‍💨',
      choices: ['어른에게 즉시 알려요 ✅', '혼자 참아요', '물을 마셔요'],
      answer: 0,
      hint: '숨쉬기 힘들면 즉시 어른에게 말해요!'
    },
    {
      q: '눈이 충혈됐어요. 어떻게 할까요?',
      emoji: '👁️',
      choices: ['어른에게 알려요 ✅', '눈을 비벼요', '그냥 두어요'],
      answer: 0,
      hint: '눈을 비비면 더 나빠질 수 있어요!'
    },
    {
      q: '목이 아프고 열이 나요. 어떻게 할까요?',
      emoji: '😷',
      choices: ['부모님/선생님께 말해요 ✅', '운동을 열심히 해요', '찬 음식을 많이 먹어요'],
      answer: 0,
      hint: '아프면 쉬어야 해요!'
    },
    {
      q: '아무 증상이 없어요. 그냥 약을 먹어도 될까요?',
      emoji: '💊',
      choices: ['아니요, 안 돼요 ✅', '네, 먹어도 돼요', '친구에게 물어봐요'],
      answer: 0,
      hint: '아프지 않으면 약을 먹지 않아요!'
    },
    {
      q: '다음 중 아플 때 가장 먼저 해야 할 일은?',
      emoji: '🆘',
      choices: ['어른에게 알리기 ✅', '혼자 해결하기', '그냥 참기', '친구에게만 말하기'],
      answer: 0,
      hint: '어른이 도와줄 수 있어요!'
    },
  ],

  meal: [
    { q: '밥 먹으면서 TV를 봐요', emoji: '📺', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '천천히 씹어서 먹어요', emoji: '😋', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '밥 먹기 전에 손을 씻어요', emoji: '🙌', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '음식을 입에 가득 넣고 말해요', emoji: '🗣️', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '식사 후 그릇을 정리해요', emoji: '🍽️', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '음식을 가지고 장난쳐요', emoji: '🍞', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '편식하지 않고 골고루 먹어요', emoji: '🥗', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '국을 후루룩 소리내며 먹어요', emoji: '🍜', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '어른이 먼저 드신 후 먹어요', emoji: '👴', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '젓가락으로 밥그릇을 두드려요', emoji: '🥢', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    {
      q: '올바른 식사 예절은 무엇일까요?',
      emoji: '🍚',
      choices: ['앉아서 조용히 먹어요 ✅', '서서 먹어요', '뛰면서 먹어요'],
      answer: 0,
      hint: '앉아서 먹는 것이 예절이에요!'
    },
    { q: '밥 먹을 때 스마트폰을 봐요', emoji: '📱', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '"잘 먹겠습니다"라고 인사해요', emoji: '🙏', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '싫어하는 음식을 바닥에 버려요', emoji: '🚫', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    { q: '"잘 먹었습니다"라고 인사해요', emoji: '🙇', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    {
      q: '올바른 식사 자세는?',
      emoji: '🪑',
      choices: ['바르게 앉아서 먹어요 ✅', '비스듬히 기대어 먹어요', '엎드려서 먹어요'],
      answer: 0,
      hint: '바른 자세로 먹어야 해요!'
    },
    { q: '음식을 골고루 담아 먹어요', emoji: '🥘', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 0 },
    { q: '밥을 먹으면서 걸어다녀요', emoji: '🚶', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    {
      q: '식사 중에 화장실에 가고 싶으면?',
      emoji: '🚽',
      choices: ['양해를 구하고 가요 ✅', '그냥 일어나요', '그냥 참아요', '소리쳐요'],
      answer: 0,
      hint: '어른에게 말하고 가야 해요!'
    },
    { q: '음식을 씹을 때 입을 벌리고 씹어요', emoji: '😬', choices: ['잘 했어요 👍', '잘못됐어요 👎'], answer: 1 },
    {
      q: '음식이 뜨거울 때 어떻게 할까요?',
      emoji: '🍲',
      choices: ['조금 식힌 후 먹어요 ✅', '바로 먹어요', '후후 불어서 뿌려요', '버려요'],
      answer: 0,
      hint: '뜨거운 음식은 식혀서 먹어요!'
    },
  ]
};

/* ── 난이도별 선택지 개수 매핑 ── */
const DIFFICULTY_CHOICES = { easy: 2, medium: 3, hard: 4 };

/* ============================================================
   전역 상태
   ============================================================ */
let state = {
  playerName: '',
  currentMode: null,       // 'safety' | 'health' | 'meal'
  difficulty: 'easy',
  questionCount: 5,
  useStopwatch: false,
  questions: [],
  currentIndex: 0,
  correctCount: 0,
  hintsUsed: 0,            // 이번 게임 총 힌트 사용 수
  hintThisQuestion: 0,     // 이번 문제 힌트 사용 횟수
  combo: 0,
  wrongAnswers: [],
  startTime: 0,
  elapsed: 0,
  timerInterval: null,
  settings: { bgmVolume: 70, sfxVolume: 80 },
  recordsTab: 'safety',
  lbMode: 'all',
  returnFromResult: false,
};

/* ============================================================
   오디오 (Web Audio API)
   ============================================================ */
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', volumeScale = 1) {
  const ctx = getAudioCtx();
  if (!ctx) return;
  const vol = (state.settings.sfxVolume / 100) * volumeScale;
  if (vol === 0) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime);
  gain.gain.setValueAtTime(vol * 0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + duration);
}

function playClick() {
  playTone(880, 0.07, 'triangle', 0.6);
}

function playCorrect() {
  // 도-미-솔 상승음
  [523, 659, 784].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.18, 'sine', 0.8), i * 120);
  });
}

function playWrong() {
  playTone(220, 0.4, 'sawtooth', 0.5);
}

function playPerfect() {
  // 팡파레 — 도레미파솔라시도
  const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
  notes.forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'sine', 0.9), i * 100));
}

/* ============================================================
   localStorage 유틸
   ============================================================ */
const LS_KEY = 'ddokddok_saenghwalwang';

function loadData() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : { playerName: '', settings: { bgmVolume: 70, sfxVolume: 80 }, records: [] };
  } catch { return { playerName: '', settings: { bgmVolume: 70, sfxVolume: 80 }, records: [] }; }
}

function saveData(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}

function addRecord(rec) {
  const data = loadData();
  data.records = data.records || [];
  data.records.push(rec);
  saveData(data);
}

/* ============================================================
   화면 전환
   ============================================================ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.style.display = '';
  });
  const target = document.getElementById(id);
  if (target) {
    target.style.display = 'flex';
    target.classList.add('active');
    target.scrollTop = 0;
  }
}

/* ============================================================
   초기화 & 이벤트 연결
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // 저장된 설정 불러오기
  const saved = loadData();
  state.settings = saved.settings || { bgmVolume: 70, sfxVolume: 80 };
  state.playerName = saved.playerName || '';

  // 이름 입력란에 저장된 이름 표시
  const nameInput = document.getElementById('player-name');
  if (nameInput && state.playerName) nameInput.value = state.playerName;

  // 볼륨 슬라이더 초기화
  const bgmSlider = document.getElementById('bgm-volume');
  const sfxSlider = document.getElementById('sfx-volume');
  if (bgmSlider) {
    bgmSlider.value = state.settings.bgmVolume;
    document.getElementById('bgm-vol-display').textContent = state.settings.bgmVolume + '%';
  }
  if (sfxSlider) {
    sfxSlider.value = state.settings.sfxVolume;
    document.getElementById('sfx-vol-display').textContent = state.settings.sfxVolume + '%';
  }

  // ── 스플래시 화면 ──
  document.getElementById('btn-start').addEventListener('click', () => {
    playClick();
    const name = (document.getElementById('player-name').value || '').trim();
    if (!name) {
      document.getElementById('player-name').focus();
      shakeElement(document.getElementById('player-name'));
      return;
    }
    state.playerName = name;
    const data = loadData();
    data.playerName = name;
    saveData(data);
    document.getElementById('welcome-msg').textContent = `안녕, ${name}! 👋`;
    document.getElementById('main-bubble').textContent = `${name}, 어떤 것을 배울까요? 🌈`;
    showScreen('screen-main');
  });

  // ── 메인 화면 ──
  ['safety', 'health', 'meal'].forEach(mode => {
    document.getElementById('btn-' + mode).addEventListener('click', () => {
      playClick();
      state.currentMode = mode;
      openGameSetup(mode);
    });
  });

  document.getElementById('btn-records').addEventListener('click', () => {
    playClick();
    openRecords();
  });

  document.getElementById('btn-settings').addEventListener('click', () => {
    playClick();
    document.getElementById('modal-settings').classList.remove('hidden');
  });

  // ── 설정 모달 ──
  document.getElementById('bgm-volume').addEventListener('input', e => {
    state.settings.bgmVolume = +e.target.value;
    document.getElementById('bgm-vol-display').textContent = e.target.value + '%';
  });
  document.getElementById('sfx-volume').addEventListener('input', e => {
    state.settings.sfxVolume = +e.target.value;
    document.getElementById('sfx-vol-display').textContent = e.target.value + '%';
  });
  document.getElementById('btn-close-settings').addEventListener('click', () => {
    playClick();
    const data = loadData();
    data.settings = state.settings;
    saveData(data);
    document.getElementById('modal-settings').classList.add('hidden');
  });
  document.getElementById('modal-settings').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-settings')) {
      document.getElementById('modal-settings').classList.add('hidden');
    }
  });

  // ── 게임 설정 화면 ──
  document.getElementById('setup-back').addEventListener('click', () => {
    playClick();
    showScreen('screen-main');
  });

  document.querySelectorAll('.btn-option').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      const optionName = btn.dataset.option;
      document.querySelectorAll(`[data-option="${optionName}"]`).forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      if (optionName === 'difficulty') state.difficulty = btn.dataset.value;
      if (optionName === 'questionCount') state.questionCount = +btn.dataset.value;
      if (optionName === 'stopwatch') state.useStopwatch = btn.dataset.value === 'true';
    });
  });

  document.getElementById('btn-start-game').addEventListener('click', () => {
    playClick();
    startGame();
  });

  // ── 힌트 버튼 ──
  document.getElementById('btn-hint').addEventListener('click', () => {
    playClick();
    useHint();
  });

  // ── 결과 화면 버튼 ──
  document.getElementById('btn-review').addEventListener('click', () => {
    playClick();
    openReview();
  });
  document.getElementById('btn-teacher-view').addEventListener('click', () => {
    playClick();
    openTeacherView();
  });
  document.getElementById('btn-leaderboard').addEventListener('click', () => {
    playClick();
    state.returnFromResult = true;
    openLeaderboard();
  });
  document.getElementById('btn-retry').addEventListener('click', () => {
    playClick();
    openGameSetup(state.currentMode);
  });
  document.getElementById('btn-other-game').addEventListener('click', () => {
    playClick();
    showScreen('screen-main');
  });

  // ── 퍼펙트 오버레이 ──
  document.getElementById('btn-perfect-close').addEventListener('click', () => {
    playClick();
    document.getElementById('perfect-overlay').classList.add('hidden');
  });

  // ── 복습 화면 ──
  document.getElementById('review-back').addEventListener('click', () => {
    playClick();
    showScreen('screen-result');
  });

  // ── 리더보드 ──
  document.getElementById('lb-back').addEventListener('click', () => {
    playClick();
    if (state.returnFromResult) {
      state.returnFromResult = false;
      showScreen('screen-result');
    } else {
      showScreen('screen-main');
    }
  });
  document.querySelectorAll('#screen-leaderboard .btn-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('#screen-leaderboard .btn-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      state.lbMode = btn.dataset.mode;
      renderLeaderboard();
    });
  });

  // ── 기록표 ──
  document.getElementById('records-back').addEventListener('click', () => {
    playClick();
    showScreen('screen-main');
  });
  document.querySelectorAll('#screen-records .btn-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      playClick();
      document.querySelectorAll('#screen-records .btn-tab').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      state.recordsTab = btn.dataset.mode;
      renderRecords();
    });
  });
  document.getElementById('date-filter-input').addEventListener('change', renderRecords);
  document.getElementById('btn-clear-date').addEventListener('click', () => {
    document.getElementById('date-filter-input').value = '';
    renderRecords();
  });
  document.getElementById('btn-print').addEventListener('click', () => window.print());
  document.getElementById('btn-reset-records').addEventListener('click', () => {
    const pwd = prompt('비밀번호를 입력하세요 (교사용)');
    if (pwd === '1234') {
      const data = loadData();
      data.records = [];
      saveData(data);
      renderRecords();
      alert('기록이 초기화되었습니다.');
    } else if (pwd !== null) {
      alert('비밀번호가 틀렸습니다.');
    }
  });

  showScreen('screen-splash');
});

/* ============================================================
   게임 설정 화면 열기
   ============================================================ */
function openGameSetup(mode) {
  const titles = { safety: '🚦 안전 히어로', health: '🤒 몸이 아파요', meal: '🍽️ 식사 예절 챔피언' };
  document.getElementById('setup-mode-title').textContent = titles[mode];

  // 기본값 리셋
  state.difficulty = 'easy';
  state.questionCount = 5;
  state.useStopwatch = false;

  document.querySelectorAll('[data-option="difficulty"]').forEach(b => {
    b.classList.toggle('active', b.dataset.value === 'easy');
    b.setAttribute('aria-pressed', b.dataset.value === 'easy' ? 'true' : 'false');
  });
  document.querySelectorAll('[data-option="questionCount"]').forEach(b => {
    b.classList.toggle('active', b.dataset.value === '5');
    b.setAttribute('aria-pressed', b.dataset.value === '5' ? 'true' : 'false');
  });
  document.querySelectorAll('[data-option="stopwatch"]').forEach(b => {
    b.classList.toggle('active', b.dataset.value === 'false');
    b.setAttribute('aria-pressed', b.dataset.value === 'false' ? 'true' : 'false');
  });

  showScreen('screen-game-setup');
}

/* ============================================================
   게임 시작
   ============================================================ */
function startGame() {
  // 문제 셔플 후 N개 추출
  const pool = QUESTIONS[state.currentMode];
  state.questions = shuffle([...pool]).slice(0, state.questionCount);
  state.currentIndex = 0;
  state.correctCount = 0;
  state.hintsUsed = 0;
  state.combo = 0;
  state.wrongAnswers = [];
  state.elapsed = 0;

  // 스톱워치
  clearInterval(state.timerInterval);
  const swWrap = document.getElementById('stopwatch-wrap');
  if (state.useStopwatch) {
    swWrap.classList.remove('hidden');
    state.startTime = Date.now();
    state.timerInterval = setInterval(updateStopwatch, 500);
  } else {
    swWrap.classList.add('hidden');
  }

  showScreen('screen-game');
  renderQuestion();
}

/* ── 스톱워치 ── */
function updateStopwatch() {
  state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  const m = String(Math.floor(state.elapsed / 60)).padStart(2, '0');
  const s = String(state.elapsed % 60).padStart(2, '0');
  document.getElementById('stopwatch-display').textContent = `${m}:${s}`;
}

/* ── 셔플 ── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ============================================================
   문제 렌더링
   ============================================================ */
function renderQuestion() {
  const q = state.questions[state.currentIndex];
  state.hintThisQuestion = 0;

  // 진행도
  const total = state.questions.length;
  const idx = state.currentIndex;
  document.getElementById('progress-text').textContent = `${idx + 1} / ${total} 문제`;
  const pct = (idx / total) * 100;
  const bar = document.getElementById('progress-bar');
  bar.style.width = pct + '%';
  bar.parentElement.setAttribute('aria-valuenow', Math.round(pct));

  // 힌트 버튼
  document.getElementById('hint-count').textContent = '3';
  document.getElementById('btn-hint').disabled = false;
  document.getElementById('btn-hint').style.opacity = '1';

  // 문제 텍스트
  document.getElementById('question-text').textContent = q.q;
  document.getElementById('question-emoji').textContent = q.emoji || '';

  // 선택지 구성
  const maxChoices = DIFFICULTY_CHOICES[state.difficulty];
  let choices = buildChoices(q, maxChoices);

  const grid = document.getElementById('choices-grid');
  grid.innerHTML = '';
  const cols = choices.length === 2 ? 'cols-2' : choices.length === 3 ? 'cols-3' : 'cols-4';
  grid.className = `choices-grid ${cols}`;

  choices.forEach((choice, i) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-choice';
    btn.textContent = choice.text;
    btn.dataset.index = i;
    btn.dataset.correct = choice.isCorrect ? '1' : '0';
    btn.setAttribute('aria-label', choice.text);
    btn.addEventListener('click', () => handleChoice(btn, choice.isCorrect));
    grid.appendChild(btn);
  });

  // 마스코트 초기화
  setOwlMood('game-owl', 'happy');
  document.getElementById('game-owl-bubble').textContent = '';

  // 콤보 숨기기
  document.getElementById('combo-display').classList.add('hidden');
}

/* ── 선택지 빌드 (난이도별 개수, 답 포함 + 오답 랜덤) ── */
function buildChoices(q, maxChoices) {
  const allChoices = q.choices;
  const answerIdx = q.answer;

  // 최대 maxChoices 개까지 사용
  const count = Math.min(maxChoices, allChoices.length);

  // 정답 포함 보장 후 나머지는 오답 랜덤 선택
  const incorrectIndices = allChoices
    .map((_, i) => i)
    .filter(i => i !== answerIdx);
  const shuffledWrong = shuffle([...incorrectIndices]);
  const selected = [answerIdx, ...shuffledWrong.slice(0, count - 1)];
  const shuffledSelected = shuffle(selected);

  return shuffledSelected.map(i => ({
    text: allChoices[i],
    isCorrect: i === answerIdx,
    originalIndex: i,
  }));
}

/* ============================================================
   선택지 클릭 처리
   ============================================================ */
function handleChoice(btn, isCorrect) {
  // 모든 버튼 비활성화
  document.querySelectorAll('.btn-choice').forEach(b => {
    b.style.pointerEvents = 'none';
  });

  if (isCorrect) {
    btn.classList.add('correct');
    state.correctCount++;
    state.combo++;
    playCorrect();
    setOwlMood('game-owl', 'dance');
    document.getElementById('game-owl-bubble').textContent = '정답이에요! 🎉';
    if (state.combo >= 2) showCombo(state.combo);
  } else {
    btn.classList.add('wrong');
    // 정답 강조
    document.querySelectorAll('.btn-choice').forEach(b => {
      if (b.dataset.correct === '1') b.classList.add('correct');
    });
    state.combo = 0;
    playWrong();
    setOwlMood('game-owl', 'comfort');
    document.getElementById('game-owl-bubble').textContent = '괜찮아요, 다시 해봐요! 💪';
    state.wrongAnswers.push({
      q: state.questions[state.currentIndex].q,
      emoji: state.questions[state.currentIndex].emoji,
      myAnswer: btn.textContent,
      correctAnswer: state.questions[state.currentIndex].choices[state.questions[state.currentIndex].answer],
    });
  }

  setTimeout(() => nextQuestion(), 1200);
}

/* ── 다음 문제 ── */
function nextQuestion() {
  state.currentIndex++;
  if (state.currentIndex >= state.questions.length) {
    endGame();
  } else {
    renderQuestion();
  }
}

/* ── 콤보 표시 ── */
function showCombo(n) {
  const el = document.getElementById('combo-display');
  document.getElementById('combo-text').textContent = `🔥 ${n}연속 정답!`;
  el.classList.remove('hidden');
  clearTimeout(el._timeout);
  el._timeout = setTimeout(() => el.classList.add('hidden'), 2000);
}

/* ── 부엉이 표정 ── */
function setOwlMood(owlId, mood) {
  const owl = document.getElementById(owlId);
  if (!owl) return;
  owl.className = 'owl owl-' + mood;
}

/* ============================================================
   힌트 시스템
   ============================================================ */
function useHint() {
  if (state.hintThisQuestion >= 3) return;
  state.hintThisQuestion++;
  state.hintsUsed++;

  const remaining = 3 - state.hintThisQuestion;
  document.getElementById('hint-count').textContent = remaining;
  if (remaining === 0) {
    document.getElementById('btn-hint').disabled = true;
    document.getElementById('btn-hint').style.opacity = '0.5';
  }

  const q = state.questions[state.currentIndex];
  const choiceBtns = [...document.querySelectorAll('.btn-choice')].filter(b => b.dataset.correct !== '1' && !b.classList.contains('eliminated') && !b.classList.contains('dimmed'));

  if (state.hintThisQuestion === 1) {
    // 오답 하나 흐리게
    if (choiceBtns.length > 0) choiceBtns[0].classList.add('dimmed');
  } else if (state.hintThisQuestion === 2) {
    // 오답 하나 더 제거
    const remaining2 = [...document.querySelectorAll('.btn-choice')].filter(b => b.dataset.correct !== '1' && !b.classList.contains('eliminated') && !b.classList.contains('dimmed'));
    if (remaining2.length > 0) remaining2[0].classList.add('eliminated');
  } else if (state.hintThisQuestion === 3) {
    // 텍스트 힌트 표시
    const hintText = q.hint || '정답을 잘 생각해보세요! 💡';
    document.getElementById('game-owl-bubble').textContent = `힌트: ${hintText}`;
    setOwlMood('game-owl', 'surprise');
  }
}

/* ============================================================
   게임 종료 & 결과 저장
   ============================================================ */
function endGame() {
  clearInterval(state.timerInterval);
  if (state.useStopwatch) {
    state.elapsed = Math.floor((Date.now() - state.startTime) / 1000);
  }

  const total = state.questions.length;
  const correct = state.correctCount;
  const pct = Math.round((correct / total) * 100);
  const isPerfect = correct === total && state.hintsUsed === 0;

  // 기록 저장
  const rec = {
    name: state.playerName,
    mode: state.currentMode,
    difficulty: state.difficulty,
    questionCount: total,
    correctCount: correct,
    usedHint: state.hintsUsed > 0,
    hintsUsed: state.hintsUsed,
    time: state.useStopwatch ? state.elapsed : null,
    date: new Date().toISOString().split('T')[0],
    timestamp: Date.now(),
  };
  addRecord(rec);

  // 결과 화면 구성
  const modeNames = { safety: '🚦 안전 히어로', health: '🤒 몸이 아파요', meal: '🍽️ 식사 예절 챔피언' };
  document.getElementById('result-title').textContent = modeNames[state.currentMode];
  document.getElementById('result-name').textContent = `👤 ${state.playerName}`;
  document.getElementById('result-score').textContent = `${correct} / ${total} 문제 (${pct}%)`;

  // 별점
  let stars = '';
  if (pct >= 80) stars = '⭐⭐⭐';
  else if (pct >= 60) stars = '⭐⭐';
  else stars = '⭐';
  document.getElementById('result-stars').textContent = stars;

  // 소요 시간
  const timeEl = document.getElementById('result-time');
  if (state.useStopwatch) {
    const m = String(Math.floor(state.elapsed / 60)).padStart(2, '0');
    const s = String(state.elapsed % 60).padStart(2, '0');
    timeEl.textContent = `⏱️ 소요 시간: ${m}:${s}`;
    timeEl.classList.remove('hidden');
  } else {
    timeEl.classList.add('hidden');
  }

  // 칭찬 메시지
  let praise = '';
  if (pct === 100) praise = '완벽해요! 🏆';
  else if (pct >= 80) praise = '잘 했어요! 🌟';
  else if (pct >= 60) praise = '조금만 더 힘내요! 💪';
  else praise = '다시 도전해봐요! 🌈';
  document.getElementById('result-praise').textContent = praise;

  // 마스코트 표정
  setOwlMood('result-owl', pct >= 60 ? 'dance' : 'comfort');

  // 복습 버튼 (오답 없으면 숨기기)
  document.getElementById('btn-review').style.display = state.wrongAnswers.length > 0 ? '' : 'none';

  showScreen('screen-result');

  // 퍼펙트 이스터에그
  if (isPerfect) {
    setTimeout(() => {
      playPerfect();
      showPerfectEasterEgg();
    }, 600);
  }
}

/* ── 퍼펙트 이스터에그 ── */
function showPerfectEasterEgg() {
  document.getElementById('perfect-overlay').classList.remove('hidden');
  spawnConfetti();
}

function spawnConfetti() {
  const wrap = document.getElementById('confetti-wrap');
  wrap.innerHTML = '';
  const colors = ['#FF6F00', '#FFD600', '#43A047', '#1E88E5', '#8E24AA', '#E53935'];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 1.5 + 's';
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    wrap.appendChild(piece);
  }
}

/* ============================================================
   복습 화면
   ============================================================ */
function openReview() {
  const list = document.getElementById('review-list');
  list.innerHTML = '';
  if (state.wrongAnswers.length === 0) {
    list.innerHTML = '<p class="rec-empty">오답이 없어요! 🎉</p>';
  } else {
    state.wrongAnswers.forEach((w, i) => {
      const item = document.createElement('div');
      item.className = 'review-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="review-q">${i + 1}. ${w.emoji || ''} ${w.q}</div>
        <div class="review-my">❌ 내 답: ${w.myAnswer}</div>
        <div class="review-correct">✅ 정답: ${w.correctAnswer}</div>
      `;
      list.appendChild(item);
    });
  }
  showScreen('screen-review');
}

/* ============================================================
   교사 보기 화면
   ============================================================ */
function openTeacherView() {
  const modeNames = { safety: '🚦 안전 히어로', health: '🤒 몸이 아파요', meal: '🍽️ 식사 예절 챔피언' };
  const total = state.questions.length;
  const correct = state.correctCount;
  const pct = Math.round((correct / total) * 100);
  let stars = pct >= 80 ? '⭐⭐⭐' : pct >= 60 ? '⭐⭐' : '⭐';
  let praise = pct === 100 ? '완벽해요! 🏆' : pct >= 80 ? '잘 했어요! 🌟' : pct >= 60 ? '조금만 더 힘내요! 💪' : '다시 도전해봐요! 🌈';
  let timeStr = '';
  if (state.useStopwatch) {
    const m = String(Math.floor(state.elapsed / 60)).padStart(2, '0');
    const s = String(state.elapsed % 60).padStart(2, '0');
    timeStr = `<br>⏱️ 소요 시간: ${m}:${s}`;
  }
  document.getElementById('teacher-info').innerHTML = `
    👤 학생: <strong>${state.playerName}</strong><br>
    🎮 게임: ${modeNames[state.currentMode]}<br>
    📊 점수: ${correct} / ${total} 문제 (${pct}%)${timeStr}<br>
    ${stars}<br>
    ${praise}
  `;
  showScreen('screen-teacher');
}

function exitTeacherView() {
  playClick();
  showScreen('screen-result');
}

/* ============================================================
   리더보드
   ============================================================ */
function openLeaderboard() {
  state.lbMode = 'all';
  document.querySelectorAll('#screen-leaderboard .btn-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === 'all');
    b.setAttribute('aria-pressed', b.dataset.mode === 'all' ? 'true' : 'false');
  });
  renderLeaderboard();
  showScreen('screen-leaderboard');
}

function renderLeaderboard() {
  const data = loadData();
  let recs = (data.records || []).filter(r => state.lbMode === 'all' || r.mode === state.lbMode);

  // 정답률 기준 내림차순, 동점이면 시간 기준
  recs.sort((a, b) => {
    const pa = (a.correctCount / a.questionCount);
    const pb = (b.correctCount / b.questionCount);
    if (pb !== pa) return pb - pa;
    if (a.time !== null && b.time !== null) return a.time - b.time;
    return 0;
  });
  recs = recs.slice(0, 10);

  const modeNames = { safety: '🚦 안전', health: '🤒 건강', meal: '🍽️ 식사' };
  const list = document.getElementById('lb-list');
  list.innerHTML = '';

  if (recs.length === 0) {
    list.innerHTML = '<p class="rec-empty">기록이 없어요!</p>';
    return;
  }

  recs.forEach((r, i) => {
    const pct = Math.round((r.correctCount / r.questionCount) * 100);
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}위`;
    const timeStr = r.time !== null ? ` · ${String(Math.floor(r.time / 60)).padStart(2, '0')}:${String(r.time % 60).padStart(2, '0')}` : '';
    const item = document.createElement('div');
    item.className = 'lb-item';
    item.setAttribute('role', 'listitem');
    item.innerHTML = `
      <div class="lb-rank ${rankClass}">${rankEmoji}</div>
      <div class="lb-info">
        <div class="lb-name">${escapeHtml(r.name)}</div>
        <div class="lb-detail">${modeNames[r.mode] || r.mode} · ${r.date}${timeStr}</div>
      </div>
      <div class="lb-score">${pct}%</div>
    `;
    list.appendChild(item);
  });
}

/* ============================================================
   기록표
   ============================================================ */
function openRecords() {
  state.recordsTab = 'safety';
  document.querySelectorAll('#screen-records .btn-tab').forEach(b => {
    b.classList.toggle('active', b.dataset.mode === 'safety');
    b.setAttribute('aria-selected', b.dataset.mode === 'safety' ? 'true' : 'false');
  });
  document.getElementById('date-filter-input').value = '';
  renderRecords();
  showScreen('screen-records');
}

function renderRecords() {
  const data = loadData();
  const dateFilter = document.getElementById('date-filter-input').value;
  let recs = (data.records || [])
    .filter(r => r.mode === state.recordsTab)
    .filter(r => !dateFilter || r.date === dateFilter)
    .sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));

  const wrap = document.getElementById('records-table-wrap');
  wrap.innerHTML = '';

  if (recs.length === 0) {
    wrap.innerHTML = '<p class="rec-empty">기록이 없어요! 게임을 플레이해보세요. 🎮</p>';
  } else {
    recs.forEach((r, i) => {
      const pct = Math.round((r.correctCount / r.questionCount) * 100);
      const diffNames = { easy: '하', medium: '중', hard: '상' };
      const timeStr = r.time !== null ? ` · ⏱️ ${String(Math.floor(r.time / 60)).padStart(2, '0')}:${String(r.time % 60).padStart(2, '0')}` : '';
      const item = document.createElement('div');
      item.className = 'rec-item';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <strong>${i + 1}회</strong> (${r.date})<br>
        👤 ${escapeHtml(r.name)} · 난이도: ${diffNames[r.difficulty] || r.difficulty} · ${r.questionCount}문제<br>
        ✅ ${r.correctCount}개 정답 (<strong>${pct}%</strong>)${timeStr}
        ${r.usedHint ? ' · 💡 힌트 사용' : ' · 💡 힌트 미사용'}
      `;
      wrap.appendChild(item);
    });
  }

  // 성장 그래프 (정답률 꺾은선)
  renderGraph(recs);
}

/* ── 성장 그래프 (순수 SVG) ── */
function renderGraph(recs) {
  const wrap = document.getElementById('graph-wrap');
  if (recs.length < 2) {
    wrap.innerHTML = '<p style="text-align:center;color:#aaa;padding:16px">2회 이상 플레이하면 그래프가 나타나요! 📈</p>';
    return;
  }

  const W = Math.min(wrap.clientWidth || 440, 460);
  const H = 120;
  const pad = { t: 12, b: 24, l: 36, r: 12 };
  const gw = W - pad.l - pad.r;
  const gh = H - pad.t - pad.b;

  const pcts = recs.map(r => Math.round((r.correctCount / r.questionCount) * 100));
  const maxP = 100;

  const pts = pcts.map((p, i) => {
    const x = pad.l + (i / (pcts.length - 1)) * gw;
    const y = pad.t + gh - (p / maxP) * gh;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const polyline = pts.join(' ');

  // 격자선 (20%, 40%, 60%, 80%, 100%)
  let gridLines = '';
  [0, 20, 40, 60, 80, 100].forEach(v => {
    const y = pad.t + gh - (v / maxP) * gh;
    gridLines += `<line x1="${pad.l}" y1="${y.toFixed(1)}" x2="${pad.l + gw}" y2="${y.toFixed(1)}" stroke="#FFE082" stroke-width="1"/>
      <text x="${pad.l - 4}" y="${(y + 4).toFixed(1)}" font-size="9" text-anchor="end" fill="#aaa">${v}</text>`;
  });

  // 데이터 포인트
  let circles = '';
  pts.forEach((pt, i) => {
    const [x, y] = pt.split(',');
    circles += `<circle cx="${x}" cy="${y}" r="4" fill="#FF6F00" stroke="#fff" stroke-width="1.5"/>`;
  });

  wrap.innerHTML = `
    <svg class="graph-svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" aria-label="정답률 추이 그래프" role="img">
      ${gridLines}
      <polyline points="${polyline}" fill="none" stroke="#FF8F00" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
      ${circles}
    </svg>
  `;
}

/* ============================================================
   유틸
   ============================================================ */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function shakeElement(el) {
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => { el.style.animation = ''; }, 400);
}

// shake 애니메이션 주입
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `@keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }`;
document.head.appendChild(shakeStyle);
