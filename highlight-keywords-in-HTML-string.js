/*

Suppose you are implementing an auto-complete in search input.

When keywords are typed, you need to highlight the keywords, how would you do that?

To simplify things, you need to create a function highlightKeywords(html:string, keywords: string[]), which wraps the keywords in html string, with <em> tag.

Here is an example.

highlightKeywords(
  'Hello FrontEnd Lovers', 
  ['Hello', 'Front', 'JavaScript']
)
// '<em>Hello</em> <em>Front</em>End Lovers'
Pay attention to the overlapping and adjacent case. You should use the least tags as possible.

highlightKeywords(
  'Hello FrontEnd Lovers', 
  ['Front', 'End', 'JavaScript']
)
// 'Hello <em>FrontEnd</em> Lovers'

highlightKeywords(
  'Hello FrontEnd Lovers', 
  ['Front', 'FrontEnd', 'JavaScript']
)
// 'Hello <em>FrontEnd</em> Lovers'
note that space should not be included.

*/

// This is a JavaScript coding question from BFE.dev
/**
 * @param {string} html
 * @param {string[]} keywords
 */
function highlightKeywords(html, keywords) {
  // your code here
  let res = ''
  const n = html.length
  let idx = 0, len = 0
  while(idx < n) {
    let tmp = []
    const ch = html[idx]
    for(const e of keywords) {
      if(e[len] === ch) {
        tmp.push(e)
      }
    }
    const cand = []
    while(tmp.length) {
      len++
      const size = tmp.length, nxt = []
      for(let i = 0; i < size; i++) {
        const kw = tmp[i]
        if(kw[len] === html[idx + len]) {
          if(len === kw.length - 1) cand.push(kw)
          else nxt.push(kw)
        }
      }

      tmp = nxt
    }
    let maKw = ''
    for(const e of cand) {
      if(e.length > maKw.length) maKw = e
    }
    if(maKw) {
      if(res.slice(res.length - 5, res.length) === '</em>') {
        res = res.slice(0, res.length - 5)
        res = res + `${maKw}</em>`
      } else {
        res = res + `<em>${maKw}</em>`
      }
      idx += maKw.length
    } else {
      res = res + html[idx]
      idx++
    }

    len = 0
  }

  return res
}

// another

function highlightKeywords(html, keywords) {
  let bold = new Array(html.length + 1)

  keywords.forEach((w) => {
    let start = html.indexOf(w, 0)
    // until you keep getting valid pattern mark bold array true at those spots
    while (start != -1) {
      bold.fill(true, start, start + w.length)
      start = html.indexOf(w, start + 1)
    }
  })

  let res = bold[0] ? '<em>' : ''

  for (let i = 0; i < bold.length - 1; i++) {
    res += html.charAt(i)

    // notbold && bold we start new tag
    if (!bold[i] && bold[i + 1]) res += '<em>'
    // bold && notbold we end current tag
    else if (bold[i] && !bold[i + 1]) res += '</em>'
  }
  return res
}


