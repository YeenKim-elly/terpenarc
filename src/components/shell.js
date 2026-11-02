import {assetURL} from '../lib/asset-version.js';
import {icon as I} from './icons.js';
import {t, getLanguage} from '../lib/i18n.js';
import {isStudioNavigationOpen} from './studio-navigation.js';

export const navigation = [
  ['practice', 'practice', ['Practice', '연습하기']],
  ['library', 'library', ['Reference library', '구조 라이브러리']],
  ['web', 'network', ['Structure web', '구조 연결망']],
  ['compare', 'compare', ['Compare structures', '구조 비교']],
  ['sources', 'notes', ['Sources & guidance', '출처와 학습 안내']]
];

export function shellHTML(view) {
  const title = navigation.find(([id]) => id === view)?.[2] || navigation[0][2];
  const open = isStudioNavigationOpen();
  return `<div class="shell studio-shell${open ? '' : ' nav-collapsed'}">
    <aside class="sidebar" id="atlas-navigation" aria-label="${t('TerpenArc navigation','TerpenArc 탐색')}"${open ? '' : ' inert aria-hidden="true"'}>
      <button id="atlas-nav-dismiss" class="nav-dismiss" aria-label="${t('Close navigation','메뉴 닫기')}">${I('close')}</button>
      <a href="#practice" class="brand" data-nav="practice" aria-label="${t('TerpenArc home','TerpenArc 홈')}"><span class="brand-mark"><img src="${assetURL('assets/branding/atlas-mark.svg')}" alt="" width="38" height="38"></span><span class="brand-name">Terpen<span>Arc</span></span></a>
      <div class="side-caption">${t('TERPENE LEARNING STUDIO','테르펜 학습 스튜디오')}</div>
      <nav class="nav" aria-label="${t('Main navigation','주 메뉴')}">${navigation.map(([id,glyph,label]) => `<button data-nav="${id}" class="${view === id ? 'active' : ''}"${view === id ? ' aria-current="page"' : ''}>${I(glyph)}<span>${t(...label)}</span>${view === id ? '<i class="nav-active-dot" aria-hidden="true"></i>' : ''}</button>`).join('')}</nav>
      <div class="side-bottom"><div class="side-molecular-mark" aria-hidden="true"><svg viewBox="0 0 156 96" fill="none"><title>Isoprene · C5 carbon skeleton</title><path d="m12 63 38-26 38 26 38-26M50 37V7M18 70l32-22m44 22 32-22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="63" r="2.7"/><circle cx="50" cy="37" r="2.7"/><circle cx="88" cy="63" r="2.7"/><circle cx="126" cy="37" r="2.7"/><circle cx="50" cy="7" r="2.7"/><text x="115" y="91" fill="currentColor" font-size="12" font-family="monospace">C₅</text></svg></div><p>${t('Explore the chemistry.<br>Follow the connections.','분자의 화학을 탐색하고,<br>그 연결을 따라가 보세요.')}</p><div class="version"><span class="dot"></span> TERPENARC / 01</div></div>
    </aside>
    <button id="atlas-nav-close" class="nav-scrim" aria-label="${t('Close navigation','메뉴 닫기')}" tabindex="-1"${open ? '' : ' hidden'}></button>
    <div class="app-content"><header class="topbar"><div class="topbar-left"><button class="nav-toggle" id="atlas-nav-toggle" aria-label="${t(open ? 'Close navigation' : 'Open navigation',open ? '메뉴 닫기' : '메뉴 열기')}" aria-controls="atlas-navigation" aria-expanded="${open}" data-open-label="${t('Open navigation','메뉴 열기')}" data-close-label="${t('Close navigation','메뉴 닫기')}"><span class="hamburger" aria-hidden="true"><i></i><i></i><i></i></span></button><div class="breadcrumb">TerpenArc <span>/</span><strong>${t(...title)}</strong></div></div><div class="top-actions"><span class="top-status"><span class="dot"></span>${t('Follow your curiosity','호기심을 따라, 한 분자씩')}</span><div class="lang" role="group" aria-label="Language">${['en','ko'].map(lang => `<button data-lang="${lang}" class="${getLanguage() === lang ? 'selected' : ''}" aria-pressed="${getLanguage() === lang}">${lang === 'en' ? 'EN' : '한국어'}</button>`).join('')}</div></div></header>
    <main class="main${view === 'practice' ? ' studio-main' : ''}" id="main" tabindex="-1"><div id="page-root"></div><footer class="footer"><span>${t('Made for curious minds. Rooted in chemistry.','호기심을 위한 공간. 화학에 뿌리를 두고.')}</span><button data-nav="sources">IUPAC · PubChem · ${t('Primary literature','일차 문헌')} ${I('arrow')}</button></footer></main></div>
  </div>`;
}
