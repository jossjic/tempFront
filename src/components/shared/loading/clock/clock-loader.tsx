import { use, useEffect, useState } from 'react';
import styles from './clock.module.css';
import XIcon from "@public/image/x.svg";
import classNames from 'classnames';
import { useUIStateManagerContext } from '@lib/utils/use-ui-state-manager';

type Props = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const Clock = ({ setLoading }: Props) => {

    const [cancellable, setCancellable] = useState<boolean>(false);
    const { drawerOpen } = useUIStateManagerContext();

    useEffect(() => {
        setTimeout(() => {
            setCancellable(true);
        }, 30 * 1000);
    }, [])


    useEffect(() => {
        const disableScroll = (e: any) => {
            e.preventDefault();
        };

        const enableScroll = () => {
            window.removeEventListener('wheel', disableScroll);
            window.removeEventListener('touchmove', disableScroll);
        };

        // Disable scrolling while loading
        window.addEventListener('wheel', disableScroll, { passive: false });
        window.addEventListener('touchmove', disableScroll, { passive: false });

        return () => {
            // Clean up event listeners when the component unmounts
            enableScroll();
        };
    }, []);

    return (
        <div className='fixed left-0 top-0 right-0 bottom-0 z-[99] flex justify-center'>
            <div className='fixed left-0 top-0 right-0 bottom-0 bg-[#00000044] z-[1]'>
                {cancellable && (
                    <div className='flex flex-row justify-end h-full text-white'>
                        <button className='p-2 self-start' onClick={() => setLoading(false)}>
                            <XIcon className='' style={{ strokeWidth: 4 }} />
                        </button>
                    </div>
                )}
            </div>

            <div className={classNames({
                "overflow-hidden bg-black rounded-full p-2 w-min self-center z-[2] scale-[0.8] lg:scale-100 ": true,
                // "ml-[16rem]": drawerOpen,
                // "ml-[80px]": !drawerOpen,
            })}>
                <div className={classNames({
                    "w-[200px] h-[200px] self-center flex items-center justify-center": true,
                })}>
                    <div className={styles.clock}>
                        <div className={styles.pointers}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Clock;