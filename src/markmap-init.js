export default function () {
  const { Markmap, Toolbar, deriveOptions } = window.markmap
  const resize = {
    event: new Event('resize'),
    observer: new ResizeObserver((entries) =>
      entries.forEach((entry) => entry.target.dispatchEvent(resize.event))
    ),
    observe: (el, func) => {
      resize.observer.observe(el)
      el.addEventListener('resize', func)
    },
  }
  const debounce = (callback, wait) => {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => callback.apply(this, args), wait);
    };
  }
  const toobar = (markmapInstance) => {
    const toobar = Toolbar.create(markmapInstance)
    toobar.setBrand(false)
    Object.assign(toobar.el.style, {
      position : 'absolute',
      bottom : '0.5rem',
      right : '0.5rem',
    })
    return toobar.el
  }
  
  document.querySelectorAll('.markmap-wrap').forEach((wrap) => {
    const [ root, jsonOptions ] = [].slice.call(wrap.children).map(el => JSON.parse(el.innerHTML))
    wrap.innerHTML = '<svg></svg>'
    const svg = wrap.querySelector('svg')
    const markmapInstance = Markmap.create(svg, deriveOptions(jsonOptions), root)
    wrap.append(toobar(markmapInstance))
    resize.observe(wrap, debounce(()=>markmapInstance.fit(), 100))
  })
  
}

