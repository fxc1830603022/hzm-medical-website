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
        title: '什么是 Deep Plane 深平面拉皮？与传统拉皮的区别在哪里？',
        category: 'technique',
        image: 'images/b54df5be51a02c27874d9654dcf7cd3b.jpg',
        excerpt: 'Deep Plane（深平面）技术是目前面部年轻化手术中最先进的方法之一。与传统SMAS拉皮不同，深平面技术直接在更深层的组织平面进行操作，能够实现更加自然持久的提升效果...',
        content: '<p>Deep Plane（深平面）面部提升技术是目前国际公认的最先进的面部年轻化手术方法之一。</p><p>与传统SMAS拉皮不同，深平面技术直接在更深层的组织平面进行操作，能够实现更加自然持久的提升效果。肖医生的9D Deep Plane技术在传统基础上进行了多项创新，确保了最佳的自然效果和安全性。</p><h4>深平面技术的核心优势</h4><p>1. 效果更加自然：深层组织复位，皮肤表面不需要过度拉伸</p><p>2. 效果更加持久：通常可以维持10年以上</p><p>3. 恢复更加安全：在正确的解剖平面操作，保护面神经和血管</p>',
        status: 'published',
        date: '2024-12-15',
        readTime: '8分钟'
    },
    {
        id: 2,
        title: '面部衰老的真相：从骨骼到皮肤，你到底在老什么？',
        category: 'knowledge',
        image: 'images/be355d7cd70301a66fcdf6effc5a781f.jpg',
        excerpt: '面部衰老并不仅仅是皮肤松弛那么简单。从骨骼吸收、脂肪垫移位、筋膜层松弛到表皮变薄，衰老是一个多层次、多维度的复杂过程...',
        content: '<p>面部衰老是一个涉及多个层次的复杂过程：骨骼吸收、脂肪垫移位、筋膜层松弛、皮肤老化。</p><p>了解这些层次，才能选择正确的抗衰方式。9D Lifting System 正是基于对多层次衰老的深入理解而设计的。</p>',
        status: 'published',
        date: '2024-12-10',
        readTime: '6分钟'
    },
    {
        id: 3,
        title: '9D Lifting 的核心理念：为什么我们坚持魅力留存？',
        category: 'technique',
        image: 'images/896412cd7db178d8aff7975c761cf596.jpg',
        excerpt: '在医美行业，换脸式的过度手术越来越被有品位的求美者所排斥。9D Lifting 的核心理念是魅力留存...',
        content: '<p>魅力留存（Charm Preservation）意味着保留你独有的五官比例和气质特征，在正确的层次上做精准的年轻化调整。</p><p>我们不换脸，我们做的是时光倒流让年轻时的你重新出现。</p>',
        status: 'published',
        date: '2024-12-05',
        readTime: '10分钟'
    },
    {
        id: 4,
        title: '面部提升手术后恢复期全攻略',
        category: 'faq',
        image: 'images/f12e811b39a2ca6114abc09612047f30.jpg',
        excerpt: '手术只是第一步，术后恢复同样重要。本文详细梳理了从术后即刻到完全恢复的每个阶段...',
        content: '<p>从术后肿胀高峰期到效果稳定期，每个阶段都有特定的护理要点和注意事项。</p><p>了解完整的恢复时间线，帮助您从容应对术后恢复，获得最佳手术效果。</p>',
        status: 'published',
        date: '2024-11-28',
        readTime: '5分钟'
    },
    {
        id: 5,
        title: '50岁欧洲女性的 9D Deep Plane 蜕变之旅',
        category: 'case',
        image: 'images/2683b7b84cb3111a72f78c2f1cb83942.jpg',
        excerpt: '来自英国的Sarah女士，在经历了传统线雕失败后，选择了9D Deep Plane Facelift...',
        content: '<p>Sarah的蜕变之旅从面诊开始，到术后6个月的完美效果。这是一个真实的故事。</p>',
        status: 'published',
        date: '2024-11-20',
        readTime: '7分钟'
    },
    {
        id: 6,
        title: '线雕 vs 手术拉皮：别再被概念偷换了！',
        category: 'knowledge',
        image: 'images/b8cb485707aa2b6872cc479109c0605e.jpg',
        excerpt: '市面上很多机构把线雕包装成9D提升，但实际上线雕和外科深层结构重塑是完全不同的...',
        content: '<p>线雕和手术拉皮是完全不同级别的抗衰方式。线雕效果短暂，而深层结构重塑才是解决严重松弛的根本方法。</p>',
        status: 'published',
        date: '2024-11-15',
        readTime: '6分钟'
    }
];

