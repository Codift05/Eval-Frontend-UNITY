import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://vbhrbsinijxnshuutdnu.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaHJic2luaWp4bnNodXV0ZG51Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzAwMDE1MSwiZXhwIjoyMDk4NTc2MTUxfQ.0Ozp-2mB9OSlbP_Ao0gYFucqQVEr-Whhac72zOWN4DI';

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

const mockEvaluations = [
  {
    unique_code: "REACT2026",
    student_name: "Budi Santoso",
    project_name: "E-Commerce Dashboard",
    score_ui_ux: 92,
    score_responsiveness: 88,
    score_logic: 95,
    score_clean_code: 90,
    score_a11y_perf: 85,
    total_score: 90,
    tutor_feedback: "Project yang sangat solid! Struktur komponen React sangat rapi dan penggunaan Context API untuk state management sudah tepat. Desain UI elegan, namun pada resolusi mobile < 360px sedikit terpotong. Secara keseluruhan, kerja bagus!"
  },
  {
    unique_code: "VUE2026",
    student_name: "Siti Rahma",
    project_name: "Katalis Fintech App",
    score_ui_ux: 98,
    score_responsiveness: 95,
    score_logic: 92,
    score_clean_code: 94,
    score_a11y_perf: 96,
    total_score: 95,
    tutor_feedback: "Implementasi desain yang luar biasa memukau! Interaksi mikro dan animasi transisinya sangat halus. Logic fetching data sudah bagus, namun sebaiknya tambahkan error boundary untuk penanganan API fail. Sangat memuaskan!"
  },
  {
    unique_code: "SVELTE26",
    student_name: "Agus Pratama",
    project_name: "Travel Booking Platform",
    score_ui_ux: 85,
    score_responsiveness: 80,
    score_logic: 88,
    score_clean_code: 85,
    score_a11y_perf: 82,
    total_score: 84,
    tutor_feedback: "Aplikasi berfungsi dengan baik dan fiturnya lengkap. Namun, arsitektur CSS bisa lebih dirapikan (jangan terlalu banyak inline styles). Aksesibilitas perlu ditingkatkan dengan menambahkan tag alt pada semua gambar destinasi."
  }
];

async function seed() {
  console.log('Menyisipkan data awal ke tabel evaluations...');
  
  const { data, error } = await supabase
    .from('evaluations')
    .upsert(mockEvaluations, { onConflict: 'unique_code' });

  if (error) {
    console.error('Error saat seeding data:', error);
    // Jika error relation "evaluations" does not exist, beri tahu pengguna
    if (error.code === '42P01') {
      console.log('KESALAHAN: Tabel "evaluations" belum dibuat di Supabase.');
      console.log('Silakan jalankan skrip SQL di menu SQL Editor Supabase Anda terlebih dahulu sebelum menjalankan ini.');
    }
  } else {
    console.log('Seeding berhasil! Data dummy berhasil disuntikkan ke Supabase.');
  }
}

seed();
