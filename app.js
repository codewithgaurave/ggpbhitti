// Mobile menu functionality that works reliably
document.addEventListener("DOMContentLoaded", function () {
  // Get navigation elements
  const menuBtn = document.querySelector(".menu-icon");
  const navContainer = document.getElementById("navContainer");
  const navItems = document.querySelectorAll(".main-nav > li");

  // Toggle menu on button click
  menuBtn.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    navContainer.classList.toggle("responsive");
  });

  // Handle dropdown toggles for mobile
  navItems.forEach(function (item) {
    const link = item.querySelector("a");
    const dropdown = item.querySelector(".dropdown-content");

    if (dropdown) {
      link.addEventListener("click", function (e) {
        // Only handle dropdown toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Close other open dropdowns
          navItems.forEach(function (otherItem) {
            if (otherItem !== item && otherItem.classList.contains("active")) {
              otherItem.classList.remove("active");
            }
          });

          // Toggle current dropdown
          item.classList.toggle("active");
        }
      });
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      const isClickInsideNav = navContainer.contains(e.target);
      const isClickOnMenuBtn = menuBtn.contains(e.target);

      if (!isClickInsideNav && !isClickOnMenuBtn) {
        navContainer.classList.remove("responsive");
        navItems.forEach(function (item) {
          item.classList.remove("active");
        });
      }
    }
  });

  // Close menu on window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navContainer.classList.remove("responsive");
      navItems.forEach(function (item) {
        item.classList.remove("active");
      });
    }
  });
});

// Slider functionality
document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".prev-slide");
  const nextBtn = document.querySelector(".next-slide");
  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 5000; // 5 seconds

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Next slide function
  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  // Previous slide function
  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }

  // Update slider display
  function updateSlider() {
    // Update slider position
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update active classes
    slides.forEach((slide, index) => {
      slide.classList.toggle("active", index === currentSlide);
    });

    // Update dots
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Auto slide function
  function startAutoSlide() {
    clearInterval(slideInterval); // Clear any existing interval
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  // Initialize slider
  function initSlider() {
    // Set initial position
    slider.style.transition = "transform 0.5s ease";
    updateSlider();

    // Start auto-sliding
    startAutoSlide();

    // Event listeners for buttons
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });

    // Pause on hover
    slider.addEventListener("mouseenter", pauseAutoSlide);
    slider.addEventListener("mouseleave", startAutoSlide);

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
        pauseAutoSlide();
      },
      { passive: true }
    );

    slider.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        resetAutoSlide();
      },
      { passive: true }
    );
  }

  function handleSwipe() {
    const threshold = 50;
    if (touchEndX < touchStartX - threshold) {
      nextSlide();
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide();
    }
  }

  function pauseAutoSlide() {
    clearInterval(slideInterval);
  }

  function resetAutoSlide() {
    pauseAutoSlide();
    startAutoSlide();
  }

  // Initialize the slider
  initSlider();
});

// Gallery tab functionality
document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const galleryItems = document.querySelectorAll(".gallery-item, .no-images");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      const category = this.dataset.category;

      // Show/hide gallery items based on category
      galleryItems.forEach((item) => {
        if (category === "all" || item.dataset.category === category) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
});


// About Institute Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.about-tab');
  const sectionTitle = document.getElementById('section-title');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab to show and its title
          const tabId = this.dataset.tab;
          const newTitle = this.dataset.title;
          
          // Update the section title
          sectionTitle.textContent = newTitle;
          
          // Hide all tab panes
          document.querySelectorAll('.tab-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
});

// Academic Tab Functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabs = document.querySelectorAll('.academic-tab');
  const academicTitle = document.getElementById('academic-title');
  
  tabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          tabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab to show and its title
          const tabId = this.dataset.tab;
          const newTitle = this.dataset.title;
          
          // Update the section title
          academicTitle.textContent = newTitle;
          
          // Hide all tab panes
          document.querySelectorAll('.academic-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
});


// Syllabus PDF Viewer Functionality
document.addEventListener('DOMContentLoaded', function() {
  const syllabusButtons = document.querySelectorAll('.syllabus-btn');
  const pdfViewer = document.getElementById('pdf-viewer');
  const downloadLink = document.getElementById('download-pdf');
  const mobileDownloadLink = document.getElementById('mobile-download');
  
  // Check if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Function to update PDF
  function updatePDF(pdfFile) {
      // For all devices
      pdfViewer.src = pdfFile;
      downloadLink.href = pdfFile;
      downloadLink.download = pdfFile;
      mobileDownloadLink.href = pdfFile;
      mobileDownloadLink.download = pdfFile;
      
      // Special handling for mobile
      if(isMobile) {
          // You could add Google Docs viewer here if needed:
          // pdfViewer.src = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + '/' + pdfFile)}&embedded=true`;
      }
  }
  
  // Set up button click handlers
  syllabusButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Update active button
          syllabusButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Update PDF
          const pdfFile = this.getAttribute('data-pdf');
          updatePDF(pdfFile);
      });
  });
  
  // Initial setup for mobile
  if(isMobile) {
      // Optional: You could hide the iframe completely on mobile
      // pdfViewer.style.display = 'none';
      
      // Or make it smaller
      pdfViewer.style.height = '300px';
  }
});


