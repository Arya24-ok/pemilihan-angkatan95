document.getElementById('voteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  // Mencari kandidat yang dipilih
  const selected = document.querySelector('input[name=kandidat]:checked');
  
  if (!selected) {
    document.getElementById('message').textContent = 'Silakan pilih salah satu kandidat!';
    return;
  }

  const kandidat = selected.value;
  const waktu = new Date().toISOString();
  const data = {
    kandidat: kandidat,
    waktu: waktu
  };

  // Simpan ke localStorage
  let hasil = JSON.parse(localStorage.getItem('hasilPemilihan') || '[]');
  hasil.push(data);
  localStorage.setItem('hasilPemilihan', JSON.stringify(hasil));

  // Menampilkan pesan terima kasih
  document.getElementById('message').textContent = `Terima kasih, Anda memilih ${kandidat}.`;
  document.getElementById('voteForm').reset();
  
  // Mengirim hasil ke server menggunakan fetch
  submitVote(kandidat);
});

function submitVote(nama) {
  fetch('https://script.google.com/macros/s/AKfycbyS5pnFkTEnxbvsth0QDCReI7fNkfIT4lIUyPzAj1h08AEs43qNE-8-OvUj5AsJC7GT/exec', {
    method: 'POST',
    body: JSON.stringify({ nama }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => {
    if (res.ok) {
      alert("Pilihan Anda sudah direkam. Terima kasih!");
    } else {
      alert("Terjadi kesalahan saat mengirim data.");
    }
  })
  .catch(error => {
    alert("Terjadi kesalahan saat mengirim data: " + error);
  });
}
