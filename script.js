// Initialize Particles.js for background animation (safe initialization)
try {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 60, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 2, random: true },
                line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 3, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "bubble" }, onclick: { enable: true, mode: "push" } },
                modes: { bubble: { distance: 200, size: 4, duration: 2 }, push: { particles_nb: 2 } }
            },
            retina_detect: true
        });
    } else {
        console.log('Particles.js not loaded, continuing without animation');
    }
} catch (error) {
    console.log('Error initializing particles.js:', error);
}

// Mouse Follower Effect
const mouseFollower = document.getElementById('mouseFollower');
if (mouseFollower) {
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        mouseFollower.style.transform = `translate(${followerX - 100}px, ${followerY - 100}px)`;
        requestAnimationFrame(animateFollower);
    }
    
    animateFollower();
}

// Enhanced Background Interaction
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape');
    const lights = document.querySelectorAll('.light');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.01;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        
        shape.style.transform += ` translate(${x}px, ${y}px)`;
    });
    
    lights.forEach((light, index) => {
        const speed = (index + 1) * 0.005;
        const x = (e.clientX * speed);
        const y = (e.clientY * speed);
        
        light.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Password toggle functionality
function togglePassword() {
    const passwordInput = document.getElementById('loginPassword');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Enhanced login form validation and animation
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loadingOverlay = document.getElementById('loadingOverlay');

// Safety check - only add event listener if form exists
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const type = document.getElementById('loginType').value;
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Enhanced Gmail validation
    const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailRegex.test(email)) {
        showError('Please enter a valid Gmail address (example@gmail.com)');
        return;
    }
    
    // Password strength validation
    if (password.length < 6) {
        showError('Password must be at least 6 characters long');
        return;
    }
    
    // Show loading animation
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        // Simulate authentication (replace with backend call)
        if ((type === 'admin' && email === 'admin@gmail.com' && password === 'admin123') ||
            (type === 'student' && email && password)) {
            
            // Store logged-in user information globally
            window.currentUser = {
                email: email,
                type: type,
                name: extractNameFromEmail(email),
                loginTime: new Date().toISOString()
            };
            
            hideLoading();
            hideError();
            
            // Hide login container with animation
            document.querySelector('.login-container').style.transform = 'translateY(-100%)';
            document.querySelector('.login-container').style.opacity = '0';
            
            setTimeout(() => {
                document.querySelector('.login-container').style.display = 'none';
                showActivitiesList();
            }, 500);
            
        } else {
            hideLoading();
            showError('Invalid credentials. Please check your email and password.');
        }
    }, 1500); // Simulate network delay
    });
} else {
    console.error('Login form not found! Make sure the HTML has id="loginForm"');
}

function showError(message) {
    loginError.textContent = message;
    loginError.style.display = 'block';
    loginError.classList.add('error-message');
}

function hideError() {
    loginError.style.display = 'none';
}

function showLoading() {
    loadingOverlay.style.display = 'flex';
}

function hideLoading() {
    loadingOverlay.style.display = 'none';
}

// Helper function to extract name from email
function extractNameFromEmail(email) {
    const localPart = email.split('@')[0];
    const name = localPart.replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return name;
}

// Generate student ID from email
function generateStudentId(email) {
    const hash = email.split('@')[0].slice(0, 3).toUpperCase();
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `STU-${year}-${hash}${random}`;
}

