interface randomInterface {
  userName: string
  country: string
}


export const getUserData = async (
  url: string
): Promise<randomInterface[]> => {
  return (await apiClient(url)) as Promise<randomInterface[]>
}
