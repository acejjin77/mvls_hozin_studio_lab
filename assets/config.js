/**
 * MVLS HOZIN STUDIO LAB - 사이트 설정
 * ------------------------------------------------------------
 * 학원(mvls-web)과 별도 사업자입니다. 접수는 학원과 같은 스프레드시트 파일의 'LAB …' 탭에 따로 쌓입니다.
 * [확인 필요] 표시는 실제 값으로 교체가 필요한 항목입니다.
 */
window.MVLS_CONFIG = {
  /**
   * 학원(mvls-web) config.js 와 '같은' Apps Script 웹앱 URL 을 넣습니다.
   * (학원 Apps Script 프로젝트에 apps-script/Lab.gs 를 추가하고 새 버전으로 재배포한 뒤)
   * 요청에 site=lab 이 붙어 있어 서버가 LAB 신청으로 구분합니다.
   * 비워두면 "데모 모드": 실제 접수 없이 이 브라우저에만 저장되고, 워크숍은 아래 demoWorkshops 로 표시됩니다.
   */
  API_URL: '',

  /** 관리자 시트 주소 (푸터 '관리자' 링크). 비워두면 링크가 숨겨집니다. */
  ADMIN_SHEET_URL: '',

  scheduleMonth: '2026-11',
  bookingWindowWeeks: 6,

  /** 휴강(No Program)일이 월등록 기간에 걸리면 1주 뒤로 밀어 표시 [확인 필요 - 운영 정책] */
  extendOnClosure: true,
  /** 스튜디오 전체 휴무일 */
  holidays: [],

  /**
   * 국문 1회권·월등록 화면에 참여비를 표시할지 여부.
   * 현재 구글폼은 참여비를 표시하지 않고 "연락처로 안내"하므로 false. (영문 1 Time 은 항상 표시)
   */
  showProgramPriceKo: false,

  studio: {
    name: 'MVLS HOZIN STUDIO LAB',
    nameKo: '마블러스호진스튜디오 랩',
    address: '서울시 서초구 방배동 437-23',
    addressEn: '437-23 Bangbae-dong, Seocho-gu, Seoul',
    kakaoUrl: 'http://pf.kakao.com/_TPiDxj/chat',
    kakaoHours: '평일 16:00 – 22:30',
    kakaoHoursEn: 'Weekdays 16:00 – 22:30',
    instagramUrl: 'https://www.instagram.com/mvlshozinstudio.lab/',
    mapUrl: 'https://map.naver.com/p/search/%EC%84%9C%EC%9A%B8%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EB%8F%99%20437-23',
  },

  payment: {
    /** 국문 1회권·월등록: 계좌를 보여주지 않고 연락처로 안내 (현행 구글폼과 동일) */
    notes: [
      '참여비 및 송금처는 신청 시 입력하신 연락처로 안내드립니다.',
      '메시지 발송: 평일 16:00 ~ 22:30',
      '수납까지 완료되어야 신청이 확정됩니다.',
    ],
    /** 영문 1 Time(외국인): 현장 현금 */
    notesEn: [
      'We will contact you on Instagram after you submit.',
      'Korean cards are accepted at the reception, but international cards are not.',
    ],
    /** 워크숍 계좌이체 — 신청 완료 화면에 표시 [확인 필요: LAB 계좌] */
    workshop: {
      bank: '[확인 필요] 은행',
      holder: '[확인 필요] 예금주',
      account: '[확인 필요] 계좌번호',
    },
  },

  /** 워크숍 공통 안내 (워크숍별 추가 안내는 시트 '워크숍관리' 탭의 '안내' 칸) */
  workshopGuide: {
    ko: [
      '신청서 제출 후 참여비 수납까지 완료되어야 신청이 확정됩니다.',
      '신청서를 작성한 날 수납을 완료해주세요. 다음 날로 넘어가면 접수되지 않습니다.',
      '당일 22시까지 신청·수납한 건은 다음 날 오후 3시에 확인 문자를 보내드립니다. (주말은 다음 월요일)',
      '워크숍 시작 20분 전부터 입장할 수 있습니다.',
      '양도 가능합니다 (부분 양도 불가). 양도 신청은 인스타그램 @mvlshozinstudio.lab 으로 문의해주세요.',
      '물·음료는 스튜디오 앞 자판기에서 구매할 수 있으며, 홀 안에는 뚜껑 있는 음료만 반입할 수 있습니다.',
    ],
    en: [
      'Your spot is confirmed once payment is complete.',
      'Doors open 20 minutes before the workshop.',
      'Ticket transfers are allowed (no partial transfers). Contact @mvlshozinstudio.lab on Instagram.',
      'Drinks are sold at the vending machine in front of the studio. Only drinks with lids are allowed in the hall.',
    ],
  },

  /** 사업자 정보 (푸터) [확인 필요] */
  businesses: {
    LAB: { name: '마블러스호진스튜디오 랩', ceo: '강호진', bizNo: '[확인 필요]' },
  },

  /** 장르 색상 */
  genres: {
    popping: { label: 'POPPING', color: '#4a86f0' },
    hiphop: { label: 'HIPHOP', color: '#f3c234' },
    house: { label: 'HOUSE', color: '#cf9a6c' },
    jookin: { label: 'MEMPHIS JOOKIN', color: '#2bb3a3' },
    all: { label: 'FOR ALL DANCERS', color: '#e2615c' },
  },

  /** 전체 공지 (프로그램별 휴강·대강은 classes.js 에서 자동 공지) */
  notices: [],

  /**
   * 데모 모드(API_URL 비어 있음)에서만 쓰는 워크숍 예시.
   * 실제 운영에서는 구글 시트 '워크숍관리' 탭의 내용이 표시됩니다.
   */
  demoWorkshops: [
    { id: '1128-paris', status: '모집중', title: 'PARIS', date: '2026-11-28', place: '마블러스 호진 스튜디오 랩 (서울 서초구 방배동 437-23)', poster: '', note: '시간변경 (11/14)',
      options: [{ idx: 0, name: 'PARIS', time: '18:30-20:00', price: 50000 }] },
    { id: '1128-cio', status: '모집중', title: 'CIO', date: '2026-11-28', place: '마블러스 호진 스튜디오 랩 (서울 서초구 방배동 437-23)', poster: '', note: '',
      options: [{ idx: 0, name: 'CIO', time: '20:00-21:30', price: 50000 }] },
    { id: '1205-yudat', status: '모집중', title: 'YUDAT FAM', date: '2026-12-05', place: '마블러스 호진 스튜디오 랩 (서울 서초구 방배동 437-23)', poster: '', note: '1타임 120,000원 / 전체 240,000원',
      options: [
        { idx: 0, name: 'A (JUNIOR YUDAT & SAM YUDAT)', time: '15:00-18:00', price: 120000 },
        { idx: 1, name: 'B (JIMMY YUDAT & KUTY)', time: '19:00-22:00', price: 120000 },
        { idx: 2, name: '전체신청 A & B', time: '15:00-22:00', price: 240000 },
      ] },
  ],

  termsVersion: 'lab-2026-11-v1',
};
