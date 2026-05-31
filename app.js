// State
let files = [];

// Elements
const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileInputBtn = document.getElementById('fileInputBtn');
const generateBtn = document.getElementById('generateBtn');
const uebungsnummer = document.getElementById('uebungsnummer');
const flist = document.getElementById('flist');
const status = document.getElementById('status');
const folderInfo = document.getElementById('folderInfo');

// Event Listeners
fileInputBtn.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', handleFileSelect);

// File Selection
function handleFileSelect(e) {
    processFiles(e.target.files);
}

function handleDrop(e) {
    e.preventDefault();
    processFiles(e.dataTransfer.files);
}

function processFiles(fileList) {
    const supportedFormats = ['java', 'txt', 'md', 'png', 'jpg', 'jpeg', 'uxf', 'uxl', 'gif'];
    
    for (let file of fileList) {
        const extension = file.name.split('.').pop().toLowerCase();
        
        if (!supportedFormats.includes(extension)) {
            showStatus(`Dateiformat .${extension} wird nicht unterstützt`, 'err');
            continue;
        }

        // Check if file already exists
        if (files.some(f => f.name === file.name)) {
            showStatus(`${file.name} existiert bereits`, 'warn');
            continue;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            files.push({
                name: file.name,
                type: extension,
                content: e.target.result,
                file: file
            });
            renderFiles();
            showStatus(`${file.name} hinzugefügt`, 'ok');
        };

        if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
            reader.readAsDataURL(file);
        } else {
            reader.readAsText(file);
        }
    }
}

// Sort files by filename pattern
function sortKey(filename) {
    const base = filename.replace(/\.[^.]+$/, '').toLowerCase().replace(/[\s_-]/g, '');
    
    // Match patterns like "1a", "2b", "Aufgabe1a"
    const m = base.match(/^(?:aufgabe)?(\d+)([a-z]?)/i);
    if (m) {
        const num = parseInt(m[1]);
        const letter = m[2] ? m[2].charCodeAt(0) - 96 : 0;
        return num * 100 + letter * 10;
    }
    
    return 99999;
}

// Render Files
function renderFiles() {
    if (files.length === 0) {
        flist.innerHTML = '';
        folderInfo.className = 'info-box';
        return;
    }

    flist.innerHTML = '';
    folderInfo.className = 'info-box blue show';
    folderInfo.textContent = `${files.length} Datei${files.length !== 1 ? 'en' : ''} bereit — sortiert nach Aufgaben-Reihenfolge`;

    // Sort files
    const sorted = [...files].sort((a, b) => {
        const ka = sortKey(a.name);
        const kb = sortKey(b.name);
        if (ka !== kb) return ka - kb;
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
    });

    sorted.forEach((file, i) => {
        const ext = file.type.toLowerCase();
        const div = document.createElement('div');
        div.className = 'fitem';
        
        let badgeClass = 'other';
        if (['java', 'uxf', 'uxl'].includes(ext)) {
            badgeClass = ext === 'java' ? 'java' : 'uxl';
        }

        div.innerHTML = `
            <div class="fitem-left">
                <span class="fitem-num">${i + 1}.</span>
                <span class="fitem-name" title="${file.name}">${file.name}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
                <span class="badge ${badgeClass}">.${ext}</span>
                <button class="rm" onclick="removeFile('${file.name}')">✕</button>
            </div>
        `;
        flist.appendChild(div);
    });
}

// Remove File
function removeFile(name) {
    files = files.filter(f => f.name !== name);
    renderFiles();
    showStatus('Datei gelöscht', 'ok');
}

// Read text file
async function readText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file, 'UTF-8');
    });
}

