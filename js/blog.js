// Blog Page JavaScript - reads from CMS data if available

document.addEventListener('DOMContentLoaded', function() {
    // Check for CMS data first
    var cmsPosts = localStorage.getItem('site_posts');
    var cmsSettings = localStorage.getItem('site_settings');

    if (cmsPosts) {
        try {
            blogPosts = JSON.parse(cmsPosts).map(function(p, i) {
                return {
                    title: p.title,
                    category: getCategoryName(p.category),
                    date: p.date,
                    image: p.image || 'images/gallery-case-01.PNG',
                    content: p.content || '<p>' + (p.excerpt || '') + '</p>'
                };
            });
        } catch(e) { console.log('Using default posts'); }
    }

    // Category filter
    var categoryButtons = document.querySelectorAll('.category-btn');
    var blogCards = document.querySelectorAll('.blog-card');

    categoryButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            categoryButtons.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            var category = this.getAttribute('data-category');
            blogCards.forEach(function(card) {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Newsletter
    var newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            var btn = this.querySelector('button');
            var originalText = btn.textContent;
            btn.textContent = '订阅成功！';
            btn.style.background = '#4CAF50';
            setTimeout(function() {
                btn.textContent = originalText;
                btn.style.background = '';
                newsletterForm.reset();
            }, 3000);
        });
    }

    // Apply WhatsApp number from settings
    if (cmsSettings) {
        try {
            var settings = JSON.parse(cmsSettings);
            if (settings.whatsappNumber) {
                var waLinks = document.querySelectorAll('.whatsapp-float, .social-link');
                waLinks.forEach(function(link) {
                    if (link.href && link.href.indexOf('wa.me') !== -1) {
                        link.href = 'https://wa.me/' + settings.whatsappNumber + '?text=' + encodeURIComponent(settings.whatsappMessage || '');
                    }
                });
            }
        } catch(e) {}
    }
});

function getCategoryName(cat) {
    var names = { technique: '技术解读', knowledge: '抗衰科普', case: '案例分享', faq: '常见问题' };
    return names[cat] || cat;
}

function openBlogModal(index) {
    var modal = document.getElementById('blogModal');
    var body = document.getElementById('blogModalBody');
    if (index >= blogPosts.length) return;
    var post = blogPosts[index];

    body.innerHTML = '<img class=\"blog-modal-image\" src=\"' + post.image + '\" alt=\"' + post.title + '\">' +
        '<span class=\"blog-modal-category\">' + post.category + '</span>' +
        '<p class=\"blog-modal-date\">' + post.date + '</p>' +
        '<h2>' + post.title + '</h2>' +
        '<div class=\"blog-article-content\">' + post.content + '</div>' +
        '<div class=\"blog-article-cta\">' +
        '<p>想要了解更多？立即联系我们获取专属方案</p>' +
        '<a href=\"index.html#contact\" class=\"btn btn-primary\">预约 1对1 在线面诊</a>' +
        '</div>';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBlogModal() {
    document.getElementById('blogModal').classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeBlogModal();
});

function loadMorePosts() {
    var btn = document.getElementById('loadMoreBtn');
    btn.textContent = '暂无更多文章';
    btn.disabled = true;
    btn.style.opacity = '0.5';
}
