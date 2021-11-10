const fetch = jest.fn(() =>
  Promise.resolve({
    text: jest.fn()
  })
) as jest.Mock

export const mockFetchText = (value: any) => {
  fetch.mockReturnValue(
    Promise.resolve({
      text: () => value
    })
  )
}

export default fetch
