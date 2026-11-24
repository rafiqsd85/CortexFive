
const cgpaInput = document.getElementById('cgpa');
const cgpaProgress = document.getElementById('cgpaProgress');
const cgpaFeedback = document.getElementById('cgpaFeedback');

if (cgpaInput && cgpaProgress && cgpaFeedback) {

    function updateCGPA() {
        const value = parseFloat(cgpaInput.value);

        if (cgpaInput.value === '' || isNaN(value)) {
            cgpaProgress.style.width = '0%';
            cgpaFeedback.textContent =
                'Enter your latest CGPA on a 4.00 scale.';
            return;
        }

        if (value < 0 || value > 4) {
            cgpaProgress.style.width = '0%';
            cgpaFeedback.textContent =
                'CGPA must be between 0.00 and 4.00.';
            return;
        }

        const percentage = (value / 4) * 100;

        cgpaProgress.style.width = percentage + '%';

        cgpaFeedback.textContent =
            `Your CGPA: ${value.toFixed(2)} out of 4.00`;
    }

    cgpaInput.addEventListener('input', updateCGPA);

    updateCGPA();
}


// Prevent accidental invalid CGPA submission
const profileForm = document.getElementById('profileForm');

if (profileForm) {
    profileForm.addEventListener('submit', function (event) {

        const cgpa = parseFloat(cgpaInput.value);

        if (
            !cgpaInput.value ||
            isNaN(cgpa) ||
            cgpa < 0 ||
            cgpa > 4
        ) {
            event.preventDefault();
            cgpaInput.focus();
            alert('Please enter a valid CGPA between 0.00 and 4.00.');
        }
    });
}