// Show activities list after login with enhanced design
function showActivitiesList() {
    const currentUserName = window.currentUser ? window.currentUser.name : 'Student';
    const currentUserEmail = window.currentUser ? window.currentUser.email : 'user@gmail.com';
    
    const activities = [
        { name: 'Academic & Subject Clubs', icon: 'fas fa-graduation-cap', color: '#3498db', description: 'Math, Science, Debate, and Academic Competitions' },
        { name: 'Sports & Athletics', icon: 'fas fa-running', color: '#e74c3c', description: 'Team Sports, Individual Athletics, and Fitness Activities' },
        { name: 'Creative & Performing Arts', icon: 'fas fa-palette', color: '#9b59b6', description: 'Music, Drama, Visual Arts, and Creative Expression' },
        { name: 'Community Service', icon: 'fas fa-hands-helping', color: '#27ae60', description: 'Volunteering, Social Impact, and Community Outreach' },
        { name: 'Leadership & Governance', icon: 'fas fa-crown', color: '#f39c12', description: 'Student Government, Leadership Programs, and Mentoring' },
        { name: 'Technology & Innovation', icon: 'fas fa-microchip', color: '#1abc9c', description: 'Coding, Robotics, Tech Clubs, and Innovation Projects' }
    ];

    // Create modern activities dashboard
    document.body.innerHTML = `
        <div class="activities-dashboard">
            <div class="dashboard-header">
                <div class="header-content">
                    <div class="user-welcome">
                        <i class="fas fa-user-circle"></i>
                        <div>
                            <h1>Welcome Back, ${currentUserName}!</h1>
                            <p>Logged in as: ${currentUserEmail}</p>
                            <small>Choose an activity to view your achievements</small>
                        </div>
                    </div>
                    <button class="logout-btn" onclick="logout()">
                        <i class="fas fa-sign-out-alt"></i>
                        Logout
                    </button>
                </div>
            </div>

            <div class="activities-container">
                <div class="activities-grid">
                    ${activities.map(activity => `
                        <div class="activity-card modern-card" onclick="showStudentRecords('${activity.name}')" style="--card-color: ${activity.color}">
                            <div class="card-icon">
                                <i class="${activity.icon}"></i>
                            </div>
                            <div class="card-content">
                                <h3>${activity.name}</h3>
                                <p>${activity.description}</p>
                                <div class="card-stats">
                                    <span><i class="fas fa-trophy"></i> 5 Achievements</span>
                                    <span><i class="fas fa-star"></i> 4.8 Rating</span>
                                </div>
                            </div>
                            <div class="card-arrow">
                                <i class="fas fa-arrow-right"></i>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

        <style>
            .activities-dashboard {
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Poppins', sans-serif;
            }

            .dashboard-header {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
                padding: 1.5rem 2rem;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .header-content {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .user-welcome {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .user-welcome i {
                font-size: 3rem;
                color: #667eea;
            }

            .user-welcome h1 {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 700;
                color: #333;
                background: linear-gradient(45deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .user-welcome p {
                margin: 0;
                color: #666;
                font-size: 1rem;
            }

            .logout-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.8rem 1.5rem;
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                color: white;
                border: none;
                border-radius: 25px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }

            .logout-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(231, 76, 60, 0.4);
            }

            .activities-container {
                padding: 3rem 2rem;
                max-width: 1200px;
                margin: 0 auto;
            }

            .activities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                gap: 2rem;
            }

            .modern-card {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 2rem;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                position: relative;
                overflow: hidden;
            }

            .modern-card::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 4px;
                background: var(--card-color);
                transition: height 0.3s ease;
            }

            .modern-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            }

            .modern-card:hover::before {
                height: 100%;
                opacity: 0.05;
            }

            .card-icon {
                width: 60px;
                height: 60px;
                border-radius: 15px;
                background: var(--card-color);
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                color: white;
                font-size: 1.5rem;
            }

            .card-content h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.3rem;
                font-weight: 600;
                color: #333;
            }

            .card-content p {
                margin: 0 0 1.5rem 0;
                color: #666;
                line-height: 1.5;
            }

            .card-stats {
                display: flex;
                gap: 1rem;
                font-size: 0.9rem;
            }

            .card-stats span {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                color: #999;
            }

            .card-stats i {
                color: var(--card-color);
            }

            .card-arrow {
                position: absolute;
                top: 2rem;
                right: 2rem;
                color: var(--card-color);
                opacity: 0;
                transition: all 0.3s ease;
            }

            .modern-card:hover .card-arrow {
                opacity: 1;
                transform: translateX(5px);
            }

            @media (max-width: 768px) {
                .activities-grid {
                    grid-template-columns: 1fr;
                }
                
                .header-content {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }
            }
        </style>
    `;
}

// Logout functionality
function logout() {
    location.reload();
}

// Show comprehensive student records/profile for the selected activity
function showStudentRecords(activityName) {
    // Get current user information
    const currentUser = window.currentUser || {
        email: 'student@gmail.com',
        name: 'Student',
        type: 'student'
    };
    
    // Generate personalized student data based on logged-in user
    const userProfile = generateUserProfile(currentUser, activityName);
    
    // Create comprehensive student profile page
    document.body.innerHTML = `
        <div class="student-profile-dashboard">
            <div class="profile-header">
                <button class="back-btn" onclick="showActivitiesList()">
                    <i class="fas fa-arrow-left"></i>
                    Back to Activities
                </button>
                <div class="activity-title">
                    <i class="fas fa-user-graduate"></i>
                    <h1>${activityName} - Your Profile</h1>
                </div>
            </div>

            <div class="profile-content">
                <!-- Personal Information Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-user"></i>
                        <h2>Personal Information</h2>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Name:</span>
                            <span class="value">${userProfile.personalInfo.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Student ID:</span>
                            <span class="value">${userProfile.personalInfo.studentId}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Grade:</span>
                            <span class="value">${userProfile.personalInfo.grade}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Email:</span>
                            <span class="value">${userProfile.personalInfo.email}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Join Date:</span>
                            <span class="value">${userProfile.personalInfo.joinDate}</span>
                        </div>
                    </div>
                </div>

                <!-- Achievements Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-trophy"></i>
                        <h2>Your Achievements & Accomplishments</h2>
                    </div>
                    <div class="achievements-list">
                        ${userProfile.achievements.map(achievement => `
                            <div class="achievement-item">
                                <div class="achievement-icon">
                                    <i class="fas fa-medal"></i>
                                </div>
                                <div class="achievement-details">
                                    <h3>${achievement.title}</h3>
                                    <p class="achievement-category">${achievement.category}</p>
                                    <p class="achievement-date">${achievement.date}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Grades Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-chart-line"></i>
                        <h2>Your Academic Performance</h2>
                    </div>
                    <div class="grades-table">
                        <div class="table-header">
                            <span>Subject</span>
                            <span>Score</span>
                            <span>Grade</span>
                        </div>
                        ${userProfile.grades.map(grade => `
                            <div class="table-row">
                                <span class="subject">${grade.subject}</span>
                                <span class="score">${grade.score}%</span>
                                <span class="grade grade-${grade.grade.replace('+', 'plus')}">${grade.grade}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Projects Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-project-diagram"></i>
                        <h2>Your Projects & Work</h2>
                    </div>
                    <div class="projects-list">
                        ${userProfile.projects.map(project => `
                            <div class="project-item">
                                <div class="project-info">
                                    <h3>${project.name}</h3>
                                    <span class="project-status status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                                </div>
                                <div class="project-rating">
                                    <span class="rating rating-${project.rating.toLowerCase().replace(' ', '-')}">${project.rating}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Rewards Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-gift"></i>
                        <h2>Your Rewards & Scholarships</h2>
                    </div>
                    <div class="rewards-list">
                        ${userProfile.rewards.map(reward => `
                            <div class="reward-item">
                                <div class="reward-icon">
                                    <i class="fas fa-award"></i>
                                </div>
                                <div class="reward-details">
                                    <h3>${reward.award}</h3>
                                    <p class="reward-amount">${reward.amount}</p>
                                    <p class="reward-year">${reward.year}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <style>
            .student-profile-dashboard {
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Poppins', sans-serif;
                padding: 2rem;
            }

            .profile-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 2rem;
                background: rgba(255, 255, 255, 0.95);
                padding: 1.5rem 2rem;
                border-radius: 15px;
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .back-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.8rem 1.5rem;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 25px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }

            .back-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            }

            .activity-title {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .activity-title i {
                font-size: 2rem;
                color: #667eea;
            }

            .activity-title h1 {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 700;
                color: #333;
                background: linear-gradient(45deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .profile-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                gap: 2rem;
                max-width: 1400px;
                margin: 0 auto;
            }

            .profile-card {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 2rem;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            }

            .profile-card:hover {
                transform: translateY(-5px);
            }

            .card-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #f0f0f0;
            }

            .card-header i {
                font-size: 1.5rem;
                color: #667eea;
            }

            .card-header h2 {
                margin: 0;
                font-size: 1.3rem;
                font-weight: 600;
                color: #333;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }

            .info-item {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .label {
                font-weight: 600;
                color: #666;
                font-size: 0.9rem;
            }

            .value {
                font-weight: 500;
                color: #333;
                font-size: 1rem;
            }

            .achievements-list, .rewards-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .achievement-item, .reward-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }

            .achievement-icon, .reward-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .achievement-details h3, .reward-details h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
            }

            .achievement-category, .achievement-date, .reward-amount, .reward-year {
                margin: 0;
                font-size: 0.9rem;
                color: #666;
            }

            .grades-table {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .table-header, .table-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 1rem;
                padding: 1rem;
                border-radius: 8px;
            }

            .table-header {
                background: #667eea;
                color: white;
                font-weight: 600;
            }

            .table-row {
                background: #f8f9fa;
                border-left: 3px solid #e0e0e0;
            }

            .grade {
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-weight: 600;
                text-align: center;
            }

            .grade-Aplus { background: #4CAF50; color: white; }
            .grade-A { background: #8BC34A; color: white; }
            .grade-Bplus { background: #FF9800; color: white; }
            .grade-B { background: #FF5722; color: white; }

            .projects-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .project-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }

            .project-info h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
            }

            .project-status, .rating {
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .status-completed { background: #4CAF50; color: white; }
            .status-in-progress, .status-ongoing { background: #FF9800; color: white; }

            .rating-outstanding { background: #9C27B0; color: white; }
            .rating-excellent { background: #4CAF50; color: white; }
            .rating-very-good { background: #2196F3; color: white; }
            .rating-good { background: #FF9800; color: white; }

            @media (max-width: 768px) {
                .profile-content {
                    grid-template-columns: 1fr;
                }
                
                .profile-header {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }

                .info-grid {
                    grid-template-columns: 1fr;
                }

                .table-header, .table-row {
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                }
            }
        </style>
    `;
}

// Generate personalized user profile based on logged-in user
function generateUserProfile(user, activityName) {
    const currentDate = new Date();
    const joinDate = new Date(currentDate.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    
    return {
        personalInfo: {
            name: user.name,
            studentId: generateStudentId(user.email),
            grade: user.type === 'admin' ? 'Administrator' : ['10th Grade', '11th Grade', '12th Grade'][Math.floor(Math.random() * 3)],
            email: user.email,
            joinDate: joinDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        },
        achievements: generateAchievements(activityName, user.name),
        grades: generateGrades(activityName),
        projects: generateProjects(activityName, user.name),
        rewards: generateRewards(user.name)
    };
}

// Generate personalized achievements
function generateAchievements(activityName, userName) {
    const achievementTemplates = {
        'Academic & Subject Clubs': [
            { title: `${userName}'s Science Excellence Award`, category: 'Academic Achievement' },
            { title: `Math Competition - ${userName} Top Performer`, category: 'Competition' },
            { title: `${userName}'s Research Project Recognition`, category: 'Innovation' },
            { title: `Debate Leadership - ${userName}`, category: 'Leadership' }
        ],
        'Sports & Athletics': [
            { title: `${userName}'s Athletic Excellence Award`, category: 'Sports Achievement' },
            { title: `Team Captain - ${userName}`, category: 'Leadership' },
            { title: `${userName}'s Championship Performance`, category: 'Competition' },
            { title: `Sportsmanship Award - ${userName}`, category: 'Character' }
        ],
        'Creative & Performing Arts': [
            { title: `${userName}'s Creative Excellence Award`, category: 'Artistic Achievement' },
            { title: `Performance Leadership - ${userName}`, category: 'Leadership' },
            { title: `${userName}'s Original Composition Award`, category: 'Innovation' },
            { title: `Art Exhibition Feature - ${userName}`, category: 'Recognition' }
        ],
        'Community Service': [
            { title: `${userName}'s Community Impact Award`, category: 'Service Excellence' },
            { title: `Volunteer Leadership - ${userName}`, category: 'Leadership' },
            { title: `${userName}'s Fundraising Success`, category: 'Impact' },
            { title: `Community Recognition - ${userName}`, category: 'Service' }
        ],
        'Leadership & Governance': [
            { title: `${userName}'s Leadership Excellence Award`, category: 'Leadership' },
            { title: `Student Government - ${userName}`, category: 'Governance' },
            { title: `${userName}'s Policy Initiative Success`, category: 'Innovation' },
            { title: `Peer Recognition Award - ${userName}`, category: 'Recognition' }
        ],
        'Technology & Innovation': [
            { title: `${userName}'s Tech Innovation Award`, category: 'Technology' },
            { title: `Coding Competition - ${userName}`, category: 'Programming' },
            { title: `${userName}'s App Development Success`, category: 'Innovation' },
            { title: `Tech Leadership - ${userName}`, category: 'Leadership' }
        ]
    };

    const templates = achievementTemplates[activityName] || achievementTemplates['Academic & Subject Clubs'];
    return templates.map((template, index) => ({
        ...template,
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));
}

// Generate subject-specific grades
function generateGrades(activityName) {
    const subjectsByActivity = {
        'Academic & Subject Clubs': ['Physics', 'Chemistry', 'Mathematics', 'Biology'],
        'Sports & Athletics': ['Physical Education', 'Health Sciences', 'Sports Psychology', 'Nutrition'],
        'Creative & Performing Arts': ['Visual Arts', 'Music Theory', 'Drama', 'Creative Writing'],
        'Community Service': ['Social Studies', 'Environmental Science', 'Community Development', 'Public Speaking'],
        'Leadership & Governance': ['Government & Politics', 'Public Policy', 'Leadership Studies', 'Ethics'],
        'Technology & Innovation': ['Computer Science', 'Advanced Programming', 'Data Structures', 'Web Development']
    };

    const subjects = subjectsByActivity[activityName] || subjectsByActivity['Academic & Subject Clubs'];
    const grades = ['A+', 'A', 'A', 'B+', 'A+'];
    
    return subjects.map((subject, index) => ({
        subject,
        score: Math.floor(Math.random() * 15) + 85, // 85-100
        grade: grades[index % grades.length]
    }));
}

// Generate personalized projects
function generateProjects(activityName, userName) {
    const projectTemplates = {
        'Academic & Subject Clubs': [
            { name: `${userName}'s Research Project`, status: 'Completed', rating: 'Outstanding' },
            { name: `Science Fair Entry - ${userName}`, status: 'In Progress', rating: 'Excellent' },
            { name: `${userName}'s Innovation Lab`, status: 'Completed', rating: 'Very Good' }
        ],
        'Sports & Athletics': [
            { name: `${userName}'s Training Program`, status: 'Ongoing', rating: 'Excellent' },
            { name: `Athletic Performance Study - ${userName}`, status: 'Completed', rating: 'Outstanding' },
            { name: `${userName}'s Team Strategy`, status: 'Completed', rating: 'Very Good' }
        ],
        'Creative & Performing Arts': [
            { name: `${userName}'s Art Portfolio`, status: 'Completed', rating: 'Outstanding' },
            { name: `Creative Project - ${userName}`, status: 'In Progress', rating: 'Excellent' },
            { name: `${userName}'s Performance Piece`, status: 'Completed', rating: 'Very Good' }
        ],
        'Community Service': [
            { name: `${userName}'s Community Initiative`, status: 'Ongoing', rating: 'Excellent' },
            { name: `Service Project - ${userName}`, status: 'Completed', rating: 'Outstanding' },
            { name: `${userName}'s Outreach Program`, status: 'Completed', rating: 'Very Good' }
        ],
        'Leadership & Governance': [
            { name: `${userName}'s Leadership Project`, status: 'Ongoing', rating: 'Outstanding' },
            { name: `Policy Proposal - ${userName}`, status: 'Completed', rating: 'Excellent' },
            { name: `${userName}'s Mentorship Program`, status: 'Completed', rating: 'Very Good' }
        ],
        'Technology & Innovation': [
            { name: `${userName}'s App Development`, status: 'Completed', rating: 'Outstanding' },
            { name: `Tech Innovation - ${userName}`, status: 'In Progress', rating: 'Excellent' },
            { name: `${userName}'s Coding Project`, status: 'Completed', rating: 'Very Good' }
        ]
    };

    return projectTemplates[activityName] || projectTemplates['Academic & Subject Clubs'];
}

// Generate personalized rewards
function generateRewards(userName) {
    const currentYear = new Date().getFullYear();
    return [
        { award: `${userName}'s Excellence Scholarship`, amount: `$${Math.floor(Math.random() * 3000) + 1000}`, year: currentYear.toString() },
        { award: `Achievement Award - ${userName}`, amount: `$${Math.floor(Math.random() * 1000) + 500}`, year: (currentYear - 1).toString() }
    ];
// Create comprehensive student profile page
document.body.innerHTML = `
    <div class="student-profile-dashboard">
            <div class="profile-header">
                <button class="back-btn" onclick="showActivitiesList()">
                    <i class="fas fa-arrow-left"></i>
                    Back to Activities
                </button>
                <div class="activity-title">
                    <i class="fas fa-user-graduate"></i>
                    <h1>${activityName} - Student Profile</h1>
                </div>
            </div>

            <div class="profile-content">
                <!-- Personal Information Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-user"></i>
                        <h2>Personal Information</h2>
                    </div>
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="label">Name:</span>
                            <span class="value">${profile.personalInfo.name}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Student ID:</span>
                            <span class="value">${profile.personalInfo.studentId}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Grade:</span>
                            <span class="value">${profile.personalInfo.grade}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Email:</span>
                            <span class="value">${profile.personalInfo.email}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">Join Date:</span>
                            <span class="value">${profile.personalInfo.joinDate}</span>
                        </div>
                    </div>
                </div>

                <!-- Achievements Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-trophy"></i>
                        <h2>Achievements & Accomplishments</h2>
                    </div>
                    <div class="achievements-list">
                        ${profile.achievements.map(achievement => `
                            <div class="achievement-item">
                                <div class="achievement-icon">
                                    <i class="fas fa-medal"></i>
                                </div>
                                <div class="achievement-details">
                                    <h3>${achievement.title}</h3>
                                    <p class="achievement-category">${achievement.category}</p>
                                    <p class="achievement-date">${achievement.date}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Grades Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-chart-line"></i>
                        <h2>Academic Performance</h2>
                    </div>
                    <div class="grades-table">
                        <div class="table-header">
                            <span>Subject</span>
                            <span>Score</span>
                            <span>Grade</span>
                        </div>
                        ${profile.grades.map(grade => `
                            <div class="table-row">
                                <span class="subject">${grade.subject}</span>
                                <span class="score">${grade.score}%</span>
                                <span class="grade grade-${grade.grade.replace('+', 'plus')}">${grade.grade}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Projects Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-project-diagram"></i>
                        <h2>Projects & Work</h2>
                    </div>
                    <div class="projects-list">
                        ${profile.projects.map(project => `
                            <div class="project-item">
                                <div class="project-info">
                                    <h3>${project.name}</h3>
                                    <span class="project-status status-${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                                </div>
                                <div class="project-rating">
                                    <span class="rating rating-${project.rating.toLowerCase().replace(' ', '-')}">${project.rating}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Rewards Card -->
                <div class="profile-card">
                    <div class="card-header">
                        <i class="fas fa-gift"></i>
                        <h2>Rewards & Scholarships</h2>
                    </div>
                    <div class="rewards-list">
                        ${profile.rewards.map(reward => `
                            <div class="reward-item">
                                <div class="reward-icon">
                                    <i class="fas fa-award"></i>
                                </div>
                                <div class="reward-details">
                                    <h3>${reward.award}</h3>
                                    <p class="reward-amount">${reward.amount}</p>
                                    <p class="reward-year">${reward.year}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <style>
            .student-profile-dashboard {
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                font-family: 'Poppins', sans-serif;
                padding: 2rem;
            }

            .profile-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 2rem;
                background: rgba(255, 255, 255, 0.95);
                padding: 1.5rem 2rem;
                border-radius: 15px;
                backdrop-filter: blur(20px);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            }

            .back-btn {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.8rem 1.5rem;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 25px;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Poppins', sans-serif;
            }

            .back-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
            }

            .activity-title {
                display: flex;
                align-items: center;
                gap: 1rem;
            }

            .activity-title i {
                font-size: 2rem;
                color: #667eea;
            }

            .activity-title h1 {
                margin: 0;
                font-size: 1.8rem;
                font-weight: 700;
                color: #333;
                background: linear-gradient(45deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .profile-content {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
                gap: 2rem;
                max-width: 1400px;
                margin: 0 auto;
            }

            .profile-card {
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 2rem;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            }

            .profile-card:hover {
                transform: translateY(-5px);
            }

            .card-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                padding-bottom: 1rem;
                border-bottom: 2px solid #f0f0f0;
            }

            .card-header i {
                font-size: 1.5rem;
                color: #667eea;
            }

            .card-header h2 {
                margin: 0;
                font-size: 1.3rem;
                font-weight: 600;
                color: #333;
            }

            .info-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 1rem;
            }

            .info-item {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .label {
                font-weight: 600;
                color: #666;
                font-size: 0.9rem;
            }

            .value {
                font-weight: 500;
                color: #333;
                font-size: 1rem;
            }

            .achievements-list, .rewards-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .achievement-item, .reward-item {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }

            .achievement-icon, .reward-icon {
                width: 50px;
                height: 50px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.2rem;
            }

            .achievement-details h3, .reward-details h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
            }

            .achievement-category, .achievement-date, .reward-amount, .reward-year {
                margin: 0;
                font-size: 0.9rem;
                color: #666;
            }

            .grades-table {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .table-header, .table-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                gap: 1rem;
                padding: 1rem;
                border-radius: 8px;
            }

            .table-header {
                background: #667eea;
                color: white;
                font-weight: 600;
            }

            .table-row {
                background: #f8f9fa;
                border-left: 3px solid #e0e0e0;
            }

            .grade {
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-weight: 600;
                text-align: center;
            }

            .grade-Aplus { background: #4CAF50; color: white; }
            .grade-A { background: #8BC34A; color: white; }
            .grade-Bplus { background: #FF9800; color: white; }
            .grade-B { background: #FF5722; color: white; }

            .projects-list {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }

            .project-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1rem;
                background: #f8f9fa;
                border-radius: 12px;
                border-left: 4px solid #667eea;
            }

            .project-info h3 {
                margin: 0 0 0.5rem 0;
                font-size: 1.1rem;
                font-weight: 600;
                color: #333;
            }

            .project-status, .rating {
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            }

            .status-completed { background: #4CAF50; color: white; }
            .status-in-progress, .status-ongoing { background: #FF9800; color: white; }

            .rating-outstanding { background: #9C27B0; color: white; }
            .rating-excellent { background: #4CAF50; color: white; }
            .rating-very-good { background: #2196F3; color: white; }
            .rating-good { background: #FF9800; color: white; }

            @media (max-width: 768px) {
                .profile-content {
                    grid-template-columns: 1fr;
                }
                
                .profile-header {
                    flex-direction: column;
                    gap: 1rem;
                    text-align: center;
                }

                .info-grid {
                    grid-template-columns: 1fr;
                }

                .table-header, .table-row {
                    grid-template-columns: 1fr;
                    gap: 0.5rem;
                }
            }
        </style>
    `;
}
// Admin Dashboard Logic
const addAchievementForm = document.getElementById('addAchievementForm');
const achievementsList = document.getElementById('achievementsList');
let achievements = [];

addAchievementForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const studentName = document.getElementById('studentName').value;
    const title = document.getElementById('achievementTitle').value;
    const date = document.getElementById('achievementDate').value;
    const type = document.getElementById('achievementType').value;
    const imageInput = document.getElementById('achievementImage');
    let imageUrl = '';
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            imageUrl = evt.target.result;
            achievements.push({ studentName, title, date, type, imageUrl });
            renderAchievements();
            addAchievementForm.reset();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        achievements.push({ studentName, title, date, type, imageUrl });
        renderAchievements();
        addAchievementForm.reset();
    }
});

function renderAchievements() {
    achievementsList.innerHTML = '';
    if (achievements.length === 0) {
        achievementsList.innerHTML = '<p>No achievements added yet.</p>';
        return;
    }
    achievements.forEach((ach, idx) => {
        const card = document.createElement('div');
        card.className = 'achievement-card';
        card.style = 'background:#f7faff;border-radius:12px;box-shadow:0 2px 8px rgba(52,152,219,0.10);padding:16px;margin-bottom:16px;display:flex;align-items:center;gap:18px;cursor:pointer;';
        card.innerHTML = `
            <img src="${ach.imageUrl || 'https://via.placeholder.com/60?text=No+Image'}" alt="Achievement" style="width:60px;height:60px;object-fit:cover;border-radius:8px;box-shadow:0 2px 8px rgba(52,152,219,0.12);">
            <div>
                <div style="font-weight:bold;font-size:1.1em;color:#3498db;">${ach.title}</div>
                <div style="color:#222;">${ach.studentName} &mdash; ${ach.type}</div>
                <div style="font-size:13px;color:#555;">${ach.date}</div>
            </div>
            <button onclick="removeAchievement(${idx})" style="margin-left:auto;padding:6px 12px;background:#e74c3c;color:white;border:none;border-radius:6px;cursor:pointer;">Delete</button>
        `;
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'BUTTON') return; // Don't trigger on delete button
            showAchievementDetails(ach);
        });
        achievementsList.appendChild(card);
    });
}

// Show records, rewards, and accomplishments for an achievement
function showAchievementDetails(achievement) {
    achievementsList.innerHTML = `<div style="background:#fff;border-radius:16px;box-shadow:0 2px 8px rgba(52,152,219,0.10);padding:32px;text-align:left;max-width:500px;margin:32px auto;">
        <h2 style="color:#3498db;margin-bottom:16px;">${achievement.title}</h2>
        <img src="${achievement.imageUrl || 'https://via.placeholder.com/120?text=No+Image'}" alt="Achievement" style="width:120px;height:120px;object-fit:cover;border-radius:12px;box-shadow:0 2px 8px rgba(52,152,219,0.12);margin-bottom:16px;">
        <p><strong>Student:</strong> ${achievement.studentName}</p>
        <p><strong>Type:</strong> ${achievement.type}</p>
        <p><strong>Date:</strong> ${achievement.date}</p>
        <hr style="margin:24px 0;">
        <h3 style="color:#222;">Records</h3>
        <ul><li>Record details for this achievement...</li></ul>
        <h3 style="color:#222;">Rewards</h3>
        <ul><li>Reward details for this achievement...</li></ul>
        <h3 style="color:#222;">Accomplishments</h3>
        <ul><li>Accomplishment details for this achievement...</li></ul>
        <button onclick="renderAchievements()" style="margin-top:24px;padding:10px 24px;background:#3498db;color:white;border:none;border-radius:8px;cursor:pointer;">Back to Achievements</button>
    </div>`;
}

window.removeAchievement = function(idx) {
    achievements.splice(idx, 1);
    renderAchievements();
}
// Homepage Activity Gallery Logic
const activityGallery = document.getElementById('activityGallery');
const registerForm = document.getElementById('registerForm');
const activities = [
    { name: 'Singing', img: '/logos/81e8ecd38a9e1859ef0ad9534d9d7595.jpg' },
    { name: 'Dancing', img: '/logos/istockphoto-2010497881-612x612.jpg' },
    { name: 'Reading', img: '/logos/news_science-of-reading_2020-06-24.jpg' },
    { name: 'Games', img: '/logos/cricket-equipments-green-grass_53876-63200.jpg' }
];

activities.forEach(act => {
    const card = document.createElement('div');
    card.className = 'activity-card';
    card.style = 'text-align:center;cursor:pointer;padding:16px;background:#fff;border-radius:16px;box-shadow:0 2px 8px rgba(52,152,219,0.10);width:140px;transition:box-shadow 0.2s;';
    card.innerHTML = `
        <img src="${act.img}" alt="${act.name}" style="width:80px;height:80px;object-fit:cover;border-radius:12px;box-shadow:0 2px 8px rgba(52,152,219,0.12);margin-bottom:10px;">
        <div style="font-weight:bold;font-size:1.1em;color:#3498db;">${act.name}</div>
    `;
    card.onclick = () => {
        registerForm.style.display = 'block';
        window.scrollTo({ top: registerForm.offsetTop - 40, behavior: 'smooth' });
    };
    card.onmouseover = () => card.style.boxShadow = '0 4px 16px rgba(52,152,219,0.18)';
    card.onmouseout = () => card.style.boxShadow = '0 2px 8px rgba(52,152,219,0.10)';
    activityGallery.appendChild(card);
});
// ------------------ Student Registration JS ------------------
const form = document.getElementById('registerForm');
const studentGallery = document.getElementById('studentGallery');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const imageInput = document.getElementById('studentImage');
    let imageUrl = '';
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            imageUrl = evt.target.result;
            addStudentCard(name, email, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addStudentCard(name, email, '');
    }
    const res = await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.text();
    alert(data);
    form.reset();
});

function addStudentCard(name, email, imageUrl) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
        <img class="student-img" src="${imageUrl || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(name)}" alt="Student">
        <div><strong>${name}</strong></div>
        <div style="font-size:13px;color:#555;">${email}</div>
    `;
    studentGallery.appendChild(card);
}


// ------------------ Activity Section JS ------------------

const activityForm = document.getElementById('activityForm');
const activitiesList = document.getElementById('activitiesList');
const activityLogos = {
    'Singing': '/logos/81e8ecd38a9e1859ef0ad9534d9d7595.jpg',
    'Dancing': '/logos/istockphoto-2010497881-612x612.jpg',
    'Reading': '/logos/news_science-of-reading_2020-06-24.jpg',
    'Games': '/logos/cricket-equipments-green-grass_53876-63200.jpg'
};

activityForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('activityName').value;
    const type = document.getElementById('activityType').value;
    const subcategory = document.getElementById('activitySubcategory').value;
    const date = document.getElementById('activityDate').value;
    const imageInput = document.getElementById('activityImage');
    let imageUrl = '';
    if (imageInput && imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(evt) {
            imageUrl = evt.target.result;
            addActivityItem({ name, type, subcategory, date, imageUrl });
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addActivityItem({ name, type, subcategory, date, imageUrl: '' });
    }
    const res = await fetch('/api/add-activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, type, subcategory, date })
    });
    const data = await res.json();
    alert(`Activity added with ID: ${data.id}`);
    activityForm.reset();
    loadActivities();
});

function addActivityItem({ name, type, subcategory, date, imageUrl }) {
    const li = document.createElement('li');
    const logoSrc = activityLogos[name] || 'https://via.placeholder.com/32?text=?';
    li.innerHTML = `
        <img class="activity-logo" src="${logoSrc}" alt="${name} logo">
        <img class="activity-img" src="${imageUrl || 'https://via.placeholder.com/60?text=No+Image'}" alt="Activity">
        <strong class="activity-name" style="cursor:pointer;color:blue;">${name}</strong> (${type}) - ${date}
    `;
    li.addEventListener('click', () => {
        if(subcategory) {
            alert(`Subcategory: ${subcategory}`);
        } else {
            alert(`No subcategory for this activity`);
        }
    });
    activitiesList.appendChild(li);
}

async function loadActivities() {
    const res = await fetch('/api/events');
    const activities = await res.json();
    activitiesList.innerHTML = '';
    activities.forEach(act => {
        addActivityItem({
            name: act.name,
            type: act.type,
            subcategory: act.subcategory,
            date: act.date,
            imageUrl: '' // For now, images are only client-side
        });
    });
}

// Initial load of activities
loadActivities();