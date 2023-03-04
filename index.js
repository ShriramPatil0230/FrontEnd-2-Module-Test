
const createBlogBtn = document.querySelector("#create-blog-btn");
const blogContainer = document.querySelector("#container");
const createBlogModal = document.querySelector("#create-blog");
const editBlogModal = document.querySelector("#edit-blog-modal");
const closeBtns = document.querySelectorAll(".close");
const createBlogForm = document.querySelector("#create-blog-form");
const editBlogForm = document.querySelector("#edit-blog-form");
const cancelPost = document.querySelector(".cancel-post");

let blogPosts = [];

function displayBlogPosts() {
  blogContainer.innerHTML = "";

  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.classList.add("blog-post");

    const titleElement = document.createElement("h2");
    titleElement.innerText = post.title;

    const timestampElement = document.createElement("p");
    timestampElement.setAttribute("class", "timeStamp");
    const date = new Date();
    timestampElement.innerText = date;

    const descriptionElement = document.createElement("p");
    descriptionElement.setAttribute("class", "des");
    descriptionElement.innerText = post.description;

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click", () => {

      document.querySelector("#edit-title").value = post.title;
      document.querySelector("#edit-description").value = post.description;

     
      editBlogModal.style.display = "block";
      editTimestamp = post.timestamp;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
     
      blogPosts = blogPosts.filter((p) => p.timestamp !== post.timestamp);

     
      displayBlogPosts();
    });


    postElement.appendChild(titleElement);

    postElement.appendChild(descriptionElement);
    postElement.appendChild(editBtn);
    postElement.appendChild(deleteBtn);
    postElement.appendChild(timestampElement);

    blogContainer.appendChild(postElement);
  });
}


function handleCreateBlogForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const timestamp = Date.now();
  const post = {
    title: formData.get("title"),
    description: formData.get("description"),
    timestamp: timestamp,
  };

 
  blogPosts.push(post);
  displayBlogPosts();

  
  createBlogForm.reset();
  createBlogModal.style.display = "none";
}

function handleEditBlogForm(event) {
  event.preventDefault();


  const formData = new FormData(event.target);
  const timestamp = Date.now();
  blogPosts = blogPosts.map((post) => {
    if (post.timestamp === editTimestamp) {
      return {
        title: formData.get("edit-title"),
        description: formData.get("edit-description"),
        timestamp: post.timestamp,
      };
    } else {
      return post;
    }
  });

  displayBlogPosts();
  editBlogModal.style.display = "none";
}

createBlogBtn.addEventListener("click", () => {
  createBlogModal.style.display = "block";
});

closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    createBlogModal.style.display = "none";
    editBlogModal.style.display = "none";
  });
});


cancelPost.addEventListener("click", () => {
  createBlogModal.style.display = "none";
  editBlogModal.style.display = "none";
});


createBlogModal.addEventListener("click", (event) => {
  if (event.target === createBlogModal) {
    createBlogModal.style.display = "none";
  }
});

editBlogModal.addEventListener("click", (event) => {
  if (event.target === editBlogModal) {
    editBlogModal.style.display = "none";
  }
});


createBlogForm.addEventListener("submit", handleCreateBlogForm);


editBlogForm.addEventListener("submit", handleEditBlogForm);

displayBlogPosts();
