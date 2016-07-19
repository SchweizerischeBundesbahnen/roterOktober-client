/*
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2016.
 */
class NavbarController {
    /*@ngInject*/
    constructor(oAuthService) {
        this.name = 'navbar';
        this.navCollapsed = true;
        this.oAuthService = oAuthService;
    }
}

export default NavbarController;