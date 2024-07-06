

const profileInfo = document.querySelector('.overview');



const username = 'mmaustin';


const gitInfo = async function () {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();
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

};

gitInfo();