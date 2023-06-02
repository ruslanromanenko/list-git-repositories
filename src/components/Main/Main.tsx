import { useEffect, useMemo, useState } from "react";
import { RepositoriesList } from "../RepositoriesList";
import { SearchInput } from "../SearchInput";
import classes from "./Main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { Paginations } from "../Paginations";
import { fetchRepositoriesAsync } from "../../store/operations";
import { selectRepositories } from "../../store/selectors";
import useDebounce from "../../custom-hooks/useDebounce";
import { createPages } from "../../utils";

export const Main = () => {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("react");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const PER_PAGE: number = 3;
  const DELAY = 1000;

  const { repositoriesData, totalCount } = useSelector(selectRepositories);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const keywordWithDebounce = useDebounce(keyword, DELAY);
  const currentPageWithDebounce = useDebounce(currentPage, DELAY);

  const maxPage: number = useMemo(
    () => Math.ceil(totalCount / PER_PAGE),
    [totalCount, PER_PAGE]
  );

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    if (keywordWithDebounce) {
      dispatch(
        fetchRepositoriesAsync({
          keywordWithDebounce,
          currentPageWithDebounce,
          perPage: PER_PAGE,
        })
      );
    }
    if (maxPage && currentPageWithDebounce) {
      setPages(createPages(maxPage, currentPageWithDebounce));
    }
  }, [keywordWithDebounce, currentPageWithDebounce, dispatch, maxPage]);

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
          pages={pages}
          activePage={currentPage}
          onClickPrevPage={handlePrevPage}
          onClickNextPage={handleNextPage}
          onClickActivePage={handleActivePage}
          repositories={repositoriesData}
        />
      </div>
    </main>
  );
};
