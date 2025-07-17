// Inisialisasi peta
let map;
let currentLocationMarker;
let routeMode = false;
let routeLayer;
let markers = [];
let searchMarker;

// Data lokasi terapis dan klinik di Sulawesi Tenggara dan daerah lain
const locations = [
    // Sulawesi Tenggara
    {
        name: "Klinik Terapi Bicara Anak Kendari",
        lat: -3.9754,
        lng: 122.5157,
        type: "klinik",
        description: "Spesialis terapi speech delay untuk anak usia 2-12 tahun",
        address: "Jl. Soekarno-Hatta No. 45, Kendari, Sulawesi Tenggara"
    },
    {
        name: "Rumah Sakit Umum Daerah Kendari",
        lat: -3.9754,
        lng: 122.5157,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan poli anak dan tumbuh kembang",
        address: "Jl. Dr. Ratulangi No. 123, Kendari, Sulawesi Tenggara"
    },
    {
        name: "Pusat Terapi Anak Cerdas Kendari",
        lat: -3.9754,
        lng: 122.5157,
        type: "pusat_terapi",
        description: "Pusat terapi holistik untuk anak dengan kebutuhan khusus",
        address: "Jl. Ahmad Yani No. 78, Kendari, Sulawesi Tenggara"
    },
    {
        name: "Klinik Tumbuh Kembang Anak Kendari",
        lat: -3.9754,
        lng: 122.5157,
        type: "klinik",
        description: "Klinik spesialis tumbuh kembang dan terapi wicara",
        address: "Jl. Sultan Hasanuddin No. 56, Kendari, Sulawesi Tenggara"
    },
    {
        name: "Rumah Sakit Umum Baubau",
        lat: -5.4667,
        lng: 122.6333,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan layanan anak",
        address: "Jl. Sultan Hasanuddin No. 12, Baubau, Sulawesi Tenggara"
    },
    {
        name: "Klinik Terapi Wicara Baubau",
        lat: -5.4667,
        lng: 122.6333,
        type: "klinik",
        description: "Klinik terapi wicara dan tumbuh kembang",
        address: "Jl. Ahmad Yani No. 34, Baubau, Sulawesi Tenggara"
    },
    {
        name: "Pusat Terapi Anak Kolaka",
        lat: -4.0167,
        lng: 121.6167,
        type: "pusat_terapi",
        description: "Pusat terapi untuk anak berkebutuhan khusus",
        address: "Jl. Soekarno-Hatta No. 67, Kolaka, Sulawesi Tenggara"
    },
    {
        name: "Klinik Terapi Wicara Muna",
        lat: -4.8500,
        lng: 122.7000,
        type: "klinik",
        description: "Klinik terapi wicara dan tumbuh kembang anak",
        address: "Jl. Ahmad Yani No. 23, Raha, Muna, Sulawesi Tenggara"
    },
    {
        name: "Rumah Sakit Umum Muna",
        lat: -4.8500,
        lng: 122.7000,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan poli anak",
        address: "Jl. Soekarno-Hatta No. 45, Raha, Muna, Sulawesi Tenggara"
    },
    {
        name: "Pusat Terapi Anak Wakatobi",
        lat: -5.3167,
        lng: 123.5833,
        type: "pusat_terapi",
        description: "Pusat terapi untuk anak berkebutuhan khusus",
        address: "Jl. Ahmad Yani No. 12, Wangi-Wangi, Wakatobi, Sulawesi Tenggara"
    },
    {
        name: "Klinik Terapi Wicara Buton",
        lat: -5.4667,
        lng: 122.6333,
        type: "klinik",
        description: "Klinik terapi wicara dan tumbuh kembang",
        address: "Jl. Sultan Hasanuddin No. 78, Bau-Bau, Buton, Sulawesi Tenggara"
    },
    {
        name: "Rumah Sakit Umum Buton",
        lat: -5.4667,
        lng: 122.6333,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan layanan anak",
        address: "Jl. Dr. Ratulangi No. 34, Bau-Bau, Buton, Sulawesi Tenggara"
    },
    {
        name: "Klinik Terapi Bicara Konawe",
        lat: -3.9754,
        lng: 122.5157,
        type: "klinik",
        description: "Klinik terapi bicara dan tumbuh kembang anak",
        address: "Jl. Ahmad Yani No. 89, Unaaha, Konawe, Sulawesi Tenggara"
    },
    {
        name: "Pusat Terapi Anak Konawe Selatan",
        lat: -4.0167,
        lng: 121.6167,
        type: "pusat_terapi",
        description: "Pusat terapi untuk anak berkebutuhan khusus",
        address: "Jl. Soekarno-Hatta No. 56, Andoolo, Konawe Selatan, Sulawesi Tenggara"
    },
    {
        name: "Labirin Children Center Kendari",
        lat: -3.991500,
        lng: 122.512000,
        type: "pusat_terapi",
        description: "Pusat terapi anak dan tumbuh kembang di Kendari.",
        address: "Jl. Labibia, Kendari, Sulawesi Tenggara"
    },
    {
        name: "Yayasan Amanah Terapis",
        lat: -3.995070,
        lng: 122.512900,
        type: "pusat_terapi",
        description: "Yayasan layanan terapi anak berkebutuhan khusus.",
        address: "Jl. Syech Yusuf, Korumba, Kec. Mandonga, Kota Kendari"
    },
    {
        name: "Yayasan Ruang Asa",
        lat: -3.995800,
        lng: 122.515200,
        type: "pusat_terapi",
        description: "Pusat layanan terapi dan edukasi anak.",
        address: "Jl. Syech Yusuf, Korumba, Kec. Mandonga, Kota Kendari"
    },
    {
        name: "Bandara Haluoleo Kendari",
        lat: -4.081667,
        lng: 122.417222,
        type: "bandara",
        description: "Bandara utama di Sulawesi Tenggara.",
        address: "Jl. Bandara Haluoleo, Ambaipua, Kec. Ranomeeto, Kab. Konawe Selatan"
    },
    {
        name: "Lippo Plaza Kendari",
        lat: -3.995700,
        lng: 122.512600,
        type: "tempat_umum",
        description: "Pusat perbelanjaan dan hiburan di Kendari.",
        address: "Jl. MT Haryono No. 1, Kendari"
    },
    {
        name: "Rumah Sakit Bahteramas",
        lat: -4.008800,
        lng: 122.510900,
        type: "rumah_sakit",
        description: "Rumah sakit umum daerah Sulawesi Tenggara.",
        address: "Jl. H.E.A. Mokodompit, Anduonohu, Kec. Poasia, Kota Kendari"
    },
    {
        name: "Rumah Sakit Hermina Kendari",
        lat: -3.995000,
        lng: 122.515000,
        type: "rumah_sakit",
        description: "Rumah sakit swasta dengan layanan lengkap.",
        address: "Jl. Syech Yusuf, Korumba, Kec. Mandonga, Kota Kendari"
    },
    {
        name: "Universitas Halu Oleo",
        lat: -3.957600,
        lng: 122.597600,
        type: "kampus",
        description: "Kampus terbesar di Sulawesi Tenggara.",
        address: "Jl. H.E.A. Mokodompit, Anduonohu, Kec. Poasia, Kota Kendari"
    },
    {
        name: "Pelabuhan Nusantara Kendari",
        lat: -3.982000,
        lng: 122.594000,
        type: "pelabuhan",
        description: "Pelabuhan utama di Kendari.",
        address: "Jl. Pelabuhan, Kendari"
    },
    
    // Jawa
    {
        name: "Klinik Terapi Bicara Anak Jakarta",
        lat: -6.2088,
        lng: 106.8456,
        type: "klinik",
        description: "Spesialis terapi speech delay untuk anak usia 2-12 tahun",
        address: "Jl. Sudirman No. 123, Jakarta Pusat"
    },
    {
        name: "Rumah Sakit Anak Jakarta",
        lat: -6.1751,
        lng: 106.8650,
        type: "rumah_sakit",
        description: "Rumah sakit khusus anak dengan poli tumbuh kembang",
        address: "Jl. Thamrin No. 45, Jakarta Pusat"
    },
    {
        name: "Pusat Terapi Anak Cerdas Jakarta",
        lat: -6.2088,
        lng: 106.8456,
        type: "pusat_terapi",
        description: "Pusat terapi holistik untuk anak dengan kebutuhan khusus",
        address: "Jl. Gatot Subroto No. 78, Jakarta Selatan"
    },
    {
        name: "Klinik Tumbuh Kembang Anak Bandung",
        lat: -6.9175,
        lng: 107.6191,
        type: "klinik",
        description: "Klinik spesialis tumbuh kembang dan terapi wicara",
        address: "Jl. Asia Afrika No. 100, Bandung, Jawa Barat"
    },
    {
        name: "Rumah Sakit Umum Bandung",
        lat: -6.9175,
        lng: 107.6191,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan poli anak dan tumbuh kembang",
        address: "Jl. Pasteur No. 38, Bandung, Jawa Barat"
    },
    
    // Kalimantan
    {
        name: "Klinik Terapi Wicara Banjarmasin",
        lat: -3.3167,
        lng: 114.5833,
        type: "klinik",
        description: "Klinik terapi wicara dan tumbuh kembang anak",
        address: "Jl. Lambung Mangkurat No. 89, Banjarmasin, Kalimantan Selatan"
    },
    {
        name: "Rumah Sakit Umum Banjarmasin",
        lat: -3.3167,
        lng: 114.5833,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan layanan anak",
        address: "Jl. Pangeran Antasari No. 23, Banjarmasin, Kalimantan Selatan"
    },
    {
        name: "Pusat Terapi Anak Balikpapan",
        lat: -1.2389,
        lng: 116.8529,
        type: "pusat_terapi",
        description: "Pusat terapi untuk anak berkebutuhan khusus",
        address: "Jl. Jenderal Sudirman No. 45, Balikpapan, Kalimantan Timur"
    },
    
    // Sulawesi Utara
    {
        name: "Klinik Terapi Bicara Manado",
        lat: 1.4748,
        lng: 124.8421,
        type: "klinik",
        description: "Klinik terapi wicara dan tumbuh kembang",
        address: "Jl. Sam Ratulangi No. 67, Manado, Sulawesi Utara"
    },
    {
        name: "Rumah Sakit Umum Manado",
        lat: 1.4748,
        lng: 124.8421,
        type: "rumah_sakit",
        description: "Rumah sakit umum dengan poli anak",
        address: "Jl. Dr. Sutomo No. 34, Manado, Sulawesi Utara"
    }
];

