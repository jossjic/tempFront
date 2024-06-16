
import classNames from "classnames";
import { FC, ReactNode } from "react";


type Props = {
    id?: string;
    children?: ReactNode;
    className?: string;
    gray?: boolean;
};


const MinimumPageContainer: FC<Props> = ({ id, children, className, gray }) => {
    return (
        <div id={id} className={classNames({
            "w-full max-h-full h-full min-h-screen flex flex-col": true,
            [`${className}`]: true && className,
            "bg-gray-page": gray == true,
            "bg-white": !gray,
        })} >
            <div className="h-full flex flex-col flex-1">
                {children}
            </div>
        </div >
    )
}


export default MinimumPageContainer;