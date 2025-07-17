document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
  
    // Ini halaman login?
    if (path.includes("login.html")) {
      const authTitle = document.getElementById("authTitle");
      const authUsername = document.getElementById("authUsername");
      const authPassword = document.getElementById("authPassword");
      const authSubmitBtn = document.getElementById("authSubmitBtn");
      const toggleAuth = document.getElementById("toggleAuth");
      let isLogin = true;
  
      toggleAuth.addEventListener("click", (e) => {
        e.preventDefault();
        isLogin = !isLogin;
        if (isLogin) {
          authTitle.textContent = "Login";
          authSubmitBtn.textContent = "Login";
          toggleAuth.innerHTML = 'Belum punya akun? <a href="#">Daftar di sini</a>';
        } else {
          authTitle.textContent = "Daftar";
          authSubmitBtn.textContent = "Daftar";
          toggleAuth.innerHTML = 'Sudah punya akun? <a href="#">Login di sini</a>';
        }
      });
  
      authSubmitBtn.addEventListener("click", () => {
        const username = authUsername.value.trim();
        const password = authPassword.value.trim();
  
        if (!username || !password) {
          alert("Isi username dan password!");
          return;
        }
  
        if (isLogin) {
          const user = JSON.parse(localStorage.getItem(`user_${username}`));
          if (user && user.pwd === password) {
            localStorage.setItem("currentUser", username);
            alert(`Selamat datang, ${username}`);
            window.location.href = "index.html";
          } else {
            alert("Username atau password salah!");
          }
        } else {
          if (localStorage.getItem(`user_${username}`)) {
            alert("Username sudah terdaftar");
          } else {
            localStorage.setItem(`user_${username}`, JSON.stringify({ pwd: password }));
            alert("Pendaftaran berhasil, silakan login");
            isLogin = true;
            authTitle.textContent = "Login";
            authSubmitBtn.textContent = "Login";
            toggleAuth.innerHTML = 'Belum punya akun? <a href="#">Daftar di sini</a>';
          }
        }
      });
  
    } else {
      // Di halaman lain (beranda, artikel, dll) → cek login
      const user = localStorage.getItem("currentUser");
      if (!user) {
        window.location.href = "login.html";
      }
    }
  });
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser");
      alert("Anda telah logout");
      window.location.href = "login.html";
    });
  }