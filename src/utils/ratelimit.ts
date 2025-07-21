export function debounce<args extends unknown[]>(func: (...args: args) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }
}

export function throttle<args extends unknown[]>(func: (...args: args) => void, limit: number) {
  let inThrottle: boolean;
  return (...args: args) => {
    if (inThrottle) return;
    func(...args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  }
}