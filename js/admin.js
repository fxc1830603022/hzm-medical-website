// ============================================
// CMS Admin - Core Logic
// ============================================

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

// Debug: check if JS loaded
console.log('[CMS] admin.js loaded successfully');

const defaultPosts = [
    {
        id: 1,
        title: 'What Is a Deep Plane Facelift, and How Is It Different?',
        category: 'technique',
        image: 'images/b54df5be51a02c27874d9654dcf7cd3b.jpg',
        excerpt: 'Deep plane technique works beneath the superficial layers to reposition deeper structures, helping create a more natural and longer-lasting rejuvenation...',
        content: '<p>Deep Plane facelift technique is one of the most advanced approaches in modern facial rejuvenation.</p><p>Unlike traditional skin-tension or superficial SMAS lifting, deep plane surgery works in a deeper anatomical layer to release and reposition facial support structures.</p><h4>Core advantages</h4><p>1. More natural results: deeper tissues are repositioned instead of simply pulling skin.</p><p>2. Better longevity: structural aging is addressed directly.</p><p>3. Greater safety demand: precise anatomical dissection protects important nerves and vessels.</p>',
        status: 'published',
        date: '2024-12-15',
        readTime: '8 min'
    },
    {
        id: 2,
        title: 'The Truth About Facial Aging: From Bone to Skin',
        category: 'knowledge',
        image: 'images/be355d7cd70301a66fcdf6effc5a781f.jpg',
        excerpt: 'Facial aging is more than loose skin. Bone resorption, fat-pad descent, fascial laxity, and skin thinning all work together...',
        content: '<p>Facial aging is a multilayer process involving bone resorption, fat-pad descent, fascial laxity, and skin quality changes.</p><p>9D Lifting System is designed from a layered understanding of facial anatomy so the treatment plan can match the patient.</p>',
        status: 'published',
        date: '2024-12-10',
        readTime: '6 min'
    },
    {
        id: 3,
        title: 'The Philosophy of 9D Lifting: Why Charm Preservation Matters',
        category: 'technique',
        image: 'images/896412cd7db178d8aff7975c761cf596.jpg',
        excerpt: '9D Lifting preserves your original features and character while rejuvenating the correct anatomical layers...',
        content: '<p>Charm Preservation means protecting your unique facial proportions, expression, and personal character while performing precise rejuvenation in the correct anatomical layers.</p><p>The goal is a younger version of you, not a different face.</p>',
        status: 'published',
        date: '2024-12-05',
        readTime: '10 min'
    },
    {
        id: 4,
        title: 'Facelift Recovery Guide: Day 1 to Day 90',
        category: 'faq',
        image: 'images/f12e811b39a2ca6114abc09612047f30.jpg',
        excerpt: 'Surgery is only the first step. Recovery matters just as much, from early swelling to stable final contours...',
        content: '<p>Recovery has several stages, from swelling and bruising to contour refinement and final stabilization.</p><p>A personalized recovery plan helps each patient understand what to expect after surgery.</p>',
        status: 'published',
        date: '2024-11-28',
        readTime: '5 min'
    },
    {
        id: 5,
        title: 'A 50-Year-Old European Patient\'s 9D Deep Plane Journey',
        category: 'case',
        image: 'images/2683b7b84cb3111a72f78c2f1cb83942.jpg',
        excerpt: 'After disappointing thread-lift results, Sarah from the UK chose Dr. Xiao for a 9D Deep Plane Facelift...',
        content: '<p>Sarah\'s journey began with consultation and continued through a six-month follow-up focused on natural, identity-preserving rejuvenation.</p>',
        status: 'published',
        date: '2024-11-20',
        readTime: '7 min'
    },
    {
        id: 6,
        title: 'Thread Lift vs. Surgical Facelift: Do Not Confuse the Concepts',
        category: 'knowledge',
        image: 'images/b8cb485707aa2b6872cc479109c0605e.jpg',
        excerpt: 'Some clinics market thread lifts as 9D lifting, but thread lifting and surgical deep-structure remodeling are very different...',
        content: '<p>Thread lifting and surgical deep-structure remodeling are not the same level of treatment. True 9D Lifting is a surgical system, not a marketing label for thread placement.</p>',
        status: 'published',
        date: '2024-11-15',
        readTime: '6 min'
    }
];

