const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const bookingNote = document.querySelector("#bookingNote");
const toast = document.querySelector("#toast");
const mobileQuery = window.matchMedia("(max-width: 768px)");

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

const teachers = [
  {
    id: "shi",
    name: "石老师",
    gender: "不展示",
    badge: "招牌名师",
    subject: "小学数学",
    source: "西南交通大学研究生",
    avatarText: "石",
    avatarTone: "green",
    intro: "长期带小学数学陪读和错题整理，适合需要把过程、步骤和节奏一起管起来的孩子。",
    fit: "三到六年级数学计算、应用题、错题反复、作业节奏慢",
    service: "一对一陪读｜数学专项｜周末错题整理",
    area: ["高新区", "武侯区", "天府新区"],
    tags: ["数学计算", "应用题", "一对一陪读", "可周末"],
    style: "逻辑清楚，擅长把题目步骤拆开讲，适合需要稳定跟进的孩子",
    schedule: "周中晚间、周末可约，具体按片区和孩子时间沟通",
    detail: ["会先看孩子当天任务和作业节奏", "对反复错题做简单记录", "每次尽量给家长留下可反馈的信息"]
  },
  {
    id: "lin",
    name: "林老师",
    gender: "男",
    badge: "可线下",
    subject: "小学数学",
    source: "电子科大",
    avatarText: "林",
    avatarTone: "ink",
    intro: "偏数学思路梳理和作业陪读，适合需要把题目读懂、把步骤写清楚的孩子。",
    fit: "计算粗心、应用题慢、作业节奏差、理科思路弱",
    service: "一对一陪读｜数学计算｜错题整理",
    area: ["高新区", "天府新区"],
    tags: ["数学计算", "错题整理", "线下可约"],
    style: "讲题干净，适合三到六年级数学需要梳理思路的孩子",
    schedule: "周一至周五晚间可约，周末视片区安排",
    detail: ["先判断是不会做还是过程不稳", "陪孩子把计算和应用题步骤写完整", "把当天主要卡点整理给家长"]
  },
  {
    id: "gao",
    name: "高老师",
    gender: "男",
    badge: "英语朗读",
    subject: "小学英语 / 英语朗读",
    source: "海外硕士背景",
    avatarText: "高",
    avatarTone: "orange",
    intro: "擅长英语朗读、发音纠正和基础表达陪练，先帮孩子敢开口，再慢慢稳定节奏。",
    fit: "英语发音不稳、单词记不住、不敢开口读",
    service: "一对一英语朗读陪练｜单词记忆｜发音纠正",
    area: ["青羊区", "武侯区", "高新区"],
    tags: ["英语朗读", "发音纠正", "一对一"],
    style: "亲和自然，适合害怕开口、需要慢慢建立表达信心的孩子",
    schedule: "周中晚间、周六下午可约",
    detail: ["先从课内单词和短句朗读开始", "纠正明显发音问题但不打击孩子", "每次保留可复习的小任务"]
  },
  {
    id: "li-chinese",
    name: "李老师",
    gender: "不展示",
    badge: "阅读陪伴",
    subject: "小学语文",
    source: "四川师范大学",
    avatarText: "李",
    avatarTone: "green",
    intro: "更适合低年级和中低年级语文陪伴，重点是阅读习惯、作业习惯和表达启动。",
    fit: "一到四年级阅读理解、写字慢、作文启动慢、作业习惯不稳",
    service: "语文阅读陪伴｜晚托精管｜低年级习惯",
    area: ["锦江区", "成华区", "青羊区"],
    tags: ["小学语文", "阅读习惯", "低年级"],
    style: "耐心细致，适合低年级和阅读习惯还没建立的孩子",
    schedule: "周一至周五放学后可约",
    detail: ["先稳定作业和阅读打卡节奏", "帮助孩子把题目要求读清楚", "给家长反馈习惯和表达变化"]
  },
  {
    id: "li-care",
    name: "李老师",
    gender: "不展示",
    badge: "作业精管",
    subject: "作业精管 / 小学全科作业陪伴",
    source: "西南财经大学",
    avatarText: "李",
    avatarTone: "orange",
    intro: "擅长晚托精管和作业规划，适合每天需要固定节奏、有人推进和反馈的孩子。",
    fit: "作业拖拉、时间管理弱、每天需要固定节奏推进的孩子",
    service: "晚托精管｜3-6人小组提效｜作业规划",
    area: ["高新区", "锦江区", "武侯区"],
    tags: ["作业规划", "时间管理", "小组提效"],
    style: "节奏感强，适合需要有人盯进度和做反馈的孩子",
    schedule: "周中放学后可约，小组时间按成组情况安排",
    detail: ["先把当天任务拆成可完成的小段", "按时间推进作业而不是放任磨蹭", "记录拖拉点和完成节奏"]
  },
  {
    id: "chen",
    name: "陈老师",
    gender: "不展示",
    badge: "晚托精管",
    subject: "小学语文",
    source: "成都本地师范背景",
    avatarText: "陈",
    avatarTone: "ink",
    intro: "适合低年级作业陪伴和阅读打卡，能把写字、读题和作业习惯慢慢带起来。",
    fit: "低年级阅读打卡、写字慢、作业习惯",
    service: "晚托精管｜阅读陪伴",
    area: ["锦江区", "成华区"],
    tags: ["低年级", "阅读陪伴", "晚托"],
    style: "耐心稳定，适合需要温和陪伴的低年级孩子",
    schedule: "周一至周五放学后可约",
    detail: ["关注孩子是否读懂题目", "陪写字慢的孩子稳定速度", "每天留下简单作业反馈"]
  },
  {
    id: "zhou",
    name: "周老师",
    gender: "不展示",
    badge: "周末可约",
    subject: "小学英语",
    source: "四川大学",
    avatarText: "周",
    avatarTone: "green",
    intro: "适合英语基础表达和朗读陪练，帮助孩子把课内单词、句子和发音稳定下来。",
    fit: "单词记忆、英语朗读、基础表达",
    service: "一对一英语陪练｜周末陪练",
    area: ["青羊区", "武侯区"],
    tags: ["英语陪练", "单词记忆", "周末"],
    style: "节奏温和，适合英语基础需要慢慢补的孩子",
    schedule: "周末和部分周中晚间可约",
    detail: ["围绕课内内容做朗读和复习", "把单词记忆拆成小任务", "鼓励孩子开口表达"]
  },
  {
    id: "wang",
    name: "王老师",
    gender: "不展示",
    badge: "错题整理",
    subject: "小学数学",
    source: "西南交通大学",
    avatarText: "王",
    avatarTone: "orange",
    intro: "适合计算反复错、错题不整理的孩子，重点把错因和步骤重新理清。",
    fit: "计算反复错、错题不整理、做题慢",
    service: "一对一陪读｜周末错题整理",
    area: ["武侯区", "金牛区"],
    tags: ["计算纠错", "错题整理", "稳定"],
    style: "细致稳妥，适合需要反复纠错和整理的孩子",
    schedule: "周末优先，周中晚间可沟通",
    detail: ["先看错题重复类型", "把容易漏的步骤单独标出来", "给家长同步下一步练习方向"]
  },
  {
    id: "he",
    name: "何老师",
    gender: "不展示",
    badge: "长期陪伴",
    subject: "小学全科作业陪伴",
    source: "成都理工大学",
    avatarText: "何",
    avatarTone: "ink",
    intro: "适合放学后长期稳定陪伴，重点接住孩子放学后的时间和作业过程。",
    fit: "放学后没人管、家长下班晚、需要长期稳定安排",
    service: "晚托精管｜长期陪伴",
    area: ["成华区", "龙泉驿区"],
    tags: ["晚托", "作业检查", "长期稳定"],
    style: "稳定负责，适合需要长期固定安排的家庭",
    schedule: "周一至周五放学后可约",
    detail: ["到达后先确认当天任务", "陪孩子按顺序完成作业", "把没完成和卡住的地方反馈给家长"]
  }
];

