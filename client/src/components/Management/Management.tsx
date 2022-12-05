import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'hooks'
import { themeActions } from 'store/slices/theme-slice'
import { useTranslation } from 'react-i18next'
import { isThemeType, themes } from 'types'
import * as svgs from '../../assets/img/index'
import styles from './Management.module.scss'
import Cookie from 'js-cookie'
import Cookies from 'js-cookie'

interface ILanguage {
  path: string
  text: string
}

interface ITheme {
  path: string
  text: themes
}

const FLAGS: ILanguage[] = [
  { path: svgs.ru, text: 'ru' },
  { path: svgs.en, text: 'en' },
]

const THEMES: ITheme[] = [
  { path: svgs.moon, text: themes.dark },
  { path: svgs.sun, text: themes.white },
]

const ManagementPanel: FC = () => {
  const dispatch = useAppDispatch()
  const { i18n } = useTranslation()
  const selectedTheme = useAppSelector((state) => state.theme.theme)
  const [themeIsChanging, setThemeIsChanging] = useState<boolean>(false)

  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(
    FLAGS.find((f) => f.text === i18n.language) as ILanguage
  )
  const [languageIsChanging, setLanguageIsChanging] = useState<boolean>(false)

  useEffect(() => {
    if (
      localStorage.getItem('theme') &&
      selectedTheme !== localStorage.getItem('theme')
    ) {
      const thm = localStorage.getItem('theme')
      if (thm && isThemeType(thm)) {
        dispatch(themeActions.changeTheme(thm))
      }
    }
    if (Cookie.get('i18next') !== selectedLanguage.text) {
      const lng = FLAGS.find((f) => f.text === Cookie.get('i18next'))
      if (lng) {
        setSelectedLanguage(lng)
      }
    }
  }, [])

  const changeLanguageHandler = (flag: ILanguage) => {
    if (selectedLanguage !== flag) {
      setSelectedLanguage(FLAGS.find((f) => f.text === flag.text) as ILanguage)
      i18n.changeLanguage(flag.text)
      Cookies.set('i18next', flag.text)
    }
    setLanguageIsChanging(false)
  }

  const changeThemeHandler = (theme: ITheme) => {
    if (selectedTheme !== theme.text) {
      dispatch(themeActions.changeTheme(theme.text))
      localStorage.setItem('theme', theme.text)
    }
    setThemeIsChanging(false)
  }

  const currentTheme: ITheme = THEMES.find(
    (t) => selectedTheme === t.text
  ) as ITheme

  return (
    <div className={styles.managementPanel}>
      <div className={styles.panelItem}>
        <button
          onClick={() => {
            setLanguageIsChanging((prev) => !prev)
          }}
          className={styles.selectedItem}
        >
          <img src={selectedLanguage.path}></img>
        </button>
        <ul
          className={`${styles.select}${languageIsChanging ? ' ' + styles.active : ''}`}
        >
          {languageIsChanging &&
            FLAGS.map((flag) => (
              <button
                key={flag.text}
                onClick={() => {
                  changeLanguageHandler(flag)
                }}
                className={styles.selectItem}
              >
                <img src={flag.path}></img>
              </button>
            ))}
        </ul>
      </div>
      <div className={styles.panelItem}>
        <button
          onClick={() => {
            setThemeIsChanging((prev) => !prev)
          }}
          className={styles.selectedItem}
        >
          <img src={currentTheme?.path}></img>
        </button>
        <ul
          className={`${styles.select}${themeIsChanging ? ' ' + styles.active : ''}`}
        >
          {themeIsChanging &&
            THEMES.map((theme) => (
              <button
                key={theme.text}
                onClick={() => {
                  changeThemeHandler(theme)
                }}
                className={styles.selectItem}
              >
                <img src={theme.path}></img>
              </button>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default React.memo(ManagementPanel)
