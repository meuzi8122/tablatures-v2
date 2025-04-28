import { expect, test } from "@playwright/test";

test("TAB譜詳細画面のテスト", async ({ page }) => {
    await page.route("*/**/api/v1/tablatures", async (route) => {
        await route.fulfill({
            json: [
                {
                    id: "test-tablature-1",
                    title: "TEAT_TABLATURE_1",
                    artist: {
                        id: "test-artist-1",
                        name: "TEST_ARTIST_1",
                    },
                    instrument: "エレキギター",
                },
            ],
        });
    });

    // TODO: ホスト名を省略するとinvalid url
    await page.goto("http://localhost:4321/tablatures/test-tablature-1");

    await expect(page).toHaveTitle("TEST_TABLATURE_1 - TEST_ARTIST_1(エレキギター) | TablatureDB");
    await expect(page.getByRole("cell", { name: "TEST_TABLATURE_1" })).toBeVisible();
});
