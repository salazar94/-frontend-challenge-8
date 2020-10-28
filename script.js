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


function setJob({ languages, logo, featured, tools, company, level, isNew, postedAt, contract, location, role }) {
    return `
     <div class="card ${featured ? 'feature' : ''}">
    <div class="card-body">
      <div class="card-body-logo">
        <img 
          class="card-body-logo__img"
          src="${logo}"
          alt="${company}"
        />
        <div class="header-title">
          <h3>${company}</h3>
          ${isNew ? '<span class="breadcrumb header-title__new">New!</span>' : ''}
          ${featured ? '<span class="breadcrumb header-title__feature">Feature</span>' : ''}
        </div>
      </div>
      <div class="card-body-container">
        <h2>Senior Frontend Developer</h2>
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


function paint(jobs) {
    cardSearch = document.querySelector('.parameters-filter');
    if (filters.size > 0) {
        cardSearch.classList.add('parameters-filter--active');
        cardSearch.classList.remove('parameters-filter--deactive');
    } else {
        filter = jobs;
        cardSearch.classList.remove('parameters-filter--active');
        cardSearch.classList.add('parameters-filter--deactive');
    }
    cardContainer.innerHTML = '';
    console.log(jobs);
    jobs.forEach(job => cardContainer.innerHTML += setJob(job));
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
    filter = filter.filter(job => filters.has(job.level));
    paint(filter)
}
function filterLanguages(item) {
    filters.add(item.dataset.language)
    filter = filter.filter(job => Boolean(job.languages.filter(language => filters.has(language)).length));
    paint(filter)
}
function filterTools(item) {
    filters.add(item.dataset.tools)
    console.log(item)
    filter = filter.filter(job => Boolean(job.tools.filter(tool => filters.has(tool)).length));
    paint(filter)
}

function removeFilter(item) {
    filters.delete(item.dataset.element);
    filter = filter.filter(x => Object.values(x).flatMap(xt => xt).includes(item.dataset.element))
    paint(filter)
    setSearch();
}

function removeCardSearch() {
    filters.clear();
    filter = jobs;
    paint(jobs);
}