const defaultSettings = {
    whatsappNumber: '8613800138000',
    whatsappMessage: 'Hello, I am interested in 9D Lifting and would like to learn more.',
    email: 'contact@drxiao-9d.com',
    address: 'Shanghai, China',
    siteTitle: 'Dr. Xiao Zhongye | 9D Lifting System',
    heroTitle: 'Reject the Assembly Line',
    heroSubtitle: 'Only One 9D · Only By Dr. Xiao',
    heroDesc: 'True anti-aging preserves your original charm. You still look like yourself, only ten years younger.'
};

// Data helpers
function getPosts() {
    var stored = localStorage.getItem('cms_posts');
    if (!stored) {
        localStorage.setItem('cms_posts', JSON.stringify(defaultPosts));
        return JSON.parse(JSON.stringify(defaultPosts));
    }
    return JSON.parse(stored);
}

function savePosts(posts) {
    localStorage.setItem('cms_posts', JSON.stringify(posts));
    syncToSite();
}

function getSettings() {
    var stored = localStorage.getItem('cms_settings');
    if (!stored) {
        localStorage.setItem('cms_settings', JSON.stringify(defaultSettings));
        return JSON.parse(JSON.stringify(defaultSettings));
    }
    return JSON.parse(stored);
}

function saveSettings(settings) {
    localStorage.setItem('cms_settings', JSON.stringify(settings));
    syncToSite();
}

function syncToSite() {
    var posts = getPosts();
    var published = posts.filter(function(p) { return p.status === 'published'; });
    localStorage.setItem('site_posts', JSON.stringify(published));
    localStorage.setItem('site_settings', JSON.stringify(getSettings()));
}

// Auth
function checkAuth() {
    console.log('[CMS] checkAuth running');
    try {
        if (sessionStorage.getItem('cms_auth') === 'true') {
            console.log('[CMS] Auth found, showing admin layout');
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('adminLayout').classList.add('active');
            navigateTo('dashboard');
        } else {
            console.log('[CMS] No auth found, showing login screen');
        }
    } catch(e) {
        console.error('[CMS] checkAuth error:', e);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('[CMS] DOMContentLoaded fired');
    var loginForm = document.getElementById('loginForm');
    console.log('[CMS] loginForm element:', loginForm);

    // --- Login ---
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('[CMS] Form submitted!');
            try {
                var u = document.getElementById('loginUser').value;
                var p = document.getElementById('loginPass').value;
                console.log('[CMS] User entered:', u, '| Password length:', p.length);
                if (u === ADMIN_USER && p === ADMIN_PASS) {
                    console.log('[CMS] Login SUCCESS!');
                    sessionStorage.setItem('cms_auth', 'true');
                    document.getElementById('loginScreen').style.display = 'none';
                    document.getElementById('adminLayout').classList.add('active');
                    navigateTo('dashboard');
                } else {
                    console.log('[CMS] Login FAILED - wrong credentials');
                    var errEl = document.getElementById('loginError');
                    if (errEl) {
                        errEl.style.display = 'block';
                        errEl.textContent = 'Incorrect username or password';
                    }
                }
            } catch(err) {
                console.error('[CMS] Login handler error:', err);
                alert('Login error: ' + err.message);
            }
        });
        console.log('[CMS] Submit listener attached');
    } else {
        console.error('[CMS] loginForm NOT FOUND!');
    }

    // --- Logout ---
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('cms_auth');
            document.getElementById('loginScreen').style.display = 'flex';
            document.getElementById('adminLayout').classList.remove('active');
            document.getElementById('loginUser').value = '';
            document.getElementById('loginPass').value = '';
        });
    }

    // --- Nav items ---
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.addEventListener('click', function() { navigateTo(this.dataset.page); });
    });

    // --- Mobile menu ---
    var mobileBtn = document.getElementById('mobileMenuBtn');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            document.getElementById('sidebar').classList.toggle('mobile-open');
        });
    }

    checkAuth();
});

// --- Global functions (needed for inline onclick and navigation) ---
var pageTitles = {
    dashboard: 'Dashboard',
    posts: 'Article Management',
    gallery: 'Gallery Management',
    settings: 'Website Settings'
};

