import { GithubUser } from "./GithubUser.js";

/**
 * CLasse que vai conter a lógica dos dados, como os dados
 * serão apresentados
 */
export class Favorites {
  constructor(root) {
    this.root = document.querySelector(root);
    this.tbody = document.querySelector("table tbody");
    this.load();
  }

  load() {
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  save() {
    localStorage.setItem("@github-favorites:", JSON.stringify(this.entries));
  }

  async add(userName) {
    try {
      const isUserAlreadyExist = !!this.entries.find(
        (entry) => entry.login === userName
      );

      if (isUserAlreadyExist) {
        alert("The user has already been added");
        return;
      }

      const user = await GithubUser.search(userName);

      if (user.login === undefined) {
        throw new Error("User not found!");
      }

      this.entries = [user, ...this.entries];
      this.update();
      this.save();
    } catch (error) {
      alert(error.message);
    }
  }

  delete(user) {
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );

    this.entries = filteredEntries;
    this.update();
    this.save();
  }
}
