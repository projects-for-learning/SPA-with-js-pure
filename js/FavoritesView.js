import { Favorites } from "./favorites.js";

// Classe que vai criar a visualização e eventos no HTML
export class FavoritesView extends Favorites {
  constructor(root) {
    super(root);

    this.update();
    this.onadd();
  }

  onadd() {
    const addButton = document.querySelector(".search button");
    addButton.onclick = () => {
      const { value } = this.root.querySelector(".search input");

      this.add(value);
    };
  }

  update() {
    this.removeAllTr();

    this.entries.forEach((user) => {
      const row = this.createRow();

      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;

      row.querySelector(".user img").alt = `Imagen de ${user.login}`;
      row.querySelector(".user a").href = `https://github.com/${user.login}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar esta linha?");

        if (isOk) {
          this.delete(user);
        }
      };

      this.tbody.append(row);
    });
  }

  createRow() {
    const tr = document.createElement("tr");

    tr.innerHTML = `
          <td class="user">
              <img src="https://github.com/henriquePereiraa.png" alt="" />
              <a href="https://github.com/henriquePereiraa" target="_blank"
                  ><p>Henrique</p>
                  <span>HenriquePereiraa</span></a
              >
          </td>
          <td class="repositories">80</td>
          <td class="followers">40</td>
          <td><button class="remove">&times;</button></td>
      `;

    return tr;
  }

  removeAllTr() {
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
