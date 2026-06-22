const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle?.addEventListener('click', () => {
  const expanded = siteNav.classList.toggle('active');
  navToggle.setAttribute('aria-expanded', expanded.toString());
});

// Copy email button handler
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-email');
  if (!btn) return;
  const email = btn.dataset.email;
  if (!email) return;
  navigator.clipboard?.writeText(email).then(() => {
    const original = btn.textContent;
    btn.textContent = 'Copied';
    setTimeout(() => btn.textContent = original, 1600);
  }).catch(() => {
    // fallback: select prompt
    window.prompt('Copy email', email);
  });
});

// Toggle expandable cards
function toggleCard(cardElement) {
  // Check if the click was on a link or video - if so, don't toggle
  if (event.target.closest('a') || event.target.closest('video')) {
    return;
  }

  const card = cardElement.closest('.expandable-card');
  const isExpanded = card.getAttribute('data-expanded') === 'true';

  // Close all other cards
  document.querySelectorAll('.expandable-card').forEach(otherCard => {
    if (otherCard !== card) {
      otherCard.setAttribute('data-expanded', 'false');
    }
  });

  // Toggle current card
  card.setAttribute('data-expanded', (!isExpanded).toString());
}

// Skill Tree Functions
const skillDetails = {
  core: {
    title: "Content Creator",
    description: "I create and edit online content, make 3D renders, and polish visuals in Photoshop. My work spans gaming videos, creative projects, and digital art.",
    stats: [
      { label: "Video Editing", value: "90%" },
      { label: "3D Rendering", value: "85%" },
      { label: "Visual Design", value: "88%" }
    ]
  },
  creative: {
    title: "Creative Thinker",
    description: "I enjoy exploring new ideas and finding fresh ways to present gaming and creative content. Whether it's storytelling in videos or composition in 3D renders, I push boundaries to create content that stands out.",
    stats: [
      { label: "Innovation", value: "95%" },
      { label: "Storytelling", value: "88%" },
      { label: "Visual Design", value: "82%" }
    ]
  },
  innovation: {
    title: "Innovation",
    description: "I approach each project with curiosity and innovation, always looking for unique angles and creative solutions that make content stand out.",
    stats: [
      { label: "Creative Problem Solving", value: "92%" },
      { label: "Original Thinking", value: "88%" },
      { label: "Experimentation", value: "85%" }
    ]
  },
  storytelling: {
    title: "Storytelling",
    description: "I craft compelling narratives that engage audiences and convey messages effectively through visual media and content structure.",
    stats: [
      { label: "Narrative Structure", value: "90%" },
      { label: "Audience Engagement", value: "87%" },
      { label: "Visual Storytelling", value: "85%" }
    ]
  },
  learning: {
    title: "Dedicated Learner",
    description: "I am constantly improving my editing, animation, and rendering skills through practice and study. Every project is an opportunity to learn and refine my craft.",
    stats: [
      { label: "Growth Mindset", value: "92%" },
      { label: "Skill Development", value: "85%" },
      { label: "Adaptability", value: "90%" }
    ]
  },
  growth: {
    title: "Growth Mindset",
    description: "I believe in continuous improvement and embrace challenges as opportunities to develop new skills and expand my capabilities.",
    stats: [
      { label: "Continuous Learning", value: "94%" },
      { label: "Challenge Acceptance", value: "89%" },
      { label: "Self-Reflection", value: "87%" }
    ]
  },
  adaptability: {
    title: "Adaptability",
    description: "I quickly adjust to new tools, techniques, and project requirements, staying flexible in dynamic creative environments.",
    stats: [
      { label: "Tool Flexibility", value: "91%" },
      { label: "Quick Learning", value: "88%" },
      { label: "Versatility", value: "86%" }
    ]
  },
  detail: {
    title: "Detail-Oriented",
    description: "I focus on polished visuals, smooth edits, and strong presentation in every project. Quality matters in every frame and pixel, from color grading to timing and composition.",
    stats: [
      { label: "Precision", value: "94%" },
      { label: "Quality Focus", value: "91%" },
      { label: "Attention", value: "89%" }
    ]
  },
  precision: {
    title: "Precision",
    description: "I pay meticulous attention to small details that make the difference between good and great work, ensuring every element serves a purpose.",
    stats: [
      { label: "Accuracy", value: "93%" },
      { label: "Quality Control", value: "90%" },
      { label: "Error Detection", value: "88%" }
    ]
  },
  quality: {
    title: "Quality Focus",
    description: "I maintain high standards across all projects, from initial concept to final delivery, ensuring professional and polished results.",
    stats: [
      { label: "Standards Maintenance", value: "92%" },
      { label: "Final Polish", value: "89%" },
      { label: "Excellence Drive", value: "87%" }
    ]
  },
  collab: {
    title: "Collaborative",
    description: "I value feedback and enjoy working with others to create content that connects with audiences. Great content often comes from great collaboration.",
    stats: [
      { label: "Teamwork", value: "87%" },
      { label: "Communication", value: "85%" },
      { label: "Feedback", value: "93%" }
    ]
  },
  teamwork: {
    title: "Teamwork",
    description: "I thrive in collaborative environments, contributing effectively to group projects while supporting and learning from team members.",
    stats: [
      { label: "Collaboration", value: "90%" },
      { label: "Support", value: "88%" },
      { label: "Contribution", value: "86%" }
    ]
  },
  communication: {
    title: "Communication",
    description: "I communicate ideas clearly and effectively, whether discussing project requirements, providing feedback, or presenting creative concepts.",
    stats: [
      { label: "Clarity", value: "91%" },
      { label: "Listening", value: "89%" },
      { label: "Presentation", value: "87%" }
    ]
  },
  premiere: {
    title: "Adobe Premiere Pro",
    description: "Professional video editing software for creating polished content with advanced editing tools, effects, and seamless workflow integration.",
    stats: [
      { label: "Video Editing", value: "90%" },
      { label: "Effects & Transitions", value: "85%" },
      { label: "Workflow Efficiency", value: "88%" }
    ]
  },
  davinci: {
    title: "DaVinci Resolve",
    description: "Advanced color grading and editing software used for professional color correction, audio post-production, and visual effects.",
    stats: [
      { label: "Color Grading", value: "88%" },
      { label: "Audio Mixing", value: "82%" },
      { label: "Professional Workflow", value: "85%" }
    ]
  },
  blender: {
    title: "Blender",
    description: "Powerful 3D creation suite for modeling, sculpting, animation, and rendering, used to create stunning 3D visuals and animations.",
    stats: [
      { label: "3D Modeling", value: "85%" },
      { label: "Animation", value: "80%" },
      { label: "Rendering", value: "82%" }
    ]
  },
  photoshop: {
    title: "Adobe Photoshop",
    description: "Industry-standard image editing software for creating and manipulating visuals, designing thumbnails, and polishing digital artwork.",
    stats: [
      { label: "Image Editing", value: "90%" },
      { label: "Graphic Design", value: "85%" },
      { label: "Digital Art", value: "88%" }
    ]
  },
  canva: {
    title: "Canva",
    description: "User-friendly design platform for creating social media graphics, presentations, and marketing materials with professional templates.",
    stats: [
      { label: "Template Design", value: "92%" },
      { label: "Social Media Assets", value: "88%" },
      { label: "Quick Turnaround", value: "90%" }
    ]
  }
};

function showSkillDetails(element) {
  const skill = element.getAttribute('data-skill');
  const details = skillDetails[skill];

  if (details) {
    document.getElementById('skillTitle').textContent = details.title;

    let statsHTML = '';
    details.stats.forEach(stat => {
      statsHTML += `
        <div class="stat-item">
          <span class="stat-label">${stat.label}</span>
          <span class="stat-value">${stat.value}</span>
        </div>
      `;
    });

    document.getElementById('skillContent').innerHTML = `
      <p>${details.description}</p>
      <div class="skill-stats">
        ${statsHTML}
      </div>
    `;

    document.getElementById('skillDetails').classList.add('active');
  }
}

function closeSkillDetails() {
  document.getElementById('skillDetails').classList.remove('active');
}
