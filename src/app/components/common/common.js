/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2015.
 *
 * ESTA WebJS: Angular-Modul der Common-Komponenten
 * - Hier werden alle Common-Komponenten als Modul exportiert
 *
 * @author u220374 (Reto Lehmann)
 * @version: 0.0.1
 * @since 23.10.2015, 2015.
 */
import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Navbar from './navbar/navbar';
import Posts from './posts/posts';
import Messages from './messages/messages';
import Theme from './theme/theme';

let commonModule = angular.module('app.components.common', [
    Home.name, About.name, Navbar.name, Posts.name, Messages.name, Theme.name
]);

export default commonModule;