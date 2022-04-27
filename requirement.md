# Todo App Integration Testing

## App requirement (26 April 2022)

- Login user
  - Respon sukses memberikan token
  - Password salah memberikan error
  - Email salah memberikan error
- Menambahkan data todo per user
  - Respon sukses
    - Terdapat header authorization
    - name, schedule, dan completed diisi
    - Schedule lebih besar sama dengan hari ini
  - Respon 401 (no auth)
    - Tidak terdapat header authorization
    - name, schedule, dan completed diisi
  - Respon 401 (authorization token invalid)
    - Terdapat header authorization
    - name, schedule, dan completed diisi
    - Header authorization invalid
  - Respon 400 (required field violation)
    - Terdapat header authorization
    - name/schedule/completed tidak terisi
  - Respon 400 (schedule less than today)
    - Terdapat header authorization
    - Name, schedule, dan completed terisi
    - Schedule lebih kecil dari hari ini
- List todo per user
  - Respon sukses
    - Terdapat header authorization
    - Menampilkan nama dan completed
  - Respon 401 (no auth)
    - Header authorization tidak ada
  - Respon 401 (invalid token)
    - Header authorization ada, tapi invalid
