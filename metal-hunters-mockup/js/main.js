/* ==========================================================================
   METAL HUNTERS — main.js (vanilla JS, no framework)
   Product data, garment mockup SVGs, cart (localStorage), UI behaviors
   ========================================================================== */

(function(){
  "use strict";

  /* ------------------------------------------------------------------ *
   * 1. PRODUCT CATALOG
   * ------------------------------------------------------------------ */
  var PRODUCTS = [
    { id:1,  name:"Xerox Riot Tee",          price:34.90, category:"tshirt",   type:"tee",    fit:"black",  badge:"New",     tag:"RIOT",     photo:"assets/product-europeloves-tee.jpg", desc:"T-shirt in cotone pesante 220gsm con stampa fotocopiata a fuoco diretto sul retro. Ispirata ai black book dei writer, taglio dritto, orlo grezzo." },
    { id:2,  name:"Halftone Bomber Tee",     price:36.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"Limited", tag:"BOMBER",   desc:"Stampa a retino halftone ad alto contrasto su base bianca sporca. Drop limitato, numerato sul collo interno." },
    { id:3,  name:"Freight Line Tee",        price:32.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"",        tag:"FREIGHT",  photo:"assets/product-freight-tee.jpg", desc:"Dedicata ai treni merci bombardati. Cotone organico, vestibilità oversize, stampa screen print opaca." },
    { id:4,  name:"Blackbook Tee",           price:34.90, category:"tshirt",   type:"tee",    fit:"white",  badge:"New",     tag:"BLACKBOOK",desc:"Grafica ispirata alle pagine dei blackbook, texture carta e inchiostro. Cotone 100% pettinato." },
    { id:5,  name:"Toy vs King Tee",         price:33.90, category:"tshirt",   type:"tee",    fit:"grey",   badge:"",        tag:"TOY/KING", desc:"Stampa doppia fronte/retro, grigio cemento. Per chi lo sa: dal toy al king." },
    { id:6,  name:"All City Tee",            price:35.90, category:"tshirt",   type:"tee",    fit:"black",  badge:"Limited", tag:"ALL CITY", photo:"assets/product-allcity-tee.jpg", desc:"Serigrafia a due colori, ispirazione tag da metropolitana. Edizione limitata a 200 pezzi." },
    { id:7,  name:"Yard Runner Hoodie",      price:64.90, category:"hoodie",   type:"hoodie", fit:"black",  badge:"New",     tag:"YARD",     desc:"Felpa pesante 320gsm con cappuccio foderato, stampa gommata sul petto. Fondo notturno da deposito treni." },
    { id:8,  name:"Fat Cap Hoodie",          price:69.90, category:"hoodie",   type:"hoodie", fit:"grey",   badge:"Limited", tag:"FAT CAP",  desc:"Hoodie unisex, tasca marsupio, stampa a retino sulla schiena in stile poster fotocopiato." },
    { id:9,  name:"Ghost Train Hoodie",      price:66.90, category:"hoodie",   type:"hoodie", fit:"black",  badge:"",        tag:"GHOST",    desc:"Silhouette oversize, coulisse piatte, grafica treno fantasma in negativo." },
    { id:10, name:"Ill Style Hoodie",        price:67.90, category:"hoodie",   type:"hoodie", fit:"white",  badge:"New",     tag:"ILL STYLE",desc:"Base bianca sporca, stampa blackletter sul cappuccio. Pezzo di punta del drop." },
    { id:11, name:"Vandal Cap",              price:24.90, category:"accessori",type:"cap",    fit:"black",  badge:"",        tag:"VANDAL",   desc:"Cappellino a 6 pannelli, ricamo frontale, visiera curva regolabile con fibbia metallica." },
    { id:12, name:"Piece Book Sticker Pack", price:9.90,  category:"accessori",type:"sticker", fit:"black", badge:"New",     tag:"PIECE BOOK",desc:"Pack da 12 sticker vinilici resistenti alle intemperie con le grafiche storiche del brand." }
  ];

  var SIZES = ["S","M","L","XL","XXL"];
  var COLORS = ["Nero","Bianco","Grigio Cemento"];

  function getProductById(id){
    id = parseInt(id, 10);
    for (var i=0;i<PRODUCTS.length;i++){ if (PRODUCTS[i].id === id) return PRODUCTS[i]; }
    return null;
  }

  /* ------------------------------------------------------------------ *
   * 2. GARMENT MOCKUP SVG GENERATOR
   *    Draws a stylised tee / hoodie / cap / sticker silhouette with a
   *    halftone print + graffiti/blackletter wordmark — no external
   *    image dependency, always renders identically.
   * ------------------------------------------------------------------ */
  var FIT_COLORS = {
    black:{ garment:"#161616", trim:"#0A0A0A", ink:"#F2F1EA" },
    white:{ garment:"#EDEBE1", trim:"#c9c7bb",  ink:"#0A0A0A" },
    grey: { garment:"#6d6f72", trim:"#54565a",  ink:"#F2F1EA" }
  };

  function uid(){ return "u"+Math.random().toString(36).slice(2,9); }

  function garmentPath(type){
    switch(type){
      case "hoodie":
        return "M70,38 C70,18 130,18 130,38 L150,46 L172,78 L150,96 L150,205 L50,205 L50,96 L28,78 L50,46 Z";
      case "cap":
        return "M40,90 C40,55 78,32 100,32 C122,32 160,55 160,90 L165,96 L100,102 L35,96 Z";
      case "sticker":
        return "M100,20 L160,55 L160,125 L100,160 L40,125 L40,55 Z";
      default: /* tee */
        return "M50,20 L80,8 Q100,26 120,8 L150,20 L174,52 L150,68 L150,205 L50,205 L50,68 L26,52 Z";
    }
  }

  function garmentSVG(product, opts){
    opts = opts || {};
    var palette = FIT_COLORS[product.fit] || FIT_COLORS.black;
    var pid = uid();
    var patternId = "ht-"+pid;
    var clipId = "clip-"+pid;
    var path = garmentPath(product.type);
    var showWordmark = opts.wordmark !== false;
    var printY = product.type === "hoodie" ? 60 : (product.type === "cap" ? 55 : 55);
    var printH = product.type === "cap" ? 30 : 70;

    return (
      '<svg viewBox="0 0 200 220" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+product.name+'">' +
        '<defs>' +
          '<pattern id="'+patternId+'" width="4" height="4" patternUnits="userSpaceOnUse">' +
            '<circle cx="1.2" cy="1.2" r="1" fill="'+palette.ink+'" opacity="0.55"/>' +
          '</pattern>' +
          '<clipPath id="'+clipId+'"><path d="'+path+'"/></clipPath>' +
        '</defs>' +
        '<rect width="200" height="220" fill="#0d0d0d"/>' +
        '<g clip-path="url(#'+clipId+')">' +
          '<path d="'+path+'" fill="'+palette.garment+'"/>' +
          '<rect x="20" y="'+printY+'" width="160" height="'+printH+'" fill="url(#'+patternId+')"/>' +
          '<path d="'+path+'" fill="none" stroke="'+palette.trim+'" stroke-width="3"/>' +
        '</g>' +
        (showWordmark ? (
          '<text x="100" y="'+(printY + printH/2 - 6)+'" text-anchor="middle" font-family="Fruktur, serif" font-size="16" fill="'+palette.ink+'">MH</text>' +
          '<text x="100" y="'+(printY + printH/2 + 14)+'" text-anchor="middle" font-family="Permanent Marker, cursive" font-size="11" fill="'+palette.ink+'" transform="rotate(-3 100 '+(printY + printH/2 + 14)+')">'+product.tag+'</text>'
        ) : "") +
      '</svg>'
    );
  }

  /* ------------------------------------------------------------------ *
   * 3. PRODUCT CARD RENDERING
   * ------------------------------------------------------------------ */
  function badgeMarkup(badge){
    if (!badge) return "";
    var bg = badge === "Limited" ? "var(--mh-ice)" : "var(--mh-white)";
    var color = "var(--mh-black)";
    return '<span class="card-badge" style="background:'+bg+';color:'+color+';">'+badge+'</span>';
  }

  function cardMediaHTML(product){
    if (product.photo){
      return '<img src="'+product.photo+'" alt="'+product.name+'" loading="lazy">';
    }
    return garmentSVG(product);
  }

  function productCardHTML(product){
    return (
      '<div class="col-6 col-md-4 col-lg-3">' +
        '<a class="product-card-link" href="product.html?id='+product.id+'">' +
          '<div class="product-card">' +
            badgeMarkup(product.badge) +
            '<div class="card-media">'+ cardMediaHTML(product) +'</div>' +
            '<div class="card-body">' +
              '<div class="product-cat">'+ categoryLabel(product.category) +'</div>' +
              '<div class="product-name">'+ product.name +'</div>' +
              '<div class="product-price">€ '+ product.price.toFixed(2) +'</div>' +
            '</div>' +
          '</div>' +
        '</a>' +
      '</div>'
    );
  }

  function categoryLabel(cat){
    if (cat === "tshirt") return "T-Shirt";
    if (cat === "hoodie") return "Hoodie";
    if (cat === "accessori") return "Accessori";
    return cat;
  }

  function renderGrid(containerId, list){
    var el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = list.map(productCardHTML).join("");
  }

  /* ------------------------------------------------------------------ *
   * 4. CART (localStorage)
   * ------------------------------------------------------------------ */
  var CART_KEY = "mh_cart";

  function getCart(){
    try{
      var raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    }catch(e){ return []; }
  }

  function saveCart(cart){
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCartOffcanvas();
  }

  function addToCart(product, qty, size, color){
    qty = qty || 1;
    var cart = getCart();
    var existing = cart.find(function(item){
      return item.id === product.id && item.size === size && item.color === color;
    });
    if (existing){
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        nome: product.name,
        prezzo: product.price,
        immagine: product.type + "-" + product.fit,
        size: size || SIZES[1],
        color: color || COLORS[0],
        qty: qty
      });
    }
    saveCart(cart);
    return cartCount(cart);
  }

  function removeFromCart(index){
    var cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
  }

  function cartCount(cart){
    cart = cart || getCart();
    return cart.reduce(function(sum, item){ return sum + item.qty; }, 0);
  }

  function cartTotal(cart){
    cart = cart || getCart();
    return cart.reduce(function(sum, item){ return sum + item.qty * item.prezzo; }, 0);
  }

  function updateCartBadge(){
    var count = cartCount();
    document.querySelectorAll(".cart-count").forEach(function(el){
      el.textContent = count;
      el.style.display = count > 0 ? "inline-flex" : "none";
    });
  }

  function miniGarmentSVG(imageKey){
    var parts = (imageKey || "tee-black").split("-");
    var fakeProduct = { name:"", type:parts[0] || "tee", fit:parts[1] || "black", tag:"MH" };
    return garmentSVG(fakeProduct, { wordmark:false });
  }

  function renderCartOffcanvas(){
    var body = document.getElementById("cartOffcanvasBody");
    var totalEl = document.getElementById("cartOffcanvasTotal");
    if (!body) return;
    var cart = getCart();
    if (cart.length === 0){
      body.innerHTML = '<p class="text-grey text-center py-4">Il tuo carrello è vuoto.<br>Vai su <a href="shop.html" class="text-decoration-underline">Shop</a> e scegli il prossimo pezzo.</p>';
    } else {
      body.innerHTML = cart.map(function(item, idx){
        return (
          '<div class="cart-line">' +
            '<div class="cart-thumb">'+ miniGarmentSVG(item.immagine) +'</div>' +
            '<div class="flex-grow-1">' +
              '<div class="cart-name">'+ item.nome +'</div>' +
              '<div class="cart-meta">Taglia '+ item.size +' &middot; '+ item.color +' &middot; Qt. '+ item.qty +'</div>' +
              '<div class="cart-meta">€ '+ (item.prezzo * item.qty).toFixed(2) +'</div>' +
              '<button type="button" class="cart-remove mt-1" data-remove-index="'+ idx +'">Rimuovi</button>' +
            '</div>' +
          '</div>'
        );
      }).join("");
    }
    if (totalEl) totalEl.textContent = "€ " + cartTotal(cart).toFixed(2);

    body.querySelectorAll("[data-remove-index]").forEach(function(btn){
      btn.addEventListener("click", function(){
        removeFromCart(parseInt(btn.getAttribute("data-remove-index"), 10));
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 5. TOAST NOTIFICATION
   * ------------------------------------------------------------------ */
  function showToast(message){
    var container = document.getElementById("mhToastContainer");
    if (!container) return;
    var toastEl = document.createElement("div");
    toastEl.className = "toast align-items-center border-0";
    toastEl.setAttribute("role", "status");
    toastEl.innerHTML =
      '<div class="d-flex">' +
        '<div class="toast-body">'+ message +'</div>' +
        '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Chiudi"></button>' +
      '</div>';
    container.appendChild(toastEl);
    var toast = new bootstrap.Toast(toastEl, { delay: 3200 });
    toast.show();
    toastEl.addEventListener("hidden.bs.toast", function(){ toastEl.remove(); });
  }

  /* ------------------------------------------------------------------ *
   * 6. NAVBAR SCROLL EFFECT
   * ------------------------------------------------------------------ */
  function initNavbarScroll(){
    var nav = document.querySelector(".mh-navbar");
    if (!nav) return;
    function update(){
      if (window.scrollY > 60) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    }
    update();
    window.addEventListener("scroll", update, { passive:true });
  }

  /* ------------------------------------------------------------------ *
   * 7. PARALLAX (Rellax if present, otherwise manual scroll fallback)
   * ------------------------------------------------------------------ */
  function initParallax(){
    var isSmall = window.innerWidth < 768;
    var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    if (window.Rellax && !isSmall){
      try{ new window.Rellax(".rellax", { speed: -2, center: false }); }catch(e){}
    }

    var heroImgs = document.querySelectorAll(".hero-bg");
    if (heroImgs.length && !isSmall){
      window.addEventListener("scroll", function(){
        var offset = window.scrollY * 0.35;
        heroImgs.forEach(function(img){ img.style.transform = "translateY(" + offset + "px)"; });
      }, { passive:true });
    }
  }

  /* ------------------------------------------------------------------ *
   * 8. IMAGE FALLBACK — swap dead/blocked photo URLs for a branded
   *    halftone placeholder so the mockup never shows a broken icon.
   * ------------------------------------------------------------------ */
  function placeholderDataURI(label){
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
        '<rect width="800" height="600" fill="#0A0A0A"/>' +
        '<defs><pattern id="p" width="10" height="10" patternUnits="userSpaceOnUse">' +
          '<circle cx="2.5" cy="2.5" r="2" fill="#F2F1EA" opacity="0.5"/>' +
        '</pattern></defs>' +
        '<rect width="800" height="600" fill="url(#p)" opacity="0.5"/>' +
        '<text x="400" y="310" text-anchor="middle" font-family="Georgia, serif" font-size="46" fill="#F2F1EA" opacity="0.85">METAL HUNTERS</text>' +
        '<text x="400" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" letter-spacing="4" fill="#C8DDE3">' + (label || "RAW SINCE 2015").toUpperCase() + '</text>' +
      '</svg>';
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function initImageFallback(){
    document.querySelectorAll("img.mh-photo").forEach(function(img){
      img.addEventListener("error", function(){
        if (img.dataset.fallbackApplied) return;
        img.dataset.fallbackApplied = "1";
        img.src = placeholderDataURI(img.dataset.fallbackLabel || img.alt);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 9. REVIEWS SHOW MORE
   * ------------------------------------------------------------------ */
  function initReviewsToggle(){
    var btn = document.getElementById("showAllReviews");
    if (!btn) return;
    btn.addEventListener("click", function(){
      document.querySelectorAll(".review-hidden").forEach(function(card){
        card.classList.remove("review-hidden");
      });
      btn.classList.add("d-none");
    });
  }

  /* ------------------------------------------------------------------ *
   * 10. SHOP FILTERS
   * ------------------------------------------------------------------ */
  function initShopFilters(){
    var bar = document.getElementById("shopFilterBar");
    if (!bar) return;
    var buttons = bar.querySelectorAll(".filter-btn");
    buttons.forEach(function(btn){
      btn.addEventListener("click", function(){
        buttons.forEach(function(b){ b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.dataset.filter;
        var list = cat === "all" ? PRODUCTS : PRODUCTS.filter(function(p){ return p.category === cat; });
        renderGrid("shopGrid", list);
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 11. FAKE FORMS (contact / hall of fame upload / search / newsletter)
   * ------------------------------------------------------------------ */
  function initFakeForm(formId, messageId, message){
    var form = document.getElementById(formId);
    if (!form) return;
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var msg = document.getElementById(messageId);
      if (msg){
        msg.classList.remove("d-none");
        msg.scrollIntoView({ behavior:"smooth", block:"nearest" });
      }
      if (message) showToast(message);
      form.reset();
    });
  }

  function initSearch(){
    document.querySelectorAll(".mh-search").forEach(function(form){
      form.addEventListener("submit", function(e){
        e.preventDefault();
        showToast("Ricerca in arrivo nel prossimo drop. Nel frattempo dai un'occhiata allo Shop.");
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * 12. PRODUCT PAGE RENDER
   * ------------------------------------------------------------------ */
  function initProductPage(){
    var root = document.getElementById("productRoot");
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var product = getProductById(params.get("id")) || PRODUCTS[0];

    document.title = product.name + " — METAL HUNTERS";

    var galleryEl = document.getElementById("productGalleryInner");
    var indicatorsEl = document.getElementById("productCarouselIndicators");
    if (galleryEl){
      var slidesHTML = [];
      if (product.photo){
        slidesHTML.push(
          '<div class="carousel-item active">' +
            '<div class="media-box"><img src="'+product.photo+'" alt="'+product.name+'" style="width:100%;height:100%;object-fit:cover;"></div>' +
          '</div>'
        );
      }
      var fits = [product.fit, "black", "white"].filter(function(v,i,a){ return a.indexOf(v)===i; });
      fits.forEach(function(fit, i){
        var fakeProd = Object.assign({}, product, { fit: fit });
        var isActive = !product.photo && i === 0;
        slidesHTML.push(
          '<div class="carousel-item '+(isActive ? "active" : "")+'">' +
            '<div class="media-box d-flex align-items-center justify-content-center">' + garmentSVG(fakeProd) + '</div>' +
          '</div>'
        );
      });
      galleryEl.innerHTML = slidesHTML.join("");

      if (indicatorsEl){
        indicatorsEl.innerHTML = slidesHTML.map(function(_, i){
          return '<button type="button" data-bs-target="#productCarousel" data-bs-slide-to="'+i+'" class="'+(i===0 ? "active" : "")+'" aria-current="'+(i===0 ? "true" : "false")+'"></button>';
        }).join("");
      }
    }

    var nameEl = document.getElementById("productName");
    var catEl = document.getElementById("productCategory");
    var priceEl = document.getElementById("productPrice");
    var descEl = document.getElementById("productDesc");
    var badgeEl = document.getElementById("productBadge");
    if (nameEl) nameEl.textContent = product.name;
    if (catEl) catEl.textContent = categoryLabel(product.category);
    if (priceEl) priceEl.textContent = "€ " + product.price.toFixed(2);
    if (descEl) descEl.textContent = product.desc;
    if (badgeEl){
      if (product.badge){ badgeEl.textContent = product.badge; badgeEl.classList.remove("d-none"); }
      else { badgeEl.classList.add("d-none"); }
    }

    var sizeSel = document.getElementById("productSize");
    if (sizeSel && !sizeSel.dataset.filled){
      sizeSel.innerHTML = SIZES.map(function(s){ return '<option value="'+s+'">'+s+'</option>'; }).join("");
      sizeSel.dataset.filled = "1";
    }
    var colorSel = document.getElementById("productColor");
    if (colorSel && !colorSel.dataset.filled){
      colorSel.innerHTML = COLORS.map(function(c){ return '<option value="'+c+'">'+c+'</option>'; }).join("");
      colorSel.dataset.filled = "1";
    }

    var addBtn = document.getElementById("addToCartBtn");
    if (addBtn){
      addBtn.addEventListener("click", function(){
        var qty = parseInt(document.getElementById("productQty").value, 10) || 1;
        var size = sizeSel ? sizeSel.value : SIZES[1];
        var color = colorSel ? colorSel.value : COLORS[0];
        var total = addToCart(product, qty, size, color);
        showToast('<strong>'+product.name+'</strong> aggiunto al carrello. Articoli totali: <strong>'+total+'</strong>');
      });
    }

    var related = PRODUCTS.filter(function(p){ return p.category === product.category && p.id !== product.id; }).slice(0,4);
    if (related.length < 4){
      PRODUCTS.filter(function(p){ return p.id !== product.id && related.indexOf(p) === -1; })
        .slice(0, 4 - related.length)
        .forEach(function(p){ related.push(p); });
    }
    renderGrid("relatedGrid", related);
  }

  /* ------------------------------------------------------------------ *
   * 13. INIT
   * ------------------------------------------------------------------ */
  document.addEventListener("DOMContentLoaded", function(){
    initNavbarScroll();
    initParallax();
    initImageFallback();
    initReviewsToggle();
    initShopFilters();
    initSearch();
    initFakeForm("contactForm", "contactSuccess", "Messaggio inviato. Ti risponderemo a stretto giro.");
    initFakeForm("hofUploadForm", "hofSuccess", "Grazie per il tuo contributo!");
    updateCartBadge();
    renderCartOffcanvas();

    renderGrid("homeFeaturedGrid", PRODUCTS.slice(0,4));
    renderGrid("homeMoreGrid", PRODUCTS.slice(4,8));
    renderGrid("shopGrid", PRODUCTS);

    initProductPage();
  });

  /* Expose a tiny API for inline usage if ever needed */
  window.MH = {
    PRODUCTS: PRODUCTS,
    getProductById: getProductById,
    addToCart: addToCart,
    getCart: getCart,
    cartCount: cartCount,
    showToast: showToast
  };
})();