// Admission Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const admissionTabs = document.querySelectorAll('.admission-tab');
  
  admissionTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          admissionTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab ID from data attribute
          const tabId = this.getAttribute('data-tab');
          
          // Hide all panes
          document.querySelectorAll('.admission-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
});

// Fee Structure Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const feeTabs = document.querySelectorAll('.fee-tab');
  
  feeTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          feeTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab ID from data attribute
          const tabId = this.getAttribute('data-tab');
          
          // Hide all panes
          document.querySelectorAll('.fee-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const rtiTabs = document.querySelectorAll('.rti-tab');
  const academicTitle = document.getElementById('academic-title');
  
  rtiTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          rtiTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab ID from data attribute
          const tabId = this.getAttribute('data-tab');
          const tabTitle = this.getAttribute('data-title');
          
          // Update page title if academic-title exists
          if (academicTitle) {
              academicTitle.textContent = tabTitle;
          }
          
          // Hide all panes
          document.querySelectorAll('.rti-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
});

// Faculty Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Department tabs
  const deptTabs = document.querySelectorAll('.dept-tab');
  
  deptTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          deptTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the department ID from data attribute
          const deptId = this.getAttribute('data-dept');
          
          // Hide all panes
          document.querySelectorAll('.faculty-pane').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(deptId).classList.add('active');
      });
  });
  
  // // View Profile buttons
  // const viewProfileBtns = document.querySelectorAll('.view-profile-btn');
  // const facultyModal = document.createElement('div');
  // facultyModal.className = 'faculty-modal';
  // facultyModal.innerHTML = `
  //     <div class="modal-content">
  //         <div class="modal-header">
  //             <h2>Faculty Profile</h2>
  //             <span class="close-modal">&times;</span>
  //         </div>
  //         <div class="modal-body">
  //             <div class="modal-profile-image">
  //                 <img src="images/placeholder-profile.jpg" alt="Faculty Profile">
  //             </div>
  //             <div class="modal-profile-info">
  //                 <h3 id="modal-faculty-name"></h3>
  //                 <div class="profile-details">
  //                     <p><strong>Designation:</strong> <span id="modal-designation"></span></p>
  //                     <p><strong>Department:</strong> <span id="modal-department"></span></p>
  //                     <p><strong>Qualification:</strong> <span id="modal-qualification"></span></p>
  //                     <p><strong>Email:</strong> <span id="modal-email"></span></p>
  //                     <p><strong>Phone:</strong> <span id="modal-phone"></span></p>
  //                 </div>
  //                 <div class="profile-section">
  //                     <h4>About</h4>
  //                     <p id="modal-about">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
  //                 </div>
  //                 <div class="profile-section">
  //                     <h4>Specializations</h4>
  //                     <ul id="modal-specializations">
  //                         <!-- Will be filled by JS -->
  //                     </ul>
  //                 </div>
  //             </div>
  //         </div>
  //     </div>
  // `;
  // document.body.appendChild(facultyModal);
  
  // viewProfileBtns.forEach(btn => {
  //     btn.addEventListener('click', function() {
  //         const facultyId = this.getAttribute('data-id');
  //         // In a real implementation, you would fetch faculty data based on ID
  //         // For now, we'll use placeholder data
  //         const facultyData = getFacultyData(facultyId);
          
  //         // Populate modal with faculty data
  //         document.getElementById('modal-faculty-name').textContent = facultyData.name;
  //         document.getElementById('modal-designation').textContent = facultyData.designation;
  //         document.getElementById('modal-department').textContent = facultyData.department;
  //         document.getElementById('modal-qualification').textContent = facultyData.qualification;
  //         document.getElementById('modal-email').textContent = facultyData.email;
  //         document.getElementById('modal-phone').textContent = facultyData.phone;
          
  //         const specializationsList = document.getElementById('modal-specializations');
  //         specializationsList.innerHTML = '';
  //         facultyData.specializations.forEach(spec => {
  //             const li = document.createElement('li');
  //             li.textContent = spec;
  //             specializationsList.appendChild(li);
  //         });
          
  //         // Show modal
  //         facultyModal.style.display = 'block';
  //     });
  // });
  
  // // Close modal
  // facultyModal.querySelector('.close-modal').addEventListener('click', function() {
  //     facultyModal.style.display = 'none';
  // });
  
  // // Close modal when clicking outside
  // facultyModal.addEventListener('click', function(e) {
  //     if (e.target === facultyModal) {
  //         facultyModal.style.display = 'none';
  //     }
  // });
});

