let jobs;
let cardContainer;
let filter;
let filters = new Set();
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
    cardContainer.innerHTML = '';
    jobs.forEach(job => cardContainer.innerHTML += setJob(job));
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
function filterLanguages(item) {
    filters.add(item.dataset.language)    
    filter = filter.filter(job => Boolean(job.languages.filter(language => filters.has(language)).length));
    paint(filter)
}