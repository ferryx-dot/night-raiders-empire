 /* ============================================
   NIGHT RAIDERS EMPIRE — app.js
   Created by: 𝐋𝐎𝐑𝐃♰𝔻𝐄𝐕𝐈𝐍𝐄 𓄿
   Firebase Firestore Edition
   ============================================ */

// ══════════════════════════════════════════
// FIREBASE SETUP
// ══════════════════════════════════════════
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, deleteDoc,
  collection, getDocs, onSnapshot, query, orderBy, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD-EBASWk6n9f7B3egf6Nu1-ohf8tXDrXM",
  authDomain: "night-raiders-empire.firebaseapp.com",
  projectId: "night-raiders-empire",
  storageBucket: "night-raiders-empire.firebasestorage.app",
  messagingSenderId: "519577854277",
  appId: "1:519577854277:web:0d1d1fe74d3a39393b1e2c"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// ══════════════════════════════════════════
// FIRESTORE HELPERS
// ══════════════════════════════════════════
async function fsGet(col, docId) {
  const snap = await getDoc(doc(db, col, docId));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

async function fsGetAll(colName) {
  const snap = await getDocs(collection(db, colName));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

async function fsSet(colName, docId, data) {
  await setDoc(doc(db, colName, docId), data);
}

async function fsAdd(colName, data) {
  return await addDoc(collection(db, colName), { ...data, createdAt: serverTimestamp() });
}

async function fsDelete(colName, docId) {
  await deleteDoc(doc(db, colName, docId));
}

// ══════════════════════════════════════════
// DEFAULT MEMBERS
// ══════════════════════════════════════════
const DEFAULT_MEMBERS = [
  { id: '1',  order: 1,  name: 'Lord Devine',        role: '𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍 / 𝙇𝙀𝘼𝘿𝙀𝙍',                      desc: 'The founder and supreme ruler of the Night Raiders. Every decision, every move, every war starts with him. The empire exists because of his vision.',                                                          ranked: true,  status: 'active' },
  { id: '2',  order: 2,  name: 'Lord Obito Uchiha',  role: '𝙍𝙄𝙂𝙃𝙏𝙃𝘼𝙉𝘿 𝙈𝘼𝙉 / 𝙃𝙀𝘼𝘿 𝙊𝙁 𝙃𝙄𝙅𝘼𝘾𝙆𝙀𝙍𝙎',         desc: 'The second in command. Leads the hijackers with precision — taking what needs to be taken without hesitation. Where Lord Devine commands, Lord Obito executes.',                                             ranked: true,  status: 'active' },
  { id: '3',  order: 3,  name: 'Lord Reaper',        role: '𝙇𝙀𝙁𝙏𝙃𝘼𝙉𝘿 𝙈𝘼𝙉 / 𝙃𝙀𝘼𝘿 𝙊𝙁 𝙎𝙋𝙔𝙎',              desc: 'Moves in silence. Controls the entire spy network and knows everything before it happens. By the time you think you have a secret, Reaper already knows.',                                                  ranked: true,  status: 'active' },
  { id: '4',  order: 4,  name: 'Lord Zephyr',        role: '𝙃𝙀𝘼𝘿 𝙊𝙁 𝘽𝙐𝙂𝙂𝙀𝙍𝙎',                          desc: 'No device is safe from him. Co-founder of the chaos — he was there from the very first raid. If your phone is acting up, you already know who sent him.',                                                    ranked: true,  status: 'active' },
  { id: '5',  order: 5,  name: 'Lady Deedee',        role: '𝙍𝘼𝙄𝘿𝙀𝙍𝙎 𝙂𝙊𝘿𝘿𝙀𝙎𝙎',                          desc: "Don't let the looks fool you. The most dangerous weapon in the clan wrapped in charm. She walks in and people underestimate her — that's the last mistake they make.",                                     ranked: true,  status: 'active' },
  { id: '6',  order: 6,  name: 'Lord Leviathan',     role: '𝙃𝙀𝘼𝘿 𝙊𝙁 𝙍𝙀𝘾𝙍𝙐𝙄𝙏𝙈𝙀𝙉𝙏',                      desc: 'The hunter of talent. Seeks out the strongest warriors and pulls them into the Night Raiders family. Every great member you see? Leviathan had a hand in finding them.',                                   ranked: true,  status: 'active' },
  { id: '7',  order: 7,  name: 'Lord Anonymous',     role: '𝘾𝙇𝘼𝙉 𝙀𝙓𝙀𝘾𝙐𝙏𝙄𝙊𝙉𝙀𝙍 / 𝙃𝙀𝘼𝘿 𝙊𝙁 𝙋𝙐𝙉𝙄𝙎𝙃𝙀𝙍𝙎',     desc: "When justice needs to be served, he's the one they call. No mercy, no hesitation, no trace. You won't see him coming — and that's exactly the point.",                                                  ranked: true,  status: 'active' },
  { id: '8',  order: 8,  name: 'Lord Subaru',        role: '𝙍𝘼𝙉𝙆𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍 / 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍',                desc: 'A ranked member and a developer. Builds the tools that keep the empire running from behind the scenes. The kind of mind that turns an idea into a weapon overnight.',                                        ranked: true,  status: 'active' },
  { id: '9',  order: 9,  name: 'Lord Probably',      role: '𝙍𝘼𝙉𝙆𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍 / 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍',                desc: "Don't be fooled by the name — there's nothing probably about it. A developer who codes with conviction and delivers without doubt. An asset the empire depends on.",                                       ranked: true,  status: 'active' },
  { id: '10', order: 10, name: 'MR Dave Virus',      role: '𝙍𝘼𝙉𝙆𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍 / 𝙃𝘼𝘾𝙆𝙀𝙍',                   desc: 'The name says everything. A ranked hacker whose skills spread through systems like a virus — unstoppable, untraceable, and exactly what Night Raiders needed in its arsenal.',                                 ranked: true,  status: 'active' },
  { id: '11', order: 11, name: 'Lord Slur',          role: '𝙍𝘼𝙉𝙆𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍',                            desc: 'Earned his rank the hard way. Lord Slur does not talk much — but when he acts, the results speak louder than words ever could. A quiet force inside the empire.',                                             ranked: true,  status: 'active' },
  { id: '12', order: 12, name: 'Lord Deluxe',        role: '𝙍𝘼𝙉𝙆𝙀𝘿 𝙈𝙀𝙈𝘽𝙀𝙍',                            desc: 'Everything he does comes premium. Lord Deluxe carries the ranked badge with the kind of energy that elevates every room he steps into. Deluxe by name, elite by nature.',                                   ranked: true,  status: 'active' },
  { id: '13', order: 13, name: 'Lord Monarch',       role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'Built like a king. Lord Monarch moves through every operation with authority that cannot be taught — only earned. A raider who commands respect without demanding it.',                                        ranked: false, status: 'active' },
  { id: '14', order: 14, name: 'Lady Annabelle',     role: '𝙍𝘼𝙄𝘿𝙀𝙍 / 𝘿𝙀𝙑𝙀𝙇𝙊𝙋𝙀𝙍',                        desc: 'A developer and a raider — two things most people cannot balance, and she does both without breaking a sweat. Lady Annabelle builds in silence and raids with precision.',                                    ranked: false, status: 'active' },
  { id: '15', order: 15, name: 'Lord Đ@√!đ',         role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'The name alone tells you he operates differently. Unpredictable, adaptive, and the kind of raider that opponents never quite figure out until it is already too late.',                                       ranked: false, status: 'active' },
  { id: '16', order: 16, name: 'Lord Sanemi',        role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'Relentless. Lord Sanemi brings the kind of aggression to every raid that makes targets second-guess everything. He does not slow down and he does not stop.',                                                 ranked: false, status: 'active' },
  { id: '17', order: 17, name: 'Lady Rosie',         role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: "Pretty name, ruthless execution. Lady Rosie joined the Night Raiders and immediately made clear she wasn't here to blend in. She raids with grace and strikes without warning.",                            ranked: false, status: 'active' },
  { id: '18', order: 18, name: 'Lord Korezy',        role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'Cool under pressure and sharp in the field. Lord Korezy is the type of raider that stays calm when everything is loud — and that calm is what makes him dangerous.',                                         ranked: false, status: 'active' },
  { id: '19', order: 19, name: 'Lady Gibby',         role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'Underestimate her at your own risk. Lady Gibby brings energy and edge to every operation she is part of. A raider who shows up, shows out, and leaves her mark every time.',                                 ranked: false, status: 'active' },
  { id: '20', order: 20, name: 'Lord Dangerous',     role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'The name is not a warning — it is a fact. Lord Dangerous lives up to every letter of it. In any raid, in any operation, he is the variable that makes everything unpredictable.',                            ranked: false, status: 'active' },
  { id: '21', order: 21, name: 'AnonRaiders',        role: '𝙍𝘼𝙄𝘿𝙀𝙍',                                    desc: 'No face. No trace. Just results. AnonRaiders operates in the shadows the way Night Raiders was built to — striking without identity and disappearing without evidence.',                                      ranked: false, status: 'active' },
];

const DEFAULT_DATA = {
  stats: { raiders: 0, raids: 0, bots: 0 },
  announcements: [
    { id: 'ann1', title: 'Welcome to the New Empire', body: 'The Night Raiders Empire website has been fully rebuilt. Stay tuned for updates from Lord Devine.', badge: 'NEW', date: 'Mar 05, 2026' },
    { id: 'ann2', title: 'Raids This Weekend', body: 'Lord Devine is planning major raids this weekend. All active members must be ready and online.', badge: 'URGENT', date: 'Mar 05, 2026' }
  ],
  leaderboard: [
    { id: 'lb1', name: 'Lord Devine', score: 0 },
    { id: 'lb2', name: 'Lord Obito Uchiha', score: 0 },
    { id: 'lb3', name: 'Lord Reaper', score: 0 },
  ],
  raids: [
    { id: 'raid1', target: 'Placeholder Clan', result: 'win', date: 'Mar 05, 2026', participants: 0 }
  ],
  hof: [
    { id: 'hof1', name: 'Lord Devine', title: 'Founder & Supreme Lord', achievement: 'Created and built the Night Raiders Empire from nothing. The legend behind the legion.' }
  ]
};

// ══════════════════════════════════════════
// SEED FIRESTORE ON FIRST LOAD
// ══════════════════════════════════════════
async function seedIfEmpty() {
  const statsSnap = await fsGet('config', 'stats');
  if (!statsSnap) await fsSet('config', 'stats', DEFAULT_DATA.stats);

  const members = await fsGetAll('members');
  if (members.length === 0) {
    for (const m of DEFAULT_MEMBERS) {
      await setDoc(doc(db, 'members', m.id), m);
    }
  }

  const anns = await fsGetAll('announcements');
  if (anns.length === 0) {
    for (const a of DEFAULT_DATA.announcements) {
      await setDoc(doc(db, 'announcements', a.id), a);
    }
  }

  const lb = await fsGetAll('leaderboard');
  if (lb.length === 0) {
    for (const e of DEFAULT_DATA.leaderboard) {
      await setDoc(doc(db, 'leaderboard', e.id), e);
    }
  }

  const raids = await fsGetAll('raids');
  if (raids.length === 0) {
    for (const r of DEFAULT_DATA.raids) {
      await setDoc(doc(db, 'raids', r.id), r);
    }
  }

  const hof = await fsGetAll('hof');
  if (hof.length === 0) {
    for (const h of DEFAULT_DATA.hof) {
      await setDoc(doc(db, 'hof', h.id), h);
    }
  }
}

// ══════════════════════════════════════════
// AUTH
// ══════════════════════════════════════════
const ADMIN_USER = 'LordDevine';
const ADMIN_PASS = 'NightRaiders666';
let isAdmin = false;

function openLogin() {
  document.getElementById('loginOverlay').classList.remove('hidden');
  document.getElementById('loginError').classList.add('hidden');
  document.getElementById('loginUser').value = '';
  document.getElementById('loginPass').value = '';
  setTimeout(() => document.getElementById('loginUser').focus(), 100);
}

function closeLogin() {
  document.getElementById('loginOverlay').classList.add('hidden');
}

function doLogin() {
  const u = document.getElementById('loginUser').value.trim();
  const p = document.getElementById('loginPass').value;
  if (u === ADMIN_USER && p === ADMIN_PASS) {
    isAdmin = true;
    closeLogin();
    showAdminLinks();
    showPage('admin');
    closeMenu();
  } else {
    document.getElementById('loginError').classList.remove('hidden');
  }
}

function doLogout() {
  isAdmin = false;
  hideAdminLinks();
  showPage('home');
}

function showAdminLinks() {
  document.querySelectorAll('.admin-only').forEach(el => el.classList.remove('hidden'));
}

function hideAdminLinks() {
  document.querySelectorAll('.admin-only').forEach(el => el.classList.add('hidden'));
}

// ══════════════════════════════════════════
// MENU
// ══════════════════════════════════════════
function toggleMenu() {
  document.getElementById('sideMenu').classList.toggle('open');
  document.getElementById('menuOverlay').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('sideMenu').classList.remove('open');
  document.getElementById('menuOverlay').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

// ══════════════════════════════════════════
// PAGE NAVIGATION
// ══════════════════════════════════════════
function showPage(name) {
  if (name === 'admin' && !isAdmin) { openLogin(); return; }

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById(name + 'Page');
  if (target) target.classList.add('active');

  document.querySelectorAll('.menu-link').forEach(l => {
    l.classList.remove('active');
    if (l.dataset.page === name) l.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (name === 'home')        { renderHomeAnn(); renderStats(); }
  if (name === 'about')       { renderFullAnn(); }
  if (name === 'members')     { renderMembers(); }
  if (name === 'leaderboard') { renderLeaderboard(); }
  if (name === 'raids')       { renderRaids(); }
  if (name === 'hof')         { renderHof(); }
  if (name === 'admin')       { renderAdminAll(); }
}

// ══════════════════════════════════════════
// STATS
// ══════════════════════════════════════════
async function renderStats() {
  const data = await fsGet('config', 'stats');
  if (!data) return;
  document.getElementById('heroRaiders').textContent = data.raiders.toLocaleString();
  document.getElementById('heroRaids').textContent   = data.raids.toLocaleString();
  document.getElementById('heroBots').textContent    = data.bots.toLocaleString();
}

// ══════════════════════════════════════════
// ANNOUNCEMENTS
// ══════════════════════════════════════════
function annCardHTML(a, showDelete = false) {
  return `
    <div class="ann-card">
      <div class="ann-date">${a.date || ''}</div>
      <div class="ann-title">${a.title}</div>
      <div class="ann-body">${a.body}</div>
      ${a.badge ? `<div class="ann-badge">${a.badge}</div>` : ''}
      ${showDelete ? `<button class="ann-delete" onclick="deleteAnn('${a.id}')">Delete</button>` : ''}
    </div>
  `;
}

async function renderHomeAnn() {
  const el = document.getElementById('homeAnnList');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const anns = await fsGetAll('announcements');
  anns.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  el.innerHTML = anns.slice(0, 2).length
    ? anns.slice(0, 2).map(a => annCardHTML(a)).join('')
    : '<div class="empty-state">No announcements yet.</div>';
}

async function renderFullAnn() {
  const el = document.getElementById('fullAnnList');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const anns = await fsGetAll('announcements');
  anns.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  el.innerHTML = anns.length
    ? anns.map(a => annCardHTML(a)).join('')
    : '<div class="empty-state">No announcements yet.</div>';
}

async function renderAdminAnn() {
  const el = document.getElementById('a-ann-list');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const anns = await fsGetAll('announcements');
  anns.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  el.innerHTML = anns.length
    ? anns.map(a => annCardHTML(a, true)).join('')
    : '<div class="empty-state">None yet.</div>';
}

async function deleteAnn(id) {
  await fsDelete('announcements', id);
  renderAdminAnn();
}

// ══════════════════════════════════════════
// MEMBERS — PUBLIC PAGE (sorted by order)
// ══════════════════════════════════════════
async function renderMembers() {
  const el = document.getElementById('membersGrid');
  if (!el) return;
  el.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Loading...</div>';
  const members = await fsGetAll('members');
  members.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  el.innerHTML = members.length ? members.map(m => {
    const tag      = m.ranked ? '【𖦠】' : '【☠︎】';
    const tagClass = m.ranked ? 'tag-ranked' : 'tag-raider';
    return `
      <div class="member-card ${m.ranked ? 'member-ranked' : ''}">
        <div class="member-card-top">
          <div class="member-tag ${tagClass}">${tag}</div>
          <div class="member-dot ${m.status === 'active' ? 'dot-active' : 'dot-inactive'}"></div>
        </div>
        <div class="member-name">${m.name}</div>
        <div class="member-role">${m.role}</div>
        ${m.desc ? `<div class="member-desc">${m.desc}</div>` : ''}
      </div>
    `;
  }).join('') : '<div class="empty-state" style="grid-column:1/-1">No members yet.</div>';
}

// ══════════════════════════════════════════
// MEMBERS — ADMIN ROSTER (with ↑ ↓ reorder)
// ══════════════════════════════════════════
async function renderAdminMembers() {
  const el = document.getElementById('a-mem-list');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const members = await fsGetAll('members');
  members.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  el.innerHTML = members.length ? members.map((m, i) => `
    <div class="admin-list-row">
      <div class="reorder-btns">
        ${i > 0
          ? `<button class="reorder-btn" onclick="moveMember('${m.id}', ${i}, -1)">↑</button>`
          : '<span class="reorder-gap"></span>'}
        ${i < members.length - 1
          ? `<button class="reorder-btn" onclick="moveMember('${m.id}', ${i}, 1)">↓</button>`
          : '<span class="reorder-gap"></span>'}
      </div>
      <span>${m.ranked ? '【𖦠】' : '【☠︎】'} ${m.name}</span>
      <small>${(m.role || '').slice(0, 18)}…</small>
      <button class="btn btn-danger" onclick="deleteMember('${m.id}')">Remove</button>
    </div>
  `).join('') : '<div class="empty-state">No members yet.</div>';
}

// Move a member up (-1) or down (+1) and save to Firestore
async function moveMember(id, index, direction) {
  const members = await fsGetAll('members');
  members.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  const swapIndex = index + direction;
  if (swapIndex < 0 || swapIndex >= members.length) return;
  const a = members[index];
  const b = members[swapIndex];
  const aOrder = a.order ?? index;
  const bOrder = b.order ?? swapIndex;
  await setDoc(doc(db, 'members', a.id), { ...a, order: bOrder });
  await setDoc(doc(db, 'members', b.id), { ...b, order: aOrder });
  await renderAdminMembers();
}

async function deleteMember(id) {
  await fsDelete('members', id);
  renderAdminMembers();
}

// ══════════════════════════════════════════
// LEADERBOARD
// ══════════════════════════════════════════
async function renderLeaderboard() {
  const el = document.getElementById('lbList');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const lb = await fsGetAll('leaderboard');
  lb.sort((a, b) => b.score - a.score);
  const posClass  = ['p1','p2','p3'];
  const rowClass  = ['rank-1','rank-2','rank-3'];
  const posSymbol = ['①','②','③'];
  el.innerHTML = lb.length ? lb.map((e, i) => `
    <div class="lb-row ${i < 3 ? rowClass[i] : ''}">
      <div class="lb-pos ${i < 3 ? posClass[i] : 'pn'}">${i < 3 ? posSymbol[i] : i + 1}</div>
      <div class="lb-name">${e.name}</div>
      <div class="lb-score-wrap">
        <span class="lb-score">${Number(e.score).toLocaleString()}</span>
        <span class="lb-score-lbl">Raids</span>
      </div>
    </div>
  `).join('') : '<div class="empty-state">No rankings yet.</div>';
}

async function renderAdminLb() {
  const el = document.getElementById('a-lb-list');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const lb = await fsGetAll('leaderboard');
  lb.sort((a, b) => b.score - a.score);
  el.innerHTML = lb.length ? lb.map(e => `
    <div class="admin-list-row">
      <span>${e.name}</span>
      <small style="color:var(--crimson)">${e.score} raids</small>
      <button class="btn btn-danger" onclick="deleteLbEntry('${e.id}')">Remove</button>
    </div>
  `).join('') : '<div class="empty-state">None yet.</div>';
}

async function deleteLbEntry(id) {
  await fsDelete('leaderboard', id);
  renderAdminLb();
}

// ══════════════════════════════════════════
// RAIDS
// ══════════════════════════════════════════
async function renderRaids() {
  const el = document.getElementById('raidsList');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const raids = await fsGetAll('raids');
  raids.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  el.innerHTML = raids.length ? raids.map(r => `
    <div class="raid-card">
      <div class="raid-dot ${r.result === 'win' ? 'raid-win' : 'raid-loss'}"></div>
      <div class="raid-info">
        <div class="raid-target">${r.target}</div>
        <div class="raid-meta">${r.date} · ${r.participants} warriors</div>
      </div>
      <div class="raid-result ${r.result === 'win' ? 'result-win' : 'result-loss'}">${r.result === 'win' ? 'VICTORY' : 'DEFEAT'}</div>
    </div>
  `).join('') : '<div class="empty-state">No raids logged yet.</div>';
}

// ══════════════════════════════════════════
// HALL OF FAME
// ══════════════════════════════════════════
async function renderHof() {
  const el = document.getElementById('hofGrid');
  if (!el) return;
  el.innerHTML = '<div class="empty-state" style="grid-column:1/-1">Loading...</div>';
  const hof = await fsGetAll('hof');
  el.innerHTML = hof.length ? hof.map(h => `
    <div class="hof-card">
      <span class="hof-crown">👑</span>
      <div class="hof-name">${h.name}</div>
      <div class="hof-title">${h.title}</div>
      <div class="hof-ach">${h.achievement}</div>
    </div>
  `).join('') : '<div class="empty-state" style="grid-column:1/-1">Hall of Fame is empty.</div>';
}

// ══════════════════════════════════════════
// APPLICATIONS
// ══════════════════════════════════════════
async function renderApplications() {
  const el = document.getElementById('a-apps-list');
  if (!el) return;
  el.innerHTML = '<div class="empty-state">Loading...</div>';
  const apps = await fsGetAll('applications');
  apps.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
  el.innerHTML = apps.length ? apps.map(a => `
    <div class="app-card">
      <div class="app-name">${a.name}</div>
      <div class="app-detail">📱 ${a.whatsapp || 'No number given'} · ${a.platform} · ${a.level} · ${a.date}</div>
      <div class="app-reason">${a.reason}</div>
      <div style="margin-top:0.75rem">
        <button class="btn btn-danger" onclick="deleteApp('${a.id}')">Dismiss</button>
      </div>
    </div>
  `).join('') : '<div class="empty-state">No applications yet.</div>';
}

async function deleteApp(id) {
  await fsDelete('applications', id);
  renderApplications();
}

// ══════════════════════════════════════════
// RENDER ALL ADMIN
// ══════════════════════════════════════════
async function renderAdminAll() {
  const stats = await fsGet('config', 'stats');
  if (stats) {
    document.getElementById('a-raiders').value = stats.raiders;
    document.getElementById('a-raids').value   = stats.raids;
    document.getElementById('a-bots').value    = stats.bots;
  }
  renderAdminAnn();
  renderAdminMembers();
  renderAdminLb();
  renderApplications();
}

// ══════════════════════════════════════════
// ADMIN ACTIONS
// ══════════════════════════════════════════
function showSuccess(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  setTimeout(() => el.classList.add('hidden'), 2500);
}

async function saveStats() {
  const raiders = parseInt(document.getElementById('a-raiders').value) || 0;
  const raids   = parseInt(document.getElementById('a-raids').value)   || 0;
  const bots    = parseInt(document.getElementById('a-bots').value)    || 0;
  await fsSet('config', 'stats', { raiders, raids, bots });
  showSuccess('stats-ok');
}

async function postAnnouncement() {
  const title = document.getElementById('a-ann-title').value.trim();
  const body  = document.getElementById('a-ann-body').value.trim();
  const badge = document.getElementById('a-ann-badge').value.trim();
  if (!title || !body) return;
  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  await fsAdd('announcements', { title, body, badge, date: now });
  document.getElementById('a-ann-title').value = '';
  document.getElementById('a-ann-body').value  = '';
  document.getElementById('a-ann-badge').value = '';
  renderAdminAnn();
  showSuccess('ann-ok');
}

async function addMember() {
  const name   = document.getElementById('a-mem-name').value.trim();
  const role   = document.getElementById('a-mem-rank').value.trim();
  const desc   = document.getElementById('a-mem-desc').value.trim();
  const status = document.getElementById('a-mem-status').value;
  const ranked = document.getElementById('a-mem-ranked').value === 'true';
  if (!name || !role) return;
  // Put new member at the end of the order
  const members  = await fsGetAll('members');
  const maxOrder = members.reduce((max, m) => Math.max(max, m.order ?? 0), 0);
  await fsAdd('members', { name, role, desc, ranked, status, order: maxOrder + 1 });
  document.getElementById('a-mem-name').value = '';
  document.getElementById('a-mem-rank').value = '';
  document.getElementById('a-mem-desc').value = '';
  await renderAdminMembers();
  showSuccess('mem-ok');
}

async function addLbEntry() {
  const name  = document.getElementById('a-lb-name').value.trim();
  const score = parseInt(document.getElementById('a-lb-score').value) || 0;
  if (!name) return;
  const lb = await fsGetAll('leaderboard');
  const existing = lb.find(e => e.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    await setDoc(doc(db, 'leaderboard', existing.id), { ...existing, score });
  } else {
    await fsAdd('leaderboard', { name, score });
  }
  document.getElementById('a-lb-name').value  = '';
  document.getElementById('a-lb-score').value = '';
  renderAdminLb();
  showSuccess('lb-ok');
}

async function logRaid() {
  const target       = document.getElementById('a-raid-target').value.trim();
  const result       = document.getElementById('a-raid-result').value;
  const date         = document.getElementById('a-raid-date').value.trim()
    || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const participants = parseInt(document.getElementById('a-raid-parts').value) || 0;
  if (!target) return;
  await fsAdd('raids', { target, result, date, participants });
  document.getElementById('a-raid-target').value = '';
  document.getElementById('a-raid-parts').value  = '';
  showSuccess('raid-ok');
}

async function addHof() {
  const name        = document.getElementById('a-hof-name').value.trim();
  const title       = document.getElementById('a-hof-title').value.trim();
  const achievement = document.getElementById('a-hof-ach').value.trim();
  if (!name || !achievement) return;
  await fsAdd('hof', { name, title, achievement });
  document.getElementById('a-hof-name').value  = '';
  document.getElementById('a-hof-title').value = '';
  document.getElementById('a-hof-ach').value   = '';
  showSuccess('hof-ok');
}

// ══════════════════════════════════════════
// ADMIN TABS
// ══════════════════════════════════════════
function switchAdminTab(name, btn) {
  document.querySelectorAll('.admin-tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.atab').forEach(b => b.classList.remove('active'));
  const target = document.getElementById('tab-' + name);
  if (target) target.classList.add('active');
  btn.classList.add('active');
  if (name === 'announce') renderAdminAnn();
  if (name === 'members')  renderAdminMembers();
  if (name === 'lboard')   renderAdminLb();
  if (name === 'apps')     renderApplications();
}

// ══════════════════════════════════════════
// JOIN APPLICATION
// ══════════════════════════════════════════
async function submitApplication() {
  const name     = document.getElementById('joinName').value.trim();
  const whatsapp = document.getElementById('joinWhatsapp').value.trim();
  const platform = document.getElementById('joinPlatform').value;
  const level    = document.getElementById('joinLevel').value;
  const reason   = document.getElementById('joinReason').value.trim();
  if (!name || !whatsapp || !reason) return;
  const now = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  await fsAdd('applications', { name, whatsapp, platform, level, reason, date: now });
  document.getElementById('joinName').value     = '';
  document.getElementById('joinWhatsapp').value = '';
  document.getElementById('joinReason').value   = '';
  document.getElementById('joinPlatform').value = '';
  document.getElementById('joinLevel').value    = '';
  const s = document.getElementById('joinSuccess');
  s.classList.remove('hidden');
  setTimeout(() => s.classList.add('hidden'), 4000);
}

// ══════════════════════════════════════════
// LOADING SCREEN
// ══════════════════════════════════════════
const loadingLines = [
  'Initializing Night Raiders Empire...',
  'Loading clan data...',
  'Connecting to battle servers...',
  'Authenticating legion protocols...',
  'Empire ready.'
];

function runLoader() {
  const textEl    = document.getElementById('loadingText');
  const barEl     = document.getElementById('loadingProgress');
  const percentEl = document.getElementById('loadingPercent');
  let step = 0;
  const totalSteps = loadingLines.length;

  function typeText(text, cb) {
    textEl.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      textEl.textContent = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(t); setTimeout(cb, 300); }
    }, 28);
  }

  function nextStep() {
    if (step >= totalSteps) {
      setTimeout(() => {
        const screen = document.getElementById('loadingScreen');
        screen.classList.add('fade-out');
        document.getElementById('app').classList.remove('hidden');
        showPage('home');
        setTimeout(() => screen.style.display = 'none', 800);
      }, 400);
      return;
    }
    const progress = Math.round(((step + 1) / totalSteps) * 100);
    barEl.style.width     = progress + '%';
    percentEl.textContent = progress + '%';
    typeText(loadingLines[step], () => { step++; setTimeout(nextStep, 200); });
  }

  nextStep();
}

// ══════════════════════════════════════════
// EXPOSE TO GLOBAL (for HTML onclick)
// ══════════════════════════════════════════
window.showPage           = showPage;
window.toggleMenu         = toggleMenu;
window.closeMenu          = closeMenu;
window.openLogin          = openLogin;
window.closeLogin         = closeLogin;
window.doLogin            = doLogin;
window.doLogout           = doLogout;
window.switchAdminTab     = switchAdminTab;
window.saveStats          = saveStats;
window.postAnnouncement   = postAnnouncement;
window.deleteAnn          = deleteAnn;
window.addMember          = addMember;
window.deleteMember       = deleteMember;
window.moveMember         = moveMember;
window.addLbEntry         = addLbEntry;
window.deleteLbEntry      = deleteLbEntry;
window.logRaid            = logRaid;
window.addHof             = addHof;
window.renderApplications = renderApplications;
window.deleteApp          = deleteApp;
window.submitApplication  = submitApplication;

// ══════════════════════════════════════════
// INIT
// ══════════════════════════════════════════
window.addEventListener('DOMContentLoaded', async () => {
  runLoader();
  await seedIfEmpty();
}); 