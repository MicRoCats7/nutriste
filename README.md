NutriSte adalah aplikasi manajemen nutrisi yang membantu pengguna untuk melacak asupan makanan, menghitung kebutuhan kalori harian, dan memberikan rekomendasi makanan sehat.

Fitur Utama
📊 Pelacakan asupan nutrisi harian

🍎 Database makanan dengan informasi nutrisi

🏋️‍♂️ Kalkulator kebutuhan kalori berdasarkan profil pengguna

📈 Visualisasi data nutrisi dalam bentuk grafik

🔔 Pengingat untuk makan dan minum air

� Rekomendasi makanan berdasarkan tujuan kesehatan

Instalasi
Prasyarat
Node.js (v14 atau lebih baru)

npm atau yarn

Expo CLI (untuk pengembangan mobile)

Langkah-langkah Instalasi
1. Clone repositori ini:
```bash
git clone https://github.com/MicRoCats7/nutriste.git
cd nutriste
```

2. Install dependencies:
```bash
npm install
# atau
yarn install
```

3. Setup environment variables:
Buat file .env di root folder dan isi dengan variabel yang diperlukan (lihat .env.example untuk referensi)

Jalankan aplikasi:
```bash
npm start
# atau
yarn start
```

Penggunaan
Untuk Pengguna
Buat akun baru atau login dengan akun yang sudah ada

Isi profil kesehatan Anda (usia, berat badan, tinggi badan, aktivitas fisik, dll.)

Mulai mencatat makanan yang dikonsumsi

Pantau progress nutrisi Anda di dashboard

Untuk Pengembang
Struktur direktori:
```bash
/src
  /components - Komponen UI yang dapat digunakan kembali
  /screens - Halaman aplikasi
  /services - Logika bisnis dan API calls
  /assets - Gambar, font, dan aset lainnya
  /utils - Fungsi utilitas dan helpers
```

Script yang tersedia:

npm start: Menjalankan aplikasi di mode development

npm test: Menjalankan test suite

npm run lint: Menjalankan linter

npm run build: Membuild aplikasi untuk production
