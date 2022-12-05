import Management from 'components/Management/Management'
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
      <Management />
    </>
  )
}

export default Main
