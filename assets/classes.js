/**
 * MVLS HOZIN STUDIO LAB - 프로그램(시간표) 데이터
 * ------------------------------------------------------------
 * 현행 구글폼 [1회권] · [월 등록] · [1 Time] 기준 (2026-11-22).
 * 매달 프로그램이 바뀌면 이 파일만 수정하면 됩니다. 워크숍은 구글 시트 '워크숍관리' 탭에서 관리합니다.
 *
 * 필드
 *  id          영구 식별자 (신청 데이터에 저장, 한 번 정하면 바꾸지 않기)
 *  business    'LAB'
 *  day         1=월 … 5=금
 *  genre       config.js 의 genres 키
 *  tickets     '4W'(n주 월등록, weeks: 회차 수) | '1T'(1회권)
 *              price: 원 단위. 1회권은 영문(1 Time) 화면에만 표시, 월등록 금액은 연락처로 안내 (null)
 *  period      기간제 프로그램 { from, to } — 기간 안에 회차가 모두 들어가는 시작일만 선택 가능, 휴식권 적용 X
 *  startsFrom  첫 프로그램일 / closures 휴강(No Program) / subs 대강 / open:false 온라인 신청 막기
 */
window.MVLS_CLASSES = [
  // ───────── 월요일 ─────────
  {
    id: 'MON-1945-LEESE', business: 'LAB', day: 1, start: '19:45', end: '21:05',
    instructor: 'LEESE', title: 'W.I.P.', genre: 'hiphop',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
    closures: ['2026-11-16'],
  },
  {
    id: 'MON-2110-SOONBIN', business: 'LAB', day: 1, start: '21:10', end: '22:30',
    instructor: 'SOONBIN', title: 'Popping Dance Floor', genre: 'popping',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
  },

  // ───────── 화요일 ─────────
  {
    id: 'TUE-1945-SANGA', business: 'LAB', day: 2, start: '19:45', end: '21:05',
    instructor: 'SANG A', title: 'FIRST STEP', genre: 'house', badge: 'BASIC',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
  },

  // ───────── 수요일 ─────────
  {
    id: 'WED-1945-YUJIN', business: 'LAB', day: 3, start: '19:45', end: '21:05',
    instructor: 'YUJIN', title: 'ISOLATION TRAINING', genre: 'all',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
    // [확인 필요] 월등록폼에는 기간 9/9~10/28 로 표기, 1회권·1 Time 폼에는 진행 중으로 표기 → 진행 중으로 입력
  },
  {
    id: 'WED-2110-JAYGEE', business: 'LAB', day: 3, start: '21:10', end: '22:40',
    instructor: 'JAYGEE', title: 'STILL IN THE GROOVE', genre: 'popping',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 60000 }],
  },

  // ───────── 목요일 ─────────
  // [확인 필요] DAM <SOUND & BODY> (18:20) 는 ~10/29 종료로 보여 제외
  {
    id: 'THU-1945-YELLOD', business: 'LAB', day: 4, start: '19:45', end: '21:05',
    instructor: 'YELLO D', title: 'HIPHOP BASIC LEVEL UP', genre: 'hiphop',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
    startsFrom: '2026-11-12',
  },
  {
    id: 'THU-2110-DEEGUN', business: 'LAB', day: 4, start: '21:10', end: '22:30',
    instructor: 'DEEGUN', title: 'GET DOWN', genre: 'hiphop',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
  },

  // ───────── 금요일 ─────────
  {
    id: 'FRI-1820-MING', business: 'LAB', day: 5, start: '18:20', end: '19:40',
    instructor: 'MING', title: 'MEMPHIS JOOKIN BASIC', genre: 'jookin', badge: 'NEW',
    tickets: [{ type: '1T', price: 40000 }],
    period: { from: '2026-12-04', to: '2027-02-26' },
    closures: ['2026-12-25', '2027-01-01'],
    // [확인 필요] 1 Time(외국인) 폼에만 있고 국문 1회권·월등록 폼에는 없음
  },
  {
    id: 'FRI-1945-TORCH', business: 'LAB', day: 5, start: '19:45', end: '21:05',
    instructor: 'TORCH', title: 'ENERGY', genre: 'house',
    tickets: [{ type: '4W', weeks: 4, price: null }, { type: '1T', price: 40000 }],
    closures: ['2026-11-27'],
  },
  {
    id: 'FRI-2110-MING', business: 'LAB', day: 5, start: '21:10', end: '22:30',
    instructor: 'MING', title: 'MEMPHIS JOOKIN', genre: 'jookin', badge: 'NEW',
    tickets: [
      { type: '4W', weeks: 4, price: null },
      { type: '4W', weeks: 8, price: null },
      { type: '4W', weeks: 11, price: null },
      { type: '1T', price: 40000 },
    ],
    // 폼 표기 '12/6~2/26' 은 일요일이라 첫 금요일인 12/4 로 입력 [확인 필요]. 12/25, 1/1 휴강 → 12/4 시작 11주 = 2/26 종료
    period: { from: '2026-12-04', to: '2027-02-26' },
    closures: ['2026-12-25', '2027-01-01'],
  },
];
