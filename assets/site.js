(function(){
  function $(s, r){ return (r||document).querySelector(s); }
  function $all(s, r){ return Array.from((r||document).querySelectorAll(s)); }
  if (yearSel) yearSel.innerHTML = '<option value="">All years</option>' + years.map(y=>`<option>${y}</option>`).join('');
  function cite(p){
    const parts = [];
    if (p.authors) parts.push(p.authors);
    if (p.year) parts.push(`(${p.year})`);
    if (p.title) parts.push(p.title);
    if (p.venue) parts.push(p.venue);
    const body = parts.join(' ');
    const doi = p.doi ? `DOI: ${p.doi}` : '';
    return `${body}. ${doi}`.replace(/\s+\./g,'.');
  }
  function render(){
    const area = (areaEls.find(b=>b.classList.contains('active'))?.getAttribute('data-filter-area')) || '';
    const year = yearSel ? yearSel.value : '';
    const items = window.PUBLICATIONS.filter(p => (!area || p.area===area) && (!year || String(p.year)===String(year)));
    listEl.innerHTML = items.map(p=>{
      const url = p.doi ? `https://doi.org/${p.doi}` : (p.url||'#');
      const tags = [p.area].filter(Boolean).map(t=>`<span class="tag">${t}</span>`).join('');
      return `<a class="paper-card" href="${url}" target="_blank" rel="noopener">
        <div class="paper-title">${p.title||'Untitled'}</div>
        <div class="paper-authors">${p.authors||''}</div>
        <div class="paper-meta">${[p.venue,p.year].filter(Boolean).join(' • ')}</div>
        <div class="paper-meta">${p.doi?`DOI: ${p.doi}`:''}</div>
        <div class="paper-tags">${tags}</div>
      </a>`;
    }).join('');
    if (countEl) countEl.textContent = `${items.length} item${items.length===1?'':'s'}`;
    if (!items.length) listEl.innerHTML = `<div class="muted">No items yet.</div>`;
  }
  $all('[data-filter-area]').forEach(btn=>btn.addEventListener('click',()=>{
    $all('[data-filter-area]').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active'); render();
  }));
  if (yearSel) yearSel.addEventListener('change', render);
  render();
})();
(function () {
})();
