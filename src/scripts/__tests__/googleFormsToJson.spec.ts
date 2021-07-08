/**
 * @jest-environment node
 */
import { googleFormsToJson } from '../googleFormsToJson'

describe('googleFormsToJson', () => {
  it('works', async () => {
    const result = await googleFormsToJson(
      'https://docs.google.com/forms/d/e/1FAIpQLSe5U3qvg8WHs4nkU-e6h2RlAD7fKoCkou6HO2w2-tXYIA_F8g/viewform'
    )
    console.log(result)
    expect(googleFormsToJson).toBeTruthy()
  })
})
