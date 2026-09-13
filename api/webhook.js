// /api/webhook.js - Versi Fonnte (ANTI GAGAL)
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { sender, message } = req.body; // Fonnte kirim ini
    const pesan = (message || "").toLowerCase().trim();

    let balasan = "";

    if (["halo", "hai", "hello", "menu", "bawaslu", "helpdesk"].includes(pesan)) {
      balasan = `Halo sahabat bawaslu, selamat datang di layanan whatsapp Informasi Penyelesaian Sengketa Proses Pemilu Bawaslu RI👋
Ini adalah balasan otomatis untuk ujicoba.\n\nsilakan pilih layanan yang diperlukan dengan cara menegetik *angka* sesuai kebutuhan:\n*1.* SYARAT PENDAFTARAN\n*2.* WAKTU LAYANAN\n*3.* TENGGAT WAKTU\n*4.* ALUR SENGKETA\n*5.* FORMULIR MODEL PSPP`;
    } else if (pesan === "1") {
      balasan = `*1. SYARAT PENDAFTARAN*\n\n1. Permohonan Pemohon\n2. KTP Elektronik Pemohon\n3. Objek Sengketa\n4. Alat Bukti\n5. Daftar Alat Bukti\n6. Apabila menggunakan kuasa hukum menggunakan Surat Kuasa Khusus\n7. Kartu Tanda Advokat\n8. KTP Elektronik Kuasa Hukum\n9. Berita Acara Sumpah Advokat\n\nKetik MENU untuk kembali.`;
    } else if (pesan === "2") {
      balasan = `*2. WAKTU LAYANAN*\n\nWaktu Konsultasi dan Penerimaan Permohonan di Bawaslu RI adalah Hari Senin-Kamis pukul 08.00-16.00 WIB dan Hari Jum'at pukul 08.00-16.30 WIB.\n\nKetik MENU untuk kembali.`;
    } else if (pesan === "3") {
      balasan = `*3. TENGGAT WAKTU*\n\nPengajuan permohonan sengketa proses pemilu diajukan paling lama 3 hari sejak tanggal penetapan keputusan KPU.\n\nKetik MENU untuk kembali.`;
    } else if (pesan === "4") {
      balasan = `*4. ALUR SENGKETA*\n\nAlur penyelesaian sengketa proses pemilu dimulai dari penerimaan permohonan sampai dengan putusan. Lebih lengkapnya dapat didownload pada https://bit.ly/Penyelesaian_Sengketa\n\nKetik MENU untuk kembali.`;
    } else if (pesan === "5") {
      balasan = `**5. FORMULIR MODEL PSPP*\n\n1. Formulir Model PPSP-01 - Formulir permohonan penyelesaian sengketa proses pemilu. Link dokumen : https://drive.google.com/file/d/1MU-pOeCVwj3f1qFMx139HeL2v1wpaGqU/view?usp=sharing\n2. Formulir Model PPSP-02 - Formulir surat kuasa khusus.  Link dokumen : https://drive.google.com/file/d/18BdYhNpglOxXssQJ-d7Sh6IyHpN-ch9G/view?usp=sharing\n3. Formulir Model PPSP-10 - Formulir daftar alat bukti.  Link dokumen : https://drive.google.com/file/d/16mdfxivi--KP2z-fb0BKMgnK04423xut/view?usp=sharing\n\nKetik MENU untuk kembali.`;
    } else {
      balasan = `Maaf, pilihan tidak tersedia. Ketik *MENU* untuk lihat daftar.`;
    }

    // Kirim balasan via API Fonnte
    await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": "ISI_TOKEN_FONNTE_KAMU_DISINI",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        target: sender,
        message: balasan
      })
    });

    return res.status(200).json({ status: "ok" });
  }
  return res.status(200).send("Webhook Bawaslu Ready");
}
