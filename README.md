# Portfolio & CV — Patrick Raymond Andreas

Website portfolio statis (tanpa framework, tanpa build step) untuk melengkapi
pendaftaran **Apple Developer Academy Indonesia**, beserta dua PDF submission
yang penamaannya sudah mengikuti panduan Academy.

---

## Isi folder

```
index.html                     halaman utama
css/style.css                  desain & layout
css/fonts.css                  @font-face (font di-host sendiri, bukan CDN)
js/content.js       <-- SEMUA TEKS ADA DI SINI (EN + ID)
js/main.js                     render, pergantian bahasa, interaksi
js/hero-photo.js                animasi foto di panggung hero
assets/portrait.png             foto profil (latar sudah dihapus)
assets/fonts/                  Chakra Petch · JetBrains Mono · Inter (subset latin)
assets/PatrickRaymondAndreas_CV_Academy.pdf
assets/PatrickRaymondAndreas_Portfolio_Academy.pdf
pdf-source/                    sumber kedua PDF + script pembuatnya
```

Situs ini **tidak memanggil satu pun server luar** — font dan semua
aset ada di dalam repo. Jadi tidak ada yang rusak kalau CDN mati.

---

## 1. Deploy ke GitHub Pages

1. Buat repository baru di GitHub dengan nama **`patrickrayy.github.io`**
   (persis seperti username Anda + `.github.io`).
2. Upload seluruh isi folder ini ke root repository — `index.html` harus berada
   di paling atas, bukan di dalam subfolder.

   Lewat terminal:

   ```bash
   git init
   git add .
   git commit -m "Portfolio & CV"
   git branch -M main
   git remote add origin https://github.com/patrickrayy/patrickrayy.github.io.git
   git push -u origin main
   ```

   Atau lewat web: **Add file → Upload files**, seret semua isi folder, Commit.

3. Buka **Settings → Pages**. Di *Build and deployment*, pilih
   **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, Save.
4. Tunggu 1–2 menit. Situs akan hidup di **https://patrickrayy.github.io**

> Kalau Anda memakai nama repository lain (misal `portfolio`), URL-nya menjadi
> `https://patrickrayy.github.io/portfolio/`. Situs tetap berjalan — semua path
> di dalamnya relatif. Yang perlu diubah hanya URL di CV
> (`pdf-source/cv.html`, cari `patrickrayy.github.io`).

---

## 2. Mengedit isi

Hampir semua yang perlu Anda ubah ada di satu file: **`js/content.js`**.

Setiap teks ditulis berpasangan:

```js
title: {
  en: "Field Operations App for an LPG Distributor",
  id: "Aplikasi Operasional Lapangan untuk Distributor Elpiji"
}
```

Ubah keduanya supaya tombol EN/ID tetap sinkron.

### Yang wajib Anda isi

Cari **`TBD`** di `js/content.js`. Setiap tanda `[TBD: ...]` adalah angka atau
hasil terukur yang hanya Anda yang tahu — misalnya akurasi model skripsi, jumlah
supir yang memakai aplikasi, atau jumlah anak yang hadir di kelas cyberbullying.
Reviewer Academy secara eksplisit menilai **dampak**, jadi angka nyata jauh lebih
kuat daripada kalimat umum. Ganti seluruh tanda kurung siku itu — jangan sampai
tersisa di PDF yang Anda kirim.

### Menambah gambar proyek

1. Simpan gambar di `assets/projects/` (buat foldernya kalau belum ada).
2. Isi array `images` pada proyek terkait:

```js
images: [
  { src: "assets/projects/p02-attendance.png",
    caption: { en: "Attendance screen", id: "Layar absensi" } },
  { src: "assets/projects/p02-tracking.png",
    caption: { en: "Live driver map", id: "Peta supir langsung" } }
],
```

Selama `images` masih `[]`, website dan PDF akan menampilkan kotak placeholder
bergaris putus-putus — itu penanda supaya Anda tidak lupa.

### Menambah tautan

```js
links: [
  { label: "Repository", url: "https://github.com/patrickrayy/nama-repo" },
  { label: "Demo",       url: "https://..." }
],
```

---

## 3. Membuat ulang PDF

Kedua PDF dibuat dari HTML di `pdf-source/`, jadi tampilannya konsisten dengan
website. Portfolio PDF **dibangkitkan otomatis dari `js/content.js`** — begitu
Anda memperbarui konten, jalankan ulang script ini dan PDF ikut terbarui.

```bash
npm install playwright        # sekali saja
npx playwright install chromium

python3 -m http.server 8899   # terminal 1, dari folder repo
node pdf-source/build-pdf.js  # terminal 2
```

Hasilnya menimpa dua file di `assets/` dengan nama yang sudah sesuai panduan:

| File | Isi | Batas panduan |
|---|---|---|
| `PatrickRaymondAndreas_CV_Academy.pdf` | CV | maks. 2 halaman ✓ |
| `PatrickRaymondAndreas_Portfolio_Academy.pdf` | Sampul + 5 proyek | maks. 5 proyek ✓ |

CV diedit langsung di `pdf-source/cv.html` (bukan dari `content.js`), karena
susunannya harus dijaga ketat agar tetap muat 2 halaman. Setelah mengedit,
**cek jumlah halamannya** — kalau menjadi 3, kurangi teks atau turunkan
`font-size` di blok `<style>` file tersebut.

---

## 4. Catatan teknis

- **Bahasa** — pilihan EN/ID disimpan di `localStorage`, jadi bertahan saat
  pengunjung kembali. Konten proyek ditulis dalam bahasa Inggris lebih dulu
  karena panduan Academy memintanya demikian.
- **Foto hero** — `assets/portrait.png` (latar sudah dihapus), diberi efek
  duotone lewat CSS `filter` dan dianimasikan oleh `js/hero-photo.js`
  (miring mengikuti pointer, melayang pelan, mengecil sedikit saat digulir).
  Otomatis berhenti saat tab tidak terlihat atau panggung keluar layar.
- **Saklar gerak** — tombol di pojok kanan bawah panggung hero. Kalau perangkat
  pengunjung mengaktifkan *Reduce Motion* (Pengaturan → Aksesibilitas), situs
  dimulai dalam keadaan **diam** dan tombolnya menyala oranye bertuliskan
  "PLAY MOTION"; sekali ditekan, semuanya hidup. Pilihan itu disimpan di
  `localStorage`, jadi bertahan saat halaman dibuka lagi. Statusnya ada di
  atribut `data-motion` pada `<html>` — semua CSS animasi mengikutinya, bukan
  mengikuti media query secara langsung.
- **Aksesibilitas** — navigasi keyboard, `aria-expanded` pada akordeon proyek,
  fokus terlihat, dan seluruh isi tetap terbaca tanpa animasi.
- **Ukuran** — jauh lebih ringan sejak Three.js dihapus; sekarang mayoritas
  ukuran berasal dari font yang di-host sendiri.

---

## 5. Checklist sebelum submit

- [ ] Semua `[TBD: ...]` di `js/content.js` sudah diganti angka/hasil nyata
- [ ] Gambar proyek sudah dimasukkan (minimal untuk 2–3 proyek terkuat)
- [ ] Tautan repository/demo sudah diisi untuk proyek yang punya
- [ ] `node pdf-source/build-pdf.js` sudah dijalankan ulang setelah semua edit
- [ ] CV masih **2 halaman**, Portfolio masih **5 proyek**
- [ ] Kedua PDF dibuka sekali dan dibaca ulang dari awal
- [ ] Situs sudah hidup dan dicoba dari HP, bukan hanya laptop
