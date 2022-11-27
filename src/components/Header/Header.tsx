import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.scss'

const Header: FC = () => {
  const { t } = useTranslation()
  return (
    <header className={styles.header}>
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
}

export default Header
