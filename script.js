document.getElementById('voteForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const selected = document.querySelector('input[name="kandidat"]:checked');
  
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

  // Simpan ke localStorage untuk saat ini
  let hasil = JSON.parse(localStorage.getItem('hasilPemilihan') || '[]');
  hasil.push(data);
  localStorage.setItem('hasilPemilihan', JSON.stringify(hasil));

  document.getElementById('message').textContent = `Terima kasih, Anda memilih ${kandidat}.`;
  document.getElementById('voteForm').reset();
});
