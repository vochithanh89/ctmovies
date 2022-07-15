import styles from './SettingsModal.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import useModal from '@/hooks/useModal';

import { IoIosArrowBack, IoIosHelpCircle } from 'react-icons/io';
import { IoEarthSharp } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { languages } from '../constants/constants';
import { settingsSelector } from '../redux/selectors';
import Modal from '../shared/Modal/Modal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { settingsSlice } from '../redux/settingsSlice';
import clsx from 'clsx';
import { setLanguageLocal, setThemeLocal } from '@/utils/settingsLocal';

function SettingsModal({ children, className }) {
    const settingsBtnRef = useRef();
    const menuRef = useRef();

    const { language, theme } = useSelector(settingsSelector);

    const dispatch = useDispatch();
    const { isOpen, toggle } = useModal();

    useEffect(() => {
        const settingsBtnEl = settingsBtnRef.current;
        const menuEl = menuRef.current;

        const { x, width } = settingsBtnEl.getBoundingClientRect();
        menuEl.style = `left: ${x + width}px;`;
    }, []);

    const menuItems = useMemo(() => {
        return [
            {
                icon: <IoEarthSharp />,
                label: languages.find((item) => item.value === language).label,
                children: {
                    title: 'Language',
                    data: languages,
                },
            },
            {
                icon: theme === 'dark' ? <MdDarkMode /> : <MdLightMode />,
                label: `Theme: ${theme === 'dark' ? 'Dark' : 'Light'}`,
                value: theme === 'dark' ? 'light' : 'dark',
                action: 'themeChange',
            },
            {
                icon: <IoIosHelpCircle />,
                label: 'Help and support',
            },
        ];
    }, [language, theme]);

    //handle history
    useEffect(() => {
        setLanguageLocal(language);
        setThemeLocal(theme);
    }, [language, theme]);

    useEffect(() => {
        setHistoryItem([{ data: menuItems }]);
    }, [menuItems]);

    const [historyItem, setHistoryItem] = useState([{ data: menuItems }]);
    const currentItem = historyItem[historyItem.length - 1];

    const handleMenuItem = (item) => {
        if (item.children) {
            setHistoryItem((pre) => [...pre, item.children]);
        } else if (item.action) {
            dispatch(settingsSlice.actions[item.action](item.value));
        }
    };

    const handleBackMenu = () => {
        setHistoryItem((pre) => [...pre].slice(0, pre.length - 1));
    };

    return (
        <div className={styles.settings}>
            <button onClick={toggle} ref={settingsBtnRef} className={className}>
                {children}
            </button>
            <Modal isOpen={isOpen} toggle={toggle}>
                <div className={styles.menu} ref={menuRef}>
                    {currentItem.title && (
                        <div className={styles.menuHeader}>
                            <h2 className={styles.menuTitle}>{currentItem.title}</h2>
                            <button onClick={handleBackMenu} className={styles.backBtn}>
                                <IoIosArrowBack />
                            </button>
                        </div>
                    )}
                    <div className={styles.menuList}>
                        {currentItem.data.map((item, index) => {
                            return (
                                <button
                                    onClick={() => handleMenuItem(item)}
                                    key={index}
                                    className={clsx(styles.menuItem, {
                                        //hard code
                                        [styles.selected]: item.value === language,
                                    })}
                                >
                                    {item.icon}
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default SettingsModal;
