let w = window.innerWidth

window.addEventListener('resize', () => {
  if (w === window.innerWidth) return
  w = window.outerWidth
  console.log(w)
  console.log(window.innerHeight)
})