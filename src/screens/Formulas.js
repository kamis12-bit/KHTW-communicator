import React, { useState } from "react";

const formulas_pool = [
{ title: 'Integral', formula: '\\int_{a}^{b}', weight:'1'},
{ title: 'Sum', formula: '\\sum_{a}^{b}', weight:'1'},
{ title: 'Product', formula: '\\prod_{a}^{b}', weight:'1'},
{ title: 'Divide', formula: '\\cfrac{a}{b}', weight:'1'},
{ title: 'Root', formula: '\\sqrt{a}', weight:'1'},
{ title: 'Epsilon', formula: '\\varepsilon', weight:'1'},
{ title: 'N-thRoot', formula: '\\sqrt[b]{a}', weight:'1'},
{ title: 'Dbtilde', formula: '\\thickapprox', weight:'1'},
{ title: 'Exponent', formula: 'e^{a}', weight:'1'},
{ title: '+', formula: '+', weight: '1' },
{ title: ' is less than', formula: '&lt;', weight: '1' },
{ title: ' is greater than', formula: '&gt;', weight: '1' },
{ title: ' is not less than', formula: '\\nless', weight: '1' },
{ title: ' is not greater than', formula: '\\ngtr', weight: '1' },
{ title: ' is less than or equal to', formula: '\\leq', weight: '1' },
{ title: ' is greater than or equal to', formula: '\\geq', weight: '1' },
{ title: ' is less than or equal to', formula: '\\leqslant', weight: '1' },
{ title: ' is greater than or equal to', formula: '\\geqslant', weight: '1' },
{ title: ' is neither less than nor equal to', formula: '\\nleq', weight: '1' },
{ title: ' is neither greater than nor equal to', formula: '\\ngeq', weight: '1' },
{ title: ' is neither less than nor equal to', formula: '\\nleqslant', weight: '1' },
{ title: ' is neither greater than nor equal to', formula: '\\ngeqslant', weight: '1' },
{ title: ' precedes', formula: '\\prec', weight: '1' },
{ title: ' succeeds', formula: '\\succ', weight: '1' },
{ title: ' doesn\'t precede', formula: '\\nprec', weight: '1' },
{ title: ' precedes or equals', formula: '\\preceq', weight: '1' },
{ title: ' succeeds or equals', formula: '\\succeq', weight: '1' },
{ title: 'll', formula: '\\ll', weight: '1' },
{ title: 'gg', formula: '\\gg', weight: '1' },
{ title: 'lll', formula: '\\lll', weight: '1' },
{ title: 'ggg', formula: '\\ggg', weight: '1' },
{ title: ' is a proper subset of', formula: '\\subset', weight: '1' },
{ title: ' is a proper superset of', formula: '\\supset', weight: '1' },
{ title: ' is not a proper subset of', formula: '\\not\\subset', weight: '1' },
{ title: ' is not a proper superset of', formula: '\\not\\supset', weight: '1' },
{ title: ' is a subset of', formula: '\\subseteq', weight: '1' },
{ title: 'sqsubset', formula: '\\sqsubset', weight: '1' },
{ title: 'sqsupset', formula: '\\sqsupset', weight: '1' },
{ title: 'sqsubseteq', formula: '\\sqsubseteq', weight: '1' },
{ title: ' is equal to', formula: '=', weight: '1' },
{ title: 'doteq', formula: '\\doteq', weight: '1' },
{ title: ' is equivalent to', formula: '\\equiv', weight: '1' },
{ title: ' is approximately', formula: '\\approx', weight: '1' },
{ title: ' is similar or equal to', formula: '\\simeq', weight: '1' },
{ title: ' is similar to', formula: '\\sim', weight: '1' },
{ title: ' is proportional to', formula: '\\propto', weight: '1' },
{ title: ' is not equal to', formula: '\\neq', weight: '1' },
{ title: ' is parallel with', formula: '\\parallel', weight: '1' },
{ title: ' is asymptotic to', formula: '\\asymp', weight: '1' },
{ title: 'bowtie', formula: '\\bowtie', weight: '1' },
{ title: 'vdash', formula: '\\vdash', weight: '1' },
{ title: 'dashv', formula: '\\dashv', weight: '1' },
{ title: ' is member of', formula: '\\in', weight: '1' },
{ title: 'smile', formula: '\\smile', weight: '1' },
{ title: 'frown', formula: '\\frown', weight: '1' },
{ title: ' models', formula: '\\models', weight: '1' },
{ title: ' divides', formula: '\\mid', weight: '1' },
{ title: ' plus or minus', formula: '\\pm', weight: '1' },
{ title: 'diamond', formula: '\\diamond', weight: '1' },
{ title: 'oplus', formula: '\\oplus', weight: '1' },
{ title: ' minus or plus', formula: '\\mp', weight: '1' },
{ title: 'bigtriangleup', formula: '\\bigtriangleup', weight: '1' },
{ title: 'ominus', formula: '\\ominus', weight: '1' },
{ title: ' multiplied by', formula: '\\times', weight: '1' },
{ title: 'bigtriangledown', formula: '\\bigtriangledown', weight: '1' },
{ title: 'otimes', formula: '\\otimes', weight: '1' },
{ title: ' divided by', formula: '\\div', weight: '1' },
{ title: 'sqcap', formula: '\\sqcap', weight: '1' },
{ title: 'triangleleft', formula: '\\triangleleft', weight: '1' },
{ title: 'oslash', formula: '\\oslash', weight: '1' },
{ title: ' asterisk', formula: '\\ast', weight: '1' },
{ title: 'sqcup', formula: '\\sqcup', weight: '1' },
{ title: 'triangleright', formula: '\\triangleright', weight: '1' },
{ title: 'odot', formula: '\\odot', weight: '1' },
{ title: 'star', formula: '\\star', weight: '1' },
{ title: 'vee', formula: '\\vee', weight: '1' },
{ title: 'bigcirc', formula: '\\bigcirc', weight: '1' },
{ title: 'circ', formula: '\\circ', weight: '1' },
{ title: 'dagger', formula: '\\dagger', weight: '1' },
{ title: 'wedge', formula: '\\wedge', weight: '1' },
{ title: 'bullet', formula: '\\bullet', weight: '1' },
{ title: 'ddagger', formula: '\\ddagger', weight: '1' },
{ title: 'cdot', formula: '\\cdot', weight: '1' },
{ title: 'wr', formula: '\\wr', weight: '1' },
{ title: 'amalg', formula: '\\amalg', weight: '1' },
{ title: ' is not member of', formula: '\\notin', weight: '1' },
{ title: 'nleqq', formula: '\\nleqq', weight: '1' },
{ title: 'ngeqq', formula: '\\ngeqq', weight: '1' },
{ title: 'lneq', formula: '\\lneq', weight: '1' },
{ title: 'gneq', formula: '\\gneq', weight: '1' },
{ title: 'lneqq', formula: '\\lneqq', weight: '1' },
{ title: 'gneqq', formula: '\\gneqq', weight: '1' },
{ title: 'lvertneqq', formula: '\\lvertneqq', weight: '1' },
{ title: 'gvertneqq', formula: '\\gvertneqq', weight: '1' },
{ title: 'lnsim', formula: '\\lnsim', weight: '1' },
{ title: 'gnsim', formula: '\\gnsim', weight: '1' },
{ title: 'lnapprox', formula: '\\lnapprox', weight: '1' },
{ title: 'gnapprox', formula: '\\gnapprox', weight: '1' },
{ title: ' doesn\'t succeed', formula: '\\nsucc', weight: '1' },
{ title: ' neither precedes nor equals', formula: '\\npreceq', weight: '1' },
{ title: ' neither succeeds nor equals', formula: '\\nsucceq', weight: '1' },
{ title: 'precneqq', formula: '\\precneqq', weight: '1' },
{ title: 'succneqq', formula: '\\succneqq', weight: '1' },
{ title: 'precnsim', formula: '\\precnsim', weight: '1' },
{ title: 'succnsim', formula: '\\succnsim', weight: '1' },
{ title: 'precnapprox', formula: '\\precnapprox', weight: '1' },
{ title: 'succnapprox', formula: '\\succnapprox', weight: '1' },
{ title: ' is not similar to', formula: '\\nsim', weight: '1' },
{ title: 'nshortmid', formula: '\\nshortmid', weight: '1' },
{ title: 'nshortparallel', formula: '\\nshortparallel', weight: '1' },
{ title: 'nmid', formula: '\\nmid', weight: '1' },
{ title: ' is not parallel with', formula: '\\nparallel', weight: '1' },
{ title: 'nvdash', formula: '\\nvdash', weight: '1' },
{ title: 'nvDash', formula: '\\nvDash', weight: '1' },
{ title: 'nVdash', formula: '\\nVdash', weight: '1' },
{ title: 'nVDash', formula: '\\nVDash', weight: '1' },
{ title: 'ntriangleleft', formula: '\\ntriangleleft', weight: '1' },
{ title: 'ntriangleright', formula: '\\ntriangleright', weight: '1' },
{ title: 'ntrianglelefteq', formula: '\\ntrianglelefteq', weight: '1' },
{ title: 'ntrianglerighteq', formula: '\\ntrianglerighteq', weight: '1' },
{ title: ' is not a subset of', formula: '\\nsubseteq', weight: '1' },
{ title: ' is not a superset of', formula: '\\nsupseteq', weight: '1' },
{ title: ' the empty set', formula: '\\emptyset', weight: '1' },
{ title: ' set of integers', formula: '\\mathbb{Z}', weight: '1' },
{ title: ' set of rational numbers', formula: '\\mathbb{Q}', weight: '1' },
{ title: ' set of algebraic numbers', formula: '\\mathbb{A}', weight: '1' },
{ title: ' set of real numbers', formula: '\\mathbb{R}', weight: '1' },
{ title: ' set of complex numbers', formula: '\\mathbb{C}', weight: '1' },
{ title: ' set of quaternions', formula: '\\mathbb{H}', weight: '1' },
{ title: 'nsubseteqq', formula: '\\nsubseteqq', weight: '1' },
{ title: 'nsupseteqq', formula: '\\nsupseteqq', weight: '1' },
{ title: 'subsetneq', formula: '\\subsetneq', weight: '1' },
{ title: 'supsetneq', formula: '\\supsetneq', weight: '1' },
{ title: 'varsubsetneq', formula: '\\varsubsetneq', weight: '1' },
{ title: 'varsupsetneq', formula: '\\varsupsetneq', weight: '1' },
{ title: 'subsetneqq', formula: '\\subsetneqq', weight: '1' },
{ title: 'supsetneqq', formula: '\\supsetneqq', weight: '1' },
{ title: 'varsubsetneqq', formula: '\\varsubsetneqq', weight: '1' },
{ title: 'varsupsetneqq', formula: '\\varsupsetneqq', weight: '1' },
{ title: ' owns, has member', formula: '\\ni', weight: '1' },
{ title: ' there is no', formula: '\\nexists', weight: '1' },
{ title: ' ceiling (left)', formula: '\\lceil', weight: '1' },
{ title: ' ceiling (right)', formula: '\\rceil', weight: '1' },
{ title: ' floor (left)', formula: '\\lfloor', weight: '1' },
{ title: ' floor (right)', formula: '\\rfloor', weight: '1' },
{ title: ' (preferred for right implication)', formula: '\\Rightarrow', weight: '1' },
{ title: ' is implied by (only if)', formula: '\\Longleftarrow', weight: '1' },
{ title: ' (preferred for left implication)', formula: '\\Leftarrow', weight: '1' },
{ title: ' is equivalent to (if and only if, iff)', formula: '\\iff', weight: '1' },
{ title: ' (preferred for equivalence)', formula: '\\Leftrightarrow', weight: '1' },
{ title: ' real part', formula: '\\Re', weight: '1' },
{ title: ' imaginary part', formula: '\\Im', weight: '1' },
{ title: 'top', formula: '\\top', weight: '1' },
{ title: 'bot', formula: '\\bot', weight: '1' },
{ title: ' segment', formula: '\\overline{\\rm AB}', weight: '1' },
{ title: ' ray (half-line)', formula: '\\overrightarrow{\\rm AB}', weight: '1' },
{ title: ' angle', formula: '\\angle', weight: '1' },
{ title: ' measured angle', formula: '\\measuredangle', weight: '1' },
{ title: ' triangle', formula: '\\triangle', weight: '1' },
{ title: ' square', formula: '\\square', weight: '1' },
{ title: ' is congruent to', formula: '\\cong', weight: '1' },
{ title: ' is not congruent to', formula: '\\ncong', weight: '1' },
{ title: ' is perpendicular with', formula: '\\perp', weight: '1' },
{ title: ' is not perpendicular to', formula: '\\not\\perp', weight: '1' },
{ title: ' is parallel with', formula: '\\|', weight: '1' },
{ title: ' slash', formula: '/', weight: '1' },
{ title: 'backslash', formula: '\\backslash', weight: '1' },
{ title: ' left parenthesis', formula: '( \\,', weight: '1' },
{ title: ' right parenthesis', formula: ') \\,', weight: '1' },
{ title: ' left [square] bracket', formula: '[ \\,', weight: '1' },
{ title: ' right [square] bracket', formula: '] \\,', weight: '1' },
{ title: ' left brace', formula: '\\{', weight: '1' },
{ title: ' right brace', formula: '\\}', weight: '1' },
{ title: ' left angle bracket', formula: '\\langle', weight: '1' },
{ title: ' right angle bracket', formula: '\\rangle', weight: '1' },
{ title: 'ulcorner', formula: '\\ulcorner', weight: '1' },
{ title: 'urcorner', formula: '\\urcorner', weight: '1' },
{ title: 'llcorner', formula: '\\llcorner', weight: '1' },
{ title: 'lrcorner', formula: '\\lrcorner', weight: '1' },
{ title: 'rightarrow', formula: '\\rightarrow', weight: '1' },
{ title: 'rightarrow', formula: '\\rightarrow', weight: '1' },
{ title: ' (preferred for right implication)', formula: '\\Rightarrow', weight: '1' },
{ title: 'longrightarrow', formula: '\\longrightarrow', weight: '1' },
{ title: 'mapsto', formula: '\\mapsto', weight: '1' },
{ title: 'longmapsto', formula: '\\longmapsto', weight: '1' },
{ title: 'leftarrow', formula: '\\leftarrow', weight: '1' },
{ title: 'longleftarrow', formula: '\\longleftarrow', weight: '1' },
{ title: ' is implied by (only if)', formula: '\\Longleftarrow', weight: '1' },
{ title: 'Uparrow', formula: '\\Uparrow', weight: '1' },
{ title: 'downarrow', formula: '\\downarrow', weight: '1' },
{ title: 'Downarrow', formula: '\\Downarrow', weight: '1' },
{ title: 'updownarrow', formula: '\\updownarrow', weight: '1' },
{ title: 'Updownarrow', formula: '\\Updownarrow', weight: '1' },
{ title: 'imath', formula: '\\imath', weight: '1' },
{ title: 'eth', formula: '\\eth', weight: '1' },
{ title: 'jmath', formula: '\\jmath', weight: '1' },
{ title: 'Box', formula: '\\Box', weight: '1' },
{ title: 'ell', formula: '\\ell', weight: '1' },
{ title: 'beth', formula: '\\beth', weight: '1' },
{ title: 'gimel', formula: '\\gimel', weight: '1' },
]



export { formulas_pool};