const matrixAlphabet = 'ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσ/ςΤτΥυΦφΧχΨψΩωabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@+-=*:≠≤≥<>±≡∞!⊗≈∩∪⊆⊄⊇⊅∈∉Øℕℤℝℂℚ∨|¬⇒⇔∀∃∫∮∇'
const matrixFontSize = 11

const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

const matrixCanvas = document.getElementById('matrix-canvas')
const matrixCtx = matrixCanvas.getContext('2d')

let matrixAnimationInterval = null // Interval ID for the animation loop
let matrixTotalColumns = 0 // Number of columns for the rain
const matrixDrops = [] // An array of drops per column

function getViewportSize () {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  return { vw, vh }
}

function resizeMatrixCanvas () {
  const dpr = Math.max(window.devicePixelRatio || 1, 1)
  const { vw, vh } = getViewportSize()

  const bw = Math.max(1, Math.round(vw * dpr))
  const bh = Math.max(1, Math.round(vh * dpr))
  if (matrixCanvas.width !== bw || matrixCanvas.height !== bh) {
    matrixCanvas.width = bw
    matrixCanvas.height = bh
  }

  matrixCtx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const previousColumns = matrixTotalColumns
  matrixTotalColumns = Math.floor(matrixCanvas.width / matrixFontSize)

  // If resize introduced new columns, seed their initial drop positions
  if (matrixTotalColumns > previousColumns) {
    for (let x = previousColumns; x < matrixTotalColumns; x++) {
      matrixDrops[x] = Math.random() * matrixCanvas.height / 5
    }
  }

  drawDrops()
}

resizeMatrixCanvas()
window.addEventListener('resize', resizeMatrixCanvas, { passive: true })
window.addEventListener('orientationchange', resizeMatrixCanvas, { passive: true })

function drawDrops () {
  // Draw background for the canvas
  // Needs to be translucent to show trails
  matrixCtx.fillStyle = 'rgba(0, 0, 0, 0.04)'
  matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height)

  // Draw green text for drops
  matrixCtx.fillStyle = '#008800'
  matrixCtx.font = matrixFontSize + 'px arial'

  // Loop over all drops
  for (let i = 0; i < matrixTotalColumns; i++) {
    // Select a random character and display it
    const text = matrixAlphabet[Math.floor(Math.random() * matrixAlphabet.length)]
    matrixCtx.fillText(text, i * matrixFontSize, matrixDrops[i] * matrixFontSize)
  }
}

function updateDrops() {
  for (let i = 0; i < matrixTotalColumns; i++) {
    // Send the drop back to the top randomly after it has crossed the screen
    // Add a randomness to the reset to make the drops scattered on the Y axis
    if (matrixDrops[i] * matrixFontSize > matrixCanvas.height && Math.random() > 0.975) {
      matrixDrops[i] = 0
    }

    // Increment Y coordinate
    matrixDrops[i]++
  }

  drawDrops()
}

function syncAnimationWithMotionPreference () {
  if (reducedMotionQuery.matches) {
    if (matrixAnimationInterval !== null) {
      clearInterval(matrixAnimationInterval)
      matrixAnimationInterval = null
    }
    return
  }

  if (matrixAnimationInterval === null) {
    matrixAnimationInterval = setInterval(updateDrops, 35)
  }
}

// Seed the initial drop positions for all columns
for (let x = 0; x < matrixTotalColumns; x++) {
  matrixDrops[x] = Math.random() * matrixCanvas.height / 5
}

for (let i = 0; i < 40; i++) {
  updateDrops()
}

syncAnimationWithMotionPreference()
reducedMotionQuery.addEventListener('change', syncAnimationWithMotionPreference)
