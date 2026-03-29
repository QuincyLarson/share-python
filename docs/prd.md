# PRD — freeCodeCamp Browser Python Runner

**Working title:** freeCodeCamp Python Runner  
**Document type:** Product Requirements Document  
**Audience:** Codex / implementation team / maintainers  
**Status:** Approved working draft  
**Last updated:** 2026-03-29

---

## 1. Executive summary

Build a **single-page, no-sign-in, browser-based Python runner** that feels closer to **JSBin** than Jupyter.

The user lands on one page, pastes or edits a Python script in a plain-text editor on the left, clicks **Run**, and sees plain terminal-style output on the right. The product must be **fast, lightweight, safe by default, and frictionless**. It must run entirely in the browser, with **GitHub Pages** serving static assets and **GitHub Actions** handling build/deploy only.

The runtime strategy is:

- **Default runtime:** Fast mode (MicroPython or equivalent lightweight browser Python runtime) in a dedicated worker.
- **Fallback runtime:** Full mode (Pyodide / CPython-in-WASM) only when the fast runtime appears incompatible and the user explicitly clicks **Retry with Full Python**.
- **No package installation by users.**
- **No network fetching by user code.**
- **No images, charts, notebooks, widgets, uploads, or rich output.**
- **No autorun from shared URLs.** Shared URLs only prefill the editor.

The product is intentionally narrow:

> A fast, static, text-only Python script runner for learners and utility scripts.

This is a freeCodeCamp project, not a commercial SaaS product. The page should be public and indexable, but **only the tool page itself needs SEO**. Shared user scripts do **not** need to be indexed.

---

## 2. Product vision

Give freeCodeCamp learners the fastest possible path from:

- “I have a tiny Python script”
- to “I ran it in a browser and got the result”
- to “I shared the exact script with someone else who also ran it in a browser”

…without requiring:

- Python installation
- terminal knowledge
- sign-in
- notebook concepts
- package management
- backend infrastructure

The product should feel dependable, transparent, and boring in the best way.

---

## 3. Problem statement

A lot of useful Python scripts are small, text-based utilities:

- loan and mortgage calculations
- Social Security and retirement comparisons
- time zone and date calculations
- budget, savings, debt, and salary math
- pasted CSV / JSON analysis
- quick “change some variables and print the answer” scripts

Today, non-technical users often hit too much friction:

- they do not have Python installed
- they do not want to use the terminal
- they do not want to create an account
- they do not need a full notebook or cloud IDE
- they only need to run a simple script and see text output

The opportunity is to offer a simpler alternative: **a static browser app that runs plain Python scripts locally in the user’s browser and outputs text**.

---

## 4. Product principles

Every implementation decision should be judged against these principles.

### 4.1 Fast by default
- The page shell must load quickly.
- The editor must appear before any Python runtime is ready.
- The lightweight runtime must be the default path.
- The heavy runtime must be loaded only when justified.

### 4.2 Frictionless
- No sign-in.
- No backend saves.
- No notebook cells.
- No setup wizard.
- No package install workflow.
- One page. Paste. Run. Output.

### 4.3 Text-only
- Editor is plain text.
- Output is plain text.
- No images.
- No plotting.
- No HTML rendering of user output.
- No rich widgets.

### 4.4 Safe by constraint
- Run code in isolated workers.
- No user package installation.
- No arbitrary network access.
- No user content hosting.
- No autorun from incoming links.

### 4.5 Honest about limits
- Not all Python works.
- This is optimized for small scripts that print text.
- If a script needs a fuller runtime, ask the user before escalating.

### 4.6 Learner-friendly
- Curated example scripts should be readable and heavily commented.
- Users should be encouraged to edit constants at the top of a script and rerun.
- Error messages should be transparent, not magical.

---

## 5. Goals

### 5.1 Primary goals
1. Let users run small Python scripts in the browser with no sign-in.
2. Keep the core UX on a single landing page with two panes.
3. Support shareable prefilled URLs that do not autorun.
4. Keep the product lightweight enough to feel meaningfully simpler than notebook-style tools.
5. Seed the tool with a curated library of highly practical example scripts.
6. Ensure the tool is easy to host on GitHub Pages and deploy via GitHub Actions.

### 5.2 Secondary goals
1. Encourage reuse and remixing of example scripts.
2. Give every example a low-friction issue-report / improvement path via GitHub Issues.
3. Make the page indexable and publicly accessible.
4. Provide a subtle donation CTA to freeCodeCamp after a successful run.

---

## 6. Non-goals

