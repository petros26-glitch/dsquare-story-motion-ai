document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }));
  }

  document.querySelectorAll("[data-demo-form]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();
      const message = form.querySelector(".form-message");
      if (message) {
        message.textContent = form.dataset.demoMessage || "This page is a frontend prototype. Account and server services will be connected during backend development.";
        message.classList.add("is-visible");
      }
    });
  });

  const storyInput = document.querySelector("#story-input");
  const wordCount = document.querySelector("#word-count");
  const buildScenes = document.querySelector("#build-scenes");
  const sceneList = document.querySelector("#scene-list");
  if (storyInput && wordCount) {
    const updateCount = () => {
      const words = storyInput.value.trim().split(/\s+/).filter(Boolean);
      wordCount.textContent = String(storyInput.value.trim() ? words.length : 0);
    };
    storyInput.addEventListener("input", updateCount);
    updateCount();
  }
  if (storyInput && buildScenes && sceneList) {
    buildScenes.addEventListener("click", () => {
      const paragraphs = storyInput.value.split(/\n+/).map(p => p.trim()).filter(Boolean);
      sceneList.replaceChildren();
      if (!paragraphs.length) {
        sceneList.innerHTML = '<div class="empty-state">Add your story above before building scenes.</div>';
        return;
      }
      paragraphs.forEach((paragraph, index) => {
        const item = document.createElement("article");
        item.className = "scene-item";
        const title = document.createElement("strong");
        title.textContent = "Scene " + String(index + 1).padStart(2, "0");
        const body = document.createElement("p");
        body.textContent = paragraph;
        item.append(title, body);
        sceneList.append(item);
      });
      const notice = document.querySelector("#scene-notice");
      if (notice) notice.textContent = paragraphs.length + " draft scene(s) created from your paragraphs. This is a local preview; AI image generation and video export are not connected yet.";
    });
  }

  const clearStory = document.querySelector("#clear-story");
  if (clearStory && storyInput && wordCount && sceneList) {
    clearStory.addEventListener("click", () => {
      storyInput.value = "";
      wordCount.textContent = "0";
      sceneList.replaceChildren();
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.textContent = "Your scenes will appear here after you add a story.";
      sceneList.append(empty);
      const notice = document.querySelector("#scene-notice");
      if (notice) notice.textContent = "Your draft scenes will appear below. This is a local preview; AI services are not connected yet.";
      storyInput.focus();
    });
  }

  const year = document.querySelectorAll("[data-current-year]");
  year.forEach(node => node.textContent = String(new Date().getFullYear()));
});