// Placeholder function to get faculty data - in real implementation, this would be an API call
function getFacultyData(id) {
  const facultyDatabase = {
      'fac001': {
          name: 'Dr. Rajesh Sharma',
          designation: 'Professor & HOD',
          department: 'Civil Engineering',
          qualification: 'Ph.D. in Structural Engineering',
          email: 'rajesh.sharma@gpsirsi.edu.in',
          phone: '+91 98765 43210',
          specializations: [
              'Structural Analysis',
              'Earthquake Engineering',
              'Concrete Technology'
          ]
      },
      'fac002': {
          name: 'Prof. Anuj Pal',
          designation: 'Lecturer',
          department: 'Civil Engineering',
          qualification: 'M.Tech in Geotechnical Engineering',
          email: 'anuj.pal@gpsirsi.edu.in',
          phone: '+91 87654 32109',
          specializations: [
              'Soil Mechanics',
              'Foundation Engineering',
              'Geotechnical Investigations'
          ]
      },
      'fac003': {
          name: 'Prof. Ralesh Kumar Rahi',
          designation: 'Lecturer',
          department: 'Civil Engineering',
          qualification: 'M.Tech in Transportation Engineering',
          email: 'ralesh.rahi@gpsirsi.edu.in',
          phone: '+91 76543 21098',
          specializations: [
              'Highway Engineering',
              'Traffic Engineering',
              'Transportation Planning'
          ]
      },
      'fac101': {
          name: 'Dr. Vikram Singh',
          designation: 'Professor & HOD',
          department: 'Mechanical Engineering',
          qualification: 'Ph.D. in Thermal Engineering',
          email: 'vikram.singh@gpsirsi.edu.in',
          phone: '+91 98765 43211',
          specializations: [
              'Heat Transfer',
              'Thermodynamics',
              'Energy Systems'
          ]
      },
      'fac102': {
          name: 'Prof. Priyansha Kushwaha',
          designation: 'Lecturer',
          department: 'Mechanical Engineering',
          qualification: 'M.Tech in Production Engineering',
          email: 'priyansha.k@gpsirsi.edu.in',
          phone: '+91 87654 32110',
          specializations: [
              'Manufacturing Processes',
              'Quality Control',
              'Industrial Engineering'
          ]
      }
  };
  
  return facultyDatabase[id] || facultyDatabase['fac001'];
}

// Contact Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const infoTabs = document.querySelectorAll('.info-tab-gps');
  
  infoTabs.forEach(tab => {
      tab.addEventListener('click', function() {
          // Remove active class from all tabs
          infoTabs.forEach(t => t.classList.remove('active'));
          
          // Add active class to clicked tab
          this.classList.add('active');
          
          // Get the tab ID from data attribute
          const tabId = this.getAttribute('data-tab');
          
          // Hide all panes
          document.querySelectorAll('.info-pane-gps').forEach(pane => {
              pane.classList.remove('active');
          });
          
          // Show the selected pane
          document.getElementById(tabId).classList.add('active');
      });
  });
  
  // Contact Form Submission
  const contactForm = document.getElementById('contactForm-gps');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const formData = {
              name: document.getElementById('name-gps').value,
              email: document.getElementById('email-gps').value,
              phone: document.getElementById('phone-gps').value,
              subject: document.getElementById('subject-gps').value,
              message: document.getElementById('message-gps').value
          };
          
          // Here you would typically send the data to a server
          console.log('Form submitted:', formData);
          
          // Show success message
          alert('Thank you for your feedback! We will contact you soon.');
          
          // Reset form
          contactForm.reset();
      });
  }
});

// Facilities Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const facilityTabs = document.querySelectorAll('.facility-tab');
  
  facilityTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      facilityTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get the tab ID from data attribute
      const tabId = this.getAttribute('data-tab');
      
      // Hide all panes
      document.querySelectorAll('.facility-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Show the selected pane
      document.getElementById(tabId).classList.add('active');
    });
  });
});


// Placement Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
  const placementTabs = document.querySelectorAll('.placement-tab');
  
  placementTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      placementTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get the tab ID from data attribute
      const tabId = this.getAttribute('data-tab');
      
      // Hide all panes
      document.querySelectorAll('.placement-pane').forEach(pane => {
        pane.classList.remove('active');
      });
      
      // Show the selected pane
      document.getElementById(tabId).classList.add('active');
    });
  });
});


// URL Hash Navigation Script
// This script detects if a hash symbol (#) is present in the URL
// and redirects to index.html when found

