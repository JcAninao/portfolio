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
    return (
        (index % projects.length) +
        projects.length
    ) % projects.length;
}

function createCard(project) {
    const card = document.createElement("article");

    card.className = "project-card carousel-card";

    card.innerHTML = `
        <button
            class="expand-btn"
            aria-label="Expand ${project.title}"
            type="button"
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

function renderCards() {
    const leftIndex = getIndex(currentIndex - 1);
    const centerIndex = getIndex(currentIndex);
    const rightIndex = getIndex(currentIndex + 1);

    const indexes = [
        leftIndex,
        centerIndex,
        rightIndex
    ];

    track.innerHTML = "";

    indexes.forEach((index, position) => {
        const card = createCard(projects[index]);

        if (position === 0) {
            card.dataset.position = "left";
        }

        if (position === 1) {
            card.dataset.position = "center";
        }

        if (position === 2) {
            card.dataset.position = "right";
        }

        track.appendChild(card);
    });

    attachExpandButtons();
}

function nextProject() {
    if (isAnimating) return;

    isAnimating = true;

    const current = track.querySelector(
        '[data-position="center"]'
    );

    const right = track.querySelector(
        '[data-position="right"]'
    );

    const left = track.querySelector(
        '[data-position="left"]'
    );

    current.style.transform =
        "translateX(calc(-1 * (var(--card-width) + var(--card-gap)))) scale(0.86)";

    current.style.opacity = "0.62";

    right.style.transform =
        "translateX(0) scale(1)";

    right.style.opacity = "1";

    left.style.transform =
        "translateX(calc(-2 * (var(--card-width) + var(--card-gap)))) scale(0.75)";

    left.style.opacity = "0";

    setTimeout(() => {
        currentIndex = getIndex(currentIndex + 1);

        renderCards();

        isAnimating = false;
    }, 500);
}

function previousProject() {
    if (isAnimating) return;

    isAnimating = true;

    const current = track.querySelector(
        '[data-position="center"]'
    );

    const left = track.querySelector(
        '[data-position="left"]'
    );

    const right = track.querySelector(
        '[data-position="right"]'
    );

    current.style.transform =
        "translateX(calc(var(--card-width) + var(--card-gap))) scale(0.86)";

    current.style.opacity = "0.62";

    left.style.transform =
        "translateX(0) scale(1)";

    left.style.opacity = "1";

    right.style.transform =
        "translateX(calc(2 * (var(--card-width) + var(--card-gap)))) scale(0.75)";

    right.style.opacity = "0";

    setTimeout(() => {
        currentIndex = getIndex(currentIndex - 1);

        renderCards();

        isAnimating = false;
    }, 500);
}

function createOverlay() {
    const overlay = document.createElement("div");

    overlay.className = "carousel-overlay";

    document.body.appendChild(overlay);

    return overlay;
}

const overlay = createOverlay();

function openExpandedProject(card) {
    const existingCard =
        document.querySelector(".carousel-card.expanded");

    if (existingCard && existingCard !== card) {
        existingCard.classList.remove("expanded");
    }

    card.classList.add("expanded");

    overlay.classList.add("active");

    document.body.classList.add("project-expanded");
}

function closeExpandedProject() {
    const expandedCard =
        document.querySelector(".carousel-card.expanded");

    if (!expandedCard) return;

    expandedCard.classList.remove("expanded");

    overlay.classList.remove("active");

    document.body.classList.remove("project-expanded");
}

function attachExpandButtons() {
    const expandButtons =
        document.querySelectorAll(".expand-btn");

    expandButtons.forEach(button => {
        button.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            const card =
                button.closest(".carousel-card");

            if (!card) return;

            if (card.classList.contains("expanded")) {
                closeExpandedProject();
            } else {
                openExpandedProject(card);
            }
        });
    });
}

overlay.addEventListener(
    "click",
    closeExpandedProject
);

document.addEventListener(
    "keydown",
    event => {
        if (event.key === "Escape") {
            closeExpandedProject();
        }
    }
);

carousel
    .querySelector(".carousel-next")
    .addEventListener(
        "click",
        nextProject
    );

carousel
    .querySelector(".carousel-prev")
    .addEventListener(
        "click",
        previousProject
    );

carousel.addEventListener(
    "wheel",
    function (event) {
        if (
            Math.abs(event.deltaX) <=
            Math.abs(event.deltaY)
        ) {
            return;
        }

        event.preventDefault();

        if (wheelLocked) return;

        wheelLocked = true;

        if (event.deltaX > 0) {
            nextProject();
        } else {
            previousProject();
        }

        setTimeout(() => {
            wheelLocked = false;
        }, 500);
    },
    {
        passive: false
    }
);

let touchStartX = 0;
let touchStartY = 0;

carousel.addEventListener(
    "touchstart",
    function (event) {
        if (
            event.target.closest(".expand-btn")
        ) {
            return;
        }

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
    function (event) {
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
            nextProject();
        } else {
            previousProject();
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
        event => {
            event.stopPropagation();

            navLinks.classList.toggle("active");
        }
    );

    navLinks
        .querySelectorAll("a")
        .forEach(link => {
            link.addEventListener(
                "click",
                () => {
                    navLinks.classList.remove(
                        "active"
                    );
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
                navLinks.classList.remove(
                    "active"
                );
            }
        }
    );
}

renderCards();
