document.addEventListener("DOMContentLoaded", () => {
    const commentList = document.getElementById("commentList");
    const commentForm = document.getElementById("commentForm");
    const commentInput = document.getElementById("commentInput");
    const usernameInput = document.getElementById("usernameInput");
    const exportBtn = document.getElementById("exportBtn");
  
    const params = new URLSearchParams(window.location.search);
    const contentId = params.get("id") || "default";
  
    function loadComments() {
      const comments = JSON.parse(localStorage.getItem(`comments_${contentId}`)) || [];
      commentList.innerHTML = comments.map((c, index) => `
        <div class="comment">
          <div class="meta">${c.username} | ${c.time}</div>
          <div class="text">${c.text}</div>
          <button class="delete-btn" data-index="${index}">Hapus</button>
        </div>
      `).join("");
      addDeleteListeners();
    }
  
    function addDeleteListeners() {
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
          const index = e.target.getAttribute("data-index");
          const comments = JSON.parse(localStorage.getItem(`comments_${contentId}`)) || [];
          comments.splice(index, 1);
          localStorage.setItem(`comments_${contentId}`, JSON.stringify(comments));
          loadComments();
        });
      });
    }
  
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = commentInput.value.trim();
      const username = usernameInput.value.trim() || "Anonim";
      if (text) {
        const now = new Date();
        const timeStr = now.toLocaleString();
        const comments = JSON.parse(localStorage.getItem(`comments_${contentId}`)) || [];
        comments.push({ username, text, time: timeStr });
        localStorage.setItem(`comments_${contentId}`, JSON.stringify(comments));
        commentInput.value = "";
        loadComments();
      }
    });
  
    exportBtn.addEventListener("click", () => {
      const comments = JSON.parse(localStorage.getItem(`comments_${contentId}`)) || [];
      let content = comments.map(c => `${c.username} | ${c.time}\n${c.text}\n`).join('\n');
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.href = url;
      a.download = `komentar_${contentId}.txt`;
      a.click();
  
      URL.revokeObjectURL(url);
    });
  
    loadComments();
  });
  