import classes from './PageContent.module.css';

function PageContent({ title, children }) {
  return (
    <div className={classes.content}>
      <div className={classes.card}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default PageContent;
