// Deteksi Speech Delay JavaScript
class SpeechDelayDetector {
    constructor() {
        this.form = document.getElementById('detectionForm');
        this.resultSection = document.getElementById('resultSection');
        this.resultContent = document.getElementById('resultContent');
        this.newDetectionBtn = document.getElementById('newDetection');
        this.saveResultBtn = document.getElementById('saveResult');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        this.newDetectionBtn.addEventListener('click', () => this.resetForm());
        this.saveResultBtn.addEventListener('click', () => this.saveResult());
    }

    handleFormSubmit(e) {
        e.preventDefault();
        this.showLoading();
        
        // Simulate processing time
        setTimeout(() => {
            const formData = this.getFormData();
            const result = this.analyzeSpeechDelay(formData);
            this.displayResult(result);
        }, 2000);
    }

    getFormData() {
        const formData = new FormData(this.form);
        return {
            childName: formData.get('childName'),
            childAge: parseInt(formData.get('childAge')),
            gender: formData.get('gender'),
            vocabulary: parseInt(formData.get('vocabulary')) || 0,
            sentenceLength: parseInt(formData.get('sentenceLength')),
            understanding: parseInt(formData.get('understanding')),
            canPoint: formData.get('canPoint') === 'on',
            canWave: formData.get('canWave') === 'on',
            canFollow: formData.get('canFollow') === 'on',
            canAsk: formData.get('canAsk') === 'on',
            canImitate: formData.get('canImitate') === 'on',
            concerns: formData.get('concerns')
        };
    }

    analyzeSpeechDelay(data) {
        let score = 0;
        let maxScore = 100;
        let details = [];
        let recommendations = [];

        // Age-based expectations
        const ageExpectations = this.getAgeExpectations(data.childAge);
        
        // Vocabulary scoring (25 points)
        const vocabScore = this.scoreVocabulary(data.vocabulary, data.childAge);
        score += vocabScore.points;
        details.push(`Kosakata: ${vocabScore.description} (${vocabScore.points}/25)`);

        // Sentence length scoring (20 points)
        const sentenceScore = this.scoreSentenceLength(data.sentenceLength, data.childAge);
        score += sentenceScore.points;
        details.push(`Panjang kalimat: ${sentenceScore.description} (${sentenceScore.points}/20)`);

        // Communication skills scoring (25 points)
        const commScore = this.scoreCommunicationSkills(data);
        score += commScore.points;
        details.push(`Kemampuan komunikasi: ${commScore.description} (${commScore.points}/25)`);

        // Understanding scoring (20 points)
        const understandingScore = this.scoreUnderstanding(data.understanding, data.childAge);
        score += understandingScore.points;
        details.push(`Pemahaman: ${understandingScore.description} (${understandingScore.points}/20)`);

        // Age-specific adjustments
        const ageAdjustment = this.getAgeAdjustment(data.childAge);
        score += ageAdjustment.points;
        if (ageAdjustment.points !== 0) {
            details.push(`Penyesuaian usia: ${ageAdjustment.description} (${ageAdjustment.points} poin)`);
        }

        // Determine status
        const status = this.determineStatus(score);
        
        // Generate recommendations
        recommendations = this.generateRecommendations(data, status, ageExpectations);

        return {
            childName: data.childName,
            childAge: data.childAge,
            score: Math.max(0, Math.min(100, score)),
            status: status,
            details: details,
            recommendations: recommendations,
            ageExpectations: ageExpectations,
            timestamp: new Date().toLocaleString('id-ID')
        };
    }

    getAgeExpectations(age) {
        if (age <= 12) {
            return {
                vocabulary: "5-10 kata",
                sentenceLength: "1 kata",
                communication: "Gestur sederhana",
                understanding: "Instruksi sederhana"
            };
        } else if (age <= 18) {
            return {
                vocabulary: "10-50 kata",
                sentenceLength: "1-2 kata",
                communication: "Menunjuk, melambai",
                understanding: "Instruksi 1-2 langkah"
            };
        } else if (age <= 24) {
            return {
                vocabulary: "50-200 kata",
                sentenceLength: "2 kata",
                communication: "Bertanya sederhana",
                understanding: "Instruksi 2-3 langkah"
            };
        } else if (age <= 36) {
            return {
                vocabulary: "200-1000 kata",
                sentenceLength: "3 kata",
                communication: "Percakapan sederhana",
                understanding: "Instruksi kompleks"
            };
        } else {
            return {
                vocabulary: "1000+ kata",
                sentenceLength: "4+ kata",
                communication: "Percakapan lancar",
                understanding: "Instruksi kompleks"
            };
        }
    }

    scoreVocabulary(vocabulary, age) {
        let expected = 0;
        if (age <= 12) expected = 5;
        else if (age <= 18) expected = 25;
        else if (age <= 24) expected = 100;
        else if (age <= 36) expected = 500;
        else expected = 1000;

        const ratio = vocabulary / expected;
        if (ratio >= 1.2) return { points: 25, description: "Sangat baik" };
        if (ratio >= 0.8) return { points: 20, description: "Baik" };
        if (ratio >= 0.5) return { points: 15, description: "Cukup" };
        if (ratio >= 0.3) return { points: 10, description: "Kurang" };
        return { points: 5, description: "Sangat kurang" };
    }

    scoreSentenceLength(sentenceLength, age) {
        let expected = 0;
        if (age <= 12) expected = 1;
        else if (age <= 18) expected = 1;
        else if (age <= 24) expected = 2;
        else if (age <= 36) expected = 3;
        else expected = 4;

        if (sentenceLength >= expected + 1) return { points: 20, description: "Sangat baik" };
        if (sentenceLength >= expected) return { points: 18, description: "Baik" };
        if (sentenceLength >= expected - 1) return { points: 15, description: "Cukup" };
        if (sentenceLength >= expected - 2) return { points: 10, description: "Kurang" };
        return { points: 5, description: "Sangat kurang" };
    }

