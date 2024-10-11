import classNames from "classnames";

type Props = {
  loading?: boolean;
  containerClass?: string;
  altStyle?: string;
};

const LoadingSpinner = ({
  loading = true,
  containerClass = `flex flex-col flex-1 w-full content-center items-center`,
  altStyle = `border-primary border-[4px]`,
}: Props) => {
  // if (!loading) {
  //   return null;
  // }
  return (
    <div className={classNames({
      'hidden': !loading,
      [containerClass]: true,
    })}>
      <div id="html-spinner"
        className={altStyle}></div>
    </div>
  );
};

export default LoadingSpinner;
