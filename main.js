// ============================================
// PORTFOLIO - MAIN.JS
// ============================================

console.log('🚀 Script chargé');

// ============================================
// ATTENDRE LE CHARGEMENT DU DOM
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  console.log('✅ DOM chargé');

  // ============================================
  // VARIABLES GLOBALES
  // ============================================
  const navLinks = document.querySelectorAll('.ul-list li a');
  const sections = document.querySelectorAll('section');
  const header = document.querySelector('header');
  
  console.log('📊 Éléments:', {
    navLinks: navLinks.length,
    sections: sections.length
  });

  // ============================================
  // FONCTION REMOVE ACTIVE
  // ============================================
  function removeActive() {
    navLinks.forEach(link => link.parentElement.classList.remove('active'));
  }

  // ============================================
  // NAVIGATION AU CLIC
  // ============================================
  navLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      
      console.log(`🎯 Navigation vers: ${targetId}`);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        removeActive();
        this.parentElement.classList.add('active');
      }
    });
  });

  // ============================================
  // DÉTECTION SCROLL - ACTIVE NAV
  // ============================================
  function updateActiveNav() {
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        removeActive();
        const activeLink = document.querySelector(`.ul-list li a[href="#${section.id}"]`);
        if (activeLink) {
          activeLink.parentElement.classList.add('active');
        }
      }
    });
  }

  // ============================================
  // SCROLL EVENT
  // ============================================
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Active navigation
    updateActiveNav();
    
    // Header background
    if (header) {
      if (currentScroll > 50) {
        header.style.background = 'rgba(15, 23, 42, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
      } else {
        header.style.background = 'rgba(15, 23, 42, 0.85)';
        header.style.boxShadow = 'none';
      }
    }
  });

  // ============================================
  // BACK TO TOP BUTTON
  // ============================================
  const backToTop = document.createElement('div');
  backToTop.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  backToTop.id = "back-to-top";
  document.body.appendChild(backToTop);

  backToTop.style.cssText = `
    position: fixed;
    bottom: 40px;
    right: 40px;
    background: #474af0;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    transition: transform 0.3s ease;
    box-shadow: 0 5px 15px rgba(71, 74, 240, 0.4);
  `;

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', () => {
    backToTop.style.display = window.pageYOffset > 500 ? "flex" : "none";
  });

  // ============================================
  // REVEAL ANIMATIONS
  // ============================================
  const revealElements = document.querySelectorAll('.home-container, .about-container, .projects-container, .services-container, .contact-content');
  
  revealElements.forEach(el => el.classList.add('reveal'));

  window.addEventListener('scroll', () => {
    revealElements.forEach(el => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;

      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active-reveal');
      }
    });
  });

  // ============================================
  // TYPING EFFECT
  // ============================================
  const typingElement = document.querySelector('.info-home h3');
  if (typingElement) {
    const words = ["Frontend Developer", "Designer", "Web Enthusiast", "Backend Developer"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      const displayedText = currentWord.substring(0, charIndex);
      
      typingElement.innerHTML = displayedText + '<span class="cursor" style="animation: blink 0.7s infinite;">|</span>';

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(type, 1000);
      }
    }

    const style = document.createElement('style');
    style.textContent = `
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
      .cursor {
        font-weight: normal;
        color: #474af0;
      }
    `;
    document.head.appendChild(style);
    
    // Démarrer après le loading screen
    setTimeout(() => type(), 4500);
  }

  // ============================================
  // LOADING SCREEN
  // ============================================
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    const loadingText = document.getElementById("loading-text");
    const mainIcon = document.querySelector(".main-icon");
    const subIcons = document.querySelectorAll(".sub-icons i");
    const designerText = document.getElementById("designer-text");

    function showElement(element, delay = 0) {
      if (element) {
        setTimeout(() => {
          element.classList.remove("hidden");
          element.classList.add("fall");
        }, delay);
      }
    }

    showElement(loadingText, 0);
    showElement(mainIcon, 800);
    subIcons.forEach((icon, idx) => {
      showElement(icon, 1600 + idx * 400);
    });
    showElement(designerText, 2800);

    setTimeout(() => {
      loadingScreen.style.opacity = '0';
      setTimeout(() => {
        loadingScreen.style.display = 'none';
      }, 500);
    }, 4000);
  }

  // ============================================
  // FORMULAIRE DE CONTACT
  // ============================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(contactForm);
      const data = {
        name: formData.get('user_name'),
        email: formData.get('user_email'),
        message: formData.get('message')
      };

      if (!data.name || !data.email || !data.message) {
        alert('Veuillez remplir tous les champs! ⚠️');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Email invalide! ✉️');
        return;
      }

      const submitButton = contactForm.querySelector('.btn-send');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Envoi en cours...';
      submitButton.disabled = true;

      setTimeout(() => {
        alert('Message envoyé avec succès! 🎉');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        const message = `Bonjour, je suis ${data.name}. ${data.message}`;
        const whatsappUrl = `https://wa.me/221760219352?text=${encodeURIComponent(message)}`;
        
        if (confirm('Voulez-vous aussi m\'envoyer un message sur WhatsApp?')) {
          window.open(whatsappUrl, '_blank');
        }
      }, 1500);
    });
  }

  // ============================================
  // BOUTON DOWNLOAD CV
  // ============================================
  const downloadCvBtn = document.querySelector('.btn-home2');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('CV téléchargé avec succès! 📄');
    });
  }

  // ============================================
  // BOUTON HIRE ME
  // ============================================
  const hireMeBtn = document.querySelector('.btn-home1');
  if (hireMeBtn) {
    hireMeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        setTimeout(() => {
          const firstInput = contactForm?.querySelector('input[name="user_name"]');
          if (firstInput) firstInput.focus();
        }, 1000);
      }
    });
  }

  console.log('✅ Portfolio initialisé!');
});

