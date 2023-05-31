import React from "react";
import { useSelector } from "react-redux";
import { RepositoryItem } from "../RepositoryItem";
import classes from "./RepositoriesList.module.scss";
import { Statuses } from "../../types/enums/Statuses";
import { selectRepositories } from "../../store/selectors";

export const RepositoriesList: React.FC<RepositoriesListProps> = () => {
  const { repositoriesData, status, error } = useSelector(selectRepositories);

  return (
    <>
      {status === Statuses.Loading && <div>Завантаження...</div>}
      {error && <div>Помилка: {error}</div>}
      {status === Statuses.Resolved && (
        <>
          <div className={classes.repositoriesListWrap}>
            {repositoriesData?.map((repository) => (
              <RepositoryItem key={repository.id} repository={repository} />
            ))}
          </div>
          {repositoriesData.length === 0 && (
            <div>По Вашому запиту не знайдено жодного репозиторія</div>
          )}
        </>
      )}
    </>
  );
};

type RepositoriesListProps = {};
