import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { themes } from 'types/ETheme'
import styles from './Header.module.scss'

interface Props {
  theme: themes
}

export const Header: FC<Props> = React.memo(({ theme }: Props) => {
  const { t } = useTranslation()
  return (
    <header
      className={`${styles.header} ${theme === themes.dark ? styles.dark : ''}`}
    >
      <nav>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={'/'}
        >
          {t('nav.calendar')}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : '')}
          to={'/all-todos'}
        >
          {t('nav.todos')}
        </NavLink>
      </nav>
    </header>
  )
})

Header.displayName = 'Header'
