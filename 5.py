# Create folders and HTML/CSS/JS files with updated structure
import os

base_dir = "/mnt/data/gerbang-kata-revamp"

# Define file content structure
file_structure = {
    "index.html": "",
    "artikel.html": "",
    "profil.html": "",
    "faq.html": "",
    "style.css": "",
    "script.js": "",
    "assets/img/": [],
    "assets/js/": [],
    "assets/css/": [],
    "assets/video/": [],
    "assets/fonts/": [],
}

# Create folders and empty files
for path, files in file_structure.items():
    full_path = os.path.join(base_dir, path)
    if path.endswith("/"):
        os.makedirs(full_path, exist_ok=True)
    else:
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, "w") as f:
            f.write("")

base_dir
