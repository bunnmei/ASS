let w = window.innerWidth

window.addEventListener('resize', () => {
  if (w === window.innerWidth) return
  w = window.innerWidth
  console.log(w)
})