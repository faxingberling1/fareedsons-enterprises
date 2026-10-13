// Neo Gen Technologies - Proposal Interaction Logic for Fareedsons Enterprises

document.addEventListener('DOMContentLoaded', () => {
  // 1. Digital Signature Preview
  const signInput = document.getElementById('clientSignInput');
  const signaturePreview = document.getElementById('signaturePreview');
  
  if (signInput && signaturePreview) {
    signInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        signaturePreview.textContent = val;
      } else {
        signaturePreview.textContent = 'Fareedsons Enterprises';
      }
    });
  }

  // 2. Interactive Calculator / Package Selector
  const optPkg1 = document.getElementById('calcPkg1');
  const optPkg2 = document.getElementById('calcPkg2');
  const optPkg3 = document.getElementById('calcPkg3');

  const upfrontDisplay = document.getElementById('totalUpfront');
  const monthlyDisplay = document.getElementById('totalMonthly');

  function updateCalculator() {
    let upfront = 0;
    let monthly = 0;

    if (optPkg1 && (optPkg1.classList.contains('active') || optPkg1.classList.contains('selected'))) {
      upfront += 600;
    }

    if (optPkg2 && (optPkg2.classList.contains('active') || optPkg2.classList.contains('selected'))) {
      monthly += 108;
    }

    if (upfrontDisplay) {
      upfrontDisplay.textContent = `$${upfront}`;
    }

    if (monthlyDisplay) {
      if (monthly > 0) {
        monthlyDisplay.innerHTML = `$${monthly} <span style="font-size: 0.85rem; color: #166534; font-weight: 700;">/mo (All-Inclusive)</span>`;
      } else {
        monthlyDisplay.textContent = '$0/mo';
      }
    }
  }

  function setupToggle(el) {
    if (!el) return;
    el.addEventListener('click', () => {
      el.classList.toggle('active');
      el.classList.toggle('selected');
      const icon = el.querySelector('.checkbox-visual i, .custom-checkbox i');
      if (icon) {
        if (el.classList.contains('active') || el.classList.contains('selected')) {
          icon.style.display = 'block';
        } else {
          icon.style.display = 'none';
        }
      }
      updateCalculator();
    });
  }

  setupToggle(optPkg1);
  setupToggle(optPkg2);
  setupToggle(optPkg3);
  updateCalculator();

  // 3. Print / PDF Button
  const printBtns = document.querySelectorAll('.trigger-print');
  printBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.print();
    });
  });

  // 4. Smooth scroll navigation spy
  const navLinks = document.querySelectorAll('.subnav-list a, .nav-links a');
  const sections = document.querySelectorAll('section[id], div[id].section-target');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 5. Proposal Acceptance Handler
  const acceptanceForm = document.getElementById('proposalAcceptanceForm');
  const modal = document.getElementById('acceptanceModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const confirmedSigneeName = document.getElementById('confirmedSigneeName');
  const confirmationTimestamp = document.getElementById('confirmationTimestamp');

  if (acceptanceForm) {
    acceptanceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('clientSignInput').value.trim() || 'Fareedsons Enterprises';
      const agreeChecked = document.getElementById('termsAgreeCheck').checked;

      if (!agreeChecked) {
        alert('Please review and check the agreement checkbox before signing.');
        return;
      }

      if (confirmedSigneeName) confirmedSigneeName.textContent = clientName;
      if (confirmationTimestamp) {
        const now = new Date();
        confirmationTimestamp.textContent = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      }

      if (modal) {
        modal.classList.add('active');
      }
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});
