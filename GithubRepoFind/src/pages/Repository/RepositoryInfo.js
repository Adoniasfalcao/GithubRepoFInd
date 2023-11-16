import React from "react";
import { Link } from "react-router-dom";
import styles from "./RepositoryInfo.module.css";

export default function RepositoryInfo({
  name,
  description,
  OwnerImg,
  ownerLogin,
}) {
  return (
    <div className={styles.Container}>
      <header className={styles.Owner}>
        <Link to="/">Voltar aos repositórios</Link>
        <img src={OwnerImg} alt={ownerLogin} />
        <h1>{name}</h1>
        <p>{description}</p>
      </header>
    </div>
  );
}
