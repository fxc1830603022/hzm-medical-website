// Blog Page JavaScript - reads from CMS data if available

var blogPosts = [
    {
        title: 'What Is a Deep Plane Facelift, and How Is It Different?',
        category: 'Technique',
        date: 'December 15, 2024',
        image: 'images/b54df5be51a02c27874d9654dcf7cd3b.jpg',
        content: '<p>Deep Plane facelift technique is one of the most advanced approaches in modern facial rejuvenation.</p><p>Unlike traditional skin-tension or superficial SMAS lifting, deep plane surgery works in a deeper anatomical layer to release and reposition facial support structures. This helps the result look softer, more natural, and more durable.</p><h4>Why the deep plane matters</h4><p>1. A more natural result: deeper tissues are repositioned instead of simply pulling the skin.</p><p>2. Better longevity: the lift addresses structural aging rather than surface looseness alone.</p><p>3. Greater technical demand: safe, precise dissection requires deep anatomical expertise.</p>'
    },
    {
        title: 'The Truth About Facial Aging: From Bone to Skin',
        category: 'Education',
        date: 'December 10, 2024',
        image: 'images/be355d7cd70301a66fcdf6effc5a781f.jpg',
        content: '<p>Facial aging is a multilayer process involving bone resorption, fat-pad descent, fascial laxity, and skin quality changes.</p><p>That is why a procedure focused only on the skin cannot solve every visible sign of aging. 9D Lifting System is designed from a layered understanding of facial anatomy, allowing the treatment plan to match the patient rather than forcing every patient into the same method.</p>'
    },
    {
        title: 'The Philosophy of 9D Lifting: Why Charm Preservation Matters',
        category: 'Technique',
        date: 'December 5, 2024',
        image: 'images/896412cd7db178d8aff7975c761cf596.jpg',
        content: '<p>Charm Preservation means protecting your unique facial proportions, expression, and personal character while performing precise rejuvenation in the correct anatomical layers.</p><p>The goal is not to create a new face. The goal is to bring back a younger version of you, with your own smile, movement, and identity still intact.</p>'
    },
    {
        title: 'Facelift Recovery Guide: Day 1 to Day 90',
        category: 'FAQ',
        date: 'November 28, 2024',
        image: 'images/f12e811b39a2ca6114abc09612047f30.jpg',
        content: '<p>Recovery is an important part of the final result. Swelling, bruising, tightness, and gradual contour refinement each have their own timeline.</p><p>During consultation, Dr. Xiao\'s team provides a personalized recovery plan based on your procedure type, anatomy, and travel schedule, helping you move through each stage with clarity and confidence.</p>'
    },
    {
        title: 'A 50-Year-Old European Patient\'s 9D Deep Plane Journey',
        category: 'Cases',
        date: 'November 20, 2024',
        image: 'images/2683b7b84cb3111a72f78c2f1cb83942.jpg',
        content: '<p>After a short-lived thread lift, Sarah from the UK wanted a more structural, natural solution. Her 9D Deep Plane plan focused on repositioning deep tissue support while preserving her original expression.</p><p>At six months, the goal was not a different face, but a refreshed, rested, and younger-looking version of herself.</p>'
    },
    {
        title: 'Thread Lift vs. Surgical Facelift: Do Not Confuse the Concepts',
        category: 'Education',
        date: 'November 15, 2024',
        image: 'images/b8cb485707aa2b6872cc479109c0605e.jpg',
        content: '<p>Thread lifting and surgical deep-structure remodeling are not the same level of treatment. A thread lift may provide temporary support for selected patients, but it cannot replace a carefully performed facelift when deep laxity is the core problem.</p><p>True 9D Lifting is a surgical system, not a marketing label for thread placement.</p>'
    }
];

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
            btn.textContent = 'Subscribed!';
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
    var names = { technique: 'Technique', knowledge: 'Education', case: 'Cases', faq: 'FAQ' };
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
        '<p>Want to learn more? Contact us for a personalized consultation plan.</p>' +
        '<a href=\"index.html#contact\" class=\"btn btn-primary\">Book a 1-on-1 Online Consultation</a>' +
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
    btn.textContent = 'No More Articles';
    btn.disabled = true;
    btn.style.opacity = '0.5';
}
