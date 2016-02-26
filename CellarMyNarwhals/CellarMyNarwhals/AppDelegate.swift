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
//        guard let password = KeychainService.loadFromKeychain() else { return }
        
    }


}

