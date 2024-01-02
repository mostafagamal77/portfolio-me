// ---------- Selection Of Elements in HTML
const preloader = document.querySelector(".preloader"),
  scrollTop = document.querySelector(".scroll-top"),
  sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".links-menu a"),
  toggleBtn = document.querySelector(".toggle-btn"),
  toggleMenu = document.querySelector(".toggle-menu"),
  linksMenu = document.querySelectorAll(".toggle-menu li"),
  linksToggle = document.querySelectorAll(".toggle-menu .links a"),
  inputs = document.querySelectorAll(".input"),
  submitBtn = document.querySelector(".submit"),
  userNameInput = document.getElementById("username"),
  userEmailInput = document.getElementById("email"),
  userPhoneInput = document.getElementById("phone"),
  userMessageInput = document.getElementById("message");

/*---------- Start Preloader ----------*/
$(document).ready(() => {
  $("body").css("overflow-y", "hidden");
  $(".img-container").fadeOut(3000, () => {
    $(".img-container")
      .parent()
      .fadeOut(2500, () => {
        $(".preloader").remove();
        $("body").css("overflow-y", "auto");
      });
  });
});
/*---------- End Preloader ----------*/

/*---------- Start prevent scroll when open menu ----------*/
$(document).ready(() => {
  let isMenuAlreadyOpen = false;
  $(".toggle-btn").on("click", () => {
    $("body").css("overflow", isMenuAlreadyOpen ? "auto" : "hidden");
    isMenuAlreadyOpen = !isMenuAlreadyOpen;
  });
});

/*---------- Start Toggle Menu ----------*/
toggleBtn.addEventListener("click", () => {
  toggleMenu.classList.toggle("opened");
  if (toggleMenu.classList.contains("opened")) {
    toggleBtn.innerHTML = '<i class="fad fa-times m-1"></i>';
  } else {
    toggleBtn.innerHTML = `<i
      class="fa-duotone fa-bars fa-lg"
      style="--fa-primary-opacity: 1; --fa-secondary-opacity: 0.4"
      ></i>`;
  }
  linksMenu.forEach((li) => {
    li.addEventListener("click", () => {
      toggleBtn.innerHTML = `<i
      class="fa-duotone fa-bars fa-lg"
      style="--fa-primary-opacity: 1; --fa-secondary-opacity: 0.4"
      ></i>`;
      toggleMenu.classList.remove("opened");
    });
  });
});
/*---------- End Toggle Menu ----------*/

/*---------------- Start Window Scroll ----------------*/
window.onscroll = () => {
  /*---------- Start Scroll Top ----------*/
  if (scrollY >= 600) {
    scrollTop.style.display = "block";
    scrollTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
  } else {
    scrollTop.style.display = "none";
  }
  /*---------- End Scroll Top ----------*/

  /*---------- Start ScrollSpy ----------*/
  sections.forEach((section) => {
    if (section) {
      let top = window.scrollY,
        offsetTop = section.offsetTop - 80,
        secHeight = section.offsetHeight,
        id = section.getAttribute("id");

      if (top >= offsetTop && top < offsetTop + secHeight) {
        links.forEach((link) => {
          link.classList.remove("active");
          const targetLink = document.querySelector(
            ".links-menu a[href*=" + id + "]"
          );
          if (targetLink) {
            targetLink.classList.add("active");
          }
        });
        linksToggle.forEach((link) => {
          const targetLinkT = document.querySelector(
            ".toggle-menu a[href*=" + id + "]"
          );
          link.classList.remove("active");

          if (targetLinkT) {
            targetLinkT.classList.add("active");
          }
        });
      }
    }
  });
};
/*---------- End ScrollSpy ----------*/

/*---------------- End Window Scroll ----------------*/

/*---------------- Start Skills ----------------*/
let skillsContainer = document.querySelector(".skills-box"),
  currentLearning = document.querySelector(".current-box"),
  futureSteps = document.querySelector(".future-box");

fetchData("skills", skillsContainer, createSkill);
fetchData("currentlearning", currentLearning, createSkill);
fetchData("futuresteps", futureSteps, createSkill);

// create skill box
function createSkill({ id, src, alt, title }) {
  let skill = document.createElement("div");
  skill.className = "skill";
  skill.innerHTML = `
  <img 
    src=${src}
    alt=${alt}
    title=${title}
  />
  `;
  return skill;
}

function fetchData(domain, container, childDiv) {
  let baseUrl = `https://myportfolio-data.onrender.com/${domain}`;
  fetch(baseUrl)
    .then((res) => res.json())
    .then((data) => {
      data.map((item) => container.append(childDiv(item)));
    });
}
/*---------------- End Skills ----------------*/

/*---------------- Start Works  ----------------*/
/*==start get data ==*/
let worksContainer = document.querySelector(".works-box");

