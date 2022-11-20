import React, { FC, useState, ReactComponentElement } from 'react'
import styles from './ManagementPanel.module.scss'
import * as flags from '../../assets/img/flags/index'
import { useTranslation } from 'react-i18next'

interface ILanguage {
  path: string
  text: string
}
console.log(flags)

const FLAGS: ILanguage[] = [
  { path: flags.ru, text: 'ru' },
  { path: flags.en, text: 'en' },
]

const ManagementPanel: FC = () => {
  const { i18n } = useTranslation()
  const [selectedLanguage, setSelectedLanguage] = useState<ILanguage>(
    FLAGS.find((f) => f.text === i18n.language) as ILanguage
  )
  const [languageIsChanging, setLanguageIsChanging] = useState<boolean>(false)

  const changeLanguageHandler = (flag: ILanguage) => {
    if (selectedLanguage !== flag) {
      setSelectedLanguage(FLAGS.find((f) => f.text === flag.text) as ILanguage)
      i18n.changeLanguage(flag.text)
    }
    setLanguageIsChanging(false)
  }

  return (
    <div className={styles.managementPanel}>
      <div className={styles.panelItem}>
        <img
          onClick={() => {
            setLanguageIsChanging(prev => !prev)
          }}
          className={styles.selectedItem}
          src={selectedLanguage.path}
        ></img>
        <ul
          className={`${styles.select}${
            languageIsChanging ? ' ' + styles.active : ''
          }`}
        >
          {languageIsChanging && FLAGS.map((flag) => (
            <img
              onClick={() => {
                changeLanguageHandler(flag)
              }}
              key={flag.text}
              src={flag.path}
              className={styles.selectItem}
            ></img>
          ))}
        </ul>
      </div>
      {/* <div className={styles.panelItem}></div> */}
    </div>
  )
}

export default ManagementPanel
