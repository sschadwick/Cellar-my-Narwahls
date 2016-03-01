//
//  AppDelegate.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import UIKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?


    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        self.checkUserLogin()
        return true
    }

    func applicationWillResignActive(application: UIApplication) {
    }

    func applicationDidEnterBackground(application: UIApplication) {
    }

    func applicationWillEnterForeground(application: UIApplication) {
    }

    func applicationDidBecomeActive(application: UIApplication) {
    }

    func applicationWillTerminate(application: UIApplication) {
    }
    
    private func checkUserLogin() {
        guard let loginCredentials = KeychainService.loadFromKeychain() else {
            self.presentLoginViewController()
            return
        }
        let credentials = loginCredentials.componentsSeparatedByString(":")
        if credentials.count == 3 {
            let un = credentials[0]
            let pw = credentials[1]
            let token = credentials[2]
            CellarAPIService.logInUserWithUsername(un, password: pw, token: token, completion: { (success, response) -> () in
                guard let response = response where success else {
                    print("Unable to log in user: \(un)")
                    self.presentLoginViewController()
                    return
                }
                JSONService.jsonObjectFromSignupData(response, completion: { (success, token) -> () in
                    if success && token != nil {
                        let keychainData = "\(un):\(pw):\(token)"
                        KeychainService.save(keychainData)
                    } else {
                        self.presentLoginViewController()
                    }
                })
            })
        }
    }
    
    private func presentLoginViewController() {
        guard let window = self.window else { return }
        guard let rootVC = window.rootViewController as? HomeViewController else { return }
        guard let storyboard = rootVC.storyboard else { return }
        guard let loginVC = storyboard.instantiateViewControllerWithIdentifier("LoginViewController") as? LoginViewController else { return }
        rootVC.addChildViewController(loginVC)
        rootVC.view.addSubview(loginVC.view)
        loginVC.didMoveToParentViewController(rootVC)
        loginVC.completion = ({
            loginVC.view.removeFromSuperview()
            loginVC.removeFromParentViewController()
        })
    }


}

