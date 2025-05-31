document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resume-form');
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const resetBtn = document.getElementById('reset-form');
    const educationEntries = document.getElementById('education-entries');
    const experienceEntries = document.getElementById('experience-entries');
    const themeToggle = document.getElementById('theme-toggle');
    const progressBar = document.getElementById('form-progress');
    const progressText = document.getElementById('progress-text');

    // Load saved data from localStorage
    loadSavedData();

    // Theme Toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    // Add Education Entry
    addEducationBtn.addEventListener('click', () => {
        const entry = document.createElement('div');
        entry.classList.add('education-entry');
        entry.innerHTML = `
            <div class="form-group">
                <label for="degree">Degree</label>
                <input type="text" name="degree" placeholder="e.g., Bachelor of Science">
            </div>
            <div class="form-group">
                <label for="institution">Institution</label>
                <input type="text" name="institution" placeholder="e.g., University of Example">
            </div>
            <div class="form-group">
                <label for="edu-year">Year</label>
                <input type="text" name="edu-year" placeholder="e.g., 2018-2022">
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        educationEntries.appendChild(entry);
        updateProgress();
        saveData();
    });

    // Add Experience Entry
    addExperienceBtn.addEventListener('click', () => {
        const entry = document.createElement('div');
        entry.classList.add('experience-entry');
        entry.innerHTML = `
            <div class="form-group">
                <label for="job-title">Job Title</label>
                <input type="text" name="job-title" placeholder="e.g., Software Engineer">
            </div>
            <div class="form-group">
                <label for="company">Company</label>
                <input type="text" name="company" placeholder="e.g., Tech Corp">
            </div>
            <div class="form-group">
                <label for="exp-year">Years</label>
                <input type="text" name="exp-year" placeholder="e.g., 2020-2023">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea name="description" placeholder="Describe your responsibilities and achievements"></textarea>
                <span class="char-count">0/1000 characters</span>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        experienceEntries.appendChild(entry);
        updateProgress();
        saveData();
    });

    // Remove Entry
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
            updatePreview();
            updateProgress();
            saveData();
        }
    });

    // Reset Form
    resetBtn.addEventListener('click', () => {
        form.reset();
        educationEntries.innerHTML = `
            <div class="education-entry">
                <div class="form-group">
                    <label for="degree">Degree</label>
                    <input type="text" name="degree" placeholder="e.g., Bachelor of Science">
                </div>
                <div class="form-group">
                    <label for="institution">Institution</label>
                    <input type="text" name="institution" placeholder="e.g., University of Example">
                </div>
                <div class="form-group">
                    <label for="edu-year">Year</label>
                    <input type="text" name="edu-year" placeholder="e.g., 2018-2022">
                </div>
                <button type="button" class="remove-btn">Remove</button>
            </div>
        `;
	      experienceEntries.innerHTML = `
            <div class="experience-entry">
                <div class="form-group">
                    <label for="job-title">Job Title</label>
                    <input type="text" name="job-title <input type="text" name="job-title" placeholder="e.g., Software Engineer">
                </div>
                <div class="form-group">
                    <label for="company">Company</label>
                    <input type="text" name="company" placeholder="e.g., Tech Corp">
                </div>
                <div class="form-group">
                    <label for="exp-year">Years</label>
                    <input type="text" name="exp-year" placeholder="e.g., 2020-2023">
                </div>
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea name="description" placeholder="Describe your responsibilities and achievements"></textarea>
                    <span class="char-count">0/1000 characters</span>
                </div>
                <button type="button" class="remove-btn">Remove</button>
            </div>
        `;
        updatePreview();
        updateProgress();
        localStorage.removeItem('resumeData');
    });

    // Character Count for Textareas
    document.addEventListener('input', (e) => {
        if (e.target.tagName === 'TEXTAREA') {
            const maxLength = e.target.name === 'summary' ? 500 : 1000;
            const count = e.target.value.length;
            const charCount = e.target.nextElementSibling;
            charCount.textContent = `${count}/${maxLength} characters`;
            if (count > maxLength) {
                e.target.value = e.target.value.substring(0, maxLength);
                charCount.textContent = `${maxLength}/${maxLength} characters`;
            }
        }
    });

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        updatePreview();
    });

    // Real-time Preview Update
    form.addEventListener('input', () => {
        updatePreview();
        updateProgress();
お客様は、データ保存のコードを以下に追加する必要があります。
        saveData();
    });

    // Update Resume Preview
    function updatePreview() {
        // Personal Info
        const fullName = document.getElementById('full-name').value || 'Your Name';
        const email = document.getElementById('email').value || 'Email';
        const phone = document.getElementById('phone').value || 'Phone';
        const address = document.getElementById('address').value || 'Address';
        const summary = document.getElementById('summary').value || 'Your professional summary will appear here.';

        document.getElementById('preview-name').textContent = fullName;
        document.getElementById('preview-contact').textContent = `${email} | ${phone} | ${address}`;
        document.getElementById('preview-summary').textContent = summary;

        // Education
        const educationList = document.getElementById('preview-education');
        educationList.innerHTML = '';
        const educationEntries = document.querySelectorAll('.education-entry');
        educationEntries.forEach(entry => {
            const degree = entry.querySelector('[name="degree"]').value;
            const institution = entry.querySelector('[name="institution"]').value;
            const year = entry.querySelector('[name="edu-year"]').value;
            if (degree || institution || year) {
                const li = document.createElement('li');
                li.textContent = `${degree} - ${institution} (${year})`;
                educationList.appendChild(li);
            }
        });

        // Experience
        const experienceList = document.getElementById('preview-experience');
        experienceList.innerHTML = '';
        const experienceEntries = document.querySelectorAll('.experience-entry');
        experienceEntries.forEach(entry => {
            const jobTitle = entry.querySelector('[name="job-title"]').value;
            const company = entry.querySelector('[name="company"]').value;
            const year = entry.querySelector('[name="exp-year"]').value;
            const description = entry.querySelector('[name="description"]').value;
            if (jobTitle || company || year || description) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${jobTitle}</strong> - ${company} (${year})<br>${description}`;
                experienceList.appendChild(li);
            }
        });

        // Skills
        const skillsInput = document.getElementById('skills').value;
        const skillsList = document.getElementById('preview-skills');
        skillsList.innerHTML = '';
        if (skillsInput) {
            const skills = skillsInput.split(',').map(skill => skill.trim());
            skills.forEach(skill => {
                if (skill) {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                }
            });
        }
    }

    // Update Progress Bar
    function updateProgress() {
        const inputs = form.querySelectorAll('input, textarea');
        let filled = 0;
        const total = inputs.length;

        inputs.forEach(input => {
            if (input.value.trim()) {
                filled++;
            }
        });

        const percentage = Math.round((filled / total) * 100);
        progressBar.value = percentage;
        progressText.textContent = `${percentage}%`;
    }

    // Save Data to localStorage
    function saveData() {
        const formData = {
            fullName: document.getElementById('full-name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            summary: document.getElementById('summary').value,
            skills: document.getElementById('skills').value,
            education: Array.from(document.querySelectorAll('.education-entry')).map(entry => ({
                degree: entry.querySelector('[name="degree"]').value,
                institution: entry.querySelector('[name="institution"]').value,
                year: entry.querySelector('[name="edu-year"]').value
            })),
            experience: Array.from(document.querySelectorAll('.experience-entry')).map(entry => ({
                jobTitle: entry.querySelector('[name="job-title"]').value,
                company: entry.querySelector('[name="company"]').value,
                year: entry.querySelector('[name="exp-year"]').value,
                description: entry.querySelector('[name="description"]').value
            }))
        };
        localStorage.setItem('resumeData', JSON.stringify(formData));
    }

    // Load Data from localStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const formData = JSON.parse(savedData);

            document.getElementById('full-name').value = formData.fullName || '';
            document.getElementById('email').value = formData.email || '';
            document.getElementById('phone').value = formData.phone || '';
            document.getElementById('address').value = formData.address || '';
            document.getElementById('summary').value = formData.summary || '';
            document.getElementById('skills').value = formData.skills || '';

            // Load Education
            educationEntries.innerHTML = '';
            formData.education.forEach(edu => {
                const entry = document.createElement('div');
                entry.classList.add('education-entry');
                entry.innerHTML = `
                    <div class="form-group">
                        <label for="degree">Degree</label>
                        <input type="text" name="degree" value="${edu.degree}" placeholder="e.g., Bachelor of Science">
                    </div>
                    <div class="form-group">
                        <label for="institution">Institution</label>
                        <input type="text" name="institution" value="${edu.institution}" placeholder="e.g., University of Example">
                    </div>
                    <div class="form-group">
                        <label for="edu-year">Year</label>
                        <input type="text" name="edu-year" value="${edu.year}" placeholder="e.g., 2018-2022">
                    </div>
                    <button type="button" class="remove-btn">Remove</button>
                `;
                educationEntries.appendChild(entry);
            });

            // Load Experience
            experienceEntries.innerHTML = '';
            formData.experience.forEach(exp => {
                const entry = document.createElement('div');
                entry.classList.add('experience-entry');
                entry.innerHTML = `
                    <div class="form-group">
                        <label for="job-title">Job Title</label>
                        <input type="text" name="job-title" value="${exp.jobTitle}" placeholder="e.g., Software Engineer">
                    </div>
                    <div class="form-group">
                        <label for="company">Company</label>
                        <input type="text" name="company" value="${exp.company}" placeholder="e.g., Tech Corp">
                    </div>
                    <div class="form-group">
                        <label for="exp-year">Years</label>
                        <input type="text" name="exp-year" value="${exp.year}" placeholder="e.g., 2020-2023">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea name="description" placeholder="Describe your responsibilities and achievements">${exp.description}</textarea>
                        <span class="char-count">${exp.description.length}/1000 characters</span>
                    </div>
                    <button type="button" class="remove-btn">Remove</button>
                `;
                experienceEntries.appendChild(entry);
            });

            updatePreview();
            updateProgress();
        }
    }

    // Download as PDF (using browser's print function)
    document.getElementById('download-btn').addEventListener('click', () => {
        const preview = document.getElementById('resume-preview');
        const opt = {
            margin: 1,
            filename: 'resume.pdf',
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        // Note: html2pdf library is not included for simplicity.
        // For actual PDF download, include html2pdf.js via CDN and uncomment below.
        // html2pdf().from(preview).set(opt).save();
        window.print(); // Fallback to print dialog
    });
});
