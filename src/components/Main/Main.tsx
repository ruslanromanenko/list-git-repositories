import { useEffect, useMemo, useState } from "react";
import { RepositoriesList } from "../RepositoriesList";
import { SearchInput } from "../SearchInput";
import classes from "./Main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Paginations } from "../Paginations";
import { fetchRepositoriesAsync } from "../../store/operations";
import { selectRepositories } from "../../store/selectors";

export const Main = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("react");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PER_PAGE: number = 3;

  const { repositoriesData, totalCount } = useSelector(selectRepositories);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const maxPage: number = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount, PER_PAGE]
  );

  useEffect(() => {
    if (keyword) {
      const timeoutId = setTimeout(() => {
        dispatch(
          fetchRepositoriesAsync({ keyword, currentPage, perPage: PER_PAGE })
        );
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [keyword, currentPage, dispatch]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleActivePage = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    setCurrentPage(Number(e.currentTarget.textContent));
  };

  return (
    <main>
      <div className={classes.container}>
        <SearchInput keyword={keyword} onKeywordChange={handleKeywordChange} />
        <RepositoriesList />
        <Paginations
          activePage={currentPage}
          maxPage={maxPage}
          onClickPrevPage={handlePrevPage}
          onClickNextPage={handleNextPage}
          onClickActivePage={handleActivePage}
          repositories={repositoriesData}
        />
      </div>
    </main>
  );
};