function navigateTo(page) {
    document.querySelectorAll('.nav-item').forEach(function(item) {
        item.classList.toggle('active', item.dataset.page === page);
    });
    document.getElementById('pageTitle').textContent = pageTitles[page] || page;
    var area = document.getElementById('contentArea');
    switch(page) {
        case 'dashboard': renderDashboard(area); break;
        case 'posts': renderPostsPage(area); break;
        case 'gallery': renderGalleryPage(area); break;
        case 'settings': renderSettingsPage(area); break;
    }
    document.getElementById('sidebar').classList.remove('mobile-open');
}

// Toast
function showToast(msg, type) {
    var t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'toast show ' + (type || '');
    setTimeout(function() { t.className = 'toast'; }, 3000);
}

// ============================================
// Dashboard
// ============================================
function renderDashboard(container) {
    var posts = getPosts();
    var pub = posts.filter(function(p) { return p.status === 'published'; }).length;
    var drafts = posts.filter(function(p) { return p.status === 'draft'; }).length;
    var catNames = { technique: 'Technique', knowledge: 'Education', case: 'Cases', faq: 'FAQ' };

    var html = '<div class=\"stats-grid\">';
    html += '<div class=\"stat-card\"><h3>Total Articles</h3><div class=\"stat-value\">' + posts.length + '</div></div>';
    html += '<div class=\"stat-card\"><h3>Published</h3><div class=\"stat-value\">' + pub + '</div></div>';
    html += '<div class=\"stat-card\"><h3>Drafts</h3><div class=\"stat-value\">' + drafts + '</div></div>';
    html += '<div class=\"stat-card\"><h3>Gallery Images</h3><div class=\"stat-value\">20</div></div>';
    html += '</div>';

    html += '<div class=\"table-container\"><div class=\"table-header\"><h3>Recent Articles</h3></div>';
    html += '<table><thead><tr><th>Title</th><th>Category</th><th>Status</th><th>Date</th></tr></thead><tbody>';

    posts.slice(0, 5).forEach(function(p) {
        html += '<tr><td>' + escHtml(p.title).substring(0, 40) + '</td>';
        html += '<td>' + (catNames[p.category] || p.category) + '</td>';
        html += '<td><span class=\"status-badge status-' + p.status + '\">' + (p.status === 'published' ? 'Published' : 'Draft') + '</span></td>';
        html += '<td>' + p.date + '</td></tr>';
    });

    html += '</tbody></table></div>';
    container.innerHTML = html;
}

// ============================================
// Posts Page
// ============================================
function renderPostsPage(container) {
    var posts = getPosts();
    var catNames = { technique: 'Technique', knowledge: 'Education', case: 'Cases', faq: 'FAQ' };

    var html = '<div class=\"table-container\">';
    html += '<div class=\"table-header\"><h3>All Articles (' + posts.length + ')</h3>';
    html += '<button class=\"btn btn-primary\" onclick=\"openPostModal()\">+ New Article</button></div>';

    if (posts.length === 0) {
        html += '<div class=\"empty-state\"><p>No articles yet. Click New Article to start.</p></div>';
    } else {
        html += '<table><thead><tr><th style=\"width:40%\">Title</th><th>Category</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody>';
        posts.forEach(function(p) {
            html += '<tr>';
            html += '<td><strong>' + escHtml(p.title).substring(0, 50) + (p.title.length > 50 ? '...' : '') + '</strong></td>';
            html += '<td>' + (catNames[p.category] || p.category) + '</td>';
            html += '<td><span class=\"status-badge status-' + p.status + '\">' + (p.status === 'published' ? 'Published' : 'Draft') + '</span></td>';
            html += '<td>' + p.date + '</td>';
            html += '<td><div class=\"action-btns\">';
            html += '<button class=\"btn btn-outline btn-sm\" onclick=\"editPost(' + p.id + ')\">Edit</button>';
            html += '<button class=\"btn btn-danger btn-sm\" onclick=\"deletePost(' + p.id + ')\">Delete</button>';
            html += '</div></td></tr>';
        });
        html += '</tbody></table>';
    }
    html += '</div>';
    container.innerHTML = html;
}

