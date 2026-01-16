/* ================================
   ТАЙМЛАЙН И СТРОИТЕЛЬСТВО
   ================================ */

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
});

function initTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Снимаем активность с предыдущего
      timelineItems.forEach(el => el.classList.remove('active'));
      document.querySelectorAll('.timeline-content').forEach(el => el.classList.remove('active'));

      // Добавляем активность текущему
      item.classList.add('active');
      const contentId = item.getAttribute('data-timeline');
      const content = document.getElementById(contentId);
      if (content) {
        content.classList.add('active');
      }
    });

    // Первый элемент активен по умолчанию
    if (index === 0) {
      item.click();
    }
  });
}
