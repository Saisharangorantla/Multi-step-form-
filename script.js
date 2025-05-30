let currentStep = 0;
const steps = document.querySelectorAll('.step');
const indicators = document.querySelectorAll('.step-icon');

function showStep(step) {
  steps.forEach((s, i) => s.classList.toggle('active', i === step));
  indicators.forEach((el, i) => el.classList.toggle('active', i === step));
  document.getElementById('prevBtn').style.display = step === 0 ? 'none' : 'inline';
  document.getElementById('nextBtn').style.display = step === steps.length - 1 ? 'none' : 'inline';

  if (step === steps.length - 1) {
    const formData = new FormData(document.getElementById('multiStepForm'));
    const summary = [...formData.entries()]
      .map(([k, v]) => `<p><strong>${k}</strong>: ${v}</p>`).join('');
    document.getElementById('summary').innerHTML = summary;
  }
}
function downloadSummary() {
    const text = document.getElementById("summary").textContent;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form-summary.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
function changeStep(dir) {
  const inputs = steps[currentStep].querySelectorAll('input, select');

  if (dir === 1) {
    for (let input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
    }
  }

  currentStep += dir;
  showStep(currentStep);
}

document.getElementById('multiStepForm').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Form Submitted Successfully!");


});

showStep(currentStep);
