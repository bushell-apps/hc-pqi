# README.md

# Post Quality Index for HotCopper (Unofficial)

Adds a **Post Quality Index (PQI)** badge beside each poster’s stats on HotCopper thread pages.

* **Formula:** `PQI = (GA ÷ Posts) × 100`
* **Tiers (defaults):**

  * **Poor**: under 10%
  * **Solid**: 10–50%
  * **Amazing**: 50–100%
  * **Legendary**: over 100%
* Two‑line badge (score on first line, label underneath) to avoid overlapping page content.
* Supports infinite scroll / SPA updates.
* **No data collection, no analytics, no remote requests.**

> This is an independent community tool and is **not affiliated with HotCopper**.

---

## Install

### From the Chrome Web Store

### Developer mode (manual)

1. Download/clone this repository.
2. Chrome → `chrome://extensions` → enable **Developer mode**.
3. Click **Load unpacked** and select the repo folder (so `manifest.json` is at the root).
4. Open a HotCopper thread page and look for the PQI badges.

---

## How it works

On each post, the extension reads the visible **GA** (Great Analysis) count and **Posts** count, calculates `PQI = (GA ÷ Posts) × 100`, and injects a small badge next to those stats. A tooltip shows the exact numbers and calculation.

**Note:** Optional non‑linear weighting (e.g., exponential based on total posts) is planned but **off by default**.

---

## Permissions

* Limited strictly to `hotcopper.com.au` pages via `host_permissions`.
* No access to other sites; no storage; no background network requests.

---

## Privacy

This extension does **not** collect, store, or transmit any personal or browsing data. It runs entirely in your browser and only modifies the current HotCopper page.

See the full policy in [`/docs/privacy-policy.md`](./docs/privacy-policy.md).

---

## Screenshot



---

## Roadmap

* Optional **PQI weighting** by total posts.
* Options page for custom thresholds/labels.

---

## Support

* Open an issue: [https://github.com/bushell-apps/hc-pqi/issues](https://github.com/bushell-apps/hc-pqi/issues)

---

## Disclaimer

This is an unofficial tool, not affiliated with or endorsed by HotCopper.

---

## License

MIT © 2025 Bushell Apps – see [`LICENSE`](./LICENSE).

---

# docs/privacy-policy.md

# Post Quality Index for HotCopper — Privacy Policy

**Effective date:** 1 November 2025

## Summary

This extension does not collect, store, or transmit any personal or browsing data. It runs entirely in your browser and modifies the display of HotCopper thread pages by adding a PQI badge calculated from visible counts.

## Data handling

* **Data collected:** none
* **Data shared:** none
* **Storage:** none (no local storage beyond the extension’s static files)

## How it works

The extension reads the on‑page **GA** and **Posts** numbers adjacent to each username, computes **PQI = (GA ÷ Posts) × 100**, and injects a small badge next to those stats. No information is sent off‑device.

## Permissions

The extension requests access only to pages on `hotcopper.com.au` to render the badge.

## Changes to this policy

If this policy changes, updates will be committed to the repository and the "Effective date" above will be revised.

## Contact

Open an issue at [https://github.com/bushell-apps/hc-pqi](https://github.com/bushell-apps/hc-pqi) or email **apps@bushell.com.au**.

## Affiliation

This is an unofficial community tool and is not affiliated with HotCopper.