The MVP must **not** try to become any of the following:

- a notebook platform
- a cloud IDE
- a collaborative editor
- a code hosting platform
- a package installation sandbox
- a plotting / visualization environment
- a file upload / file browser app
- a web scraping tool
- an image processing tool
- a data science workbench
- a backend execution service
- a user account product
- a general-purpose REPL with persistent sessions

Explicit non-goals for MVP:

- `input()` / interactive stdin flows
- file upload/download flows for user data
- package installation from PyPI or arbitrary URLs
- user-created public snippet hosting
- embedded ads
- AI assistance inside the editor
- real-time collaboration
- offline-first service worker complexity

---

## 7. Target users

### 7.1 Primary users
- freeCodeCamp learners
- beginner-to-intermediate Python users
- educators sharing tiny utility scripts
- developers who want a frictionless place to tweak a quick calculator script
- non-technical recipients of a shared script link (e.g. a family member on Windows)

### 7.2 Typical jobs to be done
- “I want to tweak a few numbers in a script and rerun it.”
- “I want to share this script with someone who does not know Python.”
- “I want a calculator I can read and customize, not just a black-box form.”
- “I want to paste CSV or JSON into a script and print the result.”

---

## 8. MVP scope

### 8.1 Must-have
- Single landing page
- Two-pane layout (editor + output)
- Plain text editor
- Plain text output panel
- Run button
- Stop button
- Clear output button
- Load example control
- Copy share link button
- Fragment-based share URLs
- No autorun from shared links
- Fast runtime default
- Full runtime retry prompt on likely compatibility failures
- Dedicated worker execution
- Local draft persistence
- Example library framework
- Curated examples with detailed comments
- GitHub issue reporting link
- Donate to freeCodeCamp CTA after successful run
- GitHub Pages + GitHub Actions deployment setup

### 8.2 Nice-to-have but not launch-blocking
- Keyboard shortcuts (Run / Stop)
- Mobile-responsive stacked layout
- Example search/filter dialog
- Remember last successful runtime per current script hash in-session
- Preserve last runtime hint in share URL
- Copy example permalink
- Theme polish (dark/light via CSS variables)

---

## 9. UX requirements

## 9.1 Overall layout
The app must be a **single-page app**.

### Desktop
- Left pane: editor
- Right pane: output
- Toolbar above editor/output
- Optional lightweight header/footer chrome only

### Mobile / narrow widths
- Panes stack vertically
- Editor first, output second
- Controls remain accessible without horizontal scrolling

### UX inspiration
- Lean on **JSBin-style sensibilities**: immediate, minimal, utilitarian
- Avoid notebook metaphors, multi-step workflows, and heavy sidebars

## 9.2 Core controls
The MVP toolbar should contain:

- **Run**
- **Stop**
- **Clear output**
- **Load example**
- **Copy share link**
- **Report issue / suggest improvement**

Optional future controls are out of scope unless they are near-free.

## 9.3 Editor
The editor should be a **plain text, monospace editor**.

### Editor requirements
- Plain `<textarea>` or equivalently lightweight editor
- Monospace font
- Support multi-line paste
- Preserve indentation
- Tab key inserts spaces/tabs appropriately
- No heavyweight IDE/editor dependency unless it is clearly justified
- No Monaco for MVP

### Editor behavior
- If the URL fragment contains code or an example ID, prefill the editor from the fragment
- Otherwise, restore the user’s last local draft if present
- Otherwise, load a configurable default starter script or default example

### Default content guidance
The default script should be:
- short
- readable
- obviously editable
- comment-rich
- text-output-only

The default script must be configurable without changing the app shell.

## 9.4 Output panel
The output panel should mimic a terminal in a restrained way.

### Output requirements
- Plain text only
- Render with `<pre>` or equivalent
- Preserve line breaks and spacing
- Distinguish stdout vs stderr in text only if simple to do
- Escape all user output; never render it as HTML

### Output behavior
- New run appends a run header or separates runs visibly
- Clear output removes prior output
- Stop clearly indicates the run was terminated
- Errors are shown plainly, including stack traces if available

## 9.5 Example loading UX
Examples should be discoverable from a simple control.

Recommended pattern:
- **Load example** opens a lightweight modal / drawer / command-palette-like panel
- User can search or filter examples by category
- Selecting an example loads it into the editor but does not run it automatically

The example picker should not become a third permanent pane.

## 9.6 Runtime escalation UX
Runtime choice should be **mostly hidden**.

