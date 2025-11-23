class MenuPage {
    constructor(page) {
        this.page = page;
        this.menuButton = page.locator('#react-burger-menu-btn');
        this.logoutButton = page.locator('#logout_sidebar_link');
    }

    async openMenu() {
        await this.menuButton.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }
}

module.exports = MenuPage;
