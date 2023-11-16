import React, { Component } from "react";
import { FaGithubAlt, FaPlus } from "react-icons/fa";
import styles from "./Main.module.css";

export default class Main extends Component {
  state = {
    newRepository: "",
  };

  //Alteração do input
  handleInputChange = (e) => {
    this.setState({ newRepository: e.target.value });
  };

  //Alteração do estado
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.newRepository);
  };

  render() {
    const { newRepository } = this.state;

    return (
      <div className={styles.Container}>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepository}
            onChange={this.handleInputChange}
          />

          <button className={styles.SubmitButton} type="submit">
            <FaPlus />
          </button>
        </form>
      </div>
    );
  }
}
