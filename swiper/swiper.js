const sideMenuSwiper = (target, onTouchEnd) => {
  let startX;
  let currentX;
  let startY;
  let currentY;
  let initialTranslateX; 
  let dir = null;

  const touchStart = (e) => {
    [startX, startY] = [e.touches[0].clientX, e.touches[0].clientY];
    [currentX, currentY] = [startX, startY];
    const transformStyle = window.getComputedStyle(target).getPropertyValue('transform');
    initialTranslateX = parseFloat(transformStyle.split(',')[4].trim()); // 초기 translateX 값 저장
  };

  const touchMove = (e) => {
    currentX = e.touches[0].clientX;
    currentY = e.touches[0].clientY;
    
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    
    if (Math.abs(deltaX) > 10 && dir !== 'vertical') {
      const move = initialTranslateX + deltaX;

      target.style.transition = '0s';
      target.style.transform = `translateX(${move > 0 ? 0 : move}px)`; 

      dir = 'horizontal'; 
    }

    if (Math.abs(deltaY) > 10 && dir === null) {
      dir = 'vertical';
    }
  };

  const touchEnd = () => {
    const deltaX = currentX - startX;
    target.style.transition = '0.15s';

    
    if (Math.abs(deltaX) > 100 && dir === 'horizontal') {
      onTouchEnd();
    } else {
      target.style.transform = `translateX(${initialTranslateX}px)`;
    }

    dir = null;
  };

  return { touchStart, touchMove, touchEnd };
};

