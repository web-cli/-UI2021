export const initRem = (psdWidth = 750, maxSize = Infinity) => {
  // 当页面宽度为 psdWidth 时，1rem 对应 100 px
  const baseSize = 100
  console.log(888)
  function setRem () {
    // 当前页面宽度相对于 psdWidth 宽的缩放比例
    const scale = document.documentElement.clientWidth / psdWidth
    // 设置页面根节点字体大小
    const size = Math.min(baseSize * scale, maxSize)
    document.documentElement.style.fontSize = size + 'px'
  }
  // 初始化
  setRem()
  // 改变窗口大小时重新设置 rem
  window.addEventListener('resize', setRem)
}
