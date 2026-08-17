const skillsChartBtn = document.getElementById("skillsChartBtn");
const skillsChartModal = document.getElementById("skillsChartModal");
const skillsChartClose = document.getElementById("skillsChartClose");
const skillsChart = document.getElementById("skillsChart");

const skillRatings = [
    {
        name: "C# WinForms",
        category: "frontend",
        rating: 80
    },
    {
        name: "TypeScript",
        category: "frontend",
        rating: 65
    },
    {
        name: "React",
        category: "frontend",
        rating: 60
    },
    {
        name: "CSS",
        category: "frontend",
        rating: 75
    },
    {
        name: "HTML",
        category: "frontend",
        rating: 85
    },
    {
        name: "Python",
        category: "frontend",
        rating: 80
    },
    {
        name: "PyQt",
        category: "frontend",
        rating: 75
    },
    {
        name: "OpenCV",
        category: "frontend",
        rating: 65
    },
    {
        name: "YOLOv8 Small",
        category: "frontend",
        rating: 55
    },
    {
        name: "PySerial",
        category: "frontend",
        rating: 60
    },
    {
        name: "Folium (Map)",
        category: "frontend",
        rating: 50
    },

    {
        name: "Go",
        category: "backend",
        rating: 65
    },
    {
        name: "GORM",
        category: "backend",
        rating: 60
    },
    {
        name: "Java",
        category: "backend",
        rating: 70
    },
    {
        name: "Spring Boot",
        category: "backend",
        rating: 65
    },
    {
        name: "Spring MVC",
        category: "backend",
        rating: 60
    },
    {
        name: "Spring Security",
        category: "backend",
        rating: 55
    },
    {
        name: "C++ (Arduino)",
        category: "backend",
        rating: 60
    },

    {
        name: "Microsoft SQL Server",
        category: "database",
        rating: 70
    },
    {
        name: "PostgreSQL",
        category: "database",
        rating: 65
    },

    {
        name: "Ubuntu Server",
        category: "infrastructure",
        rating: 65
    },
    {
        name: "Amazon Web Services (AWS)",
        category: "infrastructure",
        rating: 55
    },
    {
        name: "Docker",
        category: "infrastructure",
        rating: 60
    },
    {
        name: "AWS S3",
        category: "infrastructure",
        rating: 55
    }
];

/*
 * if rating is missing or not a number, it will display "Need practice"
 * {
 *     name: "Java",
 *     category: "backend",
 *     rating: 70
 * } */
function createSkillRating(skill) {
    const group = document.createElement("div");

    group.className = "skill-rating-group";

    const header = document.createElement("div");

    header.className = "skill-rating-header";

    const name = document.createElement("span");

    name.className = "skill-rating-name";
    name.textContent = skill.name;

    const status = document.createElement("span");

    status.className = "skill-rating-practice";

    const hasRating =
        typeof skill.rating === "number" &&
        Number.isFinite(skill.rating);

    if (hasRating) {
        status.textContent = "";
    } else {
        status.textContent = "Need practice";
    }

    header.appendChild(name);
    header.appendChild(status);

    const line = document.createElement("div");

    line.className = "skill-rating-line";

    const fill = document.createElement("div");

    fill.className = "skill-rating-fill";
    fill.classList.add(`${skill.category}-rating`);

    if (hasRating) {
        const safeRating = Math.min(
            100,
            Math.max(0, skill.rating)
        );

        fill.style.setProperty(
            "--rating",
            `${safeRating}%`
        );
    } else {
        fill.style.setProperty("--rating", "0%");
    }

    line.appendChild(fill);

    group.appendChild(header);
    group.appendChild(line);

    return group;
}

function renderSkillsChart() {
    if (!skillsChart) {
        return;
    }

    skillsChart.innerHTML = "";

    skillRatings.forEach(skill => {
        skillsChart.appendChild(
            createSkillRating(skill)
        );
    });
}

function openSkillsChart() {
    if (!skillsChartModal) {
        return;
    }

    renderSkillsChart();

    skillsChartModal.classList.add("active");

    document.body.style.overflow = "hidden";
}

function closeSkillsChart() {
    if (!skillsChartModal) {
        return;
    }

    skillsChartModal.classList.remove("active");

    document.body.style.overflow = "";
}

if (skillsChartBtn) {
    skillsChartBtn.addEventListener(
        "click",
        openSkillsChart
    );
}

if (skillsChartClose) {
    skillsChartClose.addEventListener(
        "click",
        closeSkillsChart
    );
}

if (skillsChartModal) {
    const overlay =
        skillsChartModal.querySelector(
            ".skills-chart-overlay"
        );

    if (overlay) {
        overlay.addEventListener(
            "click",
            closeSkillsChart
        );
    }
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        skillsChartModal &&
        skillsChartModal.classList.contains("active")
    ) {
        closeSkillsChart();
    }
});