// Read as data URL
async function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Generate PDF and ZIP
async function generate() {
    if (files.length === 0) {
        showStatus('Bitte füge zuerst Dateien hinzu', 'err');
        return;
    }

    const blattnr = document.getElementById('uebungsnummer').value.trim();
    if (!blattnr) {
        showStatus('Bitte Übungsnummer eingeben', 'err');
        return;
    }

    generateBtn.disabled = true;
    status.textContent = 'Erstelle PDF…';
    status.className = 'status';

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pageWidth = 210;
        const pageHeight = 297;
        const margin = 15;
        const contentWidth = 180;
        let pageNum = 0;

        // Sort files
        const sorted = [...files].sort((a, b) => {
            const ka = sortKey(a.name);
            const kb = sortKey(b.name);
            if (ka !== kb) return ka - kb;
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });

        // Helper: Add page header
        function addPageHeader(pdf, filename) {
            pageNum++;
            pdf.setFillColor(240, 242, 245);
            pdf.rect(0, 0, pageWidth, 14, 'F');
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(10);
            pdf.setTextColor(40, 40, 40);
            pdf.text(filename, margin, 9);
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Übungsblatt ${blattnr} — ${pageNum}`, pageWidth - margin, 9, { align: 'right' });
            pdf.setDrawColor(180, 180, 180);
            pdf.setLineWidth(0.3);
            pdf.line(0, 14, pageWidth, 14);
        }

        // Process each file
        for (let i = 0; i < sorted.length; i++) {
            const file = sorted[i];
            const ext = file.type.toLowerCase();

            status.textContent = `Verarbeite ${file.name}... (${i + 1}/${sorted.length})`;

            if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
                // Add image
                pdf.addPage();
                addPageHeader(pdf, file.name);

                try {
                    const dataUrl = file.content;
                    await new Promise((resolve) => {
                        const img = new Image();
                        img.onload = () => {
                            const ratio = img.width / img.height;
                            const maxW = contentWidth;
                            const maxH = 240;
                            let w = maxW;
                            let h = maxW / ratio;

                            if (h > maxH) {
                                h = maxH;
                                w = maxH * ratio;
                            }

                            const x = margin + (contentWidth - w) / 2;
                            pdf.addImage(dataUrl, 'PNG', x, 22, w, h);
                            resolve();
                        };
                        img.onerror = resolve;
                        img.src = dataUrl;
                    });
                } catch (e) {
                    pdf.setFont('helvetica', 'normal');
                    pdf.setFontSize(10);
                    pdf.setTextColor(150, 150, 150);
                    pdf.text('[Bild konnte nicht geladen werden]', margin, 40);
                }
            } else {
                // Add text content
                pdf.addPage();
                addPageHeader(pdf, file.name);

                const content = file.content;
                const lines = content.split('\n');
                let y = 22;

                pdf.setFont('courier', 'normal');
                pdf.setFontSize(8);
                pdf.setTextColor(30, 30, 30);

                for (let li = 0; li < lines.length; li++) {
                    if (y > pageHeight - 20) {
                        pdf.addPage();
                        addPageHeader(pdf, file.name + ' (Fortsetzung)');
                        y = 22;
                    }

                    // Line number
                    pdf.setTextColor(180, 180, 180);
                    pdf.text(String(li + 1).padStart(4), margin, y);

                    // Content
                    pdf.setTextColor(30, 30, 30);
                    const line = lines[li].replace(/\t/g, '    ');
                    const wrapped = pdf.splitTextToSize(line, contentWidth - 14);

                    for (let wi = 0; wi < wrapped.length; wi++) {
                        if (y > pageHeight - 20) {
                            pdf.addPage();
                            addPageHeader(pdf, file.name + ' (Fortsetzung)');
                            y = 22;
                        }
                        pdf.text(wrapped[wi], margin + 12, y);
                        y += 4.2;
                    }
                }
            }
        }

        status.textContent = 'Erstelle ZIP…';

        // Create ZIP
        const JSZip = window.JSZip;
        const zip = new JSZip();

        // Add PDF
        zip.file(`Uebungsblatt${blattnr}.pdf`, pdf.output('arraybuffer'));

        // Add src folder with files
        const srcFolder = zip.folder('src');
        for (const file of sorted) {
            const ext = file.type.toLowerCase();
            if (['png', 'jpg', 'jpeg', 'gif'].includes(ext)) {
                const base64 = file.content.split(',')[1];
                srcFolder.file(file.name, base64, { base64: true });
            } else {
                srcFolder.file(file.name, file.content);
            }
        }

        // Download ZIP
        const blob = await zip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Uebungsblatt${blattnr}.zip`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        status.textContent = `✓ Uebungsblatt${blattnr}.zip wurde heruntergeladen!`;
        status.className = 'status ok';
    } catch (err) {
        console.error(err);
        status.textContent = 'Fehler: ' + err.message;
        status.className = 'status err';
    }

    generateBtn.disabled = false;
}

// Status message
function showStatus(message, type = 'ok') {
    status.textContent = message;
    status.className = `status ${type}`;
    
    setTimeout(() => {
        if (status.textContent === message) {
            status.textContent = '';
            status.className = 'status';
        }
    }, 3000);
}