let activeProfileTeacher = null;
const teacherGrid = document.querySelector("#teacherGrid");
const teacherProfileModal = document.querySelector("#teacherProfileModal");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function teacherConsultNote(teacher, includeSource = false) {
  if (includeSource) {
    return `想咨询：${teacher.name}｜${teacher.subject}｜${teacher.source}｜${teacher.badge}`;
  }

  return `想咨询：${teacher.name}｜${teacher.subject}｜${teacher.area.join("、")}`;
}

function renderTeachers() {
  if (!teacherGrid) return;

  teacherGrid.innerHTML = teachers.map((teacher, index) => {
    const extraClass = index >= 3 ? " mobile-extra-teacher" : "";
    const featuredClass = teacher.id === "shi" ? " teacher-featured" : "";
    const areaText = teacher.area.join("、");
    const visibleTags = teacher.tags.slice(0, 3).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");

    return `
      <article class="teacher-card reveal-card${extraClass}${featuredClass}" data-teacher-id="${escapeHtml(teacher.id)}" tabindex="0" aria-label="查看${escapeHtml(teacher.name)}主页">
        <div class="teacher-badge">${escapeHtml(teacher.badge)}</div>
        <div class="teacher-top">
          <div class="avatar avatar-${escapeHtml(teacher.avatarTone)}">${escapeHtml(teacher.avatarText)}</div>
          <div>
            <h3>${escapeHtml(teacher.name)}</h3>
            <span class="subject">${escapeHtml(teacher.subject)}</span>
          </div>
        </div>
        <p class="source">来源：${escapeHtml(teacher.source)}</p>
        <p class="teacher-fit"><b>适合：</b>${escapeHtml(teacher.fit)}</p>
        <p><b>服务：</b>${escapeHtml(teacher.service)}</p>
        <p><b>区域：</b>${escapeHtml(areaText)}</p>
        <div class="tag-row">${visibleTags}</div>
        <div class="teacher-actions">
          <button class="text-btn teacher-profile-btn" type="button" data-teacher-profile="${escapeHtml(teacher.id)}">查看主页</button>
          <button class="text-btn teacher-consult-btn" type="button" data-teacher-consult="${escapeHtml(teacher.id)}">咨询老师</button>
        </div>
      </article>
    `;
  }).join("");
}

