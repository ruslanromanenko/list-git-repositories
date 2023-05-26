import { FC } from "react";
import classes from "./SearchInput.module.scss";

export const SearchInput: FC<SearchInputProps> = ({
  keyword,
  onKeywordChange,
}) => {
  return (
    <input
      className={classes.searchInput}
      type="text"
      value={keyword}
      onChange={onKeywordChange}
      placeholder="Search"
    />
  );
};

type SearchInputProps = {
  keyword: string;
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