function openPostModal(postId) {
    document.getElementById('postModal').classList.add('active');
    if (postId) {
        var posts = getPosts();
        var post = posts.find(function(p) { return p.id === postId; });
        if (post) {
            document.getElementById('postModalTitle').textContent = 'Edit Article';
            document.getElementById('postId').value = post.id;
            document.getElementById('postTitle').value = post.title;
            document.getElementById('postCategory').value = post.category;
            document.getElementById('postImage').value = post.image || '';
            document.getElementById('postExcerpt').value = post.excerpt || '';
            document.getElementById('postContent').value = post.content || '';
            document.getElementById('postStatus').value = post.status;
            document.getElementById('postDate').value = post.date;
        }
    } else {
        document.getElementById('postModalTitle').textContent = 'New Article';
        document.getElementById('postForm').reset();
        document.getElementById('postId').value = '';
        document.getElementById('postDate').value = new Date().toISOString().split('T')[0];
    }
}

function closePostModal() {
    document.getElementById('postModal').classList.remove('active');
}

function editPost(id) { openPostModal(id); }

function savePost() {
    var id = document.getElementById('postId').value;
    var title = document.getElementById('postTitle').value.trim();
    if (!title) { showToast('Please enter an article title', 'error'); return; }

    var posts = getPosts();
    var data = {
        title: title,
        category: document.getElementById('postCategory').value,
        image: document.getElementById('postImage').value.trim(),
        excerpt: document.getElementById('postExcerpt').value.trim(),
        content: document.getElementById('postContent').value,
        status: document.getElementById('postStatus').value,
        date: document.getElementById('postDate').value || new Date().toISOString().split('T')[0]
    };

    if (id) {
        var idx = posts.findIndex(function(p) { return p.id === parseInt(id); });
        if (idx !== -1) posts[idx] = Object.assign(posts[idx], data);
        showToast('Article updated', 'success');
    } else {
        data.id = Date.now();
        data.readTime = '5 min';
        posts.unshift(data);
        showToast('Article created', 'success');
    }

    savePosts(posts);
    closePostModal();
    renderPostsPage(document.getElementById('contentArea'));
}

function deletePost(id) {
    if (!confirm('Delete this article?')) return;
    var posts = getPosts().filter(function(p) { return p.id !== id; });
    savePosts(posts);
    renderPostsPage(document.getElementById('contentArea'));
    showToast('Article deleted', 'success');
}

// ============================================
// Gallery Page
// ============================================
function renderGalleryPage(container) {
    var images = [
        'gallery-case-01.PNG', 'gallery-case-02.PNG', 'gallery-case-03.PNG',
        'gallery-case-04.PNG', 'gallery-case-05.PNG', 'gallery-case-06.PNG',
        'gallery-case-07.PNG', 'gallery-case-08.PNG', 'gallery-case-09.PNG',
        'gallery-case-10.PNG', 'gallery-case-11.PNG', 'gallery-case-12.PNG',
        'gallery-ai-01.jpeg', 'gallery-ai-02.jpeg', 'gallery-ai-03.jpeg',
        'gallery-ai-04.jpeg', 'gallery-ai-05.jpeg', 'gallery-ai-06.jpeg',
        'gallery-ai-07.jpeg', 'gallery-ai-08.jpeg'
    ];

    var html = '<div class=\"table-container\">';
    html += '<div class=\"table-header\"><h3>Case Gallery (' + images.length + ' images)</h3>';
    html += '<p style=\"color:var(--text-light);font-size:0.85rem;\">Images are stored in the website/images/ directory.</p></div>';
    html += '<div class=\"gallery-admin-grid\">';

    images.forEach(function(img) {
        html += '<div class=\"gallery-admin-item\">';
        html += '<img src="images/' + img + '" alt="' + img + '" onerror="this.style.display=\'none\'">';
        html += '<div class=\"img-name\">' + img + '</div></div>';
    });

    html += '</div>';
    html += '<div style=\"padding:20px 24px;border-top:1px solid var(--border);\">';
    html += '<h4 style=\"margin-bottom:12px;color:var(--primary);\">Add New Image Reference</h4>';
    html += '<p style=\"font-size:0.85rem;color:var(--text-light);margin-bottom:12px;\">Copy the image file into the website/images/ directory first, then add it here.</p>';
    html += '<div style=\"display:flex;gap:12px;flex-wrap:wrap;\">';
    html += '<input type=\"text\" id=\"newImageName\" placeholder=\"Filename, e.g. gallery-new-01.PNG\" style=\"flex:1;min-width:200px;padding:10px 14px;border:1px solid var(--border);border-radius:4px;font-size:0.85rem;\">';
    html += '<button class=\"btn btn-primary btn-sm\" onclick=\"addGalleryImage()\">Add</button>';
    html += '</div></div></div>';

    container.innerHTML = html;
}

