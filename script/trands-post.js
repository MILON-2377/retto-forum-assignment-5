
const inputContainer = document.getElementById("input-container");
const postDisplayingContainer = document.getElementById("display-post-container");

let isOnclick;
const onclickAdd = () => {
    isOnclick = true;
    displayingPostBySearch();
}

const onclickAddToEnterBtn = () => {
    inputContainer.addEventListener("keyup", (e) => {
        if(e.key === "Enter"){
            isOnclick = true;
            displayingPostBySearch();
        }
    })
}

onclickAddToEnterBtn();

function displayingPostBySearch () {
    if(isOnclick){
        takeDataFromApi();
    }else{
        allPostDisplaying();
    }
}

displayingPostBySearch();

async function allPostDisplaying () {

    const res1 = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts");
    const res1Data = await res1.json();

    inputContainer.value= "";

    console.log(res1Data)
    const posts = res1Data.posts;
    posts.forEach( (item) => {
        isActive = item.isActive;
        displayPost(item?.image, item?.category, item?.author?.name, item?.title, item?.description, item?.comment_count, item?.view_count, item?.posted_time, item?.isActive);
    })
}

async function takeDataFromApi () {

    const inputVal = takeInputValue();
   
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${inputVal}`);
    const data = await res.json();

    inputContainer.value= "";
    postDisplayingContainer.textContent = "";
    const posts = data.posts;
    // console.log();
    posts.forEach( (item) => {
        // console.log(item.isActive)
        displayPost(item?.image, item?.category, item?.author?.name, item?.title, item?.description, item?.comment_count, item?.view_count, item?.posted_time, item?.isActive)
    })
}

function displayPost (authorImg, category, authorName, title, description, totalComments, viewCount, postTime, isActive) {
    const div = document.createElement("div");
    const red = "bg-red-600";
    const blue = "bg-blue-600";
    div.classList = `border-[1px] bg-slate-50 rounded-xl`
    div.innerHTML = `
    <div class="w-[15%] flex justify-center">
        <div class=" bg-[url('${authorImg}')] bg-cover bg-no-repeat bg-center btn w-[60px] h-[60px] mt-3">
            <button id="active-btn-container" class=" ${isActive? blue : red} w-4 h-4 rounded-full relative -top-6 left-6"></button>
        </div>
    </div>
    <div class="card-body flex-1 flex flex-col justify-between gap-6">
        <div class="flex flex-row  lg:items-center lg:w-[35%] md:w-[20%">
            <p class="text-[22px] font-bold">#${category} </p>
            <p class="text-[22px] font-medium"><span class="text-xl font-bold">Author:</span> ${authorName} </p>
        </div>
        <h2 class="text-[22px] text-black font-bold">Title: ${title} </h2>
        <p class="text-xl font-medium text-slate-600"> <span class="font-bold text-black"> Descriptiion: </span> ${description} </p>
        <hr class="border-dashed border-[1px] border-slate-300 w-full">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-6">
                <div class="flex items-center gap-3">
                    <i class="fa-regular fa-message lg:text-xl"></i>
                    <span> ${totalComments} </span>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fa-regular fa-eye lg:text-xl"></i>
                    <span>${viewCount} </span>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fa-regular fa-clock lg:text-xl"></i>
                    <p>
                        <span>${postTime} </span>
                        Min
                    </p>
                </div>
            </div>
            <div class="btn relative">         
                <i class="fa-solid fa-envelope lg:text-xl"></i>
            </div>
        </div>
    </div>
    `;
    postDisplayingContainer.appendChild(div);
}

function takeInputValue () {
    const inputValue = inputContainer.value;
    
    return inputValue;
}
