let jobs;
let cardContainer;
let cardSearch;
let filter;
let filters = new Set();
let parameterFilter;
async function getJobs() {
  const response = await fetch('data.json');
  jobs = await response.json();
  jobs.forEach(job => {
    job['isNew'] = job['new']
  });
}


function setJob({ languages, logo, position, featured, tools, company, level, isNew, postedAt, contract, location, role }) {
  return `
     <div class="card ${featured ? 'feature' : ''}">
    <div class="card-body">
      <div class="card-body-logo">
        <img 
          class="card-body-logo__img"
          src="${logo}"
          alt="${company}"
        />
      
      </div>
      <div class="card-body-container">
       <div class="card-body-container__header-title">
          <h3>${company}</h3>
          ${isNew ? '<span class="breadcrumb header-title__new">New!</span>' : ''}
          ${featured ? '<span class="breadcrumb header-title__feature">Feature</span>' : ''}
        </div>
        <h2 class="card-body-container__title">${position}</h2>
        <div class="card-body-container__contract">
          <p>${postedAt}</p>
          <p>•</p>
          <p>${contract}</p>
          <p>•</p>
          <p>${location}</p>
        </div>
      </div>
      <div class="card-body-tags">        
        <button class="btn" data-role="${role}" onclick="filterRole(this)">${role}</button>      
        <button class="btn" data-level="${level}"  onclick="filterLevel(this)">${level}</button>      
        ${setTools(tools)}
        ${setLanguages(languages)}
      </div>
    </div>
  </div>`;
}

function setTools(tools) {
  let badge = '';
  tools.forEach(tool => {
    badge += `<button class="btn" data-tools="${tool}" onclick="filterTools(this)">${tool}</button>`;
  });
  return badge;
}

function setLanguages(languages) {
  let badge = '';
  languages.forEach(language => {
    badge += `<button class="btn" data-language="${language}" onclick="filterLanguages(this)">${language}</button>`;
  });
  return badge;
}


function paint(jobss) {
  cardSearch = document.querySelector('.parameters-filter');
  if (filters.size > 0) {
    cardSearch.classList.add('parameters-filter--active');
    cardSearch.classList.remove('parameters-filter--deactive');
  } else {
    filter = jobs;
    jobss = jobs;
    cardSearch.classList.remove('parameters-filter--active');
    cardSearch.classList.add('parameters-filter--deactive');
  }
  cardContainer.innerHTML = '';
  console.log(jobs);
  jobss.forEach(job => cardContainer.innerHTML += setJob(job));
  setSearch();

}

function paintSearchParameters(filter) {
  return `<div class="search-parameter">
    <p class="search-parameter__title"><span>${filter}</span></p>
    <button class="search-parameter__button" data-element="${filter}" onclick="removeFilter(this)">X</button>
  </div> `;
}

function setSearch() {
  parameterFilter = document.querySelector('.parameter-filter__right');
  parameterFilter.innerHTML = '';
  filters.forEach(filter =>
    parameterFilter.innerHTML += paintSearchParameters(filter));
}

window.onload = async () => {
  cardContainer = document.querySelector('.card-container');
  await getJobs();
  Object.freeze(jobs);
  filter = jobs;
  paint(jobs);
}


function filterRole(item) {
  filters.add(item.dataset.role)
  console.log(filters, 'asdf')
  filter = filter.filter(job => filters.has(job.role));
  paint(filter)
}
function filterLevel(item) {
  filters.add(item.dataset.level)  
  filter = [];
  let afilter = jobs.map(x => Object.values(x).flatMap(xt => xt));
  let count = 0;
  afilter.forEach((fi,i) => {
    filters.forEach(x => fi.includes(x) ? count++ : 0);
    count == filters.size ? filter.push(jobs[i]) : null;
    count = 0
  })
  paint(filter)
}
function filterLanguages(item) {


  filters.add(item.dataset.language)  
  filter = [];
  let afilter = jobs.map(x => Object.values(x).flatMap(xt => xt));

  let count = 0;
  afilter.forEach((fi,i) => {
    filters.forEach(x => fi.includes(x) ? count++ : 0);
    count == filters.size ? filter.push(jobs[i]) : null;
    count = 0
  })

  paint(filter);
}
function filterTools(item) {
  filters.add(item.dataset.tools)
  let sx = 0;
  filter = [];
  let afilter = jobs.map(x => Object.values(x).flatMap(xt => xt));
  let count = 0;
  afilter.forEach((fi,i) => {
    filters.forEach(x => fi.includes(x) ? count++ : 0);
    count == filters.size ? filter.push(jobs[i]) : null;
    count = 0
  })
  paint(filter);
}

function removeFilter(item) {
  filters.delete(item.dataset.element);
  filter = [];
  let afilter = jobs.map(x => Object.values(x).flatMap(xt => xt));
  let count = 0;
  afilter.forEach((fi,i) => {
    filters.forEach(x => fi.includes(x) ? count++ : 0);
    count == filters.size ? filter.push(jobs[i]) : null;
    count = 0
  })
  paint(filter)
  setSearch();
}

function removeCardSearch() {
  filters.clear();
  filter = jobs;
  paint(jobs);
}