fetchData("works", worksContainer, workBox);

function workBox({ id, src, alt, category, code, demo }) {
  let work = document.createElement("div");
  work.classList.add("box-item", "col-md-6", "col-lg-3", "mix", category);
  work.innerHTML = `
  <img
    class="img-fluid"
    src=${src}
    alt=${alt}
  />
  <div class="box-overlay">
    <a
      target="_blank"
      href=${code}
      ><i class="fa-brands fa-github"></i
    ></a>
    <a
      target="_blank"
      href=${demo}
      ><i class="fa-duotone fa-link"></i
    ></a>
  </div>
  `;
  return work;
}
/*==end get data ==*/

/* == Start Works all li active remover == */
let liTabs = document.querySelectorAll(".works-tabs li"),
  allTab = document.querySelector(".tab-active");
liTabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    if (!e.target.classList.contains("tab-active")) {
      allTab.classList.remove("tab-active");
    }
  });
});
/* == End Works all li active remover == */

$(document).ready( () => {
  $(".list").click(function () { 
    const value = $(this).attr('data-filter');
    if (value == 'all') {
      $(".box-item").show('1000')
    } else {
      $(".box-item").not('.'+value).hide('1000')
      $(".box-item").filter('.'+value).show('1000')
    }
    
  });
})
/*---------------- End Works ----------------*/

/*---------------- Start Contact  ----------------*/
// input place holder
function addFocus() {
  let inputParent = this.parentNode;
  inputParent = inputParent.classList.add("focus");
}

function removeFocus() {
  let inputParent = this.parentNode;
  if (this.value == "") {
    inputParent = inputParent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", addFocus);
  input.addEventListener("blur", removeFocus);
});

/* Start Validate Form*/

function validateName() {
  let regexText = /^[a-zA-Z][a-zA-Z '.-]*[A-Za-z][^-]$/;
  if (regexText.test(userNameInput.value) == true) {
    document.querySelector(".check-name").classList.remove("d-none");
    document.querySelector(".times-name").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".check-name").classList.add("d-none");
    document.querySelector(".times-name").classList.remove("d-none");
    return false;
  }
}
function validateEmail() {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regexEmail.test(userEmailInput.value) == true) {
    document.querySelector(".check-email").classList.remove("d-none");
    document.querySelector(".times-email").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".check-email").classList.add("d-none");
    document.querySelector(".times-email").classList.remove("d-none");

    return false;
  }
}
function validatePhone() {
  let regexText = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  if (regexText.test(userPhoneInput.value) == true) {
    document.querySelector(".check-phone").classList.remove("d-none");
    document.querySelector(".times-phone").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".check-phone").classList.add("d-none");
    document.querySelector(".times-phone").classList.remove("d-none");
    return false;
  }
}

function validateMessage() {
  let regexMessage = /^([A-z ]{3,200})$/;
  if (regexMessage.test(userMessageInput.value) == true) {
    document.querySelector(".check-mess").classList.remove("d-none");
    document.querySelector(".times-mess").classList.add("d-none");
    return true;
  } else {
    document.querySelector(".check-mess").classList.add("d-none");
    document.querySelector(".times-mess").classList.remove("d-none");

    return false;
  }
}

userNameInput.addEventListener("keyup", validateName);
userEmailInput.addEventListener("keyup", validateEmail);
userPhoneInput.addEventListener("keyup", validatePhone);
userMessageInput.addEventListener("keyup", validateMessage);
/* End Validate Form*/

// Email js

submitBtn.addEventListener("click", () => {
  if (
    validateName() &&
    validateEmail() &&
    validatePhone() &&
    validateMessage()
  ) {
    sendEmail();
  } else {
    console.log(1);
  }
});

function sendEmail() {
  (function () {
    emailjs.init("wN-yBO86BImXHGIPd");
  })();
  var params = {
    from_name: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  };
  const serviceId = "service_flto4rx",
    templateId = "template_dzwv5y7";

  emailjs
    .send(serviceId, templateId, params)
    .then((res) => {
      document.querySelector(".message-sent").classList.remove("d-none");
      setTimeout(() => {
        // document.querySelector(".times-mess").classList.add("d-none");
        document.querySelector(".check-name").classList.add("d-none");
        document.querySelector(".check-phone").classList.add("d-none");
        document.querySelector(".check-email").classList.add("d-none");
        document.querySelector(".check-mess").classList.add("d-none");
        document.querySelector(".message-sent").classList.add("d-none");

        userNameInput.value = "";
        userEmailInput.value = "";
        userPhoneInput.value = "";
        userMessageInput.value = "";
      }, 2000);
    })
    .catch((err) => console.log("error"));
}
/*---------------- End Contact  ----------------*/
