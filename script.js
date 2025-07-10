window.addEventListener('DOMContentLoaded', () => {
  // بعد 100ms ضيف الكلاس عشان تظهر الحركات
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);
});
