import { useNavigate } from 'react-router-dom'
import { shortCountryMap } from '../../config/constants'
import { capitalize } from '../../utils/stringManipulation'
import './breadcrumbNavigation.css'

interface BreadcrumbNavigationPath {
  pathArray: string[]
  mapCountries: { [key: string]: string }
}

function BreadcrumbNavigation () {
  const navigate = useNavigate()
  const pathTitle = window.location.pathname.split('/') ?? ''

  const parsedPathTitle = ({
    pathArray,
    mapCountries
  }: BreadcrumbNavigationPath) => {
    const mapValues = Object.values(mapCountries)
    const removeEmptyValues = pathArray.filter((item) => item !== '')
    const filteredValues = removeEmptyValues.filter(
      (item) => !mapValues.includes(item)
    )
    return filteredValues.map((item) => item.replace(/-/g, ' '))
  }

  return (
    <>
      {pathTitle.length > 0 && (
        <section className='breadcrumb__container'>
          {parsedPathTitle({
            pathArray: pathTitle,
            mapCountries: shortCountryMap
          }).map((item, index) => (
            <span key={index}>
              <span
                onClick={() => navigate(index - 1)}
                className='breadcrumb__text small-text-bold'
              >
                {capitalize(item)}
              </span>
            </span>
          ))}
        </section>
      )}
    </>
  )
}

export default BreadcrumbNavigation
