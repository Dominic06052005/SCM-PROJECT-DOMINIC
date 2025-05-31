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