    scoreCommunicationSkills(data) {
        let points = 0;
        let skills = [];

        if (data.canPoint) { points += 5; skills.push("menunjuk"); }
        if (data.canWave) { points += 5; skills.push("melambai"); }
        if (data.canFollow) { points += 5; skills.push("mengikuti instruksi"); }
        if (data.canAsk) { points += 5; skills.push("bertanya"); }
        if (data.canImitate) { points += 5; skills.push("meniru suara"); }

        const description = skills.length > 0 ? skills.join(", ") : "Tidak ada kemampuan yang terlihat";
        return { points: points, description: description };
    }

    scoreUnderstanding(understanding, age) {
        let expected = 3;
        if (age <= 12) expected = 2;
        else if (age <= 18) expected = 3;
        else if (age <= 24) expected = 4;
        else expected = 5;

        if (understanding >= expected) return { points: 20, description: "Sangat baik" };
        if (understanding >= expected - 1) return { points: 16, description: "Baik" };
        if (understanding >= expected - 2) return { points: 12, description: "Cukup" };
        if (understanding >= expected - 3) return { points: 8, description: "Kurang" };
        return { points: 4, description: "Sangat kurang" };
    }

    getAgeAdjustment(age) {
        // Bonus for very young children, penalty for older children with delays
        if (age <= 12) return { points: 5, description: "Bonus usia muda" };
        if (age >= 48) return { points: -5, description: "Penalti usia" };
        return { points: 0, description: "Tidak ada penyesuaian" };
    }

    determineStatus(score) {
        if (score >= 80) return { level: "normal", label: "Perkembangan Normal", color: "normal" };
        if (score >= 60) return { level: "mild", label: "Keterlambatan Ringan", color: "mild" };
        return { level: "moderate", label: "Keterlambatan Sedang", color: "moderate" };
    }

    generateRecommendations(data, status, ageExpectations) {
        const recommendations = [];

        if (status.level === "normal") {
            recommendations.push("Lanjutkan stimulasi bicara yang sudah dilakukan");
            recommendations.push("Bacakan buku cerita secara rutin");
            recommendations.push("Ajak anak berbicara dalam berbagai situasi");
        } else if (status.level === "mild") {
            recommendations.push("Tingkatkan stimulasi bicara di rumah");
            recommendations.push("Konsultasi dengan dokter anak untuk evaluasi");
            recommendations.push("Pertimbangkan terapi wicara jika tidak ada perbaikan dalam 3 bulan");
        } else {
            recommendations.push("Segera konsultasi dengan dokter anak atau terapis wicara");
            recommendations.push("Lakukan evaluasi menyeluruh untuk menentukan penyebab");
            recommendations.push("Mulai terapi wicara sesegera mungkin");
            recommendations.push("Pertimbangkan evaluasi pendengaran");
        }

        // Specific recommendations based on age
        if (data.childAge <= 18 && data.vocabulary < 10) {
            recommendations.push("Fokus pada pengembangan kosakata dasar");
        }
        if (data.childAge >= 24 && data.sentenceLength < 2) {
            recommendations.push("Latih anak menggabungkan 2 kata");
        }

        return recommendations;
    }

    showLoading() {
        this.resultContent.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p style="margin-left: 15px;">Menganalisis data...</p>
            </div>
        `;
        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    displayResult(result) {
        const statusClass = result.status.color;
        
        this.resultContent.innerHTML = `
            <div class="result-summary">
                <h3>Hasil Deteksi untuk ${result.childName}</h3>
                <p><strong>Usia:</strong> ${result.childAge} bulan</p>
                <p><strong>Skor:</strong> ${result.score}/100</p>
                <p><strong>Waktu Deteksi:</strong> ${result.timestamp}</p>
            </div>

            <div class="result-status ${statusClass}">
                <strong>${result.status.label}</strong>
            </div>

            <div class="result-details">
                <h4>Analisis Detail</h4>
                <ul>
                    ${result.details.map(detail => `<li>${detail}</li>`).join('')}
                </ul>
            </div>

            <div class="result-details">
                <h4>Ekspektasi Usia ${result.childAge} Bulan</h4>
                <ul>
                    <li>Kosakata: ${result.ageExpectations.vocabulary}</li>
                    <li>Panjang kalimat: ${result.ageExpectations.sentenceLength}</li>
                    <li>Kemampuan komunikasi: ${result.ageExpectations.communication}</li>
                    <li>Pemahaman: ${result.ageExpectations.understanding}</li>
                </ul>
            </div>

            <div class="recommendations">
                <h4>Rekomendasi</h4>
                <ul>
                    ${result.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;

        this.resultSection.style.display = 'block';
        this.resultSection.scrollIntoView({ behavior: 'smooth' });
    }

    resetForm() {
        this.form.reset();
        this.resultSection.style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    saveResult() {
        const resultContent = this.resultContent.innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Hasil Deteksi Speech Delay - ${new Date().toLocaleDateString('id-ID')}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .result { margin: 20px 0; }
                    .status { padding: 10px; border-radius: 5px; margin: 15px 0; }
                    .normal { background: #d4edda; color: #155724; }
                    .mild { background: #fff3cd; color: #856404; }
                    .moderate { background: #f8d7da; color: #721c24; }
                    ul { padding-left: 20px; }
                    li { margin: 5px 0; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Hasil Deteksi Speech Delay</h1>
                    <p>Gerbang Kata - ${new Date().toLocaleString('id-ID')}</p>
                </div>
                <div class="result">
                    ${resultContent}
                </div>
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Initialize the detector when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SpeechDelayDetector();
}); 