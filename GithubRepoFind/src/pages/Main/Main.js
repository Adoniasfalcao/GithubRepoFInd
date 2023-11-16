import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";
import styles from "./Main.module.css";

export default class Main extends Component {
  state = {
    newRepository: "",
    repositories: [],
    loading: false,
    error: false,
  };

  //Carregar os dados do localStorage
  componentDidMount() {
    const repositories = localStorage.getItem("repositories");

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //Salvar os dados do localStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== this.state.repositories) {
      localStorage.setItem("repositories", JSON.stringify(repositories));
    }
  }
  //Alteração do input
  handleInputChange = (e) => {
    this.setState({ newRepository: e.target.value });
  };

  //Alteração do estado
  handleSubmit = async (e) => {
    e.preventDefault();
    const { newRepository, repositories } = this.state;

    //Verifica se o repositório já faz parte da lista
    const repositoryExists = repositories.some(
      (repo) => repo.name === newRepository
    );

    this.setState({ loading: true });

    try {
      const response = await api.get(`/repos/${newRepository}`);
      const data = {
        name: response.data.full_name,
      };

      if (repositoryExists) {
        throw new Error("Repositório já está na lista");
      }
  
      this.setState({
        repositories: [...repositories, data],
        newRepository: "",
        loading: false,
        error: false,
      });
      
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
      alert(`Não foi possível encontrar o repositório ${err}`);
    }
  };

  render() {
    const { repositories, newRepository, loading, error } = this.state;

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
            className={error ? styles.error : styles.input}
          />

          <button
            className={loading ? styles.disabled : styles.SubmitButton}
            type="submit"
          >
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </button>
        </form>

        <ul className={styles.listRepositories}>
          {repositories.map((repo) => (
            <li key={repo.name} className={styles.listItems}>
              <span>{repo.name}</span>
              <Link
                to={`/repository/${encodeURIComponent(repo.name)}`}
                className={styles.repoLink}
              >
                Detalhes
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
