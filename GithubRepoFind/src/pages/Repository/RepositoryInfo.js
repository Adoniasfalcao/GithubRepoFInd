import React from "react";
import { Link } from "react-router-dom";
import styles from "./RepositoryInfo.module.css";

export default function RepositoryInfo({
  name,
  description,
  OwnerImg,
  ownerLogin,
  issues,
}) {
  return (
    <div className={styles.Container}>
      <header className={styles.Owner}>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={OwnerImg} alt={ownerLogin} />
        <h1>{name}</h1>
        <p>{description}</p>
      </header>

      <ul className={styles.IssueList}>
        {issues.map((issue) => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />
            <div className={styles.info}>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
