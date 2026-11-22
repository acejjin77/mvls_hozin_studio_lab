/**
 * MVLS HOZIN STUDIO LAB - 프로그램·워크숍 신청 접수 (Lab.gs)
 * ------------------------------------------------------------
 * 학원 구글 시트 파일에 붙어 있는 Apps Script 프로젝트에 '파일 추가'로 넣는 파일입니다.
 *   Apps Script 편집기 → 파일(+) → 스크립트 → 이름 'Lab' → 이 내용 붙여넣기
 *   학원 Code.gs 의 doGet/doPost 가 site=lab 요청을 이 파일(LAB)로 넘겨줍니다.
 *   → 웹앱 URL 하나, 스프레드시트 파일 하나에서 학원 · LAB 을 함께 접수 (탭은 따로)
 *
 * 한 프로젝트의 파일들은 이름을 공유하므로, LAB 코드는 전부 LAB 안에 묶여 있습니다.
 * 밖으로 보이는 이름: LAB, setupLab(), testApplyLab()
 *
 * LAB 탭 (학원 탭 '신청내역' · '수업별현황' 과 별도)
 *   LAB 신청내역 (프로그램: 1회권 · 월 등록 · 영문 1 Time) / LAB 워크숍_<워크숍ID> / LAB 워크숍관리 / LAB 현황
 *
 * 스크립트 속성 (선택)
 *   LAB_NOTIFY_EMAIL  LAB 새 신청 알림 메일 (없으면 학원과 같은 NOTIFY_EMAIL 로 보냄)
 */