// Function to check URL and redirect if hash is found
function checkForHashAndRedirect() {
  // Get the current URL
  const currentUrl = window.location.href;
  
  // Check if the URL contains a hash symbol (#)
  if (currentUrl.includes('#')) {
    console.log('Hash detected in URL, redirecting to index.html');
    
    // Redirect to index.html at the root level
    window.location.href = '/index.html';
    
    // If you want to keep the hash part when redirecting, use this instead:
    // const hashPart = window.location.hash;
    // window.location.href = '/index.html' + hashPart;
  }
}

// Execute the function when the page loads
window.addEventListener('DOMContentLoaded', checkForHashAndRedirect);

// Also check when the hash changes (without full page reload)
window.addEventListener('hashchange', checkForHashAndRedirect);

// Self-executing function to run immediately
(function() {
  checkForHashAndRedirect();
})();


// JavaScript for the scrolling officials section

document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.officials-track');
  const cards = document.querySelectorAll('.official-card');
  const cardWidth = cards[0].offsetWidth + 20; // width + gap
  let currentPosition = 0;
  let autoScrollInterval;
  
  // Auto-scroll function
  function autoScroll() {
    currentPosition++;
    if (currentPosition > cards.length - 1) {
      currentPosition = 0;
    }
    track.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
  }
  
  // Start auto-scrolling
  function startAutoScroll() {
    autoScrollInterval = setInterval(autoScroll, 3000); // Change every 3 seconds
  }
  
  // Initialize
  startAutoScroll();
  
  // Pause on hover
  track.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  track.addEventListener('mouseleave', () => {
    startAutoScroll();
  });
  
  // Handle window resize
  window.addEventListener('resize', () => {
    const newCardWidth = cards[0].offsetWidth + 20;
    track.style.transform = `translateX(-${currentPosition * newCardWidth}px)`;
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const holidays2025 = {
    '1-26': 'Republic Day',
    '3-8': 'Maha Shivaratri',
    '3-25': 'Holi',
    '4-14': 'Dr. Ambedkar Jayanti',
    '5-1': 'Labour Day',
    '8-15': 'Independence Day',
    '9-7': 'Janmashtami',
    '10-2': 'Gandhi Jayanti',
    '10-12': 'Dussehra',
    '11-1': 'Diwali',
    '11-15': 'Guru Nanak Jayanti',
    '12-25': 'Christmas Day'
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let displayYear = 2025;
  const calendarGrid = document.querySelector('.calendar-grid');
  const yearDisplay = document.querySelector('.calendar-year');

  function renderCalendar(year) {
    calendarGrid.innerHTML = '';
    yearDisplay.textContent = year;
    
    for (let month = 0; month < 12; month++) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startingDay = firstDay.getDay();
      
      const monthContainer = document.createElement('div');
      monthContainer.className = 'calendar-month';
      
      const monthHeader = document.createElement('div');
      monthHeader.className = 'month-header';
      monthHeader.textContent = new Date(year, month).toLocaleString('default', { month: 'long' });
      monthContainer.appendChild(monthHeader);
      
      const daysContainer = document.createElement('div');
      daysContainer.className = 'calendar-days';
      
      // Day headers (Sun-Sat)
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        daysContainer.appendChild(dayHeader);
      });
      
      // Empty cells for days before the 1st
      for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day-cell empty';
        daysContainer.appendChild(emptyCell);
      }
      
      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'day-cell';
        dayCell.textContent = day;
        
        // Check if today
        if (year === currentYear && month === currentMonth && day === currentDay) {
          dayCell.classList.add('today');
        }
        
        // Check if holiday
        const holidayKey = `${month+1}-${day}`;
        if (holidays2025[holidayKey]) {
          dayCell.classList.add('holiday');
          dayCell.title = holidays2025[holidayKey];
        }
        
        daysContainer.appendChild(dayCell);
      }
      
      monthContainer.appendChild(daysContainer);
      calendarGrid.appendChild(monthContainer);
    }
  }
  
  // Navigation
  document.querySelector('.prev-year').addEventListener('click', () => {
    displayYear--;
    renderCalendar(displayYear);
  });
  
  document.querySelector('.next-year').addEventListener('click', () => {
    displayYear++;
    renderCalendar(displayYear);
  });
  
  // Initial render
  renderCalendar(displayYear);

    // Add this observer to detect when tab becomes visible
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
          const pane = document.getElementById('holidays');
          if (pane.classList.contains('active')) {
            renderCalendar(displayYear);
          }
        }
      });
    });
  
    // Observe the holidays pane
    const holidaysPane = document.getElementById('holidays');
    observer.observe(holidaysPane, {
      attributes: true,
      attributeFilter: ['class']
    });
});


// Smooth scrolling for anchor links across the entire app
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("a[href^='#']");

  for (const link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth"
        });
      }
    });
  }
});