### Default behavior
- User clicks **Run**
- App runs with the fast runtime first

### If the fast runtime fails in a way that suggests incompatibility
Show an inline prompt near the output:

> “This script may need Full Python. Retry with Full Python?”

Controls:
- **Retry with Full Python**
- **Dismiss**

### Important constraints
- Do **not** automatically rerun in Full Python after any failure
- Do **not** expose a visible Fast/Full toggle in the default UI
- Do **not** suggest Full Python for ordinary syntax bugs or logic bugs unless the failure likely indicates runtime incompatibility

## 9.7 Donate CTA
After a **successful run** (or successful completion with visible output), show a subtle freeCodeCamp donation CTA.

Requirements:
- Non-modal
- Easy to dismiss
- Does not block output
- Can appear beneath or above the output panel
- Should feel like a polite footer card, not an interruption

Suggested copy pattern:
- “Did this save you time? Support freeCodeCamp.”

## 9.8 Issue reporting UX
There must be a **Report issue / suggest improvement** action visible from the landing page.

Behavior:
- Opens a prefilled new GitHub issue in a new tab
- If a curated example is active, prefill the example ID/title
- Include the current share URL when appropriate
- If the current editor contains unsaved ad-hoc modifications, include a warning that submitting will expose the script contents via the issue

---

## 10. Functional requirements

## 10.1 Execution model
All Python execution must happen **entirely in the browser**.

### Requirements
- No server-side code execution
- Run every script inside a dedicated Web Worker
- One fresh worker per run, or equivalent isolation that guarantees a clean execution context
- The main thread must remain responsive while code runs

### Stop behavior
- **Stop** should terminate the current worker immediately
- After stop, a fresh worker/runtime should be created for the next run
- Do not rely on “cooperative stop” as the only stop path

## 10.2 Fast runtime
The app must use a lightweight runtime first.

### Fast runtime requirements
- Optimized for tiny scripts and quick startup
- Suitable for standard text-based beginner scripts
- No third-party package installs
- No images / notebooks / widgets

### Examples of scripts expected to work well in fast mode
- arithmetic and formulas
- loops and conditionals
- string formatting
- simple lists/dicts
- JSON parsing from inline strings
- CSV parsing from inline strings
- small finance/date/time utilities

## 10.3 Full runtime
The app must support a fuller browser runtime for compatibility.

### Full runtime requirements
- Loaded on demand only
- Must still run fully in the browser
- Still no user package installation
- Still no arbitrary networking
- Still text output only

### Full runtime use cases
- scripts using standard library modules not supported by the fast runtime
- scripts that otherwise fail due to runtime limitations rather than user mistakes

## 10.4 Runtime escalation classifier
The app must decide whether to show the “Retry with Full Python” prompt.

### Classifier inputs
- error type/name
- error message text
- import/module failures
- obvious unsupported-runtime signatures
- optional lightweight static pre-scan before execution

### Classifier rules
The app **should** offer a Full Python retry for cases like:
- `ImportError` / `ModuleNotFoundError` for modules plausibly available in Full Python but not Fast Python
- runtime messages that clearly indicate unsupported or unimplemented features in the fast runtime
- known runtime-specific incompatibility signatures

The app **should not** offer a Full Python retry for cases like:
- plain syntax errors that are likely user mistakes
- name errors, index errors, type errors, etc. that indicate ordinary bugs
- failed assertions
- obviously disallowed functionality (network, images, package install)

### Session memory
If a script successfully runs in Full Python, the app should remember that for the current session and current code hash, so repeated runs of the same script do not repeatedly bounce through Fast mode.

### Share hint
The share payload may include the last successful runtime hint. If present, the app may honor that hint **on user-initiated Run only**, while still keeping runtime choice hidden from the default UI.

## 10.5 `input()` handling
`input()` is **out of scope for MVP**.

Required behavior:
- Detect `input()` statically if practical, or fail clearly at runtime
- Show a friendly message that interactive input is not supported in v1
- Encourage users to edit variables directly in the script instead

## 10.6 Sharing
The app must support **shareable prefilled links** without backend storage.

### Share mechanism
- Use the **URL fragment** (`#...`) only
- Do not send user code to a server
- Do not create server-side saved snippets
- Do not autorun shared code on page load

### Share types
1. **Example permalink** (preferred when the editor exactly matches a curated example)  
   Example conceptual shape: `#ex=mortgage-payment`

2. **Code payload permalink** (when the user modified or wrote custom code)  
   Example conceptual shape: `#v=1&rt=fast&code=<compressed_payload>`

