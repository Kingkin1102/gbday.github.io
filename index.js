// ==========================================================
// KODE LENGKAP index.js DENGAN 4 SOAL TEBAK-TEBAKAN
// ==========================================================

const photos = [
    { image: 'asset/foto_baru_1.jpg', message: 'Selamat ulang tahun, Gracee! 🎉' },
    { image: 'asset/foto_ramean.jpg', message: 'Semoga semua keinginanmu di tahun ini tercapai ya!' },
    { image: 'asset/foto_candid_dia.jpg', message: 'Aku tahu kamu punya banyak mimpi besar, semoga di tahun ini kamu selangkah lebih dekat untuk meraih semuanya. I will always support you. Semangat terus!' },
    { image: 'asset/foto_candid_dia.jpg', message: 'Your are doing great this year!! Tetap jadi orang yang baik dan hebat ya. Happy birthday!' },
];

// Kumpulan soal tebak-tebakan
// Kumpulan soal tebak-tebakan dengan penjelasan
const riddles = [
    {
        question: "Benda apa yang kalau dibalik jadi rusak?",
        options: ["Gelas", "Cermin", "Kasur"],
        answer: "Kasur",
        explanation: "Benar! Karena 'kasur' kalau dibalik jadi 'rusak'. Hehe😁."
    },
    {
        question: "Apa bedanya gitar sama kamu?",
        options: ["Gitar punya senar", "Gitar bisa disetel", "Kalo gitar dipetik, kalo kamu paling cantik"],
        answer: "Kalo gitar dipetik, kalo kamu paling cantik",
        explanation: "Eaaaa... Bener kaan! hehehe."
    },
    {
        question: "Kenapa air laut rasanya asin?",
        options: ["Karena ikannya keringetan", "Karena mengandung garam", "Karena lautnya nangis"],
        answer: "Karena ikannya keringetan",
        explanation: "Tepat! Capek kan berenang terus, jadi keringetan deh ikannya."
    },
    {
        question: "Apa bedanya kamu sama jam 12:00?",
        options: ["Ga ada bedanya", "Jam 12:00 kesiangan, kamu kesayangan", "Kamu lebih berisik"],
        answer: "Jam 12:00 kesiangan, kamu kesayangan",
        explanation: "Asiik, bener! Eaaaaak~"
    }
];

let currentPhotoIndex = 0;
let currentRiddleIndex = 0;
let feedbackTimeout;

// Ambil semua elemen halaman
const firstPage = document.getElementById('firstPage');
const riddlePage = document.getElementById('riddlePage');
const secondPage = document.getElementById('secondPage');
const invitationPage = document.getElementById('invitationPage');
const finalMessagePage = document.getElementById('finalMessagePage');
const noBtn = document.getElementById('noBtn');
const replayBtn = document.getElementById('replayBtn');

// Ambil elemen untuk tebak-tebakan
const riddleQuestionEl = document.getElementById('riddle-question');
const riddleOptionsEl = document.getElementById('riddle-options');
const riddleFeedbackEl = document.getElementById('riddle-feedback');
const riddleCounterEl = document.getElementById('riddle-counter');


// --- FUNGSI UNTUK PERPINDAHAN HALAMAN ---

function showRiddlePage() {
    firstPage.classList.add('hidden');
    setTimeout(() => {
        firstPage.style.display = 'none';
        riddlePage.style.display = 'flex';
        riddlePage.classList.remove('hidden');
        displayRiddle(); // Tampilkan soal pertama
    }, 500);
}

function showGalleryPage() {
    riddlePage.classList.add('hidden');
    setTimeout(() => {
        riddlePage.style.display = 'none';
        secondPage.style.display = 'flex';
        secondPage.classList.remove('hidden');
        updateSlide();
    }, 500);
}

function showInvitationPage() {
    secondPage.classList.add('hidden');
    setTimeout(() => {
        secondPage.style.display = 'none';
        invitationPage.style.display = 'flex';
        invitationPage.classList.remove('hidden');
    }, 500);
}

function showFinalMessage() {
    invitationPage.classList.add('hidden');
    setTimeout(() => {
        invitationPage.style.display = 'none';
        finalMessagePage.style.display = 'flex';
        finalMessagePage.classList.remove('hidden');
    }, 500);
}


