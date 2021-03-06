angular.module('directory', ['ionic', 'forceng', 'directory.controllers'])

    .run(function ($ionicPlatform, $location, force) {

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            force.init({
                // Required: clientId of Salesforce Connected App
                appId: '3MVG9od6vNol.eBgdhu.ShmdYDGqKlpq2mVErmAKosX2D7QbLWjkQSyfkZZyrKvhUSgvHZg9ZTyH3ghi0Vow8',
                // optional: defaults to 'v30.0'
//                apiVersion: 'v30.0',
                // optional: defaults to window.sessionStorage
                //tokenStore: window.localStorage,
                // optional: defaults to oauthcallback.html in same directory as index.html
                // oauthRedirectURL: 'http://localhost:3000/oauthcallback.html',
                // only required when hosting app on your own server to work around cross-domain issues (Not required when running locally on mobile device)
                proxyURL: force.baseURL
            });

            if (force.isLoggedIn()) {
                $location.path('/search')
            } else {
                force.login().then(function() {
                    $location.path('/search')
                });
            }

        });

    })

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('search', {
                url: '/search',
                templateUrl: 'templates/contact-list.html',
                controller: 'ContactListCtrl'
            })

            .state('contact', {
                url: '/contacts/:contactId',
                templateUrl: 'templates/contact-detail.html',
                controller: 'ContactDetailCtrl'
            })

            .state('reports', {
                url: '/contacts/:contactId/reports',
                templateUrl: 'templates/contact-reports.html',
                controller: 'ContactReportsCtrl'
            });

    });
