const fs = require('fs');
let t = fs.readFileSync('index.html', 'utf8');
if (t.indexOf('href="app/"') >= 0) { console.log('انطبق من قبل'); process.exit(0); }
const miss = [];
const css = `  .ghost { background:transparent; color:var(--gold); border:2px solid var(--gold); box-shadow:none; font-size:17px; padding:12px 26px; margin-top:16px; }
</style>`;
if (t.indexOf('</style>') < 0) miss.push('style'); else t = t.replace('</style>', () => css);
const a = '<p class="small">ملف APK مباشر، مجاني، بدون تسجيل</p>';
if (t.indexOf(a) < 0) miss.push('hero'); else t = t.replace(a, () => a + '\n    <br><a class="btn ghost" href="app/">فتح النسخة الويب (آيفون وغيره)</a>');
const sec = `<section>
  <h2>للآيفون</h2>
  <div class="steps">
    <div class="step">افتح هذا الموقع من متصفح Safari، ثم اضغط «فتح النسخة الويب».</div>
    <div class="step">اضغط زر المشاركة في الأسفل، ثم اختر «إضافة إلى الشاشة الرئيسية».</div>
    <div class="step">افتح «ديوان العرب» من الشاشة الرئيسية، وتشتغل مثل أي تطبيق.</div>
  </div>
</section>

<footer>`;
if (t.indexOf('<footer>') < 0) miss.push('footer'); else t = t.replace('<footer>', () => sec);
if (miss.length) { console.log('ما انطبق:', miss.join(' | ')); process.exit(1); }
fs.writeFileSync('index.html', t);
console.log('تم');
