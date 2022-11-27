import React, { FC, useState } from 'react'
import styles from './Management.module.scss'
import * as svgs from '../../assets/img/index'
import { useTranslation } from 'react-i18next'
import { themes } from 'types/ETheme'

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
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(
    FLAGS.find((f) => f.text === i18n.language) as ILanguage
  )
  const [selectedTheme, setSelectedTheme] = useState<ITheme>(
    THEMES.find((t) => {
      return t.text === localStorage.getItem('theme')
        ? localStorage.getItem('theme')
        : themes.white
    }) as ITheme
  )

  const [languageIsChanging, setLanguageIsChanging] = useState<boolean>(false)
  const [themeIsChanging, setThemeIsChanging] = useState<boolean>(false)

  const changeLanguageHandler = (flag: ILanguage) => {
    if (selectedLanguage !== flag) {
      setSelectedLanguage(FLAGS.find((f) => f.text === flag.text) as ILanguage)
      i18n.changeLanguage(flag.text)
    }
    setLanguageIsChanging(false)
  }

  const changeThemeHandler = (theme: ITheme) => {
    if (selectedTheme !== theme) {
      setSelectedTheme(THEMES.find((t) => t.text === theme.text) as ITheme)
      localStorage.setItem('theme', theme.text)
    }
    setThemeIsChanging(false)
  }

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
          className={`${styles.select}${
            languageIsChanging ? ' ' + styles.active : ''
          }`}
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
          <img src={selectedTheme.path}></img>
        </button>
        <ul
          className={`${styles.select}${
            themeIsChanging ? ' ' + styles.active : ''
          }`}
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

export default ManagementPanel