### Share requirements
- Clicking **Copy share link** copies a URL that reproduces the current editor contents
- Opening the URL preloads the editor state only
- The page must show loaded code before any execution happens
- No code from the URL fragment may execute until the user clicks **Run**

### Compression
The code payload should be compressed and URI-safe.

Implementation guidance:
- Use a small client-side compression codec (e.g. LZ-based encoded URI payload)
- Include a version field in the payload
- Handle decode failures gracefully

### Practical length handling
- If the generated share URL is too long for a reasonable sharing experience, show a clear warning
- Suggested copy: “This script is too large for a reliable share link. Trim comments/data or share the script another way.”

## 10.7 Local persistence
The app should autosave the current editor contents locally.

Requirements:
- Use localStorage or equivalently simple browser storage
- Debounce writes
- Restore local draft when no share fragment is present
- If a share fragment is present, it takes precedence over local draft

## 10.8 Example library
The app must support a curated, first-party example library.

### Example library principles
- Examples are readable Python scripts, not black-box forms
- Users should edit constants in code, not fill out an HTML form
- Examples should favor standard library only
- Examples should produce text output only
- Examples should include detailed comments for learners and reviewers

### Example metadata
Each example should have structured metadata, such as:
- `id`
- `title`
- `category`
- `summary`
- `tags`
- `runtime` (`fast` or `full`)
- `difficulty`
- `description`
- `script_path`
- `issue_context`
- `featured` (optional)

### Example runtime policy
- Default expectation: examples run in Fast mode
- Full mode examples are allowed only when justified
- First-party examples should avoid third-party packages in MVP
- If a first-party example truly needs extra packaged functionality, that should be a separate product decision, not the default

## 10.9 Report issue integration
Each curated example must support improvement reporting.

Requirements:
- Generate a prefilled GitHub issue URL with encoded title/body
- Include example ID/title
- Include app version and runtime hint if known
- Include current page/share URL if helpful

## 10.10 Donation CTA
A freeCodeCamp donation CTA must appear after successful execution.

Requirements:
- Trigger only after a successful completed run
- Dismissible
- Session-aware so it does not become noisy
- Link to the approved donation destination

---

## 11. Content constraints and safety constraints

## 11.1 No arbitrary fetching
User code must not be able to fetch arbitrary remote content.

Product policy:
- No `requests`
- No `urllib`-based remote retrieval workflows for user scripts
- No access to arbitrary `fetch()` / XHR / WebSocket destinations
- If users need data, they should paste JSON or CSV directly into the script

Implementation policy:
- Use a restrictive CSP
- Load runtimes and app assets from same origin whenever practical
- Keep outbound connections disabled except what is necessary for same-origin runtime/assets

## 11.2 No images / rich media
- No image upload
- No image display
- No chart rendering
- No matplotlib-like experience in MVP
- No HTML rendering of user-produced markup

## 11.3 No package installation
- No `pip`
- No `micropip`
- No package install UI
- No loading packages from user imports
- No arbitrary wheel or PyPI URLs

## 11.4 No user content hosting
To reduce abuse and moderation burden, the product must stay stateless.

That means:
- no public snippets gallery
- no saved user projects on a server
- no anonymous publishing feed
- no search or browse of user-created code

## 11.5 Abuse guardrails
This is a constraint-based product, not a moderation-heavy platform.

Required guardrails:
- hard runtime timeout per execution
- hard output size cap
- hard source length cap
- worker termination on stop/timeout
- no autorun from links
- no package installs
- no remote network access
- no background persistent execution
- no service worker compute abuse path in MVP

### Suggested default caps (configurable)
- max source size: **64 KB**
- max output: **256 KB** or equivalent line cap
- fast runtime timeout: **5 seconds**
- full runtime timeout: **15 seconds**

These values should be config-driven, not hard-coded throughout the UI.

## 11.6 Allowed use messaging
Include a short acceptable-use / limitations note near the footer or help text:
- educational and utility scripting only
- no hosted storage of code
- browser-only execution
- outputs are provided as-is

---

## 12. Technical architecture

## 12.1 Hosting and deploy
### Hosting
- GitHub Pages
- custom domain supported/configurable
- public static site

### Deployment
- GitHub Actions builds and deploys the static site
- No server runtime or database

## 12.2 Architecture overview
Recommended architecture:

- `index.html` — shell
- `app.js` — UI state, controls, routing, sharing, persistence
- `styles.css` — minimal styling
- `fast-worker.js` — fast runtime worker wrapper
- `full-worker.js` — full runtime worker wrapper
- `examples/` — curated scripts + metadata source files
- generated example manifest bundled into the app at build time

