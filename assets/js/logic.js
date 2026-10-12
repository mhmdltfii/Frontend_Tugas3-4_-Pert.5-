
// 1. Dataset Mock Produk UMKM
const productDataset = [
    { id: 1, name: "Keripik Pisang", category: "Makanan", price: 15000, stock: 20 },
    { id: 2, name: "Kopi Banyuwangi", category: "Minuman", price: 25000, stock: 15 },
    { id: 3, name: "Batik Banyuwangi", category: "Fashion", price: 150000, stock: 8 },
    { id: 4, name: "Kue Bagiak", category: "Makanan", price: 20000, stock: 25 },
    { id: 5, name: "Teh Herbal", category: "Minuman", price: 18000, stock: 12 },
    { id: 6, name: "Tas Anyaman", category: "Fashion", price: 85000, stock: 10 },
    { id: 7, name: "Sambal Pecel", category: "Makanan", price: 12000, stock: 30 },
    { id: 8, name: "Madu Asli", category: "Minuman", price: 45000, stock: 7 }
];

// 2. Fungsi Pengolahan Data Menggunakan ES6
function processProductData(products, filterCategory) {
    console.log(`=== Menjalankan Filter Kategori: ${filterCategory} ===`);

    let totalStockValue = 0;
    let matchCount = 0;

    for (const product of products) {
        if (product.category === filterCategory) {
            matchCount++;
            totalStockValue += product.price * product.stock;

            console.log(
                `[ID: ${product.id}] ${product.name} - Harga: Rp${product.price} - Stok: ${product.stock}`
            );
        }
    }

    return {
        category: filterCategory,
        totalProducts: matchCount,
        totalStockValue: totalStockValue
    };
}

// 3. Eksekusi Fungsi Awal
const result = processProductData(productDataset, "Makanan");

console.log("Hasil Rekapitulasi:", result);
console.log(`Total Produk: ${result.totalProducts}`);
console.log(`Total Nilai Stok: Rp${result.totalStockValue}`);


// 4. Mengambil Elemen Form HTML
const form = document.getElementById("formProduk");
const nama = document.getElementById("nama");
const harga = document.getElementById("harga");
const kategori = document.getElementById("kategori");
const stok = document.getElementById("stok");

const previewNama = document.getElementById("previewNama");
const previewHarga = document.getElementById("previewHarga");
const previewKategori = document.getElementById("previewKategori");
const previewStok = document.getElementById("previewStok");

const feedback = document.getElementById("feedback");
const daftarProduk = document.getElementById("daftarProduk");


// 5. Fungsi Menampilkan Produk
function tampilkanProduk(products) {
    daftarProduk.innerHTML = "";

    if (products.length === 0) {
        daftarProduk.innerHTML =
            '<p class="kosong">Belum ada produk yang ditambahkan.</p>';
        return;
    }

    for (const product of products) {
        const item = document.createElement("div");
        item.className = "produk";

        const judul = document.createElement("h3");
        judul.textContent = product.name;

        const teksHarga = document.createElement("p");
        teksHarga.textContent =
            "Harga: Rp" + product.price.toLocaleString("id-ID");

        const teksKategori = document.createElement("p");
        teksKategori.textContent = "Kategori: " + product.category;

        const teksStok = document.createElement("p");
        teksStok.textContent = "Stok: " + product.stock;

        item.append(judul, teksHarga, teksKategori, teksStok);
        daftarProduk.appendChild(item);
    }
}

// Menampilkan 8 produk awal
tampilkanProduk(productDataset);


// 6. Fungsi Live Preview
function updatePreview() {
    previewNama.textContent = nama.value.trim() || "-";

    const nilaiHarga = Number(harga.value);

    previewHarga.textContent =
        harga.value !== "" && nilaiHarga > 0
            ? "Rp" + nilaiHarga.toLocaleString("id-ID")
            : "Rp0";

    previewKategori.textContent = kategori.value || "-";
    previewStok.textContent = stok.value || "0";
}

// Event input dan change
form.addEventListener("input", updatePreview);
form.addEventListener("change", updatePreview);


// 7. Fungsi Feedback Visual
function tampilkanFeedback(pesan, jenis) {
    feedback.textContent = pesan;
    feedback.className = "feedback " + jenis;
}


// 8. Event Submit untuk Menambah Produk
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const namaProduk = nama.value.trim();
    const hargaProduk = Number(harga.value);
    const kategoriProduk = kategori.value;
    const stokProduk = Number(stok.value);

    // Validasi Nama dan Harga Produk
    const namaValid = /^[a-zA-ZÀ-ÿ\s]+$/.test(namaProduk);

    const hargaValid =
        harga.value !== "" &&
        Number.isFinite(hargaProduk) &&
        hargaProduk > 0;

    if (!namaValid || !hargaValid) {
        tampilkanFeedback(
            "Gagal! Nama atau harga produk tidak valid. Periksa kembali input Anda.",
            "gagal"
        );
        return;
    }

    // Validasi Kategori dan Stok
    if (
        kategoriProduk === "" ||
        stok.value === "" ||
        !Number.isInteger(stokProduk) ||
        stokProduk < 0
    ) {
        tampilkanFeedback(
            "Gagal! Periksa kembali kategori dan stok produk.",
            "gagal"
        );
        return;
    }

    // Membuat Objek Produk Baru
    const produkBaru = {
        id: productDataset.length > 0
            ? Math.max(...productDataset.map(product => product.id)) + 1
            : 1,
        name: namaProduk,
        category: kategoriProduk,
        price: hargaProduk,
        stock: stokProduk
    };

    // Menambahkan Produk ke Dataset
    productDataset.push(produkBaru);

    // Memperbarui Daftar Produk
    tampilkanProduk(productDataset);

    // Menampilkan Feedback Sukses
    tampilkanFeedback(
        "Berhasil! Produk " + namaProduk + " berhasil ditambahkan.",
        "sukses"
    );

    // Reset Form dan Preview
    form.reset();
    updatePreview();

    console.log("Produk berhasil ditambahkan:", produkBaru);
});