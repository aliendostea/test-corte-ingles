import { test, expect } from "@playwright/test";

const TODO_APP_URL = "http://localhost:5173/";

test.describe("Todo List App E2E", () => {
  // Before every test
  test.beforeEach(async ({ page }) => {
    await page.goto(TODO_APP_URL);
  });

  //  * TEST 1: Add an item named "Tomato", Verify it appears in the list container.
  test("1 should add a new item to the list", async ({ page }) => {
    const input = page.locator("#input-item-list");
    const listContainer = page.locator("#list-container");
    const btnShowOverlay = page.locator("#btn-overlay-show");

    await btnShowOverlay.click();

    await expect(input).toBeVisible();

    await input.fill("Tomato");

    await input.press("Enter");

    await expect(input).toBeEmpty();

    const mainOverlay = page.locator("#overlay");
    await expect(mainOverlay).toBeHidden();

    await expect(listContainer).toContainText("Tomato");
  });

  //  * TEST 2: Validation Error, Verify the app blocks empty submissions and shows error styles.
  test("2 should show error when submitting empty input", async ({ page }) => {
    const btnShowOverlay = page.locator("#btn-overlay-show");
    await btnShowOverlay.click();

    const input = page.locator("#input-item-list");
    await expect(input).toBeVisible();

    const errorSpan = page.locator("#error-form .error-message");

    await input.press("Enter");

    await expect(errorSpan).toContainText("Error: Input cannot be empty");

    await expect(input).toHaveClass(/error-box/);
  });

  //  * TEST 3: Select and Delete, Verify we can select an item and remove it from the DOM.
  test("3 should select an item and delete it", async ({ page }) => {
    const btnShowOverlay = page.locator("#btn-overlay-show");
    await btnShowOverlay.click();
    const input = page.locator("#input-item-list");
    const deleteBtn = page.locator("#delete-elements");

    await input.fill("Avocado");
    await input.press("Enter");

    const itemButton = page.locator("#list-container button", { hasText: "Avocado" });

    await itemButton.click();
    await expect(itemButton).toHaveClass(/active/);

    await deleteBtn.click();

    await expect(page.locator("#list-container")).not.toContainText("Avocado");
  });

  //  * TEST 4: Recover Deleted Elements, Verify deleted items can be restored and return to an unselected state.
  test("4 should recover a deleted item back to the list", async ({ page }) => {
    const btnShowOverlay = page.locator("#btn-overlay-show");
    await btnShowOverlay.click();

    const input = page.locator("#input-item-list");
    const deleteBtn = page.locator("#delete-elements");
    const recoverBtn = page.locator("#to-recover-elements");
    const listContainer = page.locator("#list-container");

    const itemName = "Potato";
    await input.fill(itemName);
    await input.press("Enter");

    const itemButton = listContainer.locator("button", { hasText: itemName });

    await itemButton.click();
    await deleteBtn.click();

    await expect(listContainer).not.toContainText(itemName);

    await recoverBtn.click();

    await expect(listContainer).toContainText(itemName);

    const recoveredButton = listContainer.locator("button", { hasText: itemName });
    await expect(recoveredButton).not.toHaveClass(/active/);
  });
});