// Inisialisasi peta saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    addLocationMarkers();
    setupEventListeners();
});

function initMap() {
    // Inisialisasi peta dengan pusat di Kendari, Sulawesi Tenggara
    map = L.map('map').setView([-3.9754, 122.5157], 13);

    // Ganti tile layer ke MapTiler Streets (modern, legal, mirip Google Maps)
    L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=g9TB3xLFsFJcZRaZjHXZ', {
        attribution: '© MapTiler © OpenStreetMap contributors',
        maxZoom: 20
    }).addTo(map);

    // Tambahkan kontrol zoom
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
}

function addLocationMarkers() {
    locations.forEach(location => {
        let icon;

        // Pilih ikon berdasarkan tipe lokasi
        switch(location.type) {
            case 'klinik':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #4a6fa5; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-user-md"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'rumah_sakit':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #e74c3c; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-hospital"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'pusat_terapi':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #27ae60; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-stethoscope"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'tempat_umum':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #f39c12; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-store"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'bandara':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #00bcd4; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-plane"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'kampus':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #8e44ad; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-university"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'pelabuhan':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #009688; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-ship"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            default:
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #607d8b; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
        }

        const marker = L.marker([location.lat, location.lng], { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #4a6fa5; font-size: 14px;">${location.name}</h3>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${location.address}</p>
                    <p style="margin: 0 0 10px 0; font-size: 12px;">${location.description}</p>
                    <div style="display: flex; gap: 5px; justify-content: center;">
                        <button onclick="showRoute(${location.lat}, ${location.lng}, '${location.name}')" 
                                style="background: #4a6fa5; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            <i class="fas fa-route"></i> Rute
                        </button>
                        <button onclick="showInfo('${location.name}', '${location.description}', '${location.address}')" 
                                style="background: #ff9e80; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            <i class="fas fa-info"></i> Info
                        </button>
                    </div>
                </div>
            `);

        markers.push(marker);
    });
}

function getCurrentLocation() {
    if (navigator.geolocation) {
        showNotification('Mencari lokasi Anda...', 'info');
        
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;

                // Hapus marker lokasi sebelumnya jika ada
                if (currentLocationMarker) {
                    map.removeLayer(currentLocationMarker);
                }

                // Tambahkan marker lokasi saat ini
                currentLocationMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'custom-div-icon',
                        html: `<div style="background-color: #3498db; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-location-arrow"></i></div>`,
                        iconSize: [35, 35],
                        iconAnchor: [17.5, 17.5]
                    })
                }).addTo(map);

                // Pindahkan peta ke lokasi saat ini
                map.setView([lat, lng], 15);

                // Tampilkan popup
                currentLocationMarker.bindPopup(`
                    <div style="text-align: center;">
                        <h3 style="margin: 0 0 10px 0; color: #3498db;">Lokasi Anda</h3>
                        <p style="margin: 0; font-size: 12px;">Lat: ${lat.toFixed(6)}<br>Lng: ${lng.toFixed(6)}</p>
                    </div>
                `).openPopup();

                showNotification('Lokasi Anda berhasil ditemukan!', 'success');
            },
            function(error) {
                console.error('Error getting location:', error);
                let errorMessage = 'Tidak dapat menemukan lokasi Anda.';
                
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Izin lokasi ditolak. Silakan aktifkan GPS di pengaturan browser.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Informasi lokasi tidak tersedia.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Waktu pencarian lokasi habis.';
                        break;
                }
                
                showNotification(errorMessage, 'error');
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    } else {
        showNotification('Geolokasi tidak didukung di browser ini.', 'error');
    }
}

function searchLocation() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        showNotification('Masukkan kata kunci pencarian.', 'warning');
        return;
    }

    showNotification('Mencari lokasi...', 'info');

    // Hapus marker pencarian sebelumnya
    if (searchMarker) {
        map.removeLayer(searchMarker);
    }

    // Cari di data lokasi lokal terlebih dahulu
    const localResults = locations.filter(location => 
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (localResults.length > 0) {
        // Jika ditemukan di data lokal, tampilkan yang pertama
        const result = localResults[0];
        map.setView([result.lat, result.lng], 15);
        
        // Tambahkan marker untuk hasil pencarian
        searchMarker = L.marker([result.lat, result.lng], {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: #e67e22; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-search"></i></div>`,
                iconSize: [35, 35],
                iconAnchor: [17.5, 17.5]
            })
        }).addTo(map);

        searchMarker.bindPopup(`
            <div style="text-align: center; min-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #e67e22; font-size: 14px;">Hasil Pencarian</h3>
                <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${result.name}</p>
                <p style="margin: 0; font-size: 12px;">${result.address}</p>
                <div style="margin-top: 10px;">
                    <button onclick="showRoute(${result.lat}, ${result.lng}, '${result.name}')" 
                            style="background: #4a6fa5; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; margin-right: 5px;">
                        <i class="fas fa-route"></i> Rute
                    </button>
                    <button onclick="showInfo('${result.name}', '${result.description}', '${result.address}')" 
                            style="background: #ff9e80; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                        <i class="fas fa-info"></i> Info
                    </button>
                </div>
            </div>
        `).openPopup();

        showNotification(`Lokasi "${searchTerm}" ditemukan!`, 'success');
        return;
    }

    // Jika tidak ditemukan di data lokal, gunakan Nominatim API
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm + ', Indonesia')}&limit=5&countrycodes=id`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lng = parseFloat(result.lon);

                // Pindahkan peta ke lokasi yang dicari
                map.setView([lat, lng], 15);

                // Tambahkan marker untuk hasil pencarian
                searchMarker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'custom-div-icon',
                        html: `<div style="background-color: #e67e22; width: 35px; height: 35px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-search"></i></div>`,
                        iconSize: [35, 35],
                        iconAnchor: [17.5, 17.5]
                    })
                }).addTo(map);

                searchMarker.bindPopup(`
                    <div style="text-align: center; min-width: 200px;">
                        <h3 style="margin: 0 0 10px 0; color: #e67e22; font-size: 14px;">Hasil Pencarian</h3>
                        <p style="margin: 0; font-size: 12px;">${result.display_name}</p>
                        <p style="margin: 10px 0 0 0; font-size: 11px; color: #666;">Lokasi umum - tidak ada data terapis</p>
                    </div>
                `).openPopup();

                showNotification(`Lokasi "${searchTerm}" ditemukan!`, 'success');
            } else {
                showNotification(`Lokasi "${searchTerm}" tidak ditemukan. Coba kata kunci lain.`, 'error');
            }
        })
        .catch(error => {
            console.error('Error searching location:', error);
            showNotification('Terjadi kesalahan saat mencari lokasi. Coba lagi.', 'error');
        });
}

function toggleRouteMode() {
    routeMode = !routeMode;
    const routeBtn = document.querySelector('.route-btn:nth-child(2)');
    
    if (routeMode) {
        routeBtn.classList.add('active');
        routeBtn.innerHTML = '<i class="fas fa-route"></i> Mode Rute Aktif';
        showNotification('Mode rute aktif. Klik dua lokasi untuk membuat rute.', 'info');
    } else {
        routeBtn.classList.remove('active');
        routeBtn.innerHTML = '<i class="fas fa-route"></i> Mode Rute';
        showNotification('Mode rute dinonaktifkan.', 'info');
    }
}

function showRoute(lat, lng, destinationName) {
    if (!currentLocationMarker) {
        showNotification('Tentukan lokasi Anda terlebih dahulu dengan menekan tombol "Lokasi Saya".', 'warning');
        return;
    }

    const currentLat = currentLocationMarker.getLatLng().lat;
    const currentLng = currentLocationMarker.getLatLng().lng;

    // Hapus rute sebelumnya jika ada
    if (routeLayer) {
        map.removeLayer(routeLayer);
    }

    showNotification('Mencari rute...', 'info');

    // Gunakan OSRM API untuk mendapatkan rute
    fetch(`https://router.project-osrm.org/route/v1/driving/${currentLng},${currentLat};${lng},${lat}?overview=full&geometries=geojson`)
        .then(response => response.json())
        .then(data => {
            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                
                // Gambar rute di peta
                routeLayer = L.geoJSON(route.geometry, {
                    style: {
                        color: '#4a6fa5',
                        weight: 6,
                        opacity: 0.8
                    }
                }).addTo(map);

                // Tampilkan informasi rute
                const duration = Math.round(route.duration / 60); // dalam menit
                const distance = (route.distance / 1000).toFixed(1); // dalam km

                showNotification(`Rute ke ${destinationName}: ${distance} km, ${duration} menit`, 'success');

                // Tambahkan popup informasi rute
                const routeInfo = L.popup()
                    .setLatLng([(currentLat + lat) / 2, (currentLng + lng) / 2])
                    .setContent(`
                        <div style="text-align: center; min-width: 200px;">
                            <h3 style="margin: 0 0 10px 0; color: #4a6fa5;">Rute ke ${destinationName}</h3>
                            <p style="margin: 5px 0; font-size: 12px;"><i class="fas fa-road"></i> Jarak: ${distance} km</p>
                            <p style="margin: 5px 0; font-size: 12px;"><i class="fas fa-clock"></i> Waktu: ${duration} menit</p>
                        </div>
                    `);
                
                routeInfo.openOn(map);
            } else {
                showNotification('Tidak dapat menemukan rute ke lokasi tersebut.', 'error');
            }
        })
        .catch(error => {
            console.error('Error getting route:', error);
            showNotification('Terjadi kesalahan saat mencari rute. Coba lagi.', 'error');
        });
}

