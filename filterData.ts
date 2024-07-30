export const filterData = <T extends object>(
  data: T[],
  filters: { [key: string]: string }
): T[] => {
  return data.filter((item) => {
    return Object.keys(filters).every((key) => {
      const filterValue = filters[key]
      if (!filterValue) {
        return true
      }
      return item[key as keyof T] === filterValue
    })
  })
}