// ============================================
// SYSTÈME DE TRADUCTION FR/EN
// ============================================
let currentLang = localStorage.getItem('language') || 'en';

window.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');

  langButtons.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    }
    
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      langButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      updateLanguage(lang);
      localStorage.setItem('language', lang);
      currentLang = lang;
    });
  });

  function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-fr][data-en]');
    
    elements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (!text) return;
      
      if (el.tagName === 'BUTTON' || el.tagName === 'A') {
        const icon = el.querySelector('i');
        if (icon) {
          el.innerHTML = '';
          el.appendChild(icon.cloneNode(true));
          el.appendChild(document.createTextNode(' ' + text));
        } else {
          el.innerHTML = text;
        }
      } 
      else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        const placeholder = el.getAttribute(`data-placeholder-${lang}`);
        if (placeholder) {
          el.placeholder = placeholder;
        }
      }
      else {
        const icon = el.querySelector('i');
        if (icon) {
          el.innerHTML = '';
          el.appendChild(icon.cloneNode(true));
          el.appendChild(document.createTextNode(' ' + text));
        } else {
          el.innerHTML = text;
        }
      }
    });

    document.documentElement.lang = lang;
    console.log('🌍 Langue:', lang.toUpperCase());
  }

  // Appliquer la langue au chargement
  updateLanguage(currentLang);
});

// ============================================
// SYSTÈME DE THÈME CLAIR/SOMBRE
// ============================================
window.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const themeIcon = themeToggle.querySelector('i');
  let currentTheme = localStorage.getItem('theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'light') {
    themeIcon.className = 'fas fa-sun';
  } else {
    themeIcon.className = 'fas fa-moon';
  }

  themeToggle.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
      themeIcon.style.transform = 'rotate(0deg)';
    }, 200);
    
    localStorage.setItem('theme', newTheme);
    currentTheme = newTheme;
    console.log('🌓 Thème:', newTheme.toUpperCase());
  });

  themeIcon.style.transition = 'transform 0.4s ease';
});

console.log('✨ Portfolio chargé avec succès!');
// ============================================
// FORMULAIRE DE CONTACT - EMAILJS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = contactForm.querySelector('.btn-send');
      const originalText = submitButton.textContent;
      
      // Récupérer les données du formulaire
      const templateParams = {
        from_name: contactForm.user_name.value,
        reply_to: contactForm.user_email.value,
        message: contactForm.message.value,
        to_email: 'mohamedtine1975@gmail.com' // Ton email
      };
      
      console.log('📧 Données du formulaire:', templateParams);
      
      // Validation
      if (!templateParams.from_name || !templateParams.reply_to || !templateParams.message) {
        showNotification('Veuillez remplir tous les champs! ⚠️', 'error');
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(templateParams.reply_to)) {
        showNotification('Email invalide! ✉️', 'error');
        return;
      }
      
      // Désactiver le bouton
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi...';
      submitButton.disabled = true;
      submitButton.style.opacity = '0.7';
      
      try {
        console.log('📤 Tentative d\'envoi...');
        
        // 📧 ENVOI AVEC EMAILJS
        const response = await emailjs.send(
          'service_rpmq4yt',           // ✅ Ton Service ID
          'template_pje3dlj',          // ✅ Ton Template ID (à vérifier !)
          templateParams
        );
        
        console.log('✅ Email envoyé avec succès:', response);
        showNotification('Message envoyé avec succès! 🎉', 'success');
        contactForm.reset();
        
        // Proposition WhatsApp après 1.5s
        setTimeout(() => {
          const whatsappMsg = `Bonjour, je suis ${templateParams.from_name}. ${templateParams.message}`;
          const whatsappUrl = `https://wa.me/221760219352?text=${encodeURIComponent(whatsappMsg)}`;
          
          if (confirm('Voulez-vous aussi m\'envoyer un message sur WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
          }
        }, 1500);
        
      } catch (error) {
        console.error('❌ Erreur EmailJS complète:', error);
        console.error('Status:', error.status);
        console.error('Text:', error.text);
        showNotification(`Erreur: ${error.text || 'Réessayez!'} ❌`, 'error');
      } finally {
        setTimeout(() => {
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
          submitButton.style.opacity = '1';
        }, 1000);
      }
    });
  }
});

// ============================================
// SYSTÈME DE NOTIFICATIONS
// ============================================
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.textContent = message;
  
  Object.assign(notification.style, {
    position: 'fixed',
    top: '100px',
    right: '20px',
    padding: '20px 30px',
    borderRadius: '15px',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '600',
    zIndex: '10000',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    background: type === 'success' 
      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    animation: 'slideIn 0.5s ease'
  });
  
  // Animation
  const keyframes = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(100px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes slideOut {
      from { opacity: 1; transform: translateX(0); }
      to { opacity: 0; transform: translateX(100px); }
    }
  `;
  
  if (!document.getElementById('notif-style')) {
    const style = document.createElement('style');
    style.id = 'notif-style';
    style.textContent = keyframes;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}