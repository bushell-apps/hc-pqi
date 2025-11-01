// content.js — HotCopper Post Quality Index (PQI)
// Computes GA-per-post percentage and injects a two-line badge next to user stats.

"use strict";

// ---------- Config: thresholds & labels ----------
// <10% = Poor, 10–50% = Solid, 50–100% = Amazing, >100% = Legendary
const PQI_RULES = [
  { max: 0.10,     label: "Poor",       className: "hc-pqi--low"   },
  { max: 0.50,     label: "Solid",      className: "hc-pqi--mid"   },
  { max: 1.00,     label: "Amazing",    className: "hc-pqi--high"  },
  { max: Infinity, label: "Legendary",  className: "hc-pqi--ultra" }
];

// ---------- Helpers ----------
function formatPct(p) {
  if (!isFinite(p)) return "—";
  const v = p * 100;
  return v < 100 ? `${v.toFixed(1)}%` : `${Math.round(v)}%`;
}

// Extracts the last integer appearing in the element's visible text.
// Works even if the element contains SVGs before the number.
function extractTrailingInt(el) {
  if (!el) return null;
  const text = el.innerText || el.textContent || "";
  const m = text.trim().match(/(\d+)\s*$/);
  return m ? parseInt(m[1], 10) : null;
}

// Parses "99 Posts." or "1,234 Posts." → 99 / 1234
function extractPostCount(el) {
  if (!el) return null;
  const text = el.innerText || el.textContent || "";
  const digits = text.replace(/[^\d]/g, "");
  return digits ? parseInt(digits, 10) : null;
}

function classify(pct) {
  for (const r of PQI_RULES) {
    if (pct <= r.max) return r;
  }
  return PQI_RULES[PQI_RULES.length - 1];
}

// Build a two-line badge: first line = score, second line = label
function makeBadge({ pct, ga, posts }) {
  const info = classify(pct);

  const badge = document.createElement("span");
  badge.className = `hc-pqi ${info.className}`;
  badge.setAttribute("role", "note");
  badge.title = `Post Quality Index\nGA / Posts = ${ga} / ${posts} = ${formatPct(pct)}\n${info.label}`;

  const scoreEl = document.createElement("span");
  scoreEl.className = "hc-pqi__score";
  scoreEl.textContent = `PQI: ${formatPct(pct)}`;

  const labelEl = document.createElement("span");
  labelEl.className = "hc-pqi__label";
  labelEl.textContent = info.label;

  badge.append(scoreEl, labelEl);
  return badge;
}

function alreadyProcessed(container) {
  return container.querySelector(":scope .hc-pqi") !== null || container.hasAttribute("data-hc-pqi");
}

// ---------- Core per-post processing ----------
function processMessageInfo(container) {
  try {
    if (!container || alreadyProcessed(container)) return;

    const userData = container.querySelector(".post-userdata");
    if (!userData) return;

    const postNumEl = userData.querySelector(".user-post-num");
    const gaEl      = userData.querySelector(".user-ga-count");

    const posts = extractPostCount(postNumEl);
    const ga    = extractTrailingInt(gaEl);

    if (!posts || posts <= 0 || ga == null) return;

    const pct = ga / posts;
    const badge = makeBadge({ pct, ga, posts });

    // Prefer to place right after GA count; fall back to end of user-data
    if (gaEl && gaEl.parentElement) {
      gaEl.insertAdjacentElement("afterend", badge);
    } else {
      userData.appendChild(badge);
    }

    container.setAttribute("data-hc-pqi", "1");
  } catch (e) {
    // Swallow to avoid breaking the page if one post is malformed
    // console.debug("HC PQI error:", e);
  }
}

// Scan the whole page for posts
function scanAll() {
  document.querySelectorAll(".message-info").forEach(processMessageInfo);
}

// ---------- Observe SPA/infinite-scroll updates ----------
const observer = new MutationObserver((muts) => {
  let added = false;
  for (const m of muts) {
    if (m.addedNodes && m.addedNodes.length) {
      added = true;
      break;
    }
  }
  if (added) {
    cancelAnimationFrame(scanAll._raf || 0);
    scanAll._raf = requestAnimationFrame(scanAll);
  }
});

// ---------- Init ----------
function init() {
  scanAll();
  observer.observe(document.documentElement, { childList: true, subtree: true });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
