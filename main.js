// Audio & State
let isSoundOn = false;
const audio = document.getElementById("audioPlayer");

function toggleSound() {
  const icon = document.getElementById("sound-icon");
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    audio.play().catch(e => console.log("Audio play blocked by browser policy"));
    icon.setAttribute("data-lucide", "volume-2");
  } else {
    audio.pause();
    icon.setAttribute("data-lucide", "volume-x");
  }
  lucide.createIcons();
}

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");
  body.classList.toggle("light-mode");
  if (body.classList.contains("light-mode")) {
    icon.setAttribute("data-lucide", "moon");
  } else {
    icon.setAttribute("data-lucide", "sun");
  }
  lucide.createIcons();
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  menu.classList.toggle("translate-x-full");
}

// Custom Cursor
const cursorInner = document.getElementById("cursor-inner");
const cursorOuter = document.getElementById("cursor-outer");

if (cursorInner && cursorOuter) {
  document.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorInner.style.left = `${posX}px`;
    cursorInner.style.top = `${posY}px`;

    cursorOuter.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 400, fill: "forwards" }
    );
  });
}

// Filterable Projects
function filterProjects(category) {
  const cards = document.querySelectorAll(".project-card");
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach(btn => {
    btn.classList.remove("bg-purple-600", "text-white", "active");
    btn.classList.add("bg-zinc-900", "text-zinc-300");
  });

  event.target.classList.remove("bg-zinc-900", "text-zinc-300");
  event.target.classList.add("bg-purple-600", "text-white", "active");

  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category");
    if (category === "all" || cardCat === category) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

// CLI Playground Logic
const cliInput = document.getElementById("cli-input");
const cliOutput = document.getElementById("cli-output");

if (cliInput) {
  cliInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      handleCliSubmit();
    }
  });
}

function handleCliSubmit() {
  const command = cliInput.value.trim().toLowerCase();
  if (!command) return;

  const cmdLine = document.createElement("p");
  cmdLine.className = "text-purple-400";
  cmdLine.innerHTML = `<span class="text-zinc-500">$</span> ${escapeHtml(command)}`;
  cliOutput.appendChild(cmdLine);

  const response = document.createElement("div");
  response.className = "text-zinc-300 leading-relaxed mb-2";

  switch (command) {
    case "help":
      response.innerHTML = `
        <p class="text-cyan-400 font-semibold mb-1">Available Commands:</p>
        <ul class="space-y-1 list-disc list-inside text-xs">
          <li><span class="text-purple-400">about</span> - Learn about Abderrahman</li>
          <li><span class="text-purple-400">skills</span> - View main technologies</li>
          <li><span class="text-purple-400">projects</span> - List top projects & links</li>
          <li><span class="text-purple-400">contact</span> - Get email & social profiles</li>
          <li><span class="text-purple-400">clear</span> - Clear the CLI window</li>
        </ul>
      `;
      break;
    case "about":
      response.innerHTML = `<p>Abderrahman ELMADI (ABDO EMD) — Web Developer & Digital Visual Artist from Morocco crafting clean UI/UX and web apps.</p>`;
      break;
    case "skills":
      response.innerHTML = `<p>HTML5, CSS3, JavaScript, ReactJS, Next.js, Tailwind CSS, Node.js, Astro, Git, C/C++, Photoshop, Figma.</p>`;
      break;
    case "projects":
      response.innerHTML = `
        <p>1. <a href="https://atomicasher.com" target="_blank" class="text-purple-400 underline">Atomic Asher</a> - Official Website</p>
        <p>2. <a href="https://stopscams.in" target="_blank" class="text-purple-400 underline">StopScams.in</a> - AI Scam Detector</p>
        <p>3. <a href="https://notesync-site.netlify.app/" target="_blank" class="text-purple-400 underline">NoteSync</a> - Supabase Note App</p>
        <p>4. <a href="https://withyour.dog" target="_blank" class="text-purple-400 underline">With Your Dog</a> - Dog-Friendly Spot Finder</p>
        <p>5. <a href="https://vinodjangid07.github.io/Pexelicons/" target="_blank" class="text-purple-400 underline">Pexelicons</a> - Custom PC Folder Icons</p>
        <p>6. <a href="https://lunetra-studio.netlify.app/" target="_blank" class="text-purple-400 underline">Lunetra Studio</a> - Fashion Website</p>
      `;
      break;
    case "contact":
      response.innerHTML = `<p>Email: <a href="mailto:elmadiadam9@gmail.com" class="text-purple-400 underline">elmadiadam9@gmail.com</a> | GitHub: <a href="https://github.com/AbderrahmanAMD" target="_blank" class="text-purple-400 underline">AbderrahmanAMD</a></p>`;
      break;
    case "clear":
      cliOutput.innerHTML = "";
      cliInput.value = "";
      return;
    default:
      response.innerHTML = `<p class="text-red-400">Command not recognized: '${escapeHtml(command)}'. Type <span class="text-cyan-400">'help'</span> for a list of available commands.</p>`;
  }

  cliOutput.appendChild(response);
  cliInput.value = "";
  cliOutput.scrollTop = cliOutput.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Contact Form Handler
function handleFormSubmit(e) {
  e.preventDefault();
  const successMsg = document.getElementById("form-success");
  successMsg.classList.remove("hidden");
  document.getElementById("contact-form").reset();
  setTimeout(() => {
    successMsg.classList.add("hidden");
  }, 5000);
}

// Back to top scroll button
const backToTopBtn = document.getElementById("backtotopbutton");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTopBtn.classList.remove("opacity-0", "pointer-events-none");
    backToTopBtn.classList.add("opacity-100");
  } else {
    backToTopBtn.classList.add("opacity-0", "pointer-events-none");
    backToTopBtn.classList.remove("opacity-100");
  }

  // Active Navbar Highlights
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-purple-400", "font-bold");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("text-purple-400", "font-bold");
    }
  });
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