function openTeacherProfile(teacherId) {
  const teacher = teachers.find((item) => item.id === teacherId);
  if (!teacher || !teacherProfileModal) return;

  activeProfileTeacher = teacher;
  document.querySelector("#teacherProfileAvatar").textContent = teacher.avatarText;
  document.querySelector("#teacherProfileAvatar").className = `profile-avatar avatar avatar-${teacher.avatarTone}`;
  document.querySelector("#teacherProfileBadge").textContent = teacher.badge;
  document.querySelector("#teacherProfileName").textContent = teacher.name;
  document.querySelector("#teacherProfileMeta").textContent = `${teacher.subject}｜${teacher.source}`;
  document.querySelector("#teacherProfileTags").innerHTML = teacher.tags.slice(0, 4).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
  document.querySelector("#teacherProfileIntro").textContent = teacher.intro;
  document.querySelector("#teacherProfileFit").textContent = teacher.fit;
  document.querySelector("#teacherProfileService").textContent = teacher.service;
  document.querySelector("#teacherProfileArea").textContent = teacher.area.join("、");
  document.querySelector("#teacherProfileStyle").textContent = teacher.style;
  document.querySelector("#teacherProfileSchedule").textContent = teacher.schedule;
  document.querySelector("#teacherProfileDetail").innerHTML = teacher.detail.map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  teacherProfileModal.classList.add("active");
  teacherProfileModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  window.setTimeout(() => {
    document.querySelector("#teacherProfileConsult")?.focus();
  }, 80);
}

function closeTeacherProfile() {
  if (!teacherProfileModal) return;

  teacherProfileModal.classList.remove("active");
  teacherProfileModal.setAttribute("aria-hidden", "true");
  activeProfileTeacher = null;

  if (!activeModal) {
    document.body.classList.remove("modal-open");
  }
}

renderTeachers();

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

teacherGrid?.addEventListener("click", (event) => {
  const profileButton = event.target.closest("[data-teacher-profile]");
  const consultButton = event.target.closest("[data-teacher-consult]");
  const card = event.target.closest("[data-teacher-id]");

  if (profileButton) {
    event.stopPropagation();
    openTeacherProfile(profileButton.dataset.teacherProfile);
    return;
  }

  if (consultButton) {
    event.stopPropagation();
    const teacher = teachers.find((item) => item.id === consultButton.dataset.teacherConsult);
    if (teacher) {
      openBookingWithNote(teacherConsultNote(teacher));
    }
    return;
  }

  if (card) {
    openTeacherProfile(card.dataset.teacherId);
  }
});

teacherGrid?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;

  const card = event.target.closest("[data-teacher-id]");
  if (!card) return;

  event.preventDefault();
  openTeacherProfile(card.dataset.teacherId);
});

document.querySelectorAll("[data-close-profile]").forEach((item) => {
  item.addEventListener("click", closeTeacherProfile);
});

document.querySelector("#teacherProfileConsult")?.addEventListener("click", () => {
  if (!activeProfileTeacher) return;

  const note = teacherConsultNote(activeProfileTeacher, true);
  closeTeacherProfile();
  openBookingWithNote(note);
});

