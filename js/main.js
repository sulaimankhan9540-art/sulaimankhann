/* ---------- Mobile menu ---------- */
const burger=document.getElementById('burger'),mm=document.getElementById('mobileMenu');
burger.addEventListener('click',()=>mm.classList.toggle('open'));
mm.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mm.classList.remove('open')));

/* ---------- Scroll reveal ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

/* ---------- Animated stats ---------- */
const so=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;so.unobserve(e.target);
  const el=e.target,end=+el.dataset.count,t0=performance.now();
  (function tick(t){const p=Math.min((t-t0)/1200,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick)})(t0);
}),{threshold:.5});
document.querySelectorAll('.stat-num').forEach(el=>so.observe(el));

/* ---------- Active nav link ---------- */
const secs=[...document.querySelectorAll('section[id],header[id]')];
const navAs=[...document.querySelectorAll('.nav-links a')];
addEventListener('scroll',()=>{
  const y=scrollY+120;let cur='';
  secs.forEach(s=>{if(s.offsetTop<=y)cur=s.id});
  navAs.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+cur));
},{passive:true});

/* ---------- Gallery filters ---------- */
document.getElementById('galFilters').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;
  document.querySelectorAll('#galFilters button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  const f=b.dataset.f;
  document.querySelectorAll('.gal-item').forEach(g=>g.classList.toggle('hide',f!=='all'&&g.dataset.cat!==f));
});

/* ---------- Lightbox ---------- */
const lb=document.getElementById('lightbox');
document.querySelectorAll('.gal-item').forEach(g=>g.addEventListener('click',()=>{
  document.getElementById('lbTag').textContent=g.dataset.cap;
  document.getElementById('lbCap').textContent=g.querySelector('.cap').textContent+' — click ✕ to close';
  lb.classList.add('open');document.body.style.overflow='hidden';
}));
function closeLB(){lb.classList.remove('open');document.body.style.overflow=''}
document.getElementById('lbClose').addEventListener('click',closeLB);
lb.addEventListener('click',e=>{if(e.target===lb)closeLB()});
addEventListener('keydown',e=>{if(e.key==='Escape'){closeLB();closeCase();mm.classList.remove('open')}});

/* ---------- Contact form ---------- */
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const n=document.getElementById('cf-name').value.trim(),m=document.getElementById('cf-msg').value.trim(),em=document.getElementById('cf-email').value.trim();
  if(!n||!em||!m){document.getElementById('formStatus').textContent='Please fill in all fields.';return}
  document.getElementById('formStatus').textContent='Message ready — wire this form to Formspree/EmailJS or replace with a mailto: link to make it live.';
  e.target.reset();
});

/* ---------- Case studies ---------- */
const phBox=(tag,sub)=>`<div class="ph"><span class="ph-tag">${tag}</span><span>${sub}</span></div>`;
const calcTable=`<table class="calc">
<tr><th>Quantity</th><th>Formula</th><th>Result</th><th>Demonstrates</th></tr>
<tr><td>[e.g., Max bending stress]</td><td class="mono">σ = Mc/I</td><td>[ADD VALUE + UNIT]</td><td>[What this proves about the design]</td></tr>
<tr><td>[e.g., Factor of safety]</td><td class="mono">FoS = σ_yield / σ_max</td><td>[ADD VALUE]</td><td>[Adequacy / need for redesign]</td></tr>
<tr><td>[e.g., Power / torque / heat flux]</td><td class="mono">[ADD EQUATION]</td><td>[ADD VALUE + UNIT]</td><td>[Sizing decision it justified]</td></tr>
</table>`;
const simBlock=`<div class="sim-grid">
  ${phBox('[UPLOAD SIMULATION IMAGE]','FEA stress / deformation plot')}
  ${phBox('[UPLOAD SIMULATION IMAGE]','Mesh / boundary conditions view')}
</div>
<ul>
<li><b>Objective:</b> [ADD — what question the analysis answers]</li>
<li><b>Boundary conditions &amp; loads:</b> [ADD — constraints, applied forces/pressures/temperatures]</li>
<li><b>Mesh &amp; material:</b> [ADD — element type, element count, material model used]</li>
<li><b>Results:</b> Max stress [ADD VALUE] · Max deformation [ADD VALUE] · Factor of safety [ADD VALUE]</li>
<li><b>Key finding &amp; design change:</b> [ADD — e.g., stress concentration at fillet → increased radius → FoS improved from X to Y]</li>
</ul>`;

