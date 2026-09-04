/* ==========================================================================
   Academia V.O2 Fitness Sapezal - Script do Site Oficial
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Número oficial de atendimento via WhatsApp
  const WHATSAPP_NUMBER = '5565999999999';

  // Elementos do DOM
  const header = document.querySelector('.header');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navLinksItems = document.querySelectorAll('.nav-links a');
  const cadastroForm = document.getElementById('cadastroForm');
  const telefoneInput = document.getElementById('form-telefone');
  const planoSelect = document.getElementById('form-plano');
  const modalidadeSelect = document.getElementById('form-modalidade');
  const turnoSelect = document.getElementById('form-turno');
  const experienciaSelect = document.getElementById('form-experiencia');
  const planButtons = document.querySelectorAll('.btn-select-plan');

  /* --------------------------------------------------------------------------
     1. Header Scrolled Effect
     -------------------------------------------------------------------------- */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    highlightActiveSection();
  });

  /* --------------------------------------------------------------------------
     2. Mobile Menu Toggle
     -------------------------------------------------------------------------- */
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    navLinksItems.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. Highlighting da Seção Ativa na Nav
     -------------------------------------------------------------------------- */
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Máscara Institucional de Telefone
     -------------------------------------------------------------------------- */
  if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);
      
      if (value.length > 10) {
        value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
      } else if (value.length > 6) {
        value = value.replace(/^(\d{2})(\d{4,5})/, '($1) $2-');
      } else if (value.length > 2) {
        value = value.replace(/^(\d{2})/, '($1) ');
      }
      
      e.target.value = value;
    });
  }

  /* --------------------------------------------------------------------------
     5. Seleção de Plano a partir da Tabela de Valores
     -------------------------------------------------------------------------- */
  planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedPlan = button.getAttribute('data-plan');
      
      if (planoSelect && selectedPlan) {
        planoSelect.value = selectedPlan;
      }
      
      const targetSection = document.getElementById('pre-cadastro');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* --------------------------------------------------------------------------
     6. Envio Formal da Pré-Matrícula para o WhatsApp da Empresa
     -------------------------------------------------------------------------- */
  if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nome = document.getElementById('form-nome').value.trim();
      const telefone = document.getElementById('form-telefone').value.trim();
      const modalidade = modalidadeSelect ? modalidadeSelect.value : 'Musculação';
      const plano = planoSelect ? planoSelect.value : 'Plano Mensal';
      const turno = turnoSelect ? turnoSelect.value : 'Seg-Sex: Manhã (05h00 às 12h00)';
      const experiencia = experienciaSelect ? experienciaSelect.value : 'Iniciante';

      if (!nome || !telefone) {
        alert('Por favor, preencha o seu nome e telefone para contato.');
        return;
      }

      // Mensagem institucional formal para o WhatsApp
      const message = 
`🏋️ *SOLICITAÇÃO DE PRÉ-MATRÍCULA — ACADEMIA V.O2 FITNESS SAPEZAL*

Prezada equipe de atendimento,

Gostaria de solicitar as orientações para efetivação da minha matrícula. Seguem as informações de cadastro:

📋 *DADOS DO SOLICITANTE:*
• *Nome Completo:* ${nome}
• *Telefone / WhatsApp:* ${telefone}
• *Modalidade de Interesse:* ${modalidade}
• *Plano Escolhido:* ${plano}
• *Turno Preferencial:* ${turno}
• *Prática Anterior:* ${experiencia}

📍 *Unidade:* Sapezal - MT

_Aguardo o retorno com as instruções de matrícula. Atenciosamente._`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    });
  }
});
