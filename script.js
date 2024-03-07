function initMap() {
    let map = L.map('map').setView([-6.55768, 107.78491], 17);
    let markers = []; // Array untuk menyimpan marker
    let flashingIntervals = []; // Array untuk menyimpan interval berkedip untuk setiap pin
    let fireButton1Clicked = false; // Status tombol kebakaran 1
    let fireButton2Clicked = false; // Status tombol kebakaran 2
    let fireButton3Clicked = false; // Status tombol kebakaran 3

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Menambahkan pin saat load halaman
    addMarker([-6.55768, 107.78491], "Lokasi 1", "blue", "<img src='img/gambar1.jpg' style='width:200px;height:200px;'>", "Nama Tempat 1", "Deskripsi Tempat 1");
    addMarker([-6.55768, 107.78591], "Lokasi 2", "blue", "<img src='img/gambar2.jpg' style='width:200px;height:200px;'>", "Nama Tempat 2", "Deskripsi Tempat 2");
    addMarker([-6.55968, 107.78450], "Lokasi 3", "blue", "<img src='img/gambar3.jpg' style='width:200px;height:200px;'>", "Nama Tempat 3", "Deskripsi Tempat 3");

    function addMarker(location, title, color, image, name, description) {
        let marker = L.marker(location, {icon: coloredIcon(color)}).addTo(map);
        marker.bindPopup("<div style='display:flex;'><div style='margin-right:10px;'>" + image + "</div><div><strong>" + name + "</strong><br>" + description + "</div></div>", {closeOnClick: false}); // Menambahkan parameter {closeOnClick: false} agar tooltip tetap terbuka saat pin diklik
        markers.push(marker); // Menambahkan marker ke dalam array markers
    }

    // Membuat ikon dengan warna yang diberikan
    function coloredIcon(color) {
        return new L.Icon({
            iconUrl: `https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    // Event listener untuk tombol Kebakaran 1
    document.getElementById('btnFire1').addEventListener('click', function() {
        if (!fireButton1Clicked) {
            startFlashing(0, 'red', 'blue'); // Mulai berkedipkan pin lokasi 1 menjadi merah dan biru
            fireButton1Clicked = true;
        } else {
            stopFlashing(0); // Hentikan berkedip jika tombol ditekan lagi
            fireButton1Clicked = false;
        }
    });

    // Event listener untuk tombol Kebakaran 2
    document.getElementById('btnFire2').addEventListener('click', function() {
        if (!fireButton2Clicked) {
            startFlashing(1, 'red', 'blue'); // Mulai berkedipkan pin lokasi 2 menjadi merah dan biru
            fireButton2Clicked = true;
        } else {
            stopFlashing(1); // Hentikan berkedip jika tombol ditekan lagi
            fireButton2Clicked = false;
        }
    });

    // Event listener untuk tombol Kebakaran 3
    document.getElementById('btnFire3').addEventListener('click', function() {
        if (!fireButton3Clicked) {
            startFlashing(2, 'red', 'blue'); // Mulai berkedipkan pin lokasi 3 menjadi merah dan biru
            fireButton3Clicked = true;
        } else {
            stopFlashing(2); // Hentikan berkedip jika tombol ditekan lagi
            fireButton3Clicked = false;
        }
    });

    // Fungsi untuk memulai berkedipkan pin
    function startFlashing(index, color1, color2) {
        let marker = markers[index];
        flashingIntervals[index] = setInterval(function() {
            let currentIcon = marker.options.icon;

            // Bergantian antara dua warna
            let nextColor = (currentIcon.options.iconUrl.includes(color1)) ? color2 : color1;
            marker.setIcon(coloredIcon(nextColor));

        }, 300); // Waktu antara perubahan warna (dalam milidetik)
    }

    // Fungsi untuk menghentikan berkedipkan pin
    function stopFlashing(index) {
        clearInterval(flashingIntervals[index]);
        let marker = markers[index]; // Lokasi pin yang ingin diubah
        marker.setIcon(coloredIcon('blue')); // Kembali ke warna aslinya (biru)
    }
}

// Panggil initMap saat halaman dimuat
document.addEventListener("DOMContentLoaded", function(event) {
    initMap();
});