### Important implementation direction
Prefer a **direct, minimal JavaScript shell with worker-based runtimes**, not a notebook framework.

The implementation may use helper libraries when justified, but should avoid dragging in a broad Python-in-the-browser platform layer if a leaner direct integration is practical.

### Narrow runtime bridge
User code should only get a narrow execution environment:
- source code in
- stdout/stderr text out
- status/error out
- no DOM bridge
- no arbitrary JS API surface

## 12.3 Worker protocol
Define a simple message protocol between app and worker.

Example message types:
- `init`
- `run`
- `stdout`
- `stderr`
- `done`
- `error`
- `ready`
- `timed_out`

The main thread should never directly evaluate user code.

## 12.4 Runtime loading strategy
### Page boot
- Load the UI shell immediately
- Do not block first paint on any Python runtime

### Fast runtime loading
Preferred behavior:
- lazy-load or warm-load after initial page interactivity
- first user run should feel quick

### Full runtime loading
- only load after explicit user action or a retained runtime hint
- never preload full runtime for all users in MVP

## 12.5 Example asset pipeline
Examples should be stored as real `.py` files in the repo, not embedded giant strings hidden in JavaScript source.

Recommended structure:

```text
examples/
  finance/
    mortgage-payment.py
    social-security-comparison.py
  time/
    timezone-deadline.py
  data/
    csv-summary.py
```

At build time:
- validate metadata
- bundle scripts into a manifest consumable by the SPA
- optionally preserve raw source files for maintainability

## 12.6 Build tooling
Use lightweight tooling.

Acceptable options:
- Vite
- esbuild-based setup
- plain ESM build with minimal tooling

Avoid build choices that substantially bloat the runtime for little user value.

## 12.7 Caching
- Use normal browser caching for static assets
- Avoid service worker complexity in MVP unless there is a compelling performance win and low maintenance burden
- Prefer cache-busted asset filenames from the build

---

## 13. Security, privacy, and browser policy requirements

## 13.1 CSP and resource policy
Use a restrictive CSP via response headers if available, otherwise via meta tag in the page shell.

Baseline policy intent:
- `default-src 'none'`
- allow only required same-origin scripts/styles/workers
- `connect-src 'self'` only if runtimes/assets are self-hosted
- `worker-src 'self'`
- `img-src 'none'`
- `frame-src 'none'`
- `object-src 'none'`
- `base-uri 'none'`

The final CSP should be verified against the actual runtime loading implementation.

## 13.2 DOM safety
- Never inject user output into the DOM as HTML
- Treat output as text only
- Prefer safe DOM APIs over `innerHTML`
- If user code is ever echoed in UI, escape it properly

## 13.3 Privacy posture
- No sign-in
- No server-side storage of user scripts
- Local draft data remains in the user’s browser
- Shared code in the fragment is client-side state, not server-side content

## 13.4 Browser support
Target modern evergreen browsers on desktop and mobile.

MVP support goal:
- current Chrome / Edge
- current Firefox
- current Safari

If a browser lacks required worker/runtime features, show a graceful unsupported-browser message.

---

## 14. Performance requirements

Performance matters to positioning. The tool should feel lightweight.

## 14.1 Budgets and goals
### App shell
- Keep the non-runtime shell as small as practical
- Avoid heavyweight editor/framework dependencies

### Runtime strategy
- Fast runtime should be meaningfully smaller/faster than Full runtime
- Full runtime should not be downloaded unless needed

### UX goals
- UI visible quickly
- Editor interactive before runtime load completes
- Fast mode for small scripts should feel near-instant once warm
- Full mode may be slower but should be explicitly opt-in or strongly hinted

## 14.2 Regression policy
Any implementation choice that significantly worsens initial page load or first-run latency must be justified in writing.

---

## 15. Accessibility requirements

The page must be accessible by default.

Requirements:
- semantic buttons and form controls
- visible focus states
- keyboard-accessible toolbar and example picker
- sufficient color contrast
- labels for editor and output regions
- screen-reader-friendly status updates for run/stop/error states
- no meaning conveyed by color alone

Keyboard shortcuts (nice-to-have):
- Run: `Ctrl/Cmd + Enter`
- Stop: `Esc` or `Ctrl/Cmd + .`

---

## 16. SEO and discovery requirements

The product page itself should be public and indexable.

