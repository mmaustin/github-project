

const profileInfo = document.querySelector('.overview');
const repoList = document.querySelector('.repo-list');
const selectRepo = document.querySelector('.repos');
const displayRepoData = document.querySelector('.repo-data');

const username = 'mmaustin';


const gitInfo = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
  //console.log(data);
  displayGitInfo(data);
};

const displayGitInfo = function (data) {
  const gitDataDiv = document.createElement('div');
  gitDataDiv.classList.add('user-info');
  gitDataDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `
  profileInfo.append(gitDataDiv);
  fetchRepos();
};

gitInfo();

const fetchRepos = async function () {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const data = await response.json();
  displayRepoName(data);
};

const displayRepoName = function (repos) {
  for (let repo of repos) {
    const singleRepo = document.createElement("li");
    singleRepo.classList.add("repo");
    singleRepo.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(singleRepo);
  }
};

repoList.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.matches('h3')) {
    let repoName = e.target.innerText;
    repoListInfo(repoName);
  };
});

const repoListInfo = async function (repoName) {
  const repoInformation = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const dataInfo = await repoInformation.json();

  const fetchLanguages = await fetch(dataInfo.languages_url);
  const languageData = await fetchLanguages.json();

  const languages = [];
  for (let language in languageData) {
    languages.push(language);
  };
  repoStats(dataInfo, languages);
};

const repoStats = function (repoInfo, languages) {
  displayRepoData.innerHTML = "";
  displayRepoData.classList.remove("hide");
  selectRepo.classList.add("hide");
  const div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
  `;
  displayRepoData.append(div);
};