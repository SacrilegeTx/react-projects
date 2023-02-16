// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://127.0.0.1:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

test('app shows random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})

test('click on button "Generate new Fact" and verify text changes', async ({
  page
}) => {
  await page.goto(LOCALHOST_URL)

  // primero obtenemos el valor ni bien carga la pagina
  const text = await page.getByRole('paragraph')
  const textContent = await text.textContent()

  // luego le damos click al boton
  await page.click('div#app>main>button')
  await page.waitForTimeout(2000);

  // se supone que al darle click ya genero un nuevo fact, vamos a guardarlo en otra variable
  const newText = await page.getByRole('paragraph')
  const newTextContent = await newText.textContent()

  console.log({ textContent, newTextContent })

  await expect(textContent != newTextContent).toBeTruthy()
})
