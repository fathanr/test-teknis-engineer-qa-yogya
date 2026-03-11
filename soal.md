# TECHNICAL TEST FOR AUTOMATION TEST ENGINEER

**Berijalan Techno Center**

---

# RULE OF THE GAME

Here's what you'll need to know before you do the tasks:

1. We expect you to be the best Tester, seeking for the best Application Quality.
2. In the next slide, we will give you 2 API's and link website, you need to create the test case as comprehensive as possible.
3. You must use **Cypress** as testing tool.
4. Please submit your project to email:  
   **mutiaraceasagusta@berijalan.co.id**  
   with subject:  
   **TEST*AUTOMATION*[your name]**

---

# 01 — GET EMPLOYEE

**Request**

```
http://dummy.restapiexample.com/api/v1/employees
```

**Response:** `200`

### Example Response

```json
{
  "status": "success",
  "data": [
    {
      "id": "1",
      "employee_name": "Tiger Nixon",
      "employee_salary": "320800",
      "employee_age": "61",
      "profile_image": ""
    },
    {
      "id": "2",
      "employee_name": "Garrett Winters",
      "employee_salary": "170750",
      "employee_age": "63",
      "profile_image": ""
    }
  ]
}
```

### Special Hints

- Gunakan file **Excel (terlampir)** sebagai data kontrol.
- Cek apakah **lembaran response sesuai dengan data kontrol yang ada**.

**Note:** Lampirkan **summary report**.

---

# 02 — POST EMPLOYEE

**Request**

```
https://fakestoreapi.com/products
```

**Response:** `201`

### Body

```json
{
  "id": 0,
  "title": "string",
  "price": 0,
  "description": "string",
  "category": "string",
  "image": "http://example.com"
}
```

### Special Hints

Gunakan data input **positive testing dan negative testing** dengan menggunakan **Excel**.

**Note:** Lampirkan **summary report**.

---

# 03 — CREATE TEST CASE CYPRESS

**Link**

```
https://demo.opencart.com/
```

---

## SOAL 1 — Navigasi & Validasi URL

Tulis skrip Cypress untuk:

1. Membuka homepage.
2. Melakukan **create account**.
3. Memastikan URL mengandung `/register`.
4. Memastikan ada minimal **4 akun yang terbentuk**.

---

## SOAL 2 — Add to Cart & Verifikasi Quantity

Tulis skrip Cypress untuk:

1. Memilih produk dengan memfilter **Price range $12.00 sampai $19.00** dan **Color Yellow**.
2. Melihat salah satu produk.
3. Menambahkan produk ke keranjang dengan **Quantity 4**.
4. Memverifikasi jumlah produk di **cart badge adalah 4**.

---

## SOAL 3 — Mobile Viewport Test

Tulis skrip Cypress untuk:

1. Mengubah viewport ke **iPhone X**.
2. Membuka homepage.
3. Memastikan **tombol menu burger muncul**.

---

## SOAL 4 — Checkout Flow

Tulis skrip Cypress untuk:

1. Menambahkan produk ke keranjang.
2. Mengisi form checkout dengan **data dummy**.
3. Melanjutkan sampai halaman **Payment**.
4. Memastikan URL mengandung `/checkout/payment`.

**Note:** Lampirkan **summary report**.

---

# THANK YOU
