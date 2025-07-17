/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return (...args: unknown[]) => {
    clearTimeout(timer);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    timer = setTimeout(() => func(...args), delay);
  }
}

export function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return (...args: unknown[]) => {
    if (inThrottle) return;
    console.log(new Date(Date.now()).toISOString())
    console.log(inThrottle);
    func(...args);
    inThrottle = true;
    setTimeout(() => (inThrottle = false), limit);
  }
}