Requirements:
- single canonical landing page
- good title/description metadata
- Open Graph / social metadata for the tool page
- sitemap and robots config if appropriate for the site setup
- shared script fragments do not need special SEO handling

Important product decision:
- We do **not** need script-specific indexing
- We do **not** need script-specific social previews
- Fragment-based sharing is acceptable even though social scrapers will only see the page-level metadata

---

## 17. Content requirements for curated examples

## 17.1 Example authoring standard
Every example script should begin with a clear comment header that explains:
- what the script does
- which variables the learner should edit
- assumptions / simplifications
- notable limitations
- expected output shape

## 17.2 Readability standard
Examples should:
- prefer explicit variables over clever code
- avoid unnecessary abstraction
- be educational
- be reviewable by developers
- avoid hidden magic

## 17.3 Verification standard
Every curated example should have:
- at least one automated or documented expected-result test case
- a category and tags
- an issue reporting context
- a declared required runtime

## 17.4 High-stakes caution
For examples touching finance, taxes, insurance, health, or benefits:
- include explicit assumptions and caveats
- avoid implying legal, tax, medical, or financial advice
- prefer transparent formulas over opaque heuristics

---

## 18. Example library plan

## 18.1 Launch recommendation vs long-term target
To keep scope realistic, separate the platform build from the content backlog.

### Platform MVP launch requirement
- example system implemented
- at least **20 polished examples** shipped
- examples span the major categories below

### Near-term content target
- expand to **100 curated examples** after the platform foundation is stable

If the implementation team can ship more than 20 polished examples without sacrificing app quality, that is welcome, but the app architecture matters more than brute-force example count on day one.

## 18.2 Example categories
Recommended example taxonomy:
- Money & loans
- Retirement & benefits
- Time & timezone
- Budgeting & work
- Data & text utilities
- Math & statistics
- Health & everyday metrics
- Developer utilities

## 18.3 Candidate 100-example backlog

### A. Money, loans, savings, and benefits (1–35)
1. Mortgage payment calculator
2. Mortgage amortization schedule
3. Extra mortgage payment savings
4. Mortgage refinance break-even
5. Home affordability estimate
6. Rent vs buy comparison
7. Down payment savings goal timeline
8. PMI estimate helper
9. Auto loan payment calculator
10. Personal loan payment calculator
11. Simple loan payment calculator
12. Debt payoff snowball
13. Debt payoff avalanche
14. Credit card payoff timeline
15. Compound interest calculator
16. Savings goal timeline
17. Emergency fund runway calculator
18. CD / APY growth comparison
19. 401(k) growth estimator
20. Retirement savings gap estimator
21. FIRE target estimate
22. Net worth snapshot script
23. Budget 50/30/20 calculator
24. Salary to hourly wage calculator
25. Hourly to salary calculator
26. Overtime pay calculator
27. Take-home pay estimate (simplified)
28. Inflation impact calculator
29. ROI calculator
30. Break-even analysis calculator
31. Life insurance needs estimate
32. Disability income gap estimate
33. HSA growth estimator
34. Social Security claiming comparison
35. RMD estimate helper

### B. Time, date, timezone, scheduling (36–55)
36. Time zone meeting overlap helper
37. Time zone deadline converter
38. Days between dates
39. Business days between dates
40. Add workdays to a date
41. Age calculator
42. Birthday weekday calculator
43. Countdown to event
44. Subscription renewal tracker
45. Shift length calculator
46. Timesheet total hours calculator
47. PTO accrual estimator
48. Sleep schedule helper
49. Pomodoro schedule planner
50. Travel itinerary duration calculator
51. SLA deadline calculator
52. Bill due-date spread planner
53. Lease / contract end-date calculator
54. Meeting rotation time-zone fairness helper
55. Recurring schedule occurrence counter

### C. Budgeting, business, and work utilities (56–70)
56. Freelance hourly rate calculator
57. Consulting rate break-even calculator
58. Invoice late-fee estimate
59. Sales tax calculator
60. Discount stack calculator
61. Margin vs markup calculator
62. Commission calculator
63. Unit price calculator
64. Subscription cost annualizer
65. Price increase impact calculator
66. Revenue target backsolver
67. Simple profit-and-loss summary
68. Cash runway estimate for side projects
69. Debt-to-income ratio helper
70. Side-hustle hourly effective rate calculator

