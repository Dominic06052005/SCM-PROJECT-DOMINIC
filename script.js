document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const summary = document.getElementById('summary');
    const skills = document.getElementById('skills');
    const addEducationBtn = document.getElementById('add-education');
    const addExperienceBtn = document.getElementById('add-experience');
    const resetFormBtn = document.getElementById('reset-form');
    const themeToggle = document.getElementById('theme-toggle');
    const formProgress = document.getElementById('form-progress');
    const progressText = document.getElementById('progress-text');
    const downloadBtn = document.getElementById('download-btn');

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Character count for textareas
    const updateCharCount = (textarea, countElement, maxLength) => {
        const count = textarea.value.length;
        countElement.textContent = `${count}/${maxLength} characters`;
        countElement.classList.toggle('exceeded', count > maxLength);
        textarea.style.borderColor = count > maxLength ? '#e74c3c' : '';
    };

    summary.addEventListener('input', () => {
        updateCharCount(summary, summary.nextElementSibling, 500);
    });

    // Input validation
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^\+?[\d\s-]{10,}$/;
        return phone === '' || re.test(phone);
    };

    // Progress bar calculation
    const updateProgress = () => {
        const inputs = resumeForm.querySelectorAll('input:not([type="button"]), textarea');
        let filledFields = 0;
        let totalFields = 0;

        inputs.forEach(input => {
            if (!input.closest('.education-entry') && !input.closest('.experience-entry')) {
                totalFields++;
                if (input.value.trim() !== '') filledFields++;
            }
        });

        const educationEntries = document.querySelectorAll('.education-entry');
        const experienceEntries = document.querySelectorAll('.experience-entry');
        
        educationEntries.forEach(entry => {
            const entryInputs = entry.querySelectorAll('input');
            totalFields += entryInputs.length;
            entryInputs.forEach(input => {
                if (input.value.trim() !== '') filledFields++;
            });
        });

        experienceEntries.forEach(entry => {
            const entryInputs = entry.querySelectorAll('input, textarea');
            totalFields += entryInputs.length;
            entryInputs.forEach(input => {
                if (input.value.trim() !== '') filledFields++;
            });
        });

        const progress = totalFields ? Math.round((filledFields / totalFields) * 100) : 0;
        formProgress.value = progress;
        progressText.textContent = `${progress}%`;
    };

    // Update progress on input
    resumeForm.addEventListener('input', updateProgress);

    // Add education entry
    addEducationBtn.addEventListener('click', () => {
        const educationEntries = document.getElementById('education-entries');
        const newEntry = document.createElement('div');
        newEntry.className = 'education-entry';
        newEntry.innerHTML = `
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
        educationEntries.appendChild(newEntry);
        updateProgress();
    });

    // Add experience entry
    addExperienceBtn.addEventListener('click', () => {
        const experienceEntries = document.getElementById('experience-entries');
        const newEntry = document.createElement('div');
        newEntry.className = 'experience-entry';
        newEntry.innerHTML = `
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
        experienceEntries.appendChild(newEntry);
        newEntry.querySelector('textarea').addEventListener('input', (e) => {
            updateCharCount(e.target, e.target.nextElementSibling, 1000);
        });
        updateProgress();
    });

    // Remove entry
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            e.target.parentElement.remove();
            updateProgress();
        }
    });

    // Form submission
    resumeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (!validateEmail(email.value)) {
            alert('Please enter a valid email address');
            email.focus();
            return;
        }

        if (!validatePhone(phone.value)) {
            alert('Please enter a valid phone number with at least 10 digits');
            phone.focus();
            return;
        }

        // Update preview
        document.getElementById('preview-name').textContent = fullName.value || 'Your Name';
        document.getElementById('preview-contact').textContent = [
            email.value,
            phone.value,
            address.value
        ].filter(Boolean).join(' | ') || 'Email | Phone | Address';
        document.getElementById('preview-summary').textContent = summary.value || 'Your professional summary will appear here.';

        // Education preview
        const educationList = document.getElementById('preview-education');
        educationList.innerHTML = '';
        document.querySelectorAll('.education-entry').forEach(entry => {
            const degree = entry.querySelector('input[name="degree"]').value;
            const institution = entry.querySelector('input[name="institution"]').value;
            const year = entry.querySelector('input[name="edu-year"]').value;
            if (degree || institution || year) {
                const li = document.createElement('li');
                li.textContent = [degree, institution, year].filter(Boolean).join(', ');
                educationList.appendChild(li);
            }
        });

        // Experience preview
        const experienceList = document.getElementById('preview-experience');
        experienceList.innerHTML = '';
        document.querySelectorAll('.experience-entry').forEach(entry => {
            const jobTitle = entry.querySelector('input[name="job-title"]').value;
            const company = entry.querySelector('input[name="company"]').value;
            const year = entry.querySelector('input[name="exp-year"]').value;
            const description = entry.querySelector('textarea[name="description"]').value;
            if (jobTitle || company || year || description) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${jobTitle || 'Job Title'}</strong><br>
                    ${company || 'Company'}, ${year || 'Years'}<br>
                    ${description || 'Description'}`;
                experienceList.appendChild(li);
            }
        });

        // Skills preview
        const skillsList = document.getElementById('preview-skills');
        skillsList.innerHTML = '';
        if (skills.value) {
            skills.value.split(',').forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill.trim();
                skillsList.appendChild(li);
            });
        }
    });

    // Reset form
    resetFormBtn.addEventListener('click', () => {
        resumeForm.reset();
        document.querySelectorAll('.education-entry:not(:first-child)').forEach(entry => entry.remove());
        document.querySelectorAll('.experience-entry:not(:first-child)').forEach(entry => entry.remove());
        document.querySelectorAll('.char-count').forEach(count => {
            count.textContent = count.classList.contains('exceeded') ? '0/1000 characters' : '0/500 characters';
            count.classList.remove('exceeded');
        });
        document.querySelectorAll('textarea').forEach(textarea => {
            textarea.style.borderColor = '';
        });
        // Reset preview
        document.getElementById('preview-name').textContent = 'Your Name';
        document.getElementById('preview-contact').textContent = 'Email | Phone | Address';
        document.getElementById('preview-summary').textContent = 'Your professional summary will appear here.';
        document.getElementById('preview-education').innerHTML = '';
        document.getElementById('preview-experience').innerHTML = '';
        document.getElementById('preview-skills').innerHTML = '';
        updateProgress();
    });

    // Download as PDF (placeholder)
    downloadBtn.addEventListener('click', () => {
        alert('PDF download functionality requires additional libraries like jsPDF. Would you like to implement this?');
    });

    // Initial progress update
    updateProgress();
});
