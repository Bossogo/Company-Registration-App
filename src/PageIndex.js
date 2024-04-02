import { useEffect, useState } from "react"

const PageIndex = ({index}) => {
  const [currPage, setCurrPage] = useState(index)

  useEffect(() => {
    setCurrPage(index+1)
  }, [index])
  
  return (
    <div className="page-index me-5">   
      <button className={currPage === 1? "active": null} type="button">1</button>
      <div className="line"></div>
      <button className={currPage === 2? "active": null}>2</button>
      <div className="line"></div>
      <button className={currPage === 3? "active": null}>3</button>
      <div className="line"></div>
      <button className={currPage === 4? "active": null}>4</button>
      
    </div>
  )
}
export default PageIndex