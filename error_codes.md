# Error Code

## Pemberian Error Code

Pemberian Error code harus dilakukan dengan ketentuan berikut.

Bagian pertama meruapakan angka 1 digit yang mewakili dimana error terjadi. Angka yang digunakan sebagai berikut

1. Untuk di internal / tidak diketahui
2. Untuk di layanan soal
3. Untuk di layanan user
4. Untuk di layanan permainan

Bagian kedua merupakan angka 2 digit yang mewakili urutan error tersebut ditemukan. Jika angka tersebut hanya memiliki satu digit maka depannya ditambahkan angka 0.

## Penulisan Error

Setiap error harus di tuliskan di file ini dan `error.js`. Error yang ditulis di `error.js` harus di dideklarasikan sebagai berikut

```js
exports.E = {
  E|ERROR_CODE|_|ERROR_NAME| = [|ERROR_CODE|, '|ERROR_MSG|']
}
```

## Error

| Code | Lokasi Terjadi    | Nama                     | Message                 |
| ---- | ----------------- | ------------------------ | ----------------------- |
| 201  | Layanan Soal      | SOAL PAKET NOT FOUND     | Paket not found         |
| 202  | Layanan Soal      | SOAL NOT FOUND           | Soal not found          |
| 301  | Layanan User      | USER ALREADY REGISTERED  | User already registered |
| 302  | Layanan User      | USER NOT REGISTERED      | User not registered     |
| 303  | Layanan User      | USER LOGGED IN           | User Logged in          |
| 304  | Layanan User      | USER NOT LOGGED IN       | User not logged in      |
| 305  | Layanan User      | USER PASSWORD NOT MATCH  | Password not match      |
| 401  | Layanan Permainan | PERMAINAN NOT STARTED    | Permainan not started   |
| 402  | Layanan Permainan | PERMAINAN NOT FINISHED   | Permainan not finished  |
| 403  | Layanan Permainan | PERMAINAN SOAL NOT FOUND | Soal not found          |
