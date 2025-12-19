// Random motivasi
const quotes = [
  "Jangan takut gagal, takutlah jika tidak pernah mencoba.",
  "Kesuksesan datang kepada mereka yang tidak menyerah.",
  "Kamu tidak perlu sempurna untuk bisa mulai.",
  "Langkah kecil hari ini adalah awal dari perubahan besar.",
  "Belajar bukan tentang cepat, tapi tentang konsisten.",  
];

document.getElementById("motivateBtn").addEventListener("click", function() {
  const random = Math.floor(Math.random() * quotes.length);
  const text = document.getElementById("quoteText");
  text.textContent = "“" + quotes[random] + "”";
  text.classList.add("animate");
  setTimeout(() => text.classList.remove("animate"), 800);
});

// Animasi fade-in saat scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});
document.querySelectorAll(".fade-in").forEach(el => observer.observe(el));

// Ubah header saat scroll
window.addEventListener("scroll", function() {
  const header = document.querySelector("header");
  if (window.scrollY > 100) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
});
// === Tes Gaya Belajar ===
const buttons = document.querySelectorAll(".option");
const resultBox = document.getElementById("quizResult");
const checkResultBtn = document.getElementById("checkResult");

let answers = { visual: 0, auditori: 0, kinestetik: 0 };

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const type = btn.getAttribute("data-type");
    answers[type]++;
    btn.style.background = "#00c853"; // warna hijau ketika diklik
  });
});

checkResultBtn.addEventListener("click", () => {
  const highest = Object.keys(answers).reduce((a, b) => answers[a] > answers[b] ? a : b);

  let resultText = "";
  if (highest === "visual") {
    resultText = "👀 Kamu tipe Visual — lebih mudah belajar dengan melihat gambar, warna, dan catatan!";
  } else if (highest === "auditori") {
    resultText = "🎧 Kamu tipe Auditori — lebih paham lewat penjelasan dan mendengarkan!";
  } else {
    resultText = "🤸 Kamu tipe Kinestetik — paling paham kalau langsung praktek!";
  }

  resultBox.textContent = resultText;
});

// === Jadwal Belajar (Simpan ke localStorage) ===
const saveBtn = document.getElementById("saveSchedule");
const saveMsg = document.getElementById("saveMessage");
const table = document.getElementById("scheduleTable");

saveBtn.addEventListener("click", () => {
  const rows = Array.from(table.querySelectorAll("tbody tr")).map(row => {
    const cells = row.querySelectorAll("td");
    return {
      hari: cells[0].textContent,
      pelajaran: cells[1].textContent,
      waktu: cells[2].textContent,
      catatan: cells[3].textContent
    };
  });
  localStorage.setItem("jadwalBelajar", JSON.stringify(rows));
  saveMsg.textContent = "✅ Jadwal berhasil disimpan!";
  setTimeout(() => (saveMsg.textContent = ""), 2000);
});

// Muat ulang jadwal dari localStorage
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("jadwalBelajar"));
  if (saved) {
    const rows = table.querySelectorAll("tbody tr");
    saved.forEach((data, i) => {
      const cells = rows[i].querySelectorAll("td");
      cells[1].textContent = data.pelajaran;
      cells[2].textContent = data.waktu;
      cells[3].textContent = data.catatan;
    });
  }
});
// Ambil semua link di nav
const navLinks = document.querySelectorAll("nav a");

// Tambahkan event listener untuk klik
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Hapus class active di semua link
    navLinks.forEach(l => l.classList.remove("active"));
    // Tambahkan active di link yang diklik
    link.classList.add("active");
  });
});
// ===== HAMBURGER MENU =====
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Tutup menu setelah klik link (biar rapi)
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