### D. Data, text, and developer utilities (71–85)
71. JSON pretty-printer from inline text
72. JSON minifier from inline text
73. CSV summary stats from pasted CSV
74. CSV column totals script
75. CSV dedupe helper
76. Unix timestamp converter
77. Base64 encode/decode text
78. URL encode/decode helper
79. Hex / RGB color converter
80. Percentage change calculator
81. Ratio simplifier
82. Password entropy estimate
83. Log growth estimate
84. API rate-limit budget planner
85. Markdown table generator from pasted CSV

### E. Math, statistics, and education utilities (86–95)
86. Mean / median / mode calculator
87. Standard deviation calculator
88. Percentile rank helper
89. Present value calculator
90. Future value calculator
91. Rule of 72 helper
92. GPA calculator
93. Permutations and combinations helper
94. Quadratic equation solver
95. Linear regression basics helper

### F. Health and everyday metrics (96–100)
96. BMI calculator
97. Basal metabolic rate estimate
98. Macro split calculator
99. Running pace calculator
100. Smoking quit savings calculator

## 18.4 Initial example pack recommendation (ship first)
Suggested first 20 examples:
- Mortgage payment calculator
- Simple loan payment calculator
- Compound interest calculator
- Savings goal timeline
- Budget 50/30/20 calculator
- Debt payoff snowball
- Social Security claiming comparison
- Time zone deadline converter
- Days between dates
- Business days between dates
- Shift length calculator
- Freelance hourly rate calculator
- Sales tax calculator
- Discount stack calculator
- JSON pretty-printer from inline text
- CSV summary stats from pasted CSV
- Unix timestamp converter
- Percentage change calculator
- BMI calculator
- Running pace calculator

---

## 19. Error handling requirements

## 19.1 Error presentation
The app must present errors clearly and without over-abstracting them.

Requirements:
- show Python traceback text when available
- keep line numbers if available
- make a distinction between syntax/runtime/tooling errors when possible
- preserve the exact message where safe and comprehensible

## 19.2 Tool-specific messaging
Custom messages should be added for predictable cases:
- `input()` not supported
- likely runtime incompatibility → show Full Python retry prompt
- disallowed network/package/image behavior
- share-link decode failure
- script too large for reliable share URL
- runtime load failure
- unsupported browser

## 19.3 No misleading fallback
Do not silently re-run code in a different runtime without user intent unless the only behavior is honoring a previously stored runtime hint on a user-initiated Run.

---

## 20. Analytics and instrumentation

MVP principle: keep analytics minimal and privacy-conscious.

Requirements:
- no invasive third-party trackers added solely for this tool
- if freeCodeCamp has an approved analytics solution, it may be used for basic pageview / engagement metrics
- user scripts and output must not be sent to analytics systems

Potential aggregate metrics:
- page loads
- run button clicks
- successful runs
- stop clicks
- fallback prompt shown
- full runtime retry clicked
- share-link copies
- example loads by ID
- donation CTA clicks

---

## 21. Testing and QA requirements

## 21.1 Unit tests
Must cover:
- share payload encode/decode roundtrip
- runtime fallback classifier
- local draft precedence rules
- example manifest validation
- size/timeout cap helpers

## 21.2 End-to-end browser tests
Must cover:
1. page loads and editor is interactive
2. hello-world script runs in Fast mode
3. long-running script can be stopped
4. output clear works
5. share link reproduces editor contents
6. shared link does not autorun
7. incompatible script triggers Full Python retry prompt
8. retry with Full Python succeeds on a known compatibility example
9. issue-report link is populated for a curated example
10. donation CTA appears after success

## 21.3 Example content QA
Every curated example should be validated for:
- metadata completeness
- comment header presence
- no disallowed imports
- expected runtime declaration
- at least one expected output assertion or snapshot substring

---

## 22. Definition of done

The MVP is done when all of the following are true:

1. The site deploys statically to GitHub Pages via GitHub Actions.
2. The landing page contains the two-pane editor/output experience.
3. Users can paste/edit Python and run it with no sign-in.
4. User code executes in-browser inside a worker.
5. The default runtime is lightweight and the UI remains responsive.
6. Likely incompatibility failures trigger a user-controlled Full Python retry prompt.
7. Shared URLs prefill the editor and never autorun.
8. User code is not stored on a backend.
9. Arbitrary network access is blocked by policy and implementation.
10. No user package installation exists.
11. Output is text-only.
12. The app ships with a functioning curated example system.
13. At least 20 polished examples ship.
14. Every example has a report-issue path.
15. The donation CTA appears after successful runs.
16. Core accessibility and E2E tests pass.

---

## 23. Implementation notes for Codex