function clearRoute() {
    if (routeLayer) {
        map.removeLayer(routeLayer);
        routeLayer = null;
        showNotification('Rute telah dihapus.', 'info');
    }
    
    if (searchMarker) {
        map.removeLayer(searchMarker);
        searchMarker = null;
    }
}

function showInfo(title, description, address) {
    // Buat modal sederhana untuk menampilkan informasi
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    modal.innerHTML = `
        <div style="
            background: white;
            padding: 30px;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            text-align: center;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        ">
            <h3 style="color: #4a6fa5; margin-bottom: 15px;">${title}</h3>
            <p style="margin-bottom: 10px; line-height: 1.6; color: #666;">${description}</p>
            <p style="margin-bottom: 20px; line-height: 1.6; font-weight: bold; color: #333;">📍 ${address}</p>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #4a6fa5;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 16px;
            ">Tutup</button>
        </div>
    `;

    document.body.appendChild(modal);
}

function showNotification(message, type) {
    // Hapus notifikasi sebelumnya
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Buat notifikasi baru
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        max-width: 300px;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Set warna berdasarkan tipe notifikasi
    switch(type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        case 'info':
            notification.style.background = '#3498db';
            break;
        default:
            notification.style.background = '#4a6fa5';
    }

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animasi masuk
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Hapus notifikasi setelah 4 detik
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function setupEventListeners() {
    // Event listener untuk pencarian dengan Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchLocation();
        }
    });

    // Event listener untuk hamburger menu
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const body = document.body;

    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', function() {
            mobileNavOverlay.classList.toggle('is-open');
            body.classList.toggle('menu-open');
            
            const iconHamburger = hamburgerToggle.querySelector('.icon-hamburger');
            const iconClose = hamburgerToggle.querySelector('.icon-close');
            
            if (mobileNavOverlay.classList.contains('is-open')) {
                iconHamburger.style.display = 'none';
                iconClose.style.display = 'block';
            } else {
                iconHamburger.style.display = 'block';
                iconClose.style.display = 'none';
            }
        });
    }

    // Event listener untuk logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login2.html';
        });
    }
}

