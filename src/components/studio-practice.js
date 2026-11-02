const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));

// Transparent chemical artwork is generated from the catalogue, with source
// records and depiction conventions in assets/ui/chemical-art.json.
const drawings = Object.fromEntries(['family','precursor','motif','enzyme','scaffold','comparison']
  .map(mode => [mode, 'assets/ui/' + mode + '.svg']));

/** A practice selector; activation selects a mode before the session is launched. */
export function renderStudioModeCard({mode, title, description, count, selected = false, expanded = false, panelId, lang = 'en'} = {}) {
  const safeMode = Object.hasOwn(drawings, mode) ? mode : 'family';
  const ko = lang === 'ko';
  const action = expanded ? (ko ? '연습 설정 접기' : 'Close session options') : (ko ? '연습 설정 열기' : 'Set up practice');
  return `<button type="button" class="mode-card studio-card studio-card--${safeMode}${selected ? ' active' : ''}" data-mode="${escapeHTML(mode)}" aria-pressed="${Boolean(selected)}" aria-expanded="${Boolean(expanded)}"${panelId ? ` aria-controls="${escapeHTML(panelId)}"` : ''}>
    <span class="studio-card-preview" aria-hidden="true"><img src="${drawings[safeMode]}" width="270" height="100" alt="" decoding="async" draggable="false"></span>
    <span class="check" aria-hidden="true"><svg viewBox="0 0 16 16" fill="none"><path d="m4 8 2.5 2.5L12 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <span class="studio-card-content"><span class="studio-card-title" id="practice-mode-title-${safeMode}">${escapeHTML(title)}</span><span class="studio-card-description">${escapeHTML(description)}</span></span>
    <span class="studio-card-bottom"><span class="studio-card-action">${action}<svg viewBox="0 0 18 18" fill="none" aria-hidden="true"><path d="m5 7 4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span><span class="count">${escapeHTML(count)}</span></span>
  </button>`;
}