### 23.1 Strong recommendations
- Keep the shell simple.
- Use workers.
- Avoid heavy editor dependencies.
- Self-host runtime assets if feasible so CSP can remain strict.
- Never autorun fragment-loaded code.
- Treat user output as plain text only.
- Prefer explicit configuration files over magic constants.

### 23.2 Acceptable implementation flexibility
Codex may choose the exact runtime/library wiring so long as the product behavior matches this PRD:
- fast runtime first
- full runtime fallback on explicit retry
- no package install
- no arbitrary network fetch
- text output only
- static hosting only

### 23.3 Priority order if tradeoffs are needed
1. Safety + correct execution model
2. Fast initial UX
3. Simple share flow
4. Example system quality
5. Cosmetic polish

---

## 24. Risks and mitigations

### Risk: Fast runtime compatibility is narrower than expected
Mitigation:
- good retry classifier
- clear Full Python prompt
- remember successful runtime per script hash
- mark curated examples with required runtime

### Risk: Share URLs become too long for heavily commented scripts or large pasted datasets
Mitigation:
- compression
- short example permalinks when possible
- warning when links exceed practical size

### Risk: Users expect all Python / all libraries to work
Mitigation:
- clear positioning copy
- explicit no-package policy
- curated examples that demonstrate intended usage patterns

### Risk: Abuse despite static design
Mitigation:
- no hosting of user code
- no autorun
- no packages
- no arbitrary networking
- strict time/output caps
- worker termination

### Risk: Content quality for calculators becomes the bottleneck
Mitigation:
- example authoring standard
- example metadata + tests
- issue reporting link
- phased example rollout (20 first, 100 target)

---

## 25. Suggested repository structure

```text
/
  index.html
  public/
    runtimes/
      fast/
      full/
    examples/
      finance/
      time/
      data/
  src/
    app.js
    state.js
    share.js
    storage.js
    classify.js
    ui/
      toolbar.js
      editor.js
      output.js
      examples-dialog.js
      donate-cta.js
    workers/
      fast-worker.js
      full-worker.js
  tests/
    unit/
    e2e/
  .github/
    workflows/
      ci.yml
      deploy-pages.yml
```

---

## 26. Open decisions already resolved in this PRD

These decisions are considered settled unless a maintainer explicitly reopens them:

- single-page layout: **yes**
- no sign-in: **yes**
- no backend execution: **yes**
- GitHub Pages + GitHub Actions: **yes**
- default fast runtime: **yes**
- full runtime only on retry / strong hint: **yes**
- no `input()` in MVP: **yes**
- share via URL fragment: **yes**
- shared code prefill only, no autorun: **yes**
- no package install: **yes**
- no arbitrary fetch/networking: **yes**
- no images: **yes**
- tool page indexable, scripts need not be indexable: **yes**
- curated examples: **yes**
- donate CTA after success: **yes**
- GitHub issue button: **yes**

---

## 27. External assumptions validated during planning

These references are not requirements by themselves, but they informed the feasibility and architecture decisions in this PRD.

1. GitHub Pages is a static hosting service and supports custom domains.  
   - GitHub Docs: About GitHub Pages  
   - GitHub Docs: Managing a custom domain for your GitHub Pages site

2. GitHub Pages has a 1 GB published-site limit and a soft 100 GB/month bandwidth limit, with custom GitHub Actions workflows not subject to the 10-builds/hour soft limit.  
   - GitHub Docs: GitHub Pages limits

3. URL fragments are handled client-side and are not sent to the server.  
   - MDN: URI fragment

4. CSP can restrict outbound script-driven connections and worker script sources.  
   - MDN: `connect-src` directive  
   - MDN: `worker-src` directive  
   - MDN: `<meta http-equiv="content-security-policy">`

5. Pyodide supports in-browser execution, standard stream redirection, and worker-based execution.  
   - Pyodide docs: Getting started  
   - Pyodide docs: Redirecting standard streams  
   - Pyodide docs: Using Pyodide in a web worker

6. PyScript documentation confirms the broad tradeoff: MicroPython is small/fast and Pyodide is fuller/heavier, and both can be used with workers.  
   - PyScript docs: What is PyScript?  
   - PyScript docs: Architecture  
   - PyScript docs: Web Workers

7. Popular calculator ecosystems consistently emphasize categories such as mortgages, loans, retirement, savings, budgeting, time/date calculations, and timezone conversion. That informed the example backlog categories here.  
   - Calculator.net sitemap / category pages  
   - NerdWallet calculator pages  
   - Bankrate calculators  
   - timeanddate calculator pages

