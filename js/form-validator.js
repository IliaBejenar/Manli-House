/* ================================
   ВАЛИДАЦИЯ ФОРМЫ
   ================================ */

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) return;
    this.init();
  }

  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    
    // Валидация при вводе
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const errorMsg = field.parentElement.querySelector('.error-message');
    let isValid = true;
    let message = '';

    if (field.name === 'name') {
      if (value.length < 2) {
        isValid = false;
        message = 'Имя должно содержать минимум 2 символа';
      }
    } else if (field.name === 'phone') {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
        message = 'Введите корректный номер телефона';
      }
    } else if (field.name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        isValid = false;
        message = 'Введите корректный email';
      }
    } else if (field.name === 'message') {
      if (value.length < 5) {
        isValid = false;
        message = 'Сообщение должно содержать минимум 5 символов';
      }
    }

    if (isValid) {
      field.classList.remove('error');
      if (errorMsg) errorMsg.classList.remove('show');
    } else {
      field.classList.add('error');
      if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.classList.add('show');
      }
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    const fields = this.form.querySelectorAll('input, textarea');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      this.showSuccess();
      this.form.reset();
    }
  }

  showSuccess() {
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      padding: 1rem;
      background-color: #d4edda;
      color: #155724;
      border-radius: 8px;
      margin-bottom: 1rem;
      animation: fadeIn 0.3s ease;
    `;
    successMsg.textContent = '✓ Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.';
    
    const form = this.form;
    form.parentElement.insertBefore(successMsg, form);

    setTimeout(() => {
      successMsg.remove();
    }, 5000);
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator('contactForm');
});
