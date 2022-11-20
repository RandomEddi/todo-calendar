import ManagementPanel from 'components/ManagementPanel/ManagementPanel'
import React, { FC } from 'react'
import Header from '../Header/Header'

type Props = {
  children: React.ReactNode
}

const Main: FC<Props> = ({ children }) => {
  return (
    <>
      <Header/>
      <main className='main'>{children}</main>
      <ManagementPanel />
    </>
  )
}

export default Main