var LAB = (function () {
  'use strict';

  var CODE_VERSION = '2026-11-22-lab-v4'; // ?site=lab 으로 열면 보이는 값. 코드 수정 시 함께 변경
  var TZ = 'Asia/Seoul';
  var ID_PREFIX = 'LB';
  var STATUS = ['입금대기', '입금확인', '확정', '대기', '취소', '환불'];
  var INACTIVE = ['취소', '환불'];
  var RATE_LIMIT_PER_10MIN = 8;
  var LOOKUP_PER_KEY_10MIN = 10;
  var LOOKUP_PER_MIN = 40;
  var LOOKUP_MAX_ITEMS = 30;

  /**
   * LAB 탭 이름 앞에 붙는 글자. 학원 시트와 한 파일에 둘 때 학원 탭('신청내역', '수업별현황')과 구분됩니다.
   * 운영 시작 후에는 바꾸지 마세요 (바꾸면 새 탭이 따로 만들어집니다).
   */
  var TAB_PREFIX = 'LAB ';

  /** 고정 신청서 → 시트 */
  /** 프로그램 신청서 (학원처럼 하나로 통합) — 1회권 · 월 등록 · 영문 1 Time 모두 이 탭에 쌓임 */
  var SHEET_APPS = TAB_PREFIX + '신청내역';
  /** 신청 가능한 권종: 국문 = 1회권 · 월 등록(4주 · 기간제 전체), 영문(외국인) = 1회권만 */
  var TICKETS = { KO: ['1T', '4W', 'FULL'], EN: ['1T'] };
  var SHEET_WS_ADMIN = TAB_PREFIX + '워크숍관리';
  var WS_PREFIX = TAB_PREFIX + '워크숍_';
  var SHEET_SUMMARY = TAB_PREFIX + '현황';

  /** 신청을 쌓을 구글 시트 = 이 스크립트가 붙어 있는 파일 (학원과 같은 파일) */
  function ss_() { return SpreadsheetApp.getActiveSpreadsheet(); }

  var WS_STATES = ['모집중', '마감', '숨김'];
  var WS_MAX_OPTIONS = 4;

  /**
   * 시트 열 정의 [키, 헤더, 너비]
   * 저장할 때 1행의 '헤더 이름'으로 칸을 찾으므로 시트에서 열을 옮겨도 됩니다. (헤더 글자는 바꾸지 마세요)
   */
  var PROGRAM_COLS = [
    ['id', '접수번호', 120], ['receivedAt', '접수일시', 150], ['status', '상태', 90], ['adminMemo', '관리자메모', 180],
    ['name', '이름', 90], ['phone', '연락처', 120], ['instagram', '인스타그램', 130],
    ['startDate', '참여시작일', 100], ['day', '요일', 50], ['time', '시간', 100], ['instructor', '강사', 100],
    ['classTitle', '프로그램명', 180], ['ticketLabel', '권종', 70], ['amount', '금액', 90],
    ['ageGroup', '연령대', 70], ['isMinor', '14세미만', 70], ['guardianName', '보호자명', 90], ['guardianPhone', '보호자연락처', 170],
    ['cashReceipt', '현금영수증', 120], ['payMethod', '결제방식', 90], ['channel', '신청구분', 80],
    ['source', '신청경로', 110], ['interests', '관심분야', 140], ['memo', '문의사항', 220],
    ['sessionDates', '참여예정일', 200], ['classId', '프로그램코드', 150], ['lang', '언어', 50], ['consent', '동의내역', 240],
  ];
  var WS_COLS = [
    ['id', '접수번호', 120], ['receivedAt', '접수일시', 150], ['status', '상태', 90], ['adminMemo', '관리자메모', 180],
    ['name', '이름', 90], ['phone', '연락처', 120], ['instagram', '인스타그램', 130],
    ['optionName', '신청 타임', 230], ['time', '시간', 110], ['amount', '금액', 90],
    ['payMethod', '결제방식', 90], ['depositor', '예금주명', 100], ['cashReceipt', '현금영수증', 120],
    ['workshopTitle', '워크숍', 120], ['workshopDate', '날짜', 100], ['workshopId', '워크숍ID', 120],
    ['lang', '언어', 50], ['consent', '동의내역', 260],
  ];

  /** '워크숍관리' 탭 열 (한 줄 = 워크숍 하나, 타임은 최대 4개) */
  var WS_ADMIN_HEAD = (function () {
    var h = ['워크숍ID', '상태', '제목', '날짜', '장소', '포스터 이미지 URL', '안내 (선택)'];
    for (var i = 1; i <= WS_MAX_OPTIONS; i++) h.push('타임' + i + ' 이름', '타임' + i + ' 시간', '타임' + i + ' 금액');
    return h;
  })();

  /* ───────────────────────── 메뉴 / 초기 설정 ───────────────────────── */

  /** 'LAB 신청내역', 워크숍관리 탭(예시 포함), 현황 탭을 만듭니다. 여러 번 실행해도 안전합니다. */
  function setup() {
    var ss = ss_();
    ss.setSpreadsheetTimeZone(TZ);
    ensureSheet_(SHEET_APPS, PROGRAM_COLS);
    ensureWsAdmin_();
    ss.getSheets().forEach(function (sh) {
      if (sh.getName().indexOf(WS_PREFIX) === 0) ensureSheet_(sh.getName(), WS_COLS);
    });
    rebuildSummary_();
    try { ss.toast('MVLS LAB 신청 시트 설정 완료', 'MVLS LAB', 5); } catch (e) { /* 시트 화면 밖에서 실행 */ }
    Logger.log('MVLS LAB 설정 완료: ' + ss.getName() + ' (' + ss.getUrl() + ')');
  }

  /** 시트가 없으면 만들고, 헤더·상태 드롭다운·색상·서식을 맞춥니다. 기존 헤더·데이터는 건드리지 않습니다. */
  function ensureSheet_(name, cols) {
    var ss = ss_();
    var sh = ss.getSheetByName(name);
    var created = false;
    if (!sh) { sh = ss.insertSheet(name); created = true; }
    var map = headerMap_(sh, cols);
    var width = sh.getLastColumn();
    sh.getRange(1, 1, 1, width).setFontWeight('bold').setBackground('#1d3b2a').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    if (created) cols.forEach(function (c) { sh.setColumnWidth(map[c[1]], c[2]); });
    var rows = Math.max(sh.getMaxRows() - 1, 1);
    var statusRange = sh.getRange(2, colOf_(map, cols, 'status'), rows, 1);
    statusRange.setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUS, true).setAllowInvalid(false).build());
    sh.getRange(2, colOf_(map, cols, 'receivedAt'), rows, 1).setNumberFormat('yyyy-mm-dd hh:mm');
    sh.getRange(2, colOf_(map, cols, 'amount'), rows, 1).setNumberFormat('#,##0');
    var colors = { '입금대기': '#fff4c2', '입금확인': '#d6ecff', '확정': '#d4f5df', '대기': '#ece3ff', '취소': '#eeeeee', '환불': '#ffd9d6' };
    sh.setConditionalFormatRules(Object.keys(colors).map(function (s) {
      return SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(s).setBackground(colors[s]).setRanges([statusRange]).build();
    }));
    if (!sh.getFilter()) sh.getRange(1, 1, sh.getMaxRows(), width).createFilter();
    return sh;
  }

  /** '워크숍관리' 탭: 없으면 만들고 현재 진행 중인 워크숍 예시를 채웁니다. */
  function ensureWsAdmin_() {
    var ss = ss_();
    var sh = ss.getSheetByName(SHEET_WS_ADMIN);
    if (sh) return sh;
    sh = ss.insertSheet(SHEET_WS_ADMIN);
    var head = WS_ADMIN_HEAD;
    if (sh.getMaxColumns() < head.length) sh.insertColumnsAfter(sh.getMaxColumns(), head.length - sh.getMaxColumns());
    sh.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#3b2a1d').setFontColor('#ffffff');
    sh.setFrozenRows(1);
    sh.setColumnWidth(1, 110); sh.setColumnWidth(3, 120); sh.setColumnWidth(5, 220); sh.setColumnWidth(6, 220); sh.setColumnWidth(7, 220);
    for (var i = 0; i < WS_MAX_OPTIONS; i++) sh.setColumnWidth(8 + i * 3, 220);
    var addr = '마블러스 호진 스튜디오 랩 (서울 서초구 방배동 437-23)';
    var ex = [
      ['1128-paris', '모집중', 'PARIS', "'2026-11-28", addr, '', '시간변경 (11/14)', 'PARIS', '18:30-20:00', 50000],
      ['1128-cio', '모집중', 'CIO', "'2026-11-28", addr, '', '', 'CIO', '20:00-21:30', 50000],
      ['1205-yudat', '모집중', 'YUDAT FAM', "'2026-12-05", addr, '', '1타임 120,000원 / 전체 240,000원',
        'A (JUNIOR YUDAT & SAM YUDAT)', '15:00-18:00', 120000, 'B (JIMMY YUDAT & KUTY)', '19:00-22:00', 120000, '전체신청 A & B', '15:00-22:00', 240000],
    ];
    ex.forEach(function (r) { while (r.length < head.length) r.push(''); });
    sh.getRange(2, 1, ex.length, head.length).setValues(ex);
    sh.getRange(2, 2, sh.getMaxRows() - 1, 1).setDataValidation(
      SpreadsheetApp.newDataValidation().requireValueInList(WS_STATES, true).setAllowInvalid(false).build());
    for (var j = 0; j < WS_MAX_OPTIONS; j++) sh.getRange(2, 10 + j * 3, sh.getMaxRows() - 1, 1).setNumberFormat('#,##0');
    sh.getRange('A1').setNote('영문 소문자·숫자·하이픈. 한 번 정하면 바꾸지 마세요 (신청 시트 이름 = 워크숍_<워크숍ID>). 예: 1128-cio');
    sh.getRange('B1').setNote('모집중: 신청 가능 / 마감: 홈페이지에 SOLD OUT 표시 / 숨김: 홈페이지에서 숨김');
    sh.getRange('D1').setNote('2026-11-28 형식. 지난 날짜의 워크숍은 홈페이지에서 자동으로 숨겨집니다.');
    sh.getRange('F1').setNote('선택. https:// 로 시작하는 이미지 주소 (인스타그램 게시물 주소는 안 됨)');
    return sh;
  }

  /**
   * '현황' 탭: 상태별 건수 (수식이라 자동 갱신)
   *   LAB 신청내역 전체 + 1회권(국문) / 월 등록(국문) / 1 Time(영문) 나눠 보기 + 워크숍별
   */
  function rebuildSummary_() {
    var ss = ss_();
    var sm = ss.getSheetByName(SHEET_SUMMARY) || ss.insertSheet(SHEET_SUMMARY);
    sm.clear();
    var head = ['신청서', '유효 신청 (취소·환불 제외)'].concat(STATUS);
    sm.getRange(1, 1, 1, head.length).setValues([head]).setFontWeight('bold').setBackground('#1d3b2a').setFontColor('#ffffff');
    var rng = function (q, map, cols, key) { var L = letter_(colOf_(map, cols, key)); return q + L + '2:' + L; };
    /** label, 시트 이름, 열 정의, 추가 조건 [[열키, 조건], …] */
    var row = function (label, n, cols, conds) {
      var sh = ss.getSheetByName(n);
      var map = headerMap_(sh, cols);
      var q = "'" + n.replace(/'/g, "''") + "'!";
      var base = [rng(q, map, cols, 'id'), '"<>"'].concat([].concat.apply([], (conds || []).map(function (c) { return [rng(q, map, cols, c[0]), c[1]]; })));
      var st = rng(q, map, cols, 'status');
      var cnt = function (extra) { return 'COUNTIFS(' + base.concat(extra || []).join(',') + ')'; };
      var r = [label, '=' + cnt() + '-' + cnt([st, '"취소"']) + '-' + cnt([st, '"환불"'])];
      STATUS.forEach(function (s) { r.push('=' + cnt([st, '"' + s + '"'])); });
      return r;
    };
    var rows = [
      row(SHEET_APPS + ' (프로그램 전체)', SHEET_APPS, PROGRAM_COLS),
      row('  └ 1회권 (국문)', SHEET_APPS, PROGRAM_COLS, [['lang', '"KO"'], ['ticketLabel', '"1회권"']]),
      row('  └ 월 등록 (국문)', SHEET_APPS, PROGRAM_COLS, [['lang', '"KO"'], ['ticketLabel', '"<>1회권"']]),
      row('  └ 1 Time (영문)', SHEET_APPS, PROGRAM_COLS, [['lang', '"EN"']]),
    ];
    ss.getSheets().forEach(function (sh) { if (sh.getName().indexOf(WS_PREFIX) === 0) rows.push(row(sh.getName(), sh.getName(), WS_COLS)); });
    sm.getRange(2, 1, rows.length, head.length).setValues(rows);
    sm.setColumnWidth(1, 220); sm.setColumnWidth(2, 170);
    sm.setFrozenRows(1);
  }

  /* ───────────────────────── 웹앱 엔드포인트 ───────────────────────── */

  /** GET ?site=lab : 상태 확인 / &action=workshops → 홈페이지에 보여줄 워크숍 목록 */
  function doGet(e) {
    try {
      if (e && e.parameter && e.parameter.action === 'workshops') return json_({ ok: true, items: listWorkshops_() });
    } catch (err) {
      console.error(err && err.stack ? err.stack : err);
      return json_({ ok: false, code: 'SERVER' });
    }
    return json_({ ok: true, service: 'mvls-lab-apply', version: CODE_VERSION });
  }

  function doPost(e) {
    var out;
    try {
      var body = e && e.postData && e.postData.contents;
      if (!body || body.length > 20000) return json_({ ok: false, code: 'INVALID' });
      var p = JSON.parse(body);
      if (!p || typeof p !== 'object') out = { ok: false, code: 'INVALID' };
      else if (p.action === 'lookup') out = handleLookup_(p);
      else out = withGuards_(p, p.form === 'workshop' ? handleWorkshop_ : handleProgram_);
    } catch (err) {
      console.error(err && err.stack ? err.stack : err);
      out = { ok: false, code: 'SERVER' };
    }
    return json_(out);
  }

  /** 공통: 스팸 차단, 같은 요청 재전송 처리, 연락처별 횟수 제한 */
  function withGuards_(p, handler) {
    if (p.website) return { ok: true, id: ID_PREFIX + '000000-000' }; // 숨겨진 칸이 채워진 봇: 저장하지 않음
    var cache = CacheService.getScriptCache();
    var reqKey = 'lab_req_' + str_(p.requestId, 60).replace(/[^\w-]/g, '');
    if (reqKey.length > 8) { var prev = cache.get(reqKey); if (prev) return JSON.parse(prev); }
    var who = normPhone_(p.phone) || normIg_(p.instagram);
    var rlKey = 'lab_rl_' + who.replace(/[^\w.]/g, '');
    var count = Number(cache.get(rlKey) || 0);
    if (who && count >= RATE_LIMIT_PER_10MIN) return { ok: false, code: 'RATE_LIMIT' };

    var result = handler(p);
    if (result.ok) {
      if (who) cache.put(rlKey, String(count + 1), 600);
      if (reqKey.length > 8) cache.put(reqKey, JSON.stringify(result), 21600);
    }
    return result;
  }

  /* ───────────────────────── 프로그램 신청 (국문: 1회권 · 월 등록 / 영문: 1 Time) ───────────────────────── */

  function handleProgram_(p) {
    var bad = function (f) { return { ok: false, code: 'INVALID', field: f }; };
    var today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    var isForeign = p.lang === 'en'; // 영문 화면 = 외국인 1 Time

    var name = str_(p.name, 30);
    var phone = normPhone_(p.phone);
    var instagram = normIg_(p.instagram);
    var classId = str_(p.classId, 40);
    var startDate = str_(p.startDate, 10);
    var ticketType = str_(p.ticketType, 4);
    var amount = p.amount === null || p.amount === '' || p.amount === undefined ? '' : Number(p.amount);
    var isMinor = p.isMinor === true;
    var consents = p.consents || {};

    if (!name) return bad('name');
    // 영문(1 Time, 외국인): 인스타그램 필수 / 국문: 연락처 필수
    if (isForeign) { if (!instagram) return bad('instagram'); }
    else if (!phone) return bad('phone');
    if (!/^[A-Z0-9-]{3,40}$/.test(classId)) return bad('classId');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate) || startDate < today) return bad('startDate');
    if (TICKETS[isForeign ? 'EN' : 'KO'].indexOf(ticketType) < 0) return bad('ticketType'); // 영문은 1회권만
    if (amount !== '' && (!isFinite(amount) || amount < 0 || amount > 3000000 || Math.floor(amount) !== amount)) return bad('amount');
    if (consents.privacy !== true || consents.refund !== true) return bad('consent');

    var guardianName = '', guardianPhone = '';
    if (isMinor) {
      guardianName = str_(p.guardianName, 30);
      guardianPhone = normContact_(p.guardianPhone);
      if (!guardianName || !guardianPhone || consents.guardian !== true) return bad('guardian');
    }
    var sessions = Array.isArray(p.sessionDates) ? p.sessionDates.slice(0, 20).filter(function (d) { return /^\d{4}-\d{2}-\d{2}$/.test(d); }) : [];
    var interests = Array.isArray(p.interests) ? p.interests.slice(0, 10).map(function (x) { return str_(x, 20); }) : [];

    var a = {
      name: name, phone: phone, instagram: instagram ? '@' + instagram : '',
      classId: classId, day: str_(p.day, 3), time: str_(p.time, 20), instructor: str_(p.instructor, 40),
      classTitle: str_(p.classTitle, 80), startDate: startDate,
      // 권종은 '현황' 집계 기준이라 1회권은 서버가 고정 (월 등록은 '월 등록 4주' 등 화면 값)
      ticketLabel: ticketType === '1T' ? '1회권' : (str_(p.ticketLabel, 20) || '월 등록'),
      sessionDates: sessions.join(', '), amount: amount,
      ageGroup: str_(p.ageGroup, 10), isMinor: isMinor ? 'Y' : '', guardianName: guardianName, guardianPhone: guardianPhone,
      cashReceipt: isForeign ? '' : str_(p.cashReceipt, 20),
      payMethod: isForeign ? '현장 현금' : '안내 후 수납',
      channel: str_(p.channel, 10) || '사전 신청', source: str_(p.source, 60), interests: interests.join(', '),
      memo: str_(p.memo, 500), lang: p.lang === 'en' ? 'EN' : 'KO',
      consent: '개인정보·참여안내' + (isMinor ? '·보호자' : '') + ' 동의 / ' + str_(p.termsVersion, 20) + ' / ' + nowStr_(),
      adminMemo: '',
    };
    return saveRow_(SHEET_APPS, PROGRAM_COLS, a, function (row, idx) {
      return sameApplicant_(row, idx, a) && String(row[idx.classId]) === a.classId && dateStr_(row[idx.startDate]) === a.startDate;
    }, (isForeign ? '1 Time' : a.ticketLabel === '1회권' ? '1회권' : '월 등록') + ' · ' + a.instructor + ' ' + a.classTitle + ' · ' + a.ticketLabel + ' ' + a.startDate);
  }

  /* ───────────────────────── 워크숍 신청 ───────────────────────── */

  function handleWorkshop_(p) {
    var bad = function (f) { return { ok: false, code: 'INVALID', field: f }; };
    var isEn = p.lang === 'en';
    var name = str_(p.name, 30);
    var phone = normPhone_(p.phone);
    var instagram = normIg_(p.instagram);
    var consents = p.consents || {};
    if (!name) return bad('name');
    if (!instagram) return bad('instagram');           // 워크숍: 인스타그램 필수 (연락 용도)
    if (!isEn && !phone) return bad('phone');          // 한국어: 연락처도 필수 / 영문: 선택
    if (str_(p.phone, 20) && !phone) return bad('phone');
    if (consents.privacy !== true || consents.refund !== true) return bad('consent');

    var ws = findWorkshop_(str_(p.workshopId, 40));
    if (!ws) return { ok: false, code: 'WS_NOT_FOUND' };
    if (ws.status !== '모집중' || ws.date < Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd')) return { ok: false, code: 'WS_CLOSED' };
    var opt = ws.options[Number(p.optionIdx)];
    if (!opt) return bad('option');
    var payMethod = p.payMethod === 'cash' ? '현장 현금' : '계좌이체';

    var a = {
      name: name, phone: phone, instagram: '@' + instagram,
      optionName: opt.name, time: opt.time, amount: opt.price, // 금액은 '워크숍관리' 탭 기준 (화면 값 무시)
      payMethod: payMethod, depositor: payMethod === '계좌이체' ? str_(p.depositor, 30) : '',
      cashReceipt: payMethod === '계좌이체' ? str_(p.cashReceipt, 20) : '',
      workshopTitle: ws.title, workshopDate: ws.date, workshopId: ws.id, lang: isEn ? 'EN' : 'KO',
      consent: '개인정보(초상 포함)·환불규정 동의 / ' + str_(p.termsVersion, 20) + ' / ' + nowStr_(),
      adminMemo: '',
    };
    var res = saveRow_(WS_PREFIX + ws.id, WS_COLS, a, function (row, idx) {
      return sameApplicant_(row, idx, a) && String(row[idx.optionName]) === a.optionName;
    }, '워크숍 ' + ws.title + ' (' + ws.date + ') · ' + opt.name + ' · ' + payMethod);
    if (res.ok) { res.amount = opt.price; res.optionName = opt.name; res.time = opt.time; }
    return res;
  }

  /** 홈페이지용 워크숍 목록: 상태 모집중/마감, 오늘 이후 날짜 */
  function listWorkshops_() {
    var today = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
    return readWorkshops_().filter(function (w) { return w.status !== '숨김' && w.date >= today && w.options.length; })
      .sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; })
      .map(function (w) {
        return { id: w.id, status: w.status, title: w.title, date: w.date, place: w.place, poster: w.poster, note: w.note,
          options: w.options.map(function (o, i) { return { idx: i, name: o.name, time: o.time, price: o.price }; }) };
      });
  }

  function findWorkshop_(id) {
    if (!/^[a-z0-9-]{2,40}$/.test(id)) return null;
    return readWorkshops_().filter(function (w) { return w.id === id; })[0] || null;
  }

  function readWorkshops_() {
    var sh = ss_().getSheetByName(SHEET_WS_ADMIN);
    if (!sh || sh.getLastRow() < 2) return [];
    var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(function (h) { return String(h).trim(); });
    var at = function (h) { return head.indexOf(h); };
    return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues().map(function (r) {
      var get = function (h) { var i = at(h); return i < 0 ? '' : r[i]; };
      var options = [];
      for (var i = 1; i <= WS_MAX_OPTIONS; i++) {
        var n = str_(get('타임' + i + ' 이름'), 80);
        var price = Number(String(get('타임' + i + ' 금액')).replace(/[^\d]/g, ''));
        if (n && isFinite(price) && price > 0) options.push({ name: n, time: str_(get('타임' + i + ' 시간'), 30), price: price });
      }
      var poster = str_(get('포스터 이미지 URL'), 500);
      return {
        id: str_(get('워크숍ID'), 40).toLowerCase(), status: str_(get('상태'), 10) || '숨김', title: str_(get('제목'), 60),
        date: dateStr_(get('날짜')).slice(0, 10), place: str_(get('장소'), 120),
        poster: /^https:\/\//.test(poster) ? poster : '', note: str_(get('안내 (선택)'), 300), options: options,
      };
    }).filter(function (w) { return /^[a-z0-9-]{2,40}$/.test(w.id) && /^\d{4}-\d{2}-\d{2}$/.test(w.date) && w.title; });
  }

  /* ───────────────────────── 저장 공통 ───────────────────────── */

  /** 같은 사람: 연락처 또는 인스타그램이 같음 */
  function sameApplicant_(row, idx, a) {
    return (a.phone && String(row[idx.phone]) === a.phone) || (a.instagram && normIg_(row[idx.instagram]) === normIg_(a.instagram));
  }

  /** 시트에 한 줄 저장 (락 · 중복 확인 · 접수번호 · 알림). isDup(row, idx) 가 true 면 중복 */
  function saveRow_(sheetName, cols, a, isDup, mailTitle) {
    var lock = LockService.getScriptLock();
    if (!lock.tryLock(15000)) return { ok: false, code: 'SERVER' };
    var result, created = false;
    try {
      var ss = ss_();
      var sh = ss.getSheetByName(sheetName);
      if (!sh) { sh = ensureSheet_(sheetName, cols); created = true; }
      var map = headerMap_(sh, cols);
      var idx = {};
      cols.forEach(function (c) { idx[c[0]] = map[c[1]] - 1; });
      var last = sh.getLastRow();
      var values = last >= 2 ? sh.getRange(2, 1, last - 1, sh.getLastColumn()).getValues() : [];
      var dup = values.some(function (row) { return INACTIVE.indexOf(String(row[idx.status])) < 0 && isDup(row, idx); });
      if (dup) {
        result = { ok: false, code: 'DUPLICATE' };
      } else {
        a.id = nextId_();
        a.receivedAt = new Date();
        a.status = '입금대기';
        var row = [];
        for (var i = 0; i < sh.getLastColumn(); i++) row.push('');
        cols.forEach(function (c) { row[map[c[1]] - 1] = cell_(a[c[0]]); });
        sh.appendRow(row);
        result = { ok: true, id: a.id };
      }
    } finally {
      lock.releaseLock();
    }
    if (created) { try { rebuildSummary_(); } catch (e) { console.error(e); } }
    if (result.ok) notify_(a, sheetName, mailTitle);
    return result;
  }

  /** 접수번호 LByyMMdd-001 (모든 신청서 공통 일련번호, 락 안에서 호출) */
  function nextId_() {
    var day = Utilities.formatDate(new Date(), TZ, 'yyMMdd');
    var props = PropertiesService.getScriptProperties();
    var key = 'lab_seq_' + day; // 학원 접수번호(MV…) 와 별도 일련번호
    var n = Number(props.getProperty(key) || 0) + 1;
    props.setProperty(key, String(n));
    return ID_PREFIX + day + '-' + ('00' + n).slice(-3);
  }

  function notify_(a, sheetName, title) {
    try {
      var props = PropertiesService.getScriptProperties();
      var to = props.getProperty('LAB_NOTIFY_EMAIL') || props.getProperty('NOTIFY_EMAIL');
      if (!to) return;
      MailApp.sendEmail({
        to: to,
        subject: '[MVLS LAB 신청] ' + a.name + ' / ' + title,
        body: [
          '접수번호: ' + a.id, '신청서: ' + sheetName, '내용: ' + title,
          '신청자: ' + a.name + ' / ' + [a.phone, a.instagram].filter(String).join(' / '),
          a.amount !== '' && a.amount !== undefined ? '금액: ' + Number(a.amount).toLocaleString() + '원 (' + a.payMethod + ')' : '',
          a.isMinor ? '14세 미만 · 보호자 ' + a.guardianName + ' ' + a.guardianPhone : '',
          a.memo ? '문의: ' + a.memo : '',
          '', '시트: ' + ss_().getUrl(),
        ].filter(function (l) { return l !== ''; }).join('\n'),
      });
    } catch (err) {
      console.error('메일 발송 실패: ' + err);
    }
  }

  /* ───────────────────────── 신청내역 조회 ─────────────────────────
   * 이름 + 연락처(또는 인스타그램)가 모두 일치하는 신청을 모든 신청서 시트에서 찾습니다.
   * 연락처·보호자·현금영수증·예금주·문의사항·관리자메모는 반환하지 않습니다.
   */
  function handleLookup_(p) {
    var name = normName_(p.name);
    var phone = normPhone_(p.phone);
    var ig = normIg_(p.instagram);
    if (!name || (!phone && !ig)) return { ok: false, code: 'INVALID' };

    var cache = CacheService.getScriptCache();
    var gKey = 'lab_lk_' + Utilities.formatDate(new Date(), TZ, 'yyyyMMddHHmm');
    var g = Number(cache.get(gKey) || 0);
    if (g >= LOOKUP_PER_MIN) return { ok: false, code: 'RATE_LIMIT' };
    cache.put(gKey, String(g + 1), 120);
    var kKey = 'lab_lkk_' + (phone ? phone.replace(/\D/g, '') : 'ig_' + ig);
    var k = Number(cache.get(kKey) || 0);
    if (k >= LOOKUP_PER_KEY_10MIN) return { ok: false, code: 'RATE_LIMIT' };
    cache.put(kKey, String(k + 1), 600);

    var ss = ss_();
    var items = [];
    ss.getSheets().forEach(function (sh) {
      var sname = sh.getName();
      var isWs = sname.indexOf(WS_PREFIX) === 0;
      if (!isWs && sname !== SHEET_APPS) return;
      if (sh.getLastRow() < 2) return;
      var cols = isWs ? WS_COLS : PROGRAM_COLS;
      var map = headerMap_(sh, cols);
      var idx = {};
      cols.forEach(function (c) { idx[c[0]] = map[c[1]] - 1; });
      sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues().forEach(function (row) {
        if (!row[idx.id] || normName_(row[idx.name]) !== name) return;
        var hit = phone ? String(row[idx.phone]) === phone : normIg_(row[idx.instagram]) === ig;
        if (!hit) return;
        var at = row[idx.receivedAt];
        var base = {
          form: isWs ? 'workshop' : 'program', sheet: sname, id: String(row[idx.id]),
          receivedAt: at instanceof Date ? Utilities.formatDate(at, TZ, 'yyyy-MM-dd HH:mm') : String(at),
          status: String(row[idx.status] || ''), amount: row[idx.amount] === '' ? null : Number(row[idx.amount]) || 0,
          payMethod: String(row[idx.payMethod] || ''),
        };
        if (isWs) {
          base.title = String(row[idx.workshopTitle] || ''); base.option = String(row[idx.optionName] || '');
          base.time = String(row[idx.time] || ''); base.date = dateStr_(row[idx.workshopDate]);
        } else {
          base.instructor = String(row[idx.instructor] || ''); base.title = String(row[idx.classTitle] || '');
          base.day = String(row[idx.day] || ''); base.time = String(row[idx.time] || '');
          base.ticketLabel = String(row[idx.ticketLabel] || ''); base.startDate = dateStr_(row[idx.startDate]);
          base.sessionDates = String(row[idx.sessionDates] || '');
        }
        items.push(base);
      });
    });
    items.sort(function (a, b) { return a.receivedAt < b.receivedAt ? 1 : -1; });
    return { ok: true, items: items.slice(0, LOOKUP_MAX_ITEMS) };
  }

  /* ───────────────────────── 유틸 ───────────────────────── */

  function json_(o) {
    return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
  }

  function str_(v, max) {
    if (v === null || v === undefined) return '';
    if (v instanceof Date) return Utilities.formatDate(v, TZ, 'yyyy-MM-dd');
    return String(v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
  }

  function nowStr_() { return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm:ss'); }

  function normPhone_(v) {
    var s = str_(v, 20).replace(/[\s-]/g, '');
    if (/^01[016789]\d{7,8}$/.test(s)) {
      return s.length === 10 ? s.slice(0, 3) + '-' + s.slice(3, 6) + '-' + s.slice(6) : s.slice(0, 3) + '-' + s.slice(3, 7) + '-' + s.slice(7);
    }
    if (/^\+\d{8,15}$/.test(s)) return s;
    return '';
  }

  /** 인스타그램 아이디 정규화: '@아이디', 'instagram.com/아이디' 모두 허용 → 소문자 아이디 */
  function normIg_(v) {
    var s = str_(v, 100).toLowerCase().replace(/^(https?:\/\/)?(www\.)?instagram\.com\//, '').replace(/[/?#].*$/, '').replace(/^@/, '');
    return /^[a-z0-9._]{1,30}$/.test(s) ? s : '';
  }

  /** 보호자 연락처: 휴대폰 번호 / 이메일 / 인스타그램(@id) 중 하나 */
  function normContact_(v) {
    var s = str_(v, 100);
    if (!s) return '';
    if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) return s.toLowerCase();
    if (/^[+\d][\d\s-]*$/.test(s)) return normPhone_(s);
    var ig = normIg_(s);
    return ig ? '@' + ig : '';
  }

  function normName_(v) { return str_(v, 30).replace(/\s+/g, '').toLowerCase(); }

  /** 시트에 쓸 값: 문자열은 ' 를 붙여 텍스트로 (수식 주입·자동 변환 방지) */
  function cell_(v) {
    if (v === null || v === undefined || v === '') return '';
    if (v instanceof Date || typeof v === 'number') return v;
    return "'" + String(v);
  }

  function dateStr_(v) {
    return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v);
  }

  /** 1행 헤더 이름 → 열 번호. cols 에 있는데 시트에 없는 헤더는 오른쪽 끝에 추가 */
  function headerMap_(sh, cols) {
    var lastCol = sh.getLastColumn();
    var head = lastCol ? sh.getRange(1, 1, 1, lastCol).getValues()[0] : [];
    var map = {};
    head.forEach(function (h, i) { h = String(h).trim(); if (h && !map[h]) map[h] = i + 1; });
    var missing = cols.filter(function (c) { return !map[c[1]]; }).map(function (c) { return c[1]; });
    if (missing.length) {
      var start = lastCol + 1;
      var need = start + missing.length - 1 - sh.getMaxColumns();
      if (need > 0) sh.insertColumnsAfter(sh.getMaxColumns(), need);
      sh.getRange(1, start, 1, missing.length).setValues([missing]);
      missing.forEach(function (h, i) { map[h] = start + i; });
    }
    return map;
  }

  function colOf_(map, cols, key) {
    for (var i = 0; i < cols.length; i++) if (cols[i][0] === key) return map[cols[i][1]];
    throw new Error('unknown column ' + key);
  }

  function letter_(n) {
    var s = '';
    while (n > 0) { var m = (n - 1) % 26; s = String.fromCharCode(65 + m) + s; n = Math.floor((n - 1) / 26); }
    return s;
  }

  /* ───────────────────────── 개발자 테스트 ───────────────────────── */

  /** 편집기에서 실행해 'LAB 신청내역' 탭에 테스트 행이 들어가는지 확인 (확인 후 행 삭제) */
  function testApply() {
    var tomorrow = Utilities.formatDate(new Date(Date.now() + 86400000), TZ, 'yyyy-MM-dd');
    Logger.log(JSON.stringify(withGuards_({
      form: 'program', requestId: 'test-' + Date.now(), classId: 'TEST-0000-DEV', day: '월', time: '19:45~21:05',
      instructor: 'TEST', classTitle: '테스트 프로그램', ticketType: '1T', ticketLabel: '1회권', startDate: tomorrow,
      sessionDates: [tomorrow], amount: null, name: '테스트', phone: '010-0000-0000',
      consents: { refund: true, privacy: true }, termsVersion: 'test',
    }, handleProgram_)));
  }

  return { doGet: doGet, doPost: doPost, setup: setup, testApply: testApply, version: CODE_VERSION,
    _test: { normContact_: normContact_, normIg_: normIg_, normPhone_: normPhone_ } };
})();

/** LAB 탭 만들기 · 현황 다시 만들기 (편집기에서 실행하거나 시트 메뉴 'MVLS → LAB 시트 초기 설정') */
function setupLab() { LAB.setup(); }

/** 'LAB 신청내역' 탭에 테스트 행 넣기 (확인 후 행 삭제) */
function testApplyLab() { LAB.testApply(); }
