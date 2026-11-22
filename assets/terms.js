/**
 * MVLS HOZIN STUDIO LAB - 동의 문구
 * ------------------------------------------------------------
 * 현행 LAB 구글폼 문구 기준. 문구를 바꾸면 config.js 의 termsVersion 도 올려주세요.
 *  refund     프로그램 참여 안내 (1회권·월등록·1 Time)
 *  privacy    프로그램 개인정보 수집·이용
 *  wsRefund   워크숍 환불 규정
 *  wsPrivacy  워크숍 개인정보 수집·이용 (초상 포함)
 */
window.MVLS_TERMS = {
  refund: {
    ko: {
      title: '프로그램 참여 안내',
      html: `
        <ul>
          <li>신청서 제출 후 참여비 및 송금처를 연락처로 안내드리며, 수납까지 완료되어야 신청이 확정됩니다.</li>
          <li>월 등록은 선택한 시작일부터 주 1회 참여합니다. 기간이 표기된 프로그램은 기간 안에서만 참여할 수 있으며 휴식권이 적용되지 않습니다.</li>
          <li>기간이 표기되지 않은 프로그램은 상시 신청할 수 있으며 휴식권이 적용됩니다.</li>
          <li>1회권은 선택한 날짜의 프로그램 1회에 한해 유효합니다.</li>
          <li>휴강(No Program) · 대강 등 일정은 스튜디오 사정에 따라 변경될 수 있으며, 변경 시 공지 또는 개별 안내드립니다.</li>
        </ul>
        <p class="muted">참여비 환불 기준은 스튜디오로 문의해주세요. [확인 필요]</p>
      `,
    },
    en: {
      title: 'Program information',
      html: `
        <ul>
          <li>Please pay in cash at the studio reception. Korean cards are accepted, but international cards are not.</li>
          <li>A 1-time pass is valid for the one program on the date you choose.</li>
          <li>Schedules may change (No Program days, substitute instructors). We will let you know on Instagram.</li>
        </ul>
      `,
    },
  },
  privacy: {
    ko: {
      title: '개인정보 수집 · 이용 동의',
      html: `
        <table>
          <tbody>
            <tr><th>목적</th><td>마블러스호진스튜디오랩 / 마블스트릿동호회 프로그램 신청 및 운영, 참여 안내 연락</td></tr>
            <tr><th>수집 항목</th><td>(필수) 이름, 연락처(영문 신청은 인스타그램 아이디), 신청 프로그램 · 권종 · 참여일<br />(만 14세 미만) 보호자 이름, 보호자 연락처(휴대폰 번호 · 이메일 · 인스타그램 아이디 중 하나)<br />(선택) 연령대, 현금영수증 발급 번호, 신청 경로, 관심 분야, 문의 사항</td></tr>
            <tr><th>보유 기간</th><td>파기를 요청하시면 즉시 삭제합니다.</td></tr>
            <tr><th>처리 위탁 · 국외 이전</th><td>신청 정보는 Google LLC의 클라우드 서비스(Google Sheets)에 저장되며, 데이터는 국외(미국 등) 서버에 보관될 수 있습니다.</td></tr>
          </tbody>
        </table>
        <p>동의하지 않을 수 있으나, 필수 항목에 동의하지 않으면 신청이 어렵습니다.</p>
        <p class="muted">문의: 인스타그램 @mvlshozinstudio.lab · 카카오채널 마블러스호진스튜디오 랩</p>
      `,
    },
    en: {
      title: 'Consent to Personal Information',
      html: `
        <table>
          <tbody>
            <tr><th>Purpose</th><td>Program registration and operation, contacting you about your program</td></tr>
            <tr><th>What we collect</th><td>(Required) Name, Instagram ID, selected program · date<br />(Under 14) Guardian's name and contact (phone, email or Instagram ID)<br />(Optional) Age group, how you found us, interests, questions</td></tr>
            <tr><th>Retention</th><td>Deleted immediately upon your request.</td></tr>
            <tr><th>Storage</th><td>Stored in Google Sheets (Google LLC), possibly on servers outside Korea (e.g. the US).</td></tr>
          </tbody>
        </table>
        <p>You may decline, but we cannot process your registration without the required items.</p>
      `,
    },
  },
  wsRefund: {
    ko: {
      title: '워크숍 환불 규정',
      html: `
        <ul>
          <li><b>신청 접수가 완료되면 환불되지 않습니다.</b> 단, 양도 신청은 가능합니다. (부분 양도 불가)</li>
          <li>양도 신청은 인스타그램 @mvlshozinstudio.lab 으로 문의해주세요.</li>
          <li>반드시 일정을 확인하신 후 신청해주세요.</li>
        </ul>
      `,
    },
    en: {
      title: 'Workshop refund policy',
      html: `
        <ul>
          <li><b>No refunds once your registration is complete.</b> Transfers are allowed (no partial transfers).</li>
          <li>For transfers, contact @mvlshozinstudio.lab on Instagram.</li>
          <li>Please check your schedule before applying.</li>
        </ul>
      `,
    },
  },
  wsPrivacy: {
    ko: {
      title: '워크숍 개인정보 수집 · 이용 동의',
      html: `
        <table>
          <tbody>
            <tr><th>수집 항목</th><td>신청자 이름, 연락처, 인스타그램 아이디, 예금주명 · 현금영수증 정보, 워크숍 참여 모습(초상)</td></tr>
            <tr><th>사용 목적</th><td>워크숍 운영, 워크숍 결과물 공유 및 스튜디오 운영 · 홍보</td></tr>
            <tr><th>보유 기간</th><td>작성일로부터 1년. 이후 파기</td></tr>
            <tr><th>처리 위탁 · 국외 이전</th><td>신청 정보는 Google LLC의 클라우드 서비스(Google Sheets)에 저장되며, 국외(미국 등) 서버에 보관될 수 있습니다.</td></tr>
          </tbody>
        </table>
      `,
    },
    en: {
      title: 'Workshop consent to personal information',
      html: `
        <table>
          <tbody>
            <tr><th>Items</th><td>Name, phone, Instagram ID, bank account name / cash receipt details, images and video of your participation (portrait rights)</td></tr>
            <tr><th>Purpose</th><td>Workshop management, sharing workshop results, studio operation and promotion</td></tr>
            <tr><th>Retention</th><td>One year from submission, then destroyed</td></tr>
            <tr><th>Storage</th><td>Stored in Google Sheets (Google LLC), possibly on servers outside Korea (e.g. the US).</td></tr>
          </tbody>
        </table>
      `,
    },
  },
};
