# soalku-back-end

soalku-back-end adalah penyedia REST API dan juga server untuk SoalKU. Ini dibuat dengan teknologi NodeJS, Express dan MongoDB.



## Pengembangan

Pastikan anda sudah menginstal NodeJS dan MongoDB. Pastikan anda sudah menginstal semua dependensi yang diperlukan dengan perintah berikut

```
yarn install
```

Lalu buat konfigurasi dengan membuat file bernama `.env` dan isikan dengan teks berikut

```
SERVER_PORT={{ Port yang digunakan }}
SERVER_CORS_ORIGIN={{ Lokasi Server Vue}}
DB_URI={{ URI database MongoDB }}
SESSION_SECRET={{ Kata ngawur untuk enkripsi }}
```

Untuk memulai server jalankan perintah berikut:

```
yarn serve
```
