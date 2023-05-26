import { FC } from "react";
import { IRepository } from "../../types/interfaces/IRepository";
import classes from "./RepositoryItem.module.scss";
import { StarIcon } from "../images/StarIcon";
import { HumanIcon } from "../images/HumanIcon";

export const RepositoryItem: FC<RepositoryItemProps> = ({
  repository: {
    id,
    name,
    language,
    description,
    owner: { avatar_url, login },
    stargazers_count,
    watchers_count,
  },
}) => {
  return (
    <div className={classes.repositoryItemWrap}>
      <img src={avatar_url} alt="avatar" className={classes.avatar} />
      <div className={classes.repositoryInfo}>
        <span className={classes.repositoryName}>{name}</span>
        <span className={classes.repositoryAuthor}>{login}</span>
        <span className={classes.repositoryLang}>{language}</span>
        <span className={classes.repositoryDescription}>{description}</span>
      </div>
      <div className={classes.repositoryStatistick}>
        <div className={classes.statistickRow}>
          <StarIcon />
          <span>{stargazers_count} stars</span>
        </div>
        <div className={classes.statistickRow}>
          <HumanIcon />
          <span>{watchers_count} watchers</span>
        </div>
      </div>
    </div>
  );
};

type RepositoryItemProps = {
  repository: IRepository;
};
