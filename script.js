const carousel = document.getElementById("projectCarousel");
const track = carousel.querySelector(".carousel-track");

let currentIndex = 0;
let isAnimating = false;
let wheelLocked = false;

const projects = [
    {
        number: "01",
        title: "ERP | On The Job Training",
        description:
            "A Windows-based ERP application that centralizes employee management, payroll, inventory, purchasing, and other business operations, providing a unified platform for managing enterprise resources and workflows. My primary responsibility was the development of the Inventory Management module, which handled the recording and monitoring of incoming and outgoing products, product pricing, stock quantities, and warehouse inventory levels.",
        linkText: "View Company",
        link: "https://www.linkedin.com/company/smpc-pumps/"
    },
    {
        number: "02",
        title: "Slapnote",
        description:
            "A full-stack social networking web application designed to facilitate user interaction and content sharing. The platform features user authentication, profile management, post creation, image sharing, comments, reactions, and user interactions. The project provided hands-on experience in integrating the frontend, backend APIs, and database while developing practical skills in full-stack web development and backend architecture.",
        linkText: "Full-Stack Project",
        link: null
    },
    {
        number: "03",
        title: "Smart Shed | Final Thesis",
        description:
            "This study focuses on the development of a Windows-based AI-assisted surveillance and emergency response system designed for a school environment. The system incorporates AI-powered image detection, emergency gesture recognition as well as a physical emergency button, and automated surveillance event logging to enhance situational awareness, facilitate rapid emergency response, and maintain a reliable record of detected incidents within the designated area.",
        linkText: "View Education",
        link: "#education"
    }
];

function getIndex(index) {
    return ((index % projects.length) + projects.length) % projects.length;
}

function createCard(project, position) {
    const card = document.createElement("article");

    card.className = "project-card carousel-card";
    card.dataset.position = position;

    card.innerHTML = `
        <button
            class="expand-btn"
            type="button"
            aria-label="Expand project"
        >
            <i class="bi bi-arrows-angle-expand"></i>
        </button>

        <div class="project-number">
            ${project.number}
        </div>

        <h3>
            ${project.title}
        </h3>

        <p>
            ${project.description}
        </p>

        ${
            project.link
                ? `
                    <a
                        href="${project.link}"
                        class="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ${project.linkText}
                    </a>
                `
                : `
                    <span class="project-link">
                        ${project.linkText}
                    </span>
                `
        }
    `;

    return card;
}

function renderInitialCards() {
    track.innerHTML = "";

    const left = createCard(
        projects[getIndex(currentIndex - 1)],
        "left"
    );

    const center = createCard(
        projects[currentIndex],
        "center"
    );

    const right = createCard(
        projects[getIndex(currentIndex + 1)],
        "right"
    );

    track.appendChild(left);
    track.appendChild(center);
    track.appendChild(right);
}

function updateCard(card, project) {
    card.querySelector(".project-number").textContent =
        project.number;

    card.querySelector("h3").textContent =
        project.title;

    card.querySelector("p").textContent =
        project.description;

    const oldLink =
        card.querySelector(".project-link");

    if (project.link) {
        const link = document.createElement("a");

        link.className = "project-link";
        link.href = project.link;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = project.linkText;

        oldLink.replaceWith(link);
    } else {
        const span = document.createElement("span");

        span.className = "project-link";
        span.textContent = project.linkText;

        oldLink.replaceWith(span);
    }
}

function moveNext() {
    if (isAnimating) return;

    isAnimating = true;

    const left =
        track.querySelector('[data-position="left"]');

    const center =
        track.querySelector('[data-position="center"]');

    const right =
        track.querySelector('[data-position="right"]');

    left.classList.add("no-transition");

    left.dataset.position = "far-right";

    currentIndex =
        getIndex(currentIndex + 1);

    updateCard(
        left,
        projects[getIndex(currentIndex + 1)]
    );

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            left.classList.remove("no-transition");

            left.dataset.position = "right";

            center.dataset.position = "left";

            right.dataset.position = "center";

            setTimeout(() => {
                isAnimating = false;
            }, 520);
        });
    });
}

function movePrevious() {
    if (isAnimating) return;

    isAnimating = true;

    const left =
        track.querySelector('[data-position="left"]');

    const center =
        track.querySelector('[data-position="center"]');

    const right =
        track.querySelector('[data-position="right"]');

    right.classList.add("no-transition");

    right.dataset.position = "far-left";

    currentIndex =
        getIndex(currentIndex - 1);

    updateCard(
        right,
        projects[getIndex(currentIndex - 1)]
    );

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            right.classList.remove("no-transition");

            right.dataset.position = "left";

            center.dataset.position = "right";

            left.dataset.position = "center";

            setTimeout(() => {
                isAnimating = false;
            }, 520);
        });
    });
}

carousel
    .querySelector(".carousel-next")
    .addEventListener("click", moveNext);

carousel
    .querySelector(".carousel-prev")
    .addEventListener("click", movePrevious);

carousel.addEventListener(
    "wheel",
    event => {
        if (
            Math.abs(event.deltaX) <=
            Math.abs(event.deltaY)
        ) {
            return;
        }

        event.preventDefault();

        if (wheelLocked || isAnimating) {
            return;
        }

        wheelLocked = true;

        if (event.deltaX > 0) {
            moveNext();
        } else {
            movePrevious();
        }

        setTimeout(() => {
            wheelLocked = false;
        }, 520);
    },
    {
        passive: false
    }
);

let touchStartX = 0;
let touchStartY = 0;

carousel.addEventListener(
    "touchstart",
    event => {
        touchStartX =
            event.touches[0].clientX;

        touchStartY =
            event.touches[0].clientY;
    },
    {
        passive: true
    }
);

carousel.addEventListener(
    "touchend",
    event => {
        const touchEndX =
            event.changedTouches[0].clientX;

        const touchEndY =
            event.changedTouches[0].clientY;

        const differenceX =
            touchEndX - touchStartX;

        const differenceY =
            touchEndY - touchStartY;

        if (
            Math.abs(differenceX) <=
            Math.abs(differenceY)
        ) {
            return;
        }

        if (Math.abs(differenceX) < 40) {
            return;
        }

        if (differenceX < 0) {
            moveNext();
        } else {
            movePrevious();
        }
    },
    {
        passive: true
    }
);

const navMenuButton =
    document.querySelector(".nav-menu-btn");

const navLinks =
    document.querySelector(".nav-links");

if (navMenuButton && navLinks) {
    navMenuButton.addEventListener(
        "click",
        () => {
            navLinks.classList.toggle("active");
        }
    );

    navLinks
        .querySelectorAll("a")
        .forEach(link => {
            link.addEventListener(
                "click",
                () => {
                    navLinks.classList.remove("active");
                }
            );
        });

    document.addEventListener(
        "click",
        event => {
            if (
                !navLinks.contains(event.target) &&
                !navMenuButton.contains(event.target)
            ) {
                navLinks.classList.remove("active");
            }
        }
    );
}

renderInitialCards();
