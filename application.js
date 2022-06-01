const apikey =  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input");
const resultsDOM = document.querySelector(".results");

// console.log(resultsDOM);
formDOM.addEventListener("submit" , (e)=>{
  resultsDOM.innerHTML = `<div class="loading"></div>`;
  e.preventDefault();
  const value = inputDOM.value;
  // console.log(value);
  if(!value){
    resultsDOM.innerHTML = `<div class='error'>please enter valid search term</div>`;
    return;
  }
  else{
    fetchPages(value);
  }
});


const fetchPages = async (searchValue) => {
  resultsDOM.innerHTML = `<div class="loading"></div>`;

  try {
    const response = await fetch(`${apikey}${searchValue}`);
    const data = await response.json();
    // console.log(data);
    const results = data.query.search;
    if (results.length < 1) {
      resultsDOM.innerHTML = `<div class='error'>no matching results. Please try again.</div>`;
      return;
    }
    else{
    renderResults(results);
    }
  } catch (error) {
    console.log(error);
    resultsDOM.innerHTML = `<div class='error'>there was an error...</div>`;
    return;
  }
};


const renderResults = (Datalist)=>{
  const listBox = Datalist.map((box)=>{
    const {title, snippet,pageid} = box;
    return `<a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
                 <h4>${title}</h4>
                 <p>
                   ${snippet}
                 </p>
               </a>`;
  });

  resultsDOM.innerHTML = `<div class="articles">
             ${listBox}
            </div>
            </div>`;
};