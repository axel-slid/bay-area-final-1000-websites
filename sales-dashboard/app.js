(function () {
  const payload = window.COMPANY_DASHBOARD_DATA;
  const companies = payload.companies;

  const el = {
    total: document.querySelector("#metric-total"),
    mapped: document.querySelector("#metric-mapped"),
    previews: document.querySelector("#metric-previews"),
    search: document.querySelector("#search-input"),
    category: document.querySelector("#category-filter"),
    sort: document.querySelector("#sort-select"),
    resultCount: document.querySelector("#result-count"),
    routeSpan: document.querySelector("#route-span"),
    list: document.querySelector("#company-list"),
    detailCategory: document.querySelector("#detail-category"),
    detailName: document.querySelector("#detail-name"),
    detailAddress: document.querySelector("#detail-address"),
    detailRoute: document.querySelector("#detail-route"),
    callLink: document.querySelector("#call-link"),
    mapsLink: document.querySelector("#maps-link"),
    stripeLink: document.querySelector("#stripe-link"),
    openCurrent: document.querySelector("#open-current"),
    openCurrentTop: document.querySelector("#open-current-top"),
    previewLocal: document.querySelector("#preview-local"),
    previewLive: document.querySelector("#preview-live"),
    previewStatus: document.querySelector("#preview-status"),
    previewFrame: document.querySelector(".preview-frame"),
    preview: document.querySelector("#site-preview"),
    infoPhone: document.querySelector("#info-phone"),
    infoHours: document.querySelector("#info-hours"),
    infoStatus: document.querySelector("#info-status"),
    infoDistance: document.querySelector("#info-distance"),
    why: document.querySelector("#why-text"),
    evidence: document.querySelector("#evidence-text"),
    profileLink: document.querySelector("#profile-link"),
    githubLink: document.querySelector("#github-link"),
    setupLink: document.querySelector("#setup-link"),
  };

  const state = {
    selectedId: companies[0]?.id,
    previewMode: companies[0]?.localPreview ? "local" : "live",
    previewFilter: "all",
    filtered: [],
    markers: new Map(),
  };

  const categoryColors = {
    restaurant: "#b91c1c",
    fast_food: "#c2410c",
    cafe: "#7c2d12",
    bakery: "#a16207",
    beauty: "#be185d",
    hairdresser: "#9333ea",
    dentist: "#2563eb",
    car_repair: "#475569",
    laundry: "#0e7490",
    clothes: "#0f766e",
    bar: "#6d28d9",
    jewelry: "#b45309",
    tailor: "#0369a1",
    hardware: "#334155",
    accountant: "#166534",
    estate_agent: "#155e75",
    insurance: "#1d4ed8",
    florist: "#15803d",
    lawyer: "#312e81",
  };

  let map;
  let cluster;

  function init() {
    el.total.textContent = payload.total.toLocaleString();
    el.mapped.textContent = payload.mappedCount.toLocaleString();
    el.previews.textContent = payload.localPreviewCount.toLocaleString();
    buildCategoryOptions();
    initMap();
    bindEvents();
    applyFilters();
    selectCompany(state.selectedId, { pan: true });
  }

  function buildCategoryOptions() {
    const categories = new Map();
    for (const company of companies) {
      categories.set(company.category, company.categoryLabel || company.category);
    }
    const sorted = [...categories.entries()].sort((a, b) => a[1].localeCompare(b[1]));
    el.category.innerHTML = [
      '<option value="all">All categories</option>',
      ...sorted.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`),
    ].join("");
  }

  function initMap() {
    map = L.map("map", {
      zoomControl: true,
      preferCanvas: true,
    }).setView([37.62, -122.12], 10);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    cluster = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 42,
      showCoverageOnHover: false,
    });
    map.addLayer(cluster);
  }

  function bindEvents() {
    el.search.addEventListener("input", debounce(applyFilters, 80));
    el.category.addEventListener("change", applyFilters);
    el.sort.addEventListener("change", applyFilters);

    document.querySelectorAll("[data-preview-filter]").forEach((button) => {
      button.addEventListener("click", () => {
        state.previewFilter = button.dataset.previewFilter;
        document.querySelectorAll("[data-preview-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
        applyFilters();
      });
    });

    el.previewLocal.addEventListener("click", () => setPreviewMode("local"));
    el.previewLive.addEventListener("click", () => setPreviewMode("live"));
  }

  function applyFilters() {
    const query = el.search.value.trim().toLowerCase();
    const category = el.category.value;

    state.filtered = companies.filter((company) => {
      if (category !== "all" && company.category !== category) {
        return false;
      }
      if (state.previewFilter === "local" && !company.localPreviewExists) {
        return false;
      }
      if (state.previewFilter === "live" && !company.livePreview) {
        return false;
      }
      return !query || company.searchText.includes(query);
    });

    sortCompanies(state.filtered, el.sort.value);
    renderList();
    renderMarkers();
    updateResultLine();

    if (!state.filtered.some((company) => company.id === state.selectedId) && state.filtered[0]) {
      selectCompany(state.filtered[0].id, { pan: true });
    }
  }

  function sortCompanies(items, sortKey) {
    const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: "base" });
    items.sort((a, b) => {
      if (sortKey === "name") return collator.compare(a.name, b.name);
      if (sortKey === "category") return collator.compare(a.categoryLabel, b.categoryLabel) || a.routeStop - b.routeStop;
      if (sortKey === "city") return collator.compare(a.city || a.address, b.city || b.address) || a.routeStop - b.routeStop;
      return a.routeStop - b.routeStop;
    });
  }

  function renderList() {
    const fragment = document.createDocumentFragment();
    for (const company of state.filtered) {
      const row = document.createElement("button");
      row.type = "button";
      row.className = `company-row${company.id === state.selectedId ? " is-active" : ""}`;
      row.dataset.id = company.id;
      row.innerHTML = `
        <span class="row-stop">${escapeHtml(String(company.routeStop))}</span>
        <span>
          <span class="row-title">${escapeHtml(company.name)}</span>
          <span class="row-meta">${escapeHtml(company.categoryLabel)}${company.city ? " · " + escapeHtml(company.city) : ""}</span>
          <span class="row-address">${escapeHtml(company.address || "No address")}</span>
        </span>
        <span class="row-preview">${company.localPreviewExists ? "Local" : "Live"}</span>
      `;
      row.addEventListener("click", () => selectCompany(company.id, { pan: true }));
      fragment.append(row);
    }
    el.list.replaceChildren(fragment);
  }

  function renderMarkers() {
    cluster.clearLayers();
    state.markers.clear();
    const bounds = [];

    for (const company of state.filtered) {
      if (typeof company.latitude !== "number" || typeof company.longitude !== "number") {
        continue;
      }
      const color = colorForCompany(company);
      const marker = L.marker([company.latitude, company.longitude], {
        icon: L.divIcon({
          className: "",
          html: `<span class="lead-pin" style="--pin:${color}">${company.routeStop}</span>`,
          iconSize: [34, 34],
          iconAnchor: [17, 17],
        }),
      });
      marker.bindPopup(`
        <p class="popup-title">${escapeHtml(company.name)}</p>
        <p class="popup-meta">${escapeHtml(company.categoryLabel)}${company.city ? " · " + escapeHtml(company.city) : ""}</p>
      `);
      marker.on("click", () => selectCompany(company.id, { pan: false }));
      state.markers.set(company.id, marker);
      cluster.addLayer(marker);
      bounds.push([company.latitude, company.longitude]);
    }

    if (bounds.length) {
      map.fitBounds(bounds, { padding: [28, 28], maxZoom: 12 });
    }
  }

  function updateResultLine() {
    el.resultCount.textContent = `${state.filtered.length.toLocaleString()} leads`;
    const last = state.filtered.reduce((best, company) => {
      const miles = Number(company.routeCumulativeMiles || 0);
      return miles > best ? miles : best;
    }, 0);
    el.routeSpan.textContent = last ? `${last.toLocaleString()} route miles` : "Route miles ready";
  }

  function selectCompany(id, options = {}) {
    const company = companies.find((item) => item.id === id) || companies[0];
    if (!company) return;

    state.selectedId = company.id;
    if (state.previewMode === "local" && !company.localPreview) {
      state.previewMode = "live";
    }
    if (state.previewMode === "live" && !company.livePreview && company.localPreview) {
      state.previewMode = "local";
    }

    renderSelectedListState();
    renderDetail(company);

    const marker = state.markers.get(company.id);
    if (marker && options.pan) {
      map.setView(marker.getLatLng(), Math.max(map.getZoom(), 13), { animate: true });
      marker.openPopup();
    }
  }

  function renderSelectedListState() {
    el.list.querySelectorAll(".company-row").forEach((row) => {
      row.classList.toggle("is-active", row.dataset.id === state.selectedId);
    });
  }

  function renderDetail(company) {
    el.detailCategory.textContent = company.categoryLabel || "Category";
    el.detailName.textContent = company.name || "Unnamed company";
    el.detailAddress.textContent = company.address || "No address";
    el.detailRoute.textContent = `#${company.routeStop}`;
    setLink(el.callLink, company.phoneHref, company.phone || "Call");
    setLink(el.mapsLink, company.googleMapsLink, "Map");
    setLink(el.stripeLink, company.stripeMonthlyLink, "$20/mo");
    setLink(el.profileLink, company.profileLink, "Profile");
    setLink(el.githubLink, company.githubLink, "GitHub");
    setLink(el.setupLink, company.stripeSetupLink, "Setup plan");
    el.infoPhone.textContent = company.phone || "Missing";
    el.infoHours.textContent = company.hours || "Call for current hours";
    el.infoStatus.textContent = company.websiteStatus || company.leadStatus || "Candidate";
    el.infoDistance.textContent = distanceText(company);
    el.why.textContent = company.whyWebsiteHelps || "No sales note saved.";
    el.evidence.textContent = company.evidence || "No evidence note saved.";

    el.previewLocal.disabled = !company.localPreview;
    el.previewLive.disabled = !company.livePreview;
    el.previewLocal.classList.toggle("is-active", state.previewMode === "local");
    el.previewLive.classList.toggle("is-active", state.previewMode === "live");
    renderPreview(company);
  }

  function renderPreview(company) {
    const previewUrl = state.previewMode === "local" ? company.localPreview : company.livePreview;
    const fallbackUrl = company.localPreview || company.livePreview;
    const currentUrl = previewUrl || fallbackUrl;
    const label = state.previewMode === "local" && company.localPreview ? "Local preview" : "Live preview";

    el.previewStatus.textContent = currentUrl ? label : "No preview";
    el.previewFrame.classList.toggle("is-empty", !currentUrl);
    el.preview.src = currentUrl || "about:blank";
    setLink(el.openCurrent, currentUrl, "Open");
    setLink(el.openCurrentTop, currentUrl, "Open Site");
  }

  function setPreviewMode(mode) {
    const company = companies.find((item) => item.id === state.selectedId);
    if (!company) return;
    if (mode === "local" && !company.localPreview) return;
    if (mode === "live" && !company.livePreview) return;
    state.previewMode = mode;
    renderDetail(company);
  }

  function setLink(anchor, href, text) {
    anchor.textContent = text;
    if (href) {
      anchor.href = href;
      anchor.removeAttribute("aria-disabled");
      anchor.tabIndex = 0;
    } else {
      anchor.href = "#";
      anchor.setAttribute("aria-disabled", "true");
      anchor.tabIndex = -1;
    }
  }

  function colorForCompany(company) {
    return categoryColors[company.category] || company.brandPalette?.primary || "#0f766e";
  }

  function distanceText(company) {
    const leg = company.routeLegMiles;
    const cumulative = company.routeCumulativeMiles;
    if (leg && cumulative) {
      return `${leg} mi leg · ${cumulative} mi total`;
    }
    if (cumulative) return `${cumulative} mi total`;
    if (leg) return `${leg} mi leg`;
    return "Mapped";
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function debounce(fn, wait) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = window.setTimeout(() => fn(...args), wait);
    };
  }

  init();
})();
