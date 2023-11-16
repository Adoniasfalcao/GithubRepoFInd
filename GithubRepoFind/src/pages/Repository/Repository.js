import React, { useEffect, useState } from "react";
import Loading from "../../utils/Loading";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import RepositoryInfo from "./RepositoryInfo";

export default function Repository() {
  const [repos, setRepos] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { repository } = useParams();

  async function getRepositoryInfo() {
    const [repo, issues] = await Promise.all([
      api.get(`/repos/${repository}`),
      api.get(`/repos/${repository}/issues`, {
        params: {
          state: "open",
          per_page: 5,
        },
      }),
    ]);

    setLoading(false);
    setRepos(repo.data);
    setIssues(issues.data);
  }

  useEffect(() => {
    getRepositoryInfo();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <RepositoryInfo
          name={repos.name}
          OwnerImg={repos.owner.avatar_url}
          description={repos.description}
          ownerLogin={repos.owner.login}
        />
      )}
    </>
  );
}
