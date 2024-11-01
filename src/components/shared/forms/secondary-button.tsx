import classNames from "classnames";

interface Props {
    title: string;
    bg?: string;
    size?: string;
    onClick?: () => void;
}

const SecondaryButton = ({ title, bg = "bg-primary", size, onClick = undefined }: Props) => {
  
  const button_type = typeof onClick === "undefined" ? "submit" : "button";
  
  const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    return (
      <input
        type={button_type}
        value={title}
        className={classNames({
          'h-[40px]  text-[12px] md:text-[16px] cursor-pointer tracking-[0.05rem] hover:opacity-[0.9] px-2 md:px-6 border-2 rounded-full border-[#000000]': true,
          [`${bg}`]: true,
          [`${size}`]: true,
        })}
        onClick={handleClick} // Bind the handleClick function to the onClick event
      />
    );
  };


export default SecondaryButton;