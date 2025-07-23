// Debouncing delays the execution of the function to avoid double click.
// Only use when timely user feedback isn't necessary.
export function debounce<args extends unknown[]>(func: (...args: args) => void, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  }
}

// Throttling ensure the function is only called once every limit milliseconds, renduring subsequent calls to the function useless.
// Use when user feedback must be timely.
export function throttle<args extends unknown[]>(func: (...args: args) => void, limit: number) {
  let inThrottle: boolean;
  return (...args: args) => {
    if (inThrottle) return;
    func(...args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  }
}