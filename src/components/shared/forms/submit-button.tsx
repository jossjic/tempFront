import classNames from "classnames";

interface Props {
    title: string;
    bg?: string;
    size?: string;
    onClick?: () => void;
}

const SubmitButton = ({ title, bg = "bg-gradient-to-b from-black to-[rgba(0,0,0,0.4)]", size, onClick = undefined }: Props) => {
  
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
          "h-[40px] rounded-full text-white text-[12px] md:text-[18px] cursor-pointer font-bold tracking-[0.05rem] hover:opacity-[0.9] px-6":
           true,
         "": true,
          [`${bg}`]: true,
          [`${size}`]: true,
        })}
        onClick={handleClick} // Bind the handleClick function to the onClick event
      />
    );
  };


export default SubmitButton;