# UI PT Daya Rekadigital Indonesia

Ini adalah aplikasi antarmuka pengguna (UI) untuk sistem manajemen pelanggan dan pesanan menggunakan React. Aplikasi ini terhubung dengan API untuk mengelola data pelanggan, produk, dan pesanan.

## Daftar Isi

1. [Prasyarat](#prasyarat)
2. [Instalasi](#instalasi)
3. [Menjalankan Aplikasi](#menjalankan-aplikasi)
4. [Fitur](#fitur)
5. [Contributing](#contributing)
6. [Lisensi](#lisensi)

## Prasyarat

- Node.js (versi 20.x atau lebih baru)
- npm (versi 10.2 atau lebih baru)

## Instalasi

1. **Clone repositori**

    ```bash
    git clone https://github.com/AndikaRisky31/UI_Test_PT_DRI.git
    cd UI_Test_PT_DRI
    ```

2. **Instal dependensi**

    ```bash
    npm install
    ```

## Menjalankan Aplikasi

1. **Jalankan aplikasi**

    Untuk memulai aplikasi, jalankan perintah berikut:

    ```bash
    npm start
    ```

    Aplikasi akan berjalan di `http://localhost:3000` secara default.

2. **Jalankan pengujian**

    Jika Anda ingin menjalankan pengujian, jalankan perintah berikut:

    ```bash
    npm test
    ```

## Fitur

Aplikasi ini mencakup fitur-fitur berikut:

- **Menambahkan Data Customer Baru:** Menyediakan antarmuka untuk menambahkan customer baru ke dalam sistem.
- **Melihat Detail Data Customer:** Menampilkan detail lengkap dari customer, termasuk semua produk yang pernah dipesan dan total transaksi.
- **Menambah dan Mengurangi Kuantitas Produk yang Telah Dipesan:** Memungkinkan pengguna untuk menambah atau mengurangi kuantitas produk pada pesanan customer.
- **Menghapus Data Customer:** Menghapus data customer dari sistem (soft delete).
- **Mencari Customer:** Menyediakan antarmuka pencarian untuk customer berdasarkan nama dan level, dengan dukungan pagination dan sorting.

## Dokumentasi API

Dokumentasi API terkait dapat ditemukan di repositori [API PT Daya Rekadigital Indonesia](https://github.com/AndikaRisky31/api_test_PT_DRI).

## Contributing

Jika Anda ingin berkontribusi pada proyek ini, silakan fork repositori dan buat pull request dengan perubahan Anda. Ikuti panduan konvensi kode dan pastikan untuk menambahkan pengujian jika diperlukan.

## Lisensi

Proyek ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.