const defaultSettings = {
    whatsappNumber: '8613800138000',
    whatsappMessage: '您好，我对9D提升很感兴趣，想了解更多信息。',
    email: 'contact@drxiao-9d.com',
    address: '中国 · 上海',
    siteTitle: 'Dr. Xiao Zhongye | 9D Lifting System',
    heroTitle: '拒绝流水线',
    heroSubtitle: 'Only One 9D · Only By Dr. Xiao',
    heroDesc: '真正的抗衰，是保留你原本的魅力，让你依然是你自己，只是年轻了十岁。'
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
                        errEl.textContent = '用户名或密码错误';
                    }
                }
            } catch(err) {
                console.error('[CMS] Login handler error:', err);
                alert('登录出错: ' + err.message);
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
    dashboard: '控制台',
    posts: '博客文章管理',
    gallery: '案例图库管理',
    settings: '网站设置'
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
    var catNames = { technique: '技术解读', knowledge: '抗衰科普', case: '案例分享', faq: '常见问题' };

    var html = '<div class=\"stats-grid\">';
    html += '<div class=\"stat-card\"><h3>总文章数</h3><div class=\"stat-value\">' + posts.length + '</div></div>';
    html += '<div class=\"stat-card\"><h3>已发布</h3><div class=\"stat-value\">' + pub + '</div></div>';
    html += '<div class=\"stat-card\"><h3>草稿</h3><div class=\"stat-value\">' + drafts + '</div></div>';
    html += '<div class=\"stat-card\"><h3>图库图片</h3><div class=\"stat-value\">20</div></div>';
    html += '</div>';

    html += '<div class=\"table-container\"><div class=\"table-header\"><h3>最近文章</h3></div>';
    html += '<table><thead><tr><th>标题</th><th>分类</th><th>状态</th><th>日期</th></tr></thead><tbody>';

    posts.slice(0, 5).forEach(function(p) {
        html += '<tr><td>' + escHtml(p.title).substring(0, 40) + '</td>';
        html += '<td>' + (catNames[p.category] || p.category) + '</td>';
        html += '<td><span class=\"status-badge status-' + p.status + '\">' + (p.status === 'published' ? '已发布' : '草稿') + '</span></td>';
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
    var catNames = { technique: '技术解读', knowledge: '抗衰科普', case: '案例分享', faq: '常见问题' };

    var html = '<div class=\"table-container\">';
    html += '<div class=\"table-header\"><h3>所有文章 (' + posts.length + ')</h3>';
    html += '<button class=\"btn btn-primary\" onclick=\"openPostModal()\">+ 新建文章</button></div>';

    if (posts.length === 0) {
        html += '<div class=\"empty-state\"><p>还没有文章，点击新建文章开始创作</p></div>';
    } else {
        html += '<table><thead><tr><th style=\"width:40%\">标题</th><th>分类</th><th>状态</th><th>日期</th><th>操作</th></tr></thead><tbody>';
        posts.forEach(function(p) {
            html += '<tr>';
            html += '<td><strong>' + escHtml(p.title).substring(0, 50) + (p.title.length > 50 ? '...' : '') + '</strong></td>';
            html += '<td>' + (catNames[p.category] || p.category) + '</td>';
            html += '<td><span class=\"status-badge status-' + p.status + '\">' + (p.status === 'published' ? '已发布' : '草稿') + '</span></td>';
            html += '<td>' + p.date + '</td>';
            html += '<td><div class=\"action-btns\">';
            html += '<button class=\"btn btn-outline btn-sm\" onclick=\"editPost(' + p.id + ')\">编辑</button>';
            html += '<button class=\"btn btn-danger btn-sm\" onclick=\"deletePost(' + p.id + ')\">删除</button>';
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
            document.getElementById('postModalTitle').textContent = '编辑文章';
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
        document.getElementById('postModalTitle').textContent = '新建文章';
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
    if (!title) { showToast('请填写文章标题', 'error'); return; }

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
        showToast('文章已更新', 'success');
    } else {
        data.id = Date.now();
        data.readTime = '5分钟';
        posts.unshift(data);
        showToast('文章已创建', 'success');
    }

    savePosts(posts);
    closePostModal();
    renderPostsPage(document.getElementById('contentArea'));
}

function deletePost(id) {
    if (!confirm('确定要删除这篇文章吗？')) return;
    var posts = getPosts().filter(function(p) { return p.id !== id; });
    savePosts(posts);
    renderPostsPage(document.getElementById('contentArea'));
    showToast('文章已删除', 'success');
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
    html += '<div class=\"table-header\"><h3>案例图库 (' + images.length + ' 张)</h3>';
    html += '<p style=\"color:var(--text-light);font-size:0.85rem;\">图片存放于 website/images/ 目录</p></div>';
    html += '<div class=\"gallery-admin-grid\">';

    images.forEach(function(img) {
        html += '<div class=\"gallery-admin-item\">';
        html += '<img src="images/' + img + '" alt="' + img + '" onerror="this.style.display=\'none\'">';
        html += '<div class=\"img-name\">' + img + '</div></div>';
    });

    html += '</div>';
    html += '<div style=\"padding:20px 24px;border-top:1px solid var(--border);\">';
    html += '<h4 style=\"margin-bottom:12px;color:var(--primary);\">添加新图片引用</h4>';
    html += '<p style=\"font-size:0.85rem;color:var(--text-light);margin-bottom:12px;\">请先将图片文件复制到 website/images/ 目录，然后在此添加。</p>';
    html += '<div style=\"display:flex;gap:12px;flex-wrap:wrap;\">';
    html += '<input type=\"text\" id=\"newImageName\" placeholder=\"文件名 如 gallery-new-01.PNG\" style=\"flex:1;min-width:200px;padding:10px 14px;border:1px solid var(--border);border-radius:4px;font-size:0.85rem;\">';
    html += '<button class=\"btn btn-primary btn-sm\" onclick=\"addGalleryImage()\">添加</button>';
    html += '</div></div></div>';

    container.innerHTML = html;
}

function addGalleryImage() {
    var name = document.getElementById('newImageName').value.trim();
    if (!name) { showToast('请输入文件名', 'error'); return; }
    showToast('图片已添加 请确保文件已放入 images 目录', 'success');
    document.getElementById('newImageName').value = '';
    renderGalleryPage(document.getElementById('contentArea'));
}

// ============================================
// Settings Page
// ============================================
function renderSettingsPage(container) {
    var s = getSettings();
    var html = '<form onsubmit=\"saveSettingsForm(event)\">';

    html += '<div class=\"settings-section\"><h3>WhatsApp 设置</h3><div class=\"settings-body\">';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>WhatsApp 号码 含国家码</label>';
    html += '<input type=\"text\" id=\"setWhatsapp\" value=\"' + escAttr(s.whatsappNumber) + '\" placeholder=\"8613800138000\"></div>';
    html += '<div class=\"form-group\"><label>预设消息</label>';
    html += '<input type=\"text\" id=\"setWaMsg\" value=\"' + escAttr(s.whatsappMessage) + '\"></div>';
    html += '</div></div></div>';

    html += '<div class=\"settings-section\"><h3>联系信息</h3><div class=\"settings-body\">';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>Email</label>';
    html += '<input type=\"email\" id=\"setEmail\" value=\"' + escAttr(s.email) + '\"></div>';
    html += '<div class=\"form-group\"><label>地址</label>';
    html += '<input type=\"text\" id=\"setAddress\" value=\"' + escAttr(s.address) + '\"></div>';
    html += '</div></div></div>';

    html += '<div class=\"settings-section\"><h3>首页 Hero 区域</h3><div class=\"settings-body\">';
    html += '<div class=\"form-group\"><label>网站标题</label>';
    html += '<input type=\"text\" id=\"setSiteTitle\" value=\"' + escAttr(s.siteTitle) + '\"></div>';
    html += '<div class=\"form-row\">';
    html += '<div class=\"form-group\"><label>Hero 主标题</label>';
    html += '<input type=\"text\" id=\"setHeroTitle\" value=\"' + escAttr(s.heroTitle) + '\"></div>';
    html += '<div class=\"form-group\"><label>Hero 副标题 英文</label>';
    html += '<input type=\"text\" id=\"setHeroSub\" value=\"' + escAttr(s.heroSubtitle) + '\"></div>';
    html += '</div>';
    html += '<div class=\"form-group\"><label>Hero 描述</label>';
    html += '<textarea id=\"setHeroDesc\" rows=\"3\">' + escHtml(s.heroDesc) + '</textarea></div>';
    html += '</div></div>';

    html += '<div style=\"display:flex;gap:12px;justify-content:flex-end;flex-wrap:wrap;margin-top:8px;\">';
    html += '<button type=\"button\" class=\"btn btn-outline\" onclick=\"resetSettings()\">恢复默认</button>';
    html += '<button type=\"button\" class=\"btn btn-outline\" onclick=\"exportData()\">导出数据</button>';
    html += '<button type=\"submit\" class=\"btn btn-primary\">保存设置</button>';
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
    showToast('设置已保存', 'success');
}

function resetSettings() {
    if (!confirm('确定要恢复默认设置吗？')) return;
    localStorage.removeItem('cms_settings');
    renderSettingsPage(document.getElementById('contentArea'));
    showToast('已恢复默认设置', 'success');
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
    showToast('数据已导出', 'success');
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
