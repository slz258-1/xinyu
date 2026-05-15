const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const bookingNote = document.querySelector("#bookingNote");
const toast = document.querySelector("#toast");

const modals = {
  booking: document.querySelector("#bookingModal"),
  teacher: document.querySelector("#teacherModal")
};

let activeModal = null;

menuToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".site-nav a, .brand-lockup").forEach((link) => {
  link.addEventListener("click", () => {
    header?.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

function showFormView(modal) {
  const formView = modal.querySelector(".modal-form-view");
  const successView = modal.querySelector(".modal-success-view");
  formView.hidden = false;
  successView.hidden = true;
}

function showSuccessView(modal) {
  const formView = modal.querySelector(".modal-form-view");
  const successView = modal.querySelector(".modal-success-view");
  formView.hidden = true;
  successView.hidden = false;
}

function openModal(name) {
  const modal = modals[name];
  if (!modal) return;

  closeModal();
  activeModal = modal;
  showFormView(modal);
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  header?.classList.remove("nav-open");
  menuToggle?.setAttribute("aria-expanded", "false");

  window.setTimeout(() => {
    modal.querySelector("input, textarea, button")?.focus();
  }, 80);
}

function closeModal() {
  if (!activeModal) return;

  activeModal.classList.remove("active");
  activeModal.setAttribute("aria-hidden", "true");
  activeModal = null;
  document.body.classList.remove("modal-open");
}

function openBookingWithNote(note = "") {
  if (bookingNote) {
    bookingNote.value = note;
  }
  openModal("booking");
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const modalName = button.dataset.openModal;
    const note = button.dataset.note;

    if (modalName === "booking" && note) {
      openBookingWithNote(note);
      return;
    }

    openModal(modalName);
  });
});

document.querySelectorAll(".note-fill").forEach((button) => {
  button.addEventListener("click", () => {
    const source = button.closest("[data-note]");
    openBookingWithNote(source?.dataset.note || "");
  });
});

document.querySelectorAll("[data-close-modal]").forEach((item) => {
  item.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

const matchItems = Array.from(document.querySelectorAll(".match-card"));
const matchPanel = document.querySelector("#matchList");
let matchIndex = 0;
let matchTimer = null;

function showMatchItem(index) {
  matchItems.forEach((item, itemIndex) => {
    item.classList.toggle("active", itemIndex === index);
  });
}

function startMatchLoop() {
  if (!matchItems.length) return;
  stopMatchLoop();
  matchTimer = window.setInterval(() => {
    matchIndex = (matchIndex + 1) % matchItems.length;
    showMatchItem(matchIndex);
  }, 6000);
}

function stopMatchLoop() {
  if (matchTimer) {
    window.clearInterval(matchTimer);
    matchTimer = null;
  }
}

matchPanel?.addEventListener("mouseenter", stopMatchLoop);
matchPanel?.addEventListener("mouseleave", startMatchLoop);
matchPanel?.addEventListener("focusin", stopMatchLoop);
matchPanel?.addEventListener("focusout", startMatchLoop);
startMatchLoop();

const revealCards = document.querySelectorAll(".reveal-card");

revealCards.forEach((card, index) => {
  card.style.transitionDelay = `${(index % 6) * 60}ms`;
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -40px"
  });

  revealCards.forEach((card) => revealObserver.observe(card));
} else {
  revealCards.forEach((card) => card.classList.add("is-visible"));
}

function clearFieldError(input) {
  const label = input.closest("label");
  label?.classList.remove("has-error");
  label?.querySelector(".field-error")?.remove();
}

function setFieldError(input, message) {
  const label = input.closest("label");
  if (!label) return;

  label.classList.add("has-error");
  label.querySelector(".field-error")?.remove();

  const error = document.createElement("span");
  error.className = "field-error";
  error.textContent = message;
  label.appendChild(error);
}

function validateForm(form) {
  let valid = true;
  const requiredInputs = form.querySelectorAll("[data-required='true']");

  requiredInputs.forEach((input) => {
    clearFieldError(input);

    if (!input.value.trim()) {
      setFieldError(input, "请填写这一项");
      valid = false;
    }
  });

  form.querySelector(".has-error input, .has-error textarea")?.focus();
  return valid;
}

document.querySelectorAll("[data-required='true']").forEach((input) => {
  input.addEventListener("input", () => clearFieldError(input));
});

function collectFormData(form) {
  const rawData = new FormData(form);
  const data = {};

  rawData.forEach((value, key) => {
    if (data[key]) {
      data[key] = Array.isArray(data[key]) ? data[key] : [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
}

function submitStaticForm(form, modal, type) {
  if (!validateForm(form)) return;

  const formData = {
    type,
    submittedAt: new Date().toISOString(),
    ...collectFormData(form)
  };

  console.log("新雨表单提交：", formData);

  // 后续可以接飞书多维表格、腾讯文档、金数据、自有后端或 Webhook。
  // 当前页面为静态演示，后续只需把这里替换为 fetch 提交即可。

  form.reset();
  showSuccessView(modal);
}

document.querySelector("#bookingForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitStaticForm(event.currentTarget, modals.booking, "家长孩子需求");
});

document.querySelector("#teacherForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitStaticForm(event.currentTarget, modals.teacher, "老师入驻申请");
});

document.querySelectorAll(".faq-list details").forEach((item) => {
  item.addEventListener("toggle", () => {
    if (!item.open) return;

    document.querySelectorAll(".faq-list details").forEach((other) => {
      if (other !== item) {
        other.open = false;
      }
    });
  });
});

function showToast(message) {
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
}

async function copyText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

document.querySelectorAll(".copy-btn").forEach((button) => {
  button.addEventListener("click", async () => {
    try {
      await copyText(button.dataset.copy || "");
      showToast("微信号已复制");
    } catch (error) {
      showToast("复制失败，请手动复制");
      console.warn("复制微信号失败：", error);
    }
  });
});
