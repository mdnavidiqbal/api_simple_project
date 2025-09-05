console.log("I am here ");

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
};

const removeActive = () =>{
    const lessonButton = document.querySelectorAll(".lesson-btn");
    lessonButton.forEach(btn=> btn.classList.remove("active"));
};

const loadLevelWorld = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        })
}



// {
//     "id": 71,
//     "level": 1,
//     "word": "Apple",
//     "meaning": "আপেল",
//     "pronunciation": "অ্যাপল"
// }


const displayLevelWord = (words) => {
    // 1.get the container 
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
        wordContainer.innerHTML = `
         <div class="text-center col-span-full py-10 space-y-5  rounded-lg bangla_font">
         <img class ="mx-auto" src="./assets/alert-error.png">
         <p class="bangla_font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-3xl font-semibold mb-8">নেক্সট Lesson এ যান</h2>
       </div>        
        `;
        return;
    }
    // 2.Get the all elemen
    words.forEach(word => {
        console.log(word);
        // 3. create elements 
        const card = document.createElement("div");
        card.innerHTML = `
         <div class="bg-white rounded-xl shadow-sm text-center px-10 py-10 space-y-3">
            <h2 class="font-bold text-2xl">${word.word ? word.word : "No word found"}</h2>
            <p class="font-semibold">Meaning/Pronounciation</p>
            <div class="font-semibold text-2xl bangla_font">"${word.meaning ? word.meaning :"No word meaning found"} / ${word.pronunciation ? word.pronunciation:"No pronunciation found"}"</div>
            <div class="flex justify-between items-center">
                <button onclick="my_modal_1.showModal()" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;
        wordContainer.append(card);
    })
}

const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // 1. get the container 
    // 2. get into every lesson
    for (let lesson of lessons) {
        // 3.create element
        console.log(lesson);
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWorld(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open-reader"></i>Lesson-${lesson.level_no}</button>`;
        // 4.append 
        levelContainer.append(btnDiv);
    }

}

loadLessons();