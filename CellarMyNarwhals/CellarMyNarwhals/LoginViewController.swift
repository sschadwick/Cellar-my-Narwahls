//
//  LoginViewController.swift
//  CellarMyNarwhals
//
//  Created by Miles Ranisavljevic on 2/19/16.
//  Copyright © 2016 creeperspeak. All rights reserved.
//

import UIKit

typealias loginViewControllerCompletion = () -> ()

class LoginViewController: UIViewController {
    
    var completion: loginViewControllerCompletion?
    
    class func identifier() -> String {
        return "LoginViewController"
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }

}
