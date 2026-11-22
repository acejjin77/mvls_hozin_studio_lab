/* MVLS HOZIN STUDIO LAB — 프로그램 · 워크숍 신청 (비회원) */
(function () {
  'use strict';

  var CFG = window.MVLS_CONFIG;
  var CLASSES = window.MVLS_CLASSES || [];
  var TERMS = window.MVLS_TERMS || {};
  var DEMO = !CFG.API_URL;
  var DEMO_KEY = 'mvls_lab_demo_applications';
  var PROFILE_KEY = 'mvls_lab_applicant';
  var LANG_KEY = 'mvls_lab_lang';

  /* ───────────────────────── i18n ───────────────────────── */
  var T = {
    ko: {
      'nav.apply': '신청하기', 'nav.lookup': '신청내역', 'nav.lookupLong': '신청내역 조회',
      'hero.lead': '마블러스호진스튜디오 랩의 스트릿 댄스 프로그램과 워크숍을 신청하세요.',
      'hero.place': '방배동', 'hero.ticket': '신청서', 'hero.ticketDesc': '1회권 · 월 등록 · 워크숍',
      'hero.cta': '프로그램 고르기', 'hero.kakao': '카카오 상담',
      'notice.title': '휴강 · 대강 안내',
      'forms.title': '신청서', 'forms.hint': '신청서를 고르면 해당 신청으로 이동해요',
      'forms.program': '[1회권 · 월 등록] 프로그램 신청서', 'forms.programD': '프로그램을 고른 뒤 1회권 또는 월 등록 중 선택',
      'forms.foreign': '[1 Time] Register for Foreigner', 'forms.foreignD': '외국인 1회 신청 · 현장 현금 (영문 화면)',
      'forms.ws': '[Workshop] 워크숍 신청서', 'forms.wsD': '진행 예정 워크숍 신청',
      'tt.title': '전체 프로그램', 'tt.hint': '프로그램을 누르면 바로 신청할 수 있어요',
      'cls.title': '프로그램 선택', 'cls.hint': '요일을 고르고 프로그램을 선택하세요',
      'how.title': '신청 방법',
      'how.s1': '프로그램 · 권종 선택', 'how.s1d': '1회권 또는 월 등록, 참여 날짜를 고릅니다.',
      'how.s2': '신청자 정보 입력', 'how.s2d': '이름과 연락처만 있으면 됩니다. 회원가입은 필요 없어요.',
      'how.s3': '수납 안내 받기', 'how.s3d': '참여비와 송금처를 입력하신 연락처로 안내드립니다.',
      'how.s4': '신청 완료', 'how.s4d': '수납이 확인되면 신청이 확정됩니다.',
      'ws.title': '워크숍', 'ws.hint': '워크숍을 누르면 신청할 수 있어요', 'ws.loading': '워크숍 정보를 불러오는 중…',
      'ws.empty': '지금 모집 중인 워크숍이 없어요. 인스타그램 @mvlshozinstudio.lab 에서 소식을 확인해주세요.',
      'ws.fail': '워크숍 정보를 불러오지 못했어요. 잠시 후 새로고침하거나 카카오 채널로 문의해주세요.',
      'ws.soldout': 'SOLD OUT', 'ws.apply': '신청하기', 'ws.place': '장소',
      'loc.map': '지도 보기', 'loc.kakao': '카카오 채널 문의',
      'ft.refund': '프로그램 참여 안내', 'ft.privacy': '<b>개인정보 처리방침</b>', 'ft.admin': '관리자',
      'ft.note': '프로그램 일정은 스튜디오 사정에 따라 변경될 수 있습니다.',
      'f.title': '프로그램 신청',
      'f.ticket': '권종', 'f.date': '참여 시작일', 'f.dateOne': '참여 일자',
      'f.name': '이름', 'f.phone': '연락처', 'f.age': '연령대 <small>(선택)</small>', 'f.ageNone': '선택 안 함',
      'f.kind': '신청 구분', 'f.kindPre': '사전 신청', 'f.kindOnsite': '현장 신청 (스튜디오에서 신청)',
      'f.minor': '신청자가 만 14세 미만입니다 (보호자 정보 입력)',
      'f.gname': '보호자 이름', 'f.gphone': '보호자 연락처', 'f.gphonePh': '휴대폰 번호, 이메일 또는 인스타그램 아이디',
      'f.more': '추가 정보 (선택)', 'f.receipt': '현금영수증 발급 번호', 'f.receiptPh': '휴대폰 번호 또는 사업자번호 (희망 시)',
      'f.source': '신청 경로', 'f.interest': '관심 분야', 'f.memo': '문의 사항',
      'f.agreeAll': '아래 내용에 모두 동의합니다',
      'f.agreeRefund': '[필수] 프로그램 참여 안내 확인', 'f.agreePrivacy': '[필수] 개인정보 수집 · 이용 동의',
      'f.agreeGuardian': '[필수] 법정대리인(보호자)으로서 위 내용에 동의합니다',
      'f.view': '보기', 'f.submit': '신청하기', 'f.sending': '접수 중…', 'f.total': '참여비',
      'f.priceLater': '참여비는 신청 후 연락처로 안내드려요',
      'd.title': '신청서가 접수되었어요', 'd.id': '접수번호', 'd.payTitle': '참여비 및 송금처는 입력하신 연락처로 안내드립니다',
      'd.copy': '계좌 복사', 'd.amount': '참여비', 'd.more': '다른 프로그램도 신청하기', 'd.close': '닫기',
      'd.class': '프로그램', 'd.ticket': '권종', 'd.when': '일정', 'd.name': '신청자',
      'ticket.4W': '월 등록 {n}주', 'ticket.1T': '1회권', 'ticket.FULL': '전체',
      'ticket.sessions': '총 {n}회', 'ticket.one': '선택한 날 1회',
      'ticket.noDate': '신청 가능한 날짜가 없어요',
      'date.today': '오늘', 'date.sub': '대강',
      'help.sessions': '참여 예정일: {list}', 'help.closed': '{d} 휴강', 'help.sub': '{d} {by} 강사님 대강',
      'help.period': '기간제 프로그램 ({from} ~ {to}) · 휴식권 적용 안 됨',
      'help.extend': '휴강일은 건너뛰고 다음 주로 연장해 표시했어요',
      'cls.empty': '이 요일에는 프로그램이 없어요', 'cls.closedOnline': '온라인 신청 준비 중 · 카카오 문의',
      'cls.until': '~{d}', 'cls.from': '{d} 시작', 'cls.only': '{list} 진행',
      'err.ticket': '권종을 선택해주세요.', 'err.date': '참여 날짜를 선택해주세요.',
      'err.name': '이름을 입력해주세요.', 'err.phone': '연락 가능한 휴대폰 번호를 입력해주세요. (예: 010-1234-5678)',
      'err.gname': '보호자 이름을 입력해주세요.', 'err.gphone': '보호자 휴대폰 번호, 이메일, 인스타그램 아이디(@아이디) 중 하나를 입력해주세요.',
      'err.agree': '필수 항목에 동의해주세요.', 'err.option': '신청할 타임을 선택해주세요.',
      'err.network': '접수 서버에 연결하지 못했어요. 잠시 후 다시 시도하거나 카카오 채널로 문의해주세요. (입력한 내용은 그대로 남아 있어요)',
      'err.DUPLICATE': '같은 연락처로 이미 신청한 내역이 있어요. 변경이 필요하면 카카오 채널로 문의해주세요.',
      'err.RATE_LIMIT': '짧은 시간에 신청이 너무 많아요. 잠시 후 다시 시도해주세요.',
      'err.INVALID': '입력값을 다시 확인해주세요.',
      'err.WS_CLOSED': '이 워크숍은 신청이 마감되었어요.', 'err.WS_NOT_FOUND': '워크숍 정보를 찾을 수 없어요. 새로고침 후 다시 시도해주세요.',
      'err.SERVER': '접수 중 문제가 생겼어요. 카카오 채널로 문의해주세요.',
      'toast.copied': '계좌번호를 복사했어요', 'toast.copyFail': '복사하지 못했어요. 직접 입력해주세요.',
      'reel.pause': '영상 일시정지', 'reel.play': '영상 재생',
      'f.ig': '인스타그램 아이디', 'err.ig': '인스타그램 아이디를 입력해주세요. (영문·숫자·밑줄·마침표)',
      'w.title': '워크숍 신청', 'w.option': '신청 타임', 'w.igHelp': '연락 용도로 사용해요',
      'w.pay': '수납 방법', 'w.payTransfer': '계좌이체', 'w.payTransferD': '계좌번호는 신청 완료 화면에 나와요',
      'w.payCash': '현장 현금', 'w.payCashD': '외국인 (Pay by cash)',
      'w.depositor': '예금주명 <small>(신청자 이름과 다를 때)</small>',
      'w.agreePrivacy': '[필수] 개인정보 수집 · 이용 동의 (참여 모습 촬영 포함)', 'w.agreeRefund': '[필수] 환불 규정 확인 (신청 완료 후 환불 불가, 양도 가능)',
      'w.guide': '워크숍 안내', 'w.payTitle': '아래 계좌로 오늘 안에 입금해주세요', 'w.cashTitle': '참여비는 현장에서 현금으로 납부해주세요',
      'w.optionLbl': '타임',
      'lk.title': '신청내역 조회', 'lk.desc': '신청할 때 입력한 이름과 연락처를 입력해주세요.', 'lk.submit': '조회하기', 'lk.searching': '조회 중…',
      'lk.count': '신청 {n}건', 'lk.again': '다시 조회', 'lk.none': '일치하는 신청 내역이 없어요. 신청할 때 입력한 이름과 연락처가 맞는지 확인하거나 카카오 채널로 문의해주세요.',
      'lk.received': '신청일', 'lk.dates': '참여일', 'lk.amount': '참여비', 'lk.pay': '결제', 'lk.ws': '워크숍',
      'lk.needName': '이름을 입력해주세요.', 'lk.note': '취소 · 변경은 카카오 채널로 문의해주세요.',
      'days': ['일', '월', '화', '수', '목', '금', '토'],
    },
    en: {
      'nav.apply': 'Book', 'nav.lookup': 'My bookings', 'nav.lookupLong': 'My bookings',
      'hero.lead': 'Street dance programs and workshops at MVLS HOZIN STUDIO LAB.',
      'hero.place': 'Bangbae', 'hero.ticket': 'Booking', 'hero.ticketDesc': '1 Time · Workshops',
      'hero.cta': 'Find a program', 'hero.kakao': 'Ask on Kakao',
      'notice.title': 'Schedule changes',
      'forms.title': 'Applications', 'forms.hint': 'Pick an application form',
      'forms.program': '[1회권 · 월 등록] Korean program form', 'forms.programD': 'Korean page · 1-time or monthly',
      'forms.foreign': '[1 Time] Register for Foreigner', 'forms.foreignD': 'One program · pay in cash at the studio',
      'forms.ws': '[Workshop] Workshops', 'forms.wsD': 'Upcoming workshops',
      'tt.title': 'Programs', 'tt.hint': 'Tap a program to book',
      'cls.title': 'Programs', 'cls.hint': 'Choose a day, then a program',
      'how.title': 'How to book',
      'how.s1': 'Choose a program', 'how.s1d': 'Pick a program and the date you want to join.',
      'how.s2': 'Your details', 'how.s2d': 'Just your name and Instagram ID. No sign-up needed.',
      'how.s3': 'Pay in cash', 'how.s3d': 'Please pay in cash at the studio reception.',
      'how.s4': 'Confirmation', 'how.s4d': 'The studio will contact you on Instagram.',
      'ws.title': 'Workshops', 'ws.hint': 'Tap a workshop to apply', 'ws.loading': 'Loading workshops…',
      'ws.empty': 'No workshops open right now. Follow @mvlshozinstudio.lab on Instagram for news.',
      'ws.fail': 'Could not load workshops. Please refresh, or contact us on Kakao.',
      'ws.soldout': 'SOLD OUT', 'ws.apply': 'Apply', 'ws.place': 'Place',
      'loc.map': 'Map', 'loc.kakao': 'Kakao channel',
      'ft.refund': 'Program information', 'ft.privacy': '<b>Privacy policy</b>', 'ft.admin': 'Admin',
      'ft.note': 'Schedules may change depending on studio circumstances.',
      'f.title': '[1 Time] Register for Foreigner',
      'f.ticket': 'Pass', 'f.date': 'Start date', 'f.dateOne': 'Visiting date',
      'f.name': 'Name', 'f.phone': 'Phone', 'f.age': 'Age group <small>(optional)</small>', 'f.ageNone': 'Prefer not to say',
      'f.kind': 'Type of registration', 'f.kindPre': 'Pre-registration', 'f.kindOnsite': 'Registration at the studio',
      'f.minor': 'The participant is under 14 (guardian details required)',
      'f.gname': 'Guardian name', 'f.gphone': 'Guardian contact', 'f.gphonePh': 'Phone, email or Instagram ID',
      'f.more': 'More details (optional)', 'f.receipt': 'Cash receipt number', 'f.receiptPh': 'Phone or business number (if needed)',
      'f.source': 'How did you find us?', 'f.interest': 'Interests', 'f.memo': 'Questions',
      'f.agreeAll': 'I agree to all of the below',
      'f.agreeRefund': '[Required] Program information', 'f.agreePrivacy': '[Required] Collection and use of personal information',
      'f.agreeGuardian': '[Required] I agree as the legal guardian',
      'f.view': 'View', 'f.submit': 'Book now', 'f.sending': 'Sending…', 'f.total': 'Price',
      'f.priceLater': 'We will tell you the price after you apply',
      'd.title': 'Your application is in', 'd.id': 'Ref.', 'd.payTitle': 'Please pay in cash at the studio.',
      'd.copy': 'Copy', 'd.amount': 'Amount due', 'd.more': 'Book another program', 'd.close': 'Close',
      'd.class': 'Program', 'd.ticket': 'Pass', 'd.when': 'Date', 'd.name': 'Name',
      'ticket.4W': '{n}-week', 'ticket.1T': '1 Time', 'ticket.FULL': 'Full course',
      'ticket.sessions': '{n} sessions', 'ticket.one': 'One program',
      'ticket.noDate': 'No dates available',
      'date.today': 'Today', 'date.sub': 'Sub',
      'help.sessions': 'Your dates: {list}', 'help.closed': '{d} no program', 'help.sub': '{d} sub: {by}',
      'help.period': 'Runs {from} – {to}',
      'help.extend': 'No-program dates are skipped',
      'cls.empty': 'No programs on this day', 'cls.closedOnline': 'Online booking coming soon · ask on Kakao',
      'cls.until': 'until {d}', 'cls.from': 'starts {d}', 'cls.only': '{list} only',
      'err.ticket': 'Please choose a pass.', 'err.date': 'Please choose a date.',
      'err.name': 'Please enter your name.', 'err.phone': 'Please enter a valid phone number.',
      'err.gname': 'Please enter the guardian’s name.', 'err.gphone': 'Please enter the guardian’s phone number, email or Instagram ID (@id).',
      'err.agree': 'Please agree to the required items.', 'err.option': 'Please choose a time slot.',
      'err.network': 'We could not reach the server. Please try again, or contact us on Kakao. (Your entries are kept.)',
      'err.DUPLICATE': 'You have already applied for this. Contact us on Kakao to change it.',
      'err.RATE_LIMIT': 'Too many attempts. Please try again shortly.',
      'err.INVALID': 'Please check your entries.',
      'err.WS_CLOSED': 'This workshop is closed.', 'err.WS_NOT_FOUND': 'Workshop not found. Please refresh and try again.',
      'err.SERVER': 'Something went wrong. Please contact us on Kakao.',
      'toast.copied': 'Account number copied', 'toast.copyFail': 'Could not copy. Please type it in.',
      'reel.pause': 'Pause video', 'reel.play': 'Play video',
      'f.ig': 'Instagram ID', 'err.ig': 'Please enter your Instagram ID (letters, numbers, _ and .).',
      'w.title': 'Workshop application', 'w.option': 'Time slot', 'w.igHelp': 'We use this to contact you',
      'w.pay': 'Payment', 'w.payTransfer': 'Bank transfer', 'w.payTransferD': 'Korean bank account',
      'w.payCash': 'Pay by cash', 'w.payCashD': 'For foreigners, at the studio',
      'w.depositor': 'Account holder name <small>(if different)</small>',
      'w.agreePrivacy': '[Required] Personal information (incl. photos/video of the workshop)', 'w.agreeRefund': '[Required] Refund policy (no refunds, transfers allowed)',
      'w.guide': 'Workshop information', 'w.payTitle': 'Please transfer to this account today', 'w.cashTitle': 'Please pay in cash at the studio.',
      'w.optionLbl': 'Time',
      'lk.title': 'My bookings', 'lk.desc': 'Enter the name and Instagram ID you used when booking.', 'lk.submit': 'Search', 'lk.searching': 'Searching…',
      'lk.count': '{n} booking(s)', 'lk.again': 'Search again', 'lk.none': 'No bookings found. Please check your name and Instagram ID, or contact us on Kakao.',
      'lk.received': 'Booked', 'lk.dates': 'Dates', 'lk.amount': 'Amount', 'lk.pay': 'Payment', 'lk.ws': 'Workshop',
      'lk.needName': 'Please enter your name.', 'lk.note': 'To cancel or change a booking, please contact us on Kakao.',
      'days': ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    },
  };
  var DAY_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var STATUS = {
    '입금대기': { en: 'Awaiting payment', cls: 'wait' }, '입금확인': { en: 'Paid', cls: 'paid' },
    '확정': { en: 'Confirmed', cls: 'ok' }, '대기': { en: 'Waitlisted', cls: 'hold' },
    '취소': { en: 'Cancelled', cls: 'off' }, '환불': { en: 'Refunded', cls: 'off' },
  };
  var PAY_EN = { '계좌이체': 'Bank transfer', '현장 현금': 'Cash at studio', '안내 후 수납': 'Pay after notice' };

  /** 영문(외국인) 신청: 연락처 대신 인스타그램 아이디, 결제는 현장 현금 */
  function isForeign() { return lang === 'en'; }
  function normIg(v) {
    var s = String(v || '').trim().toLowerCase()
      .replace(/^(https?:\/\/)?(www\.)?instagram\.com\//, '').replace(/[/?#].*$/, '').replace(/^@/, '');
    return /^[a-z0-9._]{1,30}$/.test(s) ? s : '';
  }

  /**
   * 보호자 연락처: 휴대폰 번호 / 이메일 / 인스타그램 아이디 중 하나 → 시트 '보호자연락처' 한 칸에 저장
   *  010-1234-5678, +1 415 555 0100 → 전화 / parent@mail.com → 이메일 / @id, instagram.com/id, id → 인스타그램(@id)
   */
  function normContact(v) {
    var s = String(v || '').trim();
    if (!s) return '';
    if (s.length <= 100 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return s.toLowerCase();
    if (/^[+\d][\d\s-]*$/.test(s)) return validPhone(s) ? formatPhone(s) : '';
    var ig = normIg(s);
    return ig ? '@' + ig : '';
  }
  var INTERESTS = [
    ['팝핑', 'Popping'], ['힙합', 'Hiphop'], ['락킹', 'Locking'], ['왁킹', 'Waacking'],
    ['하우스', 'House'], ['리듬', 'Rhythm'], ['프리스타일', 'Freestyle'], ['트레이닝', 'Training'],
  ];

  var lang = 'ko';
  try { lang = localStorage.getItem(LANG_KEY) || 'ko'; } catch (e) { /* storage 불가 */ }
  if (!T[lang]) lang = 'ko';

  function t(key, vars) {
    var s = (T[lang][key] !== undefined ? T[lang][key] : T.ko[key]);
    if (s === undefined) return key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  /* ───────────────────────── 날짜 (KST) ───────────────────────── */
  function kstNow() {
    var parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false,
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    return { date: o.year + '-' + o.month + '-' + o.day, time: (o.hour === '24' ? '00' : o.hour) + ':' + o.minute };
  }
  function toUTC(s) { var a = s.split('-'); return Date.UTC(+a[0], +a[1] - 1, +a[2]); }
  function fromUTC(ms) { return new Date(ms).toISOString().slice(0, 10); }
  function addDays(s, n) { return fromUTC(toUTC(s) + n * 86400000); }
  function dow(s) { return new Date(toUTC(s)).getUTCDay(); }
  function md(s) { var a = s.split('-'); return (+a[1]) + '/' + (+a[2]); }
  function mdDay(s) { return md(s) + '(' + t('days')[dow(s)] + ')'; }
  function won(n) { return n.toLocaleString('ko-KR') + (lang === 'ko' ? '원' : ' KRW'); }
  function maxStr(a, b) { return a > b ? a : b; }

  var NOW = kstNow();
  var TODAY = NOW.date;

  /* ───────────────────────── 수업 도메인 ───────────────────────── */
  function byId(id) { return CLASSES.filter(function (c) { return c.id === id; })[0]; }
  /** 영문(1 Time, 외국인)은 1회권만 신청 가능 */
  function allowedTk(tk) { return !isForeign() || tk.type === '1T'; }
  function isOpen(c) { return c.open !== false && c.tickets && c.tickets.some(allowedTk); }
  /** 국문 1회권·월등록은 참여비를 연락처로 안내 (config.showProgramPriceKo), 영문 1 Time 은 표시 */
  function showPrice() { return isForeign() || !!CFG.showProgramPriceKo; }
  function priceOf(tk) { return showPrice() && tk.price != null ? won(tk.price) : ''; }
  function genre(c) { return CFG.genres[c.genre] || { label: '', color: '#888' }; }
  function title(c) { return (lang === 'ko' && c.titleKo) ? c.titleKo : c.title; }
  function closures(c) { return (c.closures || []).concat(CFG.holidays || []); }
  function subOn(c, d) { return (c.subs || []).filter(function (s) { return s.date === d; })[0]; }
  function ticketLabel(tk) { return t('ticket.' + tk.type, { n: tk.weeks }); }
  function ticketLabelKo(tk) { return T.ko['ticket.' + tk.type].replace('{n}', tk.weeks); }

  /** 이 날짜에 이미 수업이 시작됐는지 (오늘 + 시작시각 경과) */
  function started(c, d) { return d < TODAY || (d === TODAY && NOW.time >= c.start); }

  /** 수업이 열리는 날짜 후보 (휴강일 제외 X) */
  function candidateDates(c) {
    if (c.dates) return c.dates.slice();
    var from = TODAY;
    if (c.startsFrom) from = maxStr(from, c.startsFrom);
    if (c.period) from = maxStr(from, c.period.from);
    var until = addDays(TODAY, CFG.bookingWindowWeeks * 7);
    if (c.period && c.period.to < until) until = c.period.to;
    var d = from;
    while (dow(d) !== c.day) d = addDays(d, 1);
    var out = [];
    for (; d <= until; d = addDays(d, 7)) out.push(d);
    return out;
  }

  /** 시작일부터 n회차 날짜 */
  function sessionDates(c, start, tk) {
    if (tk.type !== '4W') return [start];
    var out = [], d = start, guard = 0;
    while (out.length < tk.weeks && guard++ < 52) {
      if (!(CFG.extendOnClosure && closures(c).indexOf(d) >= 0)) out.push(d);
      d = addDays(d, 7);
    }
    return out;
  }

  /** 권종별 선택 가능한 시작일 */
  function startDates(c, tk) {
    return candidateDates(c).filter(function (d) {
      if (started(c, d)) return false;
      if (closures(c).indexOf(d) >= 0) return false;
      if (tk.type === '4W' && c.period) {
        var s = sessionDates(c, d, tk);
        if (s[s.length - 1] > c.period.to) return false; // 기간 안에 회차가 모두 들어가야 함
      }
      return true;
    });
  }

  /* ───────────────────────── DOM helpers ───────────────────────── */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function toast(msg) {
    var el = $('#toast');
    el.textContent = msg;
    el.classList.add('is-on');
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { el.classList.remove('is-on'); }, 2200);
  }

  /* ───────────────────────── 정적 문구 ───────────────────────── */
  function applyI18n() {
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(function (el) { el.innerHTML = t(el.getAttribute('data-i18n')); });
    $$('[data-i18n-ph]').forEach(function (el) { el.placeholder = t(el.getAttribute('data-i18n-ph')); });
    $$('.lang button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    syncLangFields();
    var tg = $('#reelToggle');
    if (tg) tg.setAttribute('aria-label', t(tg.getAttribute('aria-pressed') === 'true' ? 'reel.play' : 'reel.pause'));
    var ym = CFG.scheduleMonth.split('-');
    var monthEn = new Date(Date.UTC(+ym[0], +ym[1] - 1, 1)).toLocaleString('en-US', { month: 'long', timeZone: 'UTC' }).toUpperCase();
    $('#ttMonth').textContent = ym[0] + '.' + ym[1] + ' · TIMETABLE';
    $('#heroAddr').textContent = lang === 'ko' ? CFG.studio.address : CFG.studio.addressEn;
    $('#locAddr').textContent = lang === 'ko' ? CFG.studio.address : CFG.studio.addressEn;
    $('#locHours').textContent = (lang === 'ko' ? '카카오 채널 상담 ' + CFG.studio.kakaoHours : 'Kakao chat ' + CFG.studio.kakaoHoursEn);
  }

  function syncLangFields() {
    var en = isForeign();
    $('#phoneField').hidden = en;
    $('#igField').hidden = !en;
    $('#receiptField').hidden = en; // 현금영수증은 국내 번호 기준이라 영문에서는 숨김
    $('#lkPhoneField').hidden = en;
    $('#lkIgField').hidden = !en;
  }

  function renderStatic() {
    $('#kakaoHero').href = CFG.studio.kakaoUrl;
    $('#kakaoLink').href = CFG.studio.kakaoUrl;
    $('#mapLink').href = CFG.studio.mapUrl;
    if (CFG.studio.instagramUrl) { $('#instaLink').href = CFG.studio.instagramUrl; $('#instaLink').hidden = false; }
    var admin = $('#adminLink');
    if (CFG.ADMIN_SHEET_URL) admin.href = CFG.ADMIN_SHEET_URL; else admin.hidden = true;
    if (DEMO) $('#demoAdminBtn').hidden = false;

    var b = CFG.businesses.LAB;
    $('#bizInfo').innerHTML =
      '<p>' + esc(b.name) + ' (' + esc(CFG.studio.name) + ') · 대표 ' + esc(b.ceo) + ' · 사업자등록번호 ' + esc(b.bizNo) + '</p>' +
      '<p>' + esc(CFG.studio.address) + '</p>';

    $('#interestTags').innerHTML = INTERESTS.map(function (it) {
      return '<label><input type="checkbox" name="interests" value="' + esc(it[0]) + '"><span>' + esc(it[0]) + ' · ' + esc(it[1]) + '</span></label>';
    }).join('');
  }

  function renderLegend() {
    $('#genreLegend').innerHTML = Object.keys(CFG.genres).map(function (k) {
      var g = CFG.genres[k];
      return '<span><i style="background:' + g.color + '"></i>' + esc(g.label) + '</span>';
    }).join('');
  }

  function renderNotices() {
    var items = [];
    CLASSES.forEach(function (c) {
      (c.closures || []).forEach(function (d) { if (d >= TODAY) items.push({ d: d, c: c, kind: 'off' }); });
      (c.subs || []).forEach(function (s) { if (s.date >= TODAY) items.push({ d: s.date, c: c, kind: 'sub', by: s.by }); });
    });
    (CFG.holidays || []).forEach(function (d) { if (d >= TODAY) items.push({ d: d, kind: 'holiday' }); });
    items.sort(function (a, b) { return a.d < b.d ? -1 : 1; });
    var html = items.map(function (it) {
      if (it.kind === 'holiday') return '<li><b>' + mdDay(it.d) + '</b>' + (lang === 'ko' ? '스튜디오 전체 휴무' : 'Studio closed') + '<span class="tag tag--off">' + (lang === 'ko' ? '휴강' : 'NO CLASS') + '</span></li>';
      var tag = it.kind === 'off'
        ? '<span class="tag tag--off">' + (lang === 'ko' ? '휴강' : 'NO CLASS') + '</span>'
        : '<span class="tag tag--sub">' + (lang === 'ko' ? esc(it.by) + ' 강사님 대강' : 'SUB · ' + esc(it.by)) + '</span>';
      return '<li><b>' + mdDay(it.d) + '</b>' + esc(it.c.instructor) + ' ' + esc(title(it.c)) + tag + '</li>';
    });
    (CFG.notices || []).forEach(function (n) { html.push('<li>' + esc(n[lang] || n.ko) + '</li>'); });
    $('#noticeList').innerHTML = html.join('');
    $('#noticeSection').hidden = html.length === 0;
  }

  function slotOf(c) { return c.start < '19:00' ? 0 : (c.start < '21:00' ? 1 : 2); }

  function ttCard(c) {
    var g = genre(c);
    var closed = !isOpen(c);
    return '<button type="button" class="ttcard' + (closed ? ' is-closed' : '') + '" style="--g:' + g.color + '" data-class="' + esc(c.id) + '"' +
      ' aria-label="' + esc(c.instructor + ' ' + title(c) + ' ' + c.start + '~' + c.end) + '">' +
      '<span class="ttcard__ins">' + esc(c.instructor) + '</span>' +
      '<span class="ttcard__body">' + (c.badge ? '<span class="ttcard__badge">' + esc(c.badge) + '</span>' : '') +
      '<span class="ttcard__title">' + esc(title(c)) + '</span>' +
      '<span class="ttcard__time">' + c.start + '–' + c.end + '</span></span></button>';
  }

  function renderTimetable() {
    var days = [1, 2, 3, 4, 5];
    var todayDow = dow(TODAY);
    var html = '<div class="tt__h"></div>' + days.map(function (d) {
      return '<div class="tt__h' + (d === todayDow ? ' is-today' : '') + '">' + DAY_EN[d] + '<small>' + T.ko.days[d] + '요일</small></div>';
    }).join('');
    var labels = ['18:20', '19:45', '21:10'];
    for (var s = 0; s < 3; s++) {
      html += '<div class="tt__t">' + labels[s] + '</div>';
      days.forEach(function (d) {
        var list = CLASSES.filter(function (c) { return c.day === d && slotOf(c) === s; })
          .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
        html += '<div class="tt__c">' + list.map(ttCard).join('') + '</div>';
      });
    }
    $('#timetableGrid').innerHTML = html;
  }

  var activeDay = (function () { var d = dow(TODAY); return d >= 1 && d <= 5 ? d : 1; })();

  function renderDayTabs() {
    $('#dayTabs').innerHTML = [1, 2, 3, 4, 5].map(function (d) {
      return '<button type="button" class="daytab" role="tab" data-day="' + d + '" aria-selected="' + (d === activeDay) + '">' + DAY_EN[d] + '</button>';
    }).join('');
  }

  function classMeta(c) {
    var m = [];
    if (!isOpen(c)) return '<span class="warn">' + t('cls.closedOnline') + '</span>';
    c.tickets.filter(allowedTk).forEach(function (tk) { var pr = priceOf(tk); m.push('<span>' + ticketLabel(tk) + (pr ? ' ' + pr : '') + '</span>'); });
    if (c.dates) m.push('<span class="hi">' + t('cls.only', { list: c.dates.map(md).join(', ') }) + '</span>');
    if (c.period) m.push('<span class="hi">' + md(c.period.from) + ' ~ ' + md(c.period.to) + '</span>');
    if (c.startsFrom && c.startsFrom >= TODAY) m.push('<span class="hi">' + t('cls.from', { d: md(c.startsFrom) }) + '</span>');
    (c.closures || []).filter(function (d) { return d >= TODAY; }).forEach(function (d) {
      m.push('<span class="warn">' + t('help.closed', { d: md(d) }) + '</span>');
    });
    (c.subs || []).filter(function (s) { return s.date >= TODAY; }).forEach(function (s) {
      m.push('<span class="hi">' + t('help.sub', { d: md(s.date), by: esc(s.by) }) + '</span>');
    });
    return m.join('');
  }

  function renderClassList() {
    var list = CLASSES.filter(function (c) { return c.day === activeDay; })
      .sort(function (a, b) { return a.start < b.start ? -1 : 1; });
    if (!list.length) { $('#classList').innerHTML = '<p class="empty">' + t('cls.empty') + '</p>'; return; }
    $('#classList').innerHTML = list.map(function (c) {
      var g = genre(c);
      return '<button type="button" class="cls' + (isOpen(c) ? '' : ' is-closed') + '" style="--g:' + g.color + '" data-class="' + esc(c.id) + '">' +
        '<span class="cls__time"><b>' + c.start + '</b><span>~ ' + c.end + '</span></span>' +
        '<span class="cls__main">' +
          '<span class="cls__ins"><b>' + esc(c.instructor) + '</b><span class="cls__genre">' + esc(g.label) + (c.badge ? ' · ' + esc(c.badge) : '') + '</span></span>' +
          '<span class="cls__title" style="display:block">' + esc(title(c)) + '</span>' +
          '<span class="cls__meta">' + classMeta(c) + '</span>' +
        '</span>' +
        '<span class="cls__go" aria-hidden="true">›</span></button>';
    }).join('');
  }

  function renderAll() {
    applyI18n(); renderLegend(); renderNotices(); renderTimetable(); renderDayTabs(); renderClassList();
    if (typeof renderWorkshops === 'function' && $('#workshopList')) renderWorkshops();
    if (state.cls && !$('#applyModal').hidden && $('#doneView').hidden) renderBooking(true);
    if (WS.cur && !$('#wsModal').hidden && $('#wsDone').hidden) renderWorkshopForm();
  }

  /* ───────────────────────── 모달 공통 ───────────────────────── */
  var lastFocus = null;
  function openModal(id) {
    var m = document.getElementById(id);
    if (!$$('.modal').some(function (x) { return !x.hidden; })) lastFocus = document.activeElement;
    m.hidden = false;
    document.body.classList.add('lock');
    var f = m.querySelector('.iconbtn');
    if (f) f.focus({ preventScroll: true });
  }
  function closeModal(m) {
    m.hidden = true;
    if (!$$('.modal').some(function (x) { return !x.hidden; })) {
      document.body.classList.remove('lock');
      if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
    }
  }

  function openTerms(kind) {
    var doc = TERMS[kind] && (TERMS[kind][lang] || TERMS[kind].ko);
    if (!doc) return;
    $('#termsTitle').textContent = doc.title;
    $('#termsBody').innerHTML = doc.html;
    openModal('termsModal');
  }

  /* ───────────────────────── 신청서 ───────────────────────── */
  var state = { cls: null, ticketIdx: -1, date: null, startedAt: 0, requestId: null, prefer: null };
  var form = $('#applyForm');

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'r' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  function openBooking(classId) {
    var c = byId(classId);
    if (!c) return;
    if (!isOpen(c)) { toast(t('cls.closedOnline')); return; }
    state.cls = c;
    state.ticketIdx = -1;
    state.date = null;
    state.startedAt = Date.now();
    state.requestId = uuid();
    // 신청서 바로가기에서 고른 권종(1회권/월 등록) → 없으면 날짜가 있는 첫 권종을 기본 선택
    var ok = function (tk) { return allowedTk(tk) && startDates(c, tk).length; };
    for (var i = 0; i < c.tickets.length; i++) { if (ok(c.tickets[i]) && state.prefer && c.tickets[i].type === state.prefer) { state.ticketIdx = i; break; } }
    if (state.ticketIdx < 0) for (var j = 0; j < c.tickets.length; j++) { if (ok(c.tickets[j])) { state.ticketIdx = j; break; } }
    resetErrors();
    form.hidden = false;
    $('#doneView').hidden = true;
    restoreProfile();
    renderBooking(false);
    openModal('applyModal');
    $('#applyModal .modal__body').scrollTop = 0;
  }

  function renderBooking(keep) {
    var c = state.cls, g = genre(c);
    var picked = $('#pickedClass');
    picked.style.setProperty('--g', g.color);
    picked.innerHTML = '<small>' + DAY_EN[c.day] + ' · ' + c.start + '–' + c.end + ' · ' + esc(g.label) + '</small>' +
      '<b>' + esc(c.instructor) + '</b><span>' + esc(title(c)) + '</span>';

    $('#ticketChoices').innerHTML = c.tickets.map(function (tk, i) {
      if (!allowedTk(tk)) return '';
      var n = startDates(c, tk).length;
      var sub = tk.type === '4W' ? t('ticket.sessions', { n: tk.weeks }) : t('ticket.one');
      var pr = priceOf(tk);
      return '<label class="choice"><input type="radio" name="ticket" value="' + i + '"' + (i === state.ticketIdx ? ' checked' : '') + (n ? '' : ' disabled') + '>' +
        '<span><b>' + ticketLabel(tk) + (pr ? ' · ' + pr : '') + '</b><em>' + (n ? sub : t('ticket.noDate')) + '</em></span></label>';
    }).join('');
    renderDates(keep);
  }

  function renderDates(keep) {
    var c = state.cls, tk = c.tickets[state.ticketIdx];
    $('#dateLegend').textContent = tk && tk.type === '4W' ? t('f.date') : t('f.dateOne');
    $('#applyTitle').textContent = t('f.title');
    if (!tk) { $('#dateChoices').innerHTML = '<p class="empty">' + t('ticket.noDate') + '</p>'; state.date = null; renderHelp(); return; }
    var ds = startDates(c, tk);
    if (!keep || ds.indexOf(state.date) < 0) state.date = ds[0] || null;
    $('#dateChoices').innerHTML = ds.length ? ds.map(function (d) {
      var s = subOn(c, d);
      var small = d === TODAY ? t('date.today') : (s ? t('date.sub') + ' ' + esc(s.by) : t('days')[dow(d)]);
      return '<label class="date' + (s ? ' is-sub' : '') + '"><input type="radio" name="date" value="' + d + '"' + (d === state.date ? ' checked' : '') + '>' +
        '<span><b>' + md(d) + '</b><small>' + small + '</small></span></label>';
    }).join('') : '<p class="empty">' + t('ticket.noDate') + '</p>';
    renderHelp();
  }

  function renderHelp() {
    var c = state.cls, tk = c.tickets[state.ticketIdx], help = [];
    if (tk && state.date) {
      var ss = sessionDates(c, state.date, tk);
      if (tk.type === '4W') {
        help.push(t('help.sessions', { list: ss.map(md).join(', ') }));
        var skipped = closures(c).filter(function (d) { return d > state.date && d < ss[ss.length - 1]; });
        if (skipped.length && CFG.extendOnClosure) help.push(skipped.map(function (d) { return t('help.closed', { d: md(d) }); }).join(', ') + ' · ' + t('help.extend'));
      }
      ss.forEach(function (d) { var s = subOn(c, d); if (s) help.push(t('help.sub', { d: md(d), by: esc(s.by) })); });
    }
    if (c.period) help.push(t('help.period', { from: md(c.period.from), to: md(c.period.to) }));
    $('#scheduleHelp').innerHTML = help.join('<br>');
    var pr = tk ? priceOf(tk) : '';
    $('#priceSummary').innerHTML = !tk ? '' : pr ? '<span>' + t('f.total') + '</span><b>' + pr + '</b>' : '<span>' + t('f.priceLater') + '</span>';
  }

  function formatPhone(v) {
    var d = v.replace(/\D/g, '');
    if (!/^01/.test(d)) return v;
    if (d.length < 4) return d;
    if (d.length < 8) return d.slice(0, 3) + '-' + d.slice(3);
    if (d.length <= 10) return d.slice(0, 3) + '-' + d.slice(3, 6) + '-' + d.slice(6);
    return d.slice(0, 3) + '-' + d.slice(3, 7) + '-' + d.slice(7, 11);
  }
  function validPhone(v) {
    var d = v.replace(/[\s-]/g, '');
    return /^01[016789]\d{7,8}$/.test(d) || /^\+\d{8,15}$/.test(d);
  }

  function resetErrors() {
    $$('[data-err]', form).forEach(function (el) { el.textContent = ''; });
    $$('[aria-invalid]', form).forEach(function (el) { el.removeAttribute('aria-invalid'); });
    $('#formError').hidden = true;
  }
  function setErr(name, msg, input) {
    var el = $('[data-err="' + name + '"]', form);
    if (el) el.textContent = msg;
    if (input) input.setAttribute('aria-invalid', 'true');
  }

  function collect() {
    var c = state.cls, tk = c.tickets[state.ticketIdx];
    var fd = new FormData(form);
    var minor = $('#fMinor').checked;
    return {
      form: 'program', // 1회권 · 월 등록 · 영문 1 Time 모두 'LAB 신청내역' 탭 (영문은 lang:'en' → 1회권만)
      requestId: state.requestId,
      business: c.business,
      classId: c.id,
      day: T.ko.days[c.day],
      time: c.start + '~' + c.end,
      instructor: c.instructor,
      classTitle: c.titleKo ? c.title + ' (' + c.titleKo + ')' : c.title,
      ticketType: tk.type,
      ticketLabel: ticketLabelKo(tk),
      weeks: tk.weeks || 1,
      startDate: state.date,
      sessionDates: sessionDates(c, state.date, tk),
      amount: tk.price == null ? null : tk.price,
      name: (fd.get('name') || '').trim(),
      phone: isForeign() ? '' : formatPhone((fd.get('phone') || '').trim()),
      instagram: isForeign() ? normIg(fd.get('instagram')) : '',
      ageGroup: fd.get('ageGroup') || '',
      channel: fd.get('channel') || '사전 신청',
      isMinor: minor,
      guardianName: minor ? (fd.get('guardianName') || '').trim() : '',
      guardianPhone: minor ? normContact(fd.get('guardianPhone')) : '',
      cashReceipt: isForeign() ? '' : (fd.get('cashReceipt') || '').trim(),
      source: fd.get('source') || '',
      interests: fd.getAll('interests'),
      memo: (fd.get('memo') || '').trim(),
      lang: lang,
      termsVersion: CFG.termsVersion,
      consents: { refund: form.agreeRefund.checked, privacy: form.agreePrivacy.checked, guardian: minor && form.agreeGuardian.checked },
      agreedAt: new Date().toISOString(),
      website: fd.get('website') || '', // honeypot
      elapsedMs: Date.now() - state.startedAt,
    };
  }

  function validate() {
    resetErrors();
    var ok = true, first = null;
    function fail(name, msg, input) { ok = false; setErr(name, msg, input); if (!first) first = input || $('[data-err="' + name + '"]', form); }
    var c = state.cls;
    if (state.ticketIdx < 0 || !c.tickets[state.ticketIdx]) { showFormError(t('err.ticket')); return false; }
    if (!state.date) { showFormError(t('err.date')); return false; }
    var name = $('#fName'), phone = $('#fPhone'), ig = $('#fIg');
    if (!name.value.trim()) fail('name', t('err.name'), name);
    if (isForeign()) { if (!normIg(ig.value)) fail('instagram', t('err.ig'), ig); }
    else if (!validPhone(phone.value)) fail('phone', t('err.phone'), phone);
    if ($('#fMinor').checked) {
      var gn = $('#fGName'), gp = $('#fGPhone');
      if (!gn.value.trim()) fail('guardianName', t('err.gname'), gn);
      if (!normContact(gp.value)) fail('guardianPhone', t('err.gphone'), gp);
    }
    var agrees = $$('[data-agree]', form).every(function (x) { return x.checked; });
    if ($('#fMinor').checked && !form.agreeGuardian.checked) agrees = false;
    if (!agrees) fail('agree', t('err.agree'));
    if (first && first.focus) first.focus();
    return ok;
  }

  function showFormError(msg) {
    var el = $('#formError');
    el.textContent = msg;
    el.hidden = false;
    el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  var SHEET_APPS = 'LAB 신청내역'; // Lab.gs 의 탭 이름과 같게
  /** 데모 모드: 실제 서버 대신 이 브라우저에 저장 (들어갈 시트 이름도 함께 기록) */
  function demoSend(payload) {
    return new Promise(function (resolve) {
      setTimeout(function () {
        var list = demoList();
        var ws = payload.form === 'workshop';
        var sheet = ws ? 'LAB 워크숍_' + payload.workshopId : SHEET_APPS;
        var dup = list.some(function (r) {
          var same = (payload.phone && r.phone === payload.phone) || (payload.instagram && normIg(r.instagram) === payload.instagram);
          if (!same || r.sheet !== sheet || r.status === '취소') return false;
          return ws ? String(r.optionIdx) === String(payload.optionIdx) : (r.classId === payload.classId && r.startDate === payload.startDate);
        });
        if (dup) { resolve({ ok: false, code: 'DUPLICATE' }); return; }
        var seq = list.filter(function (r) { return r.id.indexOf(idPrefix()) === 0; }).length + 1;
        var id = idPrefix() + '-' + ('00' + seq).slice(-3);
        var payMethod = ws ? (payload.payMethod === 'cash' ? '현장 현금' : '계좌이체') : (payload.lang === 'en' ? '현장 현금' : '안내 후 수납');
        var extra = { sheet: sheet, instagram: payload.instagram ? '@' + payload.instagram : '', payMethod: payMethod };
        if (ws) {
          var w = (CFG.demoWorkshops || []).filter(function (x) { return x.id === payload.workshopId; })[0];
          var o = w && w.options[payload.optionIdx];
          if (!w || !o) { resolve({ ok: false, code: 'WS_NOT_FOUND' }); return; }
          extra.workshopTitle = w.title; extra.workshopDate = w.date; extra.optionName = o.name; extra.time = o.time; extra.amount = o.price;
        }
        list.push(Object.assign({ id: id, receivedAt: new Date().toLocaleString('ko-KR'), status: '입금대기' }, payload, extra));
        try { localStorage.setItem(DEMO_KEY, JSON.stringify(list)); } catch (e) { /* 저장 불가 */ }
        resolve(ws ? { ok: true, id: id, amount: extra.amount, optionName: extra.optionName, time: extra.time } : { ok: true, id: id });
      }, 600);
    });
  }

  function send(payload) {
    if (DEMO) return demoSend(payload);
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 25000);
    // Content-Type 을 지정하지 않으면 text/plain 으로 전송되어 CORS 사전요청(preflight)이 생기지 않음 (Apps Script 권장 방식)
    return fetch(CFG.API_URL, { method: 'POST', body: JSON.stringify(Object.assign({ site: 'lab' }, payload)), signal: ctrl ? ctrl.signal : undefined, redirect: 'follow' })
      .then(function (r) { return r.json(); })
      .finally(function () { clearTimeout(timer); });
  }
  function idPrefix() { return 'LB' + TODAY.slice(2).replace(/-/g, ''); }
  function demoList() { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || '[]'); } catch (e) { return []; } }

  function saveProfile(p) {
    var keep = { name: p.name, phone: p.phone, instagram: p.instagram, ageGroup: p.ageGroup, isMinor: p.isMinor, guardianName: p.guardianName, guardianPhone: p.guardianPhone, cashReceipt: p.cashReceipt };
    state.profile = keep;
    try { sessionStorage.setItem(PROFILE_KEY, JSON.stringify(keep)); } catch (e) { /* 저장 불가 */ }
  }
  function restoreProfile() {
    var p = state.profile;
    if (!p) { try { p = JSON.parse(sessionStorage.getItem(PROFILE_KEY) || 'null'); } catch (e) { p = null; } }
    if (!p) return;
    if (!$('#fName').value) $('#fName').value = p.name || '';
    if (!$('#fPhone').value) $('#fPhone').value = p.phone || '';
    if (!$('#fIg').value) $('#fIg').value = p.instagram || '';
    if (!$('#fAge').value) $('#fAge').value = p.ageGroup || '';
    if (p.isMinor && !$('#fMinor').checked) { $('#fMinor').checked = true; toggleMinor(); }
    if (!$('#fGName').value) $('#fGName').value = p.guardianName || '';
    if (!$('#fGPhone').value) $('#fGPhone').value = p.guardianPhone || '';
    if (!$('#fReceipt').value) $('#fReceipt').value = p.cashReceipt || '';
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    var payload = collect();
    var btn = $('#submitBtn');
    btn.disabled = true;
    btn.textContent = t('f.sending');
    send(payload).then(function (res) {
      if (res && res.ok) { saveProfile(payload); showDone(res.id, payload); return; }
      var code = (res && res.code) || 'SERVER';
      showFormError(t('err.' + code) !== 'err.' + code ? t('err.' + code) : t('err.SERVER'));
    }).catch(function () {
      showFormError(t('err.network'));
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = t('f.submit');
    });
  }

  function showDone(id, p) {
    var c = state.cls, tk = c.tickets[state.ticketIdx];
    form.hidden = true;
    $('#doneView').hidden = false;
    $('#doneId').textContent = id;
    $('#doneSummary').innerHTML =
      '<dt>' + t('d.class') + '</dt><dd>' + esc(c.instructor + ' · ' + title(c)) + '<br><span class="muted">' + T[lang].days[c.day] + ' ' + c.start + '–' + c.end + '</span></dd>' +
      '<dt>' + t('d.ticket') + '</dt><dd>' + ticketLabel(tk) + '</dd>' +
      '<dt>' + t('d.when') + '</dt><dd>' + p.sessionDates.map(md).join(', ') + '</dd>' +
      '<dt>' + t('d.name') + '</dt><dd>' + esc(p.name) + ' · ' + esc(p.phone || '@' + p.instagram) + '</dd>';
    // LAB 프로그램: 계좌를 보여주지 않음 (국문: 참여비·송금처를 연락처로 안내 / 영문: 현장 현금)
    $('#payAcct').hidden = true;
    var pr = priceOf(tk);
    $('#payAmountRow').hidden = !pr;
    $('#payAmount').textContent = pr;
    $('#payNotes').innerHTML = (lang === 'ko' ? CFG.payment.notes : CFG.payment.notesEn).map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('');
    $('#demoNote').hidden = !DEMO;
    // 다음 신청을 위해 수업 관련 선택만 초기화
    form.reset();
    toggleMinor();
    restoreProfile();
    $('#applyModal .modal__body').scrollTop = 0;
  }

  function toggleMinor() {
    var on = $('#fMinor').checked;
    $('#guardianBox').hidden = !on;
    $('#guardianConsent').hidden = !on;
    syncAgreeAll();
  }
  function syncAgreeAll() {
    var boxes = $$('[data-agree]', form);
    if ($('#fMinor').checked) boxes.push(form.agreeGuardian);
    $('#fAgreeAll').checked = boxes.every(function (b) { return b.checked; });
  }

  function copyAccount() {
    var acc = CFG.payment.workshop;
    var text = acc.bank + ' ' + acc.account;
    var done = function () { toast(t('toast.copied')); };
    var fail = function () {
      var r = document.createRange();
      r.selectNodeContents($('#wsAccount'));
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      toast(t('toast.copyFail'));
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fail);
      else fail();
    } catch (e) { fail(); }
  }

  /* ───────────────────────── 신청내역 조회 ───────────────────────── */
  var lkForm = $('#lookupForm');

  function openLookup() {
    lkForm.hidden = false;
    $('#lookupResult').hidden = true;
    $('#lookupError').hidden = true;
    var p = state.profile;
    if (!p) { try { p = JSON.parse(sessionStorage.getItem(PROFILE_KEY) || 'null'); } catch (e) { p = null; } }
    if (p) {
      if (!$('#lkName').value) $('#lkName').value = p.name || '';
      if (!$('#lkPhone').value) $('#lkPhone').value = p.phone || '';
      if (!$('#lkIg').value) $('#lkIg').value = p.instagram || '';
    }
    openModal('lookupModal');
  }

  function lookupError(msg) {
    var el = $('#lookupError');
    el.textContent = msg;
    el.hidden = false;
  }

  function runLookup(q) {
    if (DEMO) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          var key = q.name.replace(/\s+/g, '').toLowerCase();
          var items = demoList().filter(function (r) {
            if (String(r.name).replace(/\s+/g, '').toLowerCase() !== key) return false;
            return q.phone ? r.phone === q.phone : normIg(r.instagram) === q.instagram;
          }).map(function (r) {
            if (r.form === 'workshop') {
              return { form: 'workshop', sheet: r.sheet, id: r.id, receivedAt: r.receivedAt, status: r.status, title: r.workshopTitle,
                option: r.optionName, time: r.time, date: r.workshopDate, amount: r.amount, payMethod: r.payMethod };
            }
            return { form: r.form, sheet: r.sheet, id: r.id, receivedAt: r.receivedAt, status: r.status, day: r.day, time: r.time,
              instructor: r.instructor, title: r.classTitle, ticketLabel: r.ticketLabel, startDate: r.startDate,
              sessionDates: (r.sessionDates || []).join(', '), amount: r.amount == null ? null : r.amount, payMethod: r.payMethod };
          }).reverse();
          resolve({ ok: true, items: items });
        }, 500);
      });
    }
    return send(Object.assign({ action: 'lookup' }, q));
  }

  function renderLookup(items) {
    var en = isForeign();
    var html = '<div class="lookup__head"><span>' + t('lk.count', { n: items.length }) + '</span>' +
      '<button type="button" class="btn btn--sm btn--ghost" id="lookupAgain">' + t('lk.again') + '</button></div>';
    if (!items.length) {
      html += '<p class="empty">' + t('lk.none') + '</p>';
    } else {
      html += '<div class="lookup__list">' + items.map(function (it) {
        var st = STATUS[it.status] || { en: it.status, cls: '' };
        var pay = it.payMethod ? (en ? (PAY_EN[it.payMethod] || it.payMethod) : it.payMethod) : '';
        var amt = it.amount == null || it.amount === '' ? '' : t('lk.amount') + ' <b>' + won(Number(it.amount) || 0) + '</b>';
        var payLine = [amt, pay ? t('lk.pay') + ' <b>' + esc(pay) + '</b>' : ''].filter(Boolean).join(' · ');
        var head = '<div class="lkcard__top"><span class="lkcard__id">' + esc(it.id) + '</span><span class="st st--' + st.cls + '">' + esc(en ? st.en : it.status) + '</span></div>';
        var meta;
        if (it.form === 'workshop') {
          meta = '<b class="lkcard__title">' + t('lk.ws') + ' · ' + esc(it.title) + '</b><ul class="lkcard__meta">' +
            '<li>' + (it.date ? esc(mdDay(it.date)) + ' ' : '') + esc(it.time) + '</li>' +
            '<li>' + t('w.optionLbl') + ' <b>' + esc(it.option) + '</b></li>';
        } else {
          var dates = String(it.sessionDates || it.startDate).split(/\s*,\s*/).filter(Boolean).map(md).join(', ');
          var ticket = en ? String(it.ticketLabel).replace(/월 등록 (\d+)주|(\d+)주권/, function (m, a, b) { return (a || b) + '-week'; }).replace('1회권', '1 Time') : it.ticketLabel;
          var day = en ? DAY_EN[T.ko.days.indexOf(it.day)] || it.day : it.day;
          meta = '<b class="lkcard__title">' + esc(it.instructor) + ' · ' + esc(it.title) + '</b><ul class="lkcard__meta">' +
            '<li>' + esc(day) + ' ' + esc(it.time) + ' · ' + esc(ticket) + '</li>' +
            '<li>' + t('lk.dates') + ' <b>' + esc(dates) + '</b></li>';
        }
        return '<article class="lkcard">' + head + meta + (payLine ? '<li>' + payLine + '</li>' : '') +
          '<li>' + t('lk.received') + ' ' + esc(it.receivedAt) + '</li></ul></article>';
      }).join('') + '</div><p class="field__help">' + t('lk.note') + '</p>';
    }
    var box = $('#lookupResult');
    box.innerHTML = html;
    box.hidden = false;
    lkForm.hidden = true;
    $('#lookupAgain').addEventListener('click', function () { box.hidden = true; lkForm.hidden = false; $('#lkName').focus(); });
  }

  lkForm.addEventListener('submit', function (e) {
    e.preventDefault();
    $('#lookupError').hidden = true;
    var name = $('#lkName').value.trim();
    if (!name) { lookupError(t('lk.needName')); $('#lkName').focus(); return; }
    var q = { name: name };
    if (isForeign()) {
      q.instagram = normIg($('#lkIg').value);
      if (!q.instagram) { lookupError(t('err.ig')); $('#lkIg').focus(); return; }
    } else {
      if (!validPhone($('#lkPhone').value)) { lookupError(t('err.phone')); $('#lkPhone').focus(); return; }
      q.phone = formatPhone($('#lkPhone').value.trim());
    }
    var btn = $('#lookupBtn');
    btn.disabled = true;
    btn.textContent = t('lk.searching');
    runLookup(q).then(function (res) {
      if (res && res.ok) { renderLookup(res.items || []); return; }
      var code = (res && res.code) || 'SERVER';
      lookupError(t('err.' + code) !== 'err.' + code ? t('err.' + code) : t('err.SERVER'));
    }).catch(function () {
      lookupError(t('err.network'));
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = t('lk.submit');
    });
  });

  function showDemoAdmin() {
    var rows = demoList();
    var cols = [['sheet', '시트(신청서)'], ['id', '접수번호'], ['receivedAt', '접수일시'], ['status', '상태'], ['name', '이름'], ['phone', '연락처'], ['instagram', '인스타그램'], ['startDate', '참여시작일'], ['day', '요일'], ['time', '시간'], ['instructor', '강사'], ['classTitle', '프로그램명'], ['ticketLabel', '권종'], ['workshopTitle', '워크숍'], ['optionName', '신청 타임'], ['amount', '금액'], ['payMethod', '결제방식'], ['depositor', '예금주명'], ['memo', '문의사항']];
    $('#demoBody').innerHTML = rows.length
      ? '<div class="demowrap"><table class="demotbl"><thead><tr>' + cols.map(function (c) { return '<th>' + c[1] + '</th>'; }).join('') + '</tr></thead><tbody>' +
        rows.slice().reverse().map(function (r) {
          return '<tr>' + cols.map(function (c) { return '<td>' + esc(c[0] === 'amount' ? (r.amount == null ? '' : Number(r.amount).toLocaleString('ko-KR')) : r[c[0]]) + '</td>'; }).join('') + '</tr>';
        }).join('') + '</tbody></table></div><p class="field__help">이 브라우저에만 저장된 데모 데이터입니다.</p>'
      : '<p class="empty">아직 데모 신청이 없습니다. 프로그램이나 워크숍을 골라 신청해보세요.</p>';
    openModal('demoModal');
  }

  /* ───────────────────────── 워크숍 ─────────────────────────
   * 목록은 구글 시트 '워크숍관리' 탭에서 불러옵니다 (GET ?site=lab&action=workshops).
   * 데모 모드에서는 config.demoWorkshops 를 사용합니다.
   * 금액은 서버가 시트 기준으로 다시 계산해 저장합니다 (화면 값은 표시용).
   */
  var WS = { items: null, error: false, cur: null, optIdx: -1, requestId: null };
  var wsForm = $('#wsForm');

  function loadWorkshops() {
    if (DEMO) { WS.items = (CFG.demoWorkshops || []).filter(function (w) { return w.date >= TODAY && w.status !== '숨김'; }); renderWorkshops(); return; }
    renderWorkshops();
    var url = CFG.API_URL + (CFG.API_URL.indexOf('?') < 0 ? '?' : '&') + 'site=lab&action=workshops'; // 학원과 같은 웹앱 URL → site=lab 으로 LAB 처리
    fetch(url, { redirect: 'follow' }).then(function (r) { return r.json(); }).then(function (res) {
      if (res && res.ok) WS.items = res.items || []; else WS.error = true;
    }).catch(function () { WS.error = true; }).finally(renderWorkshops);
  }

  function renderWorkshops() {
    var box = $('#workshopList');
    if (WS.error) { box.innerHTML = '<p class="empty">' + t('ws.fail') + '</p>'; return; }
    if (WS.items === null) { box.innerHTML = '<p class="empty">' + t('ws.loading') + '</p>'; return; }
    if (!WS.items.length) { box.innerHTML = '<p class="empty">' + t('ws.empty') + '</p>'; return; }
    box.innerHTML = WS.items.map(function (w) {
      var sold = w.status === '마감';
      var poster = w.poster
        ? '<img class="wscard__img" src="' + esc(w.poster) + '" alt="" loading="lazy" referrerpolicy="no-referrer">'
        : '<span class="wscard__ph" aria-hidden="true">' + esc(w.title) + '</span>';
      return '<button type="button" class="wscard' + (sold ? ' is-sold' : '') + '" data-ws="' + esc(w.id) + '"' + (sold ? ' aria-disabled="true"' : '') + '>' +
        '<span class="wscard__media">' + poster + (sold ? '<span class="wscard__sold">' + t('ws.soldout') + '</span>' : '') + '</span>' +
        '<span class="wscard__body">' +
          '<small>' + esc(mdDay(w.date)) + '</small>' +
          '<b>' + esc(w.title) + '</b>' +
          '<span class="wscard__opts">' + w.options.map(function (o) {
            return '<span>' + esc(o.time) + (w.options.length > 1 ? ' · ' + esc(o.name) : '') + ' · ' + won(o.price) + '</span>';
          }).join('') + '</span>' +
          (w.note ? '<span class="wscard__note">' + esc(w.note) + '</span>' : '') +
          '<span class="wscard__go">' + (sold ? t('ws.soldout') : t('ws.apply') + ' →') + '</span>' +
        '</span></button>';
    }).join('');
  }

  function wsSetErr(name, msg, input) {
    var el = $('[data-err="' + name + '"]', wsForm);
    if (el) el.textContent = msg;
    if (input) input.setAttribute('aria-invalid', 'true');
  }
  function wsResetErrors() {
    $$('[data-err]', wsForm).forEach(function (el) { el.textContent = ''; });
    $$('[aria-invalid]', wsForm).forEach(function (el) { el.removeAttribute('aria-invalid'); });
    $('#wsError').hidden = true;
  }

  function openWorkshop(id) {
    var w = (WS.items || []).filter(function (x) { return x.id === id; })[0];
    if (!w) return;
    if (w.status === '마감') { toast(t('ws.soldout')); return; }
    WS.cur = w;
    WS.optIdx = w.options.length === 1 ? 0 : -1;
    WS.requestId = uuid();
    wsForm.reset();
    wsResetErrors();
    wsForm.hidden = false;
    $('#wsDone').hidden = true;
    // 수납 방법 기본값: 국문 계좌이체 / 영문 현장 현금
    wsForm.payMethod.value = isForeign() ? 'cash' : 'transfer';
    var p = state.profile;
    if (!p) { try { p = JSON.parse(sessionStorage.getItem(PROFILE_KEY) || 'null'); } catch (e) { p = null; } }
    if (p) { $('#wName').value = p.name || ''; $('#wPhone').value = p.phone || ''; $('#wIg').value = p.instagram || ''; }
    renderWorkshopForm();
    openModal('wsModal');
    $('#wsModal .modal__body').scrollTop = 0;
  }

  function renderWorkshopForm() {
    var w = WS.cur;
    if (!w) return;
    $('#wsPicked').innerHTML = '<small>WORKSHOP · ' + esc(mdDay(w.date)) + '</small><b>' + esc(w.title) + '</b>' +
      (w.place ? '<span>' + t('ws.place') + ' · ' + esc(w.place) + '</span>' : '') +
      (w.note ? '<span class="picked__note">' + esc(w.note) + '</span>' : '');
    $('#wsOptions').innerHTML = w.options.map(function (o, i) {
      return '<label class="choice"><input type="radio" name="wsOption" value="' + i + '"' + (i === WS.optIdx ? ' checked' : '') + '>' +
        '<span><b>' + esc(o.time) + ' · ' + won(o.price) + '</b><em>' + esc(o.name) + '</em></span></label>';
    }).join('');
    var guide = (CFG.workshopGuide && (CFG.workshopGuide[lang] || CFG.workshopGuide.ko)) || [];
    $('#wsGuide').innerHTML = guide.map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('');
    // 연락처: 국문 필수 / 영문 선택
    $('#wPhoneLabel').innerHTML = t('f.phone') + (isForeign() ? ' <small>(optional)</small>' : '');
    syncWsPay();
    renderWsSummary();
  }

  function syncWsPay() {
    var transfer = wsForm.payMethod.value !== 'cash';
    $('#wTransferFields').hidden = !transfer;
    $('#wReceiptField').hidden = isForeign();
  }

  function renderWsSummary() {
    var o = WS.cur && WS.cur.options[WS.optIdx];
    $('#wsSummary').innerHTML = o ? '<span>' + t('f.total') + '</span><b>' + won(o.price) + '</b>' : '';
  }

  function wsValidate() {
    wsResetErrors();
    var ok = true, first = null;
    function fail(name, msg, input) { ok = false; wsSetErr(name, msg, input); if (!first) first = input || $('[data-err="' + name + '"]', wsForm); }
    if (WS.optIdx < 0) fail('option', t('err.option'));
    var nm = $('#wName'), ph = $('#wPhone'), ig = $('#wIg');
    if (!nm.value.trim()) fail('name', t('err.name'), nm);
    if (isForeign()) { if (ph.value.trim() && !validPhone(ph.value)) fail('phone', t('err.phone'), ph); }
    else if (!validPhone(ph.value)) fail('phone', t('err.phone'), ph);
    if (!normIg(ig.value)) fail('instagram', t('err.ig'), ig);
    if (!$$('[data-wagree]', wsForm).every(function (x) { return x.checked; })) fail('agree', t('err.agree'));
    if (first && first.focus) first.focus();
    return ok;
  }

  function wsSubmit(e) {
    e.preventDefault();
    if (!wsValidate()) return;
    var w = WS.cur, o = w.options[WS.optIdx];
    var fd = new FormData(wsForm);
    var cash = fd.get('payMethod') === 'cash';
    var payload = {
      form: 'workshop', requestId: WS.requestId, workshopId: w.id, optionIdx: WS.optIdx, optionName: o.name,
      name: (fd.get('name') || '').trim(),
      phone: (fd.get('phone') || '').trim() ? formatPhone(fd.get('phone').trim()) : '',
      instagram: normIg(fd.get('instagram')),
      payMethod: cash ? 'cash' : 'transfer',
      depositor: cash ? '' : (fd.get('depositor') || '').trim(),
      cashReceipt: cash || isForeign() ? '' : (fd.get('cashReceipt') || '').trim(),
      lang: lang, termsVersion: CFG.termsVersion,
      consents: { privacy: wsForm.agreePrivacy.checked, refund: wsForm.agreeRefund.checked },
      website: fd.get('website') || '',
    };
    var btn = $('#wsSubmit');
    btn.disabled = true;
    btn.textContent = t('f.sending');
    send(payload).then(function (res) {
      if (res && res.ok) {
        saveProfile({ name: payload.name, phone: payload.phone, instagram: payload.instagram });
        showWsDone(res, payload); return;
      }
      var code = (res && res.code) || 'SERVER';
      var el = $('#wsError');
      el.textContent = t('err.' + code) !== 'err.' + code ? t('err.' + code) : t('err.SERVER');
      el.hidden = false;
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      if (code === 'WS_CLOSED') loadWorkshops();
    }).catch(function () {
      var el = $('#wsError'); el.textContent = t('err.network'); el.hidden = false;
    }).finally(function () {
      btn.disabled = false;
      btn.textContent = t('f.submit');
    });
  }

  function showWsDone(res, p) {
    var w = WS.cur, o = w.options[p.optionIdx];
    var amount = res.amount != null ? res.amount : o.price; // 서버가 시트 기준으로 계산한 금액 우선
    wsForm.hidden = true;
    $('#wsDone').hidden = false;
    $('#wsDoneId').textContent = res.id;
    $('#wsDoneSummary').innerHTML =
      '<dt>' + t('lk.ws') + '</dt><dd>' + esc(w.title) + '<br><span class="muted">' + esc(mdDay(w.date)) + '</span></dd>' +
      '<dt>' + t('w.optionLbl') + '</dt><dd>' + esc((res.time || o.time) + ' · ' + (res.optionName || o.name)) + '</dd>' +
      '<dt>' + t('d.name') + '</dt><dd>' + esc(p.name) + ' · ' + esc([p.phone, '@' + p.instagram].filter(Boolean).join(' · ')) + '</dd>';
    var cash = p.payMethod === 'cash';
    var acc = CFG.payment.workshop;
    $('#wsPayTitle').textContent = cash ? t('w.cashTitle') : t('w.payTitle');
    $('#wsPayAcct').hidden = cash;
    $('#wsBank').textContent = acc.bank;
    $('#wsAccount').textContent = acc.account;
    $('#wsHolder').textContent = acc.holder;
    $('#wsAmount').textContent = won(amount);
    var guide = (CFG.workshopGuide && (CFG.workshopGuide[lang] || CFG.workshopGuide.ko)) || [];
    $('#wsPayNotes').innerHTML = guide.slice(0, cash ? 1 : 3).map(function (g) { return '<li>' + esc(g) + '</li>'; }).join('');
    $('#wsDemoNote').hidden = !DEMO;
    $('#wsModal .modal__body').scrollTop = 0;
  }

  wsForm.addEventListener('change', function (e) {
    var tg = e.target;
    if (tg.name === 'wsOption') { WS.optIdx = +tg.value; renderWsSummary(); wsSetErr('option', ''); }
    else if (tg.name === 'payMethod') syncWsPay();
    else if (tg.id === 'wAgreeAll') $$('[data-wagree]', wsForm).forEach(function (b) { b.checked = tg.checked; });
    else if (tg.hasAttribute('data-wagree')) $('#wAgreeAll').checked = $$('[data-wagree]', wsForm).every(function (b) { return b.checked; });
    $('#wsError').hidden = true;
  });
  wsForm.addEventListener('submit', wsSubmit);
  $('#wPhone').addEventListener('input', function (e) { if (/^[\d-]*$/.test(e.target.value)) e.target.value = formatPhone(e.target.value); });
  $('#wsCopy').addEventListener('click', copyAccount);

  /* ───────────────────────── 신청서 바로가기 ───────────────────────── */
  function gotoForm(kind) {
    // program: 국문 1회권 · 월 등록 / foreign: 영문 1 Time (1회권만) / ws: 워크숍 (현재 언어 유지)
    var wantLang = kind === 'foreign' ? 'en' : (kind === 'ws' ? lang : 'ko');
    if (wantLang !== lang) { lang = wantLang; try { localStorage.setItem(LANG_KEY, lang); } catch (x) { /* 저장 불가 */ } renderAll(); }
    state.prefer = kind === 'foreign' ? '1T' : null;
    document.getElementById(kind === 'ws' ? 'workshop' : 'classes').scrollIntoView({ behavior: 'smooth' });
  }

  /* ───────────────────────── 이벤트 ───────────────────────── */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-class]');
    if (el) { openBooking(el.getAttribute('data-class')); return; }
    var tab = e.target.closest('.daytab');
    if (tab) { activeDay = +tab.dataset.day; renderDayTabs(); renderClassList(); tab = $('.daytab[data-day="' + activeDay + '"]'); if (tab) tab.focus(); return; }
    var lb = e.target.closest('.lang button');
    if (lb) { lang = lb.dataset.lang; try { localStorage.setItem(LANG_KEY, lang); } catch (x) { /* 저장 불가 */ } renderAll(); return; }
    if (e.target.closest('[data-open-lookup]')) { openLookup(); return; }
    var wsc = e.target.closest('[data-ws]');
    if (wsc) { openWorkshop(wsc.getAttribute('data-ws')); return; }
    var fg = e.target.closest('[data-goto-form]');
    if (fg) { gotoForm(fg.getAttribute('data-goto-form')); return; }
    var tm = e.target.closest('[data-open-terms]');
    if (tm) { openTerms(tm.getAttribute('data-open-terms')); return; }
    var cl = e.target.closest('[data-close]');
    if (cl) { closeModal(cl.closest('.modal')); return; }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = $$('.modal').filter(function (m) { return !m.hidden; });
    if (open.length) closeModal(open[open.length - 1]);
  });
  $('#dayTabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    activeDay = ((activeDay - 1 + (e.key === 'ArrowRight' ? 1 : 4)) % 5) + 1;
    renderDayTabs(); renderClassList();
    $('.daytab[data-day="' + activeDay + '"]').focus();
  });

  form.addEventListener('change', function (e) {
    var tg = e.target;
    if (tg.name === 'ticket') { state.ticketIdx = +tg.value; renderDates(true); }
    else if (tg.name === 'date') { state.date = tg.value; renderHelp(); }
    else if (tg.id === 'fMinor') toggleMinor();
    else if (tg.id === 'fAgreeAll') {
      $$('[data-agree]', form).forEach(function (b) { b.checked = tg.checked; });
      if ($('#fMinor').checked) form.agreeGuardian.checked = tg.checked;
    } else if (tg.hasAttribute('data-agree') || tg.name === 'agreeGuardian') syncAgreeAll();
    $('#formError').hidden = true;
  });
  ['#fPhone', '#fGPhone', '#lkPhone'].forEach(function (s) {
    $(s).addEventListener('input', function (e) {
      var v = e.target.value;
      if (/^[\d-]*$/.test(v)) e.target.value = formatPhone(v);
    });
  });
  form.addEventListener('submit', onSubmit);
  $('#applyMore').addEventListener('click', function () {
    closeModal($('#applyModal'));
    document.getElementById('classes').scrollIntoView({ behavior: 'smooth' });
  });
  $('#demoAdminBtn').addEventListener('click', showDemoAdmin);


  /* ───────────────────────── 히어로 영상 슬라이드 ─────────────────────────
   * 영상 1개당 SLIDE_SEC 초 재생 → 다음 영상으로 슬라이드, 마지막 다음은 첫 영상 (무한 반복)
   * - 화면 밖으로 스크롤하거나 탭을 숨기면 일시정지 (데이터·배터리 절약)
   * - '동작 줄이기' 설정 사용자는 자동 재생하지 않음, 데이터 절약 모드는 포스터 이미지만 순환
   * - 자동 재생이 막힌 환경(iOS 저전력 모드 등)도 포스터 기준 10초 타이머로 슬라이드
   */
  var SLIDE_SEC = 10;
  function initReel() {
    var reel = $('#reel');
    if (!reel) return;
    var slides = $$('.reel__slide', reel);
    var bars = $$('.reel__bar', reel);
    var videos = slides.map(function (sl) { return sl.querySelector('video'); });
    var toggle = $('#reelToggle');
    var bg = $('#heroBg');
    var n = slides.length, idx = 0, elapsed = 0, last = 0;
    var userPaused = false, onScreen = true, fallback = false;
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    var saveData = navigator.connection && navigator.connection.saveData;

    if (saveData) {
      fallback = true;
      videos.forEach(function (v) { v.removeAttribute('src'); v.preload = 'none'; v.load(); });
    }
    videos.forEach(function (v, i) {
      v.muted = true; // iOS 자동재생 조건
      v.addEventListener('ended', function () { if (i === idx) go(idx + 1); });
    });

    function running() { return !userPaused && onScreen && !document.hidden; }

    function paint() {
      bars.forEach(function (b, i) {
        var p = i < idx ? 1 : i > idx ? 0 : Math.min(elapsed / SLIDE_SEC, 1);
        b.firstElementChild.style.setProperty('--p', p);
        b.setAttribute('aria-current', i === idx ? 'true' : 'false');
      });
    }

    function playActive() {
      if (fallback || !running()) return;
      var pr = videos[idx].play();
      if (pr && pr.catch) pr.catch(function () { fallback = true; }); // 자동재생 차단 → 타이머 모드
    }

    function go(to) {
      var prev = idx;
      idx = (to + n) % n;
      slides.forEach(function (sl, i) {
        sl.classList.toggle('is-active', i === idx);
        sl.classList.toggle('is-leaving', i === prev && prev !== idx);
      });
      videos.forEach(function (v, i) {
        if (i === idx) return;
        v.pause();
        if (i !== prev) { try { v.currentTime = 0; } catch (e) { /* 메타데이터 전 */ } }
      });
      var next = videos[(idx + 1) % n]; // 다음 영상 미리 받아두기
      if (!fallback && next.preload !== 'auto') next.preload = 'auto';
      try { videos[idx].currentTime = 0; } catch (e) { /* 메타데이터 전 */ }
      elapsed = 0;
      bg.style.backgroundImage = 'url("' + slides[idx].getAttribute('data-poster') + '")';
      paint();
      playActive();
    }

    function frame(now) {
      var dt = last ? (now - last) / 1000 : 0;
      last = now;
      if (running()) {
        var v = videos[idx];
        if (!fallback && !v.paused && v.readyState >= 2) elapsed = v.currentTime;
        else if (fallback) elapsed += dt; // 영상 로딩 중이면 진행바를 멈추고 기다림
        if (elapsed >= SLIDE_SEC - 0.05) go(idx + 1);
        else paint();
      }
      requestAnimationFrame(frame);
    }

    function setPaused(p) {
      userPaused = p;
      toggle.setAttribute('aria-pressed', String(p));
      toggle.setAttribute('aria-label', p ? t('reel.play') : t('reel.pause'));
      if (p) videos[idx].pause(); else playActive();
    }

    toggle.addEventListener('click', function () { setPaused(!userPaused); });
    bars.forEach(function (b, i) {
      b.addEventListener('click', function () {
        if (i !== idx) { go(i); return; }
        elapsed = 0;
        try { videos[idx].currentTime = 0; } catch (e) { /* noop */ }
      });
    });
    document.addEventListener('visibilitychange', function () { if (running()) playActive(); else videos[idx].pause(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        onScreen = es[0].isIntersecting;
        if (running()) playActive(); else videos[idx].pause();
      }, { threshold: 0.25 }).observe(reel);
    }

    bg.style.backgroundImage = 'url("' + slides[0].getAttribute('data-poster') + '")';
    setPaused(!!reduce);
    paint();
    requestAnimationFrame(frame);
    window.__mvlsReel = { go: go, state: function () { return { idx: idx, elapsed: elapsed, fallback: fallback, paused: userPaused }; } };
  }


  renderStatic();
  renderAll();
  initReel();
  loadWorkshops();

  // 테스트·디버깅용 (운영 동작에는 영향 없음)
  window.__mvls = { startDates: startDates, sessionDates: sessionDates, byId: byId, today: TODAY };
})();