document.querySelectorAll("[data-close-modal]").forEach((item) => {
  item.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTeacherProfile();
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

const mobileToggleConfig = {
  services: {
    bodyClass: "mobile-services-open",
    openText: "收起服务",
    closedText: "查看更多服务"
  },
  teachers: {
    bodyClass: "mobile-teachers-open",
    openText: "收起老师",
    closedText: "查看更多老师"
  },
  groups: {
    bodyClass: "mobile-groups-open",
    openText: "收起小组",
    closedText: "查看更多小组"
  },
  needs: {
    bodyClass: "mobile-needs-open",
    openText: "收起需求",
    closedText: "查看更多需求"
  }
};

document.querySelectorAll("[data-toggle-mobile-list]").forEach((button) => {
  button.addEventListener("click", () => {
    const config = mobileToggleConfig[button.dataset.toggleMobileList];
    if (!config) return;

    const isOpen = document.body.classList.toggle(config.bodyClass);
    button.textContent = isOpen ? config.openText : config.closedText;
    button.setAttribute("aria-expanded", String(isOpen));

    if (isOpen) {
      document.querySelectorAll(".mobile-extra-service, .mobile-extra-teacher, .mobile-extra-group, .mobile-extra-need").forEach((item) => {
        item.classList.add("is-visible");
      });
    }
  });
});

document.querySelectorAll("[data-mobile-note]").forEach((button) => {
  button.addEventListener("click", () => {
    openBookingWithNote(button.dataset.mobileNote || "");
  });
});

document.querySelectorAll("[data-mobile-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.mobileScroll);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

document.querySelectorAll(".flow-step").forEach((step) => {
  const toggleStep = () => {
    if (!mobileQuery.matches) return;

    document.querySelectorAll(".flow-step").forEach((other) => {
      other.classList.toggle("mobile-open", other === step);
    });
  };

  step.addEventListener("click", toggleStep);
  step.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleStep();
    }
  });
});

document.querySelectorAll(".need-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (!mobileQuery.matches) return;
    if (event.target.closest("button")) return;

    document.querySelectorAll(".need-card").forEach((other) => {
      other.classList.toggle("mobile-open", other === card);
    });
  });
});

document.querySelectorAll("[data-compare-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.compareTab;

    document.querySelectorAll("[data-compare-tab]").forEach((item) => {
      item.classList.toggle("active", item === tab);
    });

    document.querySelectorAll("[data-compare-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.comparePanel === key);
    });
  });
});

document.querySelector("[data-toggle-about]")?.addEventListener("click", (event) => {
  const button = event.currentTarget;
  const aboutCard = button.closest(".about-copy");
  const isOpen = aboutCard?.classList.toggle("mobile-open");

  button.textContent = isOpen ? "收起" : "了解更多";
  button.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

function syncMobileDefaults() {
  const faqItems = document.querySelectorAll(".faq-list details");

  if (mobileQuery.matches) {
    faqItems.forEach((item) => {
      item.open = false;
    });
    return;
  }

  if (faqItems.length && !Array.from(faqItems).some((item) => item.open)) {
    faqItems[0].open = true;
  }
}

syncMobileDefaults();
if (mobileQuery.addEventListener) {
  mobileQuery.addEventListener("change", syncMobileDefaults);
} else if (mobileQuery.addListener) {
  mobileQuery.addListener(syncMobileDefaults);
}

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

function encode(data) {
  return new URLSearchParams(data).toString();
}

function collectFormData(form) {
  const rawData = new FormData(form);
  const data = {};

  rawData.forEach((value, key) => {
    if (key === "bot-field") return;

    if (data[key]) {
      data[key] = Array.isArray(data[key]) ? data[key] : [data[key]];
      data[key].push(value);
    } else {
      data[key] = value;
    }
  });

  return data;
}

function normalizeFormData(data, formName) {
  const normalized = {
    "form-name": formName
  };

  Object.entries(data).forEach(([key, value]) => {
    if (key === "form-name") return;
    normalized[key] = Array.isArray(value) ? value.join("、") : value;
  });

  return normalized;
}

async function submitNetlifyForm(form, modal, formName) {
  if (!validateForm(form)) return;

  const formData = normalizeFormData(collectFormData(form), formName);

  console.log("新雨表单提交：", formData);

  // 注意：Netlify Forms 只有部署到 Netlify 后才会真正收集表单。
  // 本地打开 index.html 时，fetch("/") 不会进入 Netlify 后台。
  // 本地测试只能看控制台数据和成功页效果。
  // 后续也可以在这里同步接飞书多维表格、腾讯文档、金数据、自有后端或 Webhook。

  try {
    if (window.location.protocol !== "file:") {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode(formData)
      });

      if (!response.ok) {
        throw new Error(`Netlify Forms 提交失败：${response.status}`);
      }
    }

    form.reset();
    showSuccessView(modal);
  } catch (error) {
    console.error(error);
    showToast("提交可能失败了，请直接添加微信 shalizi258 或拨打 15908145298。");
  }
}

document.querySelector("#bookingForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNetlifyForm(event.currentTarget, modals.booking, "parent-lead");
});

document.querySelector("#teacherForm")?.addEventListener("submit", (event) => {
  event.preventDefault();
  submitNetlifyForm(event.currentTarget, modals.teacher, "teacher-apply");
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
    const label = button.dataset.copyLabel || "内容";

    try {
      await copyText(button.dataset.copy || "");
      showToast(`${label}已复制`);
    } catch (error) {
      showToast("复制失败，请手动复制");
      console.warn("复制失败：", error);
    }
  });
});