// --- LOGIKA HALAMAN TEBAKAN (BARU) ---

function displayRiddle() {
    // Bersihkan pilihan sebelumnya
    riddleOptionsEl.innerHTML = '';
    riddleFeedbackEl.textContent = '';
    
    // Ambil data soal saat ini
    const currentRiddle = riddles[currentRiddleIndex];
    
    // Tampilkan pertanyaan dan counter
    riddleQuestionEl.innerHTML = currentRiddle.question;
    riddleCounterEl.textContent = `Soal ${currentRiddleIndex + 1} dari ${riddles.length}`;
    
    // Buat tombol pilihan jawaban
    currentRiddle.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('riddle-option');
        button.onclick = () => checkAnswer(option === currentRiddle.answer, button);
        riddleOptionsEl.appendChild(button);
    });
}

function checkAnswer(isCorrect, element) {
    // 1. Hentikan timer sebelumnya yang mungkin masih berjalan
    clearTimeout(feedbackTimeout); 

    if (isCorrect) {
        const currentRiddle = riddles[currentRiddleIndex];
        riddleFeedbackEl.textContent = currentRiddle.explanation || "Hahaha bener!";
        riddleFeedbackEl.style.color = 'green';
        
        document.querySelectorAll('.riddle-option').forEach(btn => btn.disabled = true);
        
        setTimeout(() => {
            currentRiddleIndex++;
            if (currentRiddleIndex < riddles.length) {
                displayRiddle();
            } else {
                showGalleryPage();
            }
        }, 2500);

    } else {
        riddleFeedbackEl.textContent = "Salahh, coba lagi doong!";
        riddleFeedbackEl.style.color = 'red';
        element.style.borderColor = 'red';

        // 2. Simpan ID timer yang baru ke dalam variabel
        feedbackTimeout = setTimeout(() => { 
            riddleFeedbackEl.textContent = "";
            element.style.borderColor = '#ffe6e6';
        }, 1500);
    }
}


// --- LOGIKA GALERI FOTO ---
function updateSlide() {
    const photoFrame = document.getElementById('photo');
    const message = document.getElementById('message');
    photoFrame.innerHTML = `<img src="${photos[currentPhotoIndex].image}" alt="photo" style="width:100%; height:100%; object-fit: cover; border-radius: 4px;" />`;
    message.innerText = photos[currentPhotoIndex].message;
}

function nextSlide() {
    if (currentPhotoIndex === photos.length - 1) {
        showInvitationPage();
    } else {
        currentPhotoIndex++;
        updateSlide();
    }
}


// --- FUNGSI UNTUK TOMBOL REPLAY ---
function replay() {
    finalMessagePage.classList.add('hidden');
    
    setTimeout(() => {
        riddlePage.style.display = 'none';
        riddlePage.classList.add('hidden');
        secondPage.style.display = 'none';
        secondPage.classList.add('hidden');
        invitationPage.style.display = 'none';
        invitationPage.classList.add('hidden');
        finalMessagePage.style.display = 'none';

        // Reset semua index ke awal
        currentPhotoIndex = 0;
        currentRiddleIndex = 0;

        firstPage.style.display = 'flex';
        firstPage.classList.remove('hidden');
    }, 500);
}


// --- EVENT LISTENERS (BAGIAN PALING PENTING) ---

// 1. Logika untuk memindahkan tombol
const moveButton = () => {
    const container = invitationPage.getBoundingClientRect();
    const btn = noBtn.getBoundingClientRect();
    
    let newTop = Math.random() * (container.height - btn.height);
    let newLeft = Math.random() * (container.width - btn.width);

    noBtn.style.position = 'absolute';
    noBtn.style.top = `${newTop}px`;
    noBtn.style.left = `${newLeft}px`;
};

// 2. Fungsi untuk mendeteksi perangkat layar sentuh
const isTouchDevice = () => {
    return ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
};

// 3. Logika utama: pasang event listener sesuai jenis perangkat
if (isTouchDevice()) {
    // Untuk HP/Tablet: lari saat disentuh
    noBtn.addEventListener('click', moveButton);
} else {
    // Untuk Laptop/PC: lari saat di-hover
    noBtn.addEventListener('mouseover', moveButton);
}

replayBtn.addEventListener('click', replay);