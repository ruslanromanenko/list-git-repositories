import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectRepositories,
  fetchRepositoriesAsync,
} from "../../store/repositoriesSlice";
import { RepositoryItem } from "../RepositoryItem";
import classes from "./RepositoriesList.module.scss";

export const RepositoriesList: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error, activePage, perPage } =
    useSelector(selectRepositories);

  useEffect(() => {
    dispatch(fetchRepositoriesAsync());
  }, [dispatch, activePage, perPage]);

  return (
    <>
      {loading ? (
        <div>Завантаження...</div>
      ) : error ? (
        <div>Помилка: {error}</div>
      ) : (
        <>
          <div className={classes.repositoriesListWrap}>
            {data.map((repository) => (
              <RepositoryItem key={repository.id} repository={repository} />
            ))}
          </div>

          {data.length === 0 && (
            <div>По Вашому запиту не знайдено жодного репозиторія</div>
          )}
        </>
      )}
    </>
  );
};