const caseStudies={
fyp:{band:`<span class="kicker">Final Year Project — Full Case Study</span><h2>[FYP TITLE]</h2><p>[One-sentence project statement: what was designed/build and why it matters.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[MONTHS]</b></div><div><span>Tools</span><b>[CAD, FEA, MFG]</b></div></div>`,
body:`
<div class="cs-sec"><h3><span class="n">A</span>Project Overview</h3>
<p>[PROJECT OBJECTIVE AND PROBLEM STATEMENT — background from literature/research, why existing solutions fall short, and what your project set out to achieve.]</p>
${phBox('[UPLOAD: FINAL DESIGN RENDER]','Hero image — final CAD model or prototype')}</div>

<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3>
<ul><li><b>Requirements:</b> [ADD FUNCTIONAL REQUIREMENTS]</li><li><b>Constraints:</b> [ADD — cost, weight, size, material, manufacturing limits]</li><li><b>Performance targets:</b> [ADD — measurable targets defined before designing]</li><li><b>Considerations:</b> [ADD — safety, standards, ergonomics, environment, etc.]</li></ul></div>

<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3>
<div class="flow"><span>Problem Definition</span><i>→</i><span>Concept Generation</span><i>→</i><span>Initial Calculations</span><i>→</i><span>CAD Modeling</span><i>→</i><span>Material Selection</span><i>→</i><span>Simulation</span><i>→</i><span>Optimization</span><i>→</i><span>Manufacture</span><i>→</i><span>Testing</span><i>→</i><span>Final Design</span></div>
<div class="sim-grid">${phBox('[UPLOAD HAND SKETCHES]','Concept sketches / morphological chart')}${phBox('[UPLOAD CAD MODEL]','Parametric CAD model — key components')}</div>
<div class="sim-grid">${phBox('[UPLOAD EXPLODED VIEW]','Assembly / exploded view')}${phBox('[UPLOAD TECHNICAL DRAWING]','Manufacturing drawing with GD&T')}</div>
<p>[DESCRIBE CONCEPT SELECTION — decision matrix, Pugh chart, or trade-off logic used to pick the winning concept.]</p></div>

<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3>
<p>[PRESENT 2–4 REAL CALCULATIONS below — replace formulas and values with your actual work. Each equation must be explained.]</p>
<div class="eq">σ = M·c / I<small>[EXPLAIN: bending stress in the critical member; show substituted values and conclusion — e.g., "σ = 84 MPa &lt; σ_yield/ FoS requirement ⇒ design safe"]</small></div>
${calcTable}
<div class="eq">[ADD: heat transfer / fluid / gear / shaft / bearing equation as relevant]<small>[EXPLAIN WHAT THE RESULT DEMONSTRATES — e.g., bearing life in hours, required motor torque, pressure drop]</small></div></div>

<div class="cs-sec"><h3><span class="n">E</span>Simulation &amp; Analysis</h3>
<p>[DESCRIBE THE ANALYSES PERFORMED: static structural, modal, thermal, CFD, motion, fatigue — keep only those actually done.]</p>${simBlock}</div>

<div class="cs-sec"><h3><span class="n">F</span>Manufacturing &amp; Prototype</h3>
<p>[DESCRIBE HOW IT WAS BUILT — CNC milling/turning, 3D printing (material, infill), welding, sheet metal, casting, assembly sequence, tolerances.]</p>
<div class="sim-grid">${phBox('[UPLOAD MANUFACTURING PHOTO]','Machining / printing process')}${phBox('[UPLOAD PROTOTYPE PHOTO]','Assembled prototype')}</div></div>

<div class="cs-sec"><h3><span class="n">G</span>Testing &amp; Results</h3>
<p>[DESCRIBE EXPERIMENTAL TESTING — test setup, instruments, procedure, measured vs. predicted results, error discussion.]</p>
<div class="res-stats"><div><b>[X%]</b><span>[WEIGHT / COST REDUCTION]</span></div><div><b>[X%]</b><span>[EFFICIENCY / PERFORMANCE GAIN]</span></div><div><b>[X]</b><span>[FACTOR OF SAFETY ACHIEVED]</span></div></div>
${phBox('[UPLOAD TEST RESULT CHART]','Measured performance vs. target')}</div>

<div class="cs-sec"><h3><span class="n">H</span>Discussion &amp; Lessons Learned</h3>
<ul><li><b>Skills developed:</b> [ADD]</li><li><b>Key engineering decisions:</b> [ADD — with justification]</li><li><b>Problems encountered &amp; solved:</b> [ADD]</li><li><b>Future improvements:</b> [ADD — v2 ideas, materials, control system, manufacturability]</li></ul></div>`},
p1:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 1]</h2><p>[One-sentence summary of the project and its engineering core.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`
<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT · WHY IT MATTERS]</p>${phBox('[UPLOAD PROJECT IMAGE]','Hero render / final design')}</div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Requirements:</b> [ADD]</li><li><b>Constraints:</b> [ADD]</li><li><b>Targets:</b> [ADD]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="flow"><span>Concepts</span><i>→</i><span>Calculations</span><i>→</i><span>CAD</span><i>→</i><span>Simulation</span><i>→</i><span>Optimization</span><i>→</i><span>Build</span><i>→</i><span>Test</span></div>
<div class="sim-grid">${phBox('[UPLOAD CONCEPT SKETCH]','Concept design')}${phBox('[UPLOAD CAD MODEL]','CAD model')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3>${calcTable}<div class="eq">[ADD KEY EQUATION]<small>[EXPLAIN WHAT IT DEMONSTRATES]</small></div></div>
<div class="cs-sec"><h3><span class="n">E</span>Simulation &amp; Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[METHODS USED AND WHY]</p>${phBox('[UPLOAD BUILD PHOTO]','Manufacturing / assembly')}</div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[IMPROVEMENT 1]</span></div><div><b>[X%]</b><span>[IMPROVEMENT 2]</span></div><div><b>[X]</b><span>[KEY METRIC]</span></div></div>${phBox('[UPLOAD FINAL RESULT]','Final result / test data')}</div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[TECHNICAL SKILL DEVELOPED]</li><li>[PROBLEM ENCOUNTERED &amp; HOW SOLVED]</li><li>[WHAT V2 WOULD IMPROVE]</li></ul></div>`},
p2:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 2]</h2><p>[One-sentence summary.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT]</p>${phBox('[UPLOAD PROJECT IMAGE]','Hero image')}</div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Requirements:</b> [ADD]</li><li><b>Constraints:</b> [ADD]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="flow"><span>Concepts</span><i>→</i><span>CAD</span><i>→</i><span>Simulation</span><i>→</i><span>Build</span><i>→</i><span>Test</span></div>
<div class="sim-grid">${phBox('[UPLOAD CAD MODEL]','CAD model / assembly')}${phBox('[UPLOAD DRAWING]','Technical drawing')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3>${calcTable}</div>
<div class="cs-sec"><h3><span class="n">E</span>Simulation &amp; Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[METHODS USED]</p></div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div></div></div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[LESSON 1]</li><li>[LESSON 2]</li></ul></div>`},
p3:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 3]</h2><p>[One-sentence summary.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT]</p></div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Flow/thermal problem:</b> [ADD]</li><li><b>Performance targets:</b> [ADD]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="sim-grid">${phBox('[UPLOAD GEOMETRY]','Fluid domain / geometry')}${phBox('[UPLOAD MESH]','CFD mesh')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3><div class="eq">[ADD: Reynolds number / Bernoulli / convection equation]<small>[EXPLAIN WHAT IT DEMONSTRATES]</small></div></div>
<div class="cs-sec"><h3><span class="n">E</span>Simulation &amp; Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[METHODS USED]</p></div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[PRESSURE DROP / ΔT]</span></div><div><b>[X%]</b><span>[EFFICIENCY]</span></div><div><b>[X]</b><span>[METRIC]</span></div></div></div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[LESSON]</li><li>[LESSON]</li></ul></div>`},
p4:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 4]</h2><p>[One-sentence summary.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT]</p>${phBox('[UPLOAD PROTOTYPE PHOTO]','Built prototype')}</div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Requirements:</b> [ADD]</li><li><b>Constraints:</b> [ADD]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="sim-grid">${phBox('[UPLOAD CAD MODEL]','CAD model')}${phBox('[UPLOAD EXPLODED VIEW]','Exploded view')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3>${calcTable}</div>
<div class="cs-sec"><h3><span class="n">E</span>Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[CNC / 3D printing / welding / assembly process and tolerances]</p>
<div class="sim-grid">${phBox('[UPLOAD MACHINING PHOTO]','Machining process')}${phBox('[UPLOAD ASSEMBLY PHOTO]','Assembly')}</div></div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div></div></div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[LESSON]</li><li>[LESSON]</li></ul></div>`},
p5:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 5]</h2><p>[One-sentence summary.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT]</p></div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Requirements:</b> [ADD]</li><li><b>Targets:</b> [ADD — speed, torque, load, life]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="sim-grid">${phBox('[UPLOAD MECHANISM DIAGRAM]','Kinematic diagram')}${phBox('[UPLOAD CAD ASSEMBLY]','CAD assembly')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3><div class="eq">[ADD: gear ratio / shaft diameter / bearing life equation]<small>[EXPLAIN WHAT IT DEMONSTRATES]</small></div>${calcTable}</div>
<div class="cs-sec"><h3><span class="n">E</span>Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[METHODS USED]</p></div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div></div></div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[LESSON]</li><li>[LESSON]</li></ul></div>`},
p6:{band:`<span class="kicker">Project Case Study</span><h2>[PROJECT TITLE 6]</h2><p>[One-sentence summary.]</p>
<div class="cs-meta"><div><span>My Role</span><b>[ROLE]</b></div><div><span>Team Size</span><b>[N]</b></div><div><span>Duration</span><b>[TIME]</b></div><div><span>Tools</span><b>[TOOLS]</b></div></div>`,
body:`<div class="cs-sec"><h3><span class="n">A</span>Overview</h3><p>[OBJECTIVE · PROBLEM STATEMENT]</p></div>
<div class="cs-sec"><h3><span class="n">B</span>Engineering Problem</h3><ul><li><b>Requirements:</b> [ADD]</li><li><b>Constraints:</b> [ADD]</li></ul></div>
<div class="cs-sec"><h3><span class="n">C</span>Design Process</h3><div class="sim-grid">${phBox('[UPLOAD CAD MODEL]','CAD model')}${phBox('[UPLOAD RESULT IMAGE]','Key result')}</div></div>
<div class="cs-sec"><h3><span class="n">D</span>Engineering Calculations</h3>${calcTable}</div>
<div class="cs-sec"><h3><span class="n">E</span>Analysis</h3>${simBlock}</div>
<div class="cs-sec"><h3><span class="n">F</span>Manufacturing</h3><p>[METHODS USED]</p></div>
<div class="cs-sec"><h3><span class="n">G</span>Final Result</h3><div class="res-stats"><div><b>[X%]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div><div><b>[X]</b><span>[METRIC]</span></div></div></div>
<div class="cs-sec"><h3><span class="n">H</span>Lessons Learned</h3><ul><li>[LESSON]</li><li>[LESSON]</li></ul></div>`}
};

const csOverlay=document.getElementById('csOverlay'),csBody=document.getElementById('csBody');
function openCase(id){
  const cs=caseStudies[id];if(!cs)return;
  csBody.innerHTML=`<div class="cs-hero-band">${cs.band}</div>${cs.body}`;
  csOverlay.classList.add('open');document.body.style.overflow='hidden';
  csOverlay.querySelector('.cs-panel').scrollTop=0;
}
function closeCase(){csOverlay.classList.remove('open');document.body.style.overflow=''}
