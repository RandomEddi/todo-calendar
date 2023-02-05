import { themes } from 'types'
import React, { FC } from 'react'
import { ManagementPanel, Header } from 'components'
import { useAppSelector } from 'hooks'

interface Props {
  children: React.ReactNode
}

export const Layout: FC<Props> = React.memo(({ children }: Props) => {
  const theme = useAppSelector((state) => state.theme.theme)
  return (
    <>
      <Header theme={theme} />
      <main className={`main ${theme === themes.dark ? ' black-theme' : ''}`}>
        {children}
      </main>
      <ManagementPanel />
    </>
  )
})

Layout.displayName = 'Layout'