function addGalleryImage() {
    var name = document.getElementById('newImageName').value.trim();
    if (!name) { showToast('Please enter a filename', 'error'); return; }
    showToast('Image reference added. Make sure the file is in the images directory.', 'success');
    document.getElementById('newImageName').value = '';
    renderGalleryPage(document.getElementById('contentArea'));
}

// ============================================
// Settings Page
// ============================================
function renderSettingsPage(container) {
    var s = getSettings();
    var html = '<form onsubmit=\"saveSettingsForm(event)\">';

    html += '<div class=\"settings-section\"><h3>WhatsApp Settings</h3><div class=\"settings-body\">';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>WhatsApp Number With Country Code</label>';
    html += '<input type=\"text\" id=\"setWhatsapp\" value=\"' + escAttr(s.whatsappNumber) + '\" placeholder=\"8613800138000\"></div>';
    html += '<div class=\"form-group\"><label>Preset Message</label>';
    html += '<input type=\"text\" id=\"setWaMsg\" value=\"' + escAttr(s.whatsappMessage) + '\"></div>';
    html += '</div></div></div>';

    html += '<div class=\"settings-section\"><h3>Contact Information</h3><div class=\"settings-body\">';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>Email</label>';
    html += '<input type=\"email\" id=\"setEmail\" value=\"' + escAttr(s.email) + '\"></div>';
    html += '<div class=\"form-group\"><label>Address</label>';
    html += '<input type=\"text\" id=\"setAddress\" value=\"' + escAttr(s.address) + '\"></div>';
    html += '</div></div></div>';

    html += '<div class=\"settings-section\"><h3>Homepage Hero</h3><div class=\"settings-body\">';
    html += '<div class=\"form-group\"><label>Site Title</label>';
    html += '<input type=\"text\" id=\"setSiteTitle\" value=\"' + escAttr(s.siteTitle) + '\"></div>';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>Hero Main Title</label>';
    html += '<input type=\"text\" id=\"setHeroTitle\" value=\"' + escAttr(s.heroTitle) + '\"></div>';
    html += '<div class=\"form-group\"><label>Hero Subtitle</label>';
    html += '<input type=\"text\" id=\"setHeroSub\" value=\"' + escAttr(s.heroSubtitle) + '\"></div>';
    html += '</div>';
    html += '<div class=\"form-group\"><label>Hero Description</label>';
    html += '<textarea id=\"setHeroDesc\" rows=\"3\">' + escHtml(s.heroDesc) + '</textarea></div>';
    html += '</div></div>';

    html += '<div style=\"display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap;margin-top:8px;\">';
    html += '<button type=\"button\" class=\"btn btn-outline\" onclick=\"resetSettings()\">Reset Defaults</button>';
    html += '<button type=\"button\" class=\"btn btn-outline\" onclick=\"exportData()\">Export Data</button>';
    html += '<button type=\"submit\" class=\"btn btn-primary\">Save Settings</button>';
    html += '</div></form>';

    container.innerHTML = html;
}

function saveSettingsForm(e) {
    e.preventDefault();
    var settings = {
        whatsappNumber: document.getElementById('setWhatsapp').value.trim(),
        whatsappMessage: document.getElementById('setWaMsg').value.trim(),
        email: document.getElementById('setEmail').value.trim(),
        address: document.getElementById('setAddress').value.trim(),
        siteTitle: document.getElementById('setSiteTitle').value.trim(),
        heroTitle: document.getElementById('setHeroTitle').value.trim(),
        heroSubtitle: document.getElementById('setHeroSub').value.trim(),
        heroDesc: document.getElementById('setHeroDesc').value.trim()
    };
    saveSettings(settings);
    showToast('Settings saved', 'success');
}

function resetSettings() {
    if (!confirm('Reset settings to defaults?')) return;
    localStorage.removeItem('cms_settings');
    renderSettingsPage(document.getElementById('contentArea'));
    showToast('Default settings restored', 'success');
}

function exportData() {
    var data = {
        posts: getPosts(),
        settings: getSettings(),
        exportDate: new Date().toISOString()
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'cms-backup-' + new Date().toISOString().split('T')[0] + '.json';
    a.click();
    URL.revokeObjectURL(url);
    showToast('Data exported', 'success');
}

// Utility
function escHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;');
}

function escAttr(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Init - moved into DOMContentLoaded above
