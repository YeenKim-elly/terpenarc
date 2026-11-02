// Local SVG icons: no icon font, remote asset or runtime dependency.
// Subject glyphs use carbon-skeleton motifs. These small navigation silhouettes
// do not assign stereochemistry; the large practice previews use exact records.
// Limonene: six ring carbons, a methyl and an isopropenyl substituent (C10).
const limonene = '<path d="m12 5 5.2 3v6L12 17l-5.2-3V8ZM12 1.8V5m.6 2.5 2.4 1.4M12 17v3l-3.5 2M12 20l3.5 2m-2.3-3.4 3.3 1.9"/>';
// Isoprene: a five-carbon branched diene, not an unsubstituted hexagon.
const isoprene = '<path d="m3 16 6-8 6 8 6-8M9 8V3m-3.4 13 3.5-4.6m8.5 4.6 3.2-4.4"/>';
// Keep navigation concepts legible at 22px: one membrane and one crossing arrow.
const transport = '<path d="M10 3v5m0 8v5M14 3v5m0 8v5M3 12h18m-4-4 4 4-4 4"/>';
const paths = {
 hex:isoprene,
 isoprene,
 practice:limonene,
 library:'<path d="M12 6c-3-2-6-2.5-10-2v15c4-.5 7 0 10 2 3-2 6-2.5 10-2V4c-4-.5-7 0-10 2Zm0 0v15"/>',
 notes:'<path d="M11 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7m-4-9a2.1 2.1 0 0 1 3 3L10 16l-4 1 1-4Z"/>',
 workspace:'<g transform="translate(-1 1) scale(.8)" stroke-width="1.8">'+limonene+'</g><path d="m16 19 5.1-9.1 2 1.2L18 20l-2.8 1ZM20 11.8l2 1.2"/>',
 skeleton:'<path d="m2 8 5-3 5 3v6l-5 3-5-3Zm10 0 5-3 5 3v6l-5 3-5-3"/>',
 // Prenol connectivity: a C5 alcohol, with the hydroxyl label kept explicit.
 motif:'<path d="m2 17 4.5-2.6 4.5 2.6 4.5-2.6M6.5 14.4V9.2m1.9 3.5 2.6 1.5m4.5.2 2 1.2"/><text x="16.7" y="19.8" fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-weight="600" font-size="5.4">OH</text>',
 enzyme:'<g fill="currentColor" stroke="none" font-family="Arial,sans-serif" font-weight="600" font-size="7"><text x="2" y="7">C=O</text><text x="2" y="22">C–OH</text></g><path d="M4 12h16m-4-3 4 3-4 3"/>',
 // The fused 6–6–6–5 ring topology of the steroid nucleus.
 steroid:'<path d="m1 12 3-1.8 3 1.8v3.6l-3 1.8-3-1.8Zm6 0 3-1.8 3 1.8v3.6l-3 1.8-3-1.8m3-5.4V6.6l3-1.8 3 1.8v3.6L13 12m3-5.4 3.4-1.1 2.1 2.9-2.1 2.9-3.4-1.1" stroke-width="1.25"/>',
 transport,
 arrow:'<path d="M4 12h16m-6-6 6 6-6 6"/>',
 back:'<path d="M20 12H4m6-6-6 6 6 6"/>',
 bulb:'<path d="M8 16c0-2.2-3-3.6-3-7a7 7 0 0 1 14 0c0 3.4-3 4.8-3 7M8 17h8M9 21h6"/>',
 trophy:'<path d="M7 3h10v7a5 5 0 0 1-10 0ZM7 5H3v3a4 4 0 0 0 4 4M17 5h4v3a4 4 0 0 1-4 4M12 15v6M7 21h10"/>',
 leaf:'<path d="M20 4C10 3 3 8 4 16c1 5 8 6 12 1 3-4 3-8 4-13Z"/><path d="M4 21 16 9M9 16v-5M12 13h5"/>',
 eye:'<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
 bolt:transport,
 network:'<path d="m7.5 10.7 8-4.4m-8 7 8 4.4M18 7.8v8.4"/><circle cx="5" cy="12" r="2.8"/><circle cx="18" cy="5" r="2.8"/><circle cx="18" cy="19" r="2.8"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 learn:'<path d="M6 18 18 6M7 6h11v11"/>',
 assisted:'<circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 0 0 16Z" fill="currentColor" stroke="none"/>',
 plus:'<path d="M5 12h14M12 5v14"/>',
 expand:'<path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/>',
 minimize:'<path d="M3 8h5V3M16 3v5h5M21 16h-5v5M8 21v-5H3"/>',
 minus:'<path d="M5 12h14"/>'
};
export function icon(name){
 const key=Object.hasOwn(paths,name)?name:'hex';
 return '<svg class="atlas-icon" data-icon="'+key+'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+paths[key]+'</svg>';
}
