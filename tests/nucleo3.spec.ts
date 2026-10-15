import { test, expect, type Page } from '@playwright/test';

// Núcleo 3 (the trivia) opens only after the visitor makes a beat in BeatMind and downloads it.

async function crearYDescargarBeat(page: Page) {
  await page.getByRole('button', { name: 'Cómo vamos a crear', exact: true }).click();
  await page.getByRole('button', { name: 'Conocer a Byte', exact: true }).click();
  await page.getByRole('button', { name: 'Crear mi primera base', exact: true }).click();
  await page.getByRole('button', { name: /Trap.*Profundo y relajado/ }).click();
  await page.getByRole('button', { name: 'Usar Trap y seguir' }).click();
  await page.getByRole('button', { name: 'Crear mi ritmo', exact: true }).click();
  await page.getByRole('button', { name: 'Bombo, paso 1', exact: true }).click();
  const bloqueado = page.getByRole('link', { name: /Ir a núcleo 3: bloqueado/ });
  await expect(bloqueado).toHaveAttribute('aria-disabled', 'true');
  // aria-disabled makes Playwright wait for it to be enabled; a visitor can still tap it.
  await bloqueado.click({ force: true });
  await expect(page.getByRole('status').filter({ hasText: 'Antes de seguir' })).toBeVisible();
  await expect(page).toHaveURL(/#\/beatmind$/);
  await page.getByRole('button', { name: 'Seguir con la caja', exact: true }).click();
  await page.getByRole('button', { name: 'Seguir con el hi-hat', exact: true }).click();
  await page.getByRole('button', { name: 'Conocer el bajo', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar sin bajo', exact: true }).click();
  await page.getByRole('button', { name: 'Continuar sin melodía', exact: true }).click();
  await page.getByRole('button', { name: 'Escuchar y guardar', exact: true }).click();
  await expect(page.getByText('Al descargarlo se desbloquea el núcleo 3.')).toBeVisible();
  await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Guardar mi beat como audio' }).click(),
  ]);
}

test('el núcleo 3 se desbloquea al descargar el beat y se vuelve a bloquear con uno nuevo', async ({ page }) => {
  await page.goto('/#/nucleo-3');
  await expect(page).toHaveURL(/#\/nucleo-2\/4$/);
  await expect(page.getByText('Creá tu beat y descargalo para desbloquear el Núcleo 3')).toBeVisible();
  await expect(page.getByRole('link', { name: /Núcleo 3: se desbloquea/ })).toHaveAttribute('href', '#/nucleo-2/4');

  await page.getByRole('link', { name: 'PROBAR EXPERIENCIA' }).click();
  await crearYDescargarBeat(page);

  const abierto = page.getByRole('link', { name: 'Ir a núcleo 3', exact: true });
  await expect(abierto).toHaveAttribute('href', '#/nucleo-3');
  await expect(page.getByText('Núcleo 3 desbloqueado')).toBeVisible();
  await abierto.click();
  await expect(page.getByRole('heading', { name: '¡ADIVINÁ QUIÉN!' })).toBeVisible();

  await page.goto('/#/beatmind');
  await page.getByRole('button', { name: 'Reiniciar', exact: true }).first().click();
  await page.getByRole('button', { name: 'Empezar un beat nuevo', exact: true }).click();
  await page.getByRole('button', { name: 'Cómo vamos a crear', exact: true }).click();
  await page.getByRole('button', { name: 'Conocer a Byte', exact: true }).click();
  await page.getByRole('button', { name: 'Crear mi primera base', exact: true }).click();
  await expect(page.getByRole('link', { name: /Ir a núcleo 3: bloqueado/ })).toBeVisible();
});