function filterLocations(type) {
    // Hapus semua marker
    markers.forEach(marker => {
        map.removeLayer(marker);
    });
    markers = [];

    // Filter lokasi berdasarkan tipe
    const filteredLocations = type === 'all' ? locations : locations.filter(location => location.type === type);

    // Tambahkan marker untuk lokasi yang difilter
    filteredLocations.forEach(location => {
        let icon;

        // Pilih ikon berdasarkan tipe lokasi
        switch(location.type) {
            case 'klinik':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #4a6fa5; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-user-md"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'rumah_sakit':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #e74c3c; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-hospital"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'pusat_terapi':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #27ae60; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-stethoscope"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'tempat_umum':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #f39c12; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-store"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'bandara':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #00bcd4; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-plane"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'kampus':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #8e44ad; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-university"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            case 'pelabuhan':
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #009688; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-ship"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
                break;
            default:
                icon = L.divIcon({
                    className: 'custom-div-icon',
                    html: `<div style="background-color: #607d8b; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"><i class="fas fa-map-marker-alt"></i></div>`,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });
        }

        const marker = L.marker([location.lat, location.lng], { icon: icon })
            .addTo(map)
            .bindPopup(`
                <div style="text-align: center; min-width: 200px;">
                    <h3 style="margin: 0 0 10px 0; color: #4a6fa5; font-size: 14px;">${location.name}</h3>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">${location.address}</p>
                    <p style="margin: 0 0 10px 0; font-size: 12px;">${location.description}</p>
                    <div style="display: flex; gap: 5px; justify-content: center;">
                        <button onclick="showRoute(${location.lat}, ${location.lng}, '${location.name}')" 
                                style="background: #4a6fa5; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            <i class="fas fa-route"></i> Rute
                        </button>
                        <button onclick="showInfo('${location.name}', '${location.description}', '${location.address}')" 
                                style="background: #ff9e80; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px;">
                            <i class="fas fa-info"></i> Info
                        </button>
                    </div>
                </div>
            `);

        markers.push(marker);
    });

    // Update tombol filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${type}"]`).classList.add('active');

    // Tampilkan notifikasi
    const typeNames = {
        'all': 'Semua Lokasi',
        'klinik': 'Klinik',
        'rumah_sakit': 'Rumah Sakit',
        'pusat_terapi': 'Pusat Terapi',
        'tempat_umum': 'Tempat Umum',
        'bandara': 'Bandara',
        'kampus': 'Kampus',
        'pelabuhan': 'Pelabuhan'
    };
    showNotification(`Menampilkan ${typeNames[type]} (${filteredLocations.length} lokasi)`, 